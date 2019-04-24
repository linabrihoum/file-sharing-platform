import React, { Component } from 'react';
import axios from 'axios';

import InnerNav from '../InnerNav/InnerNav';
import FileDisplay from '../FileDisplay/FileDisplay';

class FileManagementContainer extends Component {

    state = {
        filesSelected: []
    }

    stageFiles = (files) => {
        this.setState({ filesSelected: files });
    }

    downloadFiles = () => {
        let stagedFiles = [... this.state.filesSelected];
        if (stagedFiles.length > 0) {

            window.socket.emit('request_download',
                window.crypter.encrypt({ Hashes: stagedFiles }),
                (encryptedDownloadToken) => {

                    // Get the project tree.
                    var downloadToken = window.crypter.decrypt(encryptedDownloadToken);

                    window.location = `https://zach.black:3001/download/?token=${downloadToken}`;
                });
        }

        this.setState({filesSelected: []});
    }

    deleteFiles = () => {
        let stagedFiles = [... this.state.filesSelected];
        if(stagedFiles.length > 0){
            stagedFiles.forEach((fileHash)=> {
                window.socket.emit('request_delete',
                window.crypter.encrypt({ Hash: fileHash }),
                (success) => {
                    console.log("File delete: " + success);
                }
                );
            })
        }
    }

    render() {

        return (
            <React.Fragment>
                <InnerNav
                    uploading={this.props.uploading}
                    download={this.downloadFiles.bind(this)}
                    delete={this.deleteFiles} />
                <FileDisplay
                    height={this.props.height}
                    currentStagedFiles={this.state.filesSelected}
                    stageFiles={this.stageFiles} />
            </React.Fragment>
        );
    }
}

export default FileManagementContainer;