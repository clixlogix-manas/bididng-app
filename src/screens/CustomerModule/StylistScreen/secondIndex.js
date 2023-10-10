/* eslint-disable react/no-did-update-set-state */
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import {Images, Fonts, Colors} from '../../../constants';
import CommonStyle from '../../../constants/Style';
import {portfolioImagePath} from '../../../constants/Config';
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
const {height} = Dimensions.get('window');
import StylistService from '../../../components/StylistService';
import {onLocationSearch} from '../../../constants/utilities/utilities';
import RenderList from '../../../components/StylistItem';
class StylistProfileTwo extends Component {
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
        template={2}
        stylist={this.props.route.params.stylist}
      />
    );
  };
  renderPortolio = ({item}) => {
    if (item.profile_hide === 0) {
      return (
        <Image
          source={{uri: portfolioImagePath + item.image}}
          key={item.id}
          style={styles.ImageStyle}
        />
      );
    }
  };

  componentDidMount() {
    let formdata = new FormData();
    formdata.append(
      'stylist_id',
      this.props.route.params.stylist.item.id
        ? this.props.route.params.stylist.item.id
        : this.props.route.params.stylist.item.user_id
        ? this.props.route.params.stylist.item.user_id
        : this.props.route.params.stylist.item.stylist_id,
    );

    this.props.getCustomerStylistLike(formdata);
    this.props.getCustomerStylistService(formdata);
    this.props.getStylistPortfolio(formdata);
    this.props.getReview(formdata);
    this.props.getFavouritesStylist();
    this.props.getRecommendation(formdata);
    onLocationSearch(this.props.route.params.stylist.item.address_1).then(
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
  onLikeDislikeStylist = () => {
    let formdata = new FormData();
    let id = this.props.route.params.stylist.item.id
      ? this.props.route.params.stylist.item.id
      : this.props.route.params.stylist.item.user_id;
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
      addRecommendation,
      serviceList,
      getServiceReq,
      getRecommendationReq,
      getReviewReq,
      reviewList,
      recommendList,
      likeStylistProfileReq,
      getStylistportReq,
      portfolioList,
    } = this.props;
    let stylistData = route.params.stylist;
    // eslint-disable-next-line no-unused-vars
    let backImage = Images.CustomerHomeIcon.SalonBg;
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
      <ScrollView
        style={styles.ScrollViewText}
        showsVerticalScrollIndicator={false}
        scrollEnabled={this.state.outerScrollStatus}>
        <Spinner
          visible={
            getServiceReq ||
            getReviewReq ||
            getRecommendationReq ||
            getStylistportReq ||
            likeStylistProfileReq
          }
          textContent={'Loading...'}
          textStyle={{color: Colors.BackgroundGray}}
        />
        <View>
          <View style={styles.viewCont}>
            <View style={[CommonStyle.viewAllCont, styles.viewAllCont2]}>
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
                  <Text style={CommonStyle.viewAllFont}>View All</Text>
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
                />
              ) : (
                <Text style={styles.textCont}>
                  No portfolio images for current stylist avaliable !
                </Text>
              )}
            </View>
            <Text style={[CommonStyle.dayText, styles.services_text]}>
              Services
            </Text>
            <View style={[styles.serviceCont]}>
              {serviceList && serviceList.services.length > 0 ? (
                <FlatList
                  data={serviceList.services}
                  scrollEnabled={true}
                  showsVerticalScrollIndicator={false}
                  renderItem={({item, index}) =>
                    this.renderServices(item, navigation)
                  }
                  contentContainerStyle={styles.contentContainerSty}
                  keyExtractor={(item) => item.id.toString()}
                />
              ) : (
                <Text style={styles.textCont2}>
                  No service added by stylist yet !
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
          <Text style={[CommonStyle.dayText, styles.FindMe_text]}>
            FIND ME AT
          </Text>
          <View style={styles.mapView}>
            {/* <Map
              address1={stylistData.item.address_1}
              longitude={this.state.longitude}
              latitude={this.state.latitude}
            /> */}
          </View>
          <View style={styles.RenderList_sty}>
            <RenderList
              path={'ReviewComp'}
              userType={'Customer'}
              type={'recommend'}
              title={'Recommendations'}
              onScrollBegin={() => this.setState({outerScrollStatus: true})}
              onScrollEnd={() => this.setState({outerScrollStatus: false})}
              onpress={true}
              items={
                recommendList &&
                recommendList.data &&
                recommendList.data.length > 0
                  ? recommendList.data
                  : null
              }
              navigateData={
                recommendList &&
                recommendList.data &&
                recommendList.data.length > 0
                  ? recommendList.data
                  : null
              }
              navigation={navigation}
              errMsg={'No recommendation for current stylist avaliable !'}
            />
            <View style={[styles.inputCont]}>
              <Text style={styles.labelStyle}>Leave a Recommendation</Text>
              <View style={styles.inputStyle}>
                <TextInput
                  style={styles.char_Style}
                  placeholder={'250 Characters allowed'}
                  name="recommendation"
                  onChangeText={(value) =>
                    this.setState({recommendation: value})
                  }
                  value={this.state.recommendation}
                  maxLength={200}
                  multiline
                  textAlignVertical="top"
                  numberOfLines={20}
                />
              </View>
              {addRecommendation ? (
                <View style={styles.loadingStyle}>
                  <ActivityIndicator size="large" color="white" />
                </View>
              ) : (
                <TouchableOpacity
                  activeOpacity={1}
                  style={styles.OpacityStyle}
                  onPress={() => {
                    let formData = new FormData();
                    formData.append(
                      'service_provider',
                      stylistData.item.id
                        ? stylistData.item.id
                        : stylistData.item.user_id,
                    );
                    formData.append('description', this.state.recommendation);
                    if (this.state.recommendation.length > 0) {
                      this.props.addRecommendationReq(formData);
                    }
                  }}>
                  <View style={styles.recommendBtn}>
                    <Text style={[CommonStyle.viewAllFont, styles.SubmitText]}>
                      Submit
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
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
  FindMe_text: {
    textAlign: 'center',
    marginTop: 20,
  },
  viewCont: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 30,
  },
  textCont2: {
    fontFamily: Fonts.HeveticaNowText_Black,
    fontSize: 14,
    padding: 20,
    alignSelf: 'center',
  },
  ScrollViewText: {
    flex: 1,
    height,
  },
  ImageStyle: {
    height: 100,
    width: 100,
    borderRadius: 10,
    margin: 5,
  },
  viewAllCont2: {
    paddingTop: 0,
    paddingBottom: 20,
  },
  services_text: {
    marginTop: 20,
  },
  OpacityStyle: {
    height: 40,
    width: 150,
    margin: 20,
    marginLeft: 0,
  },
  RenderList_sty: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 30,
  },
  contentContainerSty: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  char_Style: {
    height: 40,
    width: '100%',
    marginTop: 20,
    alignSelf: 'center',
    color: Colors.SelectColor,
    fontFamily: Fonts.HeveticaNowText_Medium,
    lineHeight: 20,
    fontSize: 14,
  },
  SubmitText: {
    color: Colors.White,
    marginTop: 8,
  },
  mapView: {
    width: '90%',
    alignSelf: 'center',
  },
  loadingStyle: {
    height: 40,
    width: 150,
    backgroundColor: Colors.Red,
    borderRadius: 10,
    margin: 20,
    marginLeft: 0,
  },
  textCont: {
    fontFamily: Fonts.HeveticaNowText_Black,
    fontSize: 14,
    alignSelf: 'center',
    padding: 20,
  },
  recommendBtn: {
    height: 40,
    width: 150,
    backgroundColor: Colors.Red,
    borderRadius: 10,
    marginLeft: 0,
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
  serviceCard: {
    height: 80,
    width: 290,
    backgroundColor: Colors.White,
    alignSelf: 'center',
    borderRadius: 10,
    margin: 5,
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
    marginTop: 20,
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

  labelStyle: {
    fontSize: 14,
    fontFamily: Fonts.Lato_Medium,
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
export default connect(mapStateToProps, mapDispatchToProps)(StylistProfileTwo);
