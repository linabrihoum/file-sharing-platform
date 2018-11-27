import React, { Component } from 'react';
import classes from'./App.css';

import AuthForm from './containers/AuthForm/AuthForm';
import Projects from './containers/Projects/Projects';
import FileCard from './components/FileCard/FileCard'

class App extends Component {
  render() {
    return (
      <div className="App">
         <div className={classes.header}>
            <Projects />
         </div>
         <div className={classes.body}>
            <div className={classes.sideBar}>
            </div>
            <div>
              <FileCard />
              <FileCard />
              <FileCard />
              <FileCard />
              <FileCard />
              <FileCard />
              <FileCard />
              <FileCard />
              <FileCard />
              <FileCard />
              <FileCard />
            </div>
         </div>
      </div>
    );
  }
}

export default App;
