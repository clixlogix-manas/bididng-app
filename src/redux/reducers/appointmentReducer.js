import {
  CHANGE_APPOINTMENT_STATUS,
  CHANGE_APPOINTMENT_STATUS_SUCCESS,
  CHANGE_APPOINTMENT_STATUS_FAILURE,
  GET_STYLIST_APPOINTMENT,
  GET_STYLIST_APPOINTMENT_SUCCESS,
  GET_STYLIST_UPCOMING_APPOINTMENT,
  GET_STYLIST_UPCOMING_APPOINTMENT_SUCCESS,
  GET_CUSTOMER_APPOINTMENT,
  GET_CUSTOMER_APPOINTMENT_SUCCESS,
  GET_APPOINTMENT_SLOT,
  GET_APPOINTMENT_SLOT_SUCCESS,
  CUSTOMER_APPOINTMENT_REQUEST,
  CUSTOMER_APPOINTMENT_REQUEST_SUCCESS,
  CUSTOMER_APPOINTMENT_REQUEST_FAILURE,
  GET_APPOINTMENT_DETAIL,
  GET_APPOINTMENT_DETAIL_SUCCESS,
  MAKE_INSTALLMENT_PAYMENT,
  MAKE_INSTALLMENT_PAYMENT_SUCCESS,
  MAKE_INSTALLMENT_PAYMENT_FAILURE,
  GET_AVAILABLE_DAYS,
  GET_AVAILABLE_DAYS_SUCCESS,
  LOGOUT,
} from '../actionConfig';

const initialState = {
  changeStatusAppointmentReq: false,
  changeStatusAppointmentSuccess: false,
  changeStatusAppointmentFailure: false,
  changeStatusAppointmentFailureMessage: '',
  customerAppointmentReq: false,
  customerAppointmentSuccess: false,
  customerAppointmentFailure: false,
  customerAppointmentFailureMessage: '',
  makeInstallment: false,
  makeInstallmentSuccess: false,
  makeInstallmentFailure: false,
  makeInstallmentFailureMessage: '',
  getStylistAppointment: false,
  getStylistUpcomingAppointment: false,
  getStylistAppointmentSuccess: false,
  getStylistUpcomingAppointmentSuccess: false,
  getAppointmentSlot: false,
  getAppointmentSlotSuccess: false,
  appointmentData: null,
  upcomingAppointmentData: null,
  appointmentSlot: null,
  getavailableDayst: false,
  getavailableDaysSuccess: false,
  availableDays: null,
  getAppointmentDetail: false,
  getAppointmentDetailSuccess: false,
  appointmentDetail: null,
};

