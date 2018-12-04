import React, { Component } from 'react';
import classes from'./App.css';
import { Navbar, Row, Col, Button, Input} from 'reactstrap';
import axios from 'axios';

import AuthForm from './containers/AuthForm/AuthForm';
import Projects from './containers/Projects/Projects';
import FileCard from './components/FileCard/FileCard'

//Diego Branch

class App extends Component {
  
  state = {
    projects: null,
    currentProject:null,
    currentFiles: [],
    windowWidth: window.innerWidth,
    windowHeight: window.innerHeight
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
    
  setCurrentProject(project){
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
  
  render() {
    
    const style = {
      height: this.state.windowHeight - 54,
      padding: "8px",
      width: this.state.windowWidth,
      backgroundColor: "#e4ecf5",
      margin:0,
      border: "2px solid #e4ecf5"
    }
 
    const folderIcon = {
      margin : "0 2px 0 0"
    }
    
    let files = this.state.currentFiles.map((file)=>
      <FileCard project = {file} />
    )
    
    return (
      <div className={classes.App}>
        <Navbar className={classes.navbar}>
          <Projects projects={this.state.projects} setProject = {this.setCurrentProject.bind(this)}/>
          <span className={classes.icon}>
            <i className="far fa-question-circle" style={{"paddingRight":"5px"}}></i>
            <i className="far fa-user-circle"></i>
          </span>
        </Navbar>
        <Row style={style}>
            <Col xs = "2" className={classes.sideNav}>
              <ul>
                <li>
                  <i class="fas fa-folder-open" style={folderIcon}></i>Project folder
                  <ul>
                    <li><i class="fas fa-folder" style={folderIcon}></i>Folder 1</li>
                    <li><i class="fas fa-folder" style={folderIcon}></i>Folder 1</li>
                    <li><i class="fas fa-folder" style={folderIcon}></i>Folder 1</li>
                    <li><i class="fas fa-folder" style={folderIcon}></i>Folder 1</li>
                    <li><i class="fas fa-folder" style={folderIcon}></i>Folder 1</li>
                    <li><i class="fas fa-folder" style={folderIcon}></i>Folder 1</li>
                    <li><i class="fas fa-folder" style={folderIcon}></i>Folder 1</li>
                  </ul>
                </li>
              </ul>
            </Col>
            <Col xs="10">
              <Row>
                <Col className={classes.innerNav}>
                  <Button color="secondary" className={classes.uploadButton}>Upload</Button>
                  <Button color="danger" className={classes.deleteButton}>Delete</Button>
                  <Input placeholder="Search" className={classes.searchBar}/>
                </Col>
              </Row>
              <Row>
                <Col className ={classes.fileCardContainer} style = {{"height" : style.height - 78}}>
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
             </Col>
         </Row>
       </div>
    );
  }
}

export default App;
