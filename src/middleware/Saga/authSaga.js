import {takeLatest, call, put} from 'redux-saga/effects';
import axios from 'axios';
import {
  signUpSuccess,
  signUpFailure,
  fetchCustomerDetailsSuccess,
  customerSignInSuccess,
  customerSignInFailure,
  otpSentSuccess,
  otpSentFailure,
  stylistSignUpSuccess,
  stylistSignUpFailure,
  styistProfileUploadSuccess,
  addStylistProfessionDetailsSuccess,
  addStylistProfessionDetailsFailure,
  addStylistSalonDetailsSuccess,
  addStylistSalonDetailsFailure,
  addStylistWorkHourFailure,
  addStylistWorkHourSuccess,
  stylistSignInSuccess,
  stylistSignInFailure,
  fetchStylistDetailsSuccess,
  styistProfileUploadFailure,
} from '../../redux/actions/authAction';
import {customerBasepath, stylistBasepath} from '../../constants/Config';
import {
  CUSTOMER_SIGN_UP,
  GET_CUSTOMER_DETAILS,
  CUSTOMER_SIGN_IN,
  OTP_SENT,
  OTP_SENT_CUSTOMER,
  STYLIST_SIGN_UP,
  STYLIST_PROFILE_UPLOAD,
  ADD_STYLIST_PROFESSION_DETAILS,
  ADD_STYLIST_SALON_DETAILS,
  ADD_STYLIST_WORK_HOURS,
  STYLIST_SIGN_IN,
  GET_STYLIST_DETAILS,
} from '../../redux/actionConfig';
import AsyncStorage from '@react-native-community/async-storage';

export function* signupWatcher() {
  yield takeLatest(CUSTOMER_SIGN_UP, signupWorker);
}

function* signupWorker(action) {
  try {
    let data = action.data;
    const res = yield call(signUpReqFunction, data);
    yield put(signUpSuccess(res.data));
  } catch (err) {
    yield put(signUpFailure(err.response.data.error));
  }
}

function signUpReqFunction(data) {
  return axios.post(customerBasepath + 'register', data, {
    headers: {
      Accept: 'application/json',
    },
  });
}

export function* fetchCustomerWatcher() {
  yield takeLatest(GET_CUSTOMER_DETAILS, fetchCustomerWorker);
}
function* fetchCustomerWorker(action) {
  try {
    let data = action.token;
    const res = yield call(fetchCustomerFunction, data);
    yield put(fetchCustomerDetailsSuccess(res.data));
  } catch (err) {}
}

async function fetchCustomerFunction(data) {
  return axios.get(customerBasepath + 'userdetails', {
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ' + data,
      'Content-Type': 'application/json',
    },
  });
}

export function* customerSignInWatcher() {
  yield takeLatest(CUSTOMER_SIGN_IN, customerSignInWorker);
}
function* customerSignInWorker(action) {
  try {
    let data = action.data;
    const res = yield call(customerSignInFunction, data);
    yield put(customerSignInSuccess(res.data));
  } catch (err) {
    yield put(customerSignInFailure(err.response.data.error));
  }
}

