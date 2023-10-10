import {
  ADD_RECOMMENDATION,
  ADD_RECOMMENDATION_SUCCESS,
  ADD_RECOMMENDATION_FAILURE,
  ADD_REVIEW,
  ADD_REVIEW_SUCCESS,
  ADD_REVIEW_FAILURE,
  GET_RECOMMENDATION,
  GET_RECOMMENDATION_SUCCESS,
  GET_RECOMMENDATION_FAILURE,
  GET_REVIEW,
  GET_REVIEW_SUCCESS,
  GET_REVIEW_FAILURE,
  LIKE_STYLIST_PROFILE,
  LIKE_STYLIST_PROFILE_SUCCESS,
  LIKE_STYLIST_PROFILE_FAILURE,
  GET_CUSTOMER_STYLIST_LIKE,
  GET_CUSTOMER_STYLIST_LIKE_SUCCESS,
  GET_CUSTOMER_STYLIST_LIKE_FAILURE,
  DISLIKE_STYLIST_PROFILE,
  DISLIKE_STYLIST_PROFILE_SUCCESS,
  CUSTOMER_LIKE_STYLIST_PHOTO,
  CUSTOMER_LIKE_STYLIST_PHOTO_SUCCESS,
  CUSTOMER_DISLIKE_STYLIST_PHOTO,
  CUSTOMER_DISLIKE_STYLIST_PHOTO_SUCCESS,
  GET_STYLIST_PORTFOLIO,
  GET_STYLIST_PORTFOLIO_SUCCESS,
  CONTACT_STYLIST_SUCCESS,
  CONTACT_STYLIST_FAILURE,
  CONTACT_STYLIST,
  FILTER_STYLIST,
  FILTER_STYLIST_SUCCESS,
  FILTER_STYLIST_FAILURE,
  LIKE_PHOTO_OF_THE_DAY_SUCCESS,
  LIKE_MY_PHOTO,
  LIKE_MY_PHOTO_SUCCESS,
  DISLIKE_PHOTO_OF_THE_DAY,
  DISLIKE_PHOTO_OF_THE_DAY_SUCCESS,
  DISLIKE_MY_PHOTO,
  DISLIKE_MY_PHOTO_SUCCESS,
  LIKE_PHOTO_OF_THE_DAY,
  DELETE_STYLIST_PORT_IMAGE,
  DELETE_STYLIST_PORT_IMAGE_SUCCESS,
  DELETE_STYLIST_PORT_IMAGE_FAILURE,
  GET_TAGGABLE_USER,
  GET_TAGGABLE_USER_SUCCESS,
  GET_TAGGABLE_USER_FAILURE,
  TAG_CUSTOMER,
  TAG_CUSTOMER_SUCCESS,
  TAG_CUSTOMER_FAILURE,
} from '../actionConfig';

export const addRecommendationReq = (data) => {
  return {
    type: ADD_RECOMMENDATION,
    data: data,
  };
};

export const addRecommendationSuccess = (response) => {
  return {
    type: ADD_RECOMMENDATION_SUCCESS,
    data: response,
  };
};

export const addRecommendationFailure = (response) => {
  return {
    type: ADD_RECOMMENDATION_FAILURE,
    data: response,
  };
};

export const addReviewReq = (data) => {
  return {
    type: ADD_REVIEW,
    data: data,
  };
};

export const addReviewSuccess = (response) => {
  return {
    type: ADD_REVIEW_SUCCESS,
    data: response,
  };
};

export const addReviewFailure = (response) => {
  return {
    type: ADD_REVIEW_FAILURE,
    data: response,
  };
};

export const getRecommendation = (data) => {
  return {
    type: GET_RECOMMENDATION,
    data: data,
  };
};

export const getRecommendationSuccess = (response) => {
  return {
    type: GET_RECOMMENDATION_SUCCESS,
    data: response,
  };
};

export const getRecommendationFailure = (response) => {
  return {
    type: GET_RECOMMENDATION_FAILURE,
    data: response,
  };
};

export const getReview = (data) => {
  return {
    type: GET_REVIEW,
    data: data,
  };
};

export const getReviewSuccess = (response) => {
  return {
    type: GET_REVIEW_SUCCESS,
    data: response,
  };
};

export const getReviewFailure = (response) => {
  return {
    type: GET_REVIEW_FAILURE,
    data: response,
  };
};

export const likeStylistProfile = (data) => {
  return {
    type: LIKE_STYLIST_PROFILE,
    data: data,
  };
};

export const likeStylistProfileSuccess = (response) => {
  return {
    type: LIKE_STYLIST_PROFILE_SUCCESS,
    data: response,
  };
};

export const likeStylistProfileFailure = (response) => {
  return {
    type: LIKE_STYLIST_PROFILE_FAILURE,
    data: response,
  };
};

export const dislikeStylistProfile = (data) => {
  return {
    type: DISLIKE_STYLIST_PROFILE,
    data: data,
  };
};

