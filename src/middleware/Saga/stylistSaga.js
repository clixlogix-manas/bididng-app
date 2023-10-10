import {takeLatest, call, put} from 'redux-saga/effects';
import axios from 'axios';
import {
  basepath,
  customerBasepath,
  stylistBasepath,
} from '../../constants/Config';
import {
  ADD_RECOMMENDATION,
  ADD_REVIEW,
  CONTACT_STYLIST,
  CUSTOMER_DISLIKE_STYLIST_PHOTO,
  CUSTOMER_LIKE_STYLIST_PHOTO,
  DELETE_STYLIST_PORT_IMAGE,
  DISLIKE_MY_PHOTO,
  DISLIKE_PHOTO_OF_THE_DAY,
  DISLIKE_STYLIST_PROFILE,
  FILTER_STYLIST,
  GET_CUSTOMER_STYLIST_LIKE,
  GET_RECOMMENDATION,
  GET_REVIEW,
  GET_STYLIST_PORTFOLIO,
  GET_TAGGABLE_USER,
  LIKE_MY_PHOTO,
  LIKE_PHOTO_OF_THE_DAY,
  LIKE_STYLIST_PROFILE,
  TAG_CUSTOMER,
} from '../../redux/actionConfig';
import {
  addRecommendationSuccess,
  addRecommendationFailure,
  addReviewFailure,
  addReviewSuccess,
  getReviewSuccess,
  getReviewFailure,
  getRecommendationSuccess,
  getRecommendationFailure,
  likeStylistProfileSuccess,
  likeStylistProfileFailure,
  getCustomerStylistLikeSuccess,
  dislikeStylistProfileSuccess,
  getStylistPortfolioSuccess,
  customerDislikeStylistImageSuccess,
  customerLikeStylistImageSuccess,
  contactStylistFailure,
  contactStylistSuccess,
  filterStylistSuccess,
  filterStylistFailure,
  likePhotoOfTheDaySuccess,
  disLikePhotoOfTheDaySuccess,
  disLikeMyPhotoSuccess,
  likeMyPhotoSuccess,
  deleteStylistPortImageSuccess,
  deleteStylistPortImageFailure,
  getTaggableUserSuccess,
  getTaggableUserFailure,
  tagCustomerSuccess,
  tagCustomerFailure,
} from '../../redux/actions/stylistAction';
import AsyncStorage from '@react-native-community/async-storage';
export function* addRecommendationWatcher() {
  yield takeLatest(ADD_RECOMMENDATION, addRecommendationWorker);
}
function* addRecommendationWorker(action) {
  try {
    let data = action.data;
    const res = yield call(addRecommendationFunction, data);
    yield put(addRecommendationSuccess(res.data.msg));
  } catch (err) {
    yield put(addRecommendationFailure(err.response.data));
  }
}

async function addRecommendationFunction(data) {
  let token = await AsyncStorage.getItem('loginToken');
  return axios.post(customerBasepath + 'add_recommendation', data, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Bearer ' + token,
    },
  });
}
/* ----------------------------add review----------------------------------------- */
export function* addReviewWatcher() {
  yield takeLatest(ADD_REVIEW, addReviewWorker);
}
function* addReviewWorker(action) {
  try {
    let data = action.data;
    const res = yield call(addReviewFunction, data);
    yield put(addReviewSuccess(res.data));
  } catch (err) {
    yield put(addReviewFailure(err.response.data.message));
  }
}

