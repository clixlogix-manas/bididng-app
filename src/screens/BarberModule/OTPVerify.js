/* eslint-disable react/no-did-update-set-state */
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import {Images, Fonts, Colors} from '../../constants';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import CommonStyle from '../../constants/Style';
import Button from '../../components/Button';
import {
  stylistSignUpReq,
  otpSentReq,
  otpSentCustomerReq,
  signUpReq,
} from '../../redux/actions/authAction';
import {connect} from 'react-redux';
import DeviceInfo from 'react-native-device-info';
import AsyncStorage from '@react-native-community/async-storage';
import Clipboard from '@react-native-community/clipboard';
import SafeAreaView from 'react-native-safe-area-view';

const {height, width} = Dimensions.get('window');
// eslint-disable-next-line no-unused-vars
var setOtp = false;
class OTPVerify extends Component {
  constructor(props) {
    super(props);
    this.state = {
      otp: '',
      code: '',
      timer: 60,
      currentCounter: -1,
      countDownDate: new Date(new Date().getTime() + 1 * 60000),
      timerStart: true,
      signUpErrorMsg: '',
      fieldErrMsg: '',
      disableSubmit: false,
    };
  }
  onSubmit = () => {
    let data = '';
    if (this.props.route.params.userType === 'Customer') {
      data = this.props.customerData;
    } else {
      data = this.props.stylistData;
    }
    data.append('otp', this.state.otp);
    if (this.state.otp.length === 6) {
      this.setState({
        fieldErrMsg: '',
      });
      if (this.props.route.params.userType === 'Customer') {
        this.props.SignUpReq(data);
      } else {
        this.props.stylistSignUpReq(data);
      }
    } else if (this.state.otp === '') {
      this.setState({
        fieldErrMsg: 'Please enter OTP',
      });
    } else if (this.state.otp.length < 6) {
      this.setState({
        fieldErrMsg: 'OTP length must be of 6',
      });
    }
  };

  onResendOTP = () => {
    if (this.state.disableSubmit) {
      return;
    }
    this.setCounter();
    this.setState({otp: ''});
    let data = '';
    if (this.props.route.params.userType === 'Customer') {
      data = this.props.customerData;
    } else {
      data = this.props.stylistData;
    }
    console.log('test==>', data);
    let otpformData = new FormData();
    otpformData.append('first_name', data.getParts()[0].string);
    otpformData.append('last_name', data.getParts()[1].string);
    otpformData.append('mobile_number', data.getParts()[4].string);
    otpformData.append('email', data.getParts()[2].string);
    otpformData.append('device_id', DeviceInfo.getDeviceId());
    this.setState({disableSubmit: true});
    this.setState({timerStart: true});
    if (this.props.route.params.userType === 'Customer') {
      this.props.OtpsentCustomerReq(data, otpformData);
    } else {
      this.props.OtpsentReq(data, otpformData);
    }

    Clipboard.setString('');
    // enable submit button after 5 second
    setTimeout(() => {
      this.setState({
        disableSubmit: false,
      });
    }, 5000);
  };

  componentDidMount() {
    this.setCounter();
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({otp: ''});
    Clipboard.setString('');
  }
  setCounter = () => {
    // eslint-disable-next-line consistent-this
    let newState = this;
    let currentCounter = 59;
    var x = setInterval(function () {
      newState.setState(
        {
          currentCounter: currentCounter,
        },
        () => {
          currentCounter -= 1;
        },
      );
      if (currentCounter < 0) {
        clearInterval(x);
        newState.setState({timerStart: false});
      }
    }, 1000);
  };

  componentDidUpdate(prevProps, prevState) {
    console.log('prevProps.signUpSuccess', prevProps.signUpSuccess);
    console.log('prevProps.otpSentSuccess', prevProps.otpSentSuccess);

    if (
      this.props.signUpFailure !== prevProps.signUpFailure &&
      this.props.signUpFailureMessage !== ''
    ) {
      Alert.alert(
        'Hair Biddy',
        this.props.signUpFailureMessage,
        [{text: 'OK', onPress: () => {}}],
        {cancelable: true},
      );
    } else if (this.props.signUpSuccess !== prevProps.signUpSuccess) {
      AsyncStorage.clear();
      AsyncStorage.setItem('temploginToken', this.props.loginToken);
      AsyncStorage.setItem('temploggedUserType', this.props.loggedUserType);
      this.setState({signUpErrorMsg: ''});
      this.props.navigation.navigate('Step1');
    } else if (this.props.otpSentSuccess !== prevProps.otpSentSuccess) {
      this.setState({signUpErrorMsg: '', timerStart: true});
    } else if (this.props.otpSentFailure !== prevProps.otpSentFailure) {
      this.setState({
        signUpErrorMsg: this.props.otpSentFailureMessage,
      });
    }
  }

