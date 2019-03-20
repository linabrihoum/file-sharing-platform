import React, { Component } from 'react';

import classes from './DirectoryIcon.css';

// This is eventually going to be a hook
class directoryIcon extends Component {
    state = {
        path: []
    }
    
    componentDidMount() {
        this.setState(state => ({
          path: this.props.path
        }));
      }
      
      render() {
        const folderIcon = {
          margin: "0 2px 0 0"
        };
        return (
          <div>
            <span style={{ paddingLeft: `${this.props.tab}px` }} />
            <i className="fas fa-folder" style={folderIcon} />
            {this.props.name}
          </div>
        );
      }
}

export default directoryIcon;