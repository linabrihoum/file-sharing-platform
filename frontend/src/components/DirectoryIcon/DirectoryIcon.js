import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isEqual } from 'lodash';

import classes from './DirectoryIcon.css';
import { SELECT_DIRECTORY, TOGGLE_DIRECTORY } from '../../store/actions/actionTypes';

class DirectoryIcon extends Component {

    handleClick = () => {
      let filesCopy = { ...this.props.projectFiles };
      let path = this.props.path;
      let node = filesCopy.content[path[0]];
      
      for(let i = 1; i < path.length; i++){
        node = node.content[path[i]];
      }

      node.isOpen = !node.isOpen;
      // These functions will update the Redux store with the directory's path and toggle its contents
      this.props.toggleDirectory(filesCopy);
      this.props.onSelectDirectory(this.props.path);
    }

      render() {
        const folderIcon = {
          margin: "0 2px 0 0",
          color: "#6c757d"
        };

        let highlight= {
          backgroundColor: ""
        };

        if(isEqual(this.props.selected, this.props.path)){
          highlight.backgroundColor = "#b6d6f9";
        }

        return (
          <div onClick={this.handleClick} style={highlight} className={classes.Directory}>
            <span style={{ marginLeft: `${this.props.tab}px` }} />
            <i className="fas fa-folder" style={folderIcon} />
            {this.props.name}
          </div>
        );
      }
}

const mapStateToProps = state => {
  return{
    projectFiles: state.files.files,
    selected: state.files.selected
  }
}

const mapDispatchToProps = dispatch => {
  return{
    onSelectDirectory: (currentPath) => dispatch({type: SELECT_DIRECTORY, path: currentPath}),
    toggleDirectory: (files) => dispatch({type: TOGGLE_DIRECTORY, files: files })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DirectoryIcon);