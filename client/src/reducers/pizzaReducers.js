import { toast } from "react-toastify";
import history from "../history";

export const getAllPizzasReducer = (state = { pizzas: [] }, action) => {
  switch (action.type) {
    case "GET_PIZZAS_REQUEST":
      return {
        loading: true,
        ...state,
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
        loading: true,
        ...state,
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

export const editPizzaReducer = (state = {}, action) => {
  switch (action.type) {
    case "EDIT_PIZZA_REQUEST":
      return {
        editloading: true,
        ...state,
      };
    case "EDIT_PIZZA_SUCCESS":
      return {
        editloading: false,
        editsuccess: true,
      };
    case "EDIT_PIZZA_FAILED":
      return {
        editerror: action.payload,
        editloading: false,
      };
    default:
      return state;
  }
};
