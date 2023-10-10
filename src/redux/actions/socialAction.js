import {
  SOCIAL_SIGNUP,
  SOCIAL_SIGNUP_SUCCESS,
  SOCIAL_SIGNUP_FAILURE,
  SOCIAL_SIGNIN,
  SOCIAL_SIGNIN_SUCCESS,
  SOCIAL_SIGNIN_FAILURE,
} from '../actionConfig';

export const socialSignup = (data) => {
  return {
    type: SOCIAL_SIGNUP,
    data: data,
  };
};

export const socialSignupSuccess = (response) => {
  return {
    type: SOCIAL_SIGNUP_SUCCESS,
    data: response,
  };
};

export const socialSignupFailure = (response) => {
  return {
    type: SOCIAL_SIGNUP_FAILURE,
    data: response,
  };
};

export const socialSignin = (data) => {
  return {
    type: SOCIAL_SIGNIN,
    data: data,
  };
};

export const socialSigninSuccess = (response) => {
  return {
    type: SOCIAL_SIGNIN_SUCCESS,
    data: response,
  };
};

export const socialSigninFailure = (response) => {
  return {
    type: SOCIAL_SIGNIN_FAILURE,
    data: response,
  };
};
