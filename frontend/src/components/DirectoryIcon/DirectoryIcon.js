import React, { Component } from 'react';

import classes from './DirectoryIcon.css';

// This is eventually going to be a hook
class directoryIcon extends Component {
    state = {
        open : "false",
        files : ["one.txt", "two.txt", "three.txt"]
    }
    
    componentWillReceiveProps(nextProps){
        console.log("[willRecieveProps]",nextProps);
    }
    
    shouldComponentUpdate(nextProps, nextState){
        if(this.state.open === nextState.open){
            return false;
        }
       return true;
    }
    
    openDirectoryHandler = () => {
        if(this.state.open === "false"){
            this.setState({open : "true"});
        }else{
            this.setState({open : "false"})
        }

    }
    
    render(){
        console.log("render");
        let directory = (
            <div onClick={this.openDirectoryHandler}>
                <i className="fas fa-folder"></i>
                <span className={classes.fileName}>{this.props.name}</span>
            </div>);
        
        let files = null;
        if(this.state.open === "true"){
            directory = (
            <div onClick={this.openDirectoryHandler}>
                <i class="fas fa-folder-open"></i>
                <span className={classes.fileName}>{this.props.name}</span>
            </div>);
            files = this.state.files.map(file => {
                return <div className={classes.tab}>{file}</div>;
            });
        }
        
        let children = <div className={classes.tab}>{this.props.children}</div>;
        return(
            <div>
                {directory}
                {files}
                {this.state.open === "true" ? children : null}
            </div>
        )
    }
}

export default directoryIcon;