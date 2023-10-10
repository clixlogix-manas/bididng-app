import {takeLatest, call, put} from 'redux-saga/effects';
import axios from 'axios';
import {customerBasepath} from '../../constants/Config';
import {
  GET_FAVOURITES_STYLIST_LIST,
  GET_FAVOURITES_BARBER_LIST,
} from '../../redux/actionConfig';
import AsyncStorage from '@react-native-community/async-storage';
import {
  getFavouritiesStylistListSuccess,
  getFavouritiesBarberListSuccess,
} from '../../redux/actions/favouritesAction';

/* ---------------------------------Get Favourities Stylist---------------------------------- */

export function* getFavouritesListWatcher() {
  yield takeLatest(GET_FAVOURITES_STYLIST_LIST, getFavouritesListWorker);
}

function* getFavouritesListWorker(action) {
  try {
    let data = action.data;
    const res = yield call(getFavouritesListFunction, data);
    console.log('ress==>', res);
    yield put(getFavouritiesStylistListSuccess(res.data));
  } catch (err) {}
}

async function getFavouritesListFunction(data) {
  let token = await AsyncStorage.getItem('loginToken');

  return axios.post(customerBasepath + 'favourites', data, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
      Accept: 'application/json',
    },
  });
}

/* ---------------------------------Get Favourities Barber---------------------------------- */

export function* getFavouritesBarberListWatcher() {
  yield takeLatest(GET_FAVOURITES_BARBER_LIST, getFavouritesBarberListWorker);
}

function* getFavouritesBarberListWorker(action) {
  try {
    let data = action.data;
    const res = yield call(getFavouritesBarberListFunction, data);
    console.log('ress==>', res);
    yield put(getFavouritiesBarberListSuccess(res.data));
  } catch (err) {}
}

async function getFavouritesBarberListFunction(data) {
  let token = await AsyncStorage.getItem('loginToken');

  return axios.post(customerBasepath + 'favourites', data, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
      Accept: 'application/json',
    },
  });
}
