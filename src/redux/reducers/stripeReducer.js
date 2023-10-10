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

const initialState = {
  createStripeCustReq: false,
  createStripeCustSuccess: false,
  createStripeCustFailure: false,
  customerData: null,
  addPaymentCardReq: false,
  addPaymentCardSuccess: false,
  addPaymentCardFailure: false,
  addPaymentCardFailureMessage: '',
  addBankAccountReq: false,
  addBankAccountSuccess: false,
  addBankAccountFailure: false,
  addBankAccountFailureMessage: '',
  updateBankAccountReq: false,
  updateBankAccountSuccess: false,
  updateBankAccountFailure: false,
  updateBankAccountFailureMessage: '',
  getBankAccountReq: false,
  getBankAccountSuccess: false,
  getBankAccountFailure: false,
  getBankAccountFailureMessage: '',
  deletePaymentCardReq: false,
  deletePaymentCardSuccess: false,
  deletePaymentCardFailure: false,
  deletePaymentCardFailureMessage: '',
  getPaymentCardReq: false,
  getPaymentCardSuccess: false,
  getPaymentCardFailure: false,
  cardData: null,
  cardList: null,
  bankInfo: null,
};

export default function StripeReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_STRIPE_CUSTOMER:
      return {
        ...state,
        createStripeCustReq: true,
        createStripeCustSuccess: false,
        createStripeCustFailure: false,
        customerData: null,
      };
    case CREATE_STRIPE_CUSTOMER_SUCCESS:
      return {
        ...state,
        createStripeCustReq: false,
        createStripeCustSuccess: true,
        customerData: action.data,
      };

    case CREATE_STRIPE_CUSTOMER_FAILURE:
      return {
        ...state,
        createStripeCustReq: false,
        createStripeCustFailure: true,
        customerData: action.data,
      };
    case ADD_PAYMENT_CARD:
      return {
        ...state,
        addPaymentCardReq: true,
        addPaymentCardSuccess: false,
        addPaymentCardFailure: false,
        addPaymentCardFailureMessage: '',
        cardData: null,
      };
    case ADD_PAYMENT_CARD_SUCCESS:
      return {
        ...state,
        addPaymentCardReq: false,
        addPaymentCardSuccess: true,
        cardData: action.data,
      };

    case ADD_PAYMENT_CARD_FAILURE:
      return {
        ...state,
        addPaymentCardReq: false,
        addPaymentCardFailure: true,
        addPaymentCardFailureMessage: action.data,
      };
    case DELETE_PAYMENT_CARD:
      return {
        ...state,
        deletePaymentCardReq: true,
        deletePaymentCardSuccess: false,
        deletePaymentCardFailure: false,
      };
    case DELETE_PAYMENT_CARD_SUCCESS:
      return {
        ...state,
        deletePaymentCardReq: false,
        deletePaymentCardSuccess: true,
      };

    case DELETE_PAYMENT_CARD_FAILURE:
      return {
        ...state,
        deletePaymentCardReq: false,
        deletePaymentCardFailure: true,
        deletePaymentCardFailureMessage: action.data,
      };
    case GET_PAYMENT_CARD:
      return {
        ...state,
        getPaymentCardReq: true,
        getPaymentCardSuccess: false,
        getPaymentCardFailure: false,
        cardList: null,
      };
    case GET_PAYMENT_CARD_SUCCESS:
      return {
        ...state,
        getPaymentCardReq: false,
        getPaymentCardSuccess: true,
        cardList: action.data,
      };

    case GET_PAYMENT_CARD_FAILURE:
      return {
        ...state,
        getPaymentCardReq: false,
        getPaymentCardFailure: true,
      };
    case ADD_BANK_ACCOUNT:
      return {
        ...state,
        addBankAccountReq: true,
        addBankAccountSuccess: false,
        addBankAccountFailure: false,
        addBankAccountFailureMessage: '',
      };
    case ADD_BANK_ACCOUNT_SUCCESS:
      return {
        ...state,
        addBankAccountReq: false,
        addBankAccountSuccess: true,
      };

    case ADD_BANK_ACCOUNT_FAILURE:
      return {
        ...state,
        addBankAccountReq: false,
        addBankAccountFailure: true,
        addBankAccountFailureMessage: action.data,
      };
    case GET_BANK_ACCOUNT:
      return {
        ...state,
        getBankAccountReq: true,
        getBankAccountSuccess: false,
        getBankAccountFailure: false,
        getBankAccountFailureMessage: '',
        bankInfo: null,
      };
    case GET_BANK_ACCOUNT_SUCCESS:
      return {
        ...state,
        getBankAccountReq: false,
        getBankAccountSuccess: true,
        bankInfo: action.data,
      };

    case GET_BANK_ACCOUNT_FAILURE:
      return {
        ...state,
        getBankAccountReq: false,
        getBankAccountFailure: true,
        getBankAccountFailureMessage: action.data,
      };
    case UPDATE_BANK_ACCOUNT:
      return {
        ...state,
        updateBankAccountReq: true,
        updateBankAccountSuccess: false,
        updateBankAccountFailure: false,
        updateBankAccountFailureMessage: '',
      };
    case UPDATE_BANK_ACCOUNT_SUCCESS:
      return {
        ...state,
        updateBankAccountReq: false,
        updateBankAccountSuccess: true,
      };

    case UPDATE_BANK_ACCOUNT_FAILURE:
      return {
        ...state,
        updateBankAccountReq: false,
        updateBankAccountFailure: true,
        updateBankAccountFailureMessage: action.data,
      };
    default:
      return {
        ...state,
      };
  }
}
