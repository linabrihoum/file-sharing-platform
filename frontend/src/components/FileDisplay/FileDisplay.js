import React from 'react';
import { Row, Col} from 'reactstrap';

import FileCard from '../FileCard/FileCard';
import classes from './FileDisplay.css'

const fileDisplay = (props) => {
    console.log("New Props from file Display");
    let files = props.files.map((file)=>
      <FileCard project = {file} />
    )
    
    return(
        <Row>
            <Col className ={classes.fileCardContainer} style = {{"height" : props.height}}>
              {files}
              {files}
              {files}
              {files}
              {files}
              {files}
              {files}
              {files}
              {files}
              {files}
              {files}
            </Col>
        </Row>
        );
};

export default fileDisplay;