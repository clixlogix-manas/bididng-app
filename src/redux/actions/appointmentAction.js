import {
  CHANGE_APPOINTMENT_STATUS,
  CHANGE_APPOINTMENT_STATUS_SUCCESS,
  CHANGE_APPOINTMENT_STATUS_FAILURE,
  GET_STYLIST_APPOINTMENT,
  GET_STYLIST_UPCOMING_APPOINTMENT,
  GET_STYLIST_UPCOMING_APPOINTMENT_SUCCESS,
  GET_STYLIST_APPOINTMENT_SUCCESS,
  GET_CUSTOMER_APPOINTMENT,
  GET_CUSTOMER_APPOINTMENT_SUCCESS,
  GET_APPOINTMENT_SLOT,
  GET_APPOINTMENT_SLOT_SUCCESS,
  CUSTOMER_APPOINTMENT_REQUEST,
  CUSTOMER_APPOINTMENT_REQUEST_SUCCESS,
  CUSTOMER_APPOINTMENT_REQUEST_FAILURE,
  GET_APPOINTMENT_DETAIL_SUCCESS,
  GET_APPOINTMENT_DETAIL,
  MAKE_INSTALLMENT_PAYMENT,
  MAKE_INSTALLMENT_PAYMENT_SUCCESS,
  MAKE_INSTALLMENT_PAYMENT_FAILURE,
  GET_AVAILABLE_DAYS_SUCCESS,
  GET_AVAILABLE_DAYS,
} from '../actionConfig';

export const changeAppointmentStatus = (status) => {
  return {
    type: CHANGE_APPOINTMENT_STATUS,
    data: status,
  };
};

export const changeAppointmentStatusSuccess = (response) => {
  return {
    type: CHANGE_APPOINTMENT_STATUS_SUCCESS,
    data: response,
  };
};

export const changeAppointmentStatusFailure = (response) => {
  return {
    type: CHANGE_APPOINTMENT_STATUS_FAILURE,
    data: response,
  };
};

export const getStylistAppointment = (data) => {
  return {
    type: GET_STYLIST_APPOINTMENT,
    data: data,
  };
};

export const getStylistUpcomingAppointment = (data) => {
  return {
    type: GET_STYLIST_UPCOMING_APPOINTMENT,
    data: data,
  };
};

export const getStylistAppointmentSuccess = (response) => {
  return {
    type: GET_STYLIST_APPOINTMENT_SUCCESS,
    data: response,
  };
};

export const getStylistUpcomingAppointmentSuccess = (response) => {
  return {
    type: GET_STYLIST_UPCOMING_APPOINTMENT_SUCCESS,
    data: response,
  };
};

export const getCustomerAppointment = (data) => {
  return {
    type: GET_CUSTOMER_APPOINTMENT,
    data: data,
  };
};

export const getCustomerAppointmentSuccess = (response) => {
  return {
    type: GET_CUSTOMER_APPOINTMENT_SUCCESS,
    data: response,
  };
};

export const customerAppointmentReq = (data) => {
  return {
    type: CUSTOMER_APPOINTMENT_REQUEST,
    data: data,
  };
};

export const customerAppointmentReqSuccess = (response) => {
  return {
    type: CUSTOMER_APPOINTMENT_REQUEST_SUCCESS,
    data: response,
  };
};

export const customerAppointmentReqFailure = (response) => {
  return {
    type: CUSTOMER_APPOINTMENT_REQUEST_FAILURE,
    data: response,
  };
};

export const getAppointmentSlot = (data) => {
  return {
    type: GET_APPOINTMENT_SLOT,
    data: data,
  };
};

export const getAppointmentSlotSuccess = (response) => {
  return {
    type: GET_APPOINTMENT_SLOT_SUCCESS,
    data: response,
  };
};

export const getAppointmentDetail = (id) => {
  return {
    type: GET_APPOINTMENT_DETAIL,
    data: id,
  };
};

export const getAppointmentDetailSuccess = (response) => {
  return {
    type: GET_APPOINTMENT_DETAIL_SUCCESS,
    data: response,
  };
};

export const makeInstallmentPayment = (data) => {
  return {
    type: MAKE_INSTALLMENT_PAYMENT,
    data: data,
  };
};

export const makeInstallmentPaymentSuccess = (response) => {
  return {
    type: MAKE_INSTALLMENT_PAYMENT_SUCCESS,
    data: response,
  };
};

export const makeInstallmentPaymentFailure = (response) => {
  return {
    type: MAKE_INSTALLMENT_PAYMENT_FAILURE,
    data: response,
  };
};

export const getAvailableDays = (data) => {
  return {
    type: GET_AVAILABLE_DAYS,
    data: data,
  };
};

export const getgetAvailableDaysSuccess = (response) => {
  return {
    type: GET_AVAILABLE_DAYS_SUCCESS,
    data: response,
  };
};
