/* eslint-disable radix */
/* eslint-disable no-undef */
import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
} from 'react-native';
import {Images, Fonts} from '../../constants';
import CommonStyle from '../../constants/Style';
import CalenderCard from '../../components/CalendarCard';
import Button from '../../components/Button';
import {connect} from 'react-redux';
import {
  addStylistWorkHour,
  fetchStylistDetails,
} from '../../redux/actions/authAction';
import AsyncStorage from '@react-native-community/async-storage';
import {SafeAreaInsetsContext} from 'react-native-safe-area-context';
import SafeAreaView from 'react-native-safe-area-view';
const list = [
  {
    label: '1',
    value: '1',
  },
  {
    label: '2',
    value: '2',
  },
  {
    label: '3',
    value: '3',
  },
  {
    label: '4',
    value: '4',
  },
  {
    label: '5',
    value: '5',
  },
  {
    label: '6',
    value: '6',
  },
  {
    label: '7',
    value: '7',
  },
  {
    label: '8',
    value: '8',
  },
  {
    label: '9',
    value: '9',
  },
  {
    label: '10',
    value: '10',
  },
  {
    label: '11',
    value: '11',
  },
  {
    label: '12',
    value: '12',
  },
];
// const {height, width} = Dimensions.get('window');

class ShopWorkHour extends Component {
  constructor(props) {
    super(props);
    this.state = {
      MonStatus: false,
      TuesStatus: false,
      WednesStatus: false,
      ThrusStatus: false,
      FriStatus: false,
      SaturStatus: false,
      SunStatus: false,
      workHours: [],
      workDay: [
        {
          day: 'Mon',
        },
        {
          day: 'Tues',
        },
        {
          day: 'Wednes',
        },
        {
          day: 'Thrus',
        },
        {
          day: 'Fri',
        },
        {
          day: 'Satur',
        },
        {
          day: 'Sun',
        },
      ],
      listItem: [],
      addworkhourErrorMsg: '',
    };
  }
  async componentDidMount() {
    // const { userInfo } = this.props;
    let userInfo = this.props.userInfo;
    console.log('hourse data userInfo', userInfo);
    if (userInfo && userInfo.time_table) {
      let info = userInfo.time_table;
      let initialArray = [];
      info.map((workhour) => {
        let filterList = list.filter((key, index) => {
          let sentData;
          if (parseInt(key.value) > parseInt(workhour.work_start)) {
            sentData = key;
          }
          return sentData;
        });
        console.log('workhour filterList', filterList);
        console.log('workhour.work_start', workhour.work_start);
        dayStr = workhour.day.split('day')[0];
        this.setState({[dayStr + 'Status']: true});
        initialArray.push({
          listItem: filterList,
          day: workhour.day,
          break_end: workhour.break_end.includes(':')
            ? workhour.break_end.split(':')[0]
            : workhour.break_end.split(' ')[0],
          break_end_zone: workhour.break_end.split(' ')[1].toLowerCase(),
          break_start: workhour.break_start.includes(':')
            ? workhour.break_start.split(':')[0]
            : workhour.break_start.split(' ')[0],
          break_start_zone: workhour.break_start.split(' ')[1].toLowerCase(),
          work_end: workhour.work_end.includes(':')
            ? workhour.work_end.split(':')[0]
            : workhour.work_end.split(' ')[0],
          work_end_zone: workhour.work_end.split(' ')[1].toLowerCase(),
          work_start: workhour.work_start.includes(':')
            ? workhour.work_start.split(':')[0]
            : workhour.work_start.split(' ')[0],
          work_start_zone: workhour.work_start.split(' ')[1].toLowerCase(),
        });
      });
      // eslint-disable-next-line react/no-did-mount-set-state
      this.setState({
        workHours: initialArray,
      });
      console.log('initialArray ****', initialArray);
    }
  }
  handleOnToogleChange = (name, status) => {
    this.setState({
      [name]: !this.state[name],
    });
  };

