import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Fonts, Colors} from '../../constants';
import CommonStyle from '../../constants/Style';
import moment from 'moment';
import axios from 'axios';
import {stylistBasepath} from '../../constants/Config';
import AsyncStorage from '@react-native-community/async-storage';
import Images from '../../constants/Images';

class NotificationItem extends Component {
  constructor() {
    super();
    this.state = {
      imageErr: false,
      imageSno: '',
    };
  }
  onNotificationRead = async () => {
    const {notiId, userType, viewStatus, booking_id} = this.props;
    let token = await AsyncStorage.getItem('loginToken');
    if (viewStatus === 0) {
      let formdata = new FormData();
      formdata.append('notification_id', notiId);
      try {
        axios
          .post(stylistBasepath + 'view_notification', formdata, {
            headers: {
              Authorization: 'Bearer ' + token,
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
          })
          .then((res) => {
            this.props.navigation.navigate('PaymentComplete', {
              booking_id: booking_id,
              userType: userType,
            });
          });
      } catch (error) {}
    } else {
      this.props.navigation.navigate('PaymentComplete', {
        booking_id: booking_id,
        userType: userType,
      });
    }
  };
  render() {
    const {title, image, date, userType, notiId, booking_id, item} = this.props;
    return (
      <View style={styles.Container}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            if (item.type === 'tag') {
              this.props.navigation.navigate('ViewNotifyImage', {
                data: item.tag_image_id,
                userType: item.type,
              });
            } else if (userType === 'Customer') {
              this.props.navigation.navigate('PaymentComplete', {
                booking_id: booking_id,
                userType: userType,
              });
            }
          }}>
          <View style={[CommonStyle.viewAllCont, styles.SubCont]}>
            {this.state.imageErr && this.state.imageSno === notiId ? (
              <Image
                source={Images.CustomerHomeIcon.NoProfilePic}
                style={styles.ImageView}
              />
            ) : (
              <Image
                onError={() =>
                  this.setState({imageErr: true, imageSno: notiId})
                }
                source={{uri: image}}
                style={styles.ImageView}
              />
            )}
            <View style={styles.DescriptionView}>
              <Text style={styles.userCont}>{title}</Text>
              <Text style={[styles.subText]}>
                description {'  '}
                <Text style={styles.DateText}>
                  {moment(date).startOf('minute').fromNow()}
                </Text>
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  Container: {
    paddingLeft: 10,
    borderRadius: 10,
  },
  DescriptionView: {
    alignItems: 'flex-start',
    height: 60,
    marginLeft: 15,
    flex: 1,
  },
  DateText: {
    marginTop: 3,
    textAlign: 'center',
    color: Colors.BorderGray,
  },
  ImageView: {
    height: 60,
    width: 60,
    borderRadius: 100,
  },
  SubCont: {
    justifyContent: 'center',
    margin: 20,
    marginLeft: 0,
  },
  userCont: {
    color: Colors.Black,
    fontFamily: Fonts.HeveticaNowText_Medium,
    fontSize: 15,
  },
  subText: {
    color: Colors.textDarkGray,
    fontFamily: Fonts.HeveticaNowText_Regular,
    fontSize: 14,
    textAlign: 'left',
    marginTop: 3,
    paddingRight: 5,
  },
});
export default NotificationItem;
