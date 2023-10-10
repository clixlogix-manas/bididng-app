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
} from 'react-native';
import {Images, Fonts, Colors} from '../../../constants';
import CommonStyle from '../../../constants/Style';
import {imagePath, portfolioImagePath} from '../../../constants/Config';
import ProfileCard from '../../CustomerModule/StylistScreen/profileCard';
import {connect} from 'react-redux';
import {getStylistService} from '../../../redux/actions/serviceAction';
import Spinner from 'react-native-loading-spinner-overlay';
const {height} = Dimensions.get('window');
import StylistService from '../../../components/StylistService';
import {getPortfolioImage} from '../../../redux/actions/profileAction';
import {
  getRecommendation,
  getReview,
} from '../../../redux/actions/stylistAction';
import Map from '../../../components/MapView';
import {onLocationSearch} from '../../../constants/utilities/utilities';
import RenderList from '../../../components/StylistItem';

class PreviewOne extends Component {
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
        type="preview"
      />
    );
  };
  renderPortolio = ({item}) => {
    return (
      <Image
        source={{uri: portfolioImagePath + item.image}}
        key={item.id}
        style={styles.ImageStyle}
      />
    );
  };

  componentDidMount() {
    let formdata = new FormData();
    formdata.append('stylist_id', this.props.userInfo.provider.id);
    this.props.getStylistService();
    this.props.getPortfolioImage();
    this.props.getReview(formdata);
    this.props.getRecommendation(formdata);

    onLocationSearch(this.props.userInfo.provider_info.address_1).then(
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
      getReviewReq,
      getRecommendationReq,
      userInfo,
      serviceList,
      getServiceReq,
      reviewList,
      recommendList,
      getPortfolio,
      portfolioList,
    } = this.props;
    let stylistImage = userInfo && {
      uri: imagePath + userInfo.provider.profile_pic,
    };
    let backImage = Images.StylistTemplate.TemplateTwo;
    if (portfolioList && portfolioList.length > 0) {
      portfolioList.filter((image) => {
        if (image.is_background === 1) {
          backImage = {uri: portfolioImagePath + image.image};
        }
      });
    }
    let stylistData = userInfo.provider_info;
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
        <View style={styles.ProfileCard_cont}>
          <ProfileCard
            type="preview"
            stylistImage={stylistImage}
            navigation={navigation}
            backImage={backImage}
            reviewData={(reviewList && reviewList.data) || null}
            reviewLength={
              (reviewList && reviewList.data && reviewList.data.length) || 0
            }
            stylistData={userInfo.provider_info}
          />
          <View style={styles.servicesView}>
            <Text style={CommonStyle.dayText}>Services</Text>
            <View style={[styles.serviceCont2]}>
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
                <Text style={styles.NoServiceText}>
                  No service added by stylist yet !
                </Text>
              )}
            </View>
            <View style={[CommonStyle.viewAllCont, styles.portfolioCont]}>
              <Text style={CommonStyle.dayText}>Portfolio</Text>
              <TouchableOpacity activeOpacity={1}>
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
                />
              ) : (
                <Text style={styles.NoPortfolioText}>
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
              onpress={false}
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
            Find Me At
          </Text>
          <View>
            <Text style={styles.addressText}>
              {stylistData.address_1 + ' ' + stylistData.city + ' , '}
              {stylistData.country === 'us' && 'USA'}
            </Text>
          </View>
          <View style={styles.MapCont}>
            <Map
              address1={userInfo.provider_info.address_1}
              longitude={this.state.longitude}
              latitude={this.state.latitude}
            />
          </View>
          <View style={styles.recommendCont}>
            <RenderList
              path={'ReviewComp'}
              userType={'Customer'}
              type={'recommend'}
              title={'Recommendations'}
              onScrollBegin={() => this.setState({outerScrollStatus: true})}
              onScrollEnd={() => this.setState({outerScrollStatus: false})}
              onpress={false}
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
            {/* <View style={[styles.inputCont]}>
              <Text style={styles.labelStyle}>Leave a Recommendation</Text>
              <View style={styles.inputStyle}>
                <TextInput
                  style={{
                    height: 40,
                    width: '100%',
                    marginTop: 20,
                    alignSelf: 'center',
                    color: Colors.SelectColor,
                    fontFamily: Fonts.Lato_Medium,
                    lineHeight: 20,
                    fontSize: 14,
                  }}
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
                style={{height: 40, width: 150, margin: 20, marginLeft: 0,alignSelf:'center'}}>
                <View style={styles.recommendBtn}>
                  <Text
                    style={[
                      CommonStyle.viewAllFont,
                      {color: Colors.White, marginTop: 8},
                    ]}>
                    Submit
                  </Text>
                </View>
              </TouchableOpacity>
            </View> */}
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
  ImageStyle: {
    height: 100,
    width: 100,
    borderRadius: 10,
    margin: 5,
  },
  cont: {
    flex: 1,
    height,
  },
  MapCont: {
    width: 343,
    alignSelf: 'center',
  },
  portfolioCont: {
    paddingBottom: 20,
    marginTop: 10,
  },
  contentContainerSty: {
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  FindmeText: {
    textAlign: 'left',
    marginTop: 20,
    marginLeft: 10,
  },
  ProfileCard_cont: {
    backgroundColor: '#ffffff',
  },
  NoServiceText: {
    fontFamily: Fonts.HeveticaNowText_Black,
    fontSize: 14,
    padding: 20,
    alignSelf: 'center',
  },
  servicesView: {
    width: 343,
    alignSelf: 'center',
    marginTop: 20,
  },
  NoPortfolioText: {
    fontFamily: Fonts.HeveticaNowText_Black,
    fontSize: 14,
    alignSelf: 'center',
    padding: 20,
  },
  recommendCont: {
    width: 343,
    alignSelf: 'center',
    marginTop: -10,
    marginBottom: 10,
  },
  recommendBtn: {
    height: 40,
    width: 150,
    backgroundColor: Colors.ButtonColor,
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
  addressText: {
    width: 343,
    fontSize: 14,
    marginTop: 10,
    marginStart: 10,
    fontFamily: Fonts.HeveticaNowText_Regular,
    color: '#42403F',
  },
  serviceCont: {
    width: '100%',
    alignSelf: 'center',
  },
  serviceCont2: {
    marginTop: 15,
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
});
export default connect(mapStateToProps, mapDispatchToProps)(PreviewOne);
