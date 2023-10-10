import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  // Dimensions,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {Images, Fonts, Colors} from '../../constants';
import CommonStyle from '../../constants/Style';
import {portfolioImagePath} from '../../constants/Config';

import {connect} from 'react-redux';
import {
  getCustomerStylistService,
  getStylistService,
} from '../../redux/actions/serviceAction';
import Spinner from 'react-native-loading-spinner-overlay';
// const {height} = Dimensions.get('window');
import StylistService from '../../components/StylistService';
import {getPortfolioImage} from '../../redux/actions/profileAction';
import ProfileCardTwo from '../CustomerModule/StylistScreen/profileCardTwo';
import {getRecommendation, getReview} from '../../redux/actions/stylistAction';
import Map from '../../components/MapView';
import {onLocationSearch} from '../../constants/utilities/utilities';
import RenderList from '../../components/StylistItem';

class GuestStylistProfileTwo extends Component {
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
        template={2}
        type="guest"
      />
    );
  };
  renderPortolio = ({item}) => {
    return (
      <Image
        source={{uri: portfolioImagePath + item.image}}
        key={item.id}
        style={styles.portfolio_img}
      />
    );
  };

  componentDidMount() {
    let formdata = new FormData();
    formdata.append('stylist_id', this.props.route.params.stylist.item.id);
    this.props.getReview(formdata);
    this.props.getRecommendation(formdata);
    this.props.getCustomerStylistService(formdata);

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
      serviceList,
      getServiceReq,
      reviewList,
      recommendList,
      getPortfolio,
      getReviewReq,
      getRecommendationReq,
    } = this.props;
    let stylistImage = route.params.item;
    let backImage = Images.CustomerHomeIcon.SalonBg;
    let stylistData = route.params.stylist;
    return (
      <ScrollView
        style={styles.Cont}
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
          <ProfileCardTwo
            type="guest"
            stylistImage={stylistImage}
            navigation={navigation}
            backImage={backImage}
            reviewData={null}
            reviewLength={0}
            stylistData={stylistData.item}
          />
          <View style={styles.View_Cont}>
            <Text style={[CommonStyle.dayText, styles.marginStyle]}>
              Services
            </Text>
            <View style={[styles.serviceCont, styles.marginStyle]}>
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
                <Text style={styles.text_cont}>
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
          <Text style={[CommonStyle.dayText, styles.findMe_sty]}>
            Find Me At
          </Text>
          <View style={styles.MapView}>
            <Map
              address1={stylistData.item.address_1}
              longitude={this.state.longitude}
              latitude={this.state.latitude}
            />
          </View>
          <View style={styles.RenderListStyle}>
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
                  style={styles.TextInputStyle}
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
    height: 400,
    width: 400,
    marginTop: 30,
    marginBottom: 30,
    alignItems: 'center',
  },
  Cont: {
    flex: 1,
  },
  marginStyle: {
    marginTop: 20,
  },
  View_Cont: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 30,
  },
  contentContainerSty: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  TextInputStyle: {
    height: 40,
    width: '100%',
    marginTop: 20,
    alignSelf: 'center',
    color: Colors.SelectColor,
    fontFamily: Fonts.Lato_Medium,
    lineHeight: 20,
    fontSize: 14,
  },
  MapView: {
    width: '90%',
    alignSelf: 'center',
  },
  findMe_sty: {
    textAlign: 'center',
    marginTop: 20,
  },
  RenderListStyle: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 30,
  },
  text_cont: {
    fontFamily: Fonts.HeveticaNowText_Black,
    fontSize: 14,
    padding: 20,
    alignSelf: 'center',
  },
  Submit_Cont: {
    height: 40,
    width: 150,
    margin: 20,
    marginLeft: 0,
  },
  loadingStyle: {
    height: 40,
    width: 150,
    backgroundColor: Colors.Red,
    borderRadius: 10,
    margin: 20,
    marginLeft: 0,
  },
  portfolio_img: {
    height: 100,
    width: 100,
    borderRadius: 10,
    margin: 5,
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
)(GuestStylistProfileTwo);