export const dislikeStylistProfileSuccess = (response) => {
  return {
    type: DISLIKE_STYLIST_PROFILE_SUCCESS,
    data: response,
  };
};

export const getCustomerStylistLike = (data) => {
  return {
    type: GET_CUSTOMER_STYLIST_LIKE,
    data: data,
  };
};

export const getCustomerStylistLikeSuccess = (response) => {
  return {
    type: GET_CUSTOMER_STYLIST_LIKE_SUCCESS,
    data: response,
  };
};

export const getCustomerStylistLikeFailure = (response) => {
  return {
    type: GET_CUSTOMER_STYLIST_LIKE_FAILURE,
    data: response,
  };
};

export const customerLikeStylistImage = (data) => {
  return {
    type: CUSTOMER_LIKE_STYLIST_PHOTO,
    data: data,
  };
};

export const customerLikeStylistImageSuccess = (response) => {
  return {
    type: CUSTOMER_LIKE_STYLIST_PHOTO_SUCCESS,
    data: response,
  };
};

export const customerDislikeStylistImage = (data) => {
  return {
    type: CUSTOMER_DISLIKE_STYLIST_PHOTO,
    data: data,
  };
};

export const customerDislikeStylistImageSuccess = (response) => {
  return {
    type: CUSTOMER_DISLIKE_STYLIST_PHOTO_SUCCESS,
    data: response,
  };
};

export const getStylistPortfolio = (data) => {
  return {
    type: GET_STYLIST_PORTFOLIO,
    data: data,
  };
};

export const getStylistPortfolioSuccess = (response) => {
  return {
    type: GET_STYLIST_PORTFOLIO_SUCCESS,
    data: response,
  };
};

export const contactStylist = (data) => {
  return {
    type: CONTACT_STYLIST,
    data: data,
  };
};

export const contactStylistSuccess = (response) => {
  return {
    type: CONTACT_STYLIST_SUCCESS,
    data: response,
  };
};

export const contactStylistFailure = (response) => {
  return {
    type: CONTACT_STYLIST_FAILURE,
    data: response,
  };
};

export const filterStylist = (data) => {
  return {
    type: FILTER_STYLIST,
    data: data,
  };
};

export const filterStylistSuccess = (response) => {
  return {
    type: FILTER_STYLIST_SUCCESS,
    data: response,
  };
};

export const filterStylistFailure = (response) => {
  return {
    type: FILTER_STYLIST_FAILURE,
    data: response,
  };
};

export const likePhotoOfTheDay = (data) => {
  return {
    type: LIKE_PHOTO_OF_THE_DAY,
    data: data,
  };
};

export const likePhotoOfTheDaySuccess = (response) => {
  return {
    type: LIKE_PHOTO_OF_THE_DAY_SUCCESS,
    data: response,
  };
};

export const likeMyPhoto = (data) => {
  return {
    type: LIKE_MY_PHOTO,
    data: data,
  };
};

export const likeMyPhotoSuccess = (response) => {
  return {
    type: LIKE_MY_PHOTO_SUCCESS,
    data: response,
  };
};

export const disLikePhotoOfTheDay = (data) => {
  return {
    type: DISLIKE_PHOTO_OF_THE_DAY,
    data: data,
  };
};

export const disLikePhotoOfTheDaySuccess = (response) => {
  return {
    type: DISLIKE_PHOTO_OF_THE_DAY_SUCCESS,
    data: response,
  };
};

export const disLikeMyPhoto = (data) => {
  return {
    type: DISLIKE_MY_PHOTO,
    data: data,
  };
};

export const disLikeMyPhotoSuccess = (response) => {
  return {
    type: DISLIKE_MY_PHOTO_SUCCESS,
    data: response,
  };
};

export const deleteStylistPortImage = (data) => {
  return {
    type: DELETE_STYLIST_PORT_IMAGE,
    data: data,
  };
};

export const deleteStylistPortImageSuccess = (response) => {
  return {
    type: DELETE_STYLIST_PORT_IMAGE_SUCCESS,
    data: response,
  };
};

export const deleteStylistPortImageFailure = (response) => {
  return {
    type: DELETE_STYLIST_PORT_IMAGE_FAILURE,
    data: response,
  };
};

export const getTaggableUser = (data) => {
  return {
    type: GET_TAGGABLE_USER,
    data: data,
  };
};

export const getTaggableUserSuccess = (response) => {
  return {
    type: GET_TAGGABLE_USER_SUCCESS,
    data: response,
  };
};

export const getTaggableUserFailure = (response) => {
  return {
    type: GET_TAGGABLE_USER_FAILURE,
    data: response,
  };
};

export const tagCustomer = (data) => {
  return {
    type: TAG_CUSTOMER,
    data: data,
  };
};

export const tagCustomerSuccess = (response) => {
  return {
    type: TAG_CUSTOMER_SUCCESS,
    data: response,
  };
};

export const tagCustomerFailure = (response) => {
  return {
    type: TAG_CUSTOMER_FAILURE,
    data: response,
  };
};
