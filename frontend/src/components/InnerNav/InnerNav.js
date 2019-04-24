import React from 'react';
import { Row, Col, Button, Input} from 'reactstrap';

import classes from './InnerNav.css';

const innerNav = (props) => {
    
    return(
        <Row>
            <Col className={classes.innerNav}>
              <Button 
                color="secondary" 
                className={classes.uploadButton}
                onClick={props.uploading}>Upload</Button>
              <Button 
                className={classes.downloadButton}
                onClick={props.download}>Download</Button>
              <Button 
                color="danger" 
                className={classes.deleteButton}
                onClick={props.delete}>Delete</Button>
              <Input placeholder="Search" className={classes.searchBar}/>
            </Col>
          </Row>
    );
};

export default innerNav;