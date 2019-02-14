import React, { Component } from 'react';

import classes from './Modal.css';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component{
    
    render(){
        return(
            <React.Fragment>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed}/>
                <div
                    className={classes.Modal}
                    style={{
                        opacity: this.props.show ? '1' : '0'
                    }}>
                    <span className={classes.Close} onClick={this.props.modalClosed}><i class="fas fa-times"></i></span>
                    <h3 className={classes.Title}>File Upload</h3>
                    {this.props.children}
                </div>
            </React.Fragment>
        );
    }
}

export default Modal;