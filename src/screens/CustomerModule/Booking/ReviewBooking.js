/* eslint-disable radix */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-did-update-set-state */
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Platform,
} from 'react-native';
import {Images, Fonts, Colors} from '../../../constants';
import CommonStyle from '../../../constants/Style';
import Button from '../../../components/Button';
import moment from 'moment';
import {connect} from 'react-redux';
import {
  customerAppointmentReq,
  getCustomerAppointment,
  makeInstallmentPayment,
} from '../../../redux/actions/appointmentAction';
import stripe from 'tipsi-stripe';
import {publishableKey} from '../../../constants/Config';
import Spinner from 'react-native-loading-spinner-overlay';
import {SafeAreaInsetsContext} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome5';

stripe.setOptions({
  publishableKey: publishableKey,
  androidPayMode: 'test',
});
const {height, width} = Dimensions.get('window');

class ReviewBooking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paymentType: 'cash',
      createBookingErr: '',
      cancellationCharge: false,
      cancelledData: null,
    };
  }
  onValueChange = (value) => {
    this.setState({
      paymentType: value,
    });
  };
  onSubmit = () => {
    if (this.state.cancellationCharge) {
      let bookingdata = this.state.cancelledData;
      let amount = (bookingdata[0].service_charge * 10) / 100;
      Alert.alert(
        'Hair Biddy',
        'Please pay earlier cancellation charge ($' +
          amount +
          '.00) before making any booking further',
        [
          {
            text: 'OK',
            onPress: async () => {
              let formdata = new FormData();
              formdata.append('amount', amount);
              formdata.append('booking_id', bookingdata[0].id);
              formdata.append('installment', 3);
              formdata.append('stylist', bookingdata[0].provider_id);
              this.props.navigation.navigate('CardInfo', {
                bookingData: formdata,
                screen: 'cancel',
              });
            },
          },
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
        ],
        {cancelable: true},
      );
    } else {
      this.bookAppointment();
    }
  };
  componentWillReceiveProps(nextProps) {
    if (
      nextProps.route.params.bookingData !== this.props.route.params.bookingData
    ) {
      this.props.makeInstallmentPayment(nextProps.route.params.bookingData);
    }
  }
  bookAppointment = () => {
    let data = this.props.route.params.serviceData;
    let stylistData = data.stylist;
    let formdata = new FormData();
    formdata.append('service_provider', stylistData.user_id);
    formdata.append('service', data.item.id);
    formdata.append('date', data.selectedDate);
    formdata.append('time_slot', data.selectedSlot.item);
    formdata.append('note', '');
    formdata.append('type', this.state.paymentType);
    formdata.append(
      'price',
      data.item.final_service_charge
        ? data.item.final_service_charge
        : data.item.service_charge,
    );
    this.props.customerAppointment(formdata);
  };
  componentDidMount() {
    let cancelleddata =
      this.props.appointmentData &&
      this.props.appointmentData.bookings &&
      this.props.appointmentData.bookings.length > 0 &&
      this.props.appointmentData.bookings.filter((appointment) => {
        if (appointment.type === 'cash' && appointment.status === 8) {
          let bookingDate = moment(
            appointment.date_time.split(' ')[0] +
              'T' +
              appointment.date_time.split(' ')[1],
          );
          let cancellationDate = moment(
            appointment.updated_at.split(' ')[0] +
              'T' +
              appointment.updated_at.split(' ')[1],
          );
          let duration = moment.duration(bookingDate.diff(cancellationDate));
          let hours = duration.asHours();
          if (hours < 24) {
            return appointment;
          }
        }
      });
    if (cancelleddata && cancelleddata.length > 0) {
      // eslint-disable-next-line react/no-did-mount-set-state
      this.setState({
        cancelledData: cancelleddata,
        cancellationCharge: true,
      });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.customerAppointmentSuccess !==
      prevProps.customerAppointmentSuccess
    ) {
      this.setState(
        {
          createBookingErr: '',
        },
        () => {
          let formdata = new FormData();
          formdata.append('ondate', '');
          this.props.getCustomerAppointment(formdata);
          this.props.navigation.navigate('HomeScreenContainer');
        },
      );
    } else if (
      this.props.customerAppointmentFailure !==
      prevProps.customerAppointmentFailure
    ) {
      this.setState({
        createBookingErr: this.props.customerAppointmentFailureMessage,
      });
    } else if (
      this.props.makeInstallmentSuccess !== prevProps.makeInstallmentSuccess
    ) {
      this.bookAppointment();
    }
  }

  render() {
    const {navigation, route, userInfo, makeInstallmentReq} = this.props;
    let timeValue;
    let item = route.params.serviceData.item;
    if (item.service_duration > 60) {
      if ((item.service_duration / 30 / 2).toString().split('.')[1] === '5') {
        timeValue =
          (item.service_duration / 30 / 2).toString().split('.')[0] +
          ' Hour 30 Mins';
      } else {
        timeValue =
          (item.service_duration / 30 / 2).toString().split('.')[0] + ' Hours';
      }
    }

    let stylistInfo = route.params.serviceData.stylist;
    console.log('stylistInfo', stylistInfo);
    console.log('customerAppointmentReq @@@', customerAppointmentReq);
    return (
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Spinner
          visible={makeInstallmentReq}
          textContent={'Loading...'}
          textStyle={{color: Colors.BackgroundGray}}
        />
        <View>
          <View style={styles.backgroundStyle}>
            <SafeAreaInsetsContext.Consumer>
              {(insets) => (
                <View
                  style={[
                    styles.notifyCont,
                    {
                      marginTop:
                        Platform.OS === 'android'
                          ? 20
                          : insets.top === 20
                          ? 40
                          : 20,
                    },
                  ]}>
                  <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    activeOpacity={1}>
                    <Image
                      source={Images.Notification.BackArrow}
                      style={styles.BackArrowSty}
                    />
                  </TouchableOpacity>
                  <Text style={[styles.welcomeName, {color: Colors.Black}]}>
                    {route.params.type}Appointments{' '}
                  </Text>
                  <Text style={[styles.welcomeName, {fontSize: 16}]}> </Text>
                </View>
              )}
            </SafeAreaInsetsContext.Consumer>
          </View>
          <View style={styles.profileCard}>
            <View style={{padding: 10}}>
              <View style={styles.customerCont}>
                <View style={[CommonStyle.inputCont, {width: '100%'}]}>
                  <Text style={styles.labelStyle}>CUSTOMER NAME</Text>
                  <View style={CommonStyle.inputStyle}>
                    <View style={{justifyContent: 'center'}}>
                      <Image
                        source={Images.SignUpIcon.User}
                        style={CommonStyle.iconStyle}
                      />
                    </View>
                    <Text style={styles.textStyle}>
                      {userInfo &&
                        userInfo.user_data &&
                        userInfo.user_data.fname +
                          ' ' +
                          userInfo.user_data.lname}
                    </Text>
                  </View>
                </View>
                <View style={[CommonStyle.borderLine, {marginTop: 10}]} />

                <View style={[CommonStyle.inputCont, {width: '100%'}]}>
                  <Text style={styles.labelStyle}>SHOP DETAILS</Text>
                  <View style={CommonStyle.inputStyle}>
                    <View style={{justifyContent: 'center'}}>
                      <Image
                        source={Images.SignUpIcon.User}
                        style={CommonStyle.iconStyle}
                      />
                    </View>
                    <Text style={styles.textStyle}>
                      {stylistInfo.fname + ' ' + stylistInfo.lname}
                    </Text>
                  </View>
                  <View style={CommonStyle.inputStyle}>
                    <View style={{justifyContent: 'center'}}>
                      <Image
                        source={Images.Appointment.Shop}
                        style={CommonStyle.iconStyle}
                      />
                    </View>
                    <Text style={styles.textStyle}>
                      {stylistInfo.salon_name}
                    </Text>
                  </View>
                  <View style={CommonStyle.inputStyle}>
                    <View style={{justifyContent: 'center'}}>
                      <Image
                        source={Images.Appointment.ShopAddress}
                        style={CommonStyle.iconStyle}
                      />
                    </View>
                    <Text style={styles.textStyle}>
                      {stylistInfo.address_1} ,{stylistInfo.city} USA
                    </Text>
                  </View>
                </View>
                <View style={[CommonStyle.borderLine, {marginTop: 10}]} />

                <View style={[CommonStyle.inputCont, {width: '100%'}]}>
                  <Text style={styles.labelStyle}>BOOKED SERVICE DETAIL</Text>
                  <View style={CommonStyle.inputStyle}>
                    <Text style={[styles.textStyle, {marginLeft: 0}]}>
                      {route.params.serviceData.item.name}
                    </Text>
                  </View>
                </View>
                <View style={[CommonStyle.borderLine, {marginTop: 10}]} />

                <View style={[CommonStyle.inputCont, {width: '100%'}]}>
                  <Text style={[styles.labelStyle]}>DATE AND TIME</Text>
                  <View style={CommonStyle.inputStyle}>
                    <View style={{justifyContent: 'center'}}>
                      <Image
                        source={Images.Appointment.ShopDateTime}
                        style={[CommonStyle.iconStyle]}
                      />
                    </View>
                    <View style={{width: '100%', flexDirection: 'row'}}>
                      <Text
                        style={[styles.textStyle, {marginLeft: 10, width: 90}]}>
                        {moment(
                          route.params.serviceData.showSelectedDate,
                        ).format('DD MMM YYYY')}
                      </Text>
                      <View style={styles.rightBorder} />
                      <Text
                        style={[styles.textStyle, {marginLeft: 5, width: 65}]}>
                        {parseInt(
                          route.params.serviceData.selectedSlot.item.split(
                            ':',
                          )[0],
                          10,
                        ) > 12
                          ? parseInt(
                              route.params.serviceData.selectedSlot.item.split(
                                ':',
                              )[0] - 12,
                              10,
                            ) +
                            ':' +
                            route.params.serviceData.selectedSlot.item.split(
                              ':',
                            )[1] +
                            ' PM'
                          : route.params.serviceData.selectedSlot.item + ' AM'}
                      </Text>
                      <View style={styles.rightBorder} />
                      <Text
                        style={[styles.textStyle, {marginLeft: 5, width: 60}]}>
                        {item.service_duration > 60
                          ? timeValue
                          : item.service_duration === 60
                          ? '1 Hour'
                          : item.service_duration + ' Min'}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={[CommonStyle.borderLine, {marginTop: 10}]} />

                {priceComp(
                  route.params.serviceData.item.service_charge,
                  this.state.paymentType,
                )}
                <Text
                  style={[
                    styles.labelStyle,
                    {textAlign: 'left', width: '100%'},
                  ]}>
                  PAYMENT METHOD
                </Text>
                {this.state.createBookingErr !== '' && (
                  <Text style={[CommonStyle.errorMsg, {textAlign: 'center'}]}>
                    {this.state.createBookingErr}
                  </Text>
                )}
                {paymentMethod(this.onValueChange, this.state.paymentType)}
                <Button
                  title={'BOOK STYLIST'}
                  navigation={navigation}
                  onSubmit={this.onSubmit}
                  bgColor={Colors.ButtonColor}
                />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}
const priceComp = (amount, type) => {
  return (
    <View style={styles.cont1}>
      <Text style={styles.labelStyle}>PRICING</Text>

      <View style={[CommonStyle.viewAllCont, {marginTop: 10}]}>
        <View style={styles.BookingCont}>
          <Text style={[CommonStyle.userCont, styles.BookingText]}>
            Booking Amount
          </Text>
        </View>
        <Text style={CommonStyle.viewAllFont}>
          {' '}
          {type !== 'cash'
            ? `$${amount - (amount * 10) / 100}.0`
            : `$${amount}.0`}
        </Text>
      </View>
      {type !== 'cash' && (
        <View style={[CommonStyle.viewAllCont, styles.ViewCont1]}>
          <View style={styles.AdvancedCont}>
            <Text style={[CommonStyle.userCont, styles.AdvancedText]}>
              Advanced Amount
            </Text>
          </View>
          <Text style={CommonStyle.viewAllFont}>${(amount * 10) / 100}.0</Text>
        </View>
      )}
      {type !== 'cash' && (
        <View style={[CommonStyle.viewAllCont, styles.ViewCont]}>
          <View style={styles.Totalamount_View}>
            <Text style={[CommonStyle.userCont, styles.Totalamount_Text]}>
              Total Amount
            </Text>
          </View>
          <Text style={CommonStyle.viewAllFont}>${amount}.0</Text>
        </View>
      )}
    </View>
  );
};
const paymentMethod = (onpress, value) => {
  return (
    <View style={[styles.cont]}>
      <TouchableOpacity activeOpacity={1} onPress={() => onpress('cash')}>
        <View style={[styles.TouchableOpacityCont]}>
          <TouchableOpacity
            activeOpacity={1}
            style={styles.style1}
            onPress={() => onpress('cash')}>
            <Icon
              name={value === 'cash' ? 'dot-circle' : 'circle'}
              size={20}
              color={value === 'cash' ? Colors.Red : 'grey'}
            />
          </TouchableOpacity>
          <Text style={[CommonStyle.buttonText, styles.cashText]}>Cash</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={1} onPress={() => onpress('online')}>
        <View style={[styles.online_sty]}>
          <TouchableOpacity
            activeOpacity={1}
            style={styles.Opacitysty}
            onPress={() => onpress('online')}>
            <Icon
              name={value === 'online' ? 'dot-circle' : 'circle'}
              size={20}
              color={value === 'online' ? Colors.Red : 'grey'}
            />
          </TouchableOpacity>

          <Text style={[CommonStyle.buttonText, styles.online_pay]}>
            Online payment
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  backgroundStyle: {
    height: Platform.OS === 'android' ? height / 3 + 20 : height / 4 + 20,
    width,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  ViewCont1: {marginTop: 5},
  cashStyle: {
    width: '70%',
    color: Colors.LightBlack,
    fontSize: 14,
    padding: 10,
    fontFamily: Fonts.Lato_Black,
  },
  customerCont: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    paddingBottom: 0,
  },
  BackArrowSty: {
    height: 20.5,
    width: 12,
    tintColor: Colors.mediumGray,
  },
  style1: {
    justifyContent: 'center',
  },
  AdvancedCont: {
    flex: 0.7,
    alignItems: 'flex-start',
  },
  BookingCont: {
    flex: 0.7,
    alignItems: 'flex-start',
  },
  cont1: {
    width: '100%',
  },
  BookingText: {
    marginTop: 0,
    fontSize: 14,
    fontFamily: Fonts.Lato_Bold,
  },
  TouchableOpacityCont: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 40,
  },
  ViewCont: {
    marginTop: 5,
  },
  Totalamount_View: {
    flex: 0.7,
    alignItems: 'flex-start',
  },
  Totalamount_Text: {
    marginTop: 0,
    fontSize: 14,
    fontFamily: Fonts.Lato_Bold,
  },
  cont: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 10,
  },
  AdvancedText: {
    marginTop: 0,
    fontSize: 14,
    fontFamily: Fonts.Lato_Bold,
  },
  cashText: {
    marginLeft: 10,
    fontSize: 14,
    marginStart: 14,
    fontFamily: Fonts.HeveticaNowText_Medium,
    marginBottom: Platform.OS === 'android' ? 10 : 0,
  },
  online_pay: {
    marginLeft: 10,
    fontSize: 14,
    marginStart: 14,
    fontFamily: Fonts.HeveticaNowText_Medium,
    marginBottom: Platform.OS === 'android' ? 10 : 0,
  },
  Opacitysty: {
    justifyContent: 'center',
  },
  profileCard: {
    width: '90%',
    backgroundColor: '#ffffff',
    alignSelf: 'center',
    borderRadius: 15,
    marginBottom: 30,
    marginTop: Platform.OS === 'android' ? -130 : -100,
  },
  notifyCont: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
  },
  online_sty: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 40,
  },
  container: {
    height,
    flex: 1,
  },
  welcomeName: {
    fontSize: 18,
    color: Colors.White,
    fontFamily: Fonts.Lato_Medium,
  },
  inputCont: {
    display: 'flex',
    flexDirection: 'column',
    margin: 30,
    marginTop: 10,
    marginBottom: 20,
    justifyContent: 'space-between',
  },
  labelStyle: {
    fontSize: 13,
    marginTop: 15,
    fontFamily: Fonts.Lato_Semibold,
  },
  textStyle: {
    width: '90%',
    marginLeft: 15,
    fontFamily: Fonts.Lato_Bold,
    fontSize: 13,
    alignSelf: 'center',
  },

  payContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: Colors.Pink,
    height: 50,
    borderRadius: 10,
    marginTop: 20,
  },

  rightBorder: {
    height: 20,
    width: 1,
    margin: 5,
    backgroundColor: Colors.LightBlack,
  },

  inputStyle: {
    display: 'flex',
    alignSelf: 'center',
    width: '100%',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    padding: 20,
    paddingBottom: 0,
    paddingLeft: 0,
  },
});

const mapStateToProps = (state) => {
  return {
    userInfo: state.SignupReducer.userInfo,
    customerAppointmentReq: state.AppointmentReducer.customerAppointmentReq,
    customerAppointmentSuccess:
      state.AppointmentReducer.customerAppointmentSuccess,
    customerAppointmentFailure:
      state.AppointmentReducer.customerAppointmentFailure,
    customerAppointmentFailureMessage:
      state.AppointmentReducer.customerAppointmentFailureMessage,
    appointmentData: state.AppointmentReducer.appointmentData,
    makeInstallmentReq: state.AppointmentReducer.makeInstallment,
    makeInstallmentSuccess: state.AppointmentReducer.makeInstallmentSuccess,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    customerAppointment: (data) => dispatch(customerAppointmentReq(data)),
    getCustomerAppointment: (data) => dispatch(getCustomerAppointment(data)),
    makeInstallmentPayment: (data) => dispatch(makeInstallmentPayment(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ReviewBooking);
