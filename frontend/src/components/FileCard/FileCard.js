import React from 'react';
import {Card, CardImg, CardText, CardBody, CardTitle,
    CardSubtitle, Input, FormGroup} from 'reactstrap';
    
import classes from "./FileCard.css";


const fileCard = (props) =>(
    <div>
        <Card className = {classes.card}>
            <input type="checkbox" className={classes.toggleBox}/>
            <span className={classes.icon}>
                <i class="fas fa-file"></i>
            </span>
            <CardText>{props.children}</CardText>
        </Card>
    </div>
);


export default fileCard;