/* eslint-disable react/no-did-update-set-state */
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {Images, Fonts, Colors} from '../../../constants';
import CommonStyle from '../../../constants/Style';
import {
  customerImagePath,
  imagePath,
  portfolioImagePath,
} from '../../../constants/Config';
import ProfileCard from './profileCard';
import {
  addRecommendationReq,
  dislikeStylistProfile,
  getCustomerStylistLike,
  getRecommendation,
  getReview,
  getStylistPortfolio,
  likeStylistProfile,
} from '../../../redux/actions/stylistAction';
import {connect} from 'react-redux';
import {getCustomerStylistService} from '../../../redux/actions/serviceAction';
import Spinner from 'react-native-loading-spinner-overlay';
import {
  getAllStylist,
  getFavouritesStylist,
} from '../../../redux/actions/homeAction';
import StylistService from '../../../components/StylistService';
import Map from '../../../components/MapView';
import {onLocationSearch} from '../../../constants/utilities/utilities';
import RenderList from '../../../components/StylistItem';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import ProfileCardTwo from './profileCardTwo';

class StylistProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recommendation: '',
      latitude: 37.78825,
      longitude: -122.4324,
      addRecommendErrorMsg: '',
      addRecommendSuccessMsg: '',
      outerScrollStatus: true,
    };
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.addRecommendationFailure !== prevProps.addRecommendationFailure
    ) {
      this.setState({
        addRecommendErrorMsg: this.props.addRecommendationFailureMessage,
      });
    } else if (
      this.props.addRecommendationSuccess !== prevProps.addRecommendationSuccess
    ) {
      this.setState(
        {
          recommendation: '',
          addRecommendSuccessMsg: this.props.addRecommendationSuccessMessage,
        },
        () => {
          let formdata = new FormData();
          formdata.append(
            'stylist_id',
            this.props.route.params.stylist.item.user_id,
          );
          this.props.getRecommendation(formdata);
        },
      );
    } else if (
      this.props.likeStylistProfileSuccess !==
      prevProps.likeStylistProfileSuccess
    ) {
      this.props.getFavouritesStylist();
      this.props.getAllStylist();
      this.props.navigation.goBack();
    } else if (
      this.props.dislikeStylistProfileSuccess !==
      prevProps.dislikeStylistProfileSuccess
    ) {
      this.props.getFavouritesStylist();
      this.props.getAllStylist();
      this.props.navigation.goBack();
    }
  }
  renderServices = (item, navigation) => {
    return (
      <StylistService
        item={item}
        navigation={navigation}
        template={this.props.route.params.stylist.template_type === 1 ? 2 : 1}
        stylist={this.props.route.params.stylist}
        type={this.props.route.params.userType}
      />
    );
  };
  renderPortolio = ({item}) => {
    if (item.profile_hide === 1) {
      return (
        <Image
          source={{uri: portfolioImagePath + item.image}}
          key={item.id}
          style={styles.ImageStyle}
        />
      );
    }
  };

  renderRecommendation = (items) => {
    return (
      <TouchableOpacity activeOpacity={1}>
        <View style={styles.profile_pic_view}>
          <Image
            source={{
              uri: customerImagePath + items.profile_pic,
            }}
            style={styles.ImageStyle2}
          />

          <View style={styles.NameView}>
            <Text style={styles.userText}>{items.name}</Text>

            <Text style={styles.commentText}>{items.content}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  componentDidMount() {
    let formdata = new FormData();
    formdata.append(
      'stylist_id',
      this.props.route.params.stylist.user_id ||
        this.props.route.params.stylist.id,
    );

    this.props.getCustomerStylistLike(formdata);
    this.props.getCustomerStylistService(formdata);
    this.props.getStylistPortfolio(formdata);
    this.props.getReview(formdata);
    this.props.getFavouritesStylist();
    this.props.getRecommendation(formdata);

    onLocationSearch(this.props.route.params.stylist.address_1).then(
      (location) => {
        if (location) {
          this.setState({
            longitude: location.lng,
            latitude: location.lat,
          });
        }
      },
    );
  }

  leaveRecommendation = () => {
    let stylistData = this.props.route.params.stylist;

    let formData = new FormData();
    formData.append(
      'service_provider',
      stylistData.item.id ? stylistData.item.id : stylistData.item.user_id,
    );
    formData.append('description', this.state.recommendation);
    if (this.state.recommendation.length > 0) {
      this.props.addRecommendationReq(formData);
    }
  };

  onLikeDislikeStylist = () => {
    let formdata = new FormData();
    let id = this.props.route.params.stylist.id
      ? this.props.route.params.stylist.id
      : this.props.route.params.stylist.user_id;
    formdata.append('stylist_id', id);
    if (this.props.likeStatus.status === 0) {
      this.props.likeStylistProfile(formdata);
    } else {
      this.props.dislikeStylistProfile(formdata);
    }
  };

  render() {
    const {
      navigation,
      route,
      serviceList,
      getServiceReq,
      getRecommendationReq,
      getReviewReq,
      reviewList,
      recommendList,
      likeStylistProfileReq,
      portfolioList,
    } = this.props;
    let stylistImage = {uri: imagePath + route.params.stylist.profile_pic};
    let stylistData = route.params.stylist;

    let backImage = Images.StylistTemplate.TemplateTwo;
    if (portfolioList && portfolioList.length > 0) {
      portfolioList.filter((image) => {
        let url;
        if (image.is_background === 1) {
          backImage = {uri: portfolioImagePath + image.image};
        }
        return url;
      });
    }

    return (
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <Spinner
          visible={
            getServiceReq ||
            getReviewReq ||
            getRecommendationReq ||
            //     getStylistportReq ||
            likeStylistProfileReq
          }
          textContent={'Loading...'}
          textStyle={{color: Colors.BackgroundGray}}
        />
        <View style={styles.ProfileCard_View}>
          {route.params.stylist.template_type === 1 ? (
            <ProfileCardTwo
              stylistImage={stylistImage}
              navigation={navigation}
              backImage={backImage}
              onLikeDislikeStylist={this.onLikeDislikeStylist}
              reviewData={reviewList && reviewList.data}
              reviewLength={
                reviewList && reviewList.data && reviewList.data.length
              }
              stylistData={stylistData}
              type={this.props.route.params.userType}
            />
          ) : (
            <ProfileCard
              stylistImage={stylistImage}
              navigation={navigation}
              backImage={backImage}
              onLikeDislikeStylist={this.onLikeDislikeStylist}
              reviewData={reviewList && reviewList.data}
              reviewLength={
                reviewList && reviewList.data && reviewList.data.length
              }
              stylistData={stylistData}
              type={this.props.route.params.userType}
            />
          )}
          <View style={styles.SubCont}>
            <Text style={CommonStyle.dayText}>Services</Text>
            <View style={[styles.serviceCont1]}>
              {serviceList && serviceList.services.length > 0 ? (
                <FlatList
                  data={serviceList.services}
                  scrollEnabled={true}
                  marginStart={-5.5}
                  showsVerticalScrollIndicator={false}
                  renderItem={({item, index}) =>
                    this.renderServices(item, navigation)
                  }
                  contentContainerStyle={styles.contentContainerSty}
                  keyExtractor={(item) => item.id.toString()}
                  // numColumns={2}
                  numColumns={route.params.stylist.template_type === 1 ? 1 : 2}
                />
              ) : (
                <Text style={styles.NoServ_text}>
                  No service added by stylist yet !
                </Text>
              )}
            </View>
            <View style={[CommonStyle.viewAllCont, styles.viewAllsty]}>
              <Text style={CommonStyle.dayText}>Portfolio</Text>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() =>
                  navigation.navigate('Portfolio', {
                    userType: 'Customer',
                    type: 'Stylist',
                    renderScreen: 'portfolio',
                  })
                }>
                <View style={CommonStyle.viewAllBtn}>
                  <Text style={(CommonStyle.viewAllFont, {color: '#790A13'})}>
                    View All
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={[styles.serviceCont]}>
              {portfolioList && portfolioList.length > 0 ? (
                <FlatList
                  data={portfolioList}
                  renderItem={this.renderPortolio}
                  keyExtractor={(item) => item.id.toString()}
                  horizontal={true}
                  marginLeft={-2.5}
                />
              ) : (
                <Text style={styles.NoPortfo_text}>
                  No portfolio images for current stylist avaliable !
                </Text>
              )}
            </View>
            <RenderList
              path={'ReviewComp'}
              userType={'Customer'}
              type={'review'}
              onScrollBegin={() => this.setState({outerScrollStatus: true})}
              onScrollEnd={() => this.setState({outerScrollStatus: false})}
              title={'Latest Reviews'}
              onpress={true}
              items={
                reviewList && reviewList.data && reviewList.data.length > 0
                  ? reviewList.data
                  : null
              }
              navigateData={
                reviewList && reviewList.data && reviewList.data.length > 0
                  ? reviewList.data
                  : null
              }
              navigation={navigation}
              errMsg={'No review for current stylist avaliable !'}
            />
          </View>
          <Text style={[CommonStyle.dayText, styles.find_me]}>Find Me At</Text>
          <View>
            <Text style={styles.addressText}>
              {stylistData.address_1 +
                ' ' +
                stylistData.city +
                '  ' +
                stylistData.state +
                ' , '}
              {stylistData.country === 'us' && 'USA'}
            </Text>
          </View>
          <View style={styles.MapView}>
            <Map
              address1={stylistData.address_1}
              longitude={this.state.longitude}
              latitude={this.state.latitude}
            />
          </View>
          <View style={styles.recommendCont}>
            <Text style={[CommonStyle.dayText, styles.recommendText]}>
              Recommendations
            </Text>
            <View style={styles.recommendCont2}>
              {recommendList && recommendList.data.length > 0 ? (
                <FlatList
                  data={recommendList.data}
                  renderItem={({item, index}) =>
                    this.renderRecommendation(item)
                  }
                  keyExtractor={(item) => item.id.toString()}
                  scrollEnabled={true}
                  // eslint-disable-next-line no-undef
                  onScrollEndDrag={() => onScrollEnd}
                  // eslint-disable-next-line no-undef
                  onScrollBeginDrag={() => onScrollBegin}
                  nestedScrollEnabled={true}
                  showsVerticalScrollIndicator={false}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                />
              ) : (
                <Text style={styles.Noreco_text}>
                  {'No recommendation for current stylist avaliable !'}
                </Text>
              )}
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 250,
    width: '100%',
    marginTop: 20,
    alignItems: 'center',
  },
  SubCont: {
    flex: 1,
    alignSelf: 'center',
    marginTop: 20,
    paddingHorizontal: 10,
  },
  ImageStyle2: {
    height: 80,
    width: 80,
    borderRadius: 15,
    margin: 10,
  },
  ProfileCard_View: {
    backgroundColor: '#FFFFFF',
  },
  NameView: {
    alignSelf: 'center',
  },
  find_me: {
    textAlign: 'justify',
    marginLeft: 10,
    marginTop: 20,
  },
  recommendCont2: {
    height: '100%',
    marginBottom: 100,
  },
  MapView: {
    width: '100%',
    alignSelf: 'center',
    marginBottom: -30,
    paddingHorizontal: 10,
  },
  viewAllsty: {
    paddingBottom: 20,
    marginTop: 10,
  },
  contentContainerSty: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  loadingStyle: {
    height: 40,
    width: 150,
    backgroundColor: Colors.Red,
    borderRadius: 10,
    margin: 20,
    marginLeft: 0,
  },
  NoServ_text: {
    fontFamily: Fonts.HeveticaNowText_Black,
    fontSize: 14,
    padding: 20,
    alignSelf: 'center',
  },
  NoPortfo_text: {
    fontFamily: Fonts.HeveticaNowText_Black,
    fontSize: 14,
    alignSelf: 'center',
    padding: 20,
  },
  addressText: {
    width: '100%',
    fontSize: 14,
    marginTop: 10,
    marginStart: 10,
    fontFamily: Fonts.HeveticaNowText_Regular,
    color: '#42403F',
  },
  recommendText: {
    textAlign: 'justify',
    marginLeft: 10,
    marginTop: 20,
  },
  profile_pic_view: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
  },
  Noreco_text: {
    fontFamily: Fonts.HeveticaNowText_Black,
    fontSize: 14,
    alignSelf: 'center',
    paddingTop: 20,
  },
  recommendCont: {
    width: '100%',
    alignSelf: 'center',
    marginTop: 30,
    marginBottom: 10,
  },
  recommendBtn: {
    height: 40,
    width: 150,
    backgroundColor: Colors.Red,
    borderRadius: 10,
    marginLeft: 0,
  },
  ImageStyle: {
    height: Platform.OS === 'android' ? 112 : 120,
    // height: 112,
    width: Platform.OS === 'android' ? 112 : 120,
    borderRadius: 10,
    margin: 2,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  ProfileCard: {
    height: 370,
    width: '75%',
    backgroundColor: Colors.White,
    alignSelf: 'center',
    borderRadius: 20,
    marginTop: -80,
  },
  viewAllCont: {
    width: '40%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    justifyContent: 'space-between',
  },

  serviceCont: {
    width: '100%',
    alignSelf: 'center',
  },
  serviceCont1: {
    width: '100%',
    alignSelf: 'center',
    marginTop: 15,
  },
  inputCont: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    marginTop: 20,
    marginBottom: 20,
  },
  inputStyle: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: Colors.ImageColor,
    width: '100%',
  },
  userText: {
    fontSize: 14,
    fontFamily: Fonts.Lato_Bold,
    color: Colors.Black,
  },
  commentText: {
    fontSize: 12,
    fontFamily: Fonts.HeveticaNowText_Medium,
    color: Colors.LightBlack,
    marginTop: 10,
  },

  labelStyle: {
    fontSize: 14,
    fontFamily: Fonts.HeveticaNowText_Medium,
  },
});
const mapStateToProps = (state) => {
  return {
    addRecommendation: state.StylistReducer.addRecommendationReq,
    addRecommendationSuccess: state.StylistReducer.addRecommendationSuccess,
    addRecommendationFailure: state.StylistReducer.addRecommendationFailure,
    addRecommendationFailureMessage:
      state.StylistReducer.addRecommendationFailureMessage,
    addRecommendationSuccessMessage:
      state.StylistReducer.addRecommendationSuccessMessage,
    getRecommendationReq: state.StylistReducer.getRecommendationReq,
    getRecommendationFailure: state.StylistReducer.getRecommendationFailure,
    getRecommendationSuccess: state.StylistReducer.getRecommendationSuccess,
    getRecommendationFailureMessage:
      state.StylistReducer.getRecommendationFailureMessage,
    getReviewReq: state.StylistReducer.getReviewReq,
    getReviewFailure: state.StylistReducer.getReviewFailure,
    getReviewSuccess: state.StylistReducer.getReviewSuccess,
    getReviewFailureMessage: state.StylistReducer.getReviewFailureMessage,
    userInfo: state.SignupReducer.userInfo,
    getServiceReq: state.ServiceReducer.getServiceReq,
    serviceList: state.ServiceReducer.serviceList,
    recommendList: state.StylistReducer.recommendList,
    reviewList: state.StylistReducer.reviewList,
    likeStatus: state.StylistReducer.likeStatus,
    likeStylistProfileReq: state.StylistReducer.likeStylistProfileReq,
    likeStylistProfileFailure: state.StylistReducer.likeStylistProfileFailure,
    likeStylistProfileSuccess: state.StylistReducer.likeStylistProfileSuccess,
    dislikeStylistProfileSuccess:
      state.StylistReducer.dislikeStylistProfileSuccess,
    likeStylistProfileFailureMessage:
      state.StylistReducer.likeStylistProfileFailureMessage,
    getStylistportReq: state.StylistReducer.getStylistportReq,
    getStylistportFailure: state.StylistReducer.getStylistportFailure,
    getStylistportSuccess: state.StylistReducer.getStylistportSuccess,
    getStylistportFailureMessage: state.StylistReducer.getReviewFailureMessage,
    portfolioList: state.StylistReducer.portfolioList,
  };
};

const mapDispatchToProps = (dispatch) => ({
  addRecommendationReq: (data) => dispatch(addRecommendationReq(data)),
  getCustomerStylistService: (data) =>
    dispatch(getCustomerStylistService(data)),
  getRecommendation: (data) => dispatch(getRecommendation(data)),
  getReview: (data) => dispatch(getReview(data)),
  getCustomerStylistLike: (data) => dispatch(getCustomerStylistLike(data)),
  likeStylistProfile: (data) => dispatch(likeStylistProfile(data)),
  dislikeStylistProfile: (data) => dispatch(dislikeStylistProfile(data)),
  getAllStylist: () => dispatch(getAllStylist()),
  getFavouritesStylist: () => dispatch(getFavouritesStylist()),
  getStylistPortfolio: (data) => dispatch(getStylistPortfolio(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(StylistProfile);
