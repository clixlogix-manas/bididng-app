import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Platform,
} from 'react-native';
import {Images} from '../../constants';
import CommonStyle from '../../constants/Style';
import Input from '../Input';
import ContactButton from '../ContactButton';
import Fonts from '../../constants/Fonts';
import Colors from '../../constants/Colors';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronDown} from '@fortawesome/free-solid-svg-icons';

const SignupCard = (props) => {
  const {onChange, code, onPress, state, onIconPress, removePass, emailEnter} =
    props;
  return (
    <View style={styles.conatiner}>
      <Input
        label={'First Name'}
        name="firstName"
        value={state.firstName}
        maxLength={20}
        padding={0}
        minLength={3}
        onChange={onChange}
        errStatus={state.errStatus.firstName}
        errMsg={state.errMsg.firstName}
        icon={Images.SignUpIcon.User}
        type="capital"
      />

      <View style={styles.LastNameStyle}>
        <Input
          label={'Last Name'}
          name="lastName"
          maxLength={20}
          padding={0}
          minLength={3}
          value={state.lastName}
          errStatus={state.errStatus.lastName}
          errMsg={state.errMsg.lastName}
          onChange={onChange}
          icon={Images.SignUpIcon.User}
          type="capital"
        />
      </View>

      <View style={styles.EmailStyle}>
        <Input
          label={'Email Address'}
          name="email"
          disabled={emailEnter === false ? true : undefined}
          maxLength={50}
          value={state.email}
          padding={0}
          onChange={onChange}
          errStatus={state.errStatus.email}
          errMsg={state.errMsg.email}
          icon={Images.SignUpIcon.Email}
          type="text"
        />
      </View>

      <View style={styles.inputCont}>
        {/* <Text style={styles.labelStyle}>{state.contactLabel}</Text> */}
        {/* <View
          style={
            Platform.OS === 'android'
              ? styles.dropContainer
              : styles.iosDropContainer
          }>
          <Text style={styles.dotCont}>{'\u2B24'}</Text>
          <DropDownPicker
            items={[
              {
                label: 'Mobile Number',
                value: 'mobile',
              },
              {
                label: 'Home Number',
                value: 'home',
              },
              {
                label: 'Business Number',
                value: 'business',
              },
            ]}
            defaultValue={state.contactType}
            placeholder={'Select Contact Type'}
            containerStyle={{
              width: '55%',
              alignSelf: 'flex-start',
            }}
            style={{
              borderWidth: 0,
              display: 'flex',
              flexDirection: 'row',
              width: '100%',
              borderRadius: 0,
              backgroundColor: 'transparent',
            }}
            itemStyle={{
              justifyContent: 'flex-start',
            }}
            labelStyle={{
              color: Colors.SelectColor,
              fontSize: 13,
              fontFamily: Fonts.Lato_Medium,
            }}
            placeholderStyle={{
              textAlign: 'left',
            }}
            key={'contact'}
            name={'contact'}
            arrowSize={24}
            arrowStyle={{marginTop: 2}}
            arrowColor={Colors.ImageColor}
            dropDownStyle={{backgroundColor: Colors.BorderGray}}
            onChangeItem={(item) => onContactTypeChange(item)}
          />
          <DropDownPicker
            items={[
              {
                label: '+91(India)',
                value: '91',
              },
              {
                label: '+1(USA)',
                value: '1',
              },
              {
                label: '+1(CANADA)',
                value: '1',
              },
            ]}
            defaultValue={state.countrycode}
            placeholder={'Country code'}
            containerStyle={{
              width: '45%',
              height: Platform.OS === 'android' ? 50 : 55,
              alignSelf: 'center',
            }}
            style={{
              borderWidth: 0,
              display: 'flex',
              flexDirection: 'row',
              width: '100%',
              borderRadius: 0,
              backgroundColor: 'transparent',
              borderColor: Colors.ImageColor,
            }}
            itemStyle={{
              justifyContent: 'flex-start',
            }}
            labelStyle={{
              color: Colors.SelectColor,
              fontSize: 13,
              fontFamily: Fonts.Lato_Medium,
            }}
            placeholderStyle={{
              textAlign: 'left',
            }}
            key={'countrycode'}
            name={'countrycode'}
            arrowSize={25}
            arrowColor={Colors.ImageColor}
            dropDownStyle={{backgroundColor: Colors.BorderGray}}
            onChangeItem={(item) => onChange('countrycode', item.value)}
          />
        </View> */}

        <View style={styles.inputBorderStyle}>
          <View style={styles.SignupIconStyle}>
            <Image
              source={Images.SignUpIcon.Mobile}
              style={CommonStyle.iconStyle}
            />
          </View>

          <View style={styles.AwesomeCont}>
            <TouchableOpacity onPress={onPress} style={styles.OpacityStyle}>
              <View style={styles.AwesomeSubCont} />
              <Text style={styles.OpacityTextStyle}>
                {code !== null && code !== undefined ? code : 'AF'}
              </Text>
              <FontAwesomeIcon
                icon={faChevronDown}
                style={styles.AwesomeIconCont}
                size={10}
                color={Colors.textDarkGray}
              />
            </TouchableOpacity>
            <TextInput
              placeholder={state.contactLabel}
              style={styles.TextInputStyle}
              keyboardType={'phone-pad'}
              maxLength={10}
              name={'mobile'}
              onChangeText={(value) => onChange('mobile', value)}
              value={state.mobile}
            />
          </View>
        </View>
        {state.errStatus.mobile && (
          <Text style={CommonStyle.errorMsg}>{state.errMsg.mobile}</Text>
        )}
      </View>
      <View
        style={
          ([Platform.OS === 'android' ? styles.zIndex : styles.iosZindex],
          styles.PasswordStyle)
        }>
        {!removePass && (
          <Input
            label={'Password'}
            name="password"
            padding={0}
            value={state.password}
            errStatus={state.errStatus.password}
            errMsg={state.errMsg.password}
            showPass={state.showPass}
            onChange={onChange}
            onIconPress={onIconPress}
            icon={Images.SignUpIcon.Password}
            closeEyeIcon={Images.SignUpIcon.CloseEye}
            eyeIcon={Images.SignUpIcon.Eye}
            type="password"
          />
        )}
      </View>
      <Text style={[CommonStyle.labelStyle, styles.TextStyle]}>
        What's your preferred method of contact?
      </Text>
      <ContactButton
        value={state.radioRes}
        onpress={(value) => onChange('radioRes', value)}
        value1={'email'}
        label1={'Email'}
        value2={'mobile'}
        label2={'Phone'}
      />
      {/* <View style={[CommonStyle.checkboxContainer]}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => onChange('checked', !state.checked)}>
          <Image
            source={
              state.checked
                ? Images.ServiceIcon.Check
                : Images.ServiceIcon.Uncheck
            }
            style={{ height: 20, width: 20 }}
          />
        </TouchableOpacity>
        <View style={CommonStyle.termcondStyle}>
          <Text style={CommonStyle.label}>I Agree to the </Text>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => props.props.navigation.navigate('TermAndCond')}>
            <Text style={CommonStyle.linkText}>Terms and Conditions</Text>
          </TouchableOpacity>
        </View>
      </View> */}
    </View>
  );
};
const styles = StyleSheet.create({
  conatiner: {
    width: '100%',
  },
  LastNameStyle: {
    marginTop: 10,
  },
  EmailStyle: {
    marginTop: 10,
  },
  SignupIconStyle: {
    justifyContent: 'center',
    paddingStart: 10,
  },
  TextStyle: {
    marginTop: 20,
  },
  OpacityStyle: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  OpacityTextStyle: {
    alignSelf: 'center',
  },
  TextInputStyle: {
    width: '70%',
    color: Colors.SelectColor,
    fontFamily: Fonts.HeveticaNowText_Medium,
    fontSize: 13,
    paddingStart: 10,
    borderColor: Colors.ImageColor,
  },
  PasswordStyle: {
    marginTop: 10,
  },
  AwesomeCont: {
    alignSelf: 'center',
    height: 40,
    width: '100%',
    flexDirection: 'row',
    borderRadius: 5,
    alignItems: 'center',
  },
  AwesomeSubCont: {
    width: 1,
    backgroundColor: Colors.textDarkGray,
    margin: 10,
  },
  AwesomeIconCont: {
    alignSelf: 'center',
    margin: 10,
  },
  inputCont: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    marginTop: 10,
    alignSelf: 'center',
    paddingHorizontal: 5,
    marginRight: 9,
    borderRadius: 12,
    marginLeft: 10,
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
  inputBorderStyle: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    height: 45,
    backgroundColor: '#EFF0F6',
    borderRadius: 5,
  },
  iosInputBorderStyle: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    height: 60,
    borderBottomWidth: 1,
    borderColor: Colors.ImageColor,
    zIndex: 99,
  },
  zIndex: {},
  iosZindex: {
    zIndex: -1,
  },
  dropContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  },
  iosDropContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    zIndex: 999,
    width: '93%',
  },
  dotCont: {
    color: Colors.ImageColor,
    fontSize: 14,
    marginLeft: 5,
  },
});

export default SignupCard;
