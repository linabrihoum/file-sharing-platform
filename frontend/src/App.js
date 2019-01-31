import React, { Component } from 'react';
import { Navbar, Row, Col, Button, Input} from 'reactstrap';
import axios from 'axios';

import classes from'./App.css';
import AuthForm from './containers/AuthForm/AuthForm';
import Projects from './containers/Projects/Projects';
import FileDisplay from './components/FileDisplay/FileDisplay';
import Modal from './components/Modal/Modal';
import InnerNav from './components/InnerNav/InnerNav';
import FileTree from './components/FileTree/FileTree';

//Diego Branch

class App extends Component {
  
  state = {
    projects: null,
    currentProject:null,
    currentFiles: [],
    windowWidth: window.innerWidth,
    windowHeight: window.innerHeight,
    uploading : false
  }

  resize(){
    // This will determine the height and width of the window
    this.setState({
      windowHeight: window.innerHeight,
      windowWidth: window.innerWidth
    })
  }

  componentDidMount(){
    // This attaches an event listener on the window 
    this._resize = this.resize.bind(this);
    // Get the projects from the database
    window.addEventListener("resize", this._resize);
        axios.get("https://react-my-burger-dfbcb.firebaseio.com/projects.json")
            .then(response =>{
                this.setState({projects: response.data});
            }).catch(error =>{
                console.log("error")
            })
    }
    
  setCurrentProject = (project) =>{
        // This will fetch the files based on the current project that is open
        this.setState({currentProject: project});
        axios.get("https://react-my-burger-dfbcb.firebaseio.com/projectFiles.json")
            .then(response =>{
              let currentProject = this.state.currentProject;
             
              if(currentProject){
                this.setState({currentFiles: response.data[currentProject]});
                console.log(this.state.currentFiles)
              }
             
            }).catch(error =>{
                console.log("error");
            });
    }
    
    //This will open the modal, and start the uploading process
    startUploadHandler = () => {
      this.setState({uploading: true})
    }
    
    //This will cancel the upload process and close the modal
    cancelUploadHandler = () => {
      this.setState({uploading : false});
    }
  
  render() {
    
    const mainContainerStyle = {
      height: this.state.windowHeight - 54,
      padding: "8px",
      width: this.state.windowWidth,
      backgroundColor: "#e4ecf5",
      margin:0,
      border: "2px solid #e4ecf5"
    }
 
    return (
      <div className={classes.App}>
      <Modal show={this.state.uploading} modalClosed={this.cancelUploadHandler}/>
        <Navbar className={classes.navbar}>
          <Projects projects={this.state.projects} setProject = {this.setCurrentProject.bind(this)}/>
          <span className={classes.icon}>
            <i className="far fa-question-circle" style={{"paddingRight":"5px"}}></i>
            <i className="far fa-user-circle"></i>
          </span>
        </Navbar>
        <Row style={mainContainerStyle}>
            <Col xs = "2" className={classes.sideNav}>
              <FileTree />
            </Col>
            <Col xs="10">
              <InnerNav clicked={this.startUploadHandler.bind(this)}/>
              <FileDisplay height={this.state.windowHeight - 132} files={this.state.currentFiles}/>
            </Col>
         </Row>
       </div>
    );
  }
}

export default App;
