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
} from 'react-native';
import {Images, Fonts, Colors} from '../../constants';
import CommonStyle from '../../constants/Style';
import ProfileCard from '../CustomerModule/StylistScreen/profileCard';
import {connect} from 'react-redux';
import {
  getCustomerStylistService,
  getStylistService,
} from '../../redux/actions/serviceAction';
import Spinner from 'react-native-loading-spinner-overlay';
const {height} = Dimensions.get('window');
import StylistService from '../../components/StylistService';
import {getPortfolioImage} from '../../redux/actions/profileAction';
import {getRecommendation, getReview} from '../../redux/actions/stylistAction';
import Map from '../../components/MapView';
import {onLocationSearch} from '../../constants/utilities/utilities';
import RenderList from '../../components/StylistItem';

class GuestStylistProfileOne extends Component {
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

  renderServices = (item, navigation) => {
    return (
      <StylistService
        item={item}
        navigation={navigation}
        template={1}
        type="guest"
      />
    );
  };
  renderPortolio = ({item}) => {
    return (
      <Image
        // eslint-disable-next-line no-undef
        source={{uri: portfolioImagePath + item.image}}
        key={item.id}
        style={styles.ImageStyle}
      />
    );
  };

  componentDidMount() {
    let formdata = new FormData();
    formdata.append('stylist_id', this.props.route.params.stylist.item.id);
    this.props.getCustomerStylistService(formdata);
    this.props.getReview(formdata);
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
  render() {
    const {
      navigation,
      route,
      getReviewReq,
      getRecommendationReq,
      serviceList,
      getServiceReq,
      reviewList,
      recommendList,
      getPortfolio,
    } = this.props;
    let stylistImage = route.params.item;
    let backImage = Images.CustomerHomeIcon.SalonBg;
    let stylistData = route.params.stylist;

    return (
      <ScrollView
        style={styles.cont}
        showsVerticalScrollIndicator={false}
        scrollEnabled={this.state.outerScrollStatus}>
        <Spinner
          visible={
            getServiceReq ||
            getPortfolio ||
            getReviewReq ||
            getRecommendationReq
          }
          textContent={'Loading...'}
          textStyle={{color: Colors.BackgroundGray}}
        />
        <View>
          <ProfileCard
            type="guest"
            stylistImage={stylistImage}
            navigation={navigation}
            backImage={backImage}
            reviewData={null}
            reviewLength={0}
            stylistData={stylistData.item}
          />
          <View style={styles.ViewCont}>
            <Text style={CommonStyle.dayText}>Services</Text>
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
                  numColumns={2}
                />
              ) : (
                <Text style={styles.textStyle2}>
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
          <Text style={[CommonStyle.dayText, styles.FindmeText]}>
            FIND ME AT
          </Text>
          <View style={styles.MapView}>
            <Map
              address1={stylistData.item.address_1}
              longitude={this.state.longitude}
              latitude={this.state.latitude}
            />
          </View>
          <View style={styles.RenderList_View}>
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
                  style={styles.TextInput_style}
                  placeholder={'250 Characters allowed'}
                  name="recommendation"
                  value={''}
                  multiline
                  textAlignVertical="top"
                  numberOfLines={20}
                />
              </View>

              <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                  navigation.navigate('SignIn', {
                    userType: 'Customer',
                  });
                }}
                style={styles.Submit_Cont}>
                <View style={styles.recommendBtn}>
                  <Text style={[CommonStyle.viewAllFont, styles.Submit_text]}>
                    Submit
                  </Text>
                </View>
              </TouchableOpacity>
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
  loadingStyle: {
    height: 40,
    width: 150,
    backgroundColor: Colors.Red,
    borderRadius: 10,
    margin: 20,
    marginLeft: 0,
  },
  cont: {
    flex: 1,
    height,
  },
  ViewCont: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 20,
  },
  RenderList_View: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 30,
  },
  FindmeText: {
    textAlign: 'center',
    marginTop: 20,
  },
  ImageStyle: {
    height: 100,
    width: 100,
    borderRadius: 10,
    margin: 5,
  },
  MapView: {
    width: '90%',
    alignSelf: 'center',
  },
  contentContainerSty: {
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  textStyle2: {
    fontFamily: Fonts.HeveticaNowText_Black,
    fontSize: 14,
    padding: 20,
    alignSelf: 'center',
  },
  TextInput_style: {
    height: 40,
    width: '100%',
    marginTop: 20,
    alignSelf: 'center',
    color: Colors.SelectColor,
    fontFamily: Fonts.HeveticaNowText_Medium,
    lineHeight: 20,
    fontSize: 14,
  },
  Submit_Cont: {
    height: 40,
    width: 150,
    margin: 20,
    marginLeft: 0,
  },
  Submit_text: {
    color: Colors.White,
    marginTop: 8,
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

  labelStyle: {
    fontSize: 14,
    fontFamily: Fonts.Lato_Medium,
  },
});
const mapStateToProps = (state) => {
  return {
    userInfo: state.SignupReducer.userInfo,
    getServiceReq: state.ServiceReducer.getServiceReq,
    serviceList: state.ServiceReducer.serviceList,
    getPortfolioSuccess: state.ProfileReducer.getPortfolioImageSuccess,
    getPortfolio: state.ProfileReducer.getPortfolioImage,
    recommendList: state.StylistReducer.recommendList,
    reviewList: state.StylistReducer.reviewList,
    portfolioList: state.ProfileReducer.portfolioData,
    getReviewReq: state.StylistReducer.getReviewReq,
    getRecommendationReq: state.StylistReducer.getRecommendationReq,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getStylistService: () => dispatch(getStylistService()),
  getPortfolioImage: () => dispatch(getPortfolioImage()),
  getRecommendation: (data) => dispatch(getRecommendation(data)),
  getReview: (data) => dispatch(getReview(data)),
  getCustomerStylistService: (data) =>
    dispatch(getCustomerStylistService(data)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GuestStylistProfileOne);
