import React from 'react';
import {
    Form,
    Input,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
} from 'reactstrap';

import '../../stylesheets/upload.css';

class UploadModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            files: []
        };

        this.props.onRef(this);

        // Bind functions.
        this.toggle = this.toggle.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.filesDidUpload = this.filesDidUpload.bind(this);
        this.handleDrop = this.handleDrop.bind(this);
        this.handleFileSelection = this.handleFileSelection.bind(this);
        this.handleFileDelete = this.handleFileDelete.bind(this);
        this.addFiles = this.addFiles.bind(this);
        this.clearFiles = this.clearFiles.bind(this);

        window.uploader.on('complete', (fileInfo) => {
            this.filesDidUpload(fileInfo);
        });
    }

    toggle() {
        if (this.state.modal) {
            this.clearFiles();
        }

        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    filesDidUpload(fileInfo) {
        console.log(fileInfo);
    }

    addFiles(newFiles) {
        // Define new array for files.
        let files = [];

        // Add files to file state.
        for (var i = 0; i < newFiles.length; i++) {
            if (!this.state.files.includes(newFiles[i])) {
                files.push(newFiles[i]);
            }
        }

        // Update the files state.
        this.setState({ files: this.state.files.concat(files) });
    }

    removeFile(id) {
        // Make copy of current files.
        let currentFiles = [...this.state.files];

        // Remove file from list.
        currentFiles.splice(id, 1);

        this.setState({files: currentFiles});
    }

    clearFiles() {
        // Clear the files.
        this.setState({files: []});
    }

    handleFileDelete(event) {
        // Remove this file.
        this.removeFile(event.target.getAttribute('file_id'));
    }

    handleDrop(event) {
        this.addFiles(event.dataTransfer.files);
        event.preventDefault();
    }

    handleFileSelection(event) {
        this.addFiles(event.target.files);
        event.preventDefault();
    }

    handleSubmit(event) {
        // Set up data object.
        let data = { files: this.state.files };

        // Upload files.
        window.uploader.upload(data);

        // Remove our files.
        this.clearFiles();

        // Prevent default form submission.
        event.preventDefault();
    }

    render() {
        let files = this.state.files.map((file, index) => {
            return (
                <p key={index}>
                    <span >
                        <Button onClick={this.handleFileDelete} file_id={index} color="secondary" size="sm">Remove</Button>
                    </span>
                    {" " + file.name}
                </p>
            );
        });

        return (
            <React.Fragment>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className="modal-lg">
                    <ModalHeader toggle={this.toggle}>File Upload</ModalHeader>
                    <ModalBody>
                        <div className="box">
                            <div
                                className="dropZone"
                                onDrop={this.handleDrop}
                                onDragOver={(event) => { event.preventDefault() }}
                            >
                                <Form id="upload" onSubmit={this.handleSubmit}>
                                    <Input
                                        type="file"
                                        name="file"
                                        id="file"
                                        className="inputfile"
                                        data-multiple-caption="{count} files selected"
                                        multiple
                                        style={{ display: "none" }}
                                        onChange={this.handleFileSelection}
                                    />
                                </Form>
                                <div className="dropIcon">
                                    <i className="fas fa-arrow-down"></i>
                                </div>
                                <div className="dropText">
                                    <label htmlFor="file" className="dropLabel">
                                        <strong>Choose a File</strong>
                                    </label>
                                    <span> or drag it here</span>
                                </div>
                            </div>
                        </div>
                        <div className="fileNames">
                            {files}
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button type="submit" form="upload" color="info" className="uploadBtn">Upload</Button>
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </React.Fragment>
        );
    }
}

export default UploadModal;