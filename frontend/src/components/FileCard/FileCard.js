import React from 'react';
import {Card, CardImg, CardText, CardBody, CardTitle,
    CardSubtitle, Input, FormGroup} from 'reactstrap';
    
import classes from "./FileCard.css";


const fileCard = (props) =>(
    <div>
        <Card className = {classes.card}>
            <input type="checkbox" className={classes.toggleBox}/>
            <CardImg className={classes.cardImg} src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180"/>
            <CardBody>
                <CardText>{props.children}</CardText>
            </CardBody>
        </Card>
    </div>
);


export default fileCard;