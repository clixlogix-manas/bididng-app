/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  // Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
} from 'react-native';
import {Images, Fonts, Colors} from '../../../constants';
import Button from '../../../components/Button';
import CommonStyle from '../../../constants/Style';
import styles from '../Appointment/style';
import moment from 'moment';
import {connect} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import PopupCard from '../../../components/PopupCard';

import {
  changeAppointmentStatus,
  getCustomerAppointment,
  getStylistAppointment,
} from '../../../redux/actions/appointmentAction';
import {Alert} from 'react-native';
import {getReview} from '../../../redux/actions/stylistAction';
import {SafeAreaInsetsContext} from 'react-native-safe-area-context';
import {customerImagePath} from '../../../constants/Config';
import {HeveticaNowText_Medium} from '../../../constants/Fonts';
import SafeAreaView from 'react-native-safe-area-view';
// const {height} = Dimensions.get('window');

class AppointmentByType extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paymentType: [
        {
          label: 'Bank Payment',
          value: 'bank',
        },
        {
          label: 'Cash Payment',
          value: 'cash',
        },
      ],
      selectType: '',
      pressedBtn: 0,
      modalStatus: false,
    };
  }
  onValueChange = (value) => {
    this.setState({
      selectType: value,
    });
  };
  onAppointmentAction = (status) => {
    let formdata = new FormData();
    formdata.append('booking_id', this.props.route.params.item.id);
    formdata.append('status', status);
    if (status === 'Service Done') {
      let bookingDate = this.props.route.params.item.date_time.split(' ')[0];
      let todayDate = moment(new Date()).format('YYYY-MM-DD');
      if (moment(bookingDate).isSame(todayDate)) {
        this.props.changeAppointmentStatus(formdata);
      } else if (moment(bookingDate).isAfter(todayDate)) {
        Alert.alert(
          'Hair Biddy',
          "You can't mark it complete booking date is coming soon ",
          [{text: 'OK', onPress: () => {}}],
          {cancelable: true},
        );
      } else {
        this.props.changeAppointmentStatus(formdata);
      }
    } else {
      this.props.changeAppointmentStatus(formdata);
    }
  };
  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.changeStatusAppointmentSuccess !==
      prevProps.changeStatusAppointmentSuccess
    ) {
      let formdata = new FormData();
      formdata.append('ondate', '');
      if (this.props.route.params.userType === 'Customer') {
        this.props.getCustomerAppointment(formdata);
        this.props.navigation.navigate('HomeScreenContainer');
      } else {
        this.props.getStylistAppointment(formdata);
        this.props.navigation.navigate('HomeScreen');
      }
    }
  }
  onYes = () => {
    this.setState({modalStatus: false}, () => {
      this.onAppointmentAction('Cancel Booking');
    });
  };
  componentDidMount() {
    let formdata = new FormData();
    formdata.append('stylist_id', this.props.route.params.item.provider_id);
    this.props.getReview(formdata);
  }
  render() {
    const {
      navigation,
      route,
      userInfo,
      getReviewReq,
      reviewList,
      changeStatusAppointmentReq,
    } = this.props;
    console.log('userInfo.provider_info', userInfo.provider_info);
    let bookingData = route.params.item;
    let stylistData =
      route.params.userType === 'Customer'
        ? userInfo.user_data
        : userInfo.provider_info;
    let rateStatus = false;
    if (reviewList && reviewList.data && reviewList.data.length > 0) {
      let statusofcust = reviewList.data.filter((review) => {
        return review.customer_id === bookingData.customer_id;
      });
      if (statusofcust.length > 0) {
        // eslint-disable-next-line no-unused-vars
        rateStatus = true;
      }
    }
    let timeValue;

    if (bookingData.service_duration > 60) {
      if (
        (bookingData.service_duration / 30 / 2).toString().split('.')[1] === '5'
      ) {
        timeValue =
          (bookingData.service_duration / 30 / 2).toString().split('.')[0] +
          ' Hour 30 Mins';
      } else {
        // eslint-disable-next-line no-unused-vars
        timeValue =
          (bookingData.service_duration / 30 / 2).toString().split('.')[0] +
          ' Hours';
      }
    }
    console.log('*************************bookingData', bookingData);
    console.log('*************************bookingData params>', route.params);
    // debugger;
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: Colors.BgColor}}>
        <ScrollView
          listViewDisplayed={false}
          style={{flex: 1}}
          showsVerticalScrollIndicator={false}>
          <View style={{flex: 1, flexDirection: 'column'}}>
            <Spinner
              visible={getReviewReq}
              textContent={'Loading...'}
              textStyle={{color: Colors.BackgroundGray}}
            />

            <SafeAreaInsetsContext.Consumer>
              {(insets) => (
                <View
                  style={[
                    {
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                      width: '90%',
                      alignSelf: 'center',
                      marginTop: Platform.OS === 'ios' ? 0 : 10,
                    },
                  ]}>
                  <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    activeOpacity={1}>
                    <Image
                      source={Images.SignUpIcon.BackArrow}
                      style={{height: 20.5, width: 12, marginTop: 15}}
                    />
                  </TouchableOpacity>
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      flex: 1,
                      marginTop: 8,
                    }}>
                    <Text
                      style={{
                        textAlign: 'center',
                        fontSize: 20,
                        fontFamily: Fonts.HeveticaNowText_Regular,
                      }}>
                      Appointment Details{' '}
                    </Text>
                  </View>
                </View>
              )}
            </SafeAreaInsetsContext.Consumer>

            <View>
              <View
                style={{
                  width: '90%',
                  backgroundColor: Colors.White,
                  height: 129,
                  marginHorizontal: 20,
                  borderRadius: 10,
                  paddingVertical: 15,
                  shadowColor: '#000',
                  shadowOpacity: 0.5,
                  shadowRadius: 2,
                  elevation: 2,
                  margin: 5,
                  marginTop: 20,
                  alignSelf: 'center',
                  alignItems: 'center',
                }}>
                <View
                  style={[CommonStyle.viewAllCont, {paddingHorizontal: 15}]}>
                  <View style={{flex: 0.7, alignItems: 'flex-start', left: 20}}>
                    <View style={{flexDirection: 'row', marginTop: 0}}>
                      {route.params.userType !== 'Customer' ? (
                        <Image
                          source={{
                            uri:
                              customerImagePath +
                              (bookingData.customer_data[0].profile_pic ||
                                null),
                          }}
                          style={{
                            height: 56,
                            width: 56,
                            borderRadius: 35,
                            right: 50,
                            bottom: 5,
                          }}
                        />
                      ) : (
                        <Image
                          source={{}}
                          style={{
                            height: 56,
                            width: 56,
                            borderRadius: 35,
                            right: 50,
                            bottom: 5,
                          }}
                        />
                      )}
                      <View style={{right: 20, flexDirection: 'row'}}>
                        <Image
                          source={Images.Appointment.ShopDateTime}
                          style={[
                            CommonStyle.iconStyle,
                            {
                              right: 20,
                              marginRight: -12,
                              tintColor: Colors.ButtonColor,
                            },
                          ]}
                        />
                        <Text
                          style={{
                            fontSize: 14,
                            color: '#283A58',
                            fontStyle: 'italic',
                          }}>
                          {'10:00 - 11:00 AM'},
                          {/* {console.log('123123', {
                            uri: bookingData.customer_data[0].profile_pic,
                          })} */}
                        </Text>
                        <Text
                          style={{
                            fontSize: 13,
                            color: '#0FC1B5',
                            marginLeft: 10,
                          }}>
                          {'Confirmed'}
                        </Text>

                        <Text
                          style={{
                            width: Platform.OS === 'android' ? 42 : 47,
                            fontSize: 14,
                            color: Colors.ButtonColor,
                            textAlign: 'right',
                            bottom: 1,
                          }}>
                          {'Edit'}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View
                    style={
                      (CommonStyle.inputStyle,
                      {top: 10, right: Platform.OS === 'ios' ? 81 : 47})
                    }>
                    <View style={{justifyContent: 'center'}} />
                    <View style={{width: '70%', flexDirection: 'row'}}>
                      <Image
                        source={Images.Appointment.Calendar}
                        style={[
                          CommonStyle.iconStyle,
                          {
                            right: 20,
                            marginRight: -15,
                            tintColor: Colors.ButtonColor,
                          },
                        ]}
                      />
                      <Text
                        style={[
                          styles.textStyle,
                          {
                            fontSize: 13,
                            marginLeft: 5,
                            width: 80,
                            color: '#283A58',
                            fontFamily: Fonts.HeveticaNowText_Regular,
                          },
                        ]}>
                        {moment(
                          new Date(bookingData.date_time.split(' ')[0]),
                        ).format('DD MMM YYYY')}
                      </Text>
                      <Text
                        style={[
                          styles.textStyle,
                          {
                            marginLeft: 0,
                            width: 55,
                            color: '#283A58',
                            fontFamily: Fonts.HeveticaNowText_Regular,
                          },
                        ]}>
                        {bookingData.date_time.split(' ')[1].split(':')[0] > 12
                          ? // eslint-disable-next-line radix
                            parseInt(
                              bookingData.date_time.split(' ')[1].split(':')[0],
                            ) - 12
                          : bookingData.date_time.split(' ')[1].split(':')[0]}
                        :{bookingData.date_time.split(' ')[1].split(':')[1]}{' '}
                        {bookingData.date_time.split(' ')[1].split(':')[0] > 12
                          ? 'PM'
                          : 'AM'}
                      </Text>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    borderBottomWidth: 1,
                    top: 5,
                    borderBottomColor: Colors.BorderGray,
                    width: '100%',
                  }}
                />
                <View style={{flexDirection: 'row', marginTop: 20, right: 20}}>
                  <Text
                    style={{
                      left: 40,
                      fontSize: 16,
                      fontFamily: Fonts.HeveticaNowText_Regular,
                      fontWeight: 'bold',
                    }}>
                    {(bookingData.provider_data &&
                      bookingData.provider_data.fname +
                        ' ' +
                        bookingData.provider_data.lname) ||
                      stylistData.fname + ' ' + stylistData.lname}
                  </Text>
                  <View style={{flex: 1}} />
                  <Image
                    source={Images.Appointment.Phone}
                    style={{height: 20, width: 20}}
                  />
                  <Image
                    source={Images.Appointment.MsgBox}
                    style={{height: 20, width: 20, marginStart: 15}}
                  />
                </View>
              </View>
              {/* </View> */}
            </View>
            <View>
              <Text
                style={{
                  color: '#283A58',
                  fontSize: 18,
                  fontFamily: HeveticaNowText_Medium,
                  marginStart: 20,
                  marginTop: 10,
                }}>
                Selected services
              </Text>
            </View>
            <View>
              <View style={{flexDirection: 'row'}}>
                <View style={{marginLeft: 35}}>
                  <Text
                    style={{
                      color: '#283A58',
                      fontSize: 16,
                      fontFamily: Fonts.HeveticaNowText_Regular,
                    }}>
                    {bookingData.service_name}
                  </Text>
                  <Text
                    style={{
                      color: '#790A13',
                      fontSize: 13,
                      fontStyle: 'italic',
                      marginTop: 3,
                      fontFamily: Fonts.HeveticaNowText_Regular,
                    }}>
                    {bookingData.service_duration}
                  </Text>
                </View>
                <View style={{flex: 1}} />
                <View>
                  <Text
                    style={{
                      color: '#790A13',
                      fontSize: 13,
                      marginTop: 3,
                      marginEnd: 30,
                      fontFamily: Fonts.HeveticaNowText_Regular,
                    }}>
                    $ {bookingData.service_charge}.0
                  </Text>
                </View>
              </View>
              <View
                style={{
                  borderBottomWidth: 1,
                  top: 5,
                  borderBottomColor: '#222B4599',
                  width: '90%',
                  alignSelf: 'center',
                  marginBottom: 10,
                  marginTop: 10,
                }}
              />
              <View
                style={{
                  flexDirection: 'row',
                  alignSelf: 'flex-end',
                  marginEnd: 30,
                }}>
                <Text
                  style={{
                    color: '#283A58',
                    fontSize: 16,
                    fontFamily: Fonts.HeveticaNowText_Regular,
                  }}>
                  Total
                </Text>
                <Text
                  style={{
                    color: '#790A13',
                    marginLeft: 20,
                    fontSize: 13,
                    marginTop: 3,
                    fontFamily: Fonts.HeveticaNowText_Regular,
                  }}>
                  $ {bookingData.service_charge}.0
                </Text>
              </View>
            </View>

            {/* <View
              style={[
                CommonStyle.inputCont,
                {width: 343, alignSelf: 'center'},
              ]}>

            </View> */}

            {route.params.type === 'Upcoming' &&
              route.params.userType !== 'Customer' && (
                <View
                  style={[
                    CommonStyle.inputCont,
                    {width: 343, alignSelf: 'center'},
                  ]}>
                  <View style={[styles.bContainer, {marginBottom: 15}]}>
                    <Text
                      style={[
                        CommonStyle.viewAllFont,
                        {
                          width: '40%',
                          marginTop: 0,
                          padding: 10,
                          color: '#191514',
                          fontSize: 17,
                          fontFamily: Fonts.HeveticaNowText_Regular,
                        },
                      ]}>
                      Reschedule
                    </Text>
                  </View>
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {
                      this.onAppointmentAction('Abandon Booking');
                      this.setState({pressedBtn: 3});
                    }}>
                    {changeStatusAppointmentReq &&
                    this.state.pressedBtn === 3 ? (
                      <View
                        style={[
                          styles.loadingStyle,
                          {backgroundColor: Colors.Black},
                        ]}>
                        <ActivityIndicator size="large" color="white" />
                      </View>
                    ) : (
                      <View style={styles.payContainer}>
                        <Text
                          style={[
                            CommonStyle.viewAllFont,
                            {
                              marginTop: 0,
                              padding: 10,
                              color: '#ffffff',
                              fontSize: 17,
                              fontFamily: Fonts.HeveticaNowText_Regular,
                            },
                          ]}>
                          Cancel
                        </Text>
                      </View>
                    )}
                  </TouchableOpacity>

                  <View
                    style={{
                      marginLeft: Platform.OS === 'ios' ? 10 : 0,
                      alignSelf: 'center',
                    }}>
                    <View
                      style={[CommonStyle.signupBorderCont, {marginTop: 10}]}>
                      <View style={CommonStyle.lBorder} />
                      <Text
                        style={{
                          fontSize: 16,
                          width: 63,
                          textAlign: 'center',
                          fontFamily: Fonts.HeveticaNowText_Medium,
                        }}>
                        or
                      </Text>
                      <View style={CommonStyle.lBorder} />
                    </View>
                  </View>

                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {
                      this.onAppointmentAction('Service Done');
                      this.setState({pressedBtn: 4});
                    }}>
                    {changeStatusAppointmentReq &&
                    this.state.pressedBtn === 4 ? (
                      <View style={[styles.loadingStyle]}>
                        <ActivityIndicator size="large" color="white" />
                      </View>
                    ) : (
                      <View style={styles.b2Container}>
                        <Text
                          style={[
                            CommonStyle.viewAllFont,
                            {
                              marginTop: 0,
                              padding: 10,
                              color: '#ffffff',
                              fontSize: 17,
                              fontFamily: Fonts.HeveticaNowText_Regular,
                            },
                          ]}>
                          Mark as Paid
                        </Text>
                      </View>
                    )}
                  </TouchableOpacity>
                </View>
              )}

            {route.params.type === 'Pending' &&
              route.params.userType !== 'Customer' && (
                <View
                  style={[
                    CommonStyle.inputCont,
                    {width: 343, alignSelf: 'center'},
                  ]}>
                  <View style={[styles.bContainer, {marginBottom: 15}]}>
                    <Text
                      style={[
                        CommonStyle.viewAllFont,
                        {
                          width: '40%',
                          padding: 10,
                          color: '#191514',
                          fontSize: 17,
                          fontFamily: Fonts.HeveticaNowText_Regular,
                        },
                      ]}>
                      Reschedule
                    </Text>
                  </View>
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {
                      bookingData.status === 1 &&
                        this.onAppointmentAction('Ask Payment');
                      this.setState({pressedBtn: 1});
                    }}>
                    {changeStatusAppointmentReq &&
                    this.state.pressedBtn === 1 ? (
                      <View style={[styles.loadingStyle]}>
                        <ActivityIndicator size="large" color="white" />
                      </View>
                    ) : (
                      <View style={styles.b2Container}>
                        <Text
                          style={[
                            CommonStyle.viewAllFont,
                            {
                              marginTop: 0,
                              padding: 10,
                              color: '#ffffff',
                              fontSize: 17,
                              fontFamily: Fonts.HeveticaNowText_Regular,
                            },
                          ]}>
                          {bookingData.status === 1 ? 'ACCEPT' : 'ACCEPTED'}
                        </Text>
                      </View>
                    )}
                  </TouchableOpacity>

                  <View
                    style={{
                      marginLeft: Platform.OS === 'ios' ? 10 : 0,
                      alignSelf: 'center',
                    }}>
                    <View
                      style={[CommonStyle.signupBorderCont, {marginTop: 10}]}>
                      <View style={CommonStyle.lBorder} />
                      <Text
                        style={{
                          fontSize: 16,
                          width: 63,
                          textAlign: 'center',
                          fontFamily: Fonts.HeveticaNowText_Medium,
                        }}>
                        or
                      </Text>
                      <View style={CommonStyle.lBorder} />
                    </View>
                  </View>

                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {
                      bookingData.status === 1 &&
                        this.onAppointmentAction('Stylist Canceled');
                      this.setState({pressedBtn: 2});
                    }}>
                    {changeStatusAppointmentReq &&
                    this.state.pressedBtn === 2 ? (
                      <View
                        style={[
                          styles.loadingStyle,
                          {backgroundColor: Colors.Black},
                        ]}>
                        <ActivityIndicator size="large" color="white" />
                      </View>
                    ) : (
                      <View style={styles.b2Container}>
                        <Text style={[styles.buttonText]}>DECLINE</Text>
                      </View>
                    )}
                  </TouchableOpacity>
                </View>
              )}

            {route.params.type === 'Complete' && (
              <View>
                <View
                  style={[
                    CommonStyle.inputCont,
                    {
                      width: '100%',
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: 40,
                    },
                  ]}>
                  <Text
                    style={[styles.labelStyle, {margin: 10, marginLeft: 10}]}>
                    BOOKING ID
                  </Text>
                  <View style={[CommonStyle.inputStyle, {padding: 7.5}]}>
                    <Text style={[styles.textStyle, {width: '35%'}]}>
                      {bookingData.id}
                    </Text>
                  </View>
                  <View
                    style={[
                      CommonStyle.viewAllCont,
                      {justifyContent: 'flex-end'},
                    ]}>
                    <Image
                      source={Images.Appointment.Stamp}
                      style={{height: 100, width: 100, marginTop: 0}}
                    />
                  </View>
                </View>
              </View>
            )}

            {route.params.type === 'Pending' &&
              route.params.userType === 'Customer' &&
              (changeStatusAppointmentReq ? (
                <View style={[CommonStyle.loadingStyle]}>
                  <ActivityIndicator size="large" color="white" />
                </View>
              ) : (
                <Button
                  title={'CANCEL FOR FREE'}
                  onSubmit={() => this.onAppointmentAction('User Canceled')}
                  navigation={navigation}
                />
              ))}
            <PopupCard
              screen={'logout'}
              topMargin={20}
              modalStatus={this.state.modalStatus}
              onClose={() => this.setState({modalStatus: false})}
              onYes={() => this.onYes()}
              label={
                'Are you surely want to cancel?\nrefund will get back to your account soon...'
              }
            />
            {route.params.type === 'Upcoming' &&
              route.params.userType === 'Customer' && (
                <Button
                  title={'CANCEL'}
                  onSubmit={() => this.setState({modalStatus: true})}
                  navigation={navigation}
                  marginBottom={1}
                />
              )}
            {route.params.type === 'Complete' &&
              route.params.userType === 'Customer' &&
              bookingData.status === 7 &&
              !rateStatus && (
                <Button
                  title={'RATE THE STYLIST'}
                  navigation={navigation}
                  serviceData={bookingData}
                  path={'RateStylist'}
                />
              )}

            {route.params.type === 'Upcoming' &&
              route.params.userType === 'Customer' && (
                <Text style={styles.messText}>
                  {'Paid Cancellation within 24 hours\nfrom the Booking time'}
                </Text>
              )}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const priceComp = (amount, type) => {
  return (
    <View style={{padding: 10, width: '100%'}}>
      <Text style={styles.labelStyle}>PRICING</Text>
      {type === 'online' && (
        <View style={[CommonStyle.viewAllCont, {marginTop: 10}]}>
          <View style={{flex: 0.7, alignItems: 'flex-start'}}>
            <Text
              style={[
                CommonStyle.userCont,
                {
                  marginTop: 0,
                  fontSize: 13,
                  fontFamily: Fonts.Lato_Bold,
                },
              ]}>
              Booking Amount
            </Text>
          </View>
          <Text style={CommonStyle.viewAllFont}>
            ${amount - (amount * 10) / 100}.0
          </Text>
        </View>
      )}
      {type === 'online' && (
        <View style={[CommonStyle.viewAllCont, {marginTop: 5}]}>
          <View style={{flex: 0.7, alignItems: 'flex-start'}}>
            <Text
              style={[
                CommonStyle.userCont,
                {
                  marginTop: 0,
                  fontSize: 13,
                  fontFamily: Fonts.Lato_Bold,
                },
              ]}>
              Advanced Amount
            </Text>
          </View>
          <Text style={CommonStyle.viewAllFont}>${(amount * 10) / 100}.0</Text>
        </View>
      )}

      <View style={[CommonStyle.viewAllCont, {marginTop: 5}]}>
        <View style={{flex: 0.7, alignItems: 'flex-start'}}>
          <Text
            style={[
              CommonStyle.userCont,
              {
                marginTop: 0,
                fontSize: 13,
                fontFamily: Fonts.Lato_Bold,
              },
            ]}>
            {type === 'online' ? 'Total Amount' : 'Booking Amount'}
          </Text>
        </View>
        <Text style={CommonStyle.viewAllFont}>${amount}.0</Text>
      </View>
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    userInfo: state.SignupReducer.userInfo,
    changeStatusAppointmentReq:
      state.AppointmentReducer.changeStatusAppointmentReq,
    changeStatusAppointmentSuccess:
      state.AppointmentReducer.changeStatusAppointmentSuccess,
    changeStatusAppointmentFailure:
      state.AppointmentReducer.changeStatusAppointmentFailure,
    changeStatusAppointmentFailureMessage:
      state.AppointmentReducer.changeStatusAppointmentFailureMessage,
    getReviewReq: state.StylistReducer.getReviewReq,
    reviewList: state.StylistReducer.reviewList,
  };
};

