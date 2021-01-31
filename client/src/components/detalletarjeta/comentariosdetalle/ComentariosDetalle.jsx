import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Input,
  Table,
  Col,
  Row,
  Button,
  Form,
  FormGroup,
} from "reactstrap";
import { connect } from "react-redux";
import {
  agregarComentario,
  getTarjetas,
} from "../../../store/actions/tarjetaActions";
import moment from "moment";

export class ComentariosDetalle extends Component {
  state = {
    descripcion: "",
    autor: "",
  };
  componentDidMount() {
    this.props.getTarjetas();
  }
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = (e) => {
    e.preventDefault();
    const { descripcion, autor } = this.state;
    const link = this.props.location.pathname;
    const completeLink = link.replace("/tarjeta/", "");

    const nuevoComentario = {
      _id: completeLink,
      comentario: {
        autor,
        descripcion,
        fecha: Date.now(),
      },
    };

    if (descripcion === "" || autor === "") {
      console.log("Error");
    } else {
      this.props.agregarComentario(nuevoComentario);
      document.getElementById("form").reset();
    }
  };
  render() {
    const { tarjetas } = this.props.tarjetas;
    const { link_id } = this.props;
    const link = this.props.location.pathname;
    const completeLink = link.replace("/tarjeta/", "");
    console.log(tarjetas);
    return (
      <div>
        <Card>
          <CardBody>
            <div className="d-flex align-items-center">
              <div className="">
                <h3>Comentarios</h3>
              </div>
            </div>

            <Table className="no-wrap v-middle" responsive>
              <thead>
                <tr className="border-0">
                  <th className="border-0">Autor</th>
                  <th className="border-0">Descripción</th>
                  <th className="border-0">Fecha</th>
                </tr>
              </thead>

              {tarjetas &&
                tarjetas
                  .filter(({ _id }) => _id === completeLink)
                  .map(({ comentarios }) => {
                    return (
                      comentarios &&
                      comentarios.map(({ autor, descripcion, fecha }) => {
                        return (
                          <tbody>
                            <tr>
                              <td>
                                <div className="d-flex no-block align-items-center">
                                  <div className="">
                                    <h5 className="mb-0 font-16 font-medium">
                                      {autor}
                                    </h5>
                                  </div>
                                </div>
                              </td>

                              <td>{descripcion}</td>
                              <td>{moment(fecha).format("DD/MM/YYYY LTS")}</td>
                            </tr>
                          </tbody>
                        );
                      })
                    );
                  })}
            </Table>
            <hr className="mt-3"></hr>
            <Form onSubmit={this.onSubmit} id="form">
              <Row className="mb-1">
                <Col lg={8}>
                  <FormGroup>
                    <Input
                      onChange={this.onChange}
                      type="text"
                      name="descripcion"
                      id="descripcion"
                      placeholder="Añadir nuevo comentario"
                    />
                  </FormGroup>
                </Col>
                <Col lg={2}>
                  <FormGroup>
                    <Input
                      onChange={this.onChange}
                      type="text"
                      name="autor"
                      id="autor"
                      placeholder="Autor"
                    />
                  </FormGroup>
                </Col>
                <Col lg={2}>
                  <Button className="bg-success border-success">Subir</Button>
                </Col>
              </Row>
            </Form>
          </CardBody>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    tarjetas: state.tarjetas,
  };
};
export default connect(mapStateToProps, { agregarComentario, getTarjetas })(
  withRouter(ComentariosDetalle)
);
