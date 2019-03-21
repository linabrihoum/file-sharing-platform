import React, { Component } from 'react';
import { Row, Col} from 'reactstrap';
import { connect } from 'react-redux';

import FileCard from '../FileCard/FileCard';
import DirectoryCard from '../DirectoryCard/DirectoryCard';
import classes from './FileDisplay.css'

class FileDisplay extends Component{

  render(){
    // This will display the contents of the current path selected onto the display
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
          cards.push(<DirectoryCard title={key} />);
        }else{
          cards.push(<FileCard>{key}</FileCard>);
        }
      }
    } else{ // To display the contents of the root directory
      let projectFiles = this.props.projectFiles.content;
      for(const key of Object.keys(projectFiles)){
        if(projectFiles[key].isDir){
          cards.push(<DirectoryCard title={key} />);
        }else{
          cards.push(<FileCard>{key}</FileCard>);
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