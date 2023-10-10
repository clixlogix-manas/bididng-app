import {
  GET_STYLIST_NOTIFICATION,
  GET_STYLIST_NOTIFICATION_SUCCESS,
  GET_STYLIST_NOTIFICATION_FAILURE,
  CLEAR_STYLIST_NOTIFICATION,
  CLEAR_STYLIST_NOTIFICATION_SUCCESS,
  CLEAR_STYLIST_NOTIFICATION_FAILURE,
  LOGOUT,
} from '../actionConfig';

const initialState = {
  getStylistNotificationReq: false,
  getStylistNotificationSuccess: false,
  getStylistNotificationFailure: false,
  getStylistNotificationFailureMessage: '',
  clearStylistNotificationReq: false,
  clearStylistNotificationSuccess: false,
  clearStylistNotificationFailure: false,
  clearStylistNotificationFailureMessage: '',
  notificationData: null,
};

export default function NotificationReducer(state = initialState, action) {
  switch (action.type) {
    case GET_STYLIST_NOTIFICATION:
      return {
        ...state,
        getStylistNotificationReq: true,
        getStylistNotificationFailure: false,
        getStylistNotificationSuccess: false,
        getStylistNotificationFailureMessage: '',
        notificationData: null,
      };
    case GET_STYLIST_NOTIFICATION_SUCCESS:
      return {
        ...state,
        getStylistNotificationReq: false,
        getStylistNotificationSuccess: true,
        notificationData: action.data,
      };
    case GET_STYLIST_NOTIFICATION_FAILURE:
      return {
        ...state,
        getStylistNotificationFailure: true,
        getStylistNotificationReq: false,
        getStylistNotificationFailureMessage: action.data,
      };
    case CLEAR_STYLIST_NOTIFICATION:
      return {
        ...state,
        clearStylistNotificationReq: true,
        clearStylistNotificationFailure: false,
        clearStylistNotificationSuccess: false,
        clearStylistNotificationFailureMessage: '',
        notificationData: null,
      };
    case CLEAR_STYLIST_NOTIFICATION_SUCCESS:
      return {
        ...state,
        clearStylistNotificationReq: false,
        clearStylistNotificationSuccess: true,
      };
    case CLEAR_STYLIST_NOTIFICATION_FAILURE:
      return {
        ...state,
        clearStylistNotificationFailure: true,
        clearStylistNotificationReq: false,
        clearStylistNotificationFailureMessage: action.data,
      };
    case LOGOUT:
      return {
        ...state,
        getStylistNotificationReq: false,
        getStylistNotificationSuccess: false,
        getStylistNotificationFailure: false,
        getStylistNotificationFailureMessage: '',
        clearStylistNotificationReq: false,
        clearStylistNotificationSuccess: false,
        clearStylistNotificationFailure: false,
        clearStylistNotificationFailureMessage: '',
        notificationData: null,
      };
    default:
      return {
        ...state,
      };
  }
}
