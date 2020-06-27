import React, { Component } from "react";
import { Row, Col, Container } from "reactstrap";
import { connect } from "react-redux";
import { getTarjetas } from "../../store/actions/tarjetaActions";
import { CerradaDetalle, TextDetail, AbiertaDetalle, ImagenDetalle } from ".";

class LayoutDetalle extends Component {
  componentDidMount() {
    this.props.getTarjetas();
  }
  render() {
    const { tarjetas } = this.props.tarjetas;
    const link_id = this.props.location.pathname.substr(9);
    const estadoTarjeta = tarjetas
      .filter(({ _id }) => _id === link_id)
      .map(({ estado }) => estado);

    return (
      <div>
        <div className="page-wrapper d-block">
          <div className="page-content container-fluid">
            <Container className="container-fluid">
              {estadoTarjeta.toString() === "Abierta" ? (
                <Row>
                  <Col sm={12} lg={12}>
                    <TextDetail
                      tarjetas={tarjetas}
                      link_id={link_id}
                    ></TextDetail>
                    <AbiertaDetalle
                      tarjetas={tarjetas}
                      link_id={link_id}
                    ></AbiertaDetalle>
                    <ImagenDetalle
                      tarjetas={tarjetas}
                      link_id={link_id}
                    ></ImagenDetalle>
                  </Col>
                </Row>
              ) : (
                <div>
                  <Row>
                    <Col sm={6} lg={5}>
                      <TextDetail
                        tarjetas={tarjetas}
                        link_id={link_id}
                      ></TextDetail>

                      <AbiertaDetalle
                        tarjetas={tarjetas}
                        link_id={link_id}
                      ></AbiertaDetalle>
                    </Col>

                    <Col sm={6} lg={7}>
                      <CerradaDetalle
                        tarjetas={tarjetas}
                        link_id={link_id}
                      ></CerradaDetalle>
                      <ImagenDetalle
                        tarjetas={tarjetas}
                        link_id={link_id}
                      ></ImagenDetalle>
                    </Col>
                  </Row>
                </div>
              )}
            </Container>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    tarjetas: state.tarjetas,
  };
};
export default connect(mapStateToProps, { getTarjetas })(LayoutDetalle);
