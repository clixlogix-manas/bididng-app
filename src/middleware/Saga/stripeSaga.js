import {takeLatest, call, put} from 'redux-saga/effects';
import axios from 'axios';
import {customerBasepath, stylistBasepath} from '../../constants/Config';
import {
  ADD_BANK_ACCOUNT,
  ADD_PAYMENT_CARD,
  CREATE_STRIPE_CUSTOMER,
  DELETE_PAYMENT_CARD,
  GET_BANK_ACCOUNT,
  GET_PAYMENT_CARD,
  UPDATE_BANK_ACCOUNT,
} from '../../redux/actionConfig';
import {
  addBankAccountFailure,
  addBankAccountSuccess,
  addPaymentCardFailure,
  addPaymentCardSuccess,
  createStripeCustomerFailure,
  createStripeCustomerSuccess,
  deletePaymentCardFailure,
  deletePaymentCardSuccess,
  getBankAccountFailure,
  getBankAccountSuccess,
  getPaymentCardFailure,
  getPaymentCardSuccess,
  updateBankAccountFailure,
  updateBankAccountSuccess,
} from '../../redux/actions/stripeAction';
import AsyncStorage from '@react-native-community/async-storage';

/* --------------------------Create Stripe Customer--------------------- */
export function* createStripeCustWatcher() {
  yield takeLatest(CREATE_STRIPE_CUSTOMER, createStripeCustWorker);
}
function* createStripeCustWorker(action) {
  try {
    const res = yield call(createStripeCustFunction);
    yield put(createStripeCustomerSuccess(res.data.stripe_id));
  } catch (err) {
    if (err.response) {
      yield put(createStripeCustomerFailure(err.response.data));
    }
  }
}

async function createStripeCustFunction() {
  let token = await AsyncStorage.getItem('loginToken');
  return axios.post(
    customerBasepath + 'createcust',
    {},
    {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    },
  );
}

/* --------------------------Add Payment Card--------------------- */

export function* addPaymentCardWatcher() {
  yield takeLatest(ADD_PAYMENT_CARD, addPaymentCardWorker);
}
function* addPaymentCardWorker(action) {
  try {
    const data = action.data;
    const res = yield call(addPaymentCardFunction, data);
    yield put(addPaymentCardSuccess(res.data));
  } catch (err) {
    if (err.response) {
      let errMsg = err.response.message
        ? err.response.message
        : err.response.data.message;
      yield put(addPaymentCardFailure(errMsg));
    }
  }
}

async function addPaymentCardFunction(data) {
  let token = await AsyncStorage.getItem('loginToken');
  return axios.post(customerBasepath + 'addcard', data, {
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
}

/* --------------------------Delete Payment Card--------------------- */

export function* deletePaymentCardWatcher() {
  yield takeLatest(DELETE_PAYMENT_CARD, deletePaymentCardWorker);
}
function* deletePaymentCardWorker(action) {
  try {
    const data = action.data;
    const res = yield call(deletePaymentCardFunction, data);
    yield put(deletePaymentCardSuccess(res.data));
  } catch (err) {
    if (err.response) {
      yield put(deletePaymentCardFailure(err.response));
    }
  }
}

async function deletePaymentCardFunction(data) {
  let token = await AsyncStorage.getItem('loginToken');
  return axios.post(customerBasepath + 'deletecard', data, {
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
}

/* --------------------------Get Payment Card--------------------- */

export function* getPaymentCardWatcher() {
  yield takeLatest(GET_PAYMENT_CARD, getPaymentCardWorker);
}
function* getPaymentCardWorker() {
  try {
    const res = yield call(getPaymentCardFunction);
    yield put(getPaymentCardSuccess(res.data.card_info));
  } catch (err) {
    if (err.response) {
      yield put(getPaymentCardFailure(err.response.message));
    }
  }
}

async function getPaymentCardFunction() {
  let token = await AsyncStorage.getItem('loginToken');
  return axios.get(customerBasepath + 'getcards', {
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
}

/* --------------------------Add Bank Account--------------------- */

export function* addBankAccountWatcher() {
  yield takeLatest(ADD_BANK_ACCOUNT, addBankAccountWorker);
}
function* addBankAccountWorker(action) {
  try {
    const data = action.data;
    const res = yield call(addBankAccountFunction, data);
    yield put(addBankAccountSuccess(res.data));
  } catch (err) {
    if (err.response) {
      yield put(addBankAccountFailure(err.response.data.message));
    }
  }
}

async function addBankAccountFunction(data) {
  let token = await AsyncStorage.getItem('loginToken');
  return axios.post(stylistBasepath + 'create_account', data, {
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
}

/* --------------------------Get Bank Account--------------------- */

export function* getBankAccountWatcher() {
  yield takeLatest(GET_BANK_ACCOUNT, getBankAccountWorker);
}
function* getBankAccountWorker() {
  try {
    const res = yield call(getBankAccountFunction);
    yield put(getBankAccountSuccess(res.data));
  } catch (err) {
    if (err.response) {
      yield put(getBankAccountFailure(err.response));
    }
  }
}

async function getBankAccountFunction() {
  let token = await AsyncStorage.getItem('loginToken');
  return axios.get(stylistBasepath + 'get_stripe_info', {
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
}

/* --------------------------Update Bank Account--------------------- */

export function* updateBankAccountWatcher() {
  yield takeLatest(UPDATE_BANK_ACCOUNT, updateBankAccountWorker);
}
function* updateBankAccountWorker(action) {
  try {
    const data = action.data;
    const res = yield call(updateBankAccountFunction, data);
    yield put(updateBankAccountSuccess(res.data));
  } catch (err) {
    if (err.response) {
      yield put(updateBankAccountFailure(err.response.data.message));
    }
  }
}

async function updateBankAccountFunction(data) {
  let token = await AsyncStorage.getItem('loginToken');
  return axios.post(stylistBasepath + 'update_stripe_account', data, {
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
}
