import {all, fork} from 'redux-saga/effects';
import {
  signupWatcher,
  fetchCustomerWatcher,
  customerSignInWatcher,
  otpSentWatcher,
  otpSentWatcherCustomer,
  stylistSignupWatcher,
  styistProfileUploadWatcher,
  addProfessDetailsWatcher,
  addSalonDetailsWatcher,
  addWorkHourWatcher,
  stylistSignInWatcher,
  fetchStylistWatcher,
} from './authSaga';
import {forgotPassWatcher} from './passSaga';
import {
  addRecommendationWatcher,
  addReviewWatcher,
  contactStylistWatcher,
  customerDislikeStylistProfileWatcher,
  customerLikeStylistProfileWatcher,
  deleteStylistPortImageWatcher,
  dislikeMyPhotoWatcher,
  dislikePhotoOfTheDayWatcher,
  dislikeStylistProfileWatcher,
  filterStylistWatcher,
  getCustomerStylistLikeWatcher,
  getRecommendationWatcher,
  getReviewWatcher,
  getStylistportWatcher,
  getTaggableUserWatcher,
  likeMyPhotoWatcher,
  likePhotoOfTheDayWatcher,
  likeStylistProfileWatcher,
  tagCustomerWatcher,
} from './stylistSaga';
import {
  getServiceWatcher,
  addServiceWatcher,
  editServiceWatcher,
  deleteServiceWatcher,
  addDiscountWatcher,
  getCustomerStylistServiceWatcher,
} from './serviceSaga';
import {
  updateAccountWatcher,
  updatePasswordWatcher,
  getPortfolioImageWatcher,
  addPortfolioImageWatcher,
  addSubscriptionWatcher,
  updateProfilePicWatcher,
  getLikedPhotoWatcher,
  getStylistInvoiceWatcher,
  getCustomerInvoiceWatcher,
  changeStylistTemplateWatcher,
} from './profileSaga';
import {
  getNewsListWatcher,
  getNewsDetailWatcher,
  getAllStylistWatcher,
  getFavouritesStylistWatcher,
  getPhotoOfTheDayWatcher,
  getPopularStylistWatcher,
  getPopularBarberWatcher,
} from './homeSaga';
import {
  changeAppointmentStatusWatcher,
  getStylistAppointmentWatcher,
  getStylistUpcomingAppointmentWatcher,
  getCustomerAppointmentWatcher,
  getAppointmentSlotWatcher,
  customerAppointmentWatcher,
  getAppointmentDetailWatcher,
  makeInstallmentWatcher,
  getAvailableDaysWatcher,
} from './appointmentSaga';
import {
  getStylistNotificationWatcher,
  clearStylistNotificationWatcher,
} from './notificationSaga';
import {socialSigninWatcher, socialSignupWatcher} from './socialSaga';
import {
  getAboutUsWatcher,
  getPrivacyPolicyWatcher,
  getTermAndCondWatcher,
} from './StaticSaga';
import {
  addBankAccountWatcher,
  addPaymentCardWatcher,
  createStripeCustWatcher,
  deletePaymentCardWatcher,
  getBankAccountWatcher,
  getPaymentCardWatcher,
  updateBankAccountWatcher,
} from './stripeSaga';
import {
  getFavouritesListWatcher,
  getFavouritesBarberListWatcher,
} from './favouritesSaga';
export default function* rootsaga() {
  yield all([fork(signupWatcher)]);
  yield all([fork(fetchCustomerWatcher)]);
  yield all([fork(customerSignInWatcher)]);
  yield all([fork(forgotPassWatcher)]);
  yield all([fork(addRecommendationWatcher)]);
  yield all([fork(addReviewWatcher)]);
  yield all([fork(otpSentWatcher)]);
  yield all([fork(otpSentWatcherCustomer)]);
  yield all([fork(stylistSignupWatcher)]);
  yield all([fork(styistProfileUploadWatcher)]);
  yield all([fork(addProfessDetailsWatcher)]);
  yield all([fork(addSalonDetailsWatcher)]);
  yield all([fork(addWorkHourWatcher)]);
  yield all([fork(stylistSignInWatcher)]);
  yield all([fork(fetchStylistWatcher)]);
  yield all([fork(getServiceWatcher)]);
  yield all([fork(addServiceWatcher)]);
  yield all([fork(editServiceWatcher)]);
  yield all([fork(updateAccountWatcher)]);
  yield all([fork(updatePasswordWatcher)]);
  yield all([fork(deleteServiceWatcher)]);
  yield all([fork(getPortfolioImageWatcher)]);
  yield all([fork(addPortfolioImageWatcher)]);
  yield all([fork(getNewsListWatcher)]);
  yield all([fork(getNewsDetailWatcher)]);
  yield all([fork(addDiscountWatcher)]);
  yield all([fork(addSubscriptionWatcher)]);
  yield all([fork(getAllStylistWatcher)]);
  yield all([fork(getPopularStylistWatcher)]);
  yield all([fork(getPopularBarberWatcher)]);
  yield all([fork(getFavouritesListWatcher)]);
  yield all([fork(getFavouritesBarberListWatcher)]);
  yield all([fork(getStylistAppointmentWatcher)]);
  yield all([fork(getStylistUpcomingAppointmentWatcher)]);
  yield all([fork(changeAppointmentStatusWatcher)]);
  yield all([fork(getStylistNotificationWatcher)]);
  yield all([fork(clearStylistNotificationWatcher)]);
  yield all([fork(getCustomerAppointmentWatcher)]);
  yield all([fork(getAppointmentSlotWatcher)]);
  yield all([fork(getCustomerStylistServiceWatcher)]);
  yield all([fork(customerAppointmentWatcher)]);
  yield all([fork(getAppointmentDetailWatcher)]);
  yield all([fork(makeInstallmentWatcher)]);
  yield all([fork(getFavouritesStylistWatcher)]);
  yield all([fork(updateProfilePicWatcher)]);
  yield all([fork(getReviewWatcher)]);
  yield all([fork(getRecommendationWatcher)]);
  yield all([fork(getPhotoOfTheDayWatcher)]);
  yield all([fork(likeStylistProfileWatcher)]);
  yield all([fork(getCustomerStylistLikeWatcher)]);
  yield all([fork(dislikeStylistProfileWatcher)]);
  yield all([fork(customerLikeStylistProfileWatcher)]);
  yield all([fork(customerDislikeStylistProfileWatcher)]);
  yield all([fork(getStylistportWatcher)]);
  yield all([fork(getLikedPhotoWatcher)]);
  yield all([fork(socialSignupWatcher)]);
  yield all([fork(socialSigninWatcher)]);
  yield all([fork(contactStylistWatcher)]);
  yield all([fork(filterStylistWatcher)]);
  yield all([fork(likeMyPhotoWatcher)]);
  yield all([fork(dislikeMyPhotoWatcher)]);
  yield all([fork(likePhotoOfTheDayWatcher)]);
  yield all([fork(dislikePhotoOfTheDayWatcher)]);
  yield all([fork(getAboutUsWatcher)]);
  yield all([fork(getPrivacyPolicyWatcher)]);
  yield all([fork(getTermAndCondWatcher)]);
  yield all([fork(getAvailableDaysWatcher)]);
  yield all([fork(deleteStylistPortImageWatcher)]);
  yield all([fork(createStripeCustWatcher)]);
  yield all([fork(addPaymentCardWatcher)]);
  yield all([fork(deletePaymentCardWatcher)]);
  yield all([fork(getPaymentCardWatcher)]);
  yield all([fork(addBankAccountWatcher)]);
  yield all([fork(getTaggableUserWatcher)]);
  yield all([fork(tagCustomerWatcher)]);
  yield all([fork(getBankAccountWatcher)]);
  yield all([fork(updateBankAccountWatcher)]);
  yield all([fork(getStylistInvoiceWatcher)]);
  yield all([fork(getCustomerInvoiceWatcher)]);
  yield all([fork(changeStylistTemplateWatcher)]);
}
