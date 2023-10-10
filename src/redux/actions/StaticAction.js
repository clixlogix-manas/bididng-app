import {
  GET_ABOUT_US,
  GET_ABOUT_US_SUCCESS,
  GET_PRIVACY_POLICY,
  GET_PRIVACY_POLICY_SUCCESS,
  GET_TERM_AND_COND,
  GET_TERM_AND_COND_SUCCESS,
} from '../actionConfig';

export const getAboutUs = () => {
  return {
    type: GET_ABOUT_US,
  };
};

export const getAboutUsSuccess = (response) => {
  return {
    type: GET_ABOUT_US_SUCCESS,
    data: response,
  };
};

export const getTermAndCond = () => {
  return {
    type: GET_TERM_AND_COND,
  };
};

export const getTermAndCondSuccess = (response) => {
  return {
    type: GET_TERM_AND_COND_SUCCESS,
    data: response,
  };
};

export const getPrivacyPolicy = () => {
  return {
    type: GET_PRIVACY_POLICY,
  };
};

export const getPrivacyPolicySuccess = (response) => {
  return {
    type: GET_PRIVACY_POLICY_SUCCESS,
    data: response,
  };
};
