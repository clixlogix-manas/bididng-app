/* eslint-disable radix */
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
  Alert,
  Platform,
} from 'react-native';
import {Images, Fonts, Colors} from '../../../constants';
import CommonStyle from '../../../constants/Style';
import Calendar from '../../../components/CalendarComp';
import Button from '../../../components/Button';
import {connect} from 'react-redux';
import moment from 'moment';
import {
  getAppointmentSlot,
  getAvailableDays,
} from '../../../redux/actions/appointmentAction';
import Spinner from 'react-native-loading-spinner-overlay';
import {SafeAreaInsetsContext} from 'react-native-safe-area-context';
const {height, width} = Dimensions.get('window');

class BookingShedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: moment(new Date()).format('DD/MM/YYYY'),
      showSelectedDate: new Date(),
      selectedSlot: '',
      selecteSlotIndex: null,
      slotArray: null,
    };
  }
  componentDidMount() {
    const {route} = this.props;
    let formdata = new FormData();
    formdata.append('booking_date', this.state.selectedDate);
    let id = route.params.stylistData.id
      ? route.params.stylistData.id
      : route.params.stylistData.user_id;
    formdata.append('provider_id', id);
    formdata.append('service_id', route.params.item.id);
    this.props.getAppointmentSlot(formdata);
    let newformdata = new FormData();
    newformdata.append(
      'stylist_id',
      this.props.route.params.stylistData.user_id,
    );
    newformdata.append('year', moment().format('YYYY'));
    newformdata.append('month', moment().format('MM'));
    this.props.getAvailableDays(newformdata);
  }
  onSlotPress = (index, item) => {
    let dateArr = [];
    let service = item.item;
    let serviceArr = [];
    serviceArr.push(item.item);
    for (
      let i = index;
      i < index + this.props.route.params.item.service_duration / 30;
      i++
    ) {
      dateArr.push(this.props.appointmentSlot.total_slots[i]);
      let secondElem;
      if (service.split(':')[1] === '00') {
        let newItem = (
          parseFloat(service.split(':')[0] + '.' + service.split(':')[1]) + 0.3
        ).toFixed(2);
        secondElem = newItem.split('.')[0] + ':' + newItem.split('.')[1];
      } else if (service.split(':')[1] === '30') {
        secondElem = parseFloat(service.split(':')[0]) + 1 + ':00';
      }
      service = secondElem;
      serviceArr.push(secondElem);
    }
    let validArr = serviceArr.filter((slot) => {
      if (!this.props.appointmentSlot.total_slots.includes(slot)) {
        return slot;
      }
    });
    if (validArr.length > 0) {
      this.setState({
        selecteSlotIndex: index,
        selectedSlot: '',
        slotArray: null,
      });
      Alert.alert(
        'Hair Biddy',
        'Slot is not available....',
        [{text: 'OK', onPress: () => {}}],
        {cancelable: true},
      );
    } else {
      this.setState({
        selecteSlotIndex: index,
        selectedSlot: item,
        slotArray: dateArr,
      });
    }
  };
  renderFirstItem = (firstItem, item) => {
    let tempFirst;
    if (parseInt(item.item.split(':')[0]) < 12) {
      let newtempFirst = firstItem + '.' + item.item.split(':')[1];
      return (tempFirst =
        newtempFirst.split('.')[0] + ':' + newtempFirst.split('.')[1] + ' AM');
    } else {
      if (
        parseInt(item.item.split(':')[0]) === 12 &&
        item.item.split(':')[1] === '00'
      ) {
        let newtempFirst = firstItem + '.' + item.item.split(':')[1];
        return (tempFirst =
          newtempFirst.split('.')[0] +
          ':' +
          newtempFirst.split('.')[1] +
          ' AM');
      } else {
        let newtempFirst = firstItem + '.' + item.item.split(':')[1];
        // eslint-disable-next-line no-unused-vars
        return (tempFirst =
          newtempFirst.split('.')[0] +
          ':' +
          newtempFirst.split('.')[1] +
          ' PM');
      }
    }
  };
  renderSecondItem = (firstItem, item) => {
    let tempSecond;
    if (parseInt(item.item.split(':')[0]) < 12) {
      let secnewItem = (
        parseFloat(firstItem + '.' + item.item.split(':')[1]) + 0.3
      ).toFixed(2);
      return (tempSecond =
        secnewItem.split('.')[0] + ':' + secnewItem.split('.')[1] + ' AM');
    } else {
      let secnewItem = (
        parseFloat(firstItem + '.' + item.item.split(':')[1]) + 0.3
      ).toFixed(2);
      // eslint-disable-next-line no-unused-vars
      return (tempSecond =
        secnewItem.split('.')[0] + ':' + secnewItem.split('.')[1] + ' PM');
    }
  };
  renderSlot = (item, index) => {
    let firstItem =
      parseInt(item.item.split(':')[0]) <= 12
        ? parseInt(item.item.split(':')[0])
        : parseInt(item.item.split(':')[0]) - 12;
    let tempSecond;
    let tempFirst;
    if (item.item.split(':')[1] === '00') {
      let firstDateItem = this.renderFirstItem(firstItem, item);
      tempFirst = firstDateItem;
      let secondDateItem = this.renderSecondItem(firstItem, item);
      tempSecond = secondDateItem;
    } else if (item.item.split(':')[1] === '30') {
      if (parseInt(item.item.split(':')[0]) < 12) {
        tempSecond = parseFloat(firstItem) + 1 + ':00' + ' AM';
      } else {
        if (firstItem === 12) {
          tempSecond = 1 + ':00' + ' PM';
        } else {
          tempSecond = parseFloat(firstItem) + 1 + ':00' + ' PM';
        }
      }

      let firstDateItem = this.renderFirstItem(firstItem, item);
      tempFirst = firstDateItem;
    }
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => this.onSlotPress(item.index, item)}>
        <View
          style={[
            styles.slotCont,
            {
              backgroundColor:
                this.state.slotArray && this.state.slotArray.includes(item.item)
                  ? Colors.Pink
                  : Colors.White,
              borderColor:
                this.state.slotArray && this.state.slotArray.includes(item.item)
                  ? Colors.BorderPink
                  : Colors.ImageColor,
            },
          ]}>
          <Text style={styles.slotText}>
            {tempFirst} - {tempSecond}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  filterAppointmentSlot = (date) => {
    const {route} = this.props;
    let formdata = new FormData();
    this.setState({
      selectedDate: moment(date).format('DD/MM/YYYY'),
      showSelectedDate: date,
    });
    let id = route.params.stylistData.id
      ? route.params.stylistData.id
      : route.params.stylistData.user_id;
    formdata.append('booking_date', moment(date).format('DD/MM/YYYY'));
    formdata.append('provider_id', id);
    formdata.append('service_id', route.params.item.id);
    this.props.getAppointmentSlot(formdata);
  };
  onSubmit = () => {
    if (this.state.selectedSlot !== '') {
      this.props.navigation.navigate('ReviewBooking', {
        serviceData: {
          item: this.props.route.params.item,
          stylist: this.props.route.params.stylistData,
          selectedDate: this.state.selectedDate,
          showSelectedDate: moment(this.state.showSelectedDate).format(
            'DD MMM YYYY',
          ),
          selectedSlot: this.state.selectedSlot,
        },
      });
    } else {
      Alert.alert(
        'Hair Biddy',
        'No Slot selected !! ',
        [{text: 'OK', onPress: () => {}}],
        {cancelable: true},
      );
    }
  };
  onMonthChange = (month) => {
    let formdata = new FormData();
    formdata.append('stylist_id', this.props.route.params.stylistData.user_id);
    formdata.append('year', month.year);
    formdata.append('month', month.month);
    this.props.getAvailableDays(formdata);
  };
  render() {
    const {
      navigation,
      appointmentSlot,
      getAppointmentSlotReq,
      getAvailableDaysReq,
      availableDays,
    } = this.props;
    return (
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Spinner
          visible={getAppointmentSlotReq || getAvailableDaysReq}
          textContent={'Loading...'}
          textStyle={{color: Colors.BackgroundGray}}
        />
        <View style={styles.backgroundStyle}>
          <SafeAreaInsetsContext.Consumer>
            {(insets) => (
              <View
                style={[
                  styles.notifyCont,
                  // eslint-disable-next-line react-native/no-inline-styles
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

                <Text style={[styles.welcomeName, styles.welcomeName2]}>
                  Appointments{' '}
                </Text>
                <Text style={[styles.welcomeName, styles.welcomeName1]}> </Text>
              </View>
            )}
          </SafeAreaInsetsContext.Consumer>
        </View>
        <View style={styles.profileCard}>
          <Calendar
            onDateSelect={(date) => this.filterAppointmentSlot(date)}
            onMonthChange={this.onMonthChange}
            selectedDate={this.state.showSelectedDate}
            DateArr={availableDays && availableDays.dates}
          />
        </View>
        <View style={styles.slotCont1}>
          <Text style={[CommonStyle.dayText, styles.slottext1]}>
            Select Appointments Slot
          </Text>
          {appointmentSlot &&
          appointmentSlot.total_slots &&
          appointmentSlot.total_slots.length > 0 ? (
            <FlatList
              data={appointmentSlot.total_slots}
              renderItem={(item, index) => this.renderSlot(item, index)}
              keyExtractor={(item) => item}
              horizontal={true}
            />
          ) : (
            <Text style={styles.textSty}>
              No Slot Available ! Try changing date or choose another
              Stylist...!
            </Text>
          )}
        </View>
        <View style={styles.ButtonCont}>
          <Button
            title={'NEXT'}
            onSubmit={this.onSubmit}
            navigation={navigation}
          />
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  backgroundStyle: {
    height: Platform.OS === 'android' ? height / 3 + 20 : height / 4 + 20,
    width,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  ButtonCont: {
    width: '100%',
    paddingHorizontal: 20,
  },
  container: {
    height,
    flex: 1,
  },
  textSty: {
    fontFamily: Fonts.Lato_Bold,
    fontSize: 15,
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  BackArrowSty: {
    height: 20.5,
    width: 12,
    tintColor: Colors.mediumGray,
  },
  slotCont1: {
    width: '100%',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  welcomeName1: {
    fontSize: 16,
  },
  welcomeName2: {
    marginLeft: -15,
    color: Colors.Black,
  },
  slottext1: {
    textAlign: 'left',
  },
  profileCard: {
    marginHorizontal: 20,
    width: '100%',
    backgroundColor: '#ffffff',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
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
  welcomeName: {
    fontSize: 18,
    color: Colors.White,
    fontFamily: Fonts.Lato_Medium,
  },
  slotCont: {
    width: 160,
    height: 45,
    borderRadius: 50,
    borderWidth: 1,
    margin: 10,
    marginTop: 30,
    marginBottom: 30,
    marginLeft: 0,
  },
  slotText: {
    fontSize: 14,
    fontFamily: Fonts.Lato_Medium,
    padding: 10,
    textAlign: 'center',
  },
});

const mapStateToProps = (state) => {
  return {
    getAppointmentSlotReq: state.AppointmentReducer.getAppointmentSlot,
    getAppointmentSlotSuccess:
      state.AppointmentReducer.getAppointmentSlotSuccess,
    appointmentSlot: state.AppointmentReducer.appointmentSlot,
    getAvailableDaysReq: state.AppointmentReducer.getAvailableDays,
    getAvailableDaysSuccess: state.AppointmentReducer.getAvailableDaysSuccess,
    availableDays: state.AppointmentReducer.availableDays,
  };
};
const mapDispatchToProps = (dispatch) => ({
  getAppointmentSlot: (data) => dispatch(getAppointmentSlot(data)),
  getAvailableDays: (data) => dispatch(getAvailableDays(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(BookingShedule);
