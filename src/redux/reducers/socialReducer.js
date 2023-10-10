import {
  SOCIAL_SIGNUP,
  SOCIAL_SIGNUP_SUCCESS,
  SOCIAL_SIGNUP_FAILURE,
  SOCIAL_SIGNIN,
  SOCIAL_SIGNIN_SUCCESS,
  SOCIAL_SIGNIN_FAILURE,
  LOGOUT,
} from '../actionConfig';

const initialState = {
  socialSignupReq: false,
  socialSignupSuccess: false,
  socialSignupFailure: false,
  socialSignupSuccessMessage: '',
  socialSignupFailureMessage: '',
  socialSigninReq: false,
  socialSigninSuccess: false,
  socialSigninFailure: false,
  socialSigninFailureMessage: '',
  loginToken: null,
  loggedUserType: '',
};

export default function SocialReducer(state = initialState, action) {
  switch (action.type) {
    case SOCIAL_SIGNUP:
      return {
        ...state,
        socialSignupReq: true,
        socialSignupFailure: false,
        socialSignupSuccess: false,
        socialSignupFailureMessage: '',
        socialSignupSuccessMessage: '',
        loginToken: null,
        loggedUserType: '',
      };
    case SOCIAL_SIGNUP_SUCCESS:
      return {
        ...state,
        socialSignupReq: false,
        socialSignupSuccess: true,
        socialSignupSuccessMessage: action.data.message,
        loginToken: action.data.success.token,
        loggedUserType: 'Customer',
      };
    case SOCIAL_SIGNUP_FAILURE:
      return {
        ...state,
        socialSignupFailure: true,
        socialSignupReq: false,
        socialSignupFailureMessage: action.data,
      };
    case SOCIAL_SIGNIN:
      return {
        ...state,
        socialSigninReq: true,
        socialSigninFailure: false,
        socialSigninSuccess: false,
        socialSigninFailureMessage: '',
        loginToken: null,
        loggedUserType: '',
      };
    case SOCIAL_SIGNIN_SUCCESS:
      return {
        ...state,
        socialSigninReq: false,
        socialSigninSuccess: true,
        loginToken: action.data.success.token,
        loggedUserType: 'Customer',
      };
    case SOCIAL_SIGNIN_FAILURE:
      return {
        ...state,
        socialSigninFailure: true,
        socialSigninReq: false,
        socialSigninFailureMessage: action.data,
      };
    case LOGOUT:
      return {
        socialSignupReq: false,
        socialSignupSuccess: false,
        socialSignupFailure: false,
        socialSignupSuccessMessage: '',
        socialSignupFailureMessage: '',
        socialSigninReq: false,
        socialSigninSuccess: false,
        socialSigninFailure: false,
        socialSigninFailureMessage: '',
        loginToken: null,
        loggedUserType: '',
      };
    default:
      return {
        ...state,
      };
  }
}
