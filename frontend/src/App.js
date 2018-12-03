import React, { Component } from 'react';
import classes from'./App.css';
import { Navbar, Row, Col} from 'reactstrap';
import axios from 'axios';

import AuthForm from './containers/AuthForm/AuthForm';
import Projects from './containers/Projects/Projects';
import FileCard from './components/FileCard/FileCard'

//Test Branch

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
    window.addEventListener("resize", this._resize);
        axios.get("https://react-my-burger-dfbcb.firebaseio.com/projects.json")
            .then(response =>{
                this.setState({projects: response.data});
            }).catch(error =>{
                console.log("error")
            })
    }
    
  setCurrentProject(project){
    console.log("Set Project:",project);
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
      padding: 0,
      width: this.state.windowWidth,
      backgroundColor: "gray",
      margin:0,
      border: "2px solid green"
    }
    
    let files = this.state.currentFiles.map((file)=>
      <FileCard project = {file} />
    )
    
    return (
      <div className={classes.App}>
        <Navbar color="dark">
          <Projects />
        </Navbar>
        <Row style={style}>
            <Col xs = "2" style={{"background-color" : "rgba(0,0,255, 0.5)"}}>SideBar</Col>
              <Col xs="10" style ={{"background-color" : "rgba(0, 255, 0, 0.5)"}}>
                <Row>
                  <Col style = {{"background-color" : "rgba(255,0,0,1)", "padding":"10px"}}>innercol</Col>
                </Row>
                <Row>
                  <Col style = {{"background-color": "white", "height" : style.height - 48, "overflow": "auto"}}>
                    <img style={{"padding": "10px"}}src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180"/>
                    <img style={{"padding": "10px"}}src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180"/>
                    <img style={{"padding": "10px"}}src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180"/>
                    <img style={{"padding": "10px"}}src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180"/>
                    <img style={{"padding": "10px"}}src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180"/>
                    <img style={{"padding": "10px"}}src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180"/>
                    <img style={{"padding": "10px"}}src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180"/>
                    <img style={{"padding": "10px"}}src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180"/>
                    <img style={{"padding": "10px"}}src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180"/>
                    <img style={{"padding": "10px"}}src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180"/>
                    <img style={{"padding": "10px"}}src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180"/>
                  </Col>
                </Row>
               </Col>
         </Row>
       </div>
    );
  }
}

export default App;
