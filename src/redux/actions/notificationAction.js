import {
  GET_STYLIST_NOTIFICATION,
  GET_STYLIST_NOTIFICATION_SUCCESS,
  GET_STYLIST_NOTIFICATION_FAILURE,
  CLEAR_STYLIST_NOTIFICATION,
  CLEAR_STYLIST_NOTIFICATION_SUCCESS,
  CLEAR_STYLIST_NOTIFICATION_FAILURE,
} from '../actionConfig';

export const getStylistNotification = () => {
  return {
    type: GET_STYLIST_NOTIFICATION,
  };
};

export const getStylistNotificationSuccess = (response) => {
  return {
    type: GET_STYLIST_NOTIFICATION_SUCCESS,
    data: response,
  };
};

export const getStylistNotificationFailure = (response) => {
  return {
    type: GET_STYLIST_NOTIFICATION_FAILURE,
    data: response,
  };
};

export const clearStylistNotification = () => {
  return {
    type: CLEAR_STYLIST_NOTIFICATION,
  };
};

export const clearStylistNotificationSuccess = () => {
  return {
    type: CLEAR_STYLIST_NOTIFICATION_SUCCESS,
  };
};

export const clearStylistNotificationFailure = (response) => {
  return {
    type: CLEAR_STYLIST_NOTIFICATION_FAILURE,
    data: response,
  };
};
