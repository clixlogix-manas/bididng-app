import {takeLatest, call, put} from 'redux-saga/effects';
import axios from 'axios';
import {customerBasepath, stylistBasepath} from '../../constants/Config';
import {
  GET_STYLIST_NOTIFICATION,
  CLEAR_STYLIST_NOTIFICATION,
} from '../../redux/actionConfig';
import AsyncStorage from '@react-native-community/async-storage';
import {
  getStylistNotificationSuccess,
  getStylistNotificationFailure,
  clearStylistNotificationSuccess,
  clearStylistNotificationFailure,
} from '../../redux/actions/notificationAction';

export function* getStylistNotificationWatcher() {
  yield takeLatest(GET_STYLIST_NOTIFICATION, getStylistNotificationWorker);
}
function* getStylistNotificationWorker() {
  try {
    const res = yield call(getStylistNotificationFunction);
    yield put(getStylistNotificationSuccess(res.data));
  } catch (err) {
    if (err.response) {
      yield put(getStylistNotificationFailure(err.response.data));
    }
  }
}

async function getStylistNotificationFunction() {
  let path =
    (await AsyncStorage.getItem('loggedUserType')) === 'Customer'
      ? customerBasepath
      : stylistBasepath;
  let token = await AsyncStorage.getItem('loginToken');
  return axios.get(path + 'get_notifications', {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Bearer ' + token,
    },
  });
}

/* -------------------------------Clear Notification------------------------------ */

export function* clearStylistNotificationWatcher() {
  yield takeLatest(CLEAR_STYLIST_NOTIFICATION, clearStylistNotificationWorker);
}
function* clearStylistNotificationWorker() {
  try {
    const res = yield call(clearStylistNotificationFunction);
    yield put(clearStylistNotificationSuccess(res.data));
  } catch (err) {
    yield put(clearStylistNotificationFailure(err.response.data));
  }
}

async function clearStylistNotificationFunction() {
  let path =
    (await AsyncStorage.getItem('loggedUserType')) === 'Customer'
      ? customerBasepath
      : stylistBasepath;
  let token = await AsyncStorage.getItem('loginToken');
  return axios.get(path + 'clear_notifications', {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Bearer ' + token,
    },
  });
}
