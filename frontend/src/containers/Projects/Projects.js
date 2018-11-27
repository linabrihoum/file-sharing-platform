import React, { Component } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import classes from './Projects.css'

class Projects extends Component{
    
    state = {
        dropdownOpen: false
    }
    
    toggle(){
        this.setState(prevState =>({
            dropdownOpen : !prevState.dropdownOpen
        }));
    }
    
    render(){
        return(
            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle.bind(this)}>
                <DropdownToggle className={classes.dropDown} caret>
                    Current Project
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem>Project 1</DropdownItem>
                    <DropdownItem>Project 2</DropdownItem>
                    <DropdownItem>Project 3</DropdownItem>
                    <DropdownItem>Project 4</DropdownItem>
                </DropdownMenu>
            </Dropdown>
            
        );
    }
}

export default Projects;