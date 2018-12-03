import React, { Component } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import axios from 'axios';

import classes from './Projects.css'

class Projects extends Component{
    
    state = {
        project: "Select Project",
        dropdownOpen: false,
        projects : null
    }
    
    toggle(){
        this.setState(prevState =>({
            dropdownOpen : !prevState.dropdownOpen
        }));
    }
    
    render(){
        
        let dropDowns = <DropdownItem>Projects Loading...</DropdownItem>;
        if(this.props.projects){
             dropDowns = this.props.projects.map((project)=>
                <DropdownItem
                    onClick ={()=>{
                        this.setState({project: project});
                        this.props.setProject(project);
                        }
                    }
                >{project}
                </DropdownItem>
            );
        }
        
        
        return(
            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle.bind(this)}>
                <DropdownToggle 
                    className={classes.dropDown} caret>
                    {this.state.project}
                </DropdownToggle>
                <DropdownMenu>
                   {dropDowns}
                </DropdownMenu>
            </Dropdown>
            
        );
    }
}

export default Projects;