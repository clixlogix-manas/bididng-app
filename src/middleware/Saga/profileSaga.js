import {takeLatest, call, put} from 'redux-saga/effects';
import axios from 'axios';
import {customerBasepath, stylistBasepath} from '../../constants/Config';
import {
  UPDATE_ACCOUNT_INFO,
  UPDATE_PASSWORD,
  ADD_PORTFOLIO_IMAGE,
  GET_PORTFOLIO_IMAGE,
  ADD_SUBSCRIPTION,
  CUSTOMER_PROFILE_UPLOAD,
  GET_LIKED_PHOTO,
  GET_STYLIST_INVOICE,
  GET_CUSTOMER_INVOICE,
  CHANGE_TEMPLATE,
} from '../../redux/actionConfig';
import AsyncStorage from '@react-native-community/async-storage';
import {
  updateAccountInfoFailure,
  updatePasswordSuccess,
  updatePasswordFailure,
  addPortfolioImageSuccess,
  addPortfolioImageFailure,
  getPortfolioImageSuccess,
  updateAccountInfoSuccess,
  addSubscriptionSuccess,
  addSubscriptionFailure,
  updateProfilePicSuccess,
  updateProfilePicFailure,
  getLikedPhotoSuccess,
  getPortfolioImageFailure,
  getStylistInvoiceSuccess,
  getStylistInvoiceFailure,
  getCustomerInvoiceSuccess,
  getCustomerInvoiceFailure,
  changeTemplateFailure,
} from '../../redux/actions/profileAction';

/* ---------------------------------Edit Account info---------------------------------- */

export function* updateAccountWatcher() {
  yield takeLatest(UPDATE_ACCOUNT_INFO, updateAccountWorker);
}
function* updateAccountWorker(action) {
  try {
    let data = action.data;
    const res = yield call(updateAccountFunction, data);
    console.log(res, data);
    yield put(updateAccountInfoSuccess(res.data));
  } catch (err) {
    yield put(updateAccountInfoFailure(err.response.data));
  }
}

