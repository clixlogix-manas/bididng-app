import React, {Component} from 'react';
import {Platform, Dimensions} from 'react-native';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Colors} from '../../constants';
import CommonStyle from '../../constants/Style';
const {height, width} = Dimensions.get('window');
class StylistService extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalStatus: false,
      itemId: null,
    };
  }

  render() {
    const {navigation, item, template, stylist, type} = this.props;
    let timeValue;
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
    if (template === 2) {
      return (
        <View style={styles.serviceCard2}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              if (type === 'preview') {
              } else if (type === 'guest') {
                navigation.navigate('SignIn', {
                  userType: 'Customer',
                });
              } else {
                navigation.navigate('BookingShedule', {
                  item: item,
                  stylistData: stylist,
                });
              }
            }}>
            <View style={styles.LabelStyle}>
              <View style={styles.NameStyle}>
                <Text style={CommonStyle.serviceLabelStyle}>{item.name}</Text>

                <Text style={[CommonStyle.userCont, styles.TimeStyle]}>
                  {item.service_duration > 60
                    ? timeValue
                    : item.service_duration === 60
                    ? '1 Hour'
                    : item.service_duration + ' Min'}
                </Text>
              </View>
              <View style={styles.ChargeStyle}>
                <Text
                  style={[CommonStyle.serviceLabelStyle, styles.ChargeText]}>
                  ${item.service_charge}.0
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={styles.serviceCard}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              if (type === 'preview') {
              } else if (type === 'guest') {
                navigation.navigate('SignIn', {
                  userType: 'Customer',
                });
              } else {
                navigation.navigate('BookingShedule', {
                  item: item,
                  stylistData: stylist,
                });
              }
            }}>
            <View style={styles.DurationView}>
              <Text style={CommonStyle.serviceLabelStyle}>{item.name}</Text>

              <Text style={[CommonStyle.userCont, styles.DurationText]}>
                {item.service_duration > 60
                  ? timeValue
                  : item.service_duration === 60
                  ? '1 Hour'
                  : item.service_duration + ' Min'}
              </Text>
              <Text
                style={[
                  CommonStyle.serviceLabelStyle,
                  styles.ChargeTextSecond,
                ]}>
                ${item.service_charge}.0
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    }
  }
}
const styles = StyleSheet.create({
  serviceCard2: {
    height: 80,
    width: Platform.OS === 'android' ? 340 : '99%',
    backgroundColor: Colors.White,
    alignSelf: 'center',
    borderRadius: 10,
    margin: 5,
    elevation: 2,
    shadowRadius: 2,
    shadowOpacity: 0.2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
  },
  serviceCard: {
    height: Platform.OS === 'android' ? 100 : 110,
    width: Platform.OS === 'android' ? 163 : width / 2 - 20,
    backgroundColor: Colors.White,
    borderRadius: 10,
    margin: 5,
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 2,
  },
  LabelStyle: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  NameStyle: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: '70%',
  },
  TimeStyle: {
    color: Colors.LightBlack,
    textAlign: 'left',
  },
  ChargeStyle: {
    width: '30%',
    alignItems: 'flex-end',
  },
  ChargeText: {
    color: Colors.Red,
    marginTop: 6,
  },
  DurationView: {
    padding: 20,
  },
  DurationText: {
    color: Colors.ButtonColor,
    textAlign: 'left',
  },
  ChargeTextSecond: {
    color: Colors.ButtonColor,
    marginTop: 6,
  },
});

export default StylistService;
