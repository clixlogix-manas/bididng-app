import {takeLatest, call, put} from 'redux-saga/effects';
import axios from 'axios';
import {
  stylistBasepath,
  customerBasepath,
  basepath,
} from '../../constants/Config';
import {
  GET_NEWS_LIST,
  GET_NEWS_DETAIL,
  GET_ALL_STYLIST,
  GET_FAVOURITES_STYLIST,
  GET_PHOTO_OF_THE_DAY,
  GET_POPULAR_STYLIST,
  GET_POPULAR_BARBER,
} from '../../redux/actionConfig';
import AsyncStorage from '@react-native-community/async-storage';
import {
  getNewsListSuccess,
  getNewsDetailSuccess,
  getAllStylistSuccess,
  getPopularStylistSuccess,
  getFavouritesStylistSuccess,
  getPopularBarberSuccess,
  getPhotoOfTheDaySuccess,
} from '../../redux/actions/homeAction';

/* ---------------------------------Get News List---------------------------------- */

export function* getNewsListWatcher() {
  yield takeLatest(GET_NEWS_LIST, getNewsListWorker);
}
function* getNewsListWorker(action) {
  try {
    const res = yield call(getNewsListFunction);
    yield put(getNewsListSuccess(res.data));
  } catch (err) {}
}
async function getNewsListFunction() {
  let token = await AsyncStorage.getItem('loginToken');
  return axios.get(stylistBasepath + 'newslist', {
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
}

/* ---------------------------------Get News Details---------------------------------- */

export function* getNewsDetailWatcher() {
  yield takeLatest(GET_NEWS_DETAIL, getNewsDetailWorker);
}
function* getNewsDetailWorker(action) {
  try {
    let id = action.id;
    const res = yield call(getNewsDetailFunction, id);

    yield put(getNewsDetailSuccess(res.data));
  } catch (err) {}
}
async function getNewsDetailFunction(id) {
  let token = await AsyncStorage.getItem('loginToken');
  return axios.get(stylistBasepath + 'newsdetail/' + id, {
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
}

/* ---------------------------------Get All stylist---------------------------------- */

export function* getAllStylistWatcher() {
  yield takeLatest(GET_ALL_STYLIST, getAllStylistWorker);
}

function* getAllStylistWorker() {
  try {
    const res = yield call(getAllStylistFunction);
    console.log('resss===>', res.data);
    yield put(getAllStylistSuccess(res.data));
  } catch (err) {}
}

function getAllStylistFunction() {
  return axios.get(customerBasepath + 'get_stylist', {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
}

/* ---------------------------------Get Popular stylist---------------------------------- */

export function* getPopularStylistWatcher() {
  yield takeLatest(GET_POPULAR_STYLIST, getPopularStylistWorker);
}
function* getPopularStylistWorker(action) {
  try {
    let data = action.data;
    const res = yield call(getPopularStylistFunction, data);
    console.log('ress==>', res);
    yield put(getPopularStylistSuccess(res.data));
  } catch (err) {}
}
function getPopularStylistFunction(data) {
  console.log('ddd==>', data);
  console.log('pp==>', customerBasepath);
  return axios.post(customerBasepath + 'get_popular', data, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
}

/* ---------------------------------Get Popular Barber---------------------------------- */

export function* getPopularBarberWatcher() {
  yield takeLatest(GET_POPULAR_BARBER, getPopularBarberWorker);
}
function* getPopularBarberWorker(action) {
  try {
    let data = action.data;
    const res = yield call(getPopularBarberFunction, data);
    console.log('ress==>', res);
    yield put(getPopularBarberSuccess(res.data));
  } catch (err) {}
}
function getPopularBarberFunction(data) {
  return axios.post(customerBasepath + 'get_popular', data, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
}

/* ---------------------------------Get All stylist---------------------------------- */

export function* getFavouritesStylistWatcher() {
  yield takeLatest(GET_FAVOURITES_STYLIST, getFavouritesStylistWorker);
}
function* getFavouritesStylistWorker() {
  try {
    const res = yield call(getFavouritesStylistFunction);
    yield put(getFavouritesStylistSuccess(res.data));
  } catch (err) {}
}
async function getFavouritesStylistFunction() {
  let token = await AsyncStorage.getItem('loginToken');

  return axios.get(customerBasepath + 'favourites', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
      Accept: 'application/json',
    },
  });
}

/* ---------------------------------Get Photo Of The Day---------------------------------- */

export function* getPhotoOfTheDayWatcher() {
  yield takeLatest(GET_PHOTO_OF_THE_DAY, getPhotoOfTheDayWorker);
}
function* getPhotoOfTheDayWorker() {
  try {
    const res = yield call(getPhotoOfTheDayFunction);
    yield put(getPhotoOfTheDaySuccess(res.data));
  } catch (err) {}
}
async function getPhotoOfTheDayFunction() {
  let token = await AsyncStorage.getItem('loginToken');

  return axios.get(basepath + 'photo_of_the_day', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
      Accept: 'application/json',
    },
  });
}