  handleOnZoneChange = (day, name, type, zone) => {
    console.log('==>', name, type);
    if (name === 'WORKING TIME') {
      if (this.state.workHours.length > 0) {
        let existDay = this.state.workHours.filter((key, index) => {
          return key.day.toLowerCase() === day.toLowerCase();
        });
        if (existDay.length > 0) {
          let items = [...this.state.workHours];
          let item = {...existDay[0]};

          if (type === 'start') {
            existDay[0]['work_' + type + '_zone'] = zone;
            existDay[0] = item;
          } else {
            existDay[0]['work_' + type + '_zone'] = zone;
            existDay[0] = item;
          }
          this.setState({workHours: items});
        } else {
          Alert.alert(
            'Hair Biddy',
            'Please select ' + type + ' time first',
            [{text: 'OK', onPress: () => {}}],
            {cancelable: true},
          );
        }
      } else {
        Alert.alert(
          'Hair Biddy',
          'Please select ' + type + ' time first',
          [{text: 'OK', onPress: () => {}}],
          {cancelable: true},
        );
      }
    } else if (name === 'BREAK TIME') {
      if (this.state.workHours.length > 0) {
        let existDay = this.state.workHours.filter((key, index) => {
          return key.day.toLowerCase() === day.toLowerCase();
        });
        if (existDay.length > 0) {
          let items = [...this.state.workHours];
          let item = {...existDay[0]};
          if (type === 'end') {
            existDay[0]['break_' + type + '_zone'] = zone;
            existDay[0] = item;
          } else {
            existDay[0]['break_' + type + '_zone'] = zone;
            existDay[0] = item;
          }
          this.setState({workHours: items});
        } else {
          Alert.alert(
            'Hair Biddy',
            'Please select ' + type + ' time first',
            [{text: 'OK', onPress: () => {}}],
            {cancelable: true},
          );
        }
      } else {
        Alert.alert(
          'Hair Biddy',
          'Please select ' + type + ' time first',
          [{text: 'OK', onPress: () => {}}],
          {cancelable: true},
        );
      }
    }
  };

  handleOnChange = (day, type, name, value, zone) => {
    if (name === 'WORKING TIME') {
      if (this.state.workHours.length > 0) {
        let existDay = this.state.workHours.filter((key, index) => {
          return key.day.toLowerCase() === day.toLowerCase();
        });
        if (existDay.length > 0) {
          let items = [...this.state.workHours];
          let item = {...existDay[0]};

          let filterList;
          if (type === 'start') {
            filterList = list.filter((key, index) => {
              let sentData;
              if (parseInt(key.value) > parseInt(value)) {
                sentData = key;
              }
              return sentData;
            });
            existDay[0]['work_' + type] = value;
            existDay[0]['work_' + type + '_zone'] = zone;
            existDay[0].listItem = filterList;
            existDay[0] = item;
          } else {
            existDay[0]['work_' + type] = value;
            existDay[0]['work_' + type + '_zone'] = zone;
            existDay[0] = item;
          }
          this.setState({workHours: items});
        } else {
          let filterList;
          if (type === 'start') {
            filterList = list.filter((key, index) => {
              let sentData;
              if (parseInt(key.value) > parseInt(value)) {
                sentData = key;
              }
              return sentData;
            });
          }
          this.setState({
            workHours: [
              ...this.state.workHours,
              {
                day: day,
                ['work_' + type]: value,
                ['work_' + type + '_zone']: zone,
                listItem: filterList,
              },
            ],
          });
        }
      } else {
        let filterList;
        if (type === 'start') {
          filterList = list.filter((key, index) => {
            let sentData;
            if (parseInt(key.value) > parseInt(value)) {
              sentData = key;
            }
            return sentData;
          });
        }
        this.setState({
          workHours: [
            ...this.state.workHours,
            {
              day: day,
              ['work_' + type]: value,
              ['work_' + type + '_zone']: zone,
              listItem: filterList,
            },
          ],
        });
      }
    } else if (name === 'BREAK TIME') {
      if (this.state.workHours.length > 0) {
        let existDay = this.state.workHours.filter((key, index) => {
          return key.day.toLowerCase() === day.toLowerCase();
        });
        if (existDay.length > 0) {
          let items = [...this.state.workHours];
          let item = {...existDay[0]};

          if (type === 'start') {
            let filterList = list.filter((key, index) => {
              let sentData;
              if (parseInt(key.value) > parseInt(value)) {
                sentData = key;
              }
              return sentData;
            });
            existDay[0]['break_' + type] = value;
            existDay[0]['break_' + type + '_zone'] = zone;
            existDay[0].listItem = filterList;
            existDay[0] = item;
          } else {
            existDay[0]['break_' + type + '_zone'] = zone;
            existDay[0]['break_' + type] = value;
            existDay[0] = item;
          }
          this.setState({workHours: items});
        } else {
          let filterList;
          if (type === 'start') {
            filterList = list.filter((key, index) => {
              let sentData;
              if (parseInt(key.value) > parseInt(value)) {
                sentData = key;
              }
              return sentData;
            });
          }
          this.setState({
            workHours: [
              ...this.state.workHours,
              {
                day: day,
                ['break_' + type]: value,
                ['break_' + type + '_zone']: zone,
                listItem: filterList,
              },
            ],
          });
        }
      } else {
        let filterList;
        if (type === 'start') {
          filterList = list.filter((key, index) => {
            let sentData;
            if (parseInt(key.value) > parseInt(value)) {
              sentData = key;
            }
            return sentData;
          });
        }
        this.setState({
          workHours: [
            ...this.state.workHours,
            {
              day: day,
              ['break_' + type]: value,
              ['break_' + type + '_zone']: zone,
              listItem: filterList,
            },
          ],
        });
      }
    }
  };
  onSubmit = () => {
    const {workHours} = this.state;
    if (workHours.length > 0) {
      let invalidObject = workHours.filter((hour) => {
        let sentHour;
        if (
          Object.keys(hour).length < 5 &&
          this.state[hour.day.split('day')[0] + 'Status']
        ) {
          sentHour = hour;
        }
        return sentHour;
      });

      if (invalidObject.length > 0) {
        Alert.alert(
          'Hair Biddy',
          'There is Incomplete field for ' + invalidObject[0].day,
          [{text: 'OK', onPress: () => {}}],
          {cancelable: true},
        );
      } else {
        let filterHour = this.state.workHours.map((hour) => {
          if (this.state[hour.day.split('day')[0] + 'Status']) {
            return {
              day: hour.day,
              work_start:
                hour.work_start + ' ' + hour.work_start_zone.toUpperCase(),
              work_end: hour.work_end + ' ' + hour.work_end_zone.toUpperCase(),
              break_start:
                hour.break_start + ' ' + hour.break_start_zone.toUpperCase(),
              break_end:
                hour.break_end + ' ' + hour.break_end_zone.toUpperCase(),
            };
          }
        });
        let sentArray = filterHour.filter((value) => {
          return value !== undefined;
        });
        console.log(sentArray);
        if (sentArray.length !== 0) {
          let all_entries = {all_entry: sentArray};
          this.props.updateStylistWorkHour(all_entries);
        } else {
          console.log('cc=>', sentArray);
          Alert.alert(
            'Hair Biddy',
            'Please select atleast one booking day',
            [{text: 'OK', onPress: () => {}}],
            {cancelable: true},
          );
        }
      }
    } else {
      console.log('ww==>', workHours);
      Alert.alert(
        'Hair Biddy',
        'Please select atleast one booking day',
        [{text: 'OK', onPress: () => {}}],
        {cancelable: true},
      );
    }
  };

