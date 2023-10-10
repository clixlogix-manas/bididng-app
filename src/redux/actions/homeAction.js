import {
  GET_NEWS_LIST,
  GET_NEWS_LIST_SUCCESS,
  GET_NEWS_DETAIL,
  GET_NEWS_DETAIL_SUCCESS,
  GET_ALL_STYLIST,
  GET_ALL_STYLIST_SUCCESS,
  GET_POPULAR_STYLIST,
  GET_POPULAR_STYLIST_SUCCESS,
  GET_FAVOURITES_STYLIST,
  GET_FAVOURITES_STYLIST_SUCCESS,
  GET_PHOTO_OF_THE_DAY,
  GET_PHOTO_OF_THE_DAY_SUCCESS,
  GET_POPULAR_BARBER,
  GET_POPULAR_BARBER_SUCCESS,
} from '../actionConfig';

export const getNewsList = () => {
  return {
    type: GET_NEWS_LIST,
  };
};

export const getNewsListSuccess = (response) => {
  return {
    type: GET_NEWS_LIST_SUCCESS,
    data: response,
  };
};

export const getNewsDetail = () => {
  return {
    type: GET_NEWS_DETAIL,
  };
};

export const getNewsDetailSuccess = (response) => {
  return {
    type: GET_NEWS_DETAIL_SUCCESS,
    data: response,
  };
};

export const getAllStylist = () => {
  return {
    type: GET_ALL_STYLIST,
  };
};

export const getAllStylistSuccess = (response) => {
  return {
    type: GET_ALL_STYLIST_SUCCESS,
    data: response,
  };
};

export const getPopularStylist = (reqData) => {
  return {
    type: GET_POPULAR_STYLIST,
    data: reqData,
  };
};

export const getPopularStylistSuccess = (response) => {
  return {
    type: GET_POPULAR_STYLIST_SUCCESS,
    data: response,
  };
};

export const getPopularBarber = (reqData) => {
  return {
    type: GET_POPULAR_BARBER,
    data: reqData,
  };
};

export const getPopularBarberSuccess = (response) => {
  return {
    type: GET_POPULAR_BARBER_SUCCESS,
    data: response,
  };
};

export const getBarberStylist = (reqData) => {
  return {
    type: GET_POPULAR_STYLIST,
    data: reqData,
  };
};

export const getBarberStylistSuccess = (response) => {
  return {
    type: GET_POPULAR_STYLIST_SUCCESS,
    data: response,
  };
};

export const getFavouritesStylist = () => {
  return {
    type: GET_FAVOURITES_STYLIST,
  };
};

export const getFavouritesStylistSuccess = (response) => {
  return {
    type: GET_FAVOURITES_STYLIST_SUCCESS,
    data: response,
  };
};

export const getPhotoOfTheDay = () => {
  return {
    type: GET_PHOTO_OF_THE_DAY,
  };
};

export const getPhotoOfTheDaySuccess = (response) => {
  return {
    type: GET_PHOTO_OF_THE_DAY_SUCCESS,
    data: response,
  };
};
