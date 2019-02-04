import React, { Component } from 'react';
//import { Navbar, Row, Col, Button, Input} from 'reactstrap';


import classes from'./App.css';
import MainDashboard from './screens/MainDashboard/MainDashboard';
import AccountSettings from './screens/AccountSettings/AccountSettings';

//Diego Branch

class App extends Component {
  
    render(){
      return(
        <div>
          <AccountSettings />
          
        </div>
      );
    }
}

export default App;
