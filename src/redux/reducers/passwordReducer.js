import {
  FORGOT_PASS,
  FORGOT_PASS_SUCCESS,
  FORGOT_PASS_FAILURE,
} from '../actionConfig';

const initialState = {
  forgotPassReq: false,
  forgotPassSuccess: false,
  forgotPassFailure: false,
  forgotPassSuccessMessage: '',
  forgotPassFailureMessage: '',
};

export default function PasswordReducer(state = initialState, action) {
  switch (action.type) {
    case FORGOT_PASS:
      return {
        ...state,
        forgotPassReq: true,
        forgotPassFailure: false,
        forgotPassSuccess: false,
        forgotPassFailureMessage: '',
        forgotPassSuccessMessage: '',
      };
    case FORGOT_PASS_SUCCESS:
      return {
        ...state,
        forgotPassReq: false,
        forgotPassSuccess: true,
        forgotPassSuccessMessage: action.data.message,
      };
    case FORGOT_PASS_FAILURE:
      return {
        ...state,
        forgotPassFailure: true,
        forgotPassReq: false,
        forgotPassFailureMessage: action.data,
      };

    default:
      return {
        ...state,
      };
  }
}
