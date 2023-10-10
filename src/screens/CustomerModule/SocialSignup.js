import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {Images, Fonts, Colors} from '../../constants';
import CommonStyle from '../../constants/Style';
import Button from '../../components/Button';
import SignupCard from '../../components/Signup';
import {connect} from 'react-redux';
import {socialSignup} from '../../redux/actions/socialAction';
import AsyncStorage from '@react-native-community/async-storage';
import messaging from '@react-native-firebase/messaging';
import {validate} from '../../constants/utilities/validator';

const {height, width} = Dimensions.get('window');
const SocialValidationRule = [
  {
    field: 'email',
    validations: ['required', 'email'],
    name: 'Email',
  },
  {
    field: 'lastName',
    validations: ['required'],
    name: 'Last name',
  },
];
class SocialSignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: 1,
      radioRes: 'mobile',
      firstName: '',
      lastName: '',
      email: '',
      home: '',
      business: '',
      mobile: '',
      social_type: '',
      password: '',
      showPass: false,
      errStatus: {},
      errMsg: {},
      socialSignUpErrorMsg: '',
      deviceToken: '',
      countrycode: '91',
      contactType: 'mobile',
      contactLabel: 'Mobile Number',
    };
  }
  onChange = (name, value) => {
    this.setState({[name]: value});
  };
  onContactTypeChange = (item) => {
    this.setState({
      contactType: item.value,
      contactLabel: item.label,
    });
  };
  async componentDidMount() {
    let deviceToken = await messaging().getToken();

    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({
      firstName: this.props.route.params.details.first_name,
      lastName: this.props.route.params.details.last_name,
      email: this.props.route.params.details.email,
      deviceToken: deviceToken,
    });
  }
  onSubmit = () => {
    const {
      firstName,
      lastName,
      email,
      mobile,
      radioRes,
      checked,
      deviceToken,
      countrycode,
    } = this.state;
    const {route} = this.props;
    let Field = {
      email: email,
      lastName: lastName,
    };
    if (this.isValidate(Field, SocialValidationRule)) {
      if (checked) {
        let formdata = new FormData();

        formdata.append('first_name', firstName);
        formdata.append('last_name', lastName);
        formdata.append('email', email);
        formdata.append('mobile_number', countrycode + mobile);
        formdata.append('social_app_id', route.params.details.id);
        formdata.append('home_number', countrycode + mobile);
        formdata.append('business_number', countrycode + mobile);
        formdata.append('preferred_contact', radioRes);
        formdata.append('term_condition', checked ? 1 : 0);
        formdata.append('device_token', deviceToken);
        formdata.append('social_type', route.params.social_type);
        this.props.socialSignup(formdata);
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
          email: res.errors.email ? true : false,
          lastName: res.errors.lastName ? true : false,
        },
        errMsg: res.errors,
      });
    }
    return res.isValid;
  };
  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.socialSignupFailure !== prevProps.socialSignupFailure &&
      this.props.socialSignupFailureMessage !== ''
    ) {
      Alert.alert(
        'Hair Biddy',
        `${this.props.socialSignupFailureMessage.social_type}`,
        [{text: 'OK', onPress: () => {}}],
        {cancelable: true},
      );
    } else if (
      this.props.socialSignupSuccess !== prevProps.socialSignupSuccess
    ) {
      AsyncStorage.setItem('loginToken', this.props.loginToken);
      AsyncStorage.setItem('loggedUserType', this.props.loggedUserType);
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({socialSignUpErrorMsg: ''});

      this.props.navigation.navigate('WelcomeScreen', {
        userType: this.props.route.params.userType,
      });
    }
  }

  render() {
    const {navigation, route, socialSignupReq} = this.props;
    let userType = route.params.userType;
    console.log('this.props', this.props);
    return (
      <ImageBackground
        source={Images.ProfileBuildIcon.ProfileBackground}
        style={{width: width, height}}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.container}>
          <View style={CommonStyle.headStyle}>
            <View style={CommonStyle.stepArrow}>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => navigation.goBack()}>
                <Image
                  source={Images.SignUpIcon.BackArrow}
                  style={[CommonStyle.backArrow]}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={CommonStyle.subContainer}>
            <Text style={CommonStyle.startedText}>Setup Your Profile</Text>
            <Text style={CommonStyle.signupText}>
              {'Vivamus accumsan hendrerit quam,\nvitae sollicitudin massa.'}
            </Text>
            <SignupCard
              {...this}
              removePass={true}
              emailEnter={
                this.props.route.params.details.email === '' ||
                this.props.route.params.details.email === null
                  ? true
                  : false
              }
              code={
                this.props.countrycode
                  ? this.props.countryCodeData.dial_code
                  : '+91'
              }
            />
            {this.state.socialSignUpErrorMsg !== '' && (
              <Text style={CommonStyle.errorMsg}>
                {this.state.socialSignUpErrorMsg}
              </Text>
            )}
            {socialSignupReq ? (
              <View style={CommonStyle.loadingStyle}>
                <ActivityIndicator size="large" color="white" />
              </View>
            ) : (
              <Button
                title={'NEXT'}
                userType={userType}
                onSubmit={this.onSubmit}
                navigation={navigation}
              />
            )}
          </View>
        </ScrollView>
      </ImageBackground>
    );
  }
}
const styles = StyleSheet.create({
  signupText: {
    fontSize: 14,
    fontFamily: Fonts.Lato_Medium,
    color: Colors.LightBlack,
    marginTop: 5,
    margin: 25,
  },
  buttonCont: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 30,
    paddingTop: 10,
  },
  container: {
    flex: 1,
    margin: 10,
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
    countryCode: state.SignupReducer.countryCode,
    socialSignupFailureMessage: state.SocialReducer.socialSignupFailureMessage,
    socialSignupFailure: state.SocialReducer.socialSignupFailure,
    socialSignupSuccess: state.SocialReducer.socialSignupSuccess,
    socialSignupReq: state.SocialReducer.socialSignupReq,
    loginToken: state.SocialReducer.loginToken,
    loggedUserType: state.SocialReducer.loggedUserType,
  };
};

const mapDispatchToProps = (dispatch) => ({
  socialSignup: (data) => dispatch(socialSignup(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(SocialSignUp);
