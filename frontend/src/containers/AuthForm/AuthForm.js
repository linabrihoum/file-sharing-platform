import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Button} from 'reactstrap';

 import classes from './AuthForm.css';

class AuthForm extends Component {
    
    render(){
        
        return(
            <Form className={classes.form}>
                <FormGroup>
                    <Label for="emailInput">Email</Label>
                    <Input type="email" name="email" id="emailInput" placeholder="Email" />
                </FormGroup>
                <FormGroup>
                    <Label for="passwordInput">Password</Label>
                    <Input type="password" name="password" id="passwordInput" placeholder="Password"/>
                </FormGroup>
                <Button color="primary">Submit</Button>
            </Form>
        
        )
    }
}

export default AuthForm;