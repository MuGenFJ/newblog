import PropTypes from "prop-types"
import { Link } from "gatsby"
import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavbarText
} from 'reactstrap';

const Header = ({ siteTitle }) => {

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (

    <Navbar fixed="top" light expand="sm">

      <div className="container">
        <Link className="navbar-brand" to="/">{siteTitle}</Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <Link className="nav-link" to="/about">About</Link>
            </NavItem>
            <NavItem>
              <Link className="nav-link" to="/team">Team</Link>
            </NavItem>
            <NavItem>
              <Link className="nav-link" to="/tags">Tags</Link>
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
