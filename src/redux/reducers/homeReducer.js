import {
  GET_NEWS_LIST,
  GET_NEWS_DETAIL,
  GET_NEWS_DETAIL_SUCCESS,
  GET_NEWS_LIST_SUCCESS,
  GET_ALL_STYLIST,
  GET_POPULAR_STYLIST,
  GET_ALL_STYLIST_SUCCESS,
  GET_POPULAR_STYLIST_SUCCESS,
  GET_FAVOURITES_STYLIST_SUCCESS,
  GET_FAVOURITES_STYLIST,
  GET_PHOTO_OF_THE_DAY,
  GET_PHOTO_OF_THE_DAY_SUCCESS,
  GET_POPULAR_BARBER,
  GET_POPULAR_BARBER_SUCCESS,
  LOGOUT,
} from '../actionConfig';

const initialState = {
  getNewsList: false,
  getNewsListSuccess: false,
  newsList: null,
  getNewsDetail: false,
  getNewsDetailSuccess: false,
  getAllStylist: false,
  getAllStylistSuccess: false,
  popularStylistList: null,
  getPopularStylist: false,
  getPopularStylistSuccess: false,
  popularBarberList: null,
  getPopularBarber: false,
  getPopularBarberSuccess: false,

  getFavouritesStylist: false,
  getFavouritesStylistSuccess: false,
  getPhotoOfTheDay: false,
  getPhotoOfTheDaySuccess: false,
  newsDetail: null,
  stylistList: null,
  favouritesStylistList: null,
  photoOfTheDay: null,
};

export default function HomeReducer(state = initialState, action) {
  switch (action.type) {
    case GET_NEWS_LIST:
      return {
        ...state,
        getNewsList: true,
        getNewsListSuccess: false,
        newsList: null,
      };
    case GET_NEWS_LIST_SUCCESS:
      return {
        ...state,
        getNewsList: false,
        getNewsListSuccess: true,
        newsList: action.data,
      };
    case GET_NEWS_DETAIL:
      return {
        ...state,
        getNewsDetail: true,
        getNewsDetailSuccess: false,
        newsDetail: null,
      };
    case GET_NEWS_DETAIL_SUCCESS:
      return {
        ...state,
        getNewsDetail: false,
        getNewsDetailSuccess: true,
        newsDetail: action.data,
      };
    case GET_ALL_STYLIST:
      return {
        ...state,
        getAllStylist: true,
        getAllStylistSuccess: false,
        stylistList: null,
      };

    case GET_ALL_STYLIST_SUCCESS:
      return {
        ...state,
        getAllStylist: false,
        getAllStylistSuccess: true,
        stylistList: action.data,
      };

    case GET_POPULAR_STYLIST:
      return {
        ...state,
        getPopularStylist: true,
        getPopularStylistSuccess: false,
        popularStylistList: null,
      };

    case GET_POPULAR_STYLIST_SUCCESS:
      return {
        ...state,
        getPopularStylist: false,
        getPopularStylistSuccess: true,
        popularStylistList: action.data,
      };

    case GET_POPULAR_BARBER:
      return {
        ...state,
        getPopularBarber: true,
        getPopularBarberSuccess: false,
        popularBarberList: null,
      };

    case GET_POPULAR_BARBER_SUCCESS:
      return {
        ...state,
        getPopularBarber: true,
        getPopularBarberSuccess: false,
        popularBarberList: action.data,
      };

    case GET_FAVOURITES_STYLIST:
      return {
        ...state,
        getFavouritesStylist: true,
        getFavouritesStylistSuccess: false,
        favouritesStylistList: null,
      };

    case GET_FAVOURITES_STYLIST_SUCCESS:
      return {
        ...state,
        getFavouritesStylist: false,
        getFavouritesStylistSuccess: true,
        favouritesStylistList: action.data,
      };
    case GET_PHOTO_OF_THE_DAY:
      return {
        ...state,
        getPhotoOfTheDay: true,
        getPhotoOfTheDaySuccess: false,
        photoOfTheDay: null,
      };
    case GET_PHOTO_OF_THE_DAY_SUCCESS:
      return {
        ...state,
        getPhotoOfTheDay: false,
        getPhotoOfTheDaySuccess: true,
        photoOfTheDay: action.data.url[0],
      };
    case LOGOUT:
      return {
        ...state,
        getNewsList: false,
        getNewsListSuccess: false,
        newsList: null,
        getNewsDetail: false,
        getNewsDetailSuccess: false,
        getAllStylist: false,
        getAllStylistSuccess: false,
        getFavouritesStylist: false,
        getFavouritesStylistSuccess: false,
        getPhotoOfTheDay: false,
        getPhotoOfTheDaySuccess: false,
        newsDetail: null,
        stylistList: null,
        favouritesStylistList: null,
        photoOfTheDay: null,
      };
    default:
      return {
        ...state,
      };
  }
}
