/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-did-mount-set-state */
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
  Animated,
  TouchableOpacity,
  FlatList,
  Platform,
} from 'react-native';
import {Images, Fonts, Colors} from '../../../constants';
import DropDownPicker from 'react-native-dropdown-picker';
import TypeAppointment from '../../../components/Appointment/TypeAppointment';
import Calendar from '../../../components/CalendarComp';
import MiniCalendarComp from '../../../components/CalendarComp/miniCalendar';
import {connect} from 'react-redux';
import moment from 'moment';
import {
  getStylistAppointment,
  getCustomerAppointment,
} from '../../../redux/actions/appointmentAction';
import {SafeAreaInsetsContext} from 'react-native-safe-area-context';
const {height, width} = Dimensions.get('window');
import SafeAreaView from 'react-native-safe-area-view';

class AppointmentScreen extends Component {
  constructor(props) {
    super(props);
    this.changeHeight = new Animated.Value(180);
    this.smallCalendarOpacity = new Animated.Value(1);
    this.CalendarOpacity = new Animated.Value(0);

    this.state = {
      appoinmentType: [
        {
          label: 'Select Appointment Type',
          value: 0,
        },
        {
          label: 'Pending',
          value: 1,
        },
        {
          label: 'Upcoming',
          value: 5,
        },
        {
          label: 'Complete',
          value: 7,
        },
      ],
      country: '',
      selectType: 0,
      calendarFull: true,
      appointmentData: null,
      DateArr: [],
      userType: '',
      selectedDate: new Date(),
    };
  }

  renderAppointItem = (itemData) => {
    const {item, index} = itemData;
    return (
      <TypeAppointment
        user={item.customer_name}
        amount={item.service_charge}
        time={item.date_time.split(' ')[1]}
        userType={
          this.props.userType ? this.props.userType : this.state.userType
        }
        day={item.date_time.split(' ')[0]}
        type={
          item.status === 7
            ? 'Complete'
            : item.status === 6
            ? '2nd Install left'
            : item.status === 5
            ? 'Upcoming'
            : item.status === 3
            ? 'Cancelled'
            : item.status === 4
            ? 'Cancelled'
            : item.status === 8
            ? 'Cancelled'
            : item.status === 9
            ? 'Cancelled'
            : item.status === 2 && item.type === 'cash'
            ? 'Upcoming'
            : 'Pending'
        }
        item={item}
        colorCode={
          item.status === 7
            ? Colors.LightBlack
            : item.status === 5
            ? Colors.UpcomingColor
            : item.status === 2 && item.type === 'cash'
            ? Colors.UpcomingColor
            : item.status === 3 ||
              item.status === 4 ||
              item.status === 8 ||
              item.status === 9
            ? Colors.Red
            : Colors.PendingColor
        }
        length={this.state.appointmentData.bookings.length}
        navigation={this.props.navigation}
        profession={item.service_name}
        id={index}
      />
    );
  };

  filterAppointment = (date) => {
    console.log('filterAppointment date>>', date);
    this.setState(
      {
        selectedDate: date,
        selectType: 0,
      },
      () => {
        let formdata = new FormData();
        formdata.append('ondate', moment(new Date(date)).format('YYYY-MM-DD'));
        if (this.state.userType === 'Customer') {
          this.props.getCustomerAppointment(formdata);
        } else {
          this.props.getStylistAppointment(formdata);
          // this.props.getStylistUpcomingAppointment(formdata);
        }
      },
    );
  };

