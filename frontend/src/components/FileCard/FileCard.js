import React, { Component } from 'react';
import {Card, CardText} from 'reactstrap';
    
import classes from "./FileCard.css";


class FileCard extends Component{
    
    state = {
        checked: false
    }
    
    componentDidUpdate(prevProps){
        if(prevProps.id !== this.props.id){
            this.setState({checked: false});
        }
    }
    
    toggle = () =>{
        this.setState((prevState) => ({
            checked: !prevState.checked
        }), ()=> {
                this.props.stageFile(this.props.id, this.state.checked);
            }
        );
    }
    
    render(){
        return(
            <div>
                <Card className = {classes.card}>
                    {this.state.checked ? 
                        <input type="checkbox" checked className={classes.toggleBox} onChange={this.toggle}/>:
                        <input type="checkbox" className={classes.toggleBox} onChange={this.toggle}/>}
                    <span className={classes.icon}>
                        <i className="fas fa-file"></i>
                    </span>
                    <CardText>{this.props.children}</CardText>
                </Card>
            </div>
        );
    }
    

}


export default FileCard;