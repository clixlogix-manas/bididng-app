import {
  FORGOT_PASS,
  FORGOT_PASS_SUCCESS,
  FORGOT_PASS_FAILURE,
} from '../actionConfig';

export const forgotPassReq = (email, type) => {
  return {
    type: FORGOT_PASS,
    data: email,
    userType: type,
  };
};

export const forgotPassSuccess = (response) => {
  return {
    type: FORGOT_PASS_SUCCESS,
    data: response,
  };
};

export const forgotPassFailure = (response) => {
  return {
    type: FORGOT_PASS_FAILURE,
    data: response,
  };
};