function customerSignInFunction(data) {
  return axios.post(customerBasepath + 'login', data, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
}
/* -----------------------------------------Stylist Signup flow------------------------------------------------ */
/* -----------------------------------------Sent OTP-------------------------------- */

export function* otpSentWatcher() {
  yield takeLatest(OTP_SENT, otpSentWorker);
}
function* otpSentWorker(action) {
  try {
    let data = action.otpData;
    const res = yield call(otpSentFunction, data);
    yield put(otpSentSuccess(res.data));
  } catch (err) {
    yield put(otpSentFailure(err.response.data.error));
  }
}

function otpSentFunction(data) {
  return axios.post(stylistBasepath + 'generateotp', data, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
}

/* -----------------------------------------Customer Signup flow------------------------------------------------ */
/* -----------------------------------------Sent OTP-------------------------------- */

export function* otpSentWatcherCustomer() {
  yield takeLatest(OTP_SENT_CUSTOMER, otpSentWorkerCustomer);
}
function* otpSentWorkerCustomer(action) {
  try {
    let data = action.otpData;
    const res = yield call(otpSentFunctionCustomer, data);
    yield put(otpSentSuccess(res.data));
  } catch (err) {
    yield put(otpSentFailure(err.response.data.error));
  }
}

function otpSentFunctionCustomer(data) {
  return axios.post(customerBasepath + 'generateotp', data, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
}

/* --------------------------------Register basic info-------------------------------- */

export function* stylistSignupWatcher() {
  yield takeLatest(STYLIST_SIGN_UP, stylistSignupWorker);
}
function* stylistSignupWorker(action) {
  try {
    let data = action.data;
    const res = yield call(stylistSignupReqFunction, data);
    yield put(stylistSignUpSuccess(res.data));
  } catch (err) {
    yield put(stylistSignUpFailure(err.response.data.error));
  }
}

function stylistSignupReqFunction(data) {
  return axios.post(stylistBasepath + 'register', data, {
    headers: {
      Accept: 'application/json',
      'Content-Type': '',
    },
  });
}

/* --------------------------------Upload profile picture-------------------------------- */

export function* styistProfileUploadWatcher() {
  yield takeLatest(STYLIST_PROFILE_UPLOAD, styistProfileUploadWorker);
}
function* styistProfileUploadWorker(action) {
  try {
    let data = action.data;
    const res = yield call(styistProfileUploadReqFunction, data);
    yield put(styistProfileUploadSuccess(res.data));
  } catch (err) {
    yield put(styistProfileUploadFailure(err.response.data.error.prof_pic[0]));
  }
}

async function styistProfileUploadReqFunction(data) {
  let token = await AsyncStorage.getItem('loginToken');
  let temptoken = await AsyncStorage.getItem('temploginToken');
  return axios.post(stylistBasepath + 'profile_step_one', data, {
    headers: {
      Authorization: token ? 'Bearer ' + token : 'Bearer ' + temptoken,
      'Content-Type': 'multipart/form-data',
      Accept: 'application/json',
    },
  });
}

/* --------------------------------Add profession details-------------------------------- */

export function* addProfessDetailsWatcher() {
  yield takeLatest(ADD_STYLIST_PROFESSION_DETAILS, addProfessDetailsWorker);
}
function* addProfessDetailsWorker(action) {
  try {
    let data = action.data;
    const res = yield call(addProfessDetailsReqFunction, data);
    if (res.status === 200) {
      yield put(addStylistProfessionDetailsSuccess(res.status));
    }
  } catch (err) {
    yield put(addStylistProfessionDetailsFailure(err.response.data.message));
  }
}

async function addProfessDetailsReqFunction(data) {
  let token = await AsyncStorage.getItem('loginToken');
  let temptoken = await AsyncStorage.getItem('temploginToken');

  return axios.post(stylistBasepath + 'profile_step_two', data, {
    headers: {
      Authorization: token ? 'Bearer ' + token : 'Bearer ' + temptoken,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
}

/* --------------------------------Add Salon details-------------------------------- */

export function* addSalonDetailsWatcher() {
  yield takeLatest(ADD_STYLIST_SALON_DETAILS, addSalonDetailsWorker);
}
function* addSalonDetailsWorker(action) {
  try {
    let data = action.data;
    const res = yield call(addSalonDetailsReqFunction, data);
    yield put(addStylistSalonDetailsSuccess(res.data));
  } catch (err) {
    yield put(addStylistSalonDetailsFailure(err.response.data.message));
  }
}

async function addSalonDetailsReqFunction(data) {
  let token = await AsyncStorage.getItem('loginToken');
  let temptoken = await AsyncStorage.getItem('temploginToken');
  return axios.post(stylistBasepath + 'profile_step_three', data, {
    headers: {
      Authorization: token ? 'Bearer ' + token : 'Bearer ' + temptoken,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
}

/* --------------------------------Add work hours -------------------------------- */

export function* addWorkHourWatcher() {
  yield takeLatest(ADD_STYLIST_WORK_HOURS, addWorkHourWorker);
}
function* addWorkHourWorker(action) {
  try {
    let data = action.data;
    const res = yield call(addWorkHourReqFunction, data);

    yield put(addStylistWorkHourSuccess(res.data));
  } catch (err) {
    yield put(addStylistWorkHourFailure(err.response.data.message));
  }
}

async function addWorkHourReqFunction(data) {
  let token = await AsyncStorage.getItem('loginToken');
  let temptoken = await AsyncStorage.getItem('temploginToken');
  return axios.post(stylistBasepath + 'profile_step_four', data, {
    headers: {
      Authorization: token ? 'Bearer ' + token : 'Bearer ' + temptoken,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
}

/* --------------------------------Stylist Signin-------------------------------- */

export function* stylistSignInWatcher() {
  yield takeLatest(STYLIST_SIGN_IN, stylistSignInWorker);
}

function* stylistSignInWorker(action) {
  try {
    let data = action.data;
    const res = yield call(stylistSignInFunction, data);
    yield put(stylistSignInSuccess(res.data));
  } catch (err) {
    yield put(stylistSignInFailure(err.response.data.error));
  }
}

function stylistSignInFunction(data) {
  return axios.post(stylistBasepath + 'login', data, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
}

/* ---------------------------Fetch Stylist details------------------------------------ */

export function* fetchStylistWatcher() {
  yield takeLatest(GET_STYLIST_DETAILS, fetchStylistWorker);
}
function* fetchStylistWorker(action) {
  try {
    let data = action.token;
    const res = yield call(fetchStylistFunction, data);
    yield put(fetchStylistDetailsSuccess(res.data));
  } catch (err) {}
}

async function fetchStylistFunction(data) {
  return axios.get(stylistBasepath + 'account', {
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ' + data,
      'Content-Type': 'application/json',
    },
  });
}
