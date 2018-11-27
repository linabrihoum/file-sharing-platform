import React, { Component } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import ProjectDropdownItem from './ProjectDropdownItem'

export default class ProjectDropdown extends Component {
    constructor(props) {
      super(props);
  
      this.toggle = this.toggle.bind(this);
      this.state = {
        projectName: 'Select Project',
        dropdownOpen: false
      };

      // Bind methods.
      this.setCurrentProject = this.setCurrentProject.bind(this);
    }
  
    toggle() {
      this.setState(prevState => ({
        dropdownOpen: !prevState.dropdownOpen
      }));
    }

    setCurrentProject(newName) {
        this.setState({projectName: newName});
    }
  
    render() {
      return (
        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
          <DropdownToggle caret>
            {this.state.projectName}
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem header>Available Projects</DropdownItem>
            <ProjectDropdownItem 
                projectId={0} 
                setProject={this.setCurrentProject} 
                disabled
            >
                Test Project .5
            </ProjectDropdownItem>
            <ProjectDropdownItem 
                projectId={1} 
                setProject={this.setCurrentProject}
            >
            Test Project 1
            </ProjectDropdownItem>
          </DropdownMenu>
        </Dropdown>
      );
    }
  }