const mapDispatchToProps = (dispatch) => ({
  changeAppointmentStatus: (data) => dispatch(changeAppointmentStatus(data)),
  getStylistAppointment: (data) => dispatch(getStylistAppointment(data)),
  getCustomerAppointment: (data) => dispatch(getCustomerAppointment(data)),
  getReview: (data) => dispatch(getReview(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(AppointmentByType);

// import React, {Component} from 'react';
// import {
//   View,
//   Text,
//   Dimensions,
//   Image,
//   ScrollView,
//   ImageBackground,
//   TouchableOpacity,
//   ActivityIndicator,
// } from 'react-native';
// import {Images, Fonts, Colors} from '../../../constants';
// import CommonStyle from '../../../constants/Style';
// import styles from '../Appointment/style';
// import Button from '../../../components/Button';
// import moment from 'moment';
// import {connect} from 'react-redux';
// import Spinner from 'react-native-loading-spinner-overlay';

// import {
//   changeAppointmentStatus,
//   getCustomerAppointment,
//   getStylistAppointment,
// } from '../../../redux/actions/appointmentAction';
// import {Alert} from 'react-native';
// import {getReview} from '../../../redux/actions/stylistAction';
// import PopupCard from '../../../components/PopupCard';
// import {SafeAreaInsetsContext} from 'react-native-safe-area-context';
// const {height} = Dimensions.get('window');

// class AppointmentByType extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       paymentType: [
//         {
//           label: 'Bank Payment',
//           value: 'bank',
//         },
//         {
//           label: 'Cash Payment',
//           value: 'cash',
//         },
//       ],
//       selectType: '',
//       pressedBtn: 0,
//       modalStatus: false,
//     };
//   }
//   onValueChange = (value) => {
//     this.setState({
//       selectType: value,
//     });
//   };
//   onAppointmentAction = (status) => {
//     let formdata = new FormData();
//     formdata.append('booking_id', this.props.route.params.item.id);
//     formdata.append('status', status);
//     if (status === 'Service Done') {
//       let bookingDate = this.props.route.params.item.date_time.split(' ')[0];
//       let todayDate = moment(new Date()).format('YYYY-MM-DD');
//       if (moment(bookingDate).isSame(todayDate)) {
//         this.props.changeAppointmentStatus(formdata);
//       } else if (moment(bookingDate).isAfter(todayDate)) {
//         Alert.alert(
//           'Hair Biddy',
//           "You can't mark it complete booking date is coming soon ",
//           [{text: 'OK', onPress: () => {}}],
//           {cancelable: true},
//         );
//       }
//     } else {
//       this.props.changeAppointmentStatus(formdata);
//     }
//   };
//   componentDidUpdate(prevProps, prevState) {
//     if (
//       this.props.changeStatusAppointmentSuccess !==
//       prevProps.changeStatusAppointmentSuccess
//     ) {
//       let formdata = new FormData();
//       formdata.append('ondate', '');
//       if (this.props.route.params.userType === 'Customer') {
//         this.props.getCustomerAppointment(formdata);
//         this.props.navigation.navigate('HomeScreenContainer');
//       } else {
//         this.props.getStylistAppointment(formdata);
//         this.props.navigation.navigate('HomeScreen');
//       }
//     }
//   }
//   onYes = () => {
//     this.setState({modalStatus: false}, () => {
//       this.onAppointmentAction('Cancel Booking');
//     });
//   };
//   componentDidMount() {
//     let formdata = new FormData();
//     formdata.append('stylist_id', this.props.route.params.item.provider_id);
//     this.props.getReview(formdata);
//   }
//   render() {
//     const {
//       navigation,
//       route,
//       userInfo,
//       getReviewReq,
//       reviewList,
//       changeStatusAppointmentReq,
//     } = this.props;
//     let bookingData = route.params.item;
//     let stylistData =
//       route.params.userType === 'Customer'
//         ? userInfo.user_data
//         : userInfo.provider_info;
//     let rateStatus = false;
//     if (reviewList && reviewList.data && reviewList.data.length > 0) {
//       let statusofcust = reviewList.data.filter((review) => {
//         return review.customer_id === bookingData.customer_id;
//       });
//       if (statusofcust.length > 0) {
//         rateStatus = true;
//       }
//     }
//     let timeValue;

//     if (bookingData.service_duration > 60) {
//       if (
//         (bookingData.service_duration / 30 / 2).toString().split('.')[1] === '5'
//       ) {
//         timeValue =
//           (bookingData.service_duration / 30 / 2).toString().split('.')[0] +
//           ' Hour 30 Mins';
//       } else {
//         timeValue =
//           (bookingData.service_duration / 30 / 2).toString().split('.')[0] +
//           ' Hours';
//       }
//     }
//     return (
//       <ScrollView
//         style={{height, flex: 1}}
//         showsVerticalScrollIndicator={false}>
//         <Spinner
//           visible={getReviewReq}
//           textContent={'Loading...'}
//           textStyle={{color: Colors.BackgroundGray}}
//         />
//         <View>
//           <ImageBackground
//             source={Images.HomeIcon.RedBg}
//             imageStyle={{
//               borderBottomLeftRadius: 15,
//               borderBottomRightRadius: 15,
//             }}
//             style={styles.backgroundStyle}>
//             <SafeAreaInsetsContext.Consumer>
//               {(insets) => (
//                 <View
//                   style={[
//                     styles.notifyCont,
//                     {
//                       marginTop:
//                         Platform.OS === 'android'
//                           ? 50
//                           : insets.top === 20
//                           ? 30
//                           : 60,
//                     },
//                   ]}>
//                   <TouchableOpacity
//                     onPress={() => navigation.goBack()}
//                     activeOpacity={1}>
//                     <Image
//                       source={Images.Notification.BackArrow}
//                       style={{height: 20, width: 20}}
//                     />
//                   </TouchableOpacity>
//                   <Text style={[styles.welcomeName]}>
//                     {route.params.type} Appointments{' '}
//                   </Text>
//                   <Text style={[styles.welcomeName, {fontSize: 16}]}> </Text>
//                 </View>
//               )}
//             </SafeAreaInsetsContext.Consumer>
//           </ImageBackground>
//           <View style={styles.profileCard}>
//             <View style={{padding: 10}}>
//               <View
//                 style={{
//                   flexDirection: 'column',
//                   justifyContent: 'space-between',
//                   alignItems: 'center',
//                   padding: 10,
//                   paddingBottom: 0,
//                 }}>
//                 <View style={[CommonStyle.inputCont, {width: '100%'}]}>
//                   <Text style={styles.labelStyle}>CUSTOMER NAME</Text>
//                   <View style={CommonStyle.inputStyle}>
//                     <View style={{justifyContent: 'center'}}>
//                       <Image
//                         source={Images.SignUpIcon.User}
//                         style={CommonStyle.iconStyle}
//                       />
//                     </View>
//                     <Text style={styles.textStyle}>
//                       {bookingData.customer_name}
//                     </Text>
//                   </View>
//                 </View>
//                 <View style={[CommonStyle.borderLine, {marginTop: 10}]}></View>

//                 <View style={[CommonStyle.inputCont, {width: '100%'}]}>
//                   <Text style={styles.labelStyle}>SHOP DETAILS</Text>
//                   <View style={CommonStyle.inputStyle}>
//                     <View style={{justifyContent: 'center'}}>
//                       <Image
//                         source={Images.SignUpIcon.User}
//                         style={CommonStyle.iconStyle}
//                       />
//                     </View>
//                     <Text style={styles.textStyle}>
//                       {route.params.userType === 'Customer'
//                         ? bookingData.provider_data.fname +
//                           ' ' +
//                           bookingData.provider_data.lname
//                         : stylistData.fname + ' ' + stylistData.lname}
//                     </Text>
//                   </View>
//                   <View style={CommonStyle.inputStyle}>
//                     <View style={{justifyContent: 'center'}}>
//                       <Image
//                         source={Images.Appointment.Shop}
//                         style={CommonStyle.iconStyle}
//                       />
//                     </View>
//                     <Text style={styles.textStyle}>
//                       {route.params.userType === 'Customer'
//                         ? bookingData.provider_data.salon_name
//                         : stylistData.salon_name}
//                     </Text>
//                   </View>
//                   <View style={CommonStyle.inputStyle}>
//                     <View style={{justifyContent: 'center'}}>
//                       <Image
//                         source={Images.Appointment.ShopAddress}
//                         style={CommonStyle.iconStyle}
//                       />
//                     </View>
//                     <Text style={styles.textStyle}>
//                       {route.params.userType === 'Customer'
//                         ? bookingData.provider_data.address_1 +
//                           ' , ' +
//                           bookingData.provider_data.city
//                         : stylistData.address_1 + ' , ' + stylistData.city}{' '}
//                       USA
//                     </Text>
//                   </View>
//                 </View>
//                 <View style={[CommonStyle.borderLine, {marginTop: 10}]}></View>

//                 <View style={[CommonStyle.inputCont, {width: '100%'}]}>
//                   <Text style={styles.labelStyle}>BOOKED SERVICE DETAIL</Text>
//                   <View style={CommonStyle.inputStyle}>
//                     <Text style={[styles.textStyle, {marginLeft: 0}]}>
//                       {bookingData.service_name}
//                     </Text>
//                   </View>
//                 </View>
//                 <View style={[CommonStyle.borderLine, {marginTop: 10}]}></View>

//                 <View style={[CommonStyle.inputCont, {width: '100%'}]}>
//                   <Text style={[styles.labelStyle]}>DATE AND TIME</Text>
//                   <View style={CommonStyle.inputStyle}>
//                     <View style={{justifyContent: 'center'}}>
//                       <Image
//                         source={Images.Appointment.ShopDateTime}
//                         style={[CommonStyle.iconStyle]}
//                       />
//                     </View>
//                     <View style={{width: '100%', flexDirection: 'row'}}>
//                       <Text
//                         style={[styles.textStyle, {marginLeft: 15, width: 90}]}>
//                         {moment(
//                           new Date(bookingData.date_time.split(' ')[0]),
//                         ).format('DD MMM YYYY')}
//                       </Text>
//                       <View style={styles.rightBorder}></View>
//                       <Text
//                         style={[styles.textStyle, {marginLeft: 5, width: 65}]}>
//                         {bookingData.date_time.split(' ')[1].split(':')[0] > 12
//                           ? parseInt(
//                               bookingData.date_time.split(' ')[1].split(':')[0],
//                             ) - 12
//                           : bookingData.date_time.split(' ')[1].split(':')[0]}
//                         :{bookingData.date_time.split(' ')[1].split(':')[1]}{' '}
//                         {bookingData.date_time.split(' ')[1].split(':')[0] > 12
//                           ? 'PM'
//                           : 'AM'}
//                       </Text>
//                       <View style={styles.rightBorder}></View>
//                       <Text
//                         style={[styles.textStyle, {marginLeft: 5, width: 60}]}>
//                         {bookingData.service_duration > 60
//                           ? timeValue
//                           : bookingData.service_duration === 60
//                           ? '1 Hour'
//                           : bookingData.service_duration + ' Min'}
//                       </Text>
//                     </View>
//                   </View>
//                 </View>
//                 <View style={[CommonStyle.borderLine, {marginTop: 10}]}></View>
//                 {route.params.type !== 'Pending' &&
//                   route.params.userType !== 'Customer' && (
//                     <View style={[CommonStyle.inputCont, {width: '100%'}]}>
//                       <Text style={styles.labelStyle}>BOOKING ID</Text>
//                       <View style={CommonStyle.inputStyle}>
//                         <Text style={[styles.textStyle, {marginLeft: 0}]}>
//                           {bookingData.id}
//                         </Text>
//                       </View>
//                     </View>
//                   )}
//                 {route.params.type === 'Complete' &&
//                   route.params.userType === 'Customer' && (
//                     <View style={[CommonStyle.inputCont, {width: '100%'}]}>
//                       <Text style={styles.labelStyle}>BOOKING ID</Text>
//                       <View style={CommonStyle.inputStyle}>
//                         <Text style={[styles.textStyle, {marginLeft: 0}]}>
//                           {bookingData.id}
//                         </Text>
//                       </View>
//                     </View>
//                   )}
//                 {route.params.type !== 'Pending' &&
//                   route.params.userType !== 'Customer' && (
//                     <View
//                       style={[CommonStyle.borderLine, {marginTop: 10}]}></View>
//                   )}
//                 {route.params.type !== 'Complete' &&
//                   paymentMethod(bookingData.service_charge, bookingData.type)}
//                 {route.params.type === 'Complete' &&
//                   route.params.userType === 'Customer' &&
//                   paymentMethod(bookingData.service_charge, bookingData.type)}
//                 {route.params.type === 'Complete' &&
//                   priceComp(bookingData.service_charge, bookingData.type)}
//                 {route.params.type === 'Pending' &&
//                   route.params.userType === 'Customer' &&
//                   priceComp(bookingData.service_charge, bookingData.type)}
//                 {route.params.type === 'Upcoming' &&
//                   priceComp(bookingData.service_charge, bookingData.type)}
//                 {route.params.type === 'Complete' && (
//                   <View style={{padding: 10, width: '100%'}}>
//                     <View
//                       style={[
//                         CommonStyle.viewAllCont,
//                         {justifyContent: 'flex-end'},
//                       ]}>
//                       <Image
//                         source={Images.Appointment.Stamp}
//                         style={{height: 100, width: 100, marginTop: 40}}
//                       />
//                     </View>
//                   </View>
//                 )}
//                 {route.params.type === 'Upcoming' &&
//                   route.params.userType !== 'Customer' && (
//                     <View style={styles.buttonCont}>
//                       <TouchableOpacity
//                         activeOpacity={1}
//                         onPress={() => {
//                           this.onAppointmentAction('Abandon Booking');
//                           this.setState({pressedBtn: 3});
//                         }}>
//                         {changeStatusAppointmentReq &&
//                         this.state.pressedBtn === 3 ? (
//                           <View
//                             style={[
//                               styles.loadingStyle,
//                               {backgroundColor: Colors.Black},
//                             ]}>
//                             <ActivityIndicator size="large" color="white" />
//                           </View>
//                         ) : (
//                           <View
//                             style={[
//                               styles.buttonStyle,
//                               {backgroundColor: Colors.Black},
//                             ]}>
//                             <Text style={[styles.buttonText]}>CANCEL</Text>
//                           </View>
//                         )}
//                       </TouchableOpacity>
//                       <TouchableOpacity
//                         activeOpacity={1}
//                         onPress={() => {
//                           this.onAppointmentAction('Service Done');
//                           this.setState({pressedBtn: 4});
//                         }}>
//                         {changeStatusAppointmentReq &&
//                         this.state.pressedBtn === 4 ? (
//                           <View style={[styles.loadingStyle]}>
//                             <ActivityIndicator size="large" color="white" />
//                           </View>
//                         ) : (
//                           <View
//                             style={[
//                               styles.buttonStyle,
//                               {
//                                 backgroundColor: Colors.Red,
//                               },
//                             ]}>
//                             <Text style={[styles.buttonText]}>COMPLETE</Text>
//                           </View>
//                         )}
//                       </TouchableOpacity>
//                     </View>
//                   )}
//                 {route.params.type === 'Pending' &&
//                   route.params.userType !== 'Customer' && (
//                     <View style={styles.buttonCont}>
//                       <TouchableOpacity
//                         activeOpacity={1}
//                         onPress={() => {
//                           bookingData.status === 1 &&
//                             this.onAppointmentAction('Ask Payment');
//                           this.setState({pressedBtn: 1});
//                         }}>
//                         {changeStatusAppointmentReq &&
//                         this.state.pressedBtn === 1 ? (
//                           <View style={[styles.loadingStyle]}>
//                             <ActivityIndicator size="large" color="white" />
//                           </View>
//                         ) : (
//                           <View
//                             style={[
//                               styles.buttonStyle,
//                               {
//                                 backgroundColor: Colors.Red,

//                                 opacity: bookingData.status === 1 ? 1 : 0.7,
//                               },
//                             ]}>
//                             <Text style={[styles.buttonText]}>
//                               {bookingData.status === 1 ? 'ACCEPT' : 'ACCEPTED'}
//                             </Text>
//                           </View>
//                         )}
//                       </TouchableOpacity>
//                       <TouchableOpacity
//                         activeOpacity={1}
//                         onPress={() => {
//                           bookingData.status === 1 &&
//                             this.onAppointmentAction('Stylist Canceled');
//                           this.setState({pressedBtn: 2});
//                         }}>
//                         {changeStatusAppointmentReq &&
//                         this.state.pressedBtn === 2 ? (
//                           <View
//                             style={[
//                               styles.loadingStyle,
//                               {backgroundColor: Colors.Black},
//                             ]}>
//                             <ActivityIndicator size="large" color="white" />
//                           </View>
//                         ) : (
//                           <View
//                             style={[
//                               styles.buttonStyle,
//                               {
//                                 backgroundColor: Colors.Black,
//                                 opacity: bookingData.status === 1 ? 1 : 0.7,
//                               },
//                             ]}>
//                             <Text style={[styles.buttonText]}>DECLINE</Text>
//                           </View>
//                         )}
//                       </TouchableOpacity>
//                     </View>
//                   )}
//                 {route.params.type === 'Pending' &&
//                   route.params.userType === 'Customer' &&
//                   (changeStatusAppointmentReq ? (
//                     <View style={[CommonStyle.loadingStyle]}>
//                       <ActivityIndicator size="large" color="white" />
//                     </View>
//                   ) : (
//                     <Button
//                       title={'CANCEL FOR FREE'}
//                       onSubmit={() => this.onAppointmentAction('User Canceled')}
//                       navigation={navigation}
//                     />
//                   ))}
//                 <PopupCard
//                   screen={'logout'}
//                   topMargin={20}
//                   modalStatus={this.state.modalStatus}
//                   onClose={() => this.setState({modalStatus: false})}
//                   onYes={() => this.onYes()}
//                   label={
//                     'Are you surely want to cancel?\nrefund will get back to your account soon...'
//                   }
//                 />
//                 {route.params.type === 'Upcoming' &&
//                   route.params.userType === 'Customer' && (
//                     <Button
//                       title={'CANCEL'}
//                       onSubmit={() => this.setState({modalStatus: true})}
//                       navigation={navigation}
//                       marginBottom={1}
//                     />
//                   )}
//                 {route.params.type === 'Complete' &&
//                   route.params.userType === 'Customer' &&
//                   bookingData.status === 7 &&
//                   !rateStatus && (
//                     <Button
//                       title={'RATE THE STYLIST'}
//                       navigation={navigation}
//                       serviceData={bookingData}
//                       path={'RateStylist'}
//                     />
//                   )}
//                 {route.params.type === 'Upcoming' &&
//                   route.params.userType === 'Customer' && (
//                     <Text style={styles.messText}>
//                       {
//                         'Paid Cancellation within 24 hours\nfrom the Booking time'
//                       }
//                     </Text>
//                   )}
//               </View>
//             </View>
//           </View>
//         </View>
//       </ScrollView>
//     );
//   }
// }
// const priceComp = (amount, type) => {
//   return (
//     <View style={{padding: 10, width: '100%'}}>
//       <Text style={styles.labelStyle}>PRICING</Text>
//       {type === 'online' && (
//         <View style={[CommonStyle.viewAllCont, {marginTop: 10}]}>
//           <View style={{flex: 0.7, alignItems: 'flex-start'}}>
//             <Text
//               style={[
//                 CommonStyle.userCont,
//                 {
//                   marginTop: 0,
//                   fontSize: 13,
//                   fontFamily: Fonts.Lato_Bold,
//                 },
//               ]}>
//               Booking Amount
//             </Text>
//           </View>
//           <Text style={CommonStyle.viewAllFont}>
//             ${amount - (amount * 10) / 100}.0
//           </Text>
//         </View>
//       )}
//       {type === 'online' && (
//         <View style={[CommonStyle.viewAllCont, {marginTop: 5}]}>
//           <View style={{flex: 0.7, alignItems: 'flex-start'}}>
//             <Text
//               style={[
//                 CommonStyle.userCont,
//                 {
//                   marginTop: 0,
//                   fontSize: 13,
//                   fontFamily: Fonts.Lato_Bold,
//                 },
//               ]}>
//               Advanced Amount
//             </Text>
//           </View>
//           <Text style={CommonStyle.viewAllFont}>${(amount * 10) / 100}.0</Text>
//         </View>
//       )}

//       <View style={[CommonStyle.viewAllCont, {marginTop: 5}]}>
//         <View style={{flex: 0.7, alignItems: 'flex-start'}}>
//           <Text
//             style={[
//               CommonStyle.userCont,
//               {
//                 marginTop: 0,
//                 fontSize: 13,
//                 fontFamily: Fonts.Lato_Bold,
//               },
//             ]}>
//             {type === 'online' ? 'Total Amount' : 'Booking Amount'}
//           </Text>
//         </View>
//         <Text style={CommonStyle.viewAllFont}>${amount}.0</Text>
//       </View>
//     </View>
//   );
// };
// const paymentMethod = (amount, type) => {
//   return (
//     <View style={[CommonStyle.inputCont, {width: '100%'}]}>
//       <Text style={styles.labelStyle}>PAYMENT METHOD</Text>
//       <View style={styles.payContainer}>
//         <Text style={styles.cashStyle}>{type}</Text>
//         <Text
//           style={[
//             CommonStyle.viewAllFont,
//             {width: '30%', marginTop: 0, padding: 10},
//           ]}>
//           ${amount}.0
//         </Text>
//       </View>
//     </View>
//   );
// };

// const mapStateToProps = (state) => {
//   return {
//     userInfo: state.SignupReducer.userInfo,
//     changeStatusAppointmentReq:
//       state.AppointmentReducer.changeStatusAppointmentReq,
//     changeStatusAppointmentSuccess:
//       state.AppointmentReducer.changeStatusAppointmentSuccess,
//     changeStatusAppointmentFailure:
//       state.AppointmentReducer.changeStatusAppointmentFailure,
//     changeStatusAppointmentFailureMessage:
//       state.AppointmentReducer.changeStatusAppointmentFailureMessage,
//     getReviewReq: state.StylistReducer.getReviewReq,
//     reviewList: state.StylistReducer.reviewList,
//   };
// };

// const mapDispatchToProps = (dispatch) => ({
//   changeAppointmentStatus: (data) => dispatch(changeAppointmentStatus(data)),
//   getStylistAppointment: (data) => dispatch(getStylistAppointment(data)),
//   getCustomerAppointment: (data) => dispatch(getCustomerAppointment(data)),
//   getReview: (data) => dispatch(getReview(data)),
// });
// export default connect(mapStateToProps, mapDispatchToProps)(AppointmentByType);
