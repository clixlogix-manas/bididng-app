/* eslint-disable radix */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  // Dimensions,
  Image,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {Images, Fonts, Colors} from '../../../constants';
import CommonStyle from '../../../constants/Style';
import Button from '../../../components/Button';
import moment from 'moment';
import {connect} from 'react-redux';
import styles from '../../CommonScreens/Appointment/style';
import {
  changeAppointmentStatus,
  getAppointmentDetail,
  getCustomerAppointment,
  getStylistAppointment,
  makeInstallmentPayment,
} from '../../../redux/actions/appointmentAction';
import Spinner from 'react-native-loading-spinner-overlay';
// const {height} = Dimensions.get('window');

class PaymentComplete extends Component {
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
    };
  }
  componentDidMount() {
    let id = this.props.route.params.booking_id;
    this.props.getAppointmentDetail(id);
  }
  componentWillReceiveProps(nextProps) {
    if (
      nextProps.route.params.bookingData !== this.props.route.params.bookingData
    ) {
      this.props.makeInstallmentPayment(nextProps.route.params.bookingData);
    }
  }
  onSubmit = async () => {
    let booking = this.props.appointmentDetail.booking;
    let amount =
      booking.status === 6
        ? booking.service_charge - (booking.service_charge * 10) / 100
        : (booking.service_charge * 10) / 100;
    let formdata = new FormData();
    try {
      this.setState({loading: true, token: null});
      formdata.append('amount', amount);
      formdata.append('booking_id', booking.id);
      formdata.append('installment', booking.status === 6 ? 2 : 1);
      formdata.append('stylist', booking.provider_id);
      this.props.navigation.navigate('CardInfo', {
        bookingData: formdata,
        screen: 'payment',
      });
    } catch (error) {}
  };
  changeStatus = () => {
    let booking = this.props.appointmentDetail.booking;
    let formdata = new FormData();
    formdata.append('booking_id', booking.id);
    formdata.append('status', 'Completed');
    this.props.changeAppointmentStatus(formdata);
  };
  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.makeInstallmentSuccess !== prevProps.makeInstallmentSuccess
    ) {
      let formdata = new FormData();
      formdata.append('ondate', '');
      if (this.props.route.params.userType === 'Customer') {
        this.props.getCustomerAppointment(formdata);
        this.props.navigation.navigate('HomeScreenContainer');
      } else {
        this.props.getStylistAppointment(formdata);
        this.props.navigation.goBack();
      }
    }
  }
  render() {
    const {
      navigation,
      makeInstallmentReq,
      appointmentDetail,
      getAppointmentDetailReq,
    } = this.props;
    let bookingData = appointmentDetail && appointmentDetail.booking;
    let timeValue;

    if (bookingData && bookingData.service_duration > 60) {
      if (
        (bookingData.service_duration / 30 / 2).toString().split('.')[1] === '5'
      ) {
        timeValue =
          (bookingData.service_duration / 30 / 2).toString().split('.')[0] +
          ' Hour 30 Mins';
      } else {
        timeValue =
          (bookingData.service_duration / 30 / 2).toString().split('.')[0] +
          ' Hours';
      }
    }
    console.log('bookingData', bookingData);
    return (
      <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
        <Spinner
          visible={getAppointmentDetailReq}
          textContent={'Loading...'}
          textStyle={{color: Colors.BackgroundGray}}
        />
        <View>
          <ImageBackground
            source={Images.HomeIcon.RedBg}
            imageStyle={{
              borderBottomLeftRadius: 15,
              borderBottomRightRadius: 15,
            }}
            style={styles.backgroundStyle}>
            <View style={styles.notifyCont}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                activeOpacity={1}>
                <Image
                  source={Images.Notification.BackArrow}
                  style={{height: 20, width: 20}}
                />
              </TouchableOpacity>
              <Text style={[styles.welcomeName]}>Appointments </Text>
              <Text style={[styles.welcomeName, {fontSize: 16}]}> </Text>
            </View>
          </ImageBackground>
          <View style={styles.profileCard}>
            <View style={{padding: 10}}>
              <View
                style={{
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: 10,
                  paddingBottom: 0,
                }}>
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
                      {bookingData && bookingData.customer_name}
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
                      {bookingData &&
                        bookingData.provider_data.fname +
                          ' ' +
                          bookingData.provider_data.lname}
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
                      {bookingData && bookingData.provider_data.salon_name}
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
                      {bookingData &&
                        bookingData.provider_data.address_1 +
                          ' , ' +
                          bookingData.provider_data.city}{' '}
                      USA
                    </Text>
                  </View>
                </View>
                <View style={[CommonStyle.borderLine, {marginTop: 10}]} />

                <View style={[CommonStyle.inputCont, {width: '100%'}]}>
                  <Text style={styles.labelStyle}>BOOKED SERVICE DETAIL</Text>
                  <View style={CommonStyle.inputStyle}>
                    <Text style={[styles.textStyle, {marginLeft: 0}]}>
                      {bookingData && bookingData.service_name}
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
                        style={[styles.textStyle, {marginLeft: 15, width: 90}]}>
                        {bookingData &&
                          moment(
                            new Date(bookingData.date_time.split(' ')[0]),
                          ).format('DD MMM YYYY')}
                      </Text>
                      <View style={styles.rightBorder} />
                      <Text
                        style={[styles.textStyle, {marginLeft: 5, width: 65}]}>
                        {bookingData
                          ? parseInt(bookingData.time.split(':')[0]) > 12
                            ? parseInt(bookingData.time.split(':')[0] - 12) +
                              ':' +
                              bookingData.time.split(':')[1] +
                              ' PM'
                            : bookingData.time + ' AM'
                          : ''}
                      </Text>
                      <View style={styles.rightBorder} />
                      <Text
                        style={[styles.textStyle, {marginLeft: 5, width: 60}]}>
                        {bookingData && bookingData.service_duration > 60
                          ? timeValue
                          : bookingData && bookingData.service_duration === 60
                          ? '1 Hour'
                          : bookingData &&
                            bookingData.service_duration + ' Min'}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={[CommonStyle.borderLine, {marginTop: 10}]} />

                <View style={[CommonStyle.inputCont, {width: '100%'}]}>
                  <Text style={styles.labelStyle}>BOOKING ID</Text>
                  <View style={CommonStyle.inputStyle}>
                    <Text style={[styles.textStyle, {marginLeft: 0}]}>
                      {bookingData && bookingData.id}
                    </Text>
                  </View>
                </View>
                {bookingData &&
                  paymentMethod(bookingData.service_charge, bookingData.type)}

                {bookingData &&
                  priceComp(
                    bookingData.service_charge,
                    bookingData.type,
                    bookingData.status,
                  )}
                {makeInstallmentReq ? (
                  <View style={[CommonStyle.loadingStyle]}>
                    <ActivityIndicator size="large" color="white" />
                  </View>
                ) : bookingData && bookingData.type === 'online' ? (
                  <Button
                    title={
                      bookingData && bookingData.status === 3
                        ? 'CANCELD BY STYLIST'
                        : bookingData && bookingData.status === 2
                        ? 'PAY NOW'
                        : bookingData && bookingData.status === 5
                        ? 'BOOKING CONFIRMED'
                        : bookingData && bookingData.status === 6
                        ? 'PAY NOW'
                        : bookingData && bookingData.status === 7
                        ? 'CLOSED'
                        : '      '
                    }
                    onSubmit={
                      (bookingData &&
                        bookingData.status === 2 &&
                        this.onSubmit) ||
                      (bookingData && bookingData.status === 6 && this.onSubmit)
                    }
                    navigation={navigation}
                    marginBottom={1}
                  />
                ) : (
                  <Button
                    title={
                      bookingData && bookingData.status === 3
                        ? 'CANCELD BY STYLIST'
                        : bookingData && bookingData.status === 2
                        ? 'BOOKING CONFIRMED'
                        : bookingData && bookingData.status === 6
                        ? 'MARK COMPLETE'
                        : bookingData && bookingData.status === 7
                        ? 'CLOSED'
                        : ''
                    }
                    onSubmit={
                      bookingData &&
                      bookingData.status === 6 &&
                      this.changeStatus()
                    }
                    navigation={navigation}
                    marginBottom={1}
                  />
                )}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}
const priceComp = (amount, type, status) => {
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
                  fontSize: 14,
                  fontFamily: Fonts.Lato_Bold,
                },
              ]}>
              {status === 2 ? 'Booking Amount' : 'Amount to be Paid'}
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
                  fontSize: 14,
                  fontFamily: Fonts.Lato_Bold,
                },
              ]}>
              {status === 2 ? 'Advanced Amount' : 'Already Paid Amount'}
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
                fontSize: 14,
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
const paymentMethod = (amount, type) => {
  return (
    <View style={[CommonStyle.inputCont, {width: '100%'}]}>
      <Text style={styles.labelStyle}>PAYMENT METHOD</Text>
      <View style={styles.payContainer}>
        <Text style={styles.cashStyle}>{type}</Text>
        <Text
          style={[
            CommonStyle.viewAllFont,
            {width: '30%', marginTop: 0, padding: 10},
          ]}>
          ${amount}.0
        </Text>
      </View>
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    userInfo: state.SignupReducer.userInfo,
    makeInstallmentReq: state.AppointmentReducer.makeInstallment,
    makeInstallmentSuccess: state.AppointmentReducer.makeInstallmentSuccess,
    makeInstallmentFailure: state.AppointmentReducer.makeInstallmentFailure,
    makeInstallmentFailureMessage:
      state.AppointmentReducer.makeInstallmentFailureMessage,
    getAppointmentDetailReq: state.AppointmentReducer.getAppointmentDetail,
    getAppointmentDetailSuccess:
      state.AppointmentReducer.getAppointmentDetailSuccess,
    appointmentDetail: state.AppointmentReducer.appointmentDetail,
  };
};

const mapDispatchToProps = (dispatch) => ({
  makeInstallmentPayment: (data) => dispatch(makeInstallmentPayment(data)),
  getAppointmentDetail: (data) => dispatch(getAppointmentDetail(data)),
  getStylistAppointment: (data) => dispatch(getStylistAppointment(data)),
  getCustomerAppointment: (data) => dispatch(getCustomerAppointment(data)),
  changeAppointmentStatus: (data) => dispatch(changeAppointmentStatus(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PaymentComplete);
