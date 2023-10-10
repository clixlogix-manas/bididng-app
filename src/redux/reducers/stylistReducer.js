import {
  ADD_RECOMMENDATION,
  ADD_RECOMMENDATION_SUCCESS,
  ADD_RECOMMENDATION_FAILURE,
  ADD_REVIEW,
  ADD_REVIEW_SUCCESS,
  ADD_REVIEW_FAILURE,
  GET_REVIEW,
  GET_REVIEW_SUCCESS,
  GET_REVIEW_FAILURE,
  GET_RECOMMENDATION,
  GET_RECOMMENDATION_SUCCESS,
  GET_RECOMMENDATION_FAILURE,
  LIKE_STYLIST_PROFILE,
  LIKE_STYLIST_PROFILE_SUCCESS,
  LIKE_STYLIST_PROFILE_FAILURE,
  GET_CUSTOMER_STYLIST_LIKE,
  GET_CUSTOMER_STYLIST_LIKE_SUCCESS,
  DISLIKE_STYLIST_PROFILE,
  DISLIKE_STYLIST_PROFILE_SUCCESS,
  CUSTOMER_DISLIKE_STYLIST_PHOTO_FAILURE,
  CUSTOMER_DISLIKE_STYLIST_PHOTO_SUCCESS,
  CUSTOMER_DISLIKE_STYLIST_PHOTO,
  CUSTOMER_LIKE_STYLIST_PHOTO_FAILURE,
  CUSTOMER_LIKE_STYLIST_PHOTO_SUCCESS,
  CUSTOMER_LIKE_STYLIST_PHOTO,
  GET_STYLIST_PORTFOLIO,
  GET_STYLIST_PORTFOLIO_SUCCESS,
  CONTACT_STYLIST,
  CONTACT_STYLIST_SUCCESS,
  CONTACT_STYLIST_FAILURE,
  FILTER_STYLIST,
  FILTER_STYLIST_SUCCESS,
  FILTER_STYLIST_FAILURE,
  LIKE_MY_PHOTO_SUCCESS,
  DISLIKE_MY_PHOTO,
  DISLIKE_MY_PHOTO_SUCCESS,
  LIKE_PHOTO_OF_THE_DAY,
  LIKE_PHOTO_OF_THE_DAY_SUCCESS,
  DISLIKE_PHOTO_OF_THE_DAY,
  DISLIKE_PHOTO_OF_THE_DAY_SUCCESS,
  LIKE_MY_PHOTO,
  DELETE_STYLIST_PORT_IMAGE,
  DELETE_STYLIST_PORT_IMAGE_SUCCESS,
  DELETE_STYLIST_PORT_IMAGE_FAILURE,
  GET_TAGGABLE_USER,
  GET_TAGGABLE_USER_SUCCESS,
  GET_TAGGABLE_USER_FAILURE,
  TAG_CUSTOMER,
  TAG_CUSTOMER_SUCCESS,
  TAG_CUSTOMER_FAILURE,
  LOGOUT,
} from '../actionConfig';

const initialState = {
  addRecommendationReq: false,
  addRecommendationSuccess: false,
  addRecommendationFailure: false,
  addRecommendationFailureMessage: '',
  addRecommendationSuccessMessage: '',
  addReviewReq: false,
  addReviewSuccess: false,
  addReviewFailure: false,
  addReviewFailureMessage: '',
  recommendList: null,
  reviewList: null,
  getRecommendationReq: false,
  getRecommendationFailure: false,
  getRecommendationSuccess: false,
  getRecommendationFailureMessage: '',
  getReviewReq: false,
  getReviewFailure: false,
  getReviewSuccess: false,
  getReviewFailureMessage: '',
  likeStylistProfileReq: false,
  likeStylistProfileFailure: false,
  likeStylistProfileSuccess: false,
  deleteStylistPortImageReq: false,
  deleteStylistPortImageFailure: false,
  deleteStylistPortImageSuccess: false,
  deleteStylistPortImageFailureMessage: '',
  getTaggableUserReq: false,
  getTaggableUserFailure: false,
  getTaggableUserSuccess: false,
  getTaggableUserFailureMessage: '',
  tagCustomerReq: false,
  tagCustomerFailure: false,
  tagCustomerSuccess: false,
  tagCustomerFailureMessage: '',
  showOnProfileReq: false,
  showOnProfileFailure: false,
  showOnProfileSuccess: false,
  showOnProfileFailureMessage: '',
  dislikeStylistProfileReq: false,
  dislikeStylistProfileSuccess: false,
  likeStylistProfileFailureMessage: '',
  getCustomerStylistLike: false,
  getCustomerStylistLikeSuccess: false,
  likeStatus: null,
  customerLikeStylistImageReq: false,
  customerLikeStylistImageFailure: false,
  customerLikeStylistImageSuccess: false,
  customerLikeStylistImageFailureMessage: '',
  customerDislikeStylistImageReq: false,
  customerDislikeStylistImageSuccess: false,
  getStylistportReq: false,
  getStylistportFailure: false,
  getStylistportSuccess: false,
  getStylistportFailureMessage: '',
  contactStylistReq: false,
  contactStylistFailure: false,
  contactStylistSuccess: false,
  contactStylistFailureMessage: '',
  filterStylistReq: false,
  filterStylistFailure: false,
  filterStylistSuccess: false,
  filterStylistFailureMessage: '',
  filterData: null,
  portfolioList: null,
  taggableUserList: [],
};

