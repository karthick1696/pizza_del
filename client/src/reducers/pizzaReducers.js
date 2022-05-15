import { toast } from "react-toastify";
import history from "../history";

export const getAllPizzasReducer = (state = { pizzas: [] }, action) => {
  switch (action.type) {
    case "GET_PIZZAS_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "GET_PIZZAS_SUCCESS":
      return {
        loading: false,
        pizzas: action.payload,
      };
    case "GET_PIZZAS_FAILED":
      return { 
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export const getPizzaByIdReducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_PIZZABYID_REQUEST":
      return {
        ...state,
        pizzas: null,
        loading: true,
      };
    case "GET_PIZZABYID_SUCCESS":
      return {
        loading: false,
        pizza: action.payload,
      };
    case "GET_PIZZABYID_FAILED":
      return {
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export const addPizzaReducer = (state = {}, action) => {
  switch (action.type) {
    case "ADD_PIZZA_REQUEST":
      return {
        loading: true,
        ...state,
      };
    case "ADD_PIZZA_SUCCESS":
      toast.success(action.payload || 'Pizza added successfully');
      setTimeout(() => history.push('/admin/pizzaslist'));
      return {
        loading: false,
      };
    case "ADD_PIZZA_FAILED":
      const message = action?.payload?.response?.data || 'Failed to add pizza';
      toast.error(message);
      return {
        loading: false,
      };
    default:
      return state;
  }
};

export const deletePizzaReducer = (state = {}, action) => {
  switch (action.type) {
    case "DELETE_PIZZA_REQUEST":
      return {
        loading: true,
        ...state,
      };
    case "DELETE_PIZZA_SUCCESS":
      toast.success(action.payload || 'Pizza deleted successfully');
      action.callback && setTimeout(action.callback);
      return {
        loading: false,
      };
    case "DELETE_PIZZA_FAILED":
      const message = action?.payload?.response?.data || 'Failed to add pizza';
      toast.error(message);
      return {
        loading: false,
      };
    default:
      return state;
  }
};

export const editPizzaReducer = (state = {}, action) => {
  switch (action.type) {
    case "EDIT_PIZZA_REQUEST":
      return {
        editloading: true,
        ...state,
      };
    case "EDIT_PIZZA_SUCCESS":
      toast.success(action.payload || 'Pizza updated successfully');
      setTimeout(() => history.push('/admin/pizzaslist'));
      return {
        editloading: false,
      };
    case "EDIT_PIZZA_FAILED":
      const message = action?.payload?.response?.data || 'Failed to update pizza';
      toast.error(message);
      return {
        editloading: false,
      };
    default:
      return state;
  }
};
