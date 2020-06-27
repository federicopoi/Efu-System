import { GET_USERS, USERS_LOADING, UPDATE_SUCCESS } from "./types";
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

// Update User Role
export const updateRole = ({ name, role }) => (dispatch, getState) => {
  // Request body
  const body = JSON.stringify({ name, role });

  axios
    .post("/api/users/update", body, tokenConfig(getState))
    .then((res) => dispatch({ type: UPDATE_SUCCESS, payload: res.data }))
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const setUsersLoading = () => {
  return {
    type: USERS_LOADING,
  };
};
