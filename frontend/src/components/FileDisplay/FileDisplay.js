import React, { Component } from 'react';
import { Row, Col, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { isEqual } from 'lodash';

import FileCard from '../FileCard/FileCard';
import DirectoryCard from '../DirectoryCard/DirectoryCard';
import classes from './FileDisplay.css'

class FileDisplay extends Component{
  
  state = {
    filesSelected: []
  }
  
  selectFileHandler = (id, selected) => {
    let currentStagedFiles = [...this.props.currentStagedFiles];
    if(selected){
       currentStagedFiles = [...currentStagedFiles, id];
    }else{
      currentStagedFiles = this.props.currentStagedFiles.filter((fileId) => {
        return fileId !== id;
      });
    }
    this.props.stageFiles(currentStagedFiles);
  }
  
  componentDidUpdate(prevProps, prevState){
    if(!isEqual(prevProps.path, this.props.path)){
      this.setState({filesSelected: []})
    }
  }
  
  // This method will send the IDs of the files requested for download to the server
  requestFiles = () => {
    if(this.state.filesSelected.length === 0){
      return;
    }
    console.log(this.state.filesSelected);
  }

  render(){

    let filesCopy = {...this.props.projectFiles};
    let path = this.props.path;
    let node = null;
    let cards = [];
    if(this.props.projectFiles !== null){
      if(path !== null){ 
        node = filesCopy.contents[path[0]];
        for(let i = 1; i < path.length; i++){
          node = node.contents[path[i]];
        }
        for(const key of Object.keys(node.contents)){
          if(node.contents[key].isDir){
            cards.push(<DirectoryCard title={key} id={node.contents[key].hash}/>);
          }else{
            cards.push(<FileCard stageFile={this.selectFileHandler.bind(this)} id={node.contents[key].hash}>{key}</FileCard>);
          }
        }
      }else{ // To display the contents of the root directory
        let projectFiles = this.props.projectFiles.contents;
        for(const key of Object.keys(projectFiles)){
          if(projectFiles[key].isDir){
            cards.push(<DirectoryCard title={key} id={projectFiles[key].hash}/>);
          }else{
            cards.push(<FileCard stageFile={this.selectFileHandler.bind(this)} id={projectFiles[key].hash}>{key}</FileCard>);
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