async function addReviewFunction(data) {
  let token = await AsyncStorage.getItem('loginToken');
  return axios.post(customerBasepath + 'add_review', data, {
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
}

/* ----------------------------get review----------------------------------------- */
export function* getReviewWatcher() {
  yield takeLatest(GET_REVIEW, getReviewWorker);
}
function* getReviewWorker(action) {
  try {
    let data = action.data;
    const res = yield call(getReviewFunction, data);
    yield put(getReviewSuccess(res.data));
  } catch (err) {
    if (err.response) {
      yield put(getReviewFailure(err.response.data.message));
    }
  }
}

async function getReviewFunction(data) {
  console.log('***** getReviewFunction data', data);
  let token = await AsyncStorage.getItem('loginToken');
  return axios.post(basepath + 'get_review', data, {
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
}

/* ----------------------------get recommendation----------------------------------------- */
export function* getRecommendationWatcher() {
  yield takeLatest(GET_RECOMMENDATION, getRecommendationWorker);
}
function* getRecommendationWorker(action) {
  try {
    let data = action.data;
    const res = yield call(getRecommendationFunction, data);
    yield put(getRecommendationSuccess(res.data));
  } catch (err) {
    if (err.response) {
      yield put(getRecommendationFailure(err.response.data.message));
    }
  }
}

async function getRecommendationFunction(data) {
  let token = await AsyncStorage.getItem('loginToken');
  return axios.post(basepath + 'get_recommendations', data, {
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
}

/* ----------------------------Like stylist profile----------------------------------------- */
export function* likeStylistProfileWatcher() {
  yield takeLatest(LIKE_STYLIST_PROFILE, likeStylistProfileWorker);
}
function* likeStylistProfileWorker(action) {
  try {
    let data = action.data;
    const res = yield call(likeStylistProfileFunction, data);
    yield put(likeStylistProfileSuccess(res.data));
  } catch (err) {
    yield put(likeStylistProfileFailure(err.response.data.message));
  }
}

async function likeStylistProfileFunction(data) {
  let token = await AsyncStorage.getItem('loginToken');
  return axios.post(customerBasepath + 'like_profile', data, {
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
}

export function* dislikeStylistProfileWatcher() {
  yield takeLatest(DISLIKE_STYLIST_PROFILE, dislikeStylistProfileWorker);
}
function* dislikeStylistProfileWorker(action) {
  try {
    let data = action.data;
    const res = yield call(dislikeStylistProfileFunction, data);
    yield put(dislikeStylistProfileSuccess(res.data));
  } catch (err) {}
}

async function dislikeStylistProfileFunction(data) {
  let token = await AsyncStorage.getItem('loginToken');
  return axios.post(customerBasepath + 'dislike_profile', data, {
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
}

/* ----------------------------get Stylist Customer Like----------------------------------------- */
export function* getCustomerStylistLikeWatcher() {
  yield takeLatest(GET_CUSTOMER_STYLIST_LIKE, getCustomerStylistLikeWorker);
}
function* getCustomerStylistLikeWorker(action) {
  try {
    let data = action.data;
    const res = yield call(getCustomerStylistLikeFunction, data);
    yield put(getCustomerStylistLikeSuccess(res.data));
  } catch (err) {}
}

async function getCustomerStylistLikeFunction(data) {
  let token = await AsyncStorage.getItem('loginToken');
  return axios.post(customerBasepath + 'is_like_profile', data, {
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
}

/* ---------------------------- Customer Like stylist profile----------------------------------------- */
export function* customerLikeStylistProfileWatcher() {
  yield takeLatest(
    CUSTOMER_LIKE_STYLIST_PHOTO,
    customerLikeStylistProfileWorker,
  );
}
function* customerLikeStylistProfileWorker(action) {
  try {
    let data = action.data;
    const res = yield call(customerLikeStylistProfileFunction, data);
    yield put(customerLikeStylistImageSuccess(res.data));
  } catch (err) {}
}

async function customerLikeStylistProfileFunction(data) {
  let token = await AsyncStorage.getItem('loginToken');
  return axios.post(customerBasepath + 'like_image', data, {
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
}

/* ---------------------------- Customer DisLike stylist profile----------------------------------------- */

export function* customerDislikeStylistProfileWatcher() {
  yield takeLatest(
    CUSTOMER_DISLIKE_STYLIST_PHOTO,
    customerDislikeStylistProfileWorker,
  );
}
function* customerDislikeStylistProfileWorker(action) {
  try {
    let data = action.data;
    const res = yield call(customerDislikeStylistProfileFunction, data);
    yield put(customerDislikeStylistImageSuccess(res.data));
  } catch (err) {}
}

async function customerDislikeStylistProfileFunction(data) {
  let token = await AsyncStorage.getItem('loginToken');
  return axios.post(customerBasepath + 'dislike_image', data, {
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
}

/* ----------------------------get Stylist Portfolio----------------------------------------- */
export function* getStylistportWatcher() {
  yield takeLatest(GET_STYLIST_PORTFOLIO, getStylistportWorker);
}
function* getStylistportWorker(action) {
  try {
    let data = action.data;
    const res = yield call(getStylistportFunction, data);
    yield put(getStylistPortfolioSuccess(res.data));
  } catch (err) {}
}

async function getStylistportFunction(data) {
  let token = await AsyncStorage.getItem('loginToken');
  return axios.post(customerBasepath + 'get_stylist_portfolio_images', data, {
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
}

/* ----------------------------Contact stylist----------------------------------------- */
export function* contactStylistWatcher() {
  yield takeLatest(CONTACT_STYLIST, contactStylistWorker);
}
function* contactStylistWorker(action) {
  try {
    let data = action.data;
    const res = yield call(contactStylistFunction, data);
    yield put(contactStylistSuccess(res.data));
  } catch (err) {
    // eslint-disable-next-line no-undef
    yield put(contactStylistFailure(res.data));
  }
}

async function contactStylistFunction(data) {
  let token = await AsyncStorage.getItem('loginToken');
  return axios.post(customerBasepath + 'contact_stylist', data, {
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
}

/* ----------------------------Filter stylist----------------------------------------- */
export function* filterStylistWatcher() {
  yield takeLatest(FILTER_STYLIST, filterStylistWorker);
}
function* filterStylistWorker(action) {
  try {
    let data = action.data;
    const res = yield call(filterStylistFunction, data);
    yield put(filterStylistSuccess(res.data));
  } catch (err) {
    yield put(filterStylistFailure(err.response.data));
  }
}

async function filterStylistFunction(data) {
  let token = await AsyncStorage.getItem('loginToken');
  return axios.post(customerBasepath + 'stylist_search', data, {
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
}

/* ---------------------------- Customer Like photo of the day----------------------------------------- */
export function* likePhotoOfTheDayWatcher() {
  yield takeLatest(LIKE_PHOTO_OF_THE_DAY, likePhotoOfTheDayWorker);
}
function* likePhotoOfTheDayWorker(action) {
  try {
    let data = action.data;
    const res = yield call(likePhotoOfTheDayFunction, data);
    yield put(likePhotoOfTheDaySuccess(res.data));
  } catch (err) {}
}

async function likePhotoOfTheDayFunction(data) {
  let token = await AsyncStorage.getItem('loginToken');
  return axios.get(customerBasepath + 'like_photo_of_day', {
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
}

/* ---------------------------- Customer DisLike photo of the day----------------------------------------- */

export function* dislikePhotoOfTheDayWatcher() {
  yield takeLatest(DISLIKE_PHOTO_OF_THE_DAY, dislikePhotoOfTheDayWorker);
}
function* dislikePhotoOfTheDayWorker(action) {
  try {
    let data = action.data;
    const res = yield call(dislikePhotoOfTheDayFunction, data);
    yield put(disLikePhotoOfTheDaySuccess(res.data));
  } catch (err) {}
}

async function dislikePhotoOfTheDayFunction() {
  let token = await AsyncStorage.getItem('loginToken');
  return axios.get(customerBasepath + 'dislike_photo_of_day', {
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
}

/* ---------------------------- Customer Like own photo----------------------------------------- */
export function* likeMyPhotoWatcher() {
  yield takeLatest(LIKE_MY_PHOTO, likeMyPhotoWorker);
}
function* likeMyPhotoWorker(action) {
  try {
    let data = action.data;
    const res = yield call(likeMyPhotoFunction, data);
    yield put(likeMyPhotoSuccess(res.data));
  } catch (err) {}
}

async function likeMyPhotoFunction(data) {
  let token = await AsyncStorage.getItem('loginToken');
  return axios.post(customerBasepath + 'like_own_image', data, {
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
}

/* ---------------------------- Customer DisLike own photo----------------------------------------- */

export function* dislikeMyPhotoWatcher() {
  yield takeLatest(DISLIKE_MY_PHOTO, dislikeMyPhotoWorker);
}
function* dislikeMyPhotoWorker(action) {
  try {
    let data = action.data;
    const res = yield call(dislikeMyPhotoFunction, data);
    yield put(disLikeMyPhotoSuccess(res.data));
  } catch (err) {}
}

async function dislikeMyPhotoFunction(data) {
  let token = await AsyncStorage.getItem('loginToken');
  return axios.post(customerBasepath + 'dislike_own_image', data, {
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
}

/* ----------------------------delete stylist portfolio image----------------------------------------- */
export function* deleteStylistPortImageWatcher() {
  yield takeLatest(DELETE_STYLIST_PORT_IMAGE, deleteStylistPortImageWorker);
}
function* deleteStylistPortImageWorker(action) {
  try {
    let data = action.data;
    const res = yield call(deleteStylistPortImageFunction, data);
    yield put(deleteStylistPortImageSuccess(res.data));
  } catch (err) {
    yield put(deleteStylistPortImageFailure(err.response.data.message));
  }
}

async function deleteStylistPortImageFunction(data) {
  let token = await AsyncStorage.getItem('loginToken');
  let userType = await AsyncStorage.getItem('loggedUserType');
  let path = userType === 'Customer' ? customerBasepath : stylistBasepath;
  return axios.post(path + 'delete_portfolio_image', data, {
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
}

/* ----------------------------get taggebale user----------------------------------------- */
export function* getTaggableUserWatcher() {
  yield takeLatest(GET_TAGGABLE_USER, getTaggableUserWorker);
}
function* getTaggableUserWorker(action) {
  try {
    let data = action.data;
    const res = yield call(getTaggableUserFunction, data);
    yield put(getTaggableUserSuccess(res.data.users));
  } catch (err) {
    yield put(getTaggableUserFailure(err.response.data.message));
  }
}

async function getTaggableUserFunction(data) {
  let token = await AsyncStorage.getItem('loginToken');
  return axios.post(customerBasepath + 'get_taggable_user', data, {
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
}

/* ----------------------------tag Customer----------------------------------------- */

export function* tagCustomerWatcher() {
  yield takeLatest(TAG_CUSTOMER, tagCustomerWorker);
}
function* tagCustomerWorker(action) {
  try {
    let data = action.data;
    const res = yield call(tagCustomerFunction, data);
    yield put(tagCustomerSuccess(res.data.users));
  } catch (err) {
    yield put(tagCustomerFailure(err.response.data));
  }
}

async function tagCustomerFunction(data) {
  let token = await AsyncStorage.getItem('loginToken');
  return axios.post(stylistBasepath + 'add_tag', data, {
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
}
