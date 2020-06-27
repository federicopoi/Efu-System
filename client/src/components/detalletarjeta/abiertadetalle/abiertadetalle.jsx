import React, { Component } from "react";
import { Card, CardBody, Row, Col } from "reactstrap";
import moment from "moment";
import ImagenModal from "../imagenmodal/ImagenModal";
export class AbiertaDetalle extends Component {
  render() {
    const { tarjetas, link_id } = this.props;
    const fecha =
      tarjetas &&
      tarjetas.filter(({ _id }) => _id === link_id).map(({ fecha }) => fecha);

    const timeDiferrence = moment().diff(fecha[0], "days");

    return (
      <div>
        {tarjetas &&
          tarjetas
            .filter(({ _id }) => _id === link_id)
            .map(
              ({
                estado,
                color,
                detecto,
                numero,
                prioridad,
                familia,
                fecha,
                maquina,
                equipo,
                sugerencia,
                tipodeRiesgo,
                riesgoInicial,
                sustoExperimentado,
                sustoObservado,
                impactoAmbiente,
                photo,
              }) => {
                return (
                  <Card>
                    <CardBody>
                      <Row className="my-2">
                        <Col sm={6}>
                          <h5 className="font-16 font-medium">Estado</h5>
                          <h5 className="font-14 font-weight-normal">
                            {estado}
                          </h5>
                        </Col>
                        <Col sm={6}>
                          <h5 className="font-16 font-medium">Color</h5>
                          <h5 className="font-14 font-weight-normal">
                            {color}
                          </h5>
                        </Col>
                      </Row>
                      <Row className="my-2">
                        <Col sm={6}>
                          <h5 className="font-16 font-medium">Detecto</h5>
                          <h5 className="font-14 font-weight-normal">
                            {detecto}
                          </h5>
                        </Col>
                        <Col sm={6}>
                          <h5 className="font-16 font-medium">Prioridad</h5>
                          <h5 className="font-14 font-weight-normal">
                            {prioridad}
                          </h5>
                        </Col>
                      </Row>
                      <Row className="my-2">
                        {color !== "Amarilla" && (
                          <Col sm={6}>
                            <h5 className="font-16 font-medium">Familia</h5>
                            <h5 className="font-14 font-weight-normal">
                              {familia}
                            </h5>
                          </Col>
                        )}
                        {color === "Amarilla" && (
                          <Col sm={6}>
                            <h5 className="font-16 font-medium">
                              Sugerencia para que no se repita
                            </h5>
                            <h5 className="font-14 font-weight-normal">
                              {sugerencia}
                            </h5>
                          </Col>
                        )}
                        <Col sm={6}>
                          <h5 className="font-16 font-medium">
                            Fecha apertura
                          </h5>
                          <h5 className="font-14 font-weight-normal">
                            {moment(fecha).format("l LTS")}
                          </h5>
                        </Col>
                      </Row>
                      <Row className="my-2">
                        <Col sm={6}>
                          <h5 className="font-16 font-medium">
                            Maquina / Instalación
                          </h5>
                          <h5 className="font-14 font-weight-normal">
                            {maquina}
                          </h5>
                        </Col>
                        <Col sm={6}>
                          <h5 className="font-16 font-medium">
                            Equipo Autonomo
                          </h5>
                          <h5 className="font-14 font-weight-normal">
                            {equipo}
                          </h5>
                        </Col>
                      </Row>
                      <Row className="my-2">
                        <Col sm={6}>
                          {color === "Amarilla" ? (
                            <h5 className="font-16 font-medium">
                              Tipo de Riesgo
                            </h5>
                          ) : (
                            <h5 className="font-16 font-medium">Tipo</h5>
                          )}
                          <h5 className="font-14 font-weight-normal">
                            {tipodeRiesgo}
                          </h5>
                        </Col>
                        <Col sm={6}>
                          <h5 className="font-16 font-medium">
                            Riesgo Inicial
                          </h5>
                          <h5 className="font-14 font-weight-normal">
                            {riesgoInicial}
                          </h5>
                        </Col>
                      </Row>

                      {color === "Amarilla" && (
                        <div>
                          <Row className="my-2">
                            <Col>
                              <h5 className="font-16 font-medium">
                                Reporte de Incidente "Susto" experimentado
                              </h5>
                              {sustoExperimentado ? (
                                <h5 className="font-14 font-weight-normal">
                                  Si
                                </h5>
                              ) : (
                                <h5 className="font-14 font-weight-normal">
                                  No
                                </h5>
                              )}
                            </Col>
                            <Col>
                              <h5 className="font-16 font-medium">
                                Reporte de Incidente "Susto" observado
                              </h5>
                              {sustoObservado ? (
                                <h5 className="font-14 font-weight-normal">
                                  Si
                                </h5>
                              ) : (
                                <h5 className="font-14 font-weight-normal">
                                  No
                                </h5>
                              )}
                            </Col>
                          </Row>
                          <Row className="my-2">
                            <Col>
                              <h5 className="font-16 font-medium">
                                El incidente puede afectar al Medio Ambiente
                              </h5>
                              {impactoAmbiente ? (
                                <h5 className="font-14 font-weight-normal">
                                  Si
                                </h5>
                              ) : (
                                <h5 className="font-14 font-weight-normal">
                                  No
                                </h5>
                              )}
                            </Col>
                            {estado === "Abierta" && (
                              <Col>
                                <h5 className="font-16 font-medium">Alerta</h5>
                                {prioridad === "Alta" &&
                                  timeDiferrence <= 15 && (
                                    <h5 className="font-14 font-weight-normal">
                                      Faltan {-timeDiferrence + 15} dias
                                    </h5>
                                  )}
                                {prioridad === "Alta" &&
                                  timeDiferrence >= 15 && (
                                    <h5 className="font-14 font-weight-normal">
                                      Excedido {timeDiferrence - 15} dias
                                    </h5>
                                  )}
                                {prioridad === "Media" &&
                                  timeDiferrence <= 30 && (
                                    <h5 className="font-14 font-weight-normal">
                                      Faltan {-timeDiferrence + 30} dias
                                    </h5>
                                  )}
                                {prioridad === "Media" &&
                                  timeDiferrence >= 30 && (
                                    <h5 className="font-14 font-weight-normal">
                                      Excedido {timeDiferrence - 30} dias
                                    </h5>
                                  )}
                                {prioridad === "Baja" &&
                                  timeDiferrence <= 60 && (
                                    <h5 className="font-14 font-weight-normal">
                                      Faltan {-timeDiferrence + 60} dias
                                    </h5>
                                  )}
                                {prioridad === "Baja" &&
                                  timeDiferrence >= 60 && (
                                    <h5 className="font-14 font-weight-normal">
                                      Excedido {-timeDiferrence - 60} dias
                                    </h5>
                                  )}
                              </Col>
                            )}
                          </Row>
                        </div>
                      )}
                      {color !== "Amarilla" && (
                        <Row>
                          {estado === "Abierta" && (
                            <Col>
                              <h5 className="font-16 font-medium">Alerta</h5>
                              {prioridad === "Alta" && timeDiferrence <= 15 && (
                                <h5 className="font-14 font-weight-normal">
                                  Faltan {-timeDiferrence + 15} dias
                                </h5>
                              )}
                              {prioridad === "Alta" && timeDiferrence >= 15 && (
                                <h5 className="font-14 font-weight-normal">
                                  Excedido {timeDiferrence - 15} dias
                                </h5>
                              )}
                              {prioridad === "Media" &&
                                timeDiferrence <= 30 && (
                                  <h5 className="font-14 font-weight-normal">
                                    Faltan {-timeDiferrence + 30} dias
                                  </h5>
                                )}
                              {prioridad === "Media" &&
                                timeDiferrence >= 30 && (
                                  <h5 className="font-14 font-weight-normal">
                                    Excedido {timeDiferrence - 30} dias
                                  </h5>
                                )}
                              {prioridad === "Baja" && timeDiferrence <= 60 && (
                                <h5 className="font-14 font-weight-normal">
                                  Faltan {-timeDiferrence + 60} dias
                                </h5>
                              )}
                              {prioridad === "Baja" && timeDiferrence >= 60 && (
                                <h5 className="font-14 font-weight-normal">
                                  Excedido {-timeDiferrence - 60} dias
                                </h5>
                              )}
                            </Col>
                          )}
                          <Col>
                            <h5 className="font-16 font-medium">Imagen</h5>
                            <ImagenModal
                              color={color}
                              numero={numero}
                            ></ImagenModal>
                          </Col>
                        </Row>
                      )}
                    </CardBody>
                  </Card>
                );
              }
            )}
      </div>
    );
  }
}

export default AbiertaDetalle;