  async componentDidUpdate(prevProps, prevState) {
    if (this.props.updateWorkHourFailure !== prevProps.updateWorkHourFailure) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        updateworkhourErrorMsg: this.props.updateWorkHourFailureMessage,
      });
    } else if (
      this.props.updateWorkHourSuccess !== prevProps.updateWorkHourSuccess
    ) {
      let token = await AsyncStorage.getItem('loginToken');
      this.props.fetchStylistDetails(token);
      //this.props.navigation.navigate('Profile');
    }
  }
  render() {
    const {navigation, updateWorkHour} = this.props;
    // console.log("props value",this.props);
    return (
      <SafeAreaView style={styles.SafeAreaView_style}>
        <ScrollView style={styles.Cont} showsVerticalScrollIndicator={false}>
          <View style={styles.Cont}>
            <SafeAreaInsetsContext.Consumer>
              {(insets) => (
                <View
                  style={
                    (styles.subView,
                    {
                      marginTop: Platform.OS === 'ios' ? 0 : 10,
                    })
                  }>
                  <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    activeOpacity={1}>
                    <Image
                      source={Images.SignUpIcon.BackArrow}
                      style={[
                        styles.Imagestyle,
                        // eslint-disable-next-line react-native/no-inline-styles
                        {marginLeft: Platform.OS === 'ios' ? 0 : 15},
                      ]}
                    />
                  </TouchableOpacity>
                  <View style={styles.TextView}>
                    <Text style={[CommonStyle.ShopName]}>Appointment </Text>
                    <Text style={styles.textStyle}>
                      Set up your availablity{' '}
                    </Text>
                  </View>
                </View>
              )}
            </SafeAreaInsetsContext.Consumer>
            <View style={[CommonStyle.profileCard2, styles.profileCard2_style]}>
              <View>
                <FlatList
                  data={this.state.workDay}
                  scrollEnabled={false}
                  nestedScrollEnabled={true}
                  showsVerticalScrollIndicator={false}
                  renderItem={({item, index}) => {
                    let entry = this.state.workHours.filter((time) => {
                      console.log('Time log', time);
                      if (
                        time.day.toLowerCase() ===
                        (item.day + 'day').toLowerCase()
                      ) {
                        return item;
                      }
                    });
                    console.log('Entry', entry);
                    console.log('Item', item);

                    if (entry.length > 0) {
                      return (
                        <CalenderCard
                          day={item.day + 'day'}
                          name={item.day + 'Status'}
                          workStart={
                            entry[0] && entry[0].work_start
                              ? entry[0].work_start
                              : ''
                          }
                          workEnd={
                            entry[0] && entry[0].work_end
                              ? entry[0].work_end
                              : ''
                          }
                          workStartZone={
                            entry[0] && entry[0].work_start_zone
                              ? entry[0].work_start_zone
                              : 'am'
                          }
                          workEndZone={
                            entry[0] && entry[0].work_end_zone
                              ? entry[0].work_end_zone
                              : 'pm'
                          }
                          timeList={list}
                          endTimeList={list}
                          breakStart={
                            entry[0] && entry[0].break_start
                              ? entry[0].break_start
                              : ''
                          }
                          breakEnd={
                            entry[0] && entry[0].break_end
                              ? entry[0].break_end
                              : ''
                          }
                          breakStartZone={
                            entry[0] && entry[0].break_start_zone
                              ? entry[0].break_start_zone
                              : 'am'
                          }
                          breakEndZone={
                            entry[0] && entry[0].break_end_zone
                              ? entry[0].break_end_zone
                              : 'pm'
                          }
                          handleOnZoneChange={this.handleOnZoneChange}
                          handleOnChange={this.handleOnChange}
                          status={this.state[item.day + 'Status']}
                          onToogleChange={this.handleOnToogleChange}
                        />
                      );
                    } else {
                      return (
                        <CalenderCard
                          day={item.day + 'day'}
                          name={item.day + 'Status'}
                          workStart={''}
                          workEnd={''}
                          workStartZone={'am'}
                          workEndZone={'pm'}
                          timeList={list}
                          endTimeList={
                            this.state.workHours[index]
                              ? this.state.workHours[index].listItem
                              : list
                          }
                          handleOnZoneChange={this.handleOnZoneChange}
                          breakStartZone={'am'}
                          breakEndZone={'pm'}
                          breakStart={''}
                          breakEnd={''}
                          handleOnChange={this.handleOnChange}
                          status={this.state[item.day + 'Status']}
                          onToogleChange={this.handleOnToogleChange}
                        />
                      );
                    }
                  }}
                  contentContainerStyle={styles.contentContStyle}
                  keyExtractor={(item) => item.day}
                  numColumns={1}
                />
              </View>
              {updateWorkHour ? (
                <View style={CommonStyle.loadingStyle}>
                  <ActivityIndicator size="large" color="white" />
                </View>
              ) : (
                <Button
                  title={'SAVE'}
                  onSubmit={this.onSubmit}
                  navigation={navigation}
                  marginBottom={60}
                />
              )}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  contentContStyle: {
    justifyContent: 'flex-start',
    alignSelf: 'center',
    width: '100%',
  },
  Cont: {
    flex: 1,
  },
  TextView: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    marginTop: -28,
  },
  SafeAreaView_style: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  Imagestyle: {
    height: 20.5,
    width: 12,
    marginTop: 15,
    marginLeft: 15,
  },
  profileCard2_style: {
    paddingHorizontal: 20,
  },
  subView: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    width: '100%',
    alignSelf: 'center',
  },
  textStyle: {
    fontSize: 18,
    marginTop: 10,
    marginBottom: 10,
    fontFamily: Fonts.HeveticaNowText_Regular,
  },
});
const mapStateToProps = (state) => {
  return {
    userInfo: state.SignupReducer.userInfo,
    updateWorkHourFailureMessage: state.SignupReducer.addWorkHourFailureMessage,
    updateWorkHourFailure: state.SignupReducer.addWorkHourFailure,
    updateWorkHourSuccess: state.SignupReducer.addWorkHourSuccess,
    updateWorkHour: state.SignupReducer.addWorkHour,
  };
};

const mapDispatchToProps = (dispatch) => ({
  updateStylistWorkHour: (data) => dispatch(addStylistWorkHour(data)),
  fetchStylistDetails: (data) => dispatch(fetchStylistDetails(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ShopWorkHour);
