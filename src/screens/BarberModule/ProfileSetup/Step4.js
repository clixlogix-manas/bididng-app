/* eslint-disable radix */
import React, {Component} from 'react';
import {
  View,
  Text,
  Dimensions,
  Image,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
} from 'react-native';
import {Images} from '../../../constants';
import CommonStyle from '../../../constants/Style';
import CalenderCard from '../../../components/CalendarCard';
import Button from '../../../components/Button';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import {addStylistWorkHour} from '../../../redux/actions/authAction';
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
const {height, width} = Dimensions.get('window');

class Step4 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      MonStatus: true,
      TuesStatus: true,
      WednesStatus: true,
      ThrusStatus: true,
      FriStatus: true,
      SaturStatus: true,
      SunStatus: true,
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

  handleOnToogleChange = (name, status) => {
    this.setState({
      [name]: !this.state[name],
    });
  };
  handleOnZoneChange = (day, name, type, zone) => {
    console.log(name, type, zone);
    if (name === 'WORKING TIME') {
      console.log('innn1', this.state.workHours);
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
        let all_entries = {all_entry: filterHour};
        this.props.addStylistWorkHour(all_entries);
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
    if (this.props.addWorkHourFailure !== prevProps.addWorkHourFailure) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        addworkhourErrorMsg: this.props.addWorkHourFailureMessage,
      });
    } else if (this.props.addWorkHourSuccess !== prevProps.addWorkHourSuccess) {
      let token = await AsyncStorage.getItem('temploginToken');
      let userType = await AsyncStorage.getItem('temploggedUserType');
      AsyncStorage.clear();
      await AsyncStorage.setItem('loginToken', token);
      await AsyncStorage.setItem('loggedUserType', userType);
      this.props.navigation.reset({
        index: 0,
        routes: [
          {
            name: 'WelcomeScreen',
            params: {userType: 'Barber'},
          },
        ],
      });
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        addworkhourErrorMsg: '',
      });
    }
  }
  render() {
    const {navigation, addWorkHour} = this.props;
    return (
      <SafeAreaView>
        <ImageBackground
          // source={Images.ProfileBuildIcon.ProfileBackground}
          style={styles.ImageBackCont}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.ScrollViewStyle}>
            <View style={styles.headerCont}>
              <View style={styles.backArrowCont}>
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => navigation.goBack()}>
                  <Image
                    source={Images.SignUpIcon.BackArrow}
                    style={[CommonStyle.backArrow, styles.BackArrowStyle]}
                  />
                </TouchableOpacity>
              </View>
              <Text style={[CommonStyle.logoText, styles.Step4_text]}>
                Step 4
              </Text>
            </View>
            <View style={[CommonStyle.subContainer]}>
              <View style={styles.headingCont}>
                <Text style={CommonStyle.startedText}>Appointment</Text>
                <Text style={CommonStyle.signupText}>
                  {'Set up your availability'}
                </Text>
              </View>
              <FlatList
                data={this.state.workDay}
                scrollEnabled={false}
                nestedScrollEnabled={true}
                showsVerticalScrollIndicator={false}
                renderItem={({item, index}) => {
                  let workstart = '';
                  let workend = '';
                  let breakstart = '';
                  let breakend = '';
                  let workstartzone = 'am';
                  let breakstartzone = 'am';
                  let workendzone = 'pm';
                  let breakendzone = 'pm';
                  if (this.state.workHours.length > 0) {
                    this.state.workHours.map((work) => {
                      if (work.day === item.day + 'day') {
                        if (work.work_start) {
                          workstart = work.work_start;
                        }
                        if (work.work_end) {
                          workend = work.work_end;
                        }
                        if (work.break_start) {
                          breakstart = work.break_start;
                        }
                        if (work.break_end) {
                          breakend = work.break_end;
                        }
                        if (work.work_start_zone) {
                          workstartzone = work.work_start_zone;
                        }
                        if (work.work_end_zone) {
                          workendzone = work.work_end_zone;
                        }
                        if (work.break_start_zone) {
                          breakstartzone = work.break_start_zone;
                        }
                        if (work.break_end_zone) {
                          breakendzone = work.break_end_zone;
                        }
                      }
                    });
                  }
                  return (
                    <CalenderCard
                      day={item.day + 'day'}
                      name={item.day + 'Status'}
                      workStart={workstart}
                      workEnd={workend}
                      workStartZone={workstartzone}
                      workEndZone={workendzone}
                      breakStartZone={breakstartzone}
                      breakEndZone={breakendzone}
                      timeList={list}
                      endTimeList={list}
                      breakStart={breakstart}
                      breakEnd={breakend}
                      handleOnZoneChange={this.handleOnZoneChange}
                      handleOnChange={this.handleOnChange}
                      status={this.state[item.day + 'Status']}
                      onToogleChange={this.handleOnToogleChange}
                    />
                  );
                }}
                contentContainerStyle={styles.contentContainerSty}
                keyExtractor={(item) => item.day}
                numColumns={1}
              />
              <View style={styles.ButtonCont}>
                {addWorkHour ? (
                  <View style={CommonStyle.loadingStyle}>
                    <ActivityIndicator size="large" color="white" />
                  </View>
                ) : (
                  <Button
                    title={'NEXT'}
                    onSubmit={this.onSubmit}
                    navigation={navigation}
                  />
                )}
              </View>
            </View>
          </ScrollView>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  contentContainerSty: {
    justifyContent: 'flex-start',
    alignSelf: 'center',
  },
  ButtonCont: {
    paddingHorizontal: 30,
    marginBottom: 20,
  },
  headingCont: {
    // marginTop: -35,
  },
  Step4_text: {
    textAlign: 'center',
    width: '76%',
  },
  ImageBackCont: {
    width: width,
    backgroundColor: '#F9F9F9',
    height,
  },
  ScrollViewStyle: {
    flex: 1,
    height,
  },
  headerCont: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 10,
    height: 50,
    width: '85%',
    marginBottom: 25,
    alignSelf: 'center',
  },
  BackArrowStyle: {
    marginTop: 16,
  },
  backArrowCont: {
    height: 40,
    width: 40,
  },
});

const mapStateToProps = (state) => {
  return {
    addWorkHourFailureMessage: state.SignupReducer.addWorkHourFailureMessage,
    addWorkHourFailure: state.SignupReducer.addWorkHourFailure,
    addWorkHourSuccess: state.SignupReducer.addWorkHourSuccess,
    addWorkHour: state.SignupReducer.addWorkHour,
  };
};

const mapDispatchToProps = (dispatch) => ({
  addStylistWorkHour: (data) => dispatch(addStylistWorkHour(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Step4);
