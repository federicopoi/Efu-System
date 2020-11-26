import {
  GET_CAMPOS,
  CARGANDO_CAMPOS,
  AGREGAR_CAMPOS,
  BORRAR_CAMPO,
} from "./types";
import { returnErrors } from "./errorActions";
import axios from "axios";

export const getCampos = () => (dispatch) => {
  dispatch(cargandoCampos());
  axios
    .get("/api/campos")
    .then((res) =>
      dispatch({
        type: GET_CAMPOS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const agregarCampos = (campos) => (dispatch) => {
  axios.post("/api/campos", campos).then((res) =>
    dispatch({
      type: AGREGAR_CAMPOS,
      payload: res.data,
    })
  );
};

export const borrarCampo = (id) => (dispatch) => {
  axios
    .delete(`/api/campos/${id}`)
    .then((res) =>
      dispatch({
        type: BORRAR_CAMPO,
        payload: id,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const cargandoCampos = () => {
  return {
    type: CARGANDO_CAMPOS,
  };
};
