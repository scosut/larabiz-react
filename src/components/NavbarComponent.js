import React from 'react';
import {
  Container,
  Collapse,
  Nav,
  NavItem,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import { Link, NavLink as NavLinkRouter, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { toggleNavigation } from '../redux/actionCreators';

const mapStateToProps = state => {
  return {
    navbar: state.navbar,
    user: state.user
  };
};

const mapDispatchToProps = {
  toggleNavigation: () => toggleNavigation(),
};

const NavbarComponent = (props) => {
  return (
    <Navbar color="dark" dark expand="md">
      <Container>
        <NavbarBrand tag={Link} to="/">Larabiz</NavbarBrand>
        <NavbarToggler onClick={() => this.props.toggleNavigation()} />
        <Collapse isOpen={props.navbar.navOpen} navbar>
          <Nav navbar className="ml-auto">
            {props.user.name.length === 0 &&
              <React.Fragment>
                <NavItem>
                  <NavLinkRouter exact to="/login" className="nav-link">
                    Login
                  </NavLinkRouter>
                </NavItem>
                <NavItem>
                  <NavLinkRouter exact to="/register" className="nav-link">
                    Register
                  </NavLinkRouter>
                </NavItem>
              </React.Fragment>
            }

            {props.user.name.length > 0 &&
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle tag="a" nav caret>{props.user.name}</DropdownToggle>
                <DropdownMenu>
                  <DropdownItem tag={Link} to='/dashboard'>Dashboard</DropdownItem>
                  <DropdownItem tag={Link} to='/logout'>Logout</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            }
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavbarComponent));