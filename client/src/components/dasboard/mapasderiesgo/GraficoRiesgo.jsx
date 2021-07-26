import React, { Component } from "react";
import CanvasJSReact from "../canvasjs.react";
import { Label, Input } from "reactstrap";
import { Row, Col, Card, CardBody, Table } from "reactstrap";
import moment from "moment";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var CanvasJS = CanvasJSReact.CanvasJS;
export class GraficoRiesgo extends Component {
  constructor() {
    super();
    this.state = {
      equipo: "",
      familia: "",
    };
    this.toggleDataSeries = this.toggleDataSeries.bind(this);
  }
  toggleDataSeries(e) {
    if (typeof e.dataSeries.visible === "undefined" || e.dataSeries.visible) {
      e.dataSeries.visible = false;
    } else {
      e.dataSeries.visible = true;
    }

    this.chart.render();
  }
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { tarjetas } = this.props;

    var filter = {
      equipo: this.state.equipo && this.state.equipo,
      familia: this.state.familia && this.state.familia,
    };

    const multiFilter = (arr, filters) => {
      const filterKeys = Object.keys(filters);
      return arr.filter((eachObj) => {
        return filterKeys.every((eachKey) => {
          if (!filters[eachKey].length) {
            return true; // passing an empty filter means that filter is ignored.
          }
          return filters[eachKey].includes(eachObj[eachKey]);
        });
      });
    };
    const newFilter = multiFilter(tarjetas, filter);

    const arrEquipos = tarjetas.map(({ equipo }) => equipo);
    const unicosEquipos = Array.from(new Set(arrEquipos));

    const arrFamilias = tarjetas.map(({ familia }) => familia);
    const unicosFamilias = Array.from(new Set(arrFamilias));

    // Formulas para "Mapas de Riesgo"

    // Cantidad de tarjetas abiertas de newFilter

    const arrAbiertas = newFilter.filter(({ estado }) => {
      return estado === "Abierta";
    });

    const arrCerradas = newFilter.filter(({ estado }) => {
      return estado === "Cerrada";
    });

    // Porcentaje de puntos tratados

    const arrPorcentajePuntos = (arrCerradas.length * 100) / newFilter.length;

    // Nivel Riesgo Inicial

    const arrValuesRiesgoInicial =
      newFilter &&
      newFilter.map(({ riesgoInicial }) => {
        return parseInt(riesgoInicial);
      });

    const nivelRiesgoInicial = arrValuesRiesgoInicial.reduce(
      (a, b) => a + b,
      0
    );

    // Nivel Riesgo Final

    const arrValuesRiesgoFinal =
      arrCerradas &&
      arrCerradas.map(({ riesgoFinal }) => {
        return parseInt(riesgoFinal);
      });

    const sumArrValuesRiesgoFinal = arrValuesRiesgoFinal.reduce(
      (a, b) => a + b,
      0
    );

    const arrValuesRiesgoInicialRestantes =
      arrAbiertas &&
      arrAbiertas.map(({ riesgoInicial }) => {
        return parseInt(riesgoInicial);
      });

    const nivelRiesgoInicialRestantes = arrValuesRiesgoInicialRestantes.reduce(
      (a, b) => a + b,
      0
    );

    const nivelRiesgoFinal =
      sumArrValuesRiesgoFinal + nivelRiesgoInicialRestantes;

    const reduccionRiesgo =
      ((nivelRiesgoInicial - nivelRiesgoFinal) / nivelRiesgoInicial) * 100;

    return (
      <div>
        <Row>
          <Col lg={8} md={12} sm={12}>
            <Card>
              <CardBody>
                <h3>Reducción de Riesgo</h3>
                <Table className="no-wrap v-middle" responsive>
                  <thead>
                    <tr className="border-0">
                      <th className="border-0"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Tarjetas abiertas | | Tarjetas cerradas</td>
                      <td>
                        {newFilter.length} | | {arrCerradas.length}
                      </td>
                    </tr>
                    <tr>
                      <td>Porcentaje de puntos tratados</td>
                      <td>{arrPorcentajePuntos.toFixed(2)} %</td>
                    </tr>
                    <tr>
                      <td>Nivel Riesgo Inicial</td>
                      <td>{nivelRiesgoInicial}</td>
                    </tr>
                    <tr>
                      <td>Nivel Riesgo Final</td>
                      <td>{nivelRiesgoFinal}</td>
                    </tr>
                    <tr>
                      <td>% de Reducción de Riesgo </td>
                      <td>{reduccionRiesgo.toFixed(2)} %</td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
          <Col lg={4} md={12} sm={12}>
            <Card>
              <CardBody>
                <h3>Filtros</h3>
                <Label for="equipo">Equipo</Label>
                <Input
                  type="select"
                  name="equipo"
                  id="equipo"
                  onChange={this.onChange}
                >
                  <option></option>
                  {unicosEquipos.map((item, index) => {
                    return <option key={index}>{item}</option>;
                  })}
                </Input>
                <Label for="equipo" className="mt-3">
                  Familia
                </Label>
                <Input
                  type="select"
                  name="familia"
                  id="familia"
                  onChange={this.onChange}
                >
                  <option></option>
                  {unicosFamilias.map((item, index) => {
                    return <option key={index}>{item}</option>;
                  })}
                </Input>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default GraficoRiesgo;
