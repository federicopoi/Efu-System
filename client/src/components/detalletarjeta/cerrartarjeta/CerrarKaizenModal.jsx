import React, { Component } from "react";
import { connect } from "react-redux";
import { clearErrors } from "../../../store/actions/errorActions";
import { cerrarKaizen } from "../../../store/actions/kaizenActions";
import { getCampos } from "../../../store/actions/camposActions";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  Label,
  Input,
  FormGroup,
  Alert,
  Row,
  Col,
} from "reactstrap";
export class CerrarKaizenModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formValues: {
        _id: this.props._id,
        descripcionProblema: "",
        objetivo: "",
        causas: "",
        acciones: "",
        objectivoCompletado: "",
        documentos: "",
        otraMaquina: "",
        responsableSeguimiento: "",
        fechaFinalizacionMejora: "",
        costo: "",
        beneficio: "",
        verificacion: "",
      },
      formErrors: {
        _id: this.props._id,
        descripcionProblema: "",
        objetivo: "",
        causas: "",
        acciones: "",
        objectivoCompletado: "",
        documentos: "",
        otraMaquina: "",
        responsableSeguimiento: "",
        fechaFinalizacionMejora: "",
        costo: "",
        beneficio: "",
        verificacion: "",
      },
      formValidity: {
        _id: this.props._id,
        descripcionProblema: false,
        objetivo: false,
        causas: false,
        acciones: false,
        objectivoCompletado: false,
        documentos: false,
        otraMaquina: false,
        responsableSeguimiento: false,
        fechaFinalizacionMejora: false,
        costo: false,
        beneficio: false,
        verificacion: false,
      },
      isSubmitting: false,
      modal: false,
      tarjetasHacer: [],
      color: "",
      numero: "",
    };
  }

  handleChange = ({ target }) => {
    const { formValues } = this.state;
    formValues[target.name] = target.value;
    this.setState({ formValues });
    this.handleValidation(target);
  };

  handleValidation = (target) => {
    const { name, value } = target;
    const fieldValidationErrors = this.state.formErrors;
    const validity = this.state.formValidity;
    const isEmail = name === "email";
    const isPassword = name === "password";
    const isInicioReparacion = name === "inicioReparacionDia";
    const isFinReparacion = name === "finReparacionDia";
    const emailTest = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    validity[name] = value.length > 0;
    fieldValidationErrors[name] = validity[name]
      ? ""
      : "Este campo es requerido y no puede estar vacio";

    if (validity[name]) {
      if (isEmail) {
        validity[name] = emailTest.test(value);
        fieldValidationErrors[name] = validity[name]
          ? ""
          : `${name} should be a valid email address`;
      }
      if (isPassword) {
        validity[name] = value.length >= 3;
        fieldValidationErrors[name] = validity[name]
          ? ""
          : `${name} should be 3 characters minimum`;
      }
    }

    this.setState({
      formErrors: fieldValidationErrors,
      formValidity: validity,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ isSubmitting: true });
    const { formValues, formValidity } = this.state;
    if (Object.values(formValidity).every(Boolean)) {
      // Here is when the validate comes
      this.setState({ isSubmitting: false });

      const {
        _id,
        descripcionProblema,
        objetivo,
        causas,
        acciones,
        objectivoCompletado,
        documentos,
        otraMaquina,
        responsableSeguimiento,
        fechaFinalizacionMejora,
        costo,
        beneficio,
        verificacion,
      } = this.state.formValues;

      // Cerrar Tarjeta
      const tarjetaActualizada = {
        _id,
        descripcionProblema,
        objetivo,
        causas,
        acciones,
        tarjetasHacer: this.state.tarjetasHacer,
        objectivoCompletado,
        documentos,
        otraMaquina,
        responsableSeguimiento,
        fechaFinalizacionMejora,
        costo,
        beneficio,
        verificacion,
      };

      this.props.cerrarKaizen(tarjetaActualizada);
      this.toggle();
    } else {
      for (let key in formValues) {
        let target = {
          name: key,
          value: formValues[key],
        };
        this.handleValidation(target);
      }
      this.setState({ isSubmitting: false });
    }
  };

  onChangeConvertida = (e) => {
    this.setState({ formValues: { convertida: e.tarjet.value } });
  };

  onChangeRegular = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmitHacer = (color, numero) => {
    this.setState((prevState) => ({
      tarjetasHacer: [...prevState.tarjetasHacer, this.state.color],
    }));
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  componentDidMount() {
    this.props.getCampos();
  }
  render() {
    const { campos } = this.props.campos;
    const { formValues, formErrors, isSubmitting } = this.state;

    return (
      <div>
        <p onClick={this.toggle} style={{ cursor: "pointer" }} className="my-3">
          Cerrar Kaizen
        </p>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Cerrar Kaizen</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handleSubmit}>
              <FormGroup>
                <h4 className="mt-2 text-center">Planificar</h4>

                <Label for="descripcionProblema">
                  Descripción del Problema
                </Label>
                <Input
                  onChange={this.handleChange}
                  value={formValues.descripcionProblema}
                  type="text"
                  name="descripcionProblema"
                  id="descripcionProblema"
                  className={`form-control ${
                    formErrors.descripcionProblema ? "is-invalid" : ""
                  }`}
                ></Input>
                <div className="invalid-feedback mb-2">
                  {formErrors.descripcionProblema}
                </div>

                <Label for="objetivo">Objectivo</Label>
                <Input
                  onChange={this.handleChange}
                  value={formValues.objetivo}
                  type="text"
                  name="objetivo"
                  id="objetivo"
                  className={`form-control ${
                    formErrors.objetivo ? "is-invalid" : ""
                  }`}
                ></Input>
                <div className="invalid-feedback mb-2">
                  {formErrors.objetivo}
                </div>

                <Label for="causas" className="mt-2">
                  Causas
                </Label>
                <Input
                  onChange={this.handleChange}
                  value={formValues.causas}
                  type="text"
                  name="causas"
                  id="causas"
                  className={`form-control ${
                    formErrors.causas ? "is-invalid" : ""
                  }`}
                ></Input>
                <div className="invalid-feedback mb-2">{formErrors.causas}</div>

                <Label for="acciones" className="mt-2">
                  Acciones a tomar
                </Label>
                <Input
                  onChange={this.handleChange}
                  value={formValues.acciones}
                  type="text"
                  name="acciones"
                  id="acciones"
                  className={`form-control ${
                    formErrors.acciones ? "is-invalid" : ""
                  }`}
                ></Input>
                <div className="invalid-feedback mb-2">
                  {formErrors.acciones}
                </div>

                <h4 className="mt-2 mb-2 text-center">Hacer</h4>

                <Row>
                  <Col>
                    <Input
                      type="select"
                      name="color"
                      id="color"
                      value={this.state.color}
                      onChange={this.onChangeRegular}
                      placeholder="Color"
                    >
                      <option>Seleccionar</option>
                      <option>Roja</option>
                      <option>Azul</option>
                      <option>Verde</option>
                      <option>Amarilla</option>
                    </Input>
                  </Col>
                  <Col>
                    <Input
                      type="number"
                      name="numero"
                      id="numero"
                      onChange={this.onChangeRegular}
                      value={this.state.numero}
                      placeholder="Numero"
                    ></Input>
                  </Col>
                  <Col>
                    <Button
                      onClick={() => {
                        this.setState({
                          tarjetasHacer: [
                            ...this.state.tarjetasHacer,
                            {
                              color: this.state.color,
                              numero: this.state.numero,
                            },
                          ],
                          color: "",
                          numero: "",
                        });
                      }}
                    >
                      Agregar
                    </Button>
                  </Col>
                </Row>

                <Row>
                  {this.state.tarjetasHacer &&
                    this.state.tarjetasHacer.map(({ color, numero }) => {
                      return (
                        <div className="mt-3">
                          <Col>
                            <p>{color}</p>
                            <p>{numero}</p>
                          </Col>
                        </div>
                      );
                    })}
                </Row>

                <h4 className="mt-3 text-center">Chequear</h4>

                <Label for="objectivoCompletado" className="mt-2">
                  ¿Se logró el objetivo? Explicar
                </Label>
                <Input
                  onChange={this.handleChange}
                  value={formValues.objectivoCompletado}
                  type="text"
                  name="objectivoCompletado"
                  id="objectivoCompletado"
                  className={`form-control ${
                    formErrors.objectivoCompletado ? "is-invalid" : ""
                  }`}
                ></Input>
                <div className="invalid-feedback mb-2">
                  {formErrors.objectivoCompletado}
                </div>

                <h4 className="mt-3 text-center">Estandarizar</h4>

                <Label for="documentos" className="mt-2">
                  Documentos que debemos cambiar para consolidar la mejora
                </Label>
                <Input
                  onChange={this.handleChange}
                  value={formValues.documentos}
                  type="text"
                  name="documentos"
                  id="documentos"
                  className={`form-control ${
                    formErrors.documentos ? "is-invalid" : ""
                  }`}
                ></Input>
                <div className="invalid-feedback mb-2">
                  {formErrors.documentos}
                </div>

                <Label for="otraMaquina" className="mt-2">
                  En qué otra parte/máquina podemos aplicar la mejora
                </Label>
                <Input
                  onChange={this.handleChange}
                  value={formValues.otraMaquina}
                  type="text"
                  name="otraMaquina"
                  id="otraMaquina"
                  className={`form-control ${
                    formErrors.otraMaquina ? "is-invalid" : ""
                  }`}
                ></Input>
                <div className="invalid-feedback mb-2">
                  {formErrors.otraMaquina}
                </div>

                <hr class="solid mt-3"></hr>

                <Label for="responsableSeguimiento" className="mt-2">
                  Responsable del seguimiento de la mejora
                </Label>
                <Input
                  onChange={this.handleChange}
                  value={formValues.responsableSeguimiento}
                  type="text"
                  name="responsableSeguimiento"
                  id="responsableSeguimiento"
                  className={`form-control ${
                    formErrors.responsableSeguimiento ? "is-invalid" : ""
                  }`}
                ></Input>
                <div className="invalid-feedback mb-2">
                  {formErrors.responsableSeguimiento}
                </div>

                <Label className="mt-3">
                  Fecha de finalización de la mejora
                </Label>
                <Input
                  onChange={this.handleChange}
                  value={formValues.fechaFinalizacionMejora}
                  type="date"
                  name="fechaFinalizacionMejora"
                  id="fechaFinalizacionMejora"
                  className={`form-control ${
                    formErrors.fechaFinalizacionMejora ? "is-invalid" : "mb-2"
                  }`}
                ></Input>
                <div className="invalid-feedback mb-2">
                  {formErrors.fechaFinalizacionMejora}
                </div>

                <Label for="costo" className="mt-2">
                  Costo
                </Label>
                <Input
                  onChange={this.handleChange}
                  value={formValues.costo}
                  type="text"
                  name="costo"
                  id="costo"
                  className={`form-control ${
                    formErrors.costo ? "is-invalid" : ""
                  }`}
                ></Input>
                <div className="invalid-feedback mb-2">{formErrors.costo}</div>

                <Label for="beneficio" className="mt-2">
                  Beneficio
                </Label>
                <Input
                  onChange={this.handleChange}
                  value={formValues.beneficio}
                  type="text"
                  name="beneficio"
                  id="beneficio"
                  className={`form-control ${
                    formErrors.beneficio ? "is-invalid" : ""
                  }`}
                ></Input>
                <div className="invalid-feedback mb-2">
                  {formErrors.beneficio}
                </div>

                <Label for="verificacion" className="mt-2">
                  Verificación
                </Label>
                <Input
                  onChange={this.handleChange}
                  value={formValues.verificacion}
                  type="text"
                  name="verificacion"
                  id="verificacion"
                  className={`form-control ${
                    formErrors.verificacion ? "is-invalid" : ""
                  }`}
                ></Input>
                <div className="invalid-feedback mb-2">
                  {formErrors.verificacion}
                </div>

                <Button
                  color="dark"
                  block
                  style={{ marginTop: "2rem" }}
                  type="submit"
                  className="btn btn-primary btn-block"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Por favor espere..." : "Subir"}
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  error: state.error,
  campos: state.campos,
});
export default connect(mapStateToProps, {
  clearErrors,
  cerrarKaizen,
  getCampos,
})(CerrarKaizenModal);
