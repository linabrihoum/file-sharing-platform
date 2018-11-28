import React, { Component } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import ProjectDropdownItem from './ProjectDropdownItem'

export default class ProjectDropdown extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      projectName: 'Select Project',
      availableProjects: [],
      dropdownOpen: false
    };

    // Bind methods.
    this.setCurrentProject = this.setCurrentProject.bind(this);
    this.toggle = this.toggle.bind(this);
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
    this.setState({ projectName: this.state.availableProjects[key].name });
    console.log('You have selected project ' + this.state.availableProjects[key].projectID);
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
                disabled={!project.access}
              >
                {project.name}
              </ProjectDropdownItem>
            );
          })}
        </DropdownMenu>
      </Dropdown>
    );
  }
}