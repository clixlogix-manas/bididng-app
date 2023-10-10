import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  ImageBackground,
} from 'react-native';
import {Images, Colors} from '../../../constants';
import CustomerHomeScreen from './HomeScreen';
import Search from './Search';
import AppointmentScreen from '../../CommonScreens/Appointment/AppointmentScreen';
import {connect} from 'react-redux';
import {fetchCustomerDetails} from '../../../redux/actions/authAction';
import AsyncStorage from '@react-native-community/async-storage';
import {
  getAllStylist,
  getFavouritesStylist,
  getNewsList,
  getPhotoOfTheDay,
} from '../../../redux/actions/homeAction';
import {getCustomerAppointment} from '../../../redux/actions/appointmentAction';
import {getStylistNotification} from '../../../redux/actions/notificationAction';
import NetInfo from '@react-native-community/netinfo';
import Fonts from '../../../constants/Fonts';
import axios from 'axios';
import {stylistBasepath} from '../../../constants/Config';
import {getStylistServiceCatSuccess} from '../../../redux/actions/serviceAction';
import {getPortfolioImage} from '../../../redux/actions/profileAction';
import {
  getPopularStylist,
  getPopularBarber,
} from '../../../redux/actions/homeAction';

const {height, width} = Dimensions.get('window');
class HomeScreenContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedScreen:
        this.props.route.params && this.props.route.params.screen === 'filter'
          ? 'Search'
          : 'Home',
      isConnected: false,
      template: this.props.template,
    };
  }
  onScreenChange = (screen) => {
    this.setState({
      selectedScreen: screen,
    });
  };
  async componentDidMount() {
    console.log('ussserr==>', this.props.userInfo);
    NetInfo.addEventListener(async (state) => {
      if (state.isConnected === false) {
        this.setState({isConnected: false});
      } else {
        this.setState({isConnected: true});

        let token = await AsyncStorage.getItem('loginToken');
        this.props.getPortfolioImage();
        this.props.getStylistNotification();
        this.props.fetchCustomerDetails(token);
        this.props.getFavouritesStylist();
        this.props.getAllStylist();

        let formdataPS = new FormData();
        formdataPS.append('type', 'stylist');
        this.props.getPopularStylist(formdataPS);

        let formdataPB = new FormData();
        formdataPB.append('type', 'barber');
        this.props.getPopularBarber(formdataPB);

        let formdata = new FormData();
        formdata.append('ondate', '');
        this.props.getCustomerAppointment(formdata);
        this.props.getPhotoOfTheDay();
        this.props.getNewsList();
        axios
          .get(stylistBasepath + 'servicecatlist', {
            headers: {
              Authorization: 'Bearer ' + token,
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
          })
          .then((res) => {
            if (res.status === 200) {
              this.props.getStylistServiceCatSuccess(res.data.service_cats);
            }
          });
      }
    });
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.selectedScreen !== this.state.selectedScreen &&
      this.state.selectedScreen === 'Home'
    ) {
      let formdata = new FormData();
      formdata.append('ondate', '');
      this.props.getCustomerAppointment(formdata);
    }
  }
  render() {
    const {
      navigation,
      userInfo,
      stylistList,
      appointmentData,
      favouritesStylistList,
      photoOfTheDay,
      notificationData,
      newsList,
      portfolioData,
      popularStylistList,
      popularBarberList,
    } = this.props;
    const {selectedScreen} = this.state;
    if (this.state.isConnected) {
      return (
        <View style={styles.container}>
          {selectedScreen === 'Home' && (
            <CustomerHomeScreen
              navigation={navigation}
              appointmentData={appointmentData}
              popularStylistList={popularStylistList}
              popularBarberList={popularBarberList}
              notificationData={notificationData}
              portfolioData={portfolioData}
              onPress={this.onScreenChange}
              userInfo={userInfo}
              template={this.props.template}
              newsList={newsList}
              photoOfTheDay={photoOfTheDay}
              favouritesStylistList={favouritesStylistList}
              stylistList={stylistList}
            />
          )}
          {selectedScreen === 'Search' && <Search navigation={navigation} />}
          {selectedScreen === 'Calendar' && (
            <AppointmentScreen
              navigation={navigation}
              userType={'Customer'}
              appointmentData={appointmentData}
            />
          )}
        </View>
      );
    } else {
      return (
        <ImageBackground
          source={Images.CustomerHomeIcon.BgImage}
          imageStyle={styles.imageStyle1}
          style={styles.backgroundStyle}>
          <Text style={styles.textCont}>
            {
              'No Internet Connectivity.\nPlease check your Internet connection \nand try again.'
            }
          </Text>
        </ImageBackground>
      );
    }
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footerCont: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: Colors.White,
    padding: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  imageStyle1: {
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  footerIcon: {
    height: 40,
    width: 40,
  },
  backgroundStyle: {
    height,
    width,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textCont: {
    fontFamily: Fonts.Lato_Black,
    fontSize: 14,
    padding: 20,
  },
});
const mapStateToProps = (state) => {
  return {
    userInfo: state.SignupReducer.userInfo,
    getAllStylistReq: state.HomeReducer.getAllStylist,
    getAllStylistSuccess: state.HomeReducer.getAllStylistSuccess,
    stylistList: state.HomeReducer.stylistList,
    popularStylistList: state.HomeReducer.popularStylistList,
    popularBarberList: state.HomeReducer.popularBarberList,
    fetchCustomer: state.SignupReducer.fetchDetails,
    fetchCustomerSuccess: state.SignupReducer.fetchDetailsSuccess,
    getCustomerAppointmentReq: state.AppointmentReducer.getStylistAppointment,
    getCustomerAppointmentSuccess:
      state.AppointmentReducer.getStylistAppointmentSuccess,
    getFavouritesStylistReq: state.HomeReducer.getFavouritesStylist,
    getFavouritesStylistSuccess: state.HomeReducer.getFavouritesStylistSuccess,
    favouritesStylistList: state.HomeReducer.favouritesStylistList,
    getPhotoOfTheDayReq: state.HomeReducer.getPhotoOfTheDay,
    getPhotoOfTheDaySuccess: state.HomeReducer.getPhotoOfTheDaySuccess,
    photoOfTheDay: state.HomeReducer.photoOfTheDay,
    appointmentData: state.AppointmentReducer.appointmentData,
    notificationData: state.NotificationReducer.notificationData,
    getStylistNotificationReq:
      state.NotificationReducer.getStylistNotificationReq,
    newsList: state.HomeReducer.newsList,
    getNewsListReq: state.HomeReducer.getNewsList,
    template: state.ProfileReducer.template,
    portfolioData: state.ProfileReducer.portfolioData,
    getPortfolio: state.ProfileReducer.getPortfolioImage,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchCustomerDetails: (data) => dispatch(fetchCustomerDetails(data)),
  getAllStylist: () => dispatch(getAllStylist()),
  getFavouritesStylist: () => dispatch(getFavouritesStylist()),
  getCustomerAppointment: (data) => dispatch(getCustomerAppointment(data)),
  getPhotoOfTheDay: () => dispatch(getPhotoOfTheDay()),
  getStylistNotification: () => dispatch(getStylistNotification()),
  getNewsList: () => dispatch(getNewsList()),
  getStylistServiceCatSuccess: (data) =>
    dispatch(getStylistServiceCatSuccess(data)),
  getPortfolioImage: () => dispatch(getPortfolioImage()),
  getPopularStylist: (data) => dispatch(getPopularStylist(data)),
  getPopularBarber: (data) => dispatch(getPopularBarber(data)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeScreenContainer);