export default function StylistReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_RECOMMENDATION:
      return {
        ...state,
        addRecommendationReq: true,
        addRecommendationFailure: false,
        addRecommendationSuccess: false,
        addRecommendationFailureMessage: '',
        addRecommendationSuccessMessage: '',
      };
    case ADD_RECOMMENDATION_SUCCESS:
      return {
        ...state,
        addRecommendationReq: false,
        addRecommendationSuccess: true,
        addRecommendationSuccessMessage: action.data,
      };
    case ADD_RECOMMENDATION_FAILURE:
      return {
        ...state,
        addRecommendationFailure: true,
        addRecommendationReq: false,
        addRecommendationFailureMessage: action.data,
      };
    case ADD_REVIEW:
      return {
        ...state,
        addReviewReq: true,
        addReviewFailure: false,
        addReviewSuccess: false,
        addReviewFailureMessage: '',
      };
    case ADD_REVIEW_SUCCESS:
      return {
        ...state,
        addReviewReq: false,
        addReviewSuccess: true,
        reviewList: action.data,
      };
    case ADD_REVIEW_FAILURE:
      return {
        ...state,
        addReviewFailure: true,
        addReviewReq: false,
        addReviewFailureMessage: action.data,
      };
    case GET_RECOMMENDATION:
      return {
        ...state,
        getRecommendationReq: true,
        getRecommendationFailure: false,
        getRecommendationSuccess: false,
        getRecommendationFailureMessage: '',
        recommendList: null,
      };
    case GET_RECOMMENDATION_SUCCESS:
      return {
        ...state,
        getRecommendationReq: false,
        getRecommendationSuccess: true,
        recommendList: action.data,
      };
    case GET_RECOMMENDATION_FAILURE:
      return {
        ...state,
        getRecommendationFailure: true,
        getRecommendationReq: false,
        getRecommendationFailureMessage: action.data,
      };
    case GET_REVIEW:
      return {
        ...state,
        getReviewReq: true,
        getReviewFailure: false,
        getReviewSuccess: false,
        getReviewFailureMessage: '',
        reviewList: null,
      };
    case GET_REVIEW_SUCCESS:
      return {
        ...state,
        getReviewReq: false,
        getReviewSuccess: true,
        reviewList: action.data,
      };
    case GET_REVIEW_FAILURE:
      return {
        ...state,
        getReviewFailure: true,
        getReviewReq: false,
        getReviewFailureMessage: action.data,
      };
    case LIKE_STYLIST_PROFILE:
      return {
        ...state,
        likeStylistProfileReq: true,
        likeStylistProfileFailure: false,
        likeStylistProfileSuccess: false,
        likeStylistProfileFailureMessage: '',
      };
    case LIKE_STYLIST_PROFILE_SUCCESS:
      return {
        ...state,
        likeStylistProfileReq: false,
        likeStylistProfileSuccess: true,
      };
    case LIKE_STYLIST_PROFILE_FAILURE:
      return {
        ...state,
        likeStylistProfileFailure: true,
        likeStylistProfileReq: false,
        likeStylistProfileFailureMessage: action.data,
      };
    case DISLIKE_STYLIST_PROFILE:
      return {
        ...state,
        dislikeStylistProfileReq: true,
        dislikeStylistProfileSuccess: false,
      };
    case DISLIKE_STYLIST_PROFILE_SUCCESS:
      return {
        ...state,
        dislikeStylistProfileReq: false,
        dislikeStylistProfileSuccess: true,
      };
    case CUSTOMER_LIKE_STYLIST_PHOTO:
      return {
        ...state,
        customerLikeStylistImageReq: true,
        customerLikeStylistImageFailure: false,
        customerLikeStylistImageSuccess: false,
        customerLikeStylistImageFailureMessage: '',
      };
    case CUSTOMER_LIKE_STYLIST_PHOTO_SUCCESS:
      return {
        ...state,
        customerLikeStylistImageReq: false,
        customerLikeStylistImageSuccess: true,
      };
    case CUSTOMER_LIKE_STYLIST_PHOTO_FAILURE:
      return {
        ...state,
        customerLikeStylistImageFailure: true,
        customerLikeStylistImageReq: false,
        customerLikeStylistImageFailureMessage: action.data,
      };
    case CUSTOMER_DISLIKE_STYLIST_PHOTO:
      return {
        ...state,
        customerDislikeStylistImageReq: true,
        customerDislikeStylistImageSuccess: false,
      };
    case CUSTOMER_DISLIKE_STYLIST_PHOTO_SUCCESS:
      return {
        ...state,
        customerDislikeStylistImageReq: false,
        customerDislikeStylistImageSuccess: true,
      };
    case CUSTOMER_DISLIKE_STYLIST_PHOTO_FAILURE:
      return {
        ...state,
        getCustomerStylistLike: true,
        getCustomerStylistLikeSuccess: false,
        likeStatus: null,
      };
    case GET_CUSTOMER_STYLIST_LIKE:
      return {
        ...state,
        getCustomerStylistLike: true,
        getCustomerStylistLikeSuccess: false,
        likeStatus: null,
      };
    case GET_CUSTOMER_STYLIST_LIKE_SUCCESS:
      return {
        ...state,
        getCustomerStylistLike: false,
        getCustomerStylistLikeSuccess: true,
        likeStatus: action.data,
      };
    case GET_STYLIST_PORTFOLIO:
      return {
        ...state,
        getStylistportReq: true,
        getStylistportFailure: false,
        getStylistportSuccess: false,
        getStylistportFailureMessage: '',
        portfolioList: null,
      };
    case GET_STYLIST_PORTFOLIO_SUCCESS:
      return {
        ...state,
        getStylistportReq: false,
        getStylistportSuccess: true,
        portfolioList: action.data,
      };
    case CONTACT_STYLIST:
      return {
        ...state,
        contactStylistReq: true,
        contactStylistFailure: false,
        contactStylistSuccess: false,
        contactStylistFailureMessage: '',
      };
    case CONTACT_STYLIST_SUCCESS:
      return {
        ...state,
        contactStylistReq: false,
        contactStylistSuccess: true,
      };
    case CONTACT_STYLIST_FAILURE:
      return {
        ...state,
        contactStylistReq: false,
        contactStylistFailure: true,
        contactStylistFailureMessage: action.data,
      };
    case FILTER_STYLIST:
      return {
        ...state,
        filterStylistReq: true,
        filterStylistFailure: false,
        filterStylistSuccess: false,
        filterStylistFailureMessage: '',
        filterData: null,
      };
    case FILTER_STYLIST_SUCCESS:
      return {
        ...state,
        filterStylistReq: false,
        filterStylistSuccess: true,
        filterData: action.data,
      };
    case FILTER_STYLIST_FAILURE:
      return {
        ...state,
        filterStylistReq: false,
        filterStylistFailure: true,
        filterStylistFailureMessage: action.data,
      };

    case LIKE_MY_PHOTO:
      return {
        ...state,
        customerLikeStylistImageReq: true,
        customerLikeStylistImageFailure: false,
        customerLikeStylistImageSuccess: false,
        customerLikeStylistImageFailureMessage: '',
      };
    case LIKE_MY_PHOTO_SUCCESS:
      return {
        ...state,
        customerLikeStylistImageReq: false,
        customerLikeStylistImageSuccess: true,
      };
    case DISLIKE_MY_PHOTO:
      return {
        ...state,
        customerDislikeStylistImageReq: true,
        customerDislikeStylistImageSuccess: false,
      };
    case DISLIKE_MY_PHOTO_SUCCESS:
      return {
        ...state,
        customerDislikeStylistImageReq: false,
        customerDislikeStylistImageSuccess: true,
      };

    case LIKE_PHOTO_OF_THE_DAY:
      return {
        ...state,
        customerLikeStylistImageReq: true,
        customerLikeStylistImageFailure: false,
        customerLikeStylistImageSuccess: false,
        customerLikeStylistImageFailureMessage: '',
      };
    case LIKE_PHOTO_OF_THE_DAY_SUCCESS:
      return {
        ...state,
        customerLikeStylistImageReq: false,
        customerLikeStylistImageSuccess: true,
      };
    case DISLIKE_PHOTO_OF_THE_DAY:
      return {
        ...state,
        customerDislikeStylistImageReq: true,
        customerDislikeStylistImageSuccess: false,
      };
    case DISLIKE_PHOTO_OF_THE_DAY_SUCCESS:
      return {
        ...state,
        customerDislikeStylistImageReq: false,
        customerDislikeStylistImageSuccess: true,
      };
    case DELETE_STYLIST_PORT_IMAGE:
      return {
        ...state,
        deleteStylistPortImageReq: true,
        deleteStylistPortImageFailure: false,
        deleteStylistPortImageSuccess: false,
        deleteStylistPortImageFailureMessage: '',
      };
    case DELETE_STYLIST_PORT_IMAGE_SUCCESS:
      return {
        ...state,
        deleteStylistPortImageReq: false,
        deleteStylistPortImageSuccess: true,
      };
    case DELETE_STYLIST_PORT_IMAGE_FAILURE:
      return {
        ...state,
        deleteStylistPortImageFailure: true,
        deleteStylistPortImageReq: false,
        deleteStylistPortImageFailureMessage: action.data,
      };
    case GET_TAGGABLE_USER:
      return {
        ...state,
        getTaggableUserReq: true,
        getTaggableUserFailure: false,
        getTaggableUserSuccess: false,
        getTaggableUserFailureMessage: '',
        taggableUserList: null,
      };
    case GET_TAGGABLE_USER_SUCCESS:
      return {
        ...state,
        getTaggableUserReq: false,
        getTaggableUserSuccess: true,
        taggableUserList: action.data,
      };
    case GET_TAGGABLE_USER_FAILURE:
      return {
        ...state,
        getTaggableUserFailure: true,
        getTaggableUserReq: false,
        getTaggableUserFailureMessage: action.data,
      };
    case TAG_CUSTOMER:
      return {
        ...state,
        tagCustomerReq: true,
        tagCustomerFailure: false,
        tagCustomerSuccess: false,
        tagCustomerFailureMessage: '',
      };
    case TAG_CUSTOMER_SUCCESS:
      return {
        ...state,
        tagCustomerReq: false,
        tagCustomerSuccess: true,
      };
    case TAG_CUSTOMER_FAILURE:
      return {
        ...state,
        tagCustomerFailure: true,
        tagCustomerReq: false,
        tagCustomerFailureMessage: action.data,
      };
    case LOGOUT:
      return {
        ...state,
        addRecommendationReq: false,
        addRecommendationSuccess: false,
        addRecommendationFailure: false,
        addRecommendationFailureMessage: '',
        addRecommendationSuccessMessage: '',
        addReviewReq: false,
        addReviewSuccess: false,
        addReviewFailure: false,
        addReviewFailureMessage: '',
        recommendList: null,
        reviewList: null,
        getRecommendationReq: false,
        getRecommendationFailure: false,
        getRecommendationSuccess: false,
        getRecommendationFailureMessage: '',
        getReviewReq: false,
        getReviewFailure: false,
        getReviewSuccess: false,
        getReviewFailureMessage: '',
        likeStylistProfileReq: false,
        likeStylistProfileFailure: false,
        likeStylistProfileSuccess: false,
        deleteStylistPortImageReq: false,
        deleteStylistPortImageFailure: false,
        deleteStylistPortImageSuccess: false,
        deleteStylistPortImageFailureMessage: '',
        getTaggableUserReq: false,
        getTaggableUserFailure: false,
        getTaggableUserSuccess: false,
        getTaggableUserFailureMessage: '',
        tagCustomerReq: false,
        tagCustomerFailure: false,
        tagCustomerSuccess: false,
        tagCustomerFailureMessage: '',
        showOnProfileReq: false,
        showOnProfileFailure: false,
        showOnProfileSuccess: false,
        showOnProfileFailureMessage: '',
        dislikeStylistProfileReq: false,
        dislikeStylistProfileSuccess: false,
        likeStylistProfileFailureMessage: '',
        getCustomerStylistLike: false,
        getCustomerStylistLikeSuccess: false,
        likeStatus: null,
        customerLikeStylistImageReq: false,
        customerLikeStylistImageFailure: false,
        customerLikeStylistImageSuccess: false,
        customerLikeStylistImageFailureMessage: '',
        customerDislikeStylistImageReq: false,
        customerDislikeStylistImageSuccess: false,
        getStylistportReq: false,
        getStylistportFailure: false,
        getStylistportSuccess: false,
        getStylistportFailureMessage: '',
        contactStylistReq: false,
        contactStylistFailure: false,
        contactStylistSuccess: false,
        contactStylistFailureMessage: '',
        filterStylistReq: false,
        filterStylistFailure: false,
        filterStylistSuccess: false,
        filterStylistFailureMessage: '',
        filterData: null,
        portfolioList: null,
        taggableUserList: [],
      };
    default:
      return {
        ...state,
      };
  }
}
