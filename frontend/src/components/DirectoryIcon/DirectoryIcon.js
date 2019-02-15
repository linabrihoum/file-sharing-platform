import React, { Component } from 'react';

import classes from './DirectoryIcon.css';

// This is eventually going to be a hook
class directoryIcon extends Component {
    state = {
        open : false,
        files : ["one.txt", "two.txt", "three.txt"]
    }
    
   
    openDirectoryHandler = () => {
        this.setState({open : !this.state.open});

    }
    
    render(){
        
        let directory = (
            <div onClick={this.openDirectoryHandler} className={classes.fileStyle}>
                <i className="fas fa-folder"></i>
                <span className={classes.fileName}>{this.props.name}</span>
            </div>);
        
        let files = null;
        if(this.state.open){
            directory = (
            <div onClick={this.openDirectoryHandler} className={classes.fileStyle}>
                <i class="fas fa-folder-open"></i>
                <span className={classes.fileName}>{this.props.name}</span>
            </div>);
            files = this.state.files.map(file => {
                return <div className={classes.tab}>{file}</div>;
            });
        }
        
        let children = <div className={classes.tab}>{this.props.children}</div>;
        return(
            <React.Fragment>
                {directory}
                {files}
                {this.state.open ? children : null}
            </React.Fragment>
        )
    }
}

export default directoryIcon;