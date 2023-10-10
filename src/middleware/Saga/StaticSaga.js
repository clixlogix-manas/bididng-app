import {takeLatest, call, put} from 'redux-saga/effects';
import axios from 'axios';
import {basepath} from '../../constants/Config';
import {
  GET_ABOUT_US,
  GET_PRIVACY_POLICY,
  GET_TERM_AND_COND,
} from '../../redux/actionConfig';
import {
  getAboutUsSuccess,
  getPrivacyPolicySuccess,
  getTermAndCondSuccess,
} from '../../redux/actions/StaticAction';
export function* getAboutUsWatcher() {
  yield takeLatest(GET_ABOUT_US, getAboutUsWorker);
}
function* getAboutUsWorker() {
  try {
    const res = yield call(getAboutUsFunction);
    yield put(getAboutUsSuccess(res.data.page));
  } catch (err) {
    if (err.response) {
    }
  }
}

async function getAboutUsFunction() {
  return axios.get(basepath + 'page/1', {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
}

export function* getPrivacyPolicyWatcher() {
  yield takeLatest(GET_PRIVACY_POLICY, getPrivacyPolicyWorker);
}
function* getPrivacyPolicyWorker() {
  try {
    const res = yield call(getPrivacyPolicyFunction);
    yield put(getPrivacyPolicySuccess(res.data.page));
  } catch (err) {
    if (err.response) {
    }
  }
}

async function getPrivacyPolicyFunction() {
  return axios.get(basepath + 'page/2', {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
}

export function* getTermAndCondWatcher() {
  yield takeLatest(GET_TERM_AND_COND, getTermAndCondWorker);
}
function* getTermAndCondWorker() {
  try {
    const res = yield call(getTermAndCondFunction);
    yield put(getTermAndCondSuccess(res.data.page));
  } catch (err) {
    if (err.response) {
    }
  }
}

async function getTermAndCondFunction() {
  return axios.get(basepath + 'page/3', {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
}
