import React, { Component } from 'react';
import { Card, CardText, CardBody, CardImg } from 'reactstrap';
import { connect } from 'react-redux';

import classes from './DirectoryCard.css';
import { SELECT_DIRECTORY, TOGGLE_DIRECTORY } from '../../store/actions/actionTypes';


class DirectoryCard extends Component{

    openDirectory = ()=>{
        let currentPath;
        if(this.props.path !== null){
            currentPath = [...this.props.path, this.props.title];
        }else{
            currentPath = [this.props.title];
        }
        
        let filesCopy = { ...this.props.projectFiles };
        // This will open all of the directories down to the selected directory's path
        let node = filesCopy.content[currentPath[0]];
        node.isOpen = true;
        for(let i = 1; i < currentPath.length; i++){
            node = node.content[currentPath[i]];
            node.isOpen = true;
        }
        //Update the Redux store with the new object that has all of the open directories
        this.props.toggleDirectory(filesCopy);
        //Update the current path selected, so that it can be highlighted
        this.props.onSelectDirectory(currentPath);
        this.test();
        
    }
    
    // This will be converted into a socket.io function that sends the directory that is selected
    test = () => {
        console.log(this.props.id);
    }
    
    render(){
        return(
            <div onClick={this.openDirectory}>
                <Card className={classes.DirectoryCard}>
                    <CardBody>
                        <span className={classes.DirectoryIcon}>
                            <i className="fas fa-folder" />
                        </span>
                        <CardText>{this.props.title}</CardText>
                    </CardBody>
                </Card>
            </div>
        );
    }
};

const mapStateToProps = state =>{
    return{
        path: state.files.selected,
        projectFiles: state.files.files
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onSelectDirectory: (currentPath) => dispatch({type: SELECT_DIRECTORY, path: currentPath}),
        toggleDirectory: (files) => dispatch({type: TOGGLE_DIRECTORY, files: files })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DirectoryCard);