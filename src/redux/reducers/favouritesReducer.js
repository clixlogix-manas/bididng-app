import {
  GET_FAVOURITES_STYLIST_LIST_SUCCESS,
  GET_FAVOURITES_STYLIST_LIST,
  GET_FAVOURITES_BARBER_LIST,
  GET_FAVOURITES_BARBER_LIST_SUCCESS,
} from '../actionConfig';

const initialState = {
  getFavouritiesStylistList: false,
  getFavouritiesStylistListSuccess: false,
  favouritesStylistList: null,

  getFavouritiesBarberList: false,
  getFavouritiesBarberListSuccess: false,
  favouriteBarberList: null,
};

export default function FavouritesReducer(state = initialState, action) {
  switch (action.type) {
    case GET_FAVOURITES_STYLIST_LIST:
      return {
        ...state,
        getFavouritiesStylistList: true,
        getFavouritiesStylistListSuccess: false,
        favouritesStylistList: null,
      };
    case GET_FAVOURITES_STYLIST_LIST_SUCCESS:
      return {
        ...state,
        getFavouritiesStylistList: false,
        getFavouritiesStylistListSuccess: true,
        favouritesStylistList: action.data,
      };
    case GET_FAVOURITES_BARBER_LIST:
      return {
        ...state,
        getFavouritiesBarberList: true,
        getFavouritiesBarberListSuccess: false,
        favouriteBarberList: null,
      };
    case GET_FAVOURITES_BARBER_LIST_SUCCESS:
      return {
        ...state,
        getFavouritiesBarberList: false,
        getFavouritiesBarberListSuccess: true,
        favouriteBarberList: action.data,
      };

    default:
      return {
        ...state,
      };
  }
}
