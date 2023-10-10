import {
  CUSTOMER_SIGN_UP,
  CUSTOMER_SIGN_UP_SUCCESS,
  CUSTOMER_SIGN_UP_FAILURE,
  GET_CUSTOMER_DETAILS,
  GET_CUSTOMER_DETAILS_SUCCESS,
  CUSTOMER_SIGN_IN,
  CUSTOMER_SIGN_IN_SUCCESS,
  CUSTOMER_SIGN_IN_FAILURE,
  STYLIST_SIGN_UP,
  STYLIST_SIGN_UP_SUCCESS,
  STYLIST_SIGN_UP_FAILURE,
  OTP_SENT,
  OTP_SENT_SUCCESS,
  OTP_SENT_FAILURE,
  STYLIST_PROFILE_UPLOAD,
  STYLIST_PROFILE_UPLOAD_SUCCESS,
  STYLIST_PROFILE_UPLOAD_FAILURE,
  ADD_STYLIST_PROFESSION_DETAILS,
  ADD_STYLIST_PROFESSION_DETAILS_SUCCESS,
  ADD_STYLIST_PROFESSION_DETAILS_FAILURE,
  ADD_STYLIST_SALON_DETAILS,
  ADD_STYLIST_SALON_DETAILS_SUCCESS,
  ADD_STYLIST_SALON_DETAILS_FAILURE,
  ADD_STYLIST_WORK_HOURS,
  ADD_STYLIST_WORK_HOURS_SUCCESS,
  ADD_STYLIST_WORK_HOURS_FAILURE,
  STYLIST_SIGN_IN,
  STYLIST_SIGN_IN_SUCCESS,
  STYLIST_SIGN_IN_FAILURE,
  GET_STYLIST_DETAILS,
  GET_STYLIST_DETAILS_SUCCESS,
  LOGOUT,
  COUNTRY_CODE_DETAILS,
  OTP_SENT_CUSTOMER,
  OTP_SENT_CUSTOMER_SUCCESS,
  OTP_SENT_CUSTOMER_FAILURE,
} from '../actionConfig';

const initialState = {
  signUpReq: false,
  signUpSuccess: false,
  signUpFailure: false,
  signUpFailureMessage: '',
  signInReq: false,
  signInSuccess: false,
  countryCodeData: null,
  signInFailure: false,
  signInFailureMessage: '',
  otpSentReq: false,
  otpSentSuccess: false,
  otpSentFailure: false,
  otpSentFailureMessage: '',
  otpSentReqCustomer: false,
  otpSentCustomerSuccess: false,
  otpSentCustomerFailure: false,
  otpSentCustomerFailureMessage: '',
  styistProfUploadReq: false,
  styistProfUploadSuccess: false,
  styistProfUploadFailure: false,
  styistProfUploadFailureMessage: '',
  addProfessDetailsReq: false,
  addProfessDetailsSuccess: false,
  addProfessDetailsFailure: false,
  addProfessDetailsFailureMessage: '',
  addSalonDetailsReq: false,
  addSalonDetailsSuccess: false,
  addSalonDetailsFailure: false,
  addSalonDetailsFailureMessage: '',
  addWorkHour: false,
  addWorkHourSuccess: false,
  addWorkHourFailure: false,
  addWorkHourFailureMessage: '',
  userInfo: null,
  loginToken: null,
  loggedUserType: '',
  fetchDetails: false,
  fetchDetailsSuccess: false,
  customStylistData: null,
  customCustomerData: null,
  otpMatchReq: false,
  otpMatchFailure: false,
  otpMatchSuccess: false,
  otpMatchFailureMessage: '',
  step1Data: null,
  step2Data: null,
  step3Data: null,
  step4Data: null,
};

