import React, { Component } from "react";
import { Button } from 'reactstrap';

import classes from "./UploadFiles.css";

class UploadFiles extends Component {
  state = {
    uploadedFiles: []
  };

  handleFiles = event => {
    let files = event.target.files;
    let parsedFiles = [];
    for (let i = 0; i < files.length; i++) {
      parsedFiles.push(files[i]);
    }
    let totalFiles = this.state.uploadedFiles.concat(parsedFiles);
    this.setState({ uploadedFiles: totalFiles });
  };

  dragOverHandler = event => {
    event.preventDefault();
  };
  
  dropHandler = event => {
    event.preventDefault();
    let files = event.dataTransfer.files;
    let parsedFiles = [];
    for (let i = 0; i < files.length; i++) {
      parsedFiles.push(files[i]);
    }
    let totalFiles = this.state.uploadedFiles.concat(parsedFiles);
    this.setState({ uploadedFiles: totalFiles });

    console.log(event.dataTransfer.items);
    // console.log("file[0]\n: ", event.dataTransfer.files[0].slice(0, 8));
  };

  deleteFile = event => {
    let currentFiles = [...this.state.uploadedFiles];
    let filePosition = event.target.id;
    currentFiles.splice(filePosition, 1);
    this.setState({ uploadedFiles: currentFiles });
  };

  render() {
    
    let files = this.state.uploadedFiles.map((file, index) => {
      return (
        <p key={index}>
          <span id={index} onClick={this.deleteFile}>
            <Button color="secondary" size="sm">Remove</Button>
          </span>
          {" " + file.name}
        </p>
      );
    });
    
    return (
      <div>
        <div className="box" onDrop={this.dropHandler}>
          <input
            type="file"
            name="file"
            id="file"
            className="inputfile"
            data-multiple-caption="{count} files selected"
            multiple
            onChange={this.handleFiles}
            style={{ display: "none" }}
          />
          <div
            className={classes.dropZone}
            onDrop={this.dropHandler}
            onDragOver={this.dragOverHandler}
          >
            <div className={classes.dropIcon}>
              <i class="fas fa-arrow-down"></i>
            </div>
            <div className={classes.dropText}>
              <label htmlFor="file" className={classes.dropLabel}>
                <strong>Choose a File</strong>
              </label>
              <span> or drag it here</span>
            </div>
            <Button color="info" className={classes.uploadBtn}>Upload</Button>
          </div>
        </div>
        <div className={classes.fileNames}>
          {files}
        </div>
      </div>
    );
  }
}

export default UploadFiles;
