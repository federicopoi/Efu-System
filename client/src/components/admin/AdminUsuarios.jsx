import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Card,
  CardBody,
  Row,
  Col,
  Table,
  Button,
  Container,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { Link, Redirect } from "react-router-dom";
import CampoModal from "./camposModal";
import { getUsers, borrarUser } from "../../store/actions/usersActions";
import { borrarCampo } from "../../store/actions/camposActions";
import { getCampos } from "../../store/actions/camposActions";
export class AdminUsuarios extends Component {
  componentDidMount() {
    this.props.getUsers();
    this.props.getCampos();
  }
  onDeleteClick = (id) => {
    this.props.borrarUser(id);
    this.props.history.push("/admin");
  };
  onDeleteClickCampo = (id) => {
    this.props.borrarCampo(id);
    this.props.history.push("/admin");
  };
  state = {
    idMaquina: "",
    idEquipo: "",
    idTipo: "",
  };
  render() {
    const { users } = this.props.users;
    const { campos } = this.props.campos;
    console.log(this.state);
    return (
      <div>
        <div className="page-wrapper d-block">
          <div className="page-content container-fluid">
            {this.props.user && this.props.user.role === "Admin" && (
              <Container>
                <Row>
                  s
                  <Col>
                    <div className="d-sm-flex align-items-center">
                      <div className="">
                        <div>
                          <h2 className="mb-3">Administrar usuarios</h2>
                        </div>
                      </div>
                      <div className="ml-auto d-sm-flex no-block align-items-center mb-3">
                        <Link to="/register">
                          <Button color="success" className="btn">
                            Agregar usuario
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </Col>
                </Row>
                <Card>
                  <CardBody>
                    <Table className="no-wrap v-middle" responsive>
                      <thead>
                        <tr className="border-0">
                          <th className="border-0">Email</th>
                          <th className="border-0">Rol</th>
                          <th className="border-0">Acciones</th>
                        </tr>
                      </thead>
                      {users &&
                        users.map(({ name, email, role, _id }) => {
                          return (
                            <tbody key={_id}>
                              <tr>
                                <td>{email}</td>
                                <td>{role}</td>
                                <td>
                                  <Button
                                    onClick={this.onDeleteClick.bind(this, _id)}
                                    className="bg-danger border-danger"
                                  >
                                    Borrar
                                  </Button>
                                </td>
                              </tr>
                            </tbody>
                          );
                        })}
                    </Table>
                  </CardBody>
                </Card>
                <Row>
                  <Col>
                    <div className="d-sm-flex align-items-center">
                      <div className="">
                        <div>
                          <h2 className="mb-3">Administrar campos</h2>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
                <Card>
                  <CardBody>
                    <Row>
                      <Col>
                        <div className="d-sm-flex align-items-center">
                          <div className="">
                            <div>
                              <FormGroup>
                                <Label for="maquina">
                                  Maquina / Instalación
                                </Label>
                                <Input
                                  type="select"
                                  name="maquina"
                                  id="maquina"
                                  onChange={(e) => {
                                    this.setState({
                                      idMaquina: e.target.value,
                                    });
                                  }}
                                >
                                  <option>Seleccionar</option>
                                  {campos &&
                                    campos
                                      .filter(({ name }) => {
                                        return name === "maquina";
                                      })
                                      .map(({ name, value, _id }) => {
                                        return (
                                          <option value={_id}>{value}</option>
                                        );
                                      })}
                                </Input>
                              </FormGroup>
                            </div>
                          </div>
                          <div className="ml-auto d-sm-flex no-block align-items-center mb-3">
                            <CampoModal campo="maquina"></CampoModal>
                            <Button
                              onClick={this.onDeleteClickCampo.bind(
                                this,
                                this.state.idMaquina
                              )}
                              className="bg-danger border-danger ml-3"
                            >
                              Borrar
                            </Button>
                          </div>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <div className="d-sm-flex align-items-center">
                          <div className="">
                            <div>
                              <FormGroup>
                                <Label for="tipo">Tipo</Label>
                                <Input
                                  type="select"
                                  name="tipo"
                                  id="tipo"
                                  onChange={(e) => {
                                    this.setState({
                                      idTipo: e.target.value,
                                    });
                                  }}
                                >
                                  <option>Seleccionar</option>
                                  {campos &&
                                    campos
                                      .filter(({ name }) => {
                                        return name === "tipo";
                                      })
                                      .map(({ name, value, _id }) => {
                                        return (
                                          <option value={_id}>{value}</option>
                                        );
                                      })}
                                </Input>
                              </FormGroup>
                            </div>
                          </div>
                          <div className="ml-auto d-sm-flex no-block align-items-center mb-3">
                            <CampoModal campo="tipo"></CampoModal>
                            <Button
                              onClick={this.onDeleteClickCampo.bind(
                                this,
                                this.state.idTipo
                              )}
                              className="bg-danger border-danger ml-3"
                            >
                              Borrar
                            </Button>
                          </div>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <div className="d-sm-flex align-items-center">
                          <div className="">
                            <div>
                              <FormGroup>
                                <Label for="equipo">Equipo</Label>
                                <Input
                                  type="select"
                                  name="equipo"
                                  id="equipo"
                                  onChange={(e) => {
                                    this.setState({
                                      idEquipo: e.target.value,
                                    });
                                  }}
                                >
                                  <option>Seleccionar</option>
                                  {campos &&
                                    campos
                                      .filter(({ name }) => {
                                        return name === "equipo";
                                      })
                                      .map(({ name, value, _id }) => {
                                        return (
                                          <option value={_id}>{value}</option>
                                        );
                                      })}
                                </Input>
                              </FormGroup>
                            </div>
                          </div>
                          <div className="ml-auto d-sm-flex no-block align-items-center mb-3">
                            <CampoModal campo="equipo"></CampoModal>
                            <Button
                              onClick={this.onDeleteClickCampo.bind(
                                this,
                                this.state.idEquipo
                              )}
                              className="bg-danger border-danger ml-3"
                            >
                              Borrar
                            </Button>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Container>
            )}
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    users: state.users,
    user: state.auth.user,
    campos: state.campos,
    isAuthenticated: state.auth.isAuthenticated,
  };
};
export default connect(mapStateToProps, {
  getUsers,
  borrarUser,
  getCampos,
  borrarCampo,
})(AdminUsuarios);