export default function SignupReducer(state = initialState, action) {
  switch (action.type) {
    case CUSTOMER_SIGN_UP:
      return {
        ...state,
        signUpReq: true,
        signUpFailure: false,
        signUpSuccess: false,
        signUpFailureMessage: '',
        userInfo: null,
        loggedUserType: '',
      };
    case CUSTOMER_SIGN_UP_SUCCESS:
      return {
        ...state,
        signUpReq: false,
        signUpSuccess: true,
        userInfo: action.data.success.info,
        loginToken: action.data.success.token,
        loggedUserType: 'Customer',
      };
    case CUSTOMER_SIGN_UP_FAILURE:
      return {
        ...state,
        signUpFailure: true,
        signUpReq: false,
        signUpFailureMessage: action.data,
      };
    case CUSTOMER_SIGN_IN:
      return {
        ...state,
        signInReq: true,
        signInFailure: false,
        signInSuccess: false,
        signInFailureMessage: '',
        userInfo: null,
        loggedUserType: '',
      };
    case CUSTOMER_SIGN_IN_SUCCESS:
      return {
        ...state,
        signInReq: false,
        signInSuccess: true,
        loginToken: action.data.success.token,
        loggedUserType: 'Customer',
      };
    case CUSTOMER_SIGN_IN_FAILURE:
      return {
        ...state,
        signInFailure: true,
        signInReq: false,
        signInSuccess: false,
        signInFailureMessage: action.data,
      };
    case STYLIST_SIGN_IN:
      return {
        ...state,
        signInReq: true,
        signInFailure: false,
        signInSuccess: false,
        signInFailureMessage: '',
        userInfo: null,
        loggedUserType: '',
      };
    case STYLIST_SIGN_IN_SUCCESS:
      return {
        ...state,
        signInReq: false,
        signInSuccess: true,
        loginToken: action.data.success.token,
        loggedUserType: 'Barber',
      };
    case STYLIST_SIGN_IN_FAILURE:
      return {
        ...state,
        signInFailure: true,
        signInReq: false,
        signInSuccess: false,
        signInFailureMessage: action.data,
      };
    case GET_CUSTOMER_DETAILS:
      return {
        ...state,
        fetchDetails: true,
        fetchDetailsSuccess: false,
        userInfo: null,
      };
    case COUNTRY_CODE_DETAILS:
      return {
        ...state,
        countryCodeData: action.data,
      };
    case GET_CUSTOMER_DETAILS_SUCCESS:
      return {
        ...state,
        fetchDetails: false,
        fetchDetailsSuccess: true,
        userInfo: action.data,
      };
    case GET_STYLIST_DETAILS:
      return {
        ...state,
        fetchDetails: true,
        fetchDetailsSuccess: false,
        userInfo: null,
      };
    case GET_STYLIST_DETAILS_SUCCESS:
      return {
        ...state,
        fetchDetails: false,
        fetchDetailsSuccess: true,
        userInfo: action.data,
      };
    case STYLIST_SIGN_UP:
      return {
        ...state,
        otpMatchReq: true,
        otpMatchFailure: false,
        otpMatchSuccess: false,
        otpMatchFailureMessage: '',
        userInfo: null,
        loggedUserType: '',
      };
    case STYLIST_SIGN_UP_SUCCESS:
      return {
        ...state,
        otpMatchReq: false,
        otpMatchSuccess: true,
        userInfo: action.data.success.info,
        loginToken: action.data.success.token,
        loggedUserType: 'Barber',
      };
    case STYLIST_SIGN_UP_FAILURE:
      return {
        ...state,
        otpMatchReq: false,
        otpMatchFailure: true,
        otpMatchFailureMessage: action.data,
      };
    case OTP_SENT:
      return {
        ...state,
        otpSentReq: true,
        otpSentSuccess: false,
        otpSentFailure: false,
        otpSentFailureMessage: '',
        customStylistData: action.data,
      };
    case OTP_SENT_SUCCESS:
      return {
        ...state,
        otpSentReq: false,
        otpSentSuccess: true,
      };
    case OTP_SENT_FAILURE:
      return {
        ...state,
        otpSentReq: false,
        otpSentFailure: true,
        otpSentFailureMessage: action.data,
      };

    case OTP_SENT_CUSTOMER:
      return {
        ...state,
        otpSentReqCustomer: true,
        otpSentCustomerSuccess: false,
        otpSentCustomerFailure: false,
        otpSentCustomerFailureMessage: '',
        customCustomerData: action.data,
      };
    case OTP_SENT_CUSTOMER_SUCCESS:
      return {
        ...state,
        otpSentReqCustomer: false,
        otpSentCustomerSuccess: true,
      };
    case OTP_SENT_CUSTOMER_FAILURE:
      return {
        ...state,
        otpSentReqCustomer: false,
        otpSentCustomerFailure: true,
        otpSentCustomerFailureMessage: action.data,
      };

    case STYLIST_PROFILE_UPLOAD:
      return {
        ...state,
        styistProfUploadReq: true,
        styistProfUploadSuccess: false,
        styistProfUploadFailure: false,
        styistProfUploadFailureMessage: '',
        step1Data: action.data,
      };
    case STYLIST_PROFILE_UPLOAD_SUCCESS:
      return {
        ...state,
        styistProfUploadReq: false,
        styistProfUploadSuccess: true,
      };
    case STYLIST_PROFILE_UPLOAD_FAILURE:
      return {
        ...state,
        styistProfUploadReq: false,
        styistProfUploadFailure: true,
        styistProfUploadFailureMessage: action.data,
      };
    case ADD_STYLIST_PROFESSION_DETAILS:
      return {
        ...state,
        addProfessDetails: true,
        addProfessDetailsSuccess: false,
        addProfessDetailsFailure: false,
        addProfessDetailsFailureMessage: '',
        step2Data: action.data,
      };
    case ADD_STYLIST_PROFESSION_DETAILS_SUCCESS:
      return {
        ...state,
        addProfessDetails: false,
        addProfessDetailsSuccess: true,
      };
    case ADD_STYLIST_PROFESSION_DETAILS_FAILURE:
      return {
        ...state,
        addProfessDetails: false,
        addProfessDetailsFailure: true,
        addProfessDetailsFailureMessage: action.data,
      };
    case ADD_STYLIST_SALON_DETAILS:
      return {
        ...state,
        addSalonDetails: true,
        addSalonDetailsSuccess: false,
        addSalonDetailsFailure: false,
        addSalonDetailsFailureMessage: '',
        step3Data: action.data,
      };
    case ADD_STYLIST_SALON_DETAILS_SUCCESS:
      return {
        ...state,
        addSalonDetails: false,
        addSalonDetailsSuccess: true,
      };
    case ADD_STYLIST_SALON_DETAILS_FAILURE:
      return {
        ...state,
        addSalonDetails: false,
        addSalonDetailsFailure: true,
        addSalonDetailsFailureMessage: action.data,
      };
    case ADD_STYLIST_WORK_HOURS:
      return {
        ...state,
        addWorkHour: true,
        addWorkHourSuccess: false,
        addWorkHourFailure: false,
        addWorkHourFailureMessage: '',
      };
    case ADD_STYLIST_WORK_HOURS_SUCCESS:
      return {
        ...state,
        addWorkHour: false,
        addWorkHourSuccess: true,
      };
    case ADD_STYLIST_WORK_HOURS_FAILURE:
      return {
        ...state,
        addWorkHour: false,
        addWorkHourFailure: true,
        addWorkHourFailureMessage: action.data,
      };
    case LOGOUT:
      return {
        ...state,
        signUpReq: false,
        signUpSuccess: false,
        signUpFailure: false,
        signUpFailureMessage: '',
        signInReq: false,
        signInSuccess: false,
        signInFailure: false,
        signInFailureMessage: '',
        otpSentReq: false,
        otpSentSuccess: false,
        otpSentFailure: false,
        otpSentFailureMessage: '',
        styistProfUploadReq: false,
        styistProfUploadSuccess: false,
        styistProfUploadFailure: false,
        styistProfUploadFailureMessage: '',
        addProfessDetailsReq: false,
        addProfessDetailsSuccess: false,
        addProfessDetailsFailure: false,
        addProfessDetailsFailureMessage: '',
        addSalonDetailsReq: false,
        addSalonDetailsSuccess: false,
        addSalonDetailsFailure: false,
        addSalonDetailsFailureMessage: '',
        addWorkHour: false,
        addWorkHourSuccess: false,
        addWorkHourFailure: false,
        addWorkHourFailureMessage: '',
        userInfo: null,
        loginToken: null,
        loggedUserType: '',
        fetchDetails: false,
        fetchDetailsSuccess: false,
        customStylistData: null,
        customCustomerData: null,
        otpMatchReq: false,
        otpMatchFailure: false,
        otpMatchSuccess: false,
        otpMatchFailureMessage: '',
        step1Data: null,
        step2Data: null,
        step3Data: null,
        step4Data: null,
      };
    default:
      return {
        ...state,
      };
  }
}