  componentDidMount() {
    console.log('DidMount Appointment data>', this.props.appointmentData);
    console.log('this.state.userType', this.state.userType);
    var current_user_type = '';
    if (this.props.userInfo !== null && this.props.userInfo !== undefined) {
      if (
        this.props.userInfo.user_data &&
        this.props.userInfo.user_data.user_type === 2
      ) {
        console.log('hjhvjhvjhj userType Customer');
        current_user_type = 'Customer';
        this.setState({
          userType: 'Customer',
        });
      } else if (this.props.userInfo.provider.user_type === 3) {
        console.log('hjhvjhvjhj userType Barber');
        current_user_type = 'Barber';
        this.setState({
          userType: 'Barber',
        });
      }
    }

    if (this.props.appointmentData) {
      const {appointmentData} = this.props;
      let sentData = [];
      appointmentData &&
        appointmentData.bookings &&
        appointmentData.bookings.length > 0 &&
        appointmentData.bookings.map((appointment) => {
          sentData.push(appointment.date_time.split(' ')[0]);
        });
      this.setState({
        DateArr: sentData,
      });
    }
    let formdata = new FormData();
    formdata.append('ondate', moment(new Date()).format('YYYY-MM-DD'));
    console.log(
      "moment(new Date('2022-02-14')).format('YYYY-MM-DD')",
      moment(new Date('2022-02-14')).format('YYYY-MM-DD'),
    );
    console.log('this.state.userType', this.state.userType);
    console.log('current_user_type', current_user_type);
    if (current_user_type === 'Customer') {
      this.props.getCustomerAppointment(formdata);
    } else {
      this.props.getStylistAppointment(formdata);
      //this.props.getStylistUpcomingAppointment(formdata);
    }

    this.changeCalendarView();
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('1 Did update Appointment', this.props.appointmentData);
    if (
      this.props.appointmentData !== prevProps.appointmentData &&
      this.props.appointmentData !== null
    ) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        appointmentData: this.props.appointmentData,
      });
    }
    console.log('2 Did update Appointment', this.props.appointmentData);
  }

  changeCalendarView = () => {
    if (!this.state.calendarFull) {
      Animated.timing(this.changeHeight, {
        toValue: 380,
        duration: 100,
        useNativeDriver: false,
      }).start(() =>
        this.setState({calendarFull: true, selectedDate: new Date()}, () => {
          let formdata = new FormData();
          formdata.append(
            'ondate',
            moment(new Date(this.state.selectedDate)).format('YYYY-MM-DD'),
          );
          if (this.state.userType === 'Customer') {
            this.props.getCustomerAppointment(formdata);
          } else {
            this.props.getStylistAppointment(formdata);
          }
        }),
      );
    } else {
      Animated.timing(this.changeHeight, {
        toValue: 380,
        duration: 100,
        useNativeDriver: false,
      }).start(() =>
        this.setState({calendarFull: true, selectedDate: new Date()}, () => {
          let formdata = new FormData();
          formdata.append('ondate', moment(new Date()).format('YYYY-MM-DD'));
          if (this.state.userType === 'Customer') {
            this.props.getCustomerAppointment(formdata);
          } else {
            this.props.getStylistAppointment(formdata);
          }
        }),
      );
    }
  };

  render() {
    const {navigation, appointmentData} = this.props;

    console.log('tyyyy', this.state.userType);

    this.CalendarOpacity = this.changeHeight.interpolate({
      inputRange: [180, 280, 380],
      outputRange: [0, 0.5, 1],
    });
    this.smallCalendarOpacity = this.changeHeight.interpolate({
      inputRange: [180, 280],
      outputRange: [1, 0],
    });
    this.smallCalendarZindex = this.changeHeight.interpolate({
      inputRange: [180, 280],
      outputRange: [1, -1],
    });
    this.fullCalendarZindex = this.changeHeight.interpolate({
      inputRange: [180, 280],
      outputRange: [-1, 1],
    });
    const animatedHeight = {height: this.changeHeight};
    console.log('appointmentData.bookings', appointmentData);
    console.log('appointmentData this.props', this.props);

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView
          style={{height, flex: 1}}
          showsVerticalScrollIndicator={false}>
          {/* <Spinner
            visible={getStylistAppointmentReq}
            textContent={'Loading...'}
            textStyle={{ color: Colors.BackgroundGray }}
          /> */}
          <SafeAreaInsetsContext.Consumer>
            {(insets) => (
              <View style={[styles.notifyCont]}>
                <TouchableOpacity
                  onPress={() => {
                    let formdata = new FormData();
                    formdata.append('ondate', '');
                    if (this.state.userType === 'Customer') {
                      this.props.getCustomerAppointment(formdata);
                    } else {
                      this.props.getStylistAppointment(formdata);
                    }
                    navigation.goBack();
                  }}
                  activeOpacity={1}>
                  {this.state.userType === 'Barber' ? (
                    <Image
                      source={Images.SignUpIcon.BackArrow}
                      style={styles.BackArrowSty}
                    />
                  ) : null}
                </TouchableOpacity>

                <Text style={[styles.welcomeName, {fontSize: 16}]}> </Text>
              </View>
            )}
          </SafeAreaInsetsContext.Consumer>

          <Animated.View
            style={[styles.profileCard, animatedHeight, {marginTop: 20}]}>
            <Animated.View
              style={{
                opacity: this.smallCalendarOpacity,
                position: 'absolute',
                zIndex: this.smallCalendarZindex,
                width: '100%',
                alignItems: 'center',
              }}>
              <MiniCalendarComp
                selectedDate={this.state.selectedDate}
                calendarFull={this.state.calendarFull}
                onDateSelection={(date) => this.filterAppointment(date)}
              />
            </Animated.View>
            <Animated.View
              style={{
                opacity: this.CalendarOpacity,
                zIndex: this.fullCalendarZindex,
                alignItems: 'center',
                position: 'absolute',
                width: '100%',
              }}>
              <Calendar
                onDateSelect={(date) => this.filterAppointment(date)}
                selectedDate={this.state.selectedDate}
                DateArr={this.state.DateArr}
              />
            </Animated.View>
          </Animated.View>
          <View style={styles.viewCont} />
          {/* <View style={styles.iconCont}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                this.changeCalendarView();
              }}>
              <Image
                source={
                  !this.state.calendarFull
                    ? Images.Appointment.DownArrow
                    : Images.Appointment.UpArrow
                }
                style={styles.editIcon}
              />
            </TouchableOpacity>
          </View> */}

          <DropDownPicker
            items={this.state.appoinmentType}
            defaultValue={this.state.selectType}
            placeholder={'Select Appointment Type'}
            containerStyle={styles.appoinmentTypeSty}
            style={{backgroundColor: Colors.BackgroundGray}}
            itemStyle={styles.itemSty}
            labelStyle={styles.labelSty}
            arrowSize={25}
            arrowColor={Colors.ImageColor}
            dropDownStyle={{backgroundColor: Colors.BorderGray}}
            onChangeItem={(item) => {
              if (item.value !== 0) {
                this.setState(
                  {
                    selectType: item.value,
                  },
                  () => {
                    let resp =
                      appointmentData &&
                      appointmentData.bookings &&
                      appointmentData.bookings.filter((data, index) => {
                        if (item.value === data.status) {
                          return data;
                        } else if (
                          item.value === 5 &&
                          data.status === 2 &&
                          data.type === 'cash'
                        ) {
                          return data;
                        } else if (
                          item.value === 1 &&
                          data.status === 2 &&
                          data.type === 'online'
                        ) {
                          return data;
                        }
                      });
                    this.setState({appointmentData: {bookings: resp}});
                  },
                );
              } else {
                this.setState({appointmentData: appointmentData});
              }
            }}
          />
          <View style={styles.FlatListCont}>
            {this.state.appointmentData &&
            this.state.appointmentData.bookings ? (
              <FlatList
                data={this.state.appointmentData.bookings}
                renderItem={(item) => this.renderAppointItem(item)}
                keyExtractor={(item) => item.id.toString()}
              />
            ) : (
              <Text style={styles.NoBooking_Text}>No Booking Available !</Text>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  NoBooking_Text: {
    fontFamily: Fonts.HeveticaNowText_Black,
    fontSize: 14,
    alignSelf: 'center',
    padding: 20,
  },
  itemSty: {
    justifyContent: 'flex-start',
  },
  viewCont: {
    height: 5,
    backgroundColor: Colors.BackgroundGray,
  },
  appoinmentTypeSty: {
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 20,
    height: 70,
    paddingBottom: 20,
    borderRadius: 5,
  },
  BackArrowSty: {
    height: 20.5,
    width: 12,
    marginTop: 15,
  },
  labelSty: {
    color: Colors.SelectColor,
    fontSize: 14,
    marginLeft: 10,
    marginTop: 4,
    fontFamily: Fonts.HeveticaNowText_Black,
  },
  FlatListCont: {
    padding: 40,
    paddingTop: 20,
    minHeight: 160,
    paddingBottom: 200,
  },
  backgroundStyle: {
    height: Platform.OS === 'android' ? height / 3 + 20 : height / 4 + 20,
    width,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  profileCard: {
    width: '90%',
    backgroundColor: '#ffffff',
    alignSelf: 'center',
    borderRadius: 15,
  },
  notifyCont: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
  },
  welcomeName: {
    fontSize: 18,
    color: Colors.Black,
    fontFamily: Fonts.HeveticaNowText_Medium,
  },
  editIcon: {
    height: 45,
    width: 45,
    borderRadius: 100,
  },
  iconCont: {
    height: 45,
    width: 45,
    marginTop: -25,
    marginRight: 30,
    alignSelf: 'flex-end',
  },
});
const mapStateToProps = (state) => {
  return {
    userInfo: state.SignupReducer.userInfo,
    getStylistAppointmentReq: state.AppointmentReducer.getStylistAppointment,
    getStylistAppointmentSuccess:
      state.AppointmentReducer.getStylistAppointmentSuccess,
    appointmentData: state.AppointmentReducer.appointmentData,
  };
};
const mapDispatchToProps = (dispatch) => ({
  getStylistAppointment: (data) => dispatch(getStylistAppointment(data)),
  getCustomerAppointment: (data) => dispatch(getCustomerAppointment(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(AppointmentScreen);
