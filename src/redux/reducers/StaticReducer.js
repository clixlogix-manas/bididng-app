import {
  GET_ABOUT_US,
  GET_ABOUT_US_SUCCESS,
  GET_TERM_AND_COND,
  GET_TERM_AND_COND_SUCCESS,
  GET_PRIVACY_POLICY,
  GET_PRIVACY_POLICY_SUCCESS,
} from '../actionConfig';

const initialState = {
  StaticContReq: false,
  StaticContSuccess: false,
  AboutUs: null,
  PrivacyPolicy: null,
  TermAndCond: null,
};

export default function StaticReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ABOUT_US:
      return {
        ...state,
        StaticContReq: true,
        StaticContSuccess: false,
        AboutUs: null,
      };
    case GET_ABOUT_US_SUCCESS:
      return {
        ...state,
        StaticContReq: false,
        StaticContSuccess: true,
        AboutUs: action.data,
      };

    case GET_TERM_AND_COND:
      return {
        ...state,
        StaticContReq: true,
        StaticContSuccess: false,
        TermAndCond: null,
      };
    case GET_TERM_AND_COND_SUCCESS:
      return {
        ...state,
        StaticContReq: false,
        StaticContSuccess: true,
        TermAndCond: action.data,
      };

    case GET_PRIVACY_POLICY:
      return {
        ...state,
        StaticContReq: true,
        StaticContSuccess: false,
        PrivacyPolicy: null,
      };
    case GET_PRIVACY_POLICY_SUCCESS:
      return {
        ...state,
        StaticContReq: false,
        StaticContSuccess: true,
        PrivacyPolicy: action.data,
      };
    default:
      return {
        ...state,
      };
  }
}
