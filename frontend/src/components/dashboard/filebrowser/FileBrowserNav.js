import React, { Component } from 'react';
import { Navbar, Button } from 'reactstrap';

export default class FileBrowserNav extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Navbar className="nav file-browser-nav">
                <Button onClick={this.props.toggleUploadModal} color="secondary">
                    Upload
                </Button>
            </Navbar>
        );
    }
}