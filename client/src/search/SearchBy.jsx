import React, { Component } from "react";
import { Container, Input, Label, Button } from "reactstrap";
import { getTarjetas } from "../store/actions/tarjetaActions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
class SearchBy extends Component {
  componentDidMount() {
    this.props.getTarjetas();
  }
  state = {
    color: "",
    numero: "",
  };
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    const { tarjetas } = this.props.tarjetas;

    const tarjetaFinal = tarjetas
      .filter(({ color, numero }) => {
        return (
          (color === this.state.color && numero === this.state.numero) ||
          (this.state.code === "A" && color === "Azul") ||
          (this.state.code === "Am" && color === "Amarilla") ||
          (this.state.code === "V" && color === "Verde")
        );
      })
      .map((item) => {
        return item._id;
      });

    console.log(tarjetaFinal[0]);

    return (
      <div>
        <div className="page-wrapper d-block">
          <div className="page-content container-fluid">
            <Container>
              <h3>Buscar por color y numero</h3>
              <Label for="color">Color *</Label>
              <Input
                type="select"
                name="color"
                id="color"
                onChange={this.onChange}
              >
                <option>Seleccionar</option>
                <option>Roja</option>
                <option>Azul</option>
                <option>Verde</option>
                <option>Amarilla</option>
              </Input>
              <Label for="color">Numero *</Label>
              <Input
                type="number"
                name="numero"
                id="numero"
                onChange={this.onChange}
              ></Input>
              <Link to={{ pathname: `/tarjeta/${tarjetaFinal[0]}` }}>
                <Button color="secondary" className="btn mt-3">
                  Buscar
                </Button>
              </Link>
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
export default connect(mapStateToProps, { getTarjetas })(SearchBy);
