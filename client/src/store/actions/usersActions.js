import { GET_USERS, USERS_LOADING, BORRAR_USER } from "./types";
import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";
import axios from "axios";

// Get All users
export const getUsers = () => (dispatch) => {
  dispatch(setUsersLoading());
  axios
    .get("/api/users")
    .then((res) =>
      dispatch({
        type: GET_USERS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const borrarUser = (id) => (dispatch) => {
  axios
    .delete(`/api/users/${id}`)
    .then((res) =>
      dispatch({
        type: BORRAR_USER,
        payload: id,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const setUsersLoading = () => {
  return {
    type: USERS_LOADING,
  };
};
