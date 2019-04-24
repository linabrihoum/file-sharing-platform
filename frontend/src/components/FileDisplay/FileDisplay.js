import React, { Component } from 'react';
import { Row, Col, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { isEqual } from 'lodash';

import FileCard from '../FileCard/FileCard';
import DirectoryCard from '../DirectoryCard/DirectoryCard';
import classes from './FileDisplay.css'

class FileDisplay extends Component{
  
  
  // Sends the files with checked boxes to the File Management Container to be staged for download
  selectFileHandler = (id, isSelected) => {
    let currentStagedFiles = [...this.props.currentStagedFiles];
    if(isSelected){
      // Add file to be staged
       currentStagedFiles = [...currentStagedFiles, id];
    }else{
      // Remove file from staging array
      currentStagedFiles = this.props.currentStagedFiles.filter((fileId) => {
        return fileId !== id;
      });
    }
    this.props.stageFiles(currentStagedFiles);
  }
  
  componentDidUpdate(prevProps, prevState){
    // Checks if a different path is selected, i.e. the user changed directory
    if(!isEqual(prevProps.path, this.props.path)){
      // Clears the files from the File Management Component when a new path is selected
      this.props.stageFiles([])
    }
  }

  render(){

    // Copy of the Project Tree stored in the Redux store
    let filesCopy = {...this.props.projectFiles};
    // The path will point to the directory currently selected
    let path = this.props.path;

    let node = null;
    let cards = [];
    if(this.props.projectFiles !== null){
      if(path !== null){ 
        // Get the first directory in the path
        node = filesCopy.content[path[0]];
        for(let i = 1; i < path.length; i++){
          // Iterate through the Project Tree object until reaching the directory selected
          node = node.content[path[i]];
        }
        
        // Iterate through the contents of the directory and push the corresponding card
        for(const key of Object.keys(node.content)){
          if(node.content[key].isDir){
            cards.push(<DirectoryCard title={key} id={node.content[key].hash}/>);
          }else{
            cards.push(<FileCard stageFile={this.selectFileHandler} id={node.content[key].hash}>{key}</FileCard>);
          }
        }
      }else{ // To display the contents of the root directory, in this case the path object is empty
        let projectFiles = this.props.projectFiles.content;
        for(const key of Object.keys(projectFiles)){
          if(projectFiles[key].isDir){
            cards.push(<DirectoryCard title={key} id={projectFiles[key].hash}/>);
          }else{
            cards.push(<FileCard stageFile={this.selectFileHandler} id={projectFiles[key].hash}>{key}</FileCard>);
          }
        }
      }
    }
   
    return(
        <Row>
            <Col className ={classes.fileCardContainer} style = {{"height" : this.props.height}}>
              {cards}
            </Col>
        </Row>
        );
    }
};

const mapStateToProps = state => {
  return{
    projectFiles: state.files.files,
    path: state.files.selected

  }
}

const mapDispatchToProps = dispatch => {
  return{

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FileDisplay);