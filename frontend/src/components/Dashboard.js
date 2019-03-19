import React, { Component } from 'react';

import {
    Container,
    Row,
    Col,
    Jumbotron,
    Button
} from 'reactstrap';

import '../stylesheets/dashboard.css';

import DashboardNavbar from './dashboard/DashboardNavbar'
import FileTree from './dashboard/FileTree'
import FileBrowser from './dashboard/filebrowser/FileBrowser'
import UploadModal from './dashboard/UploadModal'

export default class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentProject: null
        }

        this.toggleUploadModal = this.toggleUploadModal.bind(this);
        this.upload = React.createRef();
        this.isProjectSelected = React.createRef();
    }

    toggleUploadModal()
    {
        if (this.isProjectSelected())
            this.upload.toggle();
    }

    render() {
        return (
            <React.Fragment>
                <UploadModal onRef={(ref) => { this.upload = ref }} />
                <DashboardNavbar onRef={(ref) => { this.isProjectSelected = ref; }}/>
                <div className="dashboard-container">
                    <FileTree />
                    <FileBrowser toggleUploadModal={this.toggleUploadModal}/>
                </div>
            </React.Fragment>
        );
    }
}