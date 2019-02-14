import React, { Component } from 'react';

import {
    Container,
    Row,
    Col,
    Jumbotron,
    Button
} from 'reactstrap';

import DashboardNavbar from './dashboard/DashboardNavbar'
import FileTree from './dashboard/FileTree'
import FileBrowser from './dashboard/FileBrowser'

export default class Dashboard extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <React.Fragment>
                <DashboardNavbar />
                <div className="dashboard-container">
                    <FileTree />
                    <FileBrowser />
                </div>
            </React.Fragment>
        );
    }
}