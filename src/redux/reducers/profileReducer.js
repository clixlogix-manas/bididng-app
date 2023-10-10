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
  LOGOUT,
} from '../actionConfig';

const initialState = {
  updateAccountInfo: false,
  updateAccountInfoSuccess: false,
  updateAccountInfoFailure: false,
  updateAccountInfoFailureMessage: '',
  updateProfilePic: false,
  updateProfilePicSuccess: false,
  updateProfilePicFailure: false,
  updateProfilePicFailureMessage: '',
  updatePassword: false,
  updatePasswordSuccess: false,
  updatePasswordFailure: false,
  updatePasswordFailureMessage: '',
  addCustomerPortfolioImage: false,
  addCustomerPortfolioImageFailure: false,
  addCustomerPortfolioImageSuccess: false,
  addCustomerPortfolioImageFailureMessage: '',
  getCustomerPortfolioImage: false,
  getCustomerPortfolioImageSuccess: false,
  getInvoiceDetails: false,
  getInvoiceDetailsSuccess: false,
  getInvoiceDetailsFailure: false,
  addPortfolioImage: false,
  addPortfolioImageSuccess: false,
  addPortfolioImageFailure: false,
  addPortfolioImageFailureMessage: '',
  addSubscription: false,
  addSubscriptionSuccess: false,
  addSubscriptionFailure: false,
  addSubscriptionFailureMessage: '',
  getPortfolioImage: false,
  getPortfolioImageSuccess: false,
  getPortfolioImageFailure: false,
  getLikedPhoto: false,
  getLikedPhotoSuccess: false,
  portfolioData: null,
  likedPhoto: null,
  InvoiceData: null,
  template: '1',
};

