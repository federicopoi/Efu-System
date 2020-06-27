import React from "react";
import { connect } from "react-redux";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
const SignOutLinks = (props) => {
  return (
    <div>
      <Nav className="mr-auto" navbar>
        <NavItem>
          <NavLink href="/signin">Login</NavLink>
        </NavItem>
      </Nav>
    </div>
  );
};
const mapStateToProps = (state) => ({
  user: state.auth.user,
});
export default connect(mapStateToProps)(SignOutLinks);
