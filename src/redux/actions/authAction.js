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
  COUNTRY_CODE_DETAILS,
  LOGOUT,
  OTP_SENT_CUSTOMER_FAILURE,
  OTP_SENT_CUSTOMER_SUCCESS,
  OTP_SENT_CUSTOMER,
} from '../actionConfig';

export const signUpReq = (registerData) => {
  return {
    type: CUSTOMER_SIGN_UP,
    data: registerData,
  };
};

export const signUpSuccess = (response) => {
  return {
    type: CUSTOMER_SIGN_UP_SUCCESS,
    data: response,
  };
};

export const signUpFailure = (response) => {
  return {
    type: CUSTOMER_SIGN_UP_FAILURE,
    data: response,
  };
};
export const customerSignInReq = (signData) => {
  return {
    type: CUSTOMER_SIGN_IN,
    data: signData,
  };
};

export const customerSignInSuccess = (response) => {
  return {
    type: CUSTOMER_SIGN_IN_SUCCESS,
    data: response,
  };
};

export const customerSignInFailure = (response) => {
  return {
    type: CUSTOMER_SIGN_IN_FAILURE,
    data: response,
  };
};
export const stylistSignInReq = (signData) => {
  return {
    type: STYLIST_SIGN_IN,
    data: signData,
  };
};

export const stylistSignInSuccess = (response) => {
  return {
    type: STYLIST_SIGN_IN_SUCCESS,
    data: response,
  };
};

export const stylistSignInFailure = (response) => {
  return {
    type: STYLIST_SIGN_IN_FAILURE,
    data: response,
  };
};
export const fetchCustomerDetails = (token) => {
  return {
    type: GET_CUSTOMER_DETAILS,
    token: token,
  };
};

export const fetchCustomerDetailsSuccess = (response) => {
  return {
    type: GET_CUSTOMER_DETAILS_SUCCESS,
    data: response,
  };
};

export const stylistSignUpReq = (registerData) => {
  return {
    type: STYLIST_SIGN_UP,
    data: registerData,
  };
};

export const stylistSignUpSuccess = (response) => {
  return {
    type: STYLIST_SIGN_UP_SUCCESS,
    data: response,
  };
};

export const stylistSignUpFailure = (response) => {
  return {
    type: STYLIST_SIGN_UP_FAILURE,
    data: response,
  };
};

export const otpSentReq = (data, otpData) => {
  return {
    type: OTP_SENT,
    data: data,
    otpData: otpData,
  };
};

export const otpSentSuccess = (response) => {
  return {
    type: OTP_SENT_SUCCESS,
    data: response,
  };
};

export const otpSentFailure = (response) => {
  return {
    type: OTP_SENT_FAILURE,
    data: response,
  };
};

export const otpSentCustomerReq = (data, otpData) => {
  return {
    type: OTP_SENT_CUSTOMER,
    data: data,
    otpData: otpData,
  };
};

export const otpSentCustomerSuccess = (response) => {
  return {
    type: OTP_SENT_CUSTOMER_SUCCESS,
    data: response,
  };
};

export const otpSentCustomerFailure = (response) => {
  return {
    type: OTP_SENT_CUSTOMER_FAILURE,
    data: response,
  };
};

export const styistProfileUploadReq = (profilePic) => {
  return {
    type: STYLIST_PROFILE_UPLOAD,
    data: profilePic,
  };
};

export const styistProfileUploadSuccess = (response) => {
  return {
    type: STYLIST_PROFILE_UPLOAD_SUCCESS,
    data: response,
  };
};

export const styistProfileUploadFailure = (response) => {
  return {
    type: STYLIST_PROFILE_UPLOAD_FAILURE,
    data: response,
  };
};

export const addStylistProfessionDetails = (professiondata) => {
  return {
    type: ADD_STYLIST_PROFESSION_DETAILS,
    data: professiondata,
  };
};

export const addStylistProfessionDetailsSuccess = (response) => {
  return {
    type: ADD_STYLIST_PROFESSION_DETAILS_SUCCESS,
    data: response,
  };
};

export const addStylistProfessionDetailsFailure = (response) => {
  return {
    type: ADD_STYLIST_PROFESSION_DETAILS_FAILURE,
    data: response,
  };
};

export const addStylistSalonDetails = (salondata) => {
  return {
    type: ADD_STYLIST_SALON_DETAILS,
    data: salondata,
  };
};

export const addStylistSalonDetailsSuccess = (response) => {
  return {
    type: ADD_STYLIST_SALON_DETAILS_SUCCESS,
    data: response,
  };
};

export const addStylistSalonDetailsFailure = (response) => {
  return {
    type: ADD_STYLIST_SALON_DETAILS_FAILURE,
    data: response,
  };
};

export const addStylistWorkHour = (workdata) => {
  return {
    type: ADD_STYLIST_WORK_HOURS,
    data: workdata,
  };
};

export const addStylistWorkHourSuccess = (response) => {
  return {
    type: ADD_STYLIST_WORK_HOURS_SUCCESS,
    data: response,
  };
};

export const addStylistWorkHourFailure = (response) => {
  return {
    type: ADD_STYLIST_WORK_HOURS_FAILURE,
    data: response,
  };
};

export const fetchStylistDetails = (token) => {
  return {
    type: GET_STYLIST_DETAILS,
    token: token,
  };
};

export const updateSelectedCountryDetail = (item) => {
  return {
    type: COUNTRY_CODE_DETAILS,
    data: item,
  };
};

export const fetchStylistDetailsSuccess = (response) => {
  return {
    type: GET_STYLIST_DETAILS_SUCCESS,
    data: response,
  };
};

export const logout = () => {
  return {
    type: LOGOUT,
  };
};
