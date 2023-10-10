import {takeLatest, call, put} from 'redux-saga/effects';
import axios from 'axios';
import {basepath} from '../../constants/Config';
import {FORGOT_PASS} from '../../redux/actionConfig';
import {
  forgotPassSuccess,
  forgotPassFailure,
} from '../../redux/actions/passwordAction';
export function* forgotPassWatcher() {
  yield takeLatest(FORGOT_PASS, forgotpassWorker);
}
function* forgotpassWorker(action) {
  try {
    const res = yield call(forgotPassFunction, action);
    yield put(forgotPassSuccess(res.data));
  } catch (err) {
    yield put(forgotPassFailure(err.response.data.message));
  }
}

function forgotPassFunction(action) {
  let path =
    action.userType === 'Barber'
      ? 'password/create'
      : 'password/customer/forgot';
  return axios.post(basepath + path, action.data, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
}
