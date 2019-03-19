import React, { Component } from 'react';
import FileBrowserNav from './FileBrowserNav';

export default class FileBrowser extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="file-browser-container">
                <FileBrowserNav toggleUploadModal={this.props.toggleUploadModal}/>
            </div>
        );
    }
}