import React, { Component } from 'react';
import { Card, CardText, CardBody, CardImg } from 'reactstrap';
import { connect } from 'react-redux';

import classes from './DirectoryCard.css';
import { SELECT_DIRECTORY, TOGGLE_DIRECTORY } from '../../store/actions/actionTypes';


class DirectoryCard extends Component{

    handleClick = ()=>{
        let currentPath;
        if(this.props.path){
            currentPath = [...this.props.path, this.props.title];
        }else{
            currentPath = [this.props.title];
        }
        
        let filesCopy = { ...this.props.projectFiles };
        let node = filesCopy.content[currentPath[0]];
        node.isOpen = true;
        for(let i = 1; i < currentPath.length; i++){
            node = node.content[currentPath[i]];
            node.isOpen = true;
        }

        this.props.toggleDirectory(filesCopy);
        this.props.onSelectDirectory(currentPath);
    }
    render(){
        return(
            <div onClick={this.handleClick}>
                <Card className={classes.DirectoryCard}>
                    <CardBody>
                        <span className={classes.DirectoryIcon}>
                            <i class="fas fa-folder" />
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