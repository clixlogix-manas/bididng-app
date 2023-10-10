/* eslint-disable no-shadow */
/* eslint-disable react/no-did-update-set-state */
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  // Dimensions,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  Platform,
} from 'react-native';
import {Images, Fonts, Colors} from '../../constants';
import CommonStyle from '../../constants/Style';
import Button from '../../components/Button';
import SignupCard from '../../components/Signup';
import ValidationRule from '../../constants/validation/SignupValidation';
import {validate} from '../../constants/utilities/validator';
import {
  signUpReq,
  otpSentReq,
  otpSentCustomerReq,
} from '../../redux/actions/authAction';
import {connect} from 'react-redux';
import DeviceInfo from 'react-native-device-info';
import AsyncStorage from '@react-native-community/async-storage';
import {
  fbSignUp,
  googleSignUp,
  twitterSignUp,
} from '../../constants/socialSignup';
import InstagramLogin from 'react-native-instagram-login';
import {appId, appSecret} from '../../constants/Config';
import messaging from '@react-native-firebase/messaging';
import axios from 'axios';

// const {height, width} = Dimensions.get('window');
class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: true,
      radioRes: 'mobile',
      firstName: '',
      lastName: '',
      email: '',
      home: '',
      business: '',
      mobile: '',
      password: '',
      showPass: false,
      errStatus: {},
      errMsg: {},
      signUpErrorMsg: '',
      deviceToken: '',
      countrycode: '+93',
      contactType: 'mobile',
      contactLabel: 'Mobile Number',
      disableSubmit: false,
    };
  }
  onChange = (name, value) => {
    this.setState({
      [name]: value,
    });
  };
  onContactTypeChange = (item) => {
    this.setState({contactType: item.value, contactLabel: item.label});
  };
  async componentDidMount() {
    // console.log('tttt==>', this.props.countryCodeData);
    let deviceToken = await messaging().getToken();
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({
      deviceToken: deviceToken,
    });
  }
  onSubmit = () => {
    console.log('disableSubmit **', this.state.disableSubmit);
    if (this.state.disableSubmit) {
      return;
    }
    // alert('clicked');
    const {
      firstName,
      lastName,
      password,
      mobile,
      email,
      checked,
      radioRes,
      deviceToken,
    } = this.state;
    let Field = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      mobile: mobile,
      preferred_contact: radioRes,
      term_condition: checked ? 1 : 0,
    };

    let cCode = '';
    if (
      this.props.countryCodeData !== null &&
      this.props.countryCodeData !== undefined
    ) {
      cCode = this.props.countryCodeData.dial_code;
    } else {
      cCode = this.state.countrycode;
    }

    console.log('ccc==>', cCode);
    let formdata = new FormData();
    formdata.append('first_name', firstName);
    formdata.append('last_name', lastName);
    formdata.append('email', email);
    formdata.append('password', password);
    formdata.append('mobile_number', cCode + mobile);
    formdata.append('home_number', mobile);
    formdata.append('business_number', mobile);
    formdata.append('preferred_contact', radioRes);
    formdata.append('term_condition', checked ? 1 : 0);
    formdata.append('device_token', deviceToken);
    if (this.isValidate(Field, ValidationRule)) {
      if (checked) {
        if (firstName.length >= 3) {
          if (lastName.length >= 3) {
            this.setState({disableSubmit: true});
            if (this.props.route.params.userType === 'Customer') {
              Field.device_id = DeviceInfo.getDeviceId();
              formdata.append('device_id', DeviceInfo.getDeviceId());
              let otpformData = new FormData();
              otpformData.append('first_name', firstName);
              otpformData.append('last_name', lastName);
              otpformData.append('mobile_number', cCode + mobile);
              otpformData.append('email', email);
              otpformData.append('device_id', DeviceInfo.getDeviceId());
              this.props.OtpsentCustomerReq(formdata, otpformData);
              // this.props.SignUpReq(formdata);
            } else {
              Field.device_id = DeviceInfo.getDeviceId();
              formdata.append('device_id', DeviceInfo.getDeviceId());
              let otpformData = new FormData();
              otpformData.append('first_name', firstName);
              otpformData.append('last_name', lastName);
              otpformData.append('mobile_number', cCode + mobile);
              otpformData.append('email', email);
              otpformData.append('device_id', DeviceInfo.getDeviceId());
              this.props.OtpsentReq(formdata, otpformData);
            }
            // enable submit button after 5 second
            setTimeout(() => {
              this.setState({
                disableSubmit: false,
              });
            }, 10000);
          } else {
            this.setState({
              errStatus: {
                lastName: true,
              },
              errMsg: {
                lastName: 'lastname must be of minimum length 3',
              },
            });
          }
        } else {
          this.setState({
            errStatus: {
              firstName: true,
            },
            errMsg: {
              firstName: 'firstname must be of minimum length 3',
            },
          });
        }
      } else {
        Alert.alert(
          'Hair Biddy',
          'Please select terms and conditions',
          [{text: 'OK', onPress: () => {}}],
          {cancelable: true},
        );
      }
    }
  };
  isValidate = (Field, ValidationRule) => {
    let res = validate(Field, ValidationRule);
    if (res.errors) {
      this.setState({
        errStatus: {
          firstName: res.errors.firstName ? true : false,
          lastName: res.errors.lastName ? true : false,
          email: res.errors.email ? true : false,
          password: res.errors.password ? true : false,
          mobile: res.errors.mobile ? true : false,
          home: res.errors.home ? true : false,
          business: res.errors.business ? true : false,
        },
        errMsg: res.errors,
      });
    }
    return res.isValid;
  };

  setIgToken = async (data) => {
    try {
      let userData = await axios.get(
        'https://graph.instagram.com/me?fields=id,username,email&access_token=' +
          data.access_token,
      );
      let sentData = {
        email: '',
        first_name: userData.data.username,
        id: userData.data.id,
        last_name: '',
      };
      if (userData.data) {
        this.props.navigation.navigate('SocialSignUp', {
          userType: this.props.route.params.userType,
          details: sentData,
        });
      }
    } catch (error) {}
  };

  componentDidUpdate(prevProps, prevState) {
    console.log(prevProps.signUpFailure);
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
      console.log('jjjjj===>', this.props.signUpFailure);
    } else if (this.props.signUpSuccess !== prevProps.signUpSuccess) {
      AsyncStorage.setItem('loginToken', this.props.loginToken);
      AsyncStorage.setItem('loggedUserType', this.props.loggedUserType);
      this.setState({signUpErrorMsg: ''});

      this.props.navigation.navigate('WelcomeScreen', {
        userType: this.props.route.params.userType,
      });
    } else if (this.props.otpSentSuccess !== prevProps.otpSentSuccess) {
      this.setState({signUpErrorMsg: ''});
      this.props.navigation.navigate('OTPVerify', {
        userType: this.props.route.params.userType,
      });
    } else if (
      this.props.otpSentFailure !== prevProps.otpSentFailure &&
      this.props.otpSentFailureMessage !== ''
    ) {
      Alert.alert(
        'Hair Biddy',
        this.props.otpSentFailureMessage,
        [{text: 'OK', onPress: () => {}}],
        {cancelable: true},
      );
      console.log(
        'otpppp',
        prevProps.otpSentFailure,
        this.props.otpSentFailure,
      );
    }
  }
  onIconPress = () => {
    this.setState({showPass: !this.state.showPass});
  };

  onPressCode = () => {
    this.props.navigation.navigate('CountryCode');
  };
  render() {
    const {
      navigation,
      route,
      signUpReq,
      // eslint-disable-next-line no-unused-vars
      userInfo,
      otpSentReq,
      otpSentCustomerReq,
    } = this.props;
    let userType = route.params.userType;
    return (
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.ScrollViewstyle}>
          <View style={CommonStyle.backArrowCont}>
            <TouchableOpacity
              style={styles.OpacitySty}
              activeOpacity={1}
              onPress={() => navigation.goBack()}>
              <Image
                source={Images.SignUpIcon.BackArrow}
                style={CommonStyle.backArrow}
              />
              <Text style={styles.backtext}>{'Back'}</Text>
            </TouchableOpacity>
          </View>
          <View style={[CommonStyle.subContainer, styles.ViewCont]}>
            {/* <Image
              source={Images.UserScreenIcon.Applogo}
              style={{ height: 140, width: 140, marginTop: -30 }}
            /> */}
            <Text style={[CommonStyle.startedText]}>Let's Connect</Text>
            <Text style={styles.signupText}>Sign Up to your account</Text>
            <SignupCard
              userType={route.params.userType}
              {...this}
              onPress={this.onPressCode}
              code={
                this.props.countryCodeData
                  ? this.props.countryCodeData.dial_code
                  : '+93'
              }
            />
            {this.state.signUpErrorMsg !== '' && (
              <Text style={CommonStyle.errorMsg}>
                {this.state.signUpErrorMsg}
              </Text>
            )}
            {signUpReq || otpSentReq || otpSentCustomerReq ? (
              <View style={CommonStyle.loadingStyle}>
                <ActivityIndicator size="large" color="white" />
              </View>
            ) : (
              <Button
                title={'Sign Up'}
                userType={userType}
                onSubmit={this.onSubmit}
                navigation={navigation}
              />
            )}
            {userType === 'Customer' && (
              <View style={CommonStyle.signupBorderCont}>
                <View style={CommonStyle.signupBorder} />

                <Text style={styles.or_text}>Or sign up with</Text>
                <View style={CommonStyle.signupBorder} />
              </View>
            )}
            {userType === 'Customer' && (
              <View style={CommonStyle.socialCont}>
                <TouchableOpacity
                  activeOpacity={1}
                  style={styles.style1}
                  onPress={() =>
                    userType === 'Customer' && fbSignUp(navigation, userType)
                  }>
                  <Image
                    source={Images.SignUpIcon.Fb}
                    style={CommonStyle.socialIcon}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={1}
                  style={styles.marginStyle}
                  onPress={() =>
                    userType === 'Customer' &&
                    twitterSignUp(navigation, userType)
                  }>
                  <Image
                    source={Images.SignUpIcon.Twitter}
                    style={CommonStyle.socialIcon}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={1}
                  style={styles.marginStyle}
                  onPress={() =>
                    userType === 'Customer' &&
                    googleSignUp(navigation, userType)
                  }>
                  <Image
                    source={Images.SignUpIcon.Google}
                    style={CommonStyle.socialIcon}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={1}
                  style={styles.marginStyle}
                  onPress={() =>
                    userType === 'Customer' && this.instagramLogin.show()
                  }>
                  <Image
                    source={Images.SignUpIcon.Instagram}
                    style={CommonStyle.socialIcon}
                  />
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={1} style={styles.marginStyle}>
                  <Image
                    source={Images.SignUpIcon.Pintrest}
                    style={CommonStyle.socialIcon}
                  />
                </TouchableOpacity>
                {/* {Platform.OS === 'ios' && (
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() =>
                      userType === 'Customer' &&
                      AppleSignUp(navigation, userType)
                    }>
                    <FontAwesomeIcon icon={faApple} size={30} />
                  </TouchableOpacity>
                )} */}
              </View>
            )}
            <InstagramLogin
              ref={(ref) => (this.instagramLogin = ref)}
              appId={appId}
              appSecret={appSecret}
              redirectUrl="https://www.google.com/"
              scopes={['user_profile', 'user_media']}
              cacheEnabled={false}
              incognito={true}
              thirdPartyCookiesEnabled={false}
              domStorageEnabled={false}
              onLoginSuccess={this.setIgToken}
              onLoginFailure={(data) => {}}
            />
            <View style={CommonStyle.bottomCont}>
              <View style={CommonStyle.termcondStyle}>
                <Text style={(CommonStyle.label, {textAlign: 'center'})}>
                  By signing up you are agree our
                </Text>
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => navigation.navigate('TermAndCond')}>
                  <Text style={CommonStyle.linkText}>Terms & Conditions</Text>
                </TouchableOpacity>
              </View>
              {/* <Text
                style={{
                  alignSelf: 'center',
                  fontFamily: Fonts.Lato_Medium,
                  color: Colors.LightBlack,
                }}>
                Do you have an account?
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('SignIn', { userType })}
                activeOpacity={1}>
                <Text style={{ fontFamily: Fonts.Lato_Bold }}> Sign in</Text>
              </TouchableOpacity> */}
            </View>

            <View style={[CommonStyle.bottomCont, styles.textCont3]}>
              <Text style={styles.textCont}>Already have an account?</Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('SignIn', {userType: userType})
                }>
                <Text style={styles.textCont2}> Log In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BgColor,
  },
  signupText: {
    fontSize: 15,
    textAlign: 'center',
    fontFamily: Fonts.HeveticaNowText_Regular,
    color: Colors.Black,
    marginTop: 10,
    margin: 25,
  },
  textCont3: {
    marginTop: 15,
  },
  OpacitySty: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ScrollViewstyle: {
    flex: 1,
    marginTop: Platform.OS === 'android' ? 0 : 30,
  },
  buttonCont: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 30,
    paddingTop: 10,
  },
  backtext: {
    color: Colors.LightBlack,
    marginStart: 10,
  },
  ViewCont: {paddingTop: 0, paddingHorizontal: 30},
  marginStyle: {
    marginStart: 15,
  },
  textCont2: {
    fontFamily: Fonts.Lato_Bold,
    color: Colors.ButtonColor,
    fontSize: 16,
  },
  style1: {
    marginStart: -30,
  },
  or_text: {
    fontSize: 14,
    width: 144,
    textAlign: 'center',
    fontFamily: Fonts.HeveticaNowText_Medium,
  },
  textCont: {
    alignSelf: 'center',
    fontFamily: Fonts.HeveticaNowText_Medium,
    fontSize: 15,
    color: Colors.Black,
  },
  buttonStyle: {
    width: 130,
    height: 40,
    borderWidth: 1,
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },

  buttonText: {
    alignSelf: 'center',
    marginRight: 40,
    padding: 0,
  },
});
const mapStateToProps = (state) => {
  return {
    countryCodeData: state.SignupReducer.countryCodeData,
    signUpFailureMessage: state.SignupReducer.signUpFailureMessage,
    signUpFailure: state.SignupReducer.signUpFailure,
    signUpSuccess: state.SignupReducer.signUpSuccess,
    signUpReq: state.SignupReducer.signUpReq,
    otpSentSuccess: state.SignupReducer.otpSentSuccess,
    otpSentFailure: state.SignupReducer.otpSentFailure,
    otpSentFailureMessage: state.SignupReducer.otpSentFailureMessage,
    otpSentReq: state.SignupReducer.otpSentReq,
    //
    otpSentCustomerSuccess: state.SignupReducer.otpSentCustomerSuccess,
    otpSentCustomerFailure: state.SignupReducer.otpSentCustomerFailure,
    otpSentCustomerFailureMessage:
      state.SignupReducer.otpSentCustomerFailureMessage,
    otpSentCustomerReq: state.SignupReducer.otpSentCustomerReq,
    //
    userInfo: state.SignupReducer.userInfo,
    loginToken: state.SignupReducer.loginToken,
    loggedUserType: state.SignupReducer.loggedUserType,
  };
};

const mapDispatchToProps = (dispatch) => ({
  SignUpReq: (data) => dispatch(signUpReq(data)),
  OtpsentReq: (data, otpData) => dispatch(otpSentReq(data, otpData)),
  OtpsentCustomerReq: (data, otpData) =>
    dispatch(otpSentCustomerReq(data, otpData)),
});
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
