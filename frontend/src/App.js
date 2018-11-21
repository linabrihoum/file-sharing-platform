import React, { Component } from 'react';
import './App.css';
import AuthForm from './containers/AuthForm/AuthForm';

class App extends Component {
  render() {
    return (
      <div className="App">
       <h1>Home</h1>
       <AuthForm />
      </div>
    );
  }
}

export default App;
