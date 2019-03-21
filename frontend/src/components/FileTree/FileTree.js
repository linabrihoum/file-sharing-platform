import React, { Component } from 'react';
import Directory from '../DirectoryIcon/DirectoryIcon';
import { connect } from 'react-redux';

import { OPEN_ROOT } from '../../store/actions/actionTypes';
import classes from './FileTree.css';

const TAB = 15;

class FileTree extends Component{
    
  rootFolderHandler = () => {
    this.props.onOpenRoot();
  }

  render(){
    const folderIcon = {
      margin : "0 2px 0 0"
    };
    
    let docs = [];
    let tab = 0;
    let path = [];

    let files = { ...this.props.projectFiles.content};
    
    // This function will go through the object stored in the Redux store and determine which directory will be displayed and selected
    // Each directory will be passed down a path to its corresponding properties
    function traverse(node) {
      // This will determine the amount of indentation each directory will have
      tab += TAB;

      for (const key of Object.keys(node)) {
        path.push(key);
        if (node[key].isDir) {
          let currentPath = [...path];
          docs.push(<Directory name={key} tab={tab} path={currentPath} selected={node[key].selected}/>);
          if(!node[key].isOpen){
            path.pop();
            continue;
          }
        }
        if (!node[key].isDir) {
          path.pop();
          continue;
        }
        traverse(node[key].content);
      }

      path.pop();
      tab -= TAB;
    }

    if(this.props.projectFiles){
      traverse(files);
    }

    let rootStyle = {
      backgroundColor: "#b6d6f9",
      cursor: "pointer"
    }

    if(this.props.path){
      rootStyle.backgroundColor = "initial";
    }

    return(
      <>
        <div onClick={this.rootFolderHandler} style={rootStyle}>
          <span className={classes.ArchiveIcon}>
            <i className="fas fa-archive" />
          </span>
          Project Files
        </div>
        {docs}
      </>
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
    onOpenRoot: () => dispatch({type: OPEN_ROOT})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FileTree);