import PropTypes from "prop-types"
import { Link } from "gatsby"
import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText
} from 'reactstrap';

const Header = ({ siteTitle }) => {

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (

    <Navbar fixed="top" light expand="sm">

      <div className="container">
        <NavbarBrand><Link to="/">{siteTitle}</Link></NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink ><Link to="/about">About</Link></NavLink>
            </NavItem>
            <NavItem>
              <NavLink ><Link to="/team">Team</Link></NavLink>
            </NavItem>
            <NavItem>
              <NavLink ><Link to="/tags">Tags</Link></NavLink>
            </NavItem>
          </Nav>
          <NavbarText>Simple Text</NavbarText>
        </Collapse>
      </div>

    </Navbar>
  );
}


Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
