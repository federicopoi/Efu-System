import React, { Component } from "react";
import CerrarTarjetaModal from "../cerrartarjeta/CerrarTarjetaModal";
import CerrarTarjetaAmarillaModal from "../cerrartarjeta/CerrarTarjetaAmarillaModal";
import QRModal from "./QRModal";
import { withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { borrarTarjeta } from "../../../store/actions/tarjetaActions";
import { Button, Row, Col } from "reactstrap";
export class TextDetail extends Component {
  onDeleteClick = (id) => {
    this.props.borrarTarjeta(id);
    this.props.history.push("/tarjetas");
  };

  render() {
    const { tarjetas, link_id } = this.props;

    return (
      <div>
        {tarjetas &&
          tarjetas
            .filter(({ _id }) => _id === link_id)
            .map(({ numero, descripcion, color, estado, _id }) => {
              return (
                <div className="mb-3 break-text">
                  <div className="d-flex align-items-center">
                    <div>
                      <h2 className="mb-3">
                        Tarjeta {color} N° {numero}
                      </h2>

                      <h5 className="font-weight-normal">{descripcion}</h5>

                      <Row className="mt-3">
                        {estado === "Abierta" && color !== "Amarilla" && (
                          <Col>
                            <CerrarTarjetaModal
                              _id={link_id}
                              color={color}
                            ></CerrarTarjetaModal>
                          </Col>
                        )}
                        {estado === "Abierta" && color === "Amarilla" && (
                          <Col>
                            <CerrarTarjetaAmarillaModal
                              _id={link_id}
                              color={color}
                            ></CerrarTarjetaAmarillaModal>
                          </Col>
                        )}

                        <Col>
                          <QRModal
                            path={this.props.location.pathname}
                            color={color}
                            numero={numero}
                          >
                            Mostrar QR
                          </QRModal>
                        </Col>
                        {localStorage.token && (
                          <Col>
                            <Button
                              color="danger"
                              onClick={this.onDeleteClick.bind(this, _id)}
                            >
                              Borrar Tarjeta
                            </Button>
                          </Col>
                        )}
                      </Row>
                    </div>
                  </div>
                </div>
              );
            })}
      </div>
    );
  }
}

export default connect(null, { borrarTarjeta })(withRouter(TextDetail));
