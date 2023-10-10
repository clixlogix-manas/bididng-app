import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Fonts, Colors} from '../../constants';
import CommonStyle from '../../constants/Style';

class Input extends Component {
  render() {
    const {
      icon,
      label,
      type,
      eyeIcon,
      closeEyeIcon,
      propStyle,
      value,
      onChange,
      name,
      onIconPress,
      showPass,
      secondIcon,
      errStatus,
      errMsg,
      maxLength,
      disabled,
      noAutofill,
      uppercase,
      placeholder,
      height,
    } = this.props;
    return (
      <View style={[styles.inputCont]}>
        <View style={[CommonStyle.inputBorderStyle, styles.SubCont, propStyle]}>
          <View style={styles.IconView}>
            {icon && <Image source={icon} style={CommonStyle.iconStyle} />}
          </View>
          <TextInput
            placeholder={placeholder ? placeholder : label}
            style={[
              styles.TextInputStyle,
              // eslint-disable-next-line react-native/no-inline-styles
              {
                marginLeft: icon ? 10 : 0,
                height: type === 'service' ? Math.max(60, height) : 60,
              },
            ]}
            keyboardType={
              type === 'number'
                ? 'numeric'
                : type === 'phone'
                ? 'phone-pad'
                : 'default'
            }
            autoCapitalize={
              uppercase ? 'characters' : type === 'capital' ? 'words' : 'none'
            }
            importantForAutofill={noAutofill ? 'no' : 'auto'}
            editable={disabled && false}
            maxLength={maxLength && maxLength}
            name={name ? name : ''}
            secureTextEntry={
              type === 'password' ? (showPass ? false : true) : false
            }
            onChangeText={(values) => onChange(name, values)}
            value={value ? value : ''}
          />
          <View style={styles.OpacityView}>
            {type === 'password' ? (
              <TouchableOpacity activeOpacity={1} onPress={() => onIconPress()}>
                <Image
                  source={showPass ? eyeIcon : closeEyeIcon}
                  style={[CommonStyle.iconStyle]}
                />
              </TouchableOpacity>
            ) : secondIcon && value.includes('@gmail.com') ? (
              <Image source={secondIcon} style={CommonStyle.iconStyle} />
            ) : (
              <View style={styles.ViewArea} />
            )}
          </View>
        </View>
        {errStatus && <Text style={CommonStyle.errorMsg}>{errMsg}</Text>}
        {type === 'service' && (
          <Text style={styles.lengthText}>
            {value.length}/{maxLength}
          </Text>
        )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  inputCont: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    marginTop: 5,
  },
  SubCont: {
    height: 46,
    borderRadius: 5,
    paddingStart: 10,
    alignItems: 'center',
  },
  lengthText: {
    marginLeft: 5,
    marginTop: 10,
    textAlign: 'right',
    fontSize: 15,
    fontFamily: Fonts.HeveticaNowText_Regular,
    color: Colors.Black,
  },
  ViewArea: {
    height: 20,
    width: 20,
  },
  OpacityView: {
    justifyContent: 'center',
    marginEnd: 10,
  },
  TextInputStyle: {
    flex: 1,
    fontSize: 13,
    color: Colors.SelectColor,
    width: 325,
  },
  IconView: {
    justifyContent: 'center',
  },
  labelStyle: {
    fontSize: 14,
    fontFamily: Fonts.HeveticaNowText_Medium,
  },
  errorMsg: {
    color: Colors.Red,
    fontSize: 13,
    fontFamily: Fonts.Lato_Bold,
    marginTop: 10,
  },
});
export default Input;
