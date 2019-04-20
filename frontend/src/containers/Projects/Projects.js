import React, { Component } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import ProjectDropdownItem from './ProjectDropDownItem/ProjectDropDownItem'

export default class ProjectDropdown extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      projectName: 'Select Project',
      currentProject: null,
      availableProjects: [],
      dropdownOpen: false
    };

    // Bind methods.
    this.setCurrentProject = this.setCurrentProject.bind(this);
    this.toggle = this.toggle.bind(this);
    this.isProjectSelected = this.isProjectSelected.bind(this);

  }

  componentDidMount() {
    window.socket.emit('request_projectList', (encrypted_data) => {
      // Decrypt message from server.
      var data = window.crypter.decrypt(encrypted_data);

      // Update available projects.
      this.setState({ availableProjects: data });
    });
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  setCurrentProject(key) {
    /* GET THE PROJECT TREE*/
    // Let server know what project is selected.
    window.socket.emit('request_project',
      window.crypter.encrypt({ ID: this.state.availableProjects[key].ID }),
      (encryptedProjectData) => {

        // Get the project tree.
        var projectTree = window.crypter.decrypt(encryptedProjectData);

        console.log(projectTree);

        //projectTree.contents['data.csv'].hash
      });
      /* -------------------------- */

      /* FILE DOWNLOAD EXAMPLE

       window.socket.emit('request_download',
          window.crypter.encrypt({ Hash: "PUT HASH HERE"}),
          (encryptedDownloadToken) => {

            // Get the project tree.
            var downloadToken = window.crypter.decrypt(encryptedDownloadToken);

            // DOWNLOAD URL: https://zach.black:3001/download/?token=<TOKEN HERE>
            console.log(downloadToken);
          });
      */

    // Update project selection state.
    this.setState({ projectName: this.state.availableProjects[key].Name, currentProject: key });
    console.log('You have selected project ' + this.state.availableProjects[key].ID);
  }

  isProjectSelected() {
    return this.state.currentProject != null;
  }

  render() {
    return (
      <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle caret>
          {this.state.projectName}
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem header>Available Projects</DropdownItem>
          {this.state.availableProjects.map((project, index) => {
            return (
              <ProjectDropdownItem
                key={index}
                projectKey={index}
                setProject={this.setCurrentProject}
                disabled={!project.Access}
              >
                {project.Name}
              </ProjectDropdownItem>
            );
          })}
        </DropdownMenu>
      </Dropdown>
    );
  }
}