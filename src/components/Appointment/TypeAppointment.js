import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Images, Fonts, Colors} from '../../constants';
import CommonStyle from '../../constants/Style';
class TypeAppointment extends Component {
  render() {
    const {
      navigation,
      user,
      amount,
      profession,
      id,
      time,
      type,
      colorCode,
      userType,
      item,
      length,
    } = this.props;
    console.log('this.props ))', this.props);
    return (
      <View style={styles.Container}>
        <View style={CommonStyle.viewAllCont}>
          <Image source={Images.Appointment.Clock} style={styles.ImageStyle} />
          <View style={styles.Timestyle}>
            <Text
              style={[CommonStyle.userCont, {fontFamily: Fonts.Lato_Semibold}]}>
              {' '}
              {time.split(':')[0] > 12
                ? // eslint-disable-next-line radix
                  parseInt(time.split(':')[0]) - 12
                : time.split(':')[0]}
              :{time.split(':')[1]} {time.split(':')[0] > 12 ? 'PM' : 'AM'}
            </Text>
            <Text
              style={[CommonStyle.userCont, {fontFamily: Fonts.Lato_Semibold}]}>
              {user}
            </Text>
            <Text style={[CommonStyle.userCont, styles.professionText]}>
              {profession}
            </Text>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => {
                if (type === '2nd Install left') {
                  navigation.navigate('Notification', {userType: userType});
                } else if (type !== 'Cancelled') {
                  navigation.navigate('AppointmentByType', {
                    type: type,
                    item: item,
                    userType: userType,
                  });
                }
              }}
              activeOpacity={1}>
              <View style={[styles.typeBtn, {backgroundColor: colorCode}]}>
                <Text style={styles.textStyle}>{type}</Text>
              </View>
            </TouchableOpacity>
            <Text style={CommonStyle.viewAllFont}>$ {amount} .0</Text>
          </View>
        </View>
        {id < length - 1 && <View style={CommonStyle.borderLine} />}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  Container: {
    marginTop: 15,
  },
  ImageStyle: {
    height: 20,
    width: 20,
    marginBottom: 35,
  },
  professionText: {
    color: Colors.LightBlack,
    marginTop: 0,
  },
  Timestyle: {
    flex: 0.7,
    alignItems: 'flex-start',
  },
  textStyle: {
    color: Colors.White,
    textAlign: 'center',
    marginTop: 10,
    fontSize: 13,
    fontFamily: Fonts.Lato_Black,
  },
  typeBtn: {
    width: 110,
    height: 35,
    borderRadius: 50,
    backgroundColor: 'red',
  },
});
export default TypeAppointment;