  render() {
    // eslint-disable-next-line no-shadow
    const {navigation, signUpReq, otpSentReq, otpSentCustomerReq} = this.props;
    return (
      <SafeAreaView style={styles.container}>
        <Image source={Images.SignUpIcon.BgImg} style={styles.ImageStyle} />
        <KeyboardAwareScrollView>
          <View style={CommonStyle.backArrowCont}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => navigation.goBack()}>
              <Image
                source={Images.SignUpIcon.BackArrow}
                style={CommonStyle.backArrow}
              />
            </TouchableOpacity>
          </View>
          <View style={[CommonStyle.subContainer, styles.ImageCont]}>
            <Image
              source={Images.StaticPage.LogoThree}
              style={styles.ImgStyle}
            />
            <Text style={CommonStyle.startedText}>Verify Your​ Profile</Text>
            <Text style={CommonStyle.signupText}>
              {
                'A 6-digits One Time Password(OTP)\nhas been sent to the registered phone number.\nPlease check your device and\nenter the OTP here: '
              }
            </Text>

            <OTPInputView
              style={styles.OTPInputStyle}
              pinCount={6}
              code={this.state.otp} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
              onCodeChanged={(code) => {
                this.setState({otp: code});
              }}
              editable={true}
              autoFocusOnLoad
              codeInputFieldStyle={styles.underlineStyleBase}
              codeInputHighlightStyle={styles.underlineStyleHighLighted}
              onCodeFilled={(code) => {
                console.log(code);
              }}
            />
            {this.state.fieldErrMsg !== '' && (
              <Text style={CommonStyle.errorMsg}>{this.state.fieldErrMsg}</Text>
            )}
            {this.state.timerStart ? (
              <View style={styles.resendCont}>
                <Text style={styles.resendText}>Resending the code in</Text>
                <Text style={styles.resendText}>
                  {this.state.currentCounter > 0 ? '00' : '01'} :{' '}
                  {this.state.currentCounter >= 10 && this.state.currentCounter}
                  {this.state.currentCounter < 10 &&
                    this.state.currentCounter > 0 &&
                    '0' + this.state.currentCounter}
                  {this.state.currentCounter <= 0 && '00'}
                </Text>
              </View>
            ) : (
              <View>
                {otpSentReq || otpSentCustomerReq || signUpReq ? (
                  <View style={CommonStyle.loadingStyle}>
                    <ActivityIndicator size="large" color="white" />
                  </View>
                ) : (
                  <Button
                    title={'Resend OTP'}
                    userType={'Barber'}
                    onSubmit={this.onResendOTP}
                    navigation={navigation}
                  />
                )}
              </View>
            )}

            {this.state.signUpErrorMsg !== '' && (
              <Text style={CommonStyle.errorMsg}>
                {this.state.signUpErrorMsg}
              </Text>
            )}
            {signUpReq ? (
              <View style={CommonStyle.loadingStyle}>
                <ActivityIndicator size="large" color="white" />
              </View>
            ) : (
              <Button
                title={'SUBMIT'}
                onSubmit={this.onSubmit}
                navigation={navigation}
              />
            )}
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  resendText: {
    fontSize: 16,
    fontFamily: Fonts.HeveticaNowText_Medium,
    color: Colors.LightBlack,
    margin: 10,
    marginRight: 0,
    marginBottom: 20,
  },
  ImageCont: {
    flex: 0,
    paddingHorizontal: 30,
  },
  textStyle: {
    fontSize: 14,
    fontFamily: Fonts.Lato_Bold,
    color: 'red',
  },
  OTPInputStyle: {
    width: '80%',
    height: 100,
    alignSelf: 'center',
  },
  ImageStyle: {
    height,
    width,
    position: 'absolute',
  },
  ImgStyle: {
    height: 142,
    width: 221,
    marginTop: -30,
    alignSelf: 'center',
    marginBottom: 25,
  },
  resendCont: {
    margin: 30,
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  borderStyleBase: {
    width: 30,
    height: 45,
  },

  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 2,
    color: Colors.SelectColor,
    fontSize: 16,
    fontFamily: Fonts.Lato_Bold,
  },

  underlineStyleHighLighted: {
    borderColor: Colors.SelectColor,
  },
});

const mapStateToProps = (state) => {
  return {
    signUpFailureMessage: state.SignupReducer.otpMatchFailureMessage,
    signUpFailure: state.SignupReducer.otpMatchFailure,
    signUpSuccess: state.SignupReducer.otpMatchSuccess,
    signUpReq: state.SignupReducer.otpMatchReq,
    loginToken: state.SignupReducer.loginToken,
    loggedUserType: state.SignupReducer.loggedUserType,
    stylistData: state.SignupReducer.customStylistData,
    customerData: state.SignupReducer.customCustomerData,
    otpSentSuccess: state.SignupReducer.otpSentSuccess,
    otpSentFailure: state.SignupReducer.otpSentFailure,
    otpSentFailureMessage: state.SignupReducer.otpSentFailureMessage,
    otpSentReq: state.SignupReducer.otpSentReq,
    //
    otpSentCustomerReq: state.SignupReducer.otpSentCustomerReq,
    otpSentCustomerSuccess: state.SignupReducer.otpSentCustomerSuccess,
    otpSentCustomerFailure: state.SignupReducer.otpSentCustomerFailure,
    otpSentCustomerFailureMessage:
      state.SignupReducer.otpSentCustomerFailureMessage,
  };
};

const mapDispatchToProps = (dispatch) => ({
  stylistSignUpReq: (data) => dispatch(stylistSignUpReq(data)),
  OtpsentReq: (data, otpData) => dispatch(otpSentReq(data, otpData)),
  SignUpReq: (data) => dispatch(signUpReq(data)),
  OtpsentCustomerReq: (data, otpData) =>
    dispatch(otpSentCustomerReq(data, otpData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OTPVerify);
