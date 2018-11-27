import React from 'react';
import {Card, CardImg, CardText, CardBody, CardTitle,
    CardSubtitle, Input} from 'reactstrap';
    
import classes from "./FileCard.css";


const fileCard = (props) =>(

        <Card className = {classes.card}>
            <Input className={classes.toggleBox} addon type="checkbox"/>
            <img className={classes.cardImg} src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180"/>
            <CardText className={classes.cardText}>Somefile.txt</CardText>
        </Card>
        

        
);


export default fileCard;