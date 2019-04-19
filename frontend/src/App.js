import React, { Component } from 'react';
//import { Navbar, Row, Col, Button, Input} from 'reactstrap';


import classes from'./App.css';
import MainDashboard from './screens/MainDashboard/MainDashboard';
import AccountSettings from './screens/AccountSettings/AccountSettings';
import LoginForm from './screens/LoginForm/LoginForm';

//Diego Branch

class App extends Component {
    state ={
      // viewSettings : false
      authenticated: false
    }
    
    openSettingsHandler = () =>{
      this.setState({viewSettings: !this.state.viewSettings});
    }
    
    render(){
      return(
        <React.Fragment>
        {this.state.authenticated ? <MainDashboard /> : <LoginForm app={this}/>}
      </React.Fragment>
      );
    }
}

export default App;
