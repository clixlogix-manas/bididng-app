/* eslint-disable react/no-did-update-set-state */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
  FlatList,
  ImageBackground,
  TouchableOpacity,
  Alert,
  StatusBar,
} from 'react-native';
import {Images, Fonts, Colors} from '../../constants';
import Appointment from '../../components/Appointment';
import CommonStyle from '../../constants/Style';
import {connect} from 'react-redux';
import {fetchStylistDetails} from '../../redux/actions/authAction';
import AsyncStorage from '@react-native-community/async-storage';
import {newsPath, imagePath, customerImagePath} from '../../constants/Config';
import Spinner from 'react-native-loading-spinner-overlay';
import {getNewsList} from '../../redux/actions/homeAction';
import {
  getStylistAppointment,
  getStylistUpcomingAppointment,
} from '../../redux/actions/appointmentAction';
import {getStylistNotification} from '../../redux/actions/notificationAction';
import NetInfo from '@react-native-community/netinfo';
import {getPortfolioImage} from '../../redux/actions/profileAction';
import {sortByDate} from '../../constants/utilities/utilities';
import SafeAreaView from 'react-native-safe-area-view';
import RenderList from '../../components/FlatListItem';
import moment from 'moment';

const {height, width} = Dimensions.get('window');

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: 60,
      loader: true,
      appointmentData: null,
      appointmentsBooking: [],
      upcomingAppointmentsBooking: [],
      isConnected: false,
      selectedAppointment: 1,
    };
  }
  renderAppointItem = (itemData, preIndex) => {
    let {item, index} = itemData;
    console.log('====');
    console.log(item);
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          this.props.navigation.navigate('AppointmentByType', {
            type: 'Upcoming',
            item: item,
            userType: 'Barber',
          });
        }}>
        <Appointment
          user={item.customer_data[0].name}
          //  length={this.props.appointmentData.bookings.length}
          amount={item.service_charge}
          day={item.date_time.split(' ')[0]}
          time={item.date_time.split(' ')[1]}
          profession={item.service_name}
          id={index}
          service_duration={item.service_duration}
          profile_pic={customerImagePath + item.customer_data[0].profile_pic}
        />
      </TouchableOpacity>
    );
  };

  async componentDidMount() {
    NetInfo.addEventListener(async (state) => {
      if (state.isConnected === false) {
        this.setState({isConnected: false});
      } else {
        this.setState({isConnected: true});
        let token = await AsyncStorage.getItem('loginToken');
        this.props.fetchStylistDetails(token);
        this.props.getStylistNotification();
        let formdata = new FormData();
        formdata.append('ondate', '');
        this.props.getStylistAppointment(formdata);
        this.props.getStylistUpcomingAppointment(formdata);
        this.props.getNewsList();
        this.props.getPortfolioImage();
      }
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.userInfo !== prevProps.userInfo &&
      this.props.userInfo !== null
    ) {
      if (this.props.userInfo.provider.is_stripe_active === 0) {
        // Alert.alert(
        //   'Hair Biddy',
        //   'Need to Activate bank account for transactions Please add/update the bank details',
        //   [
        //     {
        //       text: 'update',
        //       onPress: () => {
        //         this.props.navigation.navigate('PaymentInfo');
        //       },
        //     },
        //     {text: 'Remind me later', onPress: () => {}},
        //   ],
        //   {cancelable: true},
        // );
      }

      this.setState({
        loader: false,
      });
    } else if (
      this.props.appointmentData !== prevProps.appointmentData &&
      this.props.appointmentData !== null
      //this.props.upcomingAppointmentData !== null
    ) {
      this.setState({
        appointmentData: this.props.appointmentData,
        appointmentsBooking: this.props.appointmentData.bookings,
        // upcomingAppointmentsBooking: this.props.upcomingAppointmentData.bookings
      });
    }
  }

  appointmentSelection(id) {
    this.setState({selectedAppointment: id});
  }

  render() {
    const {
      navigation,
      userInfo,
      getStylistAppointmentReq,
      getNewsListReq,
      getStylistNotificationReq,
      // notificationData,
      appointmentData,
      getPortfolio,
      // portfolioData,
    } = this.props;

    let filterAppointment =
      this.props.appointmentData &&
      this.props.appointmentData.bookings &&
      this.props.appointmentData.bookings.filter((item) => {
        if (
          item.status === 5 &&
          item.type === 'online' &&
          new Date(item.date_time).getTime() >= new Date().getTime()
        ) {
          return item;
        } else if (
          item.status === 2 &&
          item.type === 'cash' &&
          new Date(item.date_time).getTime() >= new Date().getTime()
        ) {
          return item;
        }
      });

    console.log(appointmentData);
    if (filterAppointment && filterAppointment.length > 0) {
      filterAppointment.sort(sortByDate);
    }
    let DateArr = [];
    appointmentData &&
      appointmentData.bookings &&
      appointmentData.bookings.length > 0 &&
      appointmentData.bookings.map((appointment) => {
        return DateArr.push(appointment.date_time.split(' ')[0]);
      });
    if (this.state.isConnected) {
      return (
        <SafeAreaView style={{flex: 1}}>
          <StatusBar backgroundColor="gray" barStyle="dark-content" />
          <ScrollView
            style={{flex: 1, backgroundColor: Colors.BgColor}}
            showsVerticalScrollIndicator={false}>
            <Spinner
              visible={
                this.state.loader ||
                getPortfolio ||
                getNewsListReq ||
                getStylistAppointmentReq ||
                getStylistNotificationReq
              }
              textContent={'Loading...'}
              textStyle={{color: Colors.BackgroundGray}}
            />
            <View>
              <View style={CommonStyle.commonProfileCard}>
                <View style={{padding: 15}}>
                  <View style={CommonStyle.viewAllCont}>
                    <View style={styles.nameCont}>
                      <Text style={CommonStyle.commonUserCont}>
                        {userInfo && userInfo.provider
                          ? userInfo.provider.name
                          : ''}{' '}
                      </Text>
                      <Text
                        style={[CommonStyle.userCont, styles.profession_text]}>
                        {userInfo && userInfo.provider_info
                          ? '(' + userInfo.provider_info.profession + ')'
                          : ''}{' '}
                      </Text>
                    </View>

                    <View style={styles.ImageCont}>
                      <Image
                        source={
                          userInfo &&
                          userInfo.provider &&
                          userInfo.provider.profile_pic
                            ? {uri: imagePath + userInfo.provider.profile_pic}
                            : Images.CustomerHomeIcon.Default
                        }
                        style={styles.styleCont}
                      />
                    </View>
                    {/* <View style={{ height: 80 }}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('Profile', { userType: 'Barber' })
                      }
                      activeOpacity={1}>
                      <Image
                        source={Images.HomeIcon.EditIcon}
                        style={{
                          height: 40,
                          width: 40,
                        }}
                      />
                    </TouchableOpacity>
                  </View> */}
                  </View>
                </View>
              </View>

              <View style={styles.RenderListCont}>
                <RenderList
                  path={'NewsLists'}
                  userType={'Barber'}
                  type={'news'}
                  title={'Latest news for you '}
                  onpress={true}
                  items={this.props.newsList ? this.props.newsList.news : null}
                  navigateData={this.props.newsList}
                  navigation={navigation}
                  imagePath={newsPath}
                  itemPath={'NewsDetails'}
                  errMsg={'No news added yet !'}
                />
              </View>

              <View style={CommonStyle.container}>
                <Text
                  style={
                    (CommonStyle.dayText, {marginTop: 0, color: '#283A58'})
                  }>
                  Your Appoinments
                </Text>
                <View style={{flexDirection: 'row', marginTop: 25, height: 30}}>
                  <TouchableOpacity
                    onPress={() => this.appointmentSelection(1)}
                    style={{
                      backgroundColor:
                        this.state.selectedAppointment === 1
                          ? Colors.ButtonColor
                          : '#EFF0F6',
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 4,
                    }}>
                    <Text
                      style={{
                        color:
                          this.state.selectedAppointment === 1
                            ? Colors.White
                            : '#283A58',
                        fontSize: 14,
                      }}>
                      Today
                    </Text>
                  </TouchableOpacity>
                  <View
                    style={{
                      width: 1,
                      height: this.state.selectedAppointment === 3 ? '50%' : 0,
                      backgroundColor: Colors.Black,
                      alignSelf: 'center',
                    }}
                  />
                  <TouchableOpacity
                    onPress={() => this.appointmentSelection(2)}
                    style={{
                      backgroundColor:
                        this.state.selectedAppointment === 2
                          ? Colors.ButtonColor
                          : '#EFF0F6',
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 0,
                    }}>
                    <Text
                      style={{
                        color:
                          this.state.selectedAppointment === 2
                            ? Colors.White
                            : '#283A58',
                        fontSize: 14,
                      }}>
                      Upcoming
                    </Text>
                  </TouchableOpacity>
                  <View
                    style={{
                      width: 1,
                      height: this.state.selectedAppointment === 1 ? '50%' : 0,
                      backgroundColor: Colors.Black,
                      alignSelf: 'center',
                    }}
                  />
                  <TouchableOpacity
                    onPress={() => {
                      this.appointmentSelection(3);
                      navigation.navigate('AppointmentScreen', {
                        allAppointment: this.props.appointmentData,
                        userType: 'Barber',
                        DateArr: DateArr,
                      });
                    }}
                    style={{
                      backgroundColor:
                        this.state.selectedAppointment === 3
                          ? Colors.ButtonColor
                          : '#EFF0F6',
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 4,
                    }}>
                    <Text
                      style={{
                        color:
                          this.state.selectedAppointment === 3
                            ? Colors.White
                            : '#283A58',
                        fontSize: 14,
                      }}>
                      Calendar
                    </Text>
                  </TouchableOpacity>
                </View>
                {/* <TouchableOpacity
                    onPress={() =>
                      this.props.appointmentData &&
                      navigation.navigate('AppointmentScreen', {
                        allAppointment: this.props.appointmentData,
                        userType: 'Barber',
                        DateArr: DateArr,
                      })
                    }
                    activeOpacity={1}>
                    <View style={CommonStyle.viewAllBtn}>
                      <Text style={CommonStyle.viewAllFont}>View All</Text>
                    </View>
                  </TouchableOpacity> */}
                {/*
                {appointmentData && appointmentData.length > 0 ? (

                ): (
                    <Text
                    style = {{
                      fontFamily: Fonts.Lato_Black,
                      fontSize: 14,
                      alignSelf: 'center',
                      paddingTop: 20,
                    }}>
                No Upcoming Booking Available !
                  </Text>
                )} */}
                <View style={{flexDirection: 'row', marginTop: 15}}>
                  <Text style={styles.textStyle2}>{moment().format('ll')}</Text>
                  <Text style={styles.textStyle1}>
                    {moment().format('dddd')}
                  </Text>
                </View>

                {this.state.selectedAppointment === 1 &&
                this.state.appointmentsBooking &&
                this.state.appointmentsBooking.length > 0 ? (
                  <FlatList
                    style={{paddingBottom: 50}}
                    data={this.state.appointmentsBooking}
                    renderItem={(item, index) =>
                      this.renderAppointItem(item, index)
                    }
                    keyExtractor={(item) => item.id.toString()}
                  />
                ) : null}

                {this.state.selectedAppointment === 2 &&
                this.state.upcomingAppointmentsBooking &&
                this.state.upcomingAppointmentsBooking.length > 0 ? (
                  <FlatList
                    style={{paddingBottom: 50}}
                    data={this.state.upcomingAppointmentsBooking}
                    renderItem={(item, index) =>
                      this.renderAppointItem(item, index)
                    }
                    keyExtractor={(item) => item.id.toString()}
                  />
                ) : null}
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      );
    } else {
      return (
        <ImageBackground
          source={Images.CustomerHomeIcon.BgImage}
          imageStyle={styles.imageSty}
          style={styles.textCont}>
          <Text style={styles.NoInternet_text}>
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
  ImageCont: {
    overflow: 'hidden',
    borderWidth: 2,
    borderRadius: 18,
    borderColor: '#790A13',
  },
  NoInternet_text: {
    fontFamily: Fonts.HeveticaNowText_Black,
    fontSize: 14,
    padding: 20,
  },
  RenderListCont: {
    fontFamily: Fonts.HeveticaNowText_Medium,
    marginLeft: 12,
  },
  profession_text: {
    color: Colors.LightBlack,
    fontStyle: 'italic',
  },
  styleCont: {
    height: 32,
    width: 32,
    borderRadius: 15,
    overflow: 'hidden',
    borderWidth: 2,
  },
  textStyle1: {
    fontSize: 12,
    color: '#42403F',
    marginLeft: 10,
    fontFamily: Fonts.HeveticaNowText_Regular,
  },
  textStyle2: {
    fontSize: 12,
    color: Colors.Black,
    fontFamily: Fonts.HeveticaNowText_Bold,
  },
  textCont: {
    height,
    width,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageSty: {
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  nameCont: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 2,
  },
});

const mapStateToProps = (state) => {
  return {
    newsList: state.HomeReducer.newsList,
    userInfo: state.SignupReducer.userInfo,
    getNewsListReq: state.HomeReducer.getNewsList,
    getNewsListSuccess: state.HomeReducer.getNewsListSuccess,
    fetchStylist: state.SignupReducer.fetchDetails,
    fetchStylistSuccess: state.SignupReducer.fetchDetailsSuccess,
    getStylistAppointmentReq: state.AppointmentReducer.getStylistAppointment,
    getStylistAppointmentSuccess:
      state.AppointmentReducer.getStylistAppointmentSuccess,
    appointmentData: state.AppointmentReducer.appointmentData,
    notificationData: state.NotificationReducer.notificationData,
    getStylistNotificationReq:
      state.NotificationReducer.getStylistNotificationReq,
    getPortfolio: state.ProfileReducer.getPortfolioImage,
    portfolioData: state.ProfileReducer.portfolioData,
    upcomingAppointmentData: state.AppointmentReducer.upcomingAppointmentData,
    getStylistUpcomingAppointmentSuccess:
      state.AppointmentReducer.getStylistUpcomingAppointmentSuccess,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchStylistDetails: (data) => dispatch(fetchStylistDetails(data)),
  getNewsList: () => dispatch(getNewsList()),
  getStylistAppointment: (data) => dispatch(getStylistAppointment(data)),
  getStylistNotification: () => dispatch(getStylistNotification()),
  getPortfolioImage: () => dispatch(getPortfolioImage()),
  getStylistUpcomingAppointment: (data) =>
    dispatch(getStylistUpcomingAppointment(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