async function updateAccountFunction(data) {
  console.log('##$$#$$Form data ddd=>', data);
  let token = await AsyncStorage.getItem('loginToken');
  let userType = await AsyncStorage.getItem('loggedUserType');
  let path = userType === 'Customer' ? customerBasepath : stylistBasepath;
  return axios.post(path + 'update_account', data, {
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
}

/* ---------------------------------Edit Stylist Password---------------------------------- */

export function* updatePasswordWatcher() {
  yield takeLatest(UPDATE_PASSWORD, updatePasswordWorker);
}
function* updatePasswordWorker(action) {
  try {
    let data = action.data;
    const res = yield call(updatePasswordFunction, data);
    yield put(updatePasswordSuccess(res.data));
  } catch (err) {
    let msg = err.response.data.error
      ? err.response.data.error.new_password[0]
      : err.response.data.msg;
    yield put(updatePasswordFailure(msg));
  }
}
async function updatePasswordFunction(data) {
  let token = await AsyncStorage.getItem('loginToken');
  let userType = await AsyncStorage.getItem('loggedUserType');
  let path = userType === 'Customer' ? customerBasepath : stylistBasepath;
  return axios.post(path + 'update_password', data, {
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
}

/* ---------------------------------Add Stylist Portfolio---------------------------------- */

export function* addPortfolioImageWatcher() {
  yield takeLatest(ADD_PORTFOLIO_IMAGE, addPortfolioImageWorker);
}
function* addPortfolioImageWorker(action) {
  try {
    let data = action.data;
    const res = yield call(addPortfolioImageFunction, data);
    console.log('##### Image Upload', res);
    yield put(addPortfolioImageSuccess(res.data));
  } catch (err) {
    yield put(addPortfolioImageFailure(err.response.data.error.image_upload));
  }
}
async function addPortfolioImageFunction(data) {
  //data.append('profile_hide', 1);
  //data.append('is_background', 1);
   let r_data = data;
  let token = await AsyncStorage.getItem('loginToken');
  let userType = await AsyncStorage.getItem('loggedUserType');
  let path = userType === 'Customer' ? customerBasepath : stylistBasepath;
  console.log('###$%^&&&^$###$  Path', path);
  console.log('###$%^&&&^$###$  data', r_data);
  return axios.post(path + 'upload_portfolio_images', data, {
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type' : 'multipart/form-data',
      Accept: 'application/json',
    },
  });
}

/* ---------------------------------Get Stylist Portfolio---------------------------------- */

export function* getPortfolioImageWatcher() {
  yield takeLatest(GET_PORTFOLIO_IMAGE, getPortfolioImageWorker);
}
function* getPortfolioImageWorker(action) {
  try {
    let data = action.data;
    const res = yield call(getPortfolioImageFunction, data);
    yield put(getPortfolioImageSuccess(res.data));
  } catch (err) {
    yield put(getPortfolioImageFailure(err.response.data.message));
  }
}
async function getPortfolioImageFunction(data) {
  let token = await AsyncStorage.getItem('loginToken');
  let userType = await AsyncStorage.getItem('loggedUserType');
  let path = userType === 'Customer' ? customerBasepath : stylistBasepath;
  return axios.get(path + 'view_portfolio_images', {
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
}

/* ---------------------------------Get Liked Photo---------------------------------- */

export function* getLikedPhotoWatcher() {
  yield takeLatest(GET_LIKED_PHOTO, getLikedPhotoWorker);
}
function* getLikedPhotoWorker(action) {
  try {
    const res = yield call(getLikedPhotoFunction);
    yield put(getLikedPhotoSuccess(res.data));
  } catch (err) {}
}
async function getLikedPhotoFunction() {
  let token = await AsyncStorage.getItem('loginToken');
  return axios.get(customerBasepath + 'get_liked_photo', {
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
}

/* ---------------------------------Add Subscription---------------------------------- */

export function* addSubscriptionWatcher() {
  yield takeLatest(ADD_SUBSCRIPTION, addSubscriptionWorker);
}
function* addSubscriptionWorker(action) {
  try {
    let data = action.data;
    const res = yield call(addSubscriptionFunction, data);
    yield put(addSubscriptionSuccess(res.data));
  } catch (err) {
    yield put(addSubscriptionFailure(err.response.data.message));
  }
}
async function addSubscriptionFunction(data) {
  let token = await AsyncStorage.getItem('loginToken');
  return axios.post(stylistBasepath + 'subscription', data, {
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
}

/* ---------------------------------Edit Customer profile pic---------------------------------- */

export function* updateProfilePicWatcher() {
  yield takeLatest(CUSTOMER_PROFILE_UPLOAD, updateProfilePicWorker);
}
function* updateProfilePicWorker(action) {
  try {
    let data = action.data;
    const res = yield call(updateProfilePicFunction, data);
    yield put(updateProfilePicSuccess(res.data));
  } catch (err) {
    yield put(updateProfilePicFailure(err.response.data.error.prof_pic[0]));
  }
}

async function updateProfilePicFunction(data) {
  let token = await AsyncStorage.getItem('loginToken');
  return axios.post(customerBasepath + 'update_prof_pic', data, {
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
}

/* ---------------------------------Get Stylist Invoice---------------------------------- */

export function* getStylistInvoiceWatcher() {
  yield takeLatest(GET_STYLIST_INVOICE, getStylistInvoiceWorker);
}
function* getStylistInvoiceWorker(action) {
  try {
    const res = yield call(getStylistInvoiceFunction);
    yield put(getStylistInvoiceSuccess(res.data.bookings));
  } catch (err) {
    yield put(getStylistInvoiceFailure(err.response.data));
  }
}
async function getStylistInvoiceFunction() {
  let token = await AsyncStorage.getItem('loginToken');
  return axios.get(stylistBasepath + 'invoice', {
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
}

/* ---------------------------------Get Customer Invoice---------------------------------- */

export function* getCustomerInvoiceWatcher() {
  yield takeLatest(GET_CUSTOMER_INVOICE, getCustomerInvoiceWorker);
}
function* getCustomerInvoiceWorker(action) {
  try {
    const res = yield call(getCustomerInvoiceFunction);
    yield put(getCustomerInvoiceSuccess(res.data.bookings));
  } catch (err) {
    yield put(getCustomerInvoiceFailure(err.response.data));
  }
}
async function getCustomerInvoiceFunction() {
  let token = await AsyncStorage.getItem('loginToken');
  return axios.get(customerBasepath + 'invoice', {
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
}

/* ---------------------------------Change stylist template---------------------------------- */

export function* changeStylistTemplateWatcher() {
  yield takeLatest(CHANGE_TEMPLATE, changeStylistTemplateWorker);
}
function* changeStylistTemplateWorker(action) {
  try {
    let data = action.data;
    // eslint-disable-next-line no-unused-vars
    const res = yield call(changeStylistTemplateFunction, data);
  } catch (err) {
    yield put(changeTemplateFailure(err.response));
  }
}
async function changeStylistTemplateFunction(template) {
  let token = await AsyncStorage.getItem('loginToken');
  let formdata = new FormData();
  formdata.append('template_type', template);
  return axios.post(stylistBasepath + 'update_profile_template', formdata, {
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
}
