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
  
  addFiles = (id, selected) => {
    if(selected){
        this.setState(prevState =>({
        filesSelected: [...prevState.filesSelected, id]
      }));
    }else{
      let files = this.state.filesSelected.filter((fileId) => {
        return fileId !== id;
      });
      this.setState({filesSelected: files})
    }
  }
  
  componentDidUpdate(prevProps, prevState){
    if(!isEqual(prevProps.path, this.props.path)){
      this.setState({filesSelected: []})
    }
  }

  render(){

    let filesCopy = {...this.props.projectFiles};
    let path = this.props.path;
    let node = null;
    let cards = [];

    if(path !== null){ 
      node = filesCopy.content[path[0]];
      for(let i = 1; i < path.length; i++){
        node = node.content[path[i]];
      }
      for(const key of Object.keys(node.content)){
        if(node.content[key].isDir){
          cards.push(<DirectoryCard title={key} id={node.content[key].hash}/>);
        }else{
          cards.push(<FileCard stageFile={this.addFiles.bind(this)} id={node.content[key].hash}>{key}</FileCard>);
        }
      }
    }else{ // To display the contents of the root directory
      let projectFiles = this.props.projectFiles.content;
      for(const key of Object.keys(projectFiles)){
        if(projectFiles[key].isDir){
          cards.push(<DirectoryCard title={key} id={projectFiles[key].hash}/>);
        }else{
          cards.push(<FileCard stageFile={this.addFiles.bind(this)} id={projectFiles[key].hash}>{key}</FileCard>);
        }
      }
    }

    return(
        <Row>
            <Col className ={classes.fileCardContainer} style = {{"height" : this.props.height}}>
              {cards}
              <Button size="lg" className={classes.Button}>Download</Button>
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