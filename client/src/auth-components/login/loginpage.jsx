import React, { Component } from "react";
import { Container } from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../store/actions/authActions";
import { clearErrors } from "../../store/actions/errorActions";
import { Alert, Label, Input, Form, FormGroup, Button, Col } from "reactstrap";
import { withRouter } from "react-router-dom";

export class LoginPage extends Component {
  state = {
    email: "",
    password: "",
    msg: null,
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
  };

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;
    if (error !== prevProps.error) {
      //Check for login error
      if (error.id === "LOGIN_FAIL") {
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

    const { email, password } = this.state;

    const user = {
      email,
      password,
    };
    //Attempt to login
    this.props.login(user);
  };
  render() {
    return (
      <div>
        <div className="page-wrapper d-block">
          <div className="page-content container-fluid">
            <Container className="App">
              <h2 className="mb-3">Administrador de tarjetas</h2>
              <Form className="form" onSubmit={this.onSubmit}>
                <Col>
                  <FormGroup>
                    <Label>Email</Label>
                    <Input
                      type="email"
                      name="email"
                      id="exampleEmail"
                      onChange={this.onChange}
                      placeholder="myemail@email.com"
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="examplePassword">Contraseña</Label>
                    <Input
                      type="password"
                      name="password"
                      onChange={this.onChange}
                      id="examplePassword"
                      placeholder="********"
                    />
                  </FormGroup>
                </Col>
                {this.state.msg ? (
                  <Alert color="danger">{this.state.msg}</Alert>
                ) : null}
                <Button>Submit</Button>
              </Form>
            </Container>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});
export default withRouter(
  connect(mapStateToProps, { login, clearErrors })(LoginPage)
);
