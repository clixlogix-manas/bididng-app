import {takeLatest, call, put} from 'redux-saga/effects';
import axios from 'axios';
import {stylistBasepath, customerBasepath} from '../../constants/Config';
import {
  CHANGE_APPOINTMENT_STATUS,
  GET_STYLIST_APPOINTMENT,
  GET_STYLIST_UPCOMING_APPOINTMENT,
  GET_CUSTOMER_APPOINTMENT,
  GET_APPOINTMENT_SLOT,
  CUSTOMER_APPOINTMENT_REQUEST,
  GET_APPOINTMENT_DETAIL,
  MAKE_INSTALLMENT_PAYMENT,
  GET_AVAILABLE_DAYS,
} from '../../redux/actionConfig';
import AsyncStorage from '@react-native-community/async-storage';
import {
  changeAppointmentStatusSuccess,
  changeAppointmentStatusFailure,
  getStylistAppointmentSuccess,
  getStylistUpcomingAppointmentSuccess,
  getCustomerAppointmentSuccess,
  getAppointmentSlotSuccess,
  customerAppointmentReqSuccess,
  customerAppointmentReqFailure,
  getAppointmentDetailSuccess,
  makeInstallmentPaymentSuccess,
  makeInstallmentPaymentFailure,
  getgetAvailableDaysSuccess,
} from '../../redux/actions/appointmentAction';
export function* changeAppointmentStatusWatcher() {
  yield takeLatest(CHANGE_APPOINTMENT_STATUS, changeAppointmentStatusWorker);
}
function* changeAppointmentStatusWorker(action) {
  try {
    let data = action.data;
    const res = yield call(changeAppointmentStatusFunction, data);
    yield put(changeAppointmentStatusSuccess(res.data));
  } catch (err) {
    yield put(changeAppointmentStatusFailure(err.response.data));
  }
}

async function changeAppointmentStatusFunction(data) {
  let token = await AsyncStorage.getItem('loginToken');
  let userType = await AsyncStorage.getItem('loggedUserType');
  let path = userType === 'Customer' ? customerBasepath : stylistBasepath;
  return axios.post(path + 'change_booking_status', data, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Bearer ' + token,
    },
  });
}

/* ---------------------------------Get Stylist Appointment---------------------------------- */

export function* getStylistAppointmentWatcher() {
  yield takeLatest(GET_STYLIST_APPOINTMENT, getStylistAppointmentWorker);
}
function* getStylistAppointmentWorker(action) {
  try {
    let data = action.data;
    const res = yield call(getStylistAppointmentFunction, data);
    yield put(getStylistAppointmentSuccess(res.data));
  } catch (err) {}
}
async function getStylistAppointmentFunction(data) {
  let token = await AsyncStorage.getItem('loginToken');
  return axios.post(
    stylistBasepath + 'appointments',
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

/* ---------------------------------Get Stylist Upcoming Appointment---------------------------------- */

export function* getStylistUpcomingAppointmentWatcher() {
  yield takeLatest(
    GET_STYLIST_UPCOMING_APPOINTMENT,
    getStylistUpcomingAppointmentWorker,
  );
}

function* getStylistUpcomingAppointmentWorker(action) {
  try {
    let data = action.data;
    const res = yield call(getStylistUpcomingAppointmentFunction, data);
    yield put(getStylistUpcomingAppointmentSuccess(res.data));
  } catch (err) {}
}

async function getStylistUpcomingAppointmentFunction(data) {
  let token = await AsyncStorage.getItem('loginToken');
  return axios.post(
    stylistBasepath + 'upcoming_appointments',
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

/* ---------------------------------Get Customer Appointment---------------------------------- */

export function* getCustomerAppointmentWatcher() {
  yield takeLatest(GET_CUSTOMER_APPOINTMENT, getCustomerAppointmentWorker);
}
function* getCustomerAppointmentWorker(action) {
  try {
    let data = action.data;

    const res = yield call(getCustomerAppointmentFunction, data);
    yield put(getCustomerAppointmentSuccess(res.data));
  } catch (err) {}
}
async function getCustomerAppointmentFunction(data) {
  let token = await AsyncStorage.getItem('loginToken');
  console.log('getCustomerAppointmentFunction data', data);
  return axios.post(customerBasepath + 'appointments', data, {
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
}

/* ---------------------------------Get Appointment Slot---------------------------------- */

export function* getAppointmentSlotWatcher() {
  yield takeLatest(GET_APPOINTMENT_SLOT, getAppointmentSlotWorker);
}
function* getAppointmentSlotWorker(action) {
  try {
    let data = action.data;

    const res = yield call(getAppointmentSlotFunction, data);
    yield put(getAppointmentSlotSuccess(res.data));
  } catch (err) {}
}
async function getAppointmentSlotFunction(data) {
  let token = await AsyncStorage.getItem('loginToken');
  return axios.post(customerBasepath + 'get_available_slots', data, {
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
}

/* ---------------------------------Customer Appointment Req---------------------------------- */

export function* customerAppointmentWatcher() {
  yield takeLatest(CUSTOMER_APPOINTMENT_REQUEST, customerAppointmentWorker);
}
function* customerAppointmentWorker(action) {
  try {
    let data = action.data;
    const res = yield call(customerAppointmentFunction, data);
    yield put(customerAppointmentReqSuccess(res.data));
  } catch (err) {
    yield put(customerAppointmentReqFailure(err.response.data));
  }
}

async function customerAppointmentFunction(data) {
  let token = await AsyncStorage.getItem('loginToken');
  return axios.post(customerBasepath + 'create_booking', data, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Bearer ' + token,
    },
  });
}

/* ---------------------------------Get Appointment Detail---------------------------------- */

export function* getAppointmentDetailWatcher() {
  yield takeLatest(GET_APPOINTMENT_DETAIL, getAppointmentDetailWorker);
}
function* getAppointmentDetailWorker(action) {
  try {
    let data = action.data;
    const res = yield call(getAppointmentDetailFunction, data);
    yield put(getAppointmentDetailSuccess(res.data));
  } catch (err) {}
}
async function getAppointmentDetailFunction(data) {
  let token = await AsyncStorage.getItem('loginToken');
  return axios.get(customerBasepath + 'appointment/' + data, {
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
}

/* ---------------------------------Make Appointment Payment---------------------------------- */

export function* makeInstallmentWatcher() {
  yield takeLatest(MAKE_INSTALLMENT_PAYMENT, makeInstallmentWorker);
}
function* makeInstallmentWorker(action) {
  try {
    let data = action.data;
    const res = yield call(makeInstallmentFunction, data);
    yield put(makeInstallmentPaymentSuccess(res.data));
  } catch (err) {
    yield put(makeInstallmentPaymentFailure(err.response.data));
  }
}

async function makeInstallmentFunction(data) {
  let token = await AsyncStorage.getItem('loginToken');
  return axios.post(stylistBasepath + 'make_payment', data, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Bearer ' + token,
    },
  });
}

/* ---------------------------------Get Available Day---------------------------------- */

export function* getAvailableDaysWatcher() {
  yield takeLatest(GET_AVAILABLE_DAYS, getAvailableDaysWorker);
}
function* getAvailableDaysWorker(action) {
  try {
    let data = action.data;
    const res = yield call(getAvailableDaysFunction, data);
    yield put(getgetAvailableDaysSuccess(res.data));
  } catch (err) {}
}
async function getAvailableDaysFunction(data) {
  let token = await AsyncStorage.getItem('loginToken');
  console.log('$$$$$$$$$$$$$$$data', data);
  return axios.post(customerBasepath + 'available_days', data, {
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
}
