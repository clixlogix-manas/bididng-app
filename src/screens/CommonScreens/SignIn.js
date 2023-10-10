/* eslint-disable no-shadow */
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Platform,
  Alert,
  StatusBar,
} from 'react-native';
import {Images, Fonts, Colors} from '../../constants';
import CommonStyle from '../../constants/Style';
import ValidationRule from '../../constants/validation/SignInValidation';
import messaging from '@react-native-firebase/messaging';
import InstagramLogin from 'react-native-instagram-login';
import Input from '../../components/Input';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {validate} from '../../constants/utilities/validator';
import Button from '../../components/Button';
import {connect} from 'react-redux';
import {
  customerSignInReq,
  stylistSignInReq,
} from '../../redux/actions/authAction';
import AsyncStorage from '@react-native-community/async-storage';
import {socialSignin} from '../../redux/actions/socialAction';
import {appleAuth} from '@invertase/react-native-apple-authentication';
import Spinner from 'react-native-loading-spinner-overlay';
import {
  AccessToken,
  GraphRequest,
  GraphRequestManager,
  LoginManager,
} from 'react-native-fbsdk';
import {TwitterLogin} from 'react-native-login-twitter';
import {
  appId,
  appSecret,
  TWITTER_CONSUMER_KEY,
  TWITTER_CONSUMER_SECRET,
  webClientId,
} from '../../constants/Config';
import {GoogleSignin} from 'react-native-google-signin';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errStatus: {},
      errMsg: {},
      signInErrorMsg: '',
      deviceToken: '',
      checked: false,
      social_provider: '',
    };
  }
  onChange = (name, value) => {
    this.setState({[name]: value});
    console.log('value @@', value);
  };
  async componentDidMount() {
    let deviceToken = await messaging().getToken();
    // console.log('@@@@@@@-deviceToken', deviceToken);
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({
      deviceToken: deviceToken,
    });
    const userData = await this.getRememberedUser();
    const email = userData[0];
    const password = userData[1];
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({
      email: email || '',
      password: password,
      checked: email ? true : false,
    });
  }
  onSubmit = () => {
    if (this.state.checked === true) {
      this.rememberUser();
    } else {
      this.forgetUser();
    }
    if (this.props.route.params.userType === 'Customer') {
      let Field = {
        email: this.state.email,
        password: this.state.password,
      };
      let formdata = new FormData();
      formdata.append('email', this.state.email);
      formdata.append('password', this.state.password);
      formdata.append('device_token', this.state.deviceToken);
      if (this.isValidate(Field, ValidationRule)) {
        this.props.customerSignInReq(formdata);
      }
    } else {
      let Field = {
        email: this.state.email,
        password: this.state.password,
      };
      let formdata = new FormData();
      formdata.append('email', this.state.email);
      formdata.append('password', this.state.password);
      formdata.append('device_token', this.state.deviceToken);
      if (this.isValidate(Field, ValidationRule)) {
        this.props.stylistSignInReq(formdata);
      }
    }
  };

  rememberUser = async () => {
    try {
      await AsyncStorage.setItem('remembered_email', this.state.email);
      await AsyncStorage.setItem('remembered_password', this.state.password);
    } catch (error) {
      // Error saving data
    }
  };
  getRememberedUser = async () => {
    try {
      const email = await AsyncStorage.getItem('remembered_email');
      const password = await AsyncStorage.getItem('remembered_password');
      if (email !== null || password !== null) {
        // We have username!!
        return [email, password];
      }
    } catch (error) {
      // Error retrieving data
    }
  };
  forgetUser = async () => {
    try {
      await AsyncStorage.removeItem('remembered_email');
      await AsyncStorage.removeItem('remembered_password');
    } catch (error) {
      // Error removing
    }
  };

  toggleRememberMe = (value) => {
    this.setState({checked: value});
  };

  isValidate = (Field, ValidationRule) => {
    let res = validate(Field, ValidationRule);
    if (res.errors) {
      this.setState({
        errStatus: {
          email: res.errors.email ? true : false,
          password: res.errors.password ? true : false,
        },
        errMsg: res.errors,
      });
    }
    return res.isValid;
  };
  componentDidUpdate(prevProps, prevState) {
    if (this.props.signInFailure !== prevProps.signInFailure) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        signInErrorMsg: this.props.signInFailureMessage,
      });
    } else if (this.props.signInSuccess !== prevProps.signInSuccess) {
      AsyncStorage.setItem('loginToken', this.props.loginToken);
      AsyncStorage.setItem('loggedUserType', this.props.loggedUserType);
      this.props.navigation.reset({
        index: 0,
        routes: [
          {
            name:
              this.props.route.params.userType === 'Customer'
                ? 'HomeScreenContainer'
                : 'HomeScreen',
            params: {userType: this.props.route.params.userType},
            error: 'signin',
          },
        ],
      });
    } else if (
      this.props.socialSigninSuccess !== prevProps.socialSigninSuccess
    ) {
      AsyncStorage.setItem('loginToken', this.props.socialloginToken);
      AsyncStorage.setItem('loggedUserType', this.props.socialloggedUserType);
      console.log(
        'socialloginToken @@@@@@@@@@token',
        this.props.socialloginToken,
      );
      let token1 = AsyncStorage.getItem('loginToken');
      console.log('async socialloginToken @@@@@@@@@@token', token1);
      this.props.navigation.reset({
        index: 0,
        routes: [
          {
            name:
              this.props.route.params.userType === 'Customer'
                ? 'HomeScreenContainer'
                : 'HomeScreen',
            params: {userType: this.props.route.params.userType},
          },
        ],
      });
    } else if (
      this.props.socialSigninFailure !== prevProps.socialSigninFailure
    ) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        signInErrorMsg: this.props.socialSigninFailureMessage,
      });
    }
  }
  fbLogin = async () => {
    await LoginManager.logOut();
    LoginManager.setLoginBehavior('web_only');
    let result = await LoginManager.logInWithPermissions([
      'email',
      'public_profile',
      'user_friends',
    ]);
    if (result.isCancelled) {
      return;
    }
    await AccessToken.getCurrentAccessToken();

    const infoRequest = new GraphRequest(
      '/me?fields=id,name,email,first_name,last_name',
      null,
      (error, result) => {
        if (error) {
          Alert.alert('Error fetching data: ' + error.errorMessage.toString());
        } else {
          let formdata = new FormData();
          formdata.append('social_app_id', result.id);
          formdata.append('social_provider', 'facebook');
          formdata.append('email', result.email);
          formdata.append('device_token', this.state.deviceToken);
          this.props.socialSignin(formdata);
        }
      },
    );
    new GraphRequestManager().addRequest(infoRequest).start();
  };
  twitterLogin = async () => {
    try {
      TwitterLogin.init(TWITTER_CONSUMER_KEY, TWITTER_CONSUMER_SECRET);

      const {name, last_name, userID, email} = await TwitterLogin.logIn();
      let data = {
        email: email,
        first_name: name,
        id: userID,
        last_name: last_name ? last_name : 'test',
      };
      if (userID) {
        let formdata = new FormData();
        formdata.append('social_app_id', data.id);
        formdata.append('email', data.email);
        formdata.append('device_token', this.state.deviceToken);
        formdata.append('social_provider', 'twitter');
        this.props.socialSignin(formdata);
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };
  googleLogin = async () => {
    await GoogleSignin.configure({
      offlineAccess: true,
      webClientId: webClientId,
    });
    GoogleSignin.signOut();
    const userInfo = await GoogleSignin.signIn();
    console.log('userInfo.user.email', userInfo.user.email);
    if (userInfo) {
      let formdata = new FormData();
      formdata.append('social_app_id', userInfo.user.id);
      formdata.append('social_provider', 'google');
      formdata.append('email', userInfo.user.email);
      formdata.append('device_token', this.state.deviceToken);
      this.props.socialSignin(formdata);
    }
  };
  instaLogin = async (data) => {
    let formdata = new FormData();
    formdata.append('social_app_id', data.user_id);
    formdata.append('email', '');
    formdata.append('device_token', this.state.deviceToken);
    this.props.socialSignin(formdata);
  };
  onAppleButtonPress = async () => {
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });

      try {
        const credentialState = await appleAuth.getCredentialStateForUser(
          appleAuthRequestResponse.user,
        );
        if (credentialState === appleAuth.State.AUTHORIZED) {
          // let data = {
          //   email: '',
          //   first_name: '',
          //   id: '',
          //   last_name: '',
          // };
          // let formdata = new FormData();
          // formdata.append('social_app_id', data.id);
          // formdata.append('email', data.email);
          // formdata.append('device_token', this.state.deviceToken);
          // this.props.socialSignin(formdata);
        }
      } catch (error) {}
    } catch (error) {}
  };
  render() {
    const {navigation, route, signInReq} = this.props;
    let userType = route.params.userType;

    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="gray" barStyle="dark-content" />
        <Spinner
          visible={this.props.socialSigninReq}
          textContent={'Loading...'}
          textStyle={{color: Colors.BackgroundGray}}
        />
        {/* <Image
          source={Images.SignUpIcon.BgImg}
          style={{height, width, position: 'absolute'}}
        /> */}
        <ScrollView
          style={styles.ScrollViewStyle}
          showsVerticalScrollIndicator={false}>
          <KeyboardAwareScrollView>
            <View style={CommonStyle.backArrowCont}>
              <TouchableOpacity
                style={styles.OpacityStyle}
                activeOpacity={1}
                onPress={() => navigation.goBack()}>
                <Image
                  source={Images.SignUpIcon.BackArrow}
                  style={CommonStyle.backArrow}
                />
                <Text style={styles.BackText}>{'Back'}</Text>
              </TouchableOpacity>
            </View>
            <View style={[CommonStyle.subContainer, styles.InputsCont]}>
              {/* <Image
                source={Images.UserScreenIcon.Applogo}
                style={{height: 140, width: 140, marginTop: -30}}
              /> */}
              <Text style={[CommonStyle.startedText]}>Welcome!</Text>
              <Text style={styles.signupText}>Log In to your account</Text>

              <Input
                label={'Email Address'}
                icon={Images.SignUpIcon.Email}
                name="email"
                maxLength={50}
                padding={0}
                errStatus={this.state.errStatus.email}
                errMsg={this.state.errMsg.email}
                value={this.state.email}
                onChange={this.onChange}
                secondIcon={Images.Subscription.RedCheck}
                type="text"
              />
              <View style={styles.InputCont}>
                <Input
                  padding={0}
                  label={'Password'}
                  icon={Images.SignUpIcon.Password}
                  value={this.state.password}
                  showPass={this.state.showPass}
                  errStatus={this.state.errStatus.password}
                  errMsg={this.state.errMsg.password}
                  onChange={this.onChange}
                  onIconPress={() =>
                    this.setState({showPass: !this.state.showPass})
                  }
                  closeEyeIcon={Images.SignUpIcon.CloseEye}
                  eyeIcon={Images.SignUpIcon.Eye}
                  name="password"
                  type="password"
                />
              </View>
              <View style={styles.checkboxCont}>
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => this.toggleRememberMe(!this.state.checked)}>
                  <Image
                    source={
                      this.state.checked
                        ? Images.ServiceIcon.Check
                        : Images.ServiceIcon.Uncheck
                    }
                    style={styles.checkboxstyle}
                  />
                </TouchableOpacity>

                <Text style={CommonStyle.label}>Remember me</Text>

                <View style={styles.flexstyle} />
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('ForgotPass', {userType: userType})
                  }
                  activeOpacity={1}>
                  <Text style={styles.forgetText}>Forgot Password?</Text>
                </TouchableOpacity>
              </View>

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
                onLoginSuccess={this.instaLogin}
                onLoginFailure={(data) => {}}
              />

              {this.state.signInErrorMsg !== '' && (
                <Text style={CommonStyle.errorMsg}>
                  {this.state.signInErrorMsg}
                </Text>
              )}
              {signInReq ? (
                <View style={CommonStyle.loadingStyle}>
                  <ActivityIndicator size="large" color="white" />
                </View>
              ) : (
                <Button
                  title={'Log In'}
                  userType={userType}
                  marginTop={20}
                  onSubmit={this.onSubmit}
                  navigation={navigation}
                />
              )}
              {userType === 'Customer' && (
                <View style={CommonStyle.signupBorderCont}>
                  <View style={CommonStyle.signupBorder} />

                  <Text style={styles.or_text}>Or Log In with</Text>
                  <View style={CommonStyle.signupBorder} />
                </View>
              )}
              {userType === 'Customer' && (
                <View style={styles.ImageCont}>
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {
                      userType === 'Customer' && this.fbLogin();
                    }}>
                    <Image
                      source={Images.SignUpIcon.Fb}
                      style={CommonStyle.socialIcon}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    activeOpacity={1}
                    style={styles.startmargin}
                    onPress={() => {
                      userType === 'Customer' && this.twitterLogin();
                    }}>
                    <Image
                      source={Images.SignUpIcon.Twitter}
                      style={CommonStyle.socialIcon}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    activeOpacity={1}
                    style={styles.startmargin}
                    onPress={() => {
                      userType === 'Customer' && this.googleLogin();
                    }}>
                    <Image
                      source={Images.SignUpIcon.Google}
                      style={CommonStyle.socialIcon}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    activeOpacity={1}
                    style={styles.startmargin}
                    onPress={() =>
                      userType === 'Customer' && this.instagramLogin.show()
                    }>
                    <Image
                      source={Images.SignUpIcon.Instagram}
                      style={CommonStyle.socialIcon}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    activeOpacity={1}
                    style={styles.startmargin}>
                    <Image
                      source={Images.SignUpIcon.Pintrest}
                      style={CommonStyle.socialIcon}
                    />
                  </TouchableOpacity>
                </View>
              )}

              <View style={styles.textCont}>
                <Text style={styles.textStyle2}>
                  By signing in you are agree our
                  <Text
                    onPress={() =>
                      navigation.navigate('TermAndCond', {userType: userType})
                    }
                    style={styles.terms_text}>
                    {' Terms \n& Conditions'}
                  </Text>
                  {/* </TouchableOpacity> */}
                </Text>
              </View>

              <View style={[CommonStyle.bottomCont, styles.textCont2]}>
                <Text style={styles.textSty}>Don't have an account?</Text>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('Signup', {userType: userType})
                  }>
                  <Text style={styles.SignUpsty}> Sign Up</Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAwareScrollView>
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
    fontFamily: Fonts.HeveticaNowText_Medium,
    color: Colors.Black,
    marginTop: 10,
    margin: 25,
  },
  InputCont: {
    marginTop: 10,
  },
  InputsCont: {
    paddingHorizontal: 30,
  },
  checkboxstyle: {
    height: 20,
    width: 20,
  },
  BackText: {
    color: Colors.LightBlack,
    marginStart: 10,
  },
  flexstyle: {flex: 1},
  startmargin: {marginStart: 14},
  OpacityStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textCont2: {
    marginTop: 15,
  },
  ScrollViewStyle: {
    flex: 1,
    marginTop: Platform.OS === 'android' ? 0 : 30,
  },
  checkboxCont: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  forgetText: {
    fontSize: 14,
    fontFamily: Fonts.HeveticaNowText_Medium,
    color: '#283A58',
  },
  or_text: {
    fontSize: 14,
    width: 144,
    textAlign: 'center',
    fontFamily: Fonts.HeveticaNowText_Medium,
  },
  ImageCont: {
    flexDirection: 'row',
    paddingTop: 10,
    alignSelf: 'center',
    marginBottom: 10,
    marginTop: 15,
  },
  textCont: {
    marginBottom: 20,
    marginTop: 20,
  },
  textStyle2: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: Fonts.HeveticaNowText_Medium,
    color: Colors.Black,
  },
  terms_text: {
    fontFamily: Fonts.HeveticaNowText_Medium,
    color: Colors.Blue,
    textDecorationLine: 'underline',
  },
  textSty: {
    alignSelf: 'center',
    fontFamily: Fonts.HeveticaNowText_Medium,
    fontSize: 15,
    color: Colors.Black,
  },
  SignUpsty: {
    fontFamily: Fonts.Lato_Bold,
    color: Colors.ButtonColor,
    fontSize: 16,
  },
});
const mapStateToProps = (state) => {
  return {
    signInFailureMessage: state.SignupReducer.signInFailureMessage,
    signInFailure: state.SignupReducer.signInFailure,
    signInSuccess: state.SignupReducer.signInSuccess,
    signInReq: state.SignupReducer.signInReq,
    userInfo: state.SignupReducer.userInfo,
    socialSigninFailureMessage: state.SocialReducer.socialSigninFailureMessage,
    socialSigninFailure: state.SocialReducer.socialSigninFailure,
    socialSigninSuccess: state.SocialReducer.socialSigninSuccess,
    socialSigninReq: state.SocialReducer.socialSigninReq,
    socialloginToken: state.SocialReducer.loginToken,
    socialloggedUserType: state.SocialReducer.loggedUserType,
    loginToken: state.SignupReducer.loginToken,
    loggedUserType: state.SignupReducer.loggedUserType,
  };
};

const mapDispatchToProps = (dispatch) => ({
  customerSignInReq: (data) => dispatch(customerSignInReq(data)),
  stylistSignInReq: (data) => dispatch(stylistSignInReq(data)),
  socialSignin: (data) => dispatch(socialSignin(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
