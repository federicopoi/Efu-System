import React, { Component } from "react";
import { Card } from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { register } from "../../store/actions/authActions";
import { clearErrors } from "../../store/actions/errorActions";
import { Label, Input, Alert } from "reactstrap";
import { withRouter } from "react-router-dom";

export class RegisterPage extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    role: "",
    acceso: {
      dashboard: true,
      tarjetas: true,
      agregarTarjeta: true,
      detalleTarjeta: true,
    },
    msg: null,
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
  };

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;
    if (error !== prevProps.error) {
      //Check for register error
      if (error.id === "REGISTER_FAIL") {
        this.setState({
          msg: error.msg.msg,
        });
      } else {
        this.setState({
          msg: null,
        });
      }
    }
    if (isAuthenticated) {
      this.props.history.push("/");
    }
  }
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = (e) => {
    e.preventDefault();
    const { username, email, password, role, acceso } = this.state;

    // Create usre object
    const newUser = {
      username,
      email,
      password,
      role,
      acceso,
    };

    // Atempt to register
    this.props.register(newUser);
  };

  render() {
    return (
      <div className="container h-100">
        <div className="row align-items-center h-100">
          <div className="col-6 mx-auto">
            <Card className="px-5 py-5">
              <form onSubmit={this.onSubmit}>
                <h3>Register</h3>

                <div className="form-group">
                  <Label for="name">Nombre de usuario</Label>
                  <Input
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Username"
                    onChange={this.onChange}
                  />
                </div>

                <div className="form-group">
                  <Label for="email">Email</Label>
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                    className="mb-3"
                    onChange={this.onChange}
                  />
                </div>

                <div className="form-group">
                  <Label for="password">Password</Label>
                  <Input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    className="mb-3"
                    onChange={this.onChange}
                  />
                </div>
                <Label for="name">Rol</Label>
                <Input
                  type="text"
                  name="role"
                  id="role"
                  placeholder="Operador de planta"
                  onChange={this.onChange}
                />

                <button type="submit" className="btn btn-primary btn-block">
                  Sign Up
                </button>
                {this.state.msg ? (
                  <Alert color="danger" className="mt-3">
                    {this.state.msg}
                  </Alert>
                ) : null}
                <p className="forgot-password text-right">
                  Already registered <a href="/login">sign in?</a>
                </p>
              </form>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  registerSuccess: state.auth.registerSuccess,
  error: state.error,
});
export default withRouter(
  connect(mapStateToProps, { register, clearErrors })(RegisterPage)
);
