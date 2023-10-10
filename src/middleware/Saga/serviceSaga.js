import {takeLatest, call, put} from 'redux-saga/effects';
import axios from 'axios';
import {customerBasepath, stylistBasepath} from '../../constants/Config';
import {
  ADD_STYLIST_SERVICES,
  EDIT_STYLIST_SERVICES,
  GET_STYLIST_SERVICES,
  DELETE_STYLIST_SERVICES,
  ADD_SERVICES_DISCOUNT,
  GET_CUSTOMER_STYLIST_SERVICES,
} from '../../redux/actionConfig';
import {
  addStylistServiceSuccess,
  addStylistServiceFailure,
  editStylistServiceSuccess,
  editStylistServiceFailure,
  getStylistServiceSuccess,
  deleteStylistServiceSuccess,
  deleteStylistServiceFailure,
  addServiceDiscountSuccess,
  addServiceDiscountFailure,
  getCustomerStylistServiceSuccess,
} from '../../redux/actions/serviceAction';
import AsyncStorage from '@react-native-community/async-storage';
/* ---------------------------------Add Service---------------------------------- */

export function* addServiceWatcher() {
  yield takeLatest(ADD_STYLIST_SERVICES, addServiceWorker);
}
function* addServiceWorker(action) {
  try {
    let data = action.data;
    const res = yield call(addServiceFunction, data);

    yield put(addStylistServiceSuccess(res.data));
  } catch (err) {
    yield put(addStylistServiceFailure(err.response.data));
  }
}

async function addServiceFunction(data) {
  let token = await AsyncStorage.getItem('loginToken');
  return axios.post(stylistBasepath + 'add_service', data, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Bearer ' + token,
    },
  });
}

/* ---------------------------------Add Discount---------------------------------- */

export function* addDiscountWatcher() {
  yield takeLatest(ADD_SERVICES_DISCOUNT, addDiscountWorker);
}
function* addDiscountWorker(action) {
  try {
    let data = action.data;
    const res = yield call(addDiscountFunction, data);
    yield put(addServiceDiscountSuccess(res.data));
  } catch (err) {
    yield put(addServiceDiscountFailure(err.response.data));
  }
}

async function addDiscountFunction(data) {
  let token = await AsyncStorage.getItem('loginToken');
  return axios.post(stylistBasepath + 'service_discount', data, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Bearer ' + token,
    },
  });
}

/* ---------------------------------Edit Service---------------------------------- */

export function* editServiceWatcher() {
  yield takeLatest(EDIT_STYLIST_SERVICES, editServiceWorker);
}
function* editServiceWorker(action) {
  try {
    let newData = {
      data: action.data,
      id: action.id,
    };
    const res = yield call(editServiceFunction, newData);

    yield put(editStylistServiceSuccess(res.data));
  } catch (err) {
    yield put(editStylistServiceFailure(err.response.data.message));
  }
}

async function editServiceFunction(newData) {
  let token = await AsyncStorage.getItem('loginToken');
  return axios.post(
    stylistBasepath + 'update_service/' + newData.id,
    newData.data,
    {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    },
  );
}
/* ---------------------------------Delete Service---------------------------------- */

export function* deleteServiceWatcher() {
  yield takeLatest(DELETE_STYLIST_SERVICES, deleteServiceWorker);
}
function* deleteServiceWorker(action) {
  try {
    let data = action.data;
    const res = yield call(deleteServiceFunction, data);
    yield put(deleteStylistServiceSuccess(res.data));
  } catch (err) {
    yield put(deleteStylistServiceFailure(err.response.data.message));
  }
}

async function deleteServiceFunction(data) {
  let token = await AsyncStorage.getItem('loginToken');
  return axios.get(stylistBasepath + 'delete_service/' + data, {
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
}

/* ---------------------------------Get Service---------------------------------- */

export function* getServiceWatcher() {
  yield takeLatest(GET_STYLIST_SERVICES, getServiceWorker);
}
function* getServiceWorker(action) {
  try {
    var res = yield call(getServiceFunction);

    yield put(getStylistServiceSuccess(res.data));
  } catch (err) {}
}

async function getServiceFunction() {
  let token = await AsyncStorage.getItem('loginToken');
  return axios.get(stylistBasepath + 'servicelist', {
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
}

/* ---------------------------------Get Customer Stylist Service---------------------------------- */

export function* getCustomerStylistServiceWatcher() {
  yield takeLatest(
    GET_CUSTOMER_STYLIST_SERVICES,
    getCustomerStylistServiceWorker,
  );
}
function* getCustomerStylistServiceWorker(action) {
  try {
    let data = action.data;
    var res = yield call(getCustomerStylistServiceFunction, data);
    yield put(getCustomerStylistServiceSuccess(res.data));
  } catch (err) {}
}

async function getCustomerStylistServiceFunction(data) {
  // eslint-disable-next-line no-unused-vars
  let token = await AsyncStorage.getItem('loginToken');
  return axios.post(customerBasepath + 'get_services', data, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
}