export default function ProfileReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_ACCOUNT_INFO:
      return {
        ...state,
        updateAccountInfo: true,
        updateAccountInfoFailure: false,
        updateAccountInfoSuccess: false,
        updateAccountInfoFailureMessage: '',
      };
    case UPDATE_ACCOUNT_INFO_SUCCESS:
      return {
        ...state,
        updateAccountInfo: false,
        updateAccountInfoSuccess: true,
      };
    case UPDATE_ACCOUNT_INFO_FAILURE:
      return {
        ...state,
        updateAccountInfoFailure: true,
        updateAccountInfo: false,
        updateAccountInfoFailureMessage: action.data,
      };
    case CUSTOMER_PROFILE_UPLOAD:
      return {
        ...state,
        updateProfilePic: true,
        updateProfilePicFailure: false,
        updateProfilePicSuccess: false,
        updateProfilePicFailureMessage: '',
      };
    case CUSTOMER_PROFILE_UPLOAD_SUCCESS:
      return {
        ...state,
        updateProfilePic: false,
        updateProfilePicSuccess: true,
        updateProfilePicFailureMessage: '',
      };
    case CUSTOMER_PROFILE_UPLOAD_FAILURE:
      return {
        ...state,
        updateProfilePicFailure: true,
        updateProfilePic: false,
        updateProfilePicFailureMessage: action.data,
      };
    case UPDATE_PASSWORD:
      return {
        ...state,
        updatePassword: true,
        updatePasswordFailure: false,
        updatePasswordSuccess: false,
        updatePasswordFailureMessage: '',
      };
    case UPDATE_PASSWORD_SUCCESS:
      return {
        ...state,
        updatePassword: false,
        updatePasswordSuccess: true,
      };
    case UPDATE_PASSWORD_FAILURE:
      return {
        ...state,
        updatePasswordFailure: true,
        updatePassword: false,
        updatePasswordFailureMessage: action.data,
      };
    case ADD_PORTFOLIO_IMAGE:
      return {
        ...state,
        addPortfolioImage: true,
        addPortfolioImageFailure: false,
        addPortfolioImageSuccess: false,
        addPortfolioImageFailureMessage: '',
      };
    case ADD_PORTFOLIO_IMAGE_SUCCESS:
      return {
        ...state,
        addPortfolioImage: false,
        addPortfolioImageSuccess: true,
      };
    case ADD_PORTFOLIO_IMAGE_FAILURE:
      return {
        ...state,
        addPortfolioImageFailure: true,
        addPortfolioImage: false,
        addPortfolioImageFailureMessage: action.data,
      };
    case ADD_SUBSCRIPTION:
      return {
        ...state,
        addSubscription: true,
        addSubscriptionFailure: false,
        addSubscriptionSuccess: false,
        addSubscriptionFailureMessage: '',
      };
    case ADD_SUBSCRIPTION_SUCCESS:
      return {
        ...state,
        addSubscription: false,
        addSubscriptionSuccess: true,
      };
    case ADD_SUBSCRIPTION_FAILURE:
      return {
        ...state,
        addSubscriptionFailure: true,
        addSubscription: false,
        addSubscriptionFailureMessage: action.data,
      };
    case GET_PORTFOLIO_IMAGE:
      return {
        ...state,
        getPortfolioImage: true,
        getPortfolioImageSuccess: false,
        getPortfolioImageFailure: false,
        portfolioData: null,
      };
    case GET_PORTFOLIO_IMAGE_SUCCESS:
      return {
        ...state,
        getPortfolioImage: false,
        getPortfolioImageSuccess: true,
        portfolioData: action.data,
      };
    case GET_PORTFOLIO_IMAGE_FAILURE:
      return {
        ...state,
        getPortfolioImage: false,
        getPortfolioImageFailure: true,
      };
    case GET_LIKED_PHOTO:
      return {
        ...state,
        getLikedPhoto: true,
        getLikedPhotoSuccess: false,
        likedPhoto: null,
      };
    case GET_LIKED_PHOTO_SUCCESS:
      return {
        ...state,
        getLikedPhoto: false,
        getLikedPhotoSuccess: true,
        likedPhoto: action.data,
      };
    case ADD_CUSTOMER_PORTFOLIO_IMAGE:
      return {
        ...state,
        addCustomerPortfolioImage: true,
        addCustomerPortfolioImageFailure: false,
        addCustomerPortfolioImageSuccess: false,
        addCustomerPortfolioImageFailureMessage: '',
      };
    case ADD_CUSTOMER_PORTFOLIO_IMAGE_SUCCESS:
      return {
        ...state,
        addCustomerPortfolioImage: false,
        addCustomerPortfolioImageSuccess: true,
      };
    case ADD_CUSTOMER_PORTFOLIO_IMAGE_FAILURE:
      return {
        ...state,
        addCustomerPortfolioImageFailure: true,
        addCustomerPortfolioImage: false,
        addCustomerPortfolioImageFailureMessage: action.data,
      };
    case GET_CUSTOMER_PORTFOLIO_IMAGE:
      return {
        ...state,
        getCustomerPortfolioImage: true,
        getCustomerPortfolioImageSuccess: false,
        portfolioData: null,
      };
    case GET_CUSTOMER_PORTFOLIO_IMAGE_SUCCESS:
      return {
        ...state,
        getCustomerPortfolioImage: false,
        getCustomerPortfolioImageSuccess: true,
        portfolioData: action.data,
      };
    case GET_STYLIST_INVOICE:
      return {
        ...state,
        getInvoiceDetails: true,
        getInvoiceDetailsSuccess: false,
        getInvoiceDetailsFailure: false,
        InvoiceData: null,
      };
    case GET_STYLIST_INVOICE_SUCCESS:
      return {
        ...state,
        getInvoiceDetails: false,
        getInvoiceDetailsSuccess: true,
        InvoiceData: action.data,
      };
    case GET_STYLIST_INVOICE_FAILURE:
      return {
        ...state,
        getInvoiceDetails: false,
        getInvoiceDetailsFailure: true,
        InvoiceData: null,
      };
    case GET_CUSTOMER_INVOICE:
      return {
        ...state,
        getInvoiceDetails: true,
        getInvoiceDetailsSuccess: false,
        getInvoiceDetailsFailure: false,
        InvoiceData: null,
      };
    case GET_CUSTOMER_INVOICE_SUCCESS:
      return {
        ...state,
        getInvoiceDetails: false,
        getInvoiceDetailsSuccess: true,
        InvoiceData: action.data,
      };
    case GET_CUSTOMER_INVOICE_FAILURE:
      return {
        ...state,
        getInvoiceDetails: false,
        getInvoiceDetailsFailure: true,
        InvoiceData: null,
      };
    case CHANGE_TEMPLATE:
      return {
        ...state,
        template: action.data,
      };
    case LOGOUT:
      return {
        ...state,
        updateAccountInfo: false,
        updateAccountInfoSuccess: false,
        updateAccountInfoFailure: false,
        updateAccountInfoFailureMessage: '',
        updateProfilePic: false,
        updateProfilePicSuccess: false,
        updateProfilePicFailure: false,
        updateProfilePicFailureMessage: '',
        updatePassword: false,
        updatePasswordSuccess: false,
        updatePasswordFailure: false,
        updatePasswordFailureMessage: '',
        addCustomerPortfolioImage: false,
        addCustomerPortfolioImageFailure: false,
        addCustomerPortfolioImageSuccess: false,
        addCustomerPortfolioImageFailureMessage: '',
        getCustomerPortfolioImage: false,
        getCustomerPortfolioImageSuccess: false,
        getInvoiceDetails: false,
        getInvoiceDetailsSuccess: false,
        getInvoiceDetailsFailure: false,
        addPortfolioImage: false,
        addPortfolioImageSuccess: false,
        addPortfolioImageFailure: false,
        addPortfolioImageFailureMessage: '',
        addSubscription: false,
        addSubscriptionSuccess: false,
        addSubscriptionFailure: false,
        addSubscriptionFailureMessage: '',
        getPortfolioImage: false,
        getPortfolioImageSuccess: false,
        getPortfolioImageFailure: false,
        getLikedPhoto: false,
        getLikedPhotoSuccess: false,
        portfolioData: null,
        likedPhoto: null,
        InvoiceData: null,
        template: '1',
      };
    default:
      return {
        ...state,
      };
  }
}