export default function AppointmentReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_APPOINTMENT_STATUS:
      return {
        ...state,
        changeStatusAppointmentReq: true,
        changeStatusAppointmentFailure: false,
        changeStatusAppointmentSuccess: false,
        changeStatusAppointmentFailureMessage: '',
      };
    case CHANGE_APPOINTMENT_STATUS_SUCCESS:
      return {
        ...state,
        changeStatusAppointmentReq: false,
        changeStatusAppointmentSuccess: true,
      };
    case CHANGE_APPOINTMENT_STATUS_FAILURE:
      return {
        ...state,
        changeStatusAppointmentFailure: true,
        changeStatusAppointmentReq: false,
        changeStatusAppointmentFailureMessage: action.data,
      };
    case GET_STYLIST_APPOINTMENT:
      return {
        ...state,
        getStylistAppointment: true,
        getStylistAppointmentSuccess: false,
        appointmentData: null,
      };

    case GET_STYLIST_UPCOMING_APPOINTMENT:
      return {
        ...state,
        getStylistUpcomingAppointment: true,
        getStylistUpcomingAppointmentSuccess: false,
        upcomingAppointmentData: null,
      };
    case GET_STYLIST_APPOINTMENT_SUCCESS:
      return {
        ...state,
        getStylistAppointment: false,
        getStylistAppointmentSuccess: true,
        appointmentData: action.data,
      };
    case GET_STYLIST_UPCOMING_APPOINTMENT_SUCCESS:
      return {
        ...state,
        getStylistUpcomingAppointment: false,
        getStylistUpcomingAppointmentSuccess: true,
        upcomingAppointmentData: action.data,
      };
    case GET_CUSTOMER_APPOINTMENT:
      return {
        ...state,
        getStylistAppointment: true,
        getStylistAppointmentSuccess: false,
        appointmentData: null,
      };
    case GET_CUSTOMER_APPOINTMENT_SUCCESS:
      return {
        ...state,
        getStylistAppointment: false,
        getStylistAppointmentSuccess: true,
        appointmentData: action.data,
      };
    case GET_APPOINTMENT_SLOT:
      return {
        ...state,
        getAppointmentSlot: true,
        getAppointmentSlotSuccess: false,
        appointmentSlot: null,
      };
    case GET_APPOINTMENT_SLOT_SUCCESS:
      return {
        ...state,
        getAppointmentSlot: false,
        getAppointmentSlotSuccess: true,
        appointmentSlot: action.data,
      };
    case CUSTOMER_APPOINTMENT_REQUEST:
      return {
        ...state,
        customerAppointmentReq: true,
        customerAppointmentFailure: false,
        customerAppointmentSuccess: false,
        customerAppointmentFailureMessage: '',
      };
    case CUSTOMER_APPOINTMENT_REQUEST_SUCCESS:
      return {
        ...state,
        customerAppointmentReq: false,
        customerAppointmentSuccess: true,
      };
    case CUSTOMER_APPOINTMENT_REQUEST_FAILURE:
      return {
        ...state,
        customerAppointmentFailure: true,
        customerAppointmentReq: false,
        customerAppointmentFailureMessage: action.data,
      };
    case MAKE_INSTALLMENT_PAYMENT:
      return {
        ...state,
        makeInstallment: true,
        makeInstallmentFailure: false,
        makeInstallmentSuccess: false,
        makeInstallmentFailureMessage: '',
      };
    case MAKE_INSTALLMENT_PAYMENT_SUCCESS:
      return {
        ...state,
        makeInstallment: false,
        makeInstallmentSuccess: true,
      };
    case MAKE_INSTALLMENT_PAYMENT_FAILURE:
      return {
        ...state,
        makeInstallmentFailure: true,
        makeInstallment: false,
        makeInstallmentFailureMessage: action.data,
      };
    case GET_APPOINTMENT_DETAIL:
      return {
        ...state,
        getAppointmentDetail: true,
        getAppointmentDetailSuccess: false,
        appointmentDetail: null,
      };
    case GET_APPOINTMENT_DETAIL_SUCCESS:
      return {
        ...state,
        getAppointmentDetail: false,
        getAppointmentDetailSuccess: true,
        appointmentDetail: action.data,
      };
    case GET_AVAILABLE_DAYS:
      return {
        ...state,
        getAvailableDays: true,
        getAvailableDaysSuccess: false,
        availableDays: null,
      };
    case GET_AVAILABLE_DAYS_SUCCESS:
      return {
        ...state,
        getAvailableDays: false,
        getAvailableDaysSuccess: true,
        availableDays: action.data,
      };
    case LOGOUT:
      return {
        ...state,
        changeStatusAppointmentReq: false,
        changeStatusAppointmentSuccess: false,
        changeStatusAppointmentFailure: false,
        changeStatusAppointmentFailureMessage: '',
        customerAppointmentReq: false,
        customerAppointmentSuccess: false,
        customerAppointmentFailure: false,
        customerAppointmentFailureMessage: '',
        makeInstallment: false,
        makeInstallmentSuccess: false,
        makeInstallmentFailure: false,
        makeInstallmentFailureMessage: '',
        getStylistAppointment: false,
        getStylistAppointmentSuccess: false,
        getAppointmentSlot: false,
        getAppointmentSlotSuccess: false,
        appointmentData: null,
        appointmentSlot: null,
        getavailableDayst: false,
        getavailableDaysSuccess: false,
        availableDays: null,
        getAppointmentDetail: false,
        getAppointmentDetailSuccess: false,
        appointmentDetail: null,
      };
    default:
      return {
        ...state,
      };
  }
}
