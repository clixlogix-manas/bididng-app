import {takeLatest, call, put} from 'redux-saga/effects';
import axios from 'axios';
import {customerBasepath} from '../../constants/Config';
import {SOCIAL_SIGNIN, SOCIAL_SIGNUP} from '../../redux/actionConfig';
import {
  socialSigninFailure,
  socialSigninSuccess,
  socialSignupFailure,
  socialSignupSuccess,
} from '../../redux/actions/socialAction';

/* -------------------------------------Social SignUp---------------------------------------- */

export function* socialSignupWatcher() {
  yield takeLatest(SOCIAL_SIGNUP, socialSignupWorker);
}
function* socialSignupWorker(action) {
  try {
    const res = yield call(socialSignupFunction, action);
    yield put(socialSignupSuccess(res.data));
  } catch (err) {
    yield put(socialSignupFailure(err.response.data.error));
  }
}

function socialSignupFunction(action) {
  return axios.post(customerBasepath + 'social_register', action.data, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
}

/* -------------------------------------Social SignIn---------------------------------------- */

export function* socialSigninWatcher() {
  yield takeLatest(SOCIAL_SIGNIN, socialSigninWorker);
}
function* socialSigninWorker(action) {
  try {
    const res = yield call(socialSigninFunction, action);
    yield put(socialSigninSuccess(res.data));
  } catch (err) {
    yield put(socialSigninFailure(err.response.data.error));
  }
}

function socialSigninFunction(action) {
  return axios.post(customerBasepath + 'social_login', action.data, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
}
