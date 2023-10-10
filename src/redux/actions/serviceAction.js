import {
  ADD_STYLIST_SERVICES,
  ADD_STYLIST_SERVICES_SUCCESS,
  ADD_STYLIST_SERVICES_FAILURE,
  EDIT_STYLIST_SERVICES,
  EDIT_STYLIST_SERVICES_SUCCESS,
  EDIT_STYLIST_SERVICES_FAILURE,
  GET_STYLIST_SERVICES,
  GET_STYLIST_SERVICES_SUCCESS,
  GET_STYLIST_SERVICES_CAT_SUCCESS,
  DELETE_STYLIST_SERVICES,
  DELETE_STYLIST_SERVICES_SUCCESS,
  DELETE_STYLIST_SERVICES_FAILURE,
  ADD_SERVICES_DISCOUNT,
  ADD_SERVICES_DISCOUNT_SUCCESS,
  ADD_SERVICES_DISCOUNT_FAILURE,
  GET_CUSTOMER_STYLIST_SERVICES,
  GET_CUSTOMER_STYLIST_SERVICES_SUCCESS,
} from '../actionConfig';

export const addStylistService = (data) => {
  return {
    type: ADD_STYLIST_SERVICES,
    data: data,
  };
};

export const addStylistServiceSuccess = (response) => {
  return {
    type: ADD_STYLIST_SERVICES_SUCCESS,
    data: response,
  };
};

export const addStylistServiceFailure = (response) => {
  return {
    type: ADD_STYLIST_SERVICES_FAILURE,
    data: response,
  };
};

export const editStylistService = (data, id) => {
  return {
    type: EDIT_STYLIST_SERVICES,
    data: data,
    id: id,
  };
};

export const editStylistServiceSuccess = (response) => {
  return {
    type: EDIT_STYLIST_SERVICES_SUCCESS,
    data: response,
  };
};

export const editStylistServiceFailure = (response) => {
  return {
    type: EDIT_STYLIST_SERVICES_FAILURE,
    data: response,
  };
};

export const addServiceDiscount = (data) => {
  return {
    type: ADD_SERVICES_DISCOUNT,
    data: data,
  };
};

export const addServiceDiscountSuccess = (response) => {
  return {
    type: ADD_SERVICES_DISCOUNT_SUCCESS,
    data: response,
  };
};

export const addServiceDiscountFailure = (response) => {
  return {
    type: ADD_SERVICES_DISCOUNT_FAILURE,
    data: response,
  };
};

export const deleteStylistService = (id) => {
  return {
    type: DELETE_STYLIST_SERVICES,
    data: id,
  };
};

export const deleteStylistServiceSuccess = (response) => {
  return {
    type: DELETE_STYLIST_SERVICES_SUCCESS,
    data: response,
  };
};

export const deleteStylistServiceFailure = (response) => {
  return {
    type: DELETE_STYLIST_SERVICES_FAILURE,
    data: response,
  };
};

export const getStylistService = () => {
  return {
    type: GET_STYLIST_SERVICES,
  };
};

export const getStylistServiceSuccess = (response) => {
  return {
    type: GET_STYLIST_SERVICES_SUCCESS,
    data: response,
  };
};

export const getStylistServiceCatSuccess = (response) => {
  return {
    type: GET_STYLIST_SERVICES_CAT_SUCCESS,
    data: response,
  };
};

export const getCustomerStylistService = (data) => {
  return {
    type: GET_CUSTOMER_STYLIST_SERVICES,
    data: data,
  };
};

export const getCustomerStylistServiceSuccess = (response) => {
  return {
    type: GET_CUSTOMER_STYLIST_SERVICES_SUCCESS,
    data: response,
  };
};
