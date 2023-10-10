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
  LOGOUT,
} from '../actionConfig';

const initialState = {
  addServiceReq: false,
  addServiceSuccess: false,
  addServiceFailure: false,
  addServiceFailureMessage: '',
  addDiscountReq: false,
  addDiscountSuccess: false,
  addDiscountFailure: false,
  addDiscountFailureMessage: '',
  editServiceReq: false,
  editServiceSuccess: false,
  editServiceFailure: false,
  editServiceFailureMessage: '',
  getServiceReq: false,
  getServiceSuccess: false,
  serviceList: null,
  serviceCatList: null,
  deleteServiceReq: false,
  deleteServiceFailure: false,
  deleteServiceSuccess: false,
  deleteServiceFailureMessage: '',
};

export default function ServiceReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_STYLIST_SERVICES:
      return {
        ...state,
        addServiceReq: true,
        addServiceFailure: false,
        addServiceSuccess: false,
        addServiceFailureMessage: '',
      };
    case ADD_STYLIST_SERVICES_SUCCESS:
      return {
        ...state,
        addServiceReq: false,
        addServiceSuccess: true,
      };
    case ADD_STYLIST_SERVICES_FAILURE:
      return {
        ...state,
        addServiceFailure: true,
        addServiceReq: false,
        addServiceFailureMessage: action.data,
      };
    case ADD_SERVICES_DISCOUNT:
      return {
        ...state,
        addDiscountReq: true,
        addDiscountFailure: false,
        addDiscountSuccess: false,
        addDiscountFailureMessage: '',
        addDiscountSuccessMessage: '',
      };
    case ADD_SERVICES_DISCOUNT_SUCCESS:
      return {
        ...state,
        addDiscountReq: false,
        addDiscountSuccess: true,
      };
    case ADD_SERVICES_DISCOUNT_FAILURE:
      return {
        ...state,
        addDiscountFailure: true,
        addDiscountReq: false,
        addDiscountFailureMessage: action.data,
      };
    case EDIT_STYLIST_SERVICES:
      return {
        ...state,
        editServiceReq: true,
        editServiceFailure: false,
        editServiceSuccess: false,
        editServiceFailureMessage: '',
      };
    case EDIT_STYLIST_SERVICES_SUCCESS:
      return {
        ...state,
        editServiceReq: false,
        editServiceSuccess: true,
      };
    case EDIT_STYLIST_SERVICES_FAILURE:
      return {
        ...state,
        editServiceFailure: true,
        editServiceReq: false,
        editServiceFailureMessage: action.data,
      };
    case DELETE_STYLIST_SERVICES:
      return {
        ...state,
        deleteServiceReq: true,
        deleteServiceFailure: false,
        deleteServiceSuccess: false,
        deleteServiceFailureMessage: '',
      };
    case DELETE_STYLIST_SERVICES_SUCCESS:
      return {
        ...state,
        deleteServiceReq: false,
        deleteServiceSuccess: true,
      };
    case DELETE_STYLIST_SERVICES_FAILURE:
      return {
        ...state,
        deleteServiceFailure: true,
        deleteServiceReq: false,
        deleteServiceFailureMessage: action.data,
      };
    case GET_STYLIST_SERVICES:
      return {
        ...state,
        getServiceReq: true,
        getServiceSuccess: false,
        serviceList: null,
      };
    case GET_STYLIST_SERVICES_SUCCESS:
      return {
        ...state,
        getServiceReq: false,
        getServiceSuccess: true,
        serviceList: action.data,
      };
    case GET_STYLIST_SERVICES_CAT_SUCCESS:
      return {
        ...state,
        serviceCatList: action.data,
      };
    case GET_CUSTOMER_STYLIST_SERVICES:
      return {
        ...state,
        getServiceReq: true,
        getServiceSuccess: false,
        serviceList: null,
      };
    case GET_CUSTOMER_STYLIST_SERVICES_SUCCESS:
      return {
        ...state,
        getServiceReq: false,
        getServiceSuccess: true,
        serviceList: action.data,
      };
    case LOGOUT:
      return {
        ...state,
        addServiceReq: false,
        addServiceSuccess: false,
        addServiceFailure: false,
        addServiceFailureMessage: '',
        addDiscountReq: false,
        addDiscountSuccess: false,
        addDiscountFailure: false,
        addDiscountFailureMessage: '',
        editServiceReq: false,
        editServiceSuccess: false,
        editServiceFailure: false,
        editServiceFailureMessage: '',
        getServiceReq: false,
        getServiceSuccess: false,
        serviceList: null,
        serviceCatList: null,
        deleteServiceReq: false,
        deleteServiceFailure: false,
        deleteServiceSuccess: false,
        deleteServiceFailureMessage: '',
      };
    default:
      return {
        ...state,
      };
  }
}
