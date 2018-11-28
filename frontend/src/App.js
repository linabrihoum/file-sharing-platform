import React, { Component } from 'react';
import Dashboard from './components/Dashboard'
import LoginForm from './components/LoginForm'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authenticated: false
    };
  }
  componentDidMount() {
    // Check for stored cookie.
  }

  render() {
    return (
      <React.Fragment>
        {this.state.authenticated ? <Dashboard /> : <LoginForm app={this}/>}
      </React.Fragment>
    );
  }
}

export default App;