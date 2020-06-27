import React from "react";

import { Card, CardBody, Col, Row } from "reactstrap";

const CerradaDetalle = (props) => {
  const { tarjetas, link_id } = props;
  return (
    <div>
      <Row>
        <Col>
          <h2 className="mb-3">Detalle de cierre</h2>
        </Col>
      </Row>
      <Card>
        {tarjetas &&
          tarjetas
            .filter(({ _id }) => _id === link_id)
            .map(
              ({
                _id,
                inicioReparacion,
                finReparacion,
                responsable,
                tiempoEmpleado,
                causa,
                tareaRealizada,
                materialUtilizado,
                convertida,
                riesgoFinal,
                verificacion,
                accionesComplementarias,
                color,
                tipoAccion,
              }) => {
                return (
                  <CardBody key={_id}>
                    <Row className="my-3">
                      {color !== "Amarilla" && (
                        <Col sm={6}>
                          <h5 className="font-16 font-medium">
                            Inicio de la reparacion
                          </h5>
                          <h5 className="font-14 font-weight-normal">
                            {inicioReparacion}
                          </h5>
                        </Col>
                      )}
                      {color === "Amarilla" && (
                        <Col sm={6}>
                          <h5 className="font-16 font-medium">Riesgo Final</h5>
                          <h5 className="font-14 font-weight-normal">
                            {riesgoFinal}
                          </h5>
                        </Col>
                      )}
                      <Col sm={6}>
                        {color === "Amarilla" ? (
                          <h5 className="font-16 font-medium">
                            Fecha de terminacion
                          </h5>
                        ) : (
                          <h5 className="font-16 font-medium">
                            Fin de la reparacion
                          </h5>
                        )}
                        <h5 className="font-14 font-weight-normal">
                          {finReparacion}
                        </h5>
                      </Col>
                    </Row>
                    <Row className="my-3">
                      <Col sm={6}>
                        <h5 className="font-16 font-medium">Responsable</h5>
                        <h5 className="font-14 font-weight-normal">
                          {responsable}
                        </h5>
                      </Col>
                      {color !== "Amarilla" && (
                        <Col sm={6}>
                          <h5 className="font-16 font-medium">
                            Tiemplo empleado
                          </h5>
                          <h5 className="font-14 font-weight-normal">
                            {tiempoEmpleado} horas
                          </h5>
                        </Col>
                      )}
                      {color === "Amarilla" && (
                        <Col sm={6}>
                          <h5 className="font-16 font-medium">
                            Tipo de acción
                          </h5>
                          <h5 className="font-14 font-weight-normal">
                            {tipoAccion}
                          </h5>
                        </Col>
                      )}
                    </Row>
                    <Row className="my-3">
                      {color !== "Amarilla" && (
                        <Col sm={6}>
                          <h5 className="font-16 font-medium">
                            Causa de la anomalia
                          </h5>
                          <h5 className="font-14 font-weight-normal">
                            {causa}
                          </h5>
                        </Col>
                      )}
                      {color === "Amarilla" && (
                        <Col sm={6}>
                          <h5 className="font-16 font-medium">
                            Verificacion (Resp. Pilar de seguridad)
                          </h5>
                          {verificacion ? (
                            <h5 className="font-14 font-weight-normal">Si</h5>
                          ) : (
                            <h5 className="font-14 font-weight-normal">No</h5>
                          )}
                        </Col>
                      )}
                      <Col sm={6}>
                        {color === "Amarilla" ? (
                          <h5 className="font-16 font-medium">
                            Acción realizada
                          </h5>
                        ) : (
                          <h5 className="font-16 font-medium">
                            Tarea realizada
                          </h5>
                        )}
                        <h5 className="font-14 font-weight-normal">
                          {tareaRealizada}
                        </h5>
                      </Col>
                    </Row>
                    <Row className="my-3">
                      {color !== "Amarilla" && (
                        <Col sm={6}>
                          <h5 className="font-16 font-medium">
                            Material utilizado
                          </h5>
                          <h5 className="font-14 font-weight-normal">
                            {materialUtilizado}
                          </h5>
                        </Col>
                      )}
                      {color === "Amarilla" && (
                        <Col sm={6}>
                          <h5 className="font-16 font-medium">
                            Acciones Complementarias
                          </h5>
                          <h5 className="font-14 font-weight-normal">
                            {accionesComplementarias}
                          </h5>
                        </Col>
                      )}
                      {color !== "Azul" && (
                        <Col sm={6}>
                          <h5 className="font-16 font-medium">
                            Tarjeta Convertida
                          </h5>

                          {convertida ? (
                            <h5 className="font-14 font-weight-normal">Si</h5>
                          ) : (
                            <h5 className="font-14 font-weight-normal">No</h5>
                          )}
                        </Col>
                      )}
                    </Row>
                    <Row className="my-3">
                      {color !== "Amarilla" && (
                        <Col sm={6}>
                          <h5 className="font-16 font-medium">
                            Tipo de acción
                          </h5>
                          <h5 className="font-14 font-weight-normal">
                            {tipoAccion}
                          </h5>
                        </Col>
                      )}
                    </Row>
                  </CardBody>
                );
              }
            )}
      </Card>
    </div>
  );
};

export default CerradaDetalle;
