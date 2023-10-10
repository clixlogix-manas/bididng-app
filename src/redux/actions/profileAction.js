import {
  UPDATE_ACCOUNT_INFO,
  UPDATE_ACCOUNT_INFO_SUCCESS,
  UPDATE_ACCOUNT_INFO_FAILURE,
  UPDATE_PASSWORD,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAILURE,
  ADD_PORTFOLIO_IMAGE,
  ADD_PORTFOLIO_IMAGE_SUCCESS,
  ADD_PORTFOLIO_IMAGE_FAILURE,
  GET_PORTFOLIO_IMAGE,
  GET_PORTFOLIO_IMAGE_SUCCESS,
  ADD_SUBSCRIPTION,
  ADD_SUBSCRIPTION_SUCCESS,
  ADD_SUBSCRIPTION_FAILURE,
  CUSTOMER_PROFILE_UPLOAD,
  CUSTOMER_PROFILE_UPLOAD_SUCCESS,
  CUSTOMER_PROFILE_UPLOAD_FAILURE,
  ADD_CUSTOMER_PORTFOLIO_IMAGE,
  ADD_CUSTOMER_PORTFOLIO_IMAGE_SUCCESS,
  ADD_CUSTOMER_PORTFOLIO_IMAGE_FAILURE,
  GET_CUSTOMER_PORTFOLIO_IMAGE,
  GET_CUSTOMER_PORTFOLIO_IMAGE_SUCCESS,
  GET_LIKED_PHOTO,
  GET_LIKED_PHOTO_SUCCESS,
  GET_PORTFOLIO_IMAGE_FAILURE,
  CHANGE_TEMPLATE,
  GET_STYLIST_INVOICE,
  GET_STYLIST_INVOICE_SUCCESS,
  GET_STYLIST_INVOICE_FAILURE,
  GET_CUSTOMER_INVOICE,
  GET_CUSTOMER_INVOICE_SUCCESS,
  GET_CUSTOMER_INVOICE_FAILURE,
  CHANGE_TEMPLATE_SUCCESS,
  CHANGE_TEMPLATE_FAILURE,
} from '../actionConfig';

export const updateAccountInfo = (data) => {
  return {
    type: UPDATE_ACCOUNT_INFO,
    data: data,
  };
};

export const updateAccountInfoSuccess = (response) => {
  return {
    type: UPDATE_ACCOUNT_INFO_SUCCESS,
    data: response,
  };
};

export const updateAccountInfoFailure = (response) => {
  return {
    type: UPDATE_ACCOUNT_INFO_FAILURE,
    data: response,
  };
};

export const updateProfilePic = (data) => {
  return {
    type: CUSTOMER_PROFILE_UPLOAD,
    data: data,
  };
};

export const updateProfilePicSuccess = (response) => {
  return {
    type: CUSTOMER_PROFILE_UPLOAD_SUCCESS,
    data: response,
  };
};

export const updateProfilePicFailure = (response) => {
  return {
    type: CUSTOMER_PROFILE_UPLOAD_FAILURE,
    data: response,
  };
};

export const updatePassword = (data) => {
  return {
    type: UPDATE_PASSWORD,
    data: data,
  };
};

export const updatePasswordSuccess = (response) => {
  return {
    type: UPDATE_PASSWORD_SUCCESS,
    data: response,
  };
};

export const updatePasswordFailure = (response) => {
  return {
    type: UPDATE_PASSWORD_FAILURE,
    data: response,
  };
};

export const addPortfolioImage = (data) => {
  // console.log("data   00000000000",data)
  return {
    type: ADD_PORTFOLIO_IMAGE,
    data: data,
  };
};

export const addPortfolioImageSuccess = (response) => {
  // console.log("Image_success    00000000000",response)
  return {
    type: ADD_PORTFOLIO_IMAGE_SUCCESS,
    data: response,
  };
};

export const addPortfolioImageFailure = (response) => {
  // console.log("failure   00000000000",response)
  // console.log("failure status code 00000000000",response.code)
  return {
    type: ADD_PORTFOLIO_IMAGE_FAILURE,
    data: response,
  };
};

export const getPortfolioImage = () => {
  return {
    type: GET_PORTFOLIO_IMAGE,
  };
};

export const getPortfolioImageSuccess = (response) => {
  return {
    type: GET_PORTFOLIO_IMAGE_SUCCESS,
    data: response,
  };
};
export const getPortfolioImageFailure = (response) => {
  return {
    type: GET_PORTFOLIO_IMAGE_FAILURE,
    data: response,
  };
};
export const getLikedPhoto = () => {
  return {
    type: GET_LIKED_PHOTO,
  };
};

export const getLikedPhotoSuccess = (response) => {
  return {
    type: GET_LIKED_PHOTO_SUCCESS,
    data: response,
  };
};

export const addSubscription = (data) => {
  return {
    type: ADD_SUBSCRIPTION,
    data: data,
  };
};

export const addSubscriptionSuccess = (response) => {
  return {
    type: ADD_SUBSCRIPTION_SUCCESS,
    data: response,
  };
};

export const addSubscriptionFailure = (response) => {
  return {
    type: ADD_SUBSCRIPTION_FAILURE,
    data: response,
  };
};

export const addCustomerPortfolioImage = (data) => {
  return {
    type: ADD_CUSTOMER_PORTFOLIO_IMAGE,
    data: data,
  };
};

export const addCustomerPortfolioImageSuccess = (response) => {
  return {
    type: ADD_CUSTOMER_PORTFOLIO_IMAGE_SUCCESS,
    data: response,
  };
};

export const addCustomerPortfolioImageFailure = (response) => {
  return {
    type: ADD_CUSTOMER_PORTFOLIO_IMAGE_FAILURE,
    data: response,
  };
};

export const getCustomerPortfolioImage = () => {
  return {
    type: GET_CUSTOMER_PORTFOLIO_IMAGE,
  };
};

export const getCustomerPortfolioImageSuccess = (response) => {
  return {
    type: GET_CUSTOMER_PORTFOLIO_IMAGE_SUCCESS,
    data: response,
  };
};

export const changeTemplate = (data) => {
  return {
    type: CHANGE_TEMPLATE,
    data: data,
  };
};

export const changeTemplateSuccess = (res) => {
  return {
    type: CHANGE_TEMPLATE_SUCCESS,
    data: res,
  };
};

export const changeTemplateFailure = (res) => {
  return {
    type: CHANGE_TEMPLATE_FAILURE,
    data: res,
  };
};

export const getStylistInvoice = () => {
  return {
    type: GET_STYLIST_INVOICE,
  };
};

export const getStylistInvoiceSuccess = (response) => {
  return {
    type: GET_STYLIST_INVOICE_SUCCESS,
    data: response,
  };
};

export const getStylistInvoiceFailure = (response) => {
  return {
    type: GET_STYLIST_INVOICE_FAILURE,
    data: response,
  };
};

export const getCustomerInvoice = () => {
  return {
    type: GET_CUSTOMER_INVOICE,
  };
};

export const getCustomerInvoiceSuccess = (response) => {
  return {
    type: GET_CUSTOMER_INVOICE_SUCCESS,
    data: response,
  };
};

export const getCustomerInvoiceFailure = (response) => {
  return {
    type: GET_CUSTOMER_INVOICE_FAILURE,
    data: response,
  };
};
