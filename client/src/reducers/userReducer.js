import { toast } from 'react-toastify';
import history from '../history';

export const registerUserReducer = (state = {}, action) => {
  switch (action.type) {
    case "USER_REGISTER_REQUEST":
      return {
        loading: true,
      };
    case "USER_REGISTER_SUCCESS":
      toast.success(action.payload || 'User registered successfully');
      setTimeout(() => history.push('/login'));
      return {
        loading: false,
      };
    case "USER_REGISTER_FAILED":
      const message = action?.payload?.response?.data || 'User registration failed';
      toast.error(message);
      return {
        loading: false,
      };
    default:
      return state;
  }
};

export const loginUserReducer = (state = {}, action) => {
  switch (action.type) {
    case "USER_LOGIN_REQUEST":
      return {
        loading: true,
      };
    case "USER_LOGIN_SUCCESS":
      const name = action?.payload?.name || '';
      toast.success(`Successfully signed in${name ? ` as ${name}` : ''}`);
      setTimeout(() => history.push('/'));
      return {
        loading: false,
        currentUser: action.payload,
      };
    case "USER_LOGIN_FAILED":
      const message = action?.payload?.response?.data || 'User login failed';
      toast.error(message);
      return {
        loading: false,
      };
    default:
      return state;
  }
};

export const getAllUsersReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case "GET_USERS_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "GET_USERS_SUCCESS":
      return {
        loading: false,
        users: action.payload,
      };
    case "GET_USERS_FAILED":
      return {
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export const deleteUserReducer = (state = {}, action) => {
  switch (action.type) {
    case "DELETE_USER_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "DELETE_USER_SUCCESS":
      toast.success(action.payload || 'User deleted successfully');
      action.callback && setTimeout(action.callback);
      return {
        loading: false,
      };
    case "DELETE_USER_FAILED":
      const message = action?.payload?.response?.data || 'Failed to add user';
      toast.error(message);
      return {
        loading: false,
      };
    default:
      return state;
  }
};
