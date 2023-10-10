import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Fonts, Images, Colors} from '../../constants';
class ProfileItem extends Component {
  render() {
    const {
      icon,
      title,
      navigation,
      path,
      openPopUp,
      userType,
      sizeH,
      sizeW,
      myCustomShare,
    } = this.props;
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          if (path !== undefined) {
            if (path === 'InviteFriends') {
              myCustomShare();
            } else if (path === 'Logout') {
              openPopUp();
            } else {
              navigation.navigate(path, {userType});
            }
          }
        }}>
        <View style={styles.inputCont}>
          <View style={styles.inputStyle}>
            <View style={styles.InnerView}>
              {icon && (
                <Image
                  source={icon}
                  // eslint-disable-next-line react-native/no-inline-styles
                  style={{
                    height: sizeH === 0 ? 23 : 27,
                    width: sizeW === 0 ? 23 : sizeW === 1 ? 25 : 29,
                  }}
                />
              )}
            </View>
            <Text style={styles.labelStyle}>{title}</Text>
            <View style={styles.ArrowView}>
              <Image
                source={Images.ProfileIcon.Arrow}
                style={styles.iconStyle}
              />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  inputCont: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    margin: 20,
    marginTop: 0,
    marginBottom: 20,
    width: '90%',
  },
  inputStyle: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 20,
  },
  ArrowView: {
    justifyContent: 'center',
  },
  InnerView: {
    justifyContent: 'center',
  },
  iconStyle: {
    height: 15,
    width: 15,
  },
  labelStyle: {
    fontSize: 16,
    flex: 1,
    marginLeft: 20,
    color: Colors.Black,
    fontFamily: Fonts.HeveticaNowText_Medium,
  },
});
export default ProfileItem;
