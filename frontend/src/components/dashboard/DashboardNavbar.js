import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import ProjectDropdown from './ProjectDropdown'
import AccountDropdown from './AccountDropdown'

export default class DashboardNavbar extends Component {
  constructor(props) {
    super(props);
    
    this.toggle = this.toggle.bind(this);
    this.isProjectSelected = React.createRef();

    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <Navbar className="navbar-main" color="dark" dark expand="md">
        <ProjectDropdown onRef={(ref) => { this.props.onRef(ref); }}/>
        <Nav className="ml-auto" navbar>
          <AccountDropdown />
        </Nav>
      </Navbar>
    );
  }
}