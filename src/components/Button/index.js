import React, {Component} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import CommonStyle from '../../constants/Style';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';
class Button extends Component {
  goBack() {
    const {navigation} = this.props;
    this.props.onselect();
    navigation.goBack();
  }
  onPress = () => {
    const {
      path,
      navigation,
      value,
      userType,
      onScreenChange,
      serviceData,
      onSubmit,
    } = this.props;
    if (path) {
      if (path === 'upload') {
        this.goBack();
      } else if (path === 'addCard') {
        onScreenChange();
      } else {
        navigation.navigate(path, {
          passType: value ? value : '',
          userType: userType,
          serviceData: serviceData,
        });
      }
    } else {
      if (onSubmit) {
        onSubmit();
      }
    }
  };
  render() {
    const {title, bgColor, marginTop, marginBottom} = this.props;
    console.log('Button UserType', this.props.userType);
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => this.onPress()}
        style={
          (styles.OpacityStyle,
          {
            marginTop: marginTop ? marginTop : 30,
            marginBottom: marginBottom ? marginBottom : 40,
          })
        }>
        <View
          style={[
            CommonStyle.signupButton,
            {
              backgroundColor: bgColor ? bgColor : Colors.ButtonColor,
            },
          ]}>
          <Text style={styles.TextStyle}>{title}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  ImageStyle: {
    height: 20,
    width: 20,
  },
  OpacityStyle: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  TextStyle: {
    fontSize: 14,
    fontFamily: Fonts.HeveticaNowText_Medium,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: Colors.White,
    paddingHorizontal: 20,
  },
});
export default Button;
