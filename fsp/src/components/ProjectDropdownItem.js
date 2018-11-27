import React, { Component } from 'react';
import { DropdownItem } from 'reactstrap';

export default class ProjectDropdownItem extends Component {
    constructor(props) {
        super(props);

        this.disabled = props.disabled;
        this.setProject = this.setProject.bind(this);
    }

    setProject() {
        if (!this.disabled) {
            this.props.setProject(this.props.children);
        }
    }

    render() {
        return (
            <DropdownItem onClick={this.setProject} disabled={this.disabled ? true : false}>{this.props.children}</DropdownItem>
        );
    }
}