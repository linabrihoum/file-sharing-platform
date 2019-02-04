import React, { Component } from 'react';

import classes from './AccountSettings.css';
import SettingsContent from '../../containers/SettingsContent/SettingsContent';

class AccountSettings extends Component {
    
    state = {
        windowHeight : window.innerHeight,
        menu : [
            "Profile",
            "Account",
            "Notifications",
            "Privacy"
            ],
        selectedOption : "Profile"
    }
    
    resizeWindow = () => {
    // This will determine the height and width of the window
    this.setState({
      windowHeight: window.innerHeight,
      windowWidth: window.innerWidth
    });
  }
    
    componentDidMount(){
    // This attaches an event listener on the window 
    this.resize = this.resizeWindow.bind(this);
    // Get the projects from the database
    window.addEventListener("resize", this.resize);

    }
    
    selectedOptionHandler = event => {
        this.setState({selectedOption : event.target.innerText});
    }
    
    
    render(){
        
        
        let menu = this.state.menu.map((option, index) => {
            let style = {};
            if(index === 0){
                style.borderTop = "1px solid gray"
            }
            if(option === this.state.selectedOption){
                style.backgroundColor = "rgba(55, 79, 101, 1.0)"
                style.color = "white";
            }
            return(
                <div 
                    className={classes.menuOption} 
                    onClick={this.selectedOptionHandler}
                    style={style}>{option}</div>
                );
        });
        
        return(
            <div style={{"height": this.state.windowHeight}} className={classes.mainContainer}>
                <div className={classes.sideBar}>
                    <div className={classes.sideBarContainer}>
                        <div className={classes.userPic}></div>
                        <div style={{"marginBottom":"20px", "textAlign":"center"}}>Diego De La Torre</div>
                        {menu}
                    </div>
                </div>
                <div className={classes.content}>
                    <div className={classes.contentContainer}>
                        <SettingsContent menuOption={this.state.selectedOption} />
                    </div>
                </div>
            </div>
        )
    }
}

export default AccountSettings;