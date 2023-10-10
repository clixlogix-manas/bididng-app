import {
  ADD_BANK_ACCOUNT,
  ADD_BANK_ACCOUNT_FAILURE,
  ADD_BANK_ACCOUNT_SUCCESS,
  ADD_PAYMENT_CARD,
  ADD_PAYMENT_CARD_FAILURE,
  ADD_PAYMENT_CARD_SUCCESS,
  CREATE_STRIPE_CUSTOMER,
  CREATE_STRIPE_CUSTOMER_FAILURE,
  CREATE_STRIPE_CUSTOMER_SUCCESS,
  DELETE_PAYMENT_CARD,
  DELETE_PAYMENT_CARD_FAILURE,
  DELETE_PAYMENT_CARD_SUCCESS,
  GET_BANK_ACCOUNT,
  GET_BANK_ACCOUNT_FAILURE,
  GET_BANK_ACCOUNT_SUCCESS,
  GET_PAYMENT_CARD,
  GET_PAYMENT_CARD_FAILURE,
  GET_PAYMENT_CARD_SUCCESS,
  UPDATE_BANK_ACCOUNT,
  UPDATE_BANK_ACCOUNT_FAILURE,
  UPDATE_BANK_ACCOUNT_SUCCESS,
} from '../actionConfig';

export const createStripeCustomer = () => {
  return {
    type: CREATE_STRIPE_CUSTOMER,
  };
};

export const createStripeCustomerSuccess = (response) => {
  return {
    type: CREATE_STRIPE_CUSTOMER_SUCCESS,
    data: response,
  };
};

export const createStripeCustomerFailure = (response) => {
  return {
    type: CREATE_STRIPE_CUSTOMER_FAILURE,
    data: response,
  };
};

export const addPaymentCard = (data) => {
  return {
    type: ADD_PAYMENT_CARD,
    data: data,
  };
};

export const addPaymentCardSuccess = (response) => {
  return {
    type: ADD_PAYMENT_CARD_SUCCESS,
    data: response,
  };
};

export const addPaymentCardFailure = (response) => {
  return {
    type: ADD_PAYMENT_CARD_FAILURE,
    data: response,
  };
};

export const getPaymentCard = () => {
  return {
    type: GET_PAYMENT_CARD,
  };
};

export const getPaymentCardSuccess = (response) => {
  return {
    type: GET_PAYMENT_CARD_SUCCESS,
    data: response,
  };
};

export const getPaymentCardFailure = (response) => {
  return {
    type: GET_PAYMENT_CARD_FAILURE,
    data: response,
  };
};

export const deletePaymentCard = (data) => {
  return {
    type: DELETE_PAYMENT_CARD,
    data: data,
  };
};

export const deletePaymentCardSuccess = (response) => {
  return {
    type: DELETE_PAYMENT_CARD_SUCCESS,
    data: response,
  };
};

export const deletePaymentCardFailure = (response) => {
  return {
    type: DELETE_PAYMENT_CARD_FAILURE,
    data: response,
  };
};

export const addBankAccount = (data) => {
  return {
    type: ADD_BANK_ACCOUNT,
    data: data,
  };
};

export const addBankAccountSuccess = (response) => {
  return {
    type: ADD_BANK_ACCOUNT_SUCCESS,
    data: response,
  };
};

export const addBankAccountFailure = (response) => {
  return {
    type: ADD_BANK_ACCOUNT_FAILURE,
    data: response,
  };
};

export const getBankAccount = (data) => {
  return {
    type: GET_BANK_ACCOUNT,
    data: data,
  };
};

export const getBankAccountSuccess = (response) => {
  return {
    type: GET_BANK_ACCOUNT_SUCCESS,
    data: response,
  };
};

export const getBankAccountFailure = (response) => {
  return {
    type: GET_BANK_ACCOUNT_FAILURE,
    data: response,
  };
};

export const updateBankAccount = (data) => {
  return {
    type: UPDATE_BANK_ACCOUNT,
    data: data,
  };
};

export const updateBankAccountSuccess = (response) => {
  return {
    type: UPDATE_BANK_ACCOUNT_SUCCESS,
    data: response,
  };
};

export const updateBankAccountFailure = (response) => {
  return {
    type: UPDATE_BANK_ACCOUNT_FAILURE,
    data: response,
  };
};
