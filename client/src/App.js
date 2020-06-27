import React, { Component } from "react";
import "./App.css";

import AñadirTarjeta from "./components/añadirtarjeta/AñadirTarjeta";
import DashBoard from "./components/dasboard/Dashboard";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import NavBar from "./components/navbar/NavBar";
import Footer from "./components/footer/footer";
import MisTarjetas from "./components/tarjetas/MisTarjetas";
import LoginPage from "./auth-components/login/loginpage";
import RegisterPage from "./auth-components/register/registerpage";
import LayoutDetalle from "./components/detalletarjeta/layout";
import { loadUser } from "./store/actions/authActions";
import { connect } from "react-redux";
import MisTarjetasFiltro from "./components/tarjetas/MisTarjetasFiltro";
class App extends Component {
  componentDidMount() {
    this.props.store.dispatch(loadUser());
  }
  render() {
    const role = this.props.user && this.props.user.role;

    return (
      <BrowserRouter>
        <Switch>
          <div className="App">
            <Route exact path="/(login)" component={LoginContainer} />
            <Route exact path="/(registrarse)" component={RegisterPage} />
            <Route component={DefaultContainer}></Route>
          </div>
        </Switch>
      </BrowserRouter>
    );
  }
}
const LoginContainer = () => <Route path="/login" component={LoginPage} />;

const DefaultContainer = () => (
  <div>
    <NavBar></NavBar>
    <Route exact path="/" component={DashBoard}></Route>
    <Route path="/agregartarjeta" component={AñadirTarjeta}></Route>
    <Route path="/tarjetas" component={MisTarjetas}></Route>
    <Route path="/tarjetasfiltro" component={MisTarjetasFiltro}></Route>
    <Route path="/tarjeta/:id" component={LayoutDetalle}></Route>
    <Footer></Footer>
  </div>
);

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});
export default connect(mapStateToProps)(App);
