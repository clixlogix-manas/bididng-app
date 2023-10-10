import {
  GET_FAVOURITES_STYLIST_LIST,
  GET_FAVOURITES_STYLIST_LIST_SUCCESS,
  GET_FAVOURITES_BARBER_LIST,
  GET_FAVOURITES_BARBER_LIST_SUCCESS,
} from '../actionConfig';

export const getFavouritiesStylistList = (reqData) => {
  return {
    type: GET_FAVOURITES_STYLIST_LIST,
    data: reqData,
  };
};

export const getFavouritiesStylistListSuccess = (response) => {
  return {
    type: GET_FAVOURITES_STYLIST_LIST_SUCCESS,
    data: response,
  };
};

export const getFavouritiesBarberList = (reqData) => {
  return {
    type: GET_FAVOURITES_BARBER_LIST,
    data: reqData,
  };
};

export const getFavouritiesBarberListSuccess = (response) => {
  return {
    type: GET_FAVOURITES_BARBER_LIST_SUCCESS,
    data: response,
  };
};
