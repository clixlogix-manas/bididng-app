/* eslint-disable react/no-did-update-set-state */
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import {Images, Fonts, Colors} from '../../constants';
import CommonStyle from '../../constants/Style';
import Input from '../../components/Input';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import Button from '../../components/Button';
import {validate} from '../../constants/utilities/validator';
import {connect} from 'react-redux';
import {forgotPassReq} from '../../redux/actions/passwordAction';
import SafeAreaView from 'react-native-safe-area-view';
const {height, width} = Dimensions.get('window');
const PassValidationRule = [
  {
    field: 'email',
    validations: ['required', 'email'],
    name: 'Email',
  },
];
class ForgotPassComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      errStatus: {},
      errMsg: {},
      forgotErrorMsg: '',
      forgotSuccessMsg: '',
    };
  }
  onSubmit = () => {
    let Field = {
      email: this.state.email,
    };
    let formdata = new FormData();
    formdata.append('email', this.state.email);
    if (this.isValidate(Field, PassValidationRule)) {
      this.setState({
        forgotSuccessMsg: '',
      });
      this.props.forgotPassReq(formdata, this.props.route.params.userType);
    }
  };
  isValidate = (Field, ValidationRule) => {
    let res = validate(Field, ValidationRule);
    if (res.errors) {
      this.setState({
        errStatus: {
          email: res.errors.email ? true : false,
        },
        errMsg: res.errors,
      });
    }
    return res.isValid;
  };
  componentDidUpdate(prevProps, prevState) {
    if (this.props.forgotPassFailure !== prevProps.forgotPassFailure) {
      this.setState({
        forgotErrorMsg: this.props.forgotPassFailureMessage,
      });
    } else if (this.props.forgotPassSuccess !== prevProps.forgotPassSuccess) {
      this.setState({
        forgotSuccessMsg: this.props.forgotPassSuccessMessage,
        email: '',
      });
    }
  }
  render() {
    const {navigation, route, forgotPassReqe} = this.props;
    let userType = route.params.userType;
    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAwareScrollView>
          <View style={{width: width, height: height}}>
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
            <View style={[styles.subContainer]}>
              <Image
                source={Images.StaticPage.LogoThree}
                style={styles.ImageStyle}
              />
              <Text style={[CommonStyle.startedText, styles.TextSty]}>
                Forgot Password
              </Text>
              <Text style={styles.signupText}>
                {'Enter your e-mail address associated with your account'}
              </Text>
              <Input
                label={'Enter Email Address'}
                name="email"
                forgot={true}
                placeholder="Email"
                onChange={(name, value) => this.setState({[name]: value})}
                icon={Images.SignUpIcon.Email}
                maxLength={50}
                errStatus={this.state.errStatus.email}
                errMsg={this.state.errMsg.email}
                value={this.state.email}
                type="text"
              />
              {this.state.forgotErrorMsg !== '' && (
                <Text style={[CommonStyle.errorMsg, styles.alignSty]}>
                  {this.state.forgotErrorMsg}
                </Text>
              )}
              {this.state.forgotSuccessMsg !== '' && (
                <Text style={[CommonStyle.errorMsg, styles.alignSty]}>
                  {this.state.forgotSuccessMsg}
                </Text>
              )}
              {forgotPassReqe ? (
                <View style={CommonStyle.loadingStyle}>
                  <ActivityIndicator size="large" color="white" />
                </View>
              ) : (
                <Button
                  title={'SUBMIT'}
                  userType={userType}
                  marginTop={50}
                  onSubmit={this.onSubmit}
                  navigation={navigation}
                />
              )}
            </View>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  signupText: {
    fontSize: 14,
    fontFamily: Fonts.HeveticaNowText_Medium,
    color: Colors.LightBlack,
    marginTop: 5,
    textAlign: 'center',
    margin: 25,
  },
  alignSty: {
    textAlign: 'center',
  },
  TextSty: {
    marginTop: 20,
  },
  ImageStyle: {
    height: 148,
    width: 230,
    marginTop: 10,
    alignSelf: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: Colors.BgColor,
  },
  subContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: 10,
  },
});
const mapStateToProps = (state) => {
  return {
    forgotPassFailureMessage: state.PasswordReducer.forgotPassFailureMessage,
    forgotPassFailure: state.PasswordReducer.forgotPassFailure,
    forgotPassSuccess: state.PasswordReducer.forgotPassSuccess,
    forgotPassSuccessMessage: state.PasswordReducer.forgotPassSuccessMessage,
    forgotPassReqe: state.PasswordReducer.forgotPassReq,
  };
};

const mapDispatchToProps = (dispatch) => ({
  forgotPassReq: (data, type) => dispatch(forgotPassReq(data, type)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassComp);
