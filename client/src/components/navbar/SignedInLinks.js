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
import { logout } from "../../store/actions/authActions";
const SignedInLinks = (props) => {
  return (
    <div>
      <Nav className="mr-auto" navbar>
        <NavItem>
          <NavLink href="/">Dashboard</NavLink>
        </NavItem>

        <NavItem>
          <NavLink href="/tarjetas">Mis Tarjetas</NavLink>
        </NavItem>
      </Nav>
      <Nav className="ml-auto" navbar>
        <NavItem onClick={props.logout}>
          <NavLink href="/login">Salir</NavLink>
        </NavItem>
      </Nav>
    </div>
  );
};
const mapStateToProps = (state) => ({
  user: state.auth.user,
});
export default connect(mapStateToProps, { logout })(SignedInLinks);
