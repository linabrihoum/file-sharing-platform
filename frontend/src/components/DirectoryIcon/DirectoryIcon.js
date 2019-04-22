import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isEqual } from 'lodash';

import classes from './DirectoryIcon.css';
import { SELECT_DIRECTORY, TOGGLE_DIRECTORY } from '../../store/actions/actionTypes';

class DirectoryIcon extends Component {

    state = {
      open: false
    }

    toggleDirectory = () => {
      
      let filesCopy = { ...this.props.projectFiles };
      let path = this.props.path;
      let node = filesCopy.contents[path[0]];
      
      for(let i = 1; i < path.length; i++){
        node = node.contents[path[i]];
      }

      // This will toggle the directory's isOpen property
      node.isOpen = !node.isOpen;
      this.test(node.hash);
      this.setState({open: node.isOpen});
      // These functions will update the Redux store with the directory's path and toggle its contents
      this.props.toggleDirectory(filesCopy);
      this.props.onSelectDirectory(this.props.path);
    }
    
    // This will be converted into a socket.io function that sends the directory that is selected
    test = (hash) => {
      console.log(hash);
    }

      render() {
        const directoryStyle = {
          margin: "0 2px 0 0",
          color: "#6c757d"
        };

        let highlight= {
          backgroundColor: ""
        };

        let directory = <i className="fas fa-folder" style={directoryStyle} />;

        if(isEqual(this.props.selected, this.props.path)){
          highlight.backgroundColor = "#b6d6f9";
        }
        if(this.props.open){
          directory = <i className="fas fa-folder-open" style={directoryStyle}></i>
        }

        return (
          <div onClick={this.toggleDirectory} style={highlight} className={classes.Directory}>
            <span style={{ marginLeft: `${this.props.tab}px` }} />
            {directory}
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