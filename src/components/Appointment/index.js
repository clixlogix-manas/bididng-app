import React, {Component} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {Colors, Images, Fonts} from '../../constants';
import CommonStyle from '../../constants/Style';

class Appointment extends Component {
  render() {
    const {user, profession, id, length, service_duration, profile_pic} =
      this.props;
    console.log('profile_pic', profile_pic);
    return (
      <View style={styles.Container}>
        <View style={[CommonStyle.viewAllCont, styles.SubCont]}>
          {/* <View style={styles.dayDateCont}>
            <View style={styles.dayDateTopSubCont}>
              <Text style={styles.textStyle}>
                {moment(new Date(day)).format('DD MMM')}
              </Text>
            </View>
            <View style={styles.dayDateBottomSubCont}>
              <Text style={[styles.textStyle, { fontSize: 12 }]}>
                {time.split(':')[0] > 12
                  ? parseInt(time.split(':')[0]) - 12
                  : time.split(':')[0]}
                :{time.split(':')[1]} {time.split(':')[0] > 12 ? 'PM' : 'AM'}
              </Text>
            </View>
          </View> */}
          <View style={styles.ViewStyle1}>
            <View style={styles.ViewStyle2}>
              <Text style={styles.TimeText}>{'10:00 - 11:00 AM'}</Text>
              <Text style={styles.service_duration_Style}>
                {'(' + service_duration + ' mins' + ')'}
              </Text>
            </View>
            <Text style={styles.userText}>{user}</Text>
            <Text style={[CommonStyle.userCont, styles.professionStyle]}>
              {profession}
            </Text>
          </View>
          <Image source={{uri: profile_pic}} style={styles.profile_picStyle} />
          {/* <Text style={CommonStyle.viewAllFont}>${amount}</Text> */}
        </View>
        {id < length - 1 && <View style={styles.borderLine} />}
        <View style={styles.borderLine} />
        <View style={styles.textView}>
          <Text style={styles.confirmedText}>{'Confirmed'}</Text>
          <View style={styles.ImageCont} />
          <Image source={Images.Appointment.Phone} style={styles.ImageStyle1} />
          <Image
            source={Images.Appointment.MsgBox}
            style={styles.ImageStyle2}
          />
          <Image
            source={Images.Appointment.DotMenu}
            style={styles.ImageStyle3}
          />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  Container: {
    marginTop: 20,
    backgroundColor: Colors.White,
    height: 150,
    borderRadius: 10,
    paddingVertical: 15,
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
    margin: 5,
  },
  ImageCont: {
    flex: 1,
  },
  ImageStyle1: {
    height: 20,
    width: 20,
  },
  ImageStyle2: {
    height: 20,
    width: 20,
    marginStart: 15,
  },
  ImageStyle3: {
    height: 20,
    width: 20,
    marginStart: 15,
    marginEnd: 10,
  },
  confirmedText: {
    fontSize: 15,
    color: '#0FC1B5',
    marginLeft: 10,
  },
  TimeText: {
    fontSize: 14,
    color: '#686868',
    fontStyle: 'italic',
  },
  textView: {
    flexDirection: 'row',
    marginTop: 5,
  },
  profile_picStyle: {
    height: 70,
    width: 70,
    borderRadius: 35,
  },
  ViewStyle1: {
    flex: 0.7,
    alignItems: 'flex-start',
    margin: 2,
  },
  ViewStyle2: {
    flexDirection: 'row',
  },
  userText: {
    color: '#283A58',
    fontFamily: Fonts.HeveticaNowText_Medium,
    fontSize: 15,
    textAlign: 'center',
    marginTop: 6,
    fontWeight: 'bold',
  },
  service_duration_Style: {
    fontSize: 14,
    color: '#686868',
    marginLeft: 10,
    fontStyle: 'italic',
  },
  professionStyle: {
    color: Colors.ButtonColor,
    marginTop: 10,
  },
  SubCont: {
    paddingHorizontal: 15,
  },
  dayDateCont: {
    display: 'flex',
    height: 70,
    width: 70,
    borderRadius: 10,
  },
  dayDateTopSubCont: {
    height: '50%',
    backgroundColor: Colors.Black,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  dayDateBottomSubCont: {
    height: '50%',
    backgroundColor: Colors.LightBlack,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  textStyle: {
    color: Colors.White,
    textAlign: 'center',
    marginTop: 7,
  },
  borderLine: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.BorderGray,
    marginTop: 20,
  },
});
export default Appointment;
