import React, { Component } from 'react';
import classes from'./App.css';
import { Input,InputGroup, Button} from 'reactstrap';
import axios from 'axios';

import AuthForm from './containers/AuthForm/AuthForm';
import Projects from './containers/Projects/Projects';
import FileCard from './components/FileCard/FileCard'

//Test Branch

class App extends Component {
  
  state = {
    projects: null,
    currentProject:null,
    currentFiles: []
  }
  
  componentDidMount(){
        console.log("Component did mount from App.js");
        
        axios.get("https://react-my-burger-dfbcb.firebaseio.com/projects.json")
            .then(response =>{
                this.setState({projects: response.data});
            }).catch(error =>{
                console.log("error")
            })
    }
    
    
     componentWillUpdate(){
      console.log("componentDidUpdate from App.js");
      
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
    
    console.log("render from App.js")
    console.log(this.state.currentFiles);
    let files = this.state.currentFiles.map((file)=>
      <FileCard project = {file} />
    )
    console.log(files);
    
    return (
      <div className="App">
      
         <div className={classes.header}>
            <Projects 
            projects = { this.state.projects }
            setProject = {this.setCurrentProject.bind(this)}/>
         </div>
         
         <div className={classes.body}>
            <div className={classes.sideBar}>
            </div>
          
            <div>
              <div className={classes.innerBar}>
                <Input className={classes.search} placeholder ="test"/>
              </div>
              <div className={classes.fileCards}>
                  {files}
              </div>
            </div>
         </div>
      </div>
    );
  }
}

export default App;
