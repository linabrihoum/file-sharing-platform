import React, { Component } from 'react';
import Directory from '../DirectoryIcon/DirectoryIcon';
import { connect } from 'react-redux';

import root from '../../Data';

class FileTree extends Component{
    
  render(){
    const folderIcon = {
      margin : "0 2px 0 0"
    };
    
    let docs = [];
    let tab = 0;
    let path = ["/"];
    
    function traverse(node) {

      tab += 15;

      for (const key of Object.keys(node)) {
        path.push(key);
        if (node[key].isDir) {
          let currentPath = [...path];
          docs.push(<Directory name={key} tab={tab} path={currentPath} />);
          if(!node[key].isOpen){
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
      tab -= 15;
    }

    if(this.props.projectFiles){
      traverse(this.props.projectFiles.content);
    }

    return(
      <>
        {docs}
      </>
    );
  }
};

const mapStateToProps = state => {
  return{
    projectFiles: state.files.files
  }
}

const mapDispatchToProps = dispatch => {
  return{
  }
}

export default connect(mapStateToProps, null)(FileTree);