/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  // Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Platform,
} from 'react-native';
import {Images, Fonts, Colors} from '../../constants';
import CommonStyle from '../../constants/Style';
import Input from '../../components/Input';
import Button from '../../components/Button';
import {updatePassword} from '../../redux/actions/profileAction';
import {connect} from 'react-redux';
import {validate} from '../../constants/utilities/validator';
import {SafeAreaInsetsContext} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-community/async-storage';
import Axios from 'axios';
import {stylistBasepath, customerBasepath} from '../../constants/Config';
import {logout} from '../../redux/actions/authAction';
// const {height} = Dimensions.get('window');

const PasswordValidationRule = [
  {
    field: 'newPass',
    validations: ['required', 'password'],
    name: 'New password',
  },
  {
    field: 'currentPass',
    validations: ['required', 'password'],
    name: 'Current password',
  },
  {
    field: 'confirmnewPass',
    validations: ['required', 'confirm'],
    name: 'Confirm password',
  },
];

class ChangePass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
      radioRes: 'email',
      newPass: '',
      confirmPass: '',
      currentPass: '',
      showPass: false,
      showNewPass: false,
      showConfirmPass: false,
      errStatus: {},
      errMsg: {},
      passErrMsg: '',
    };
  }
  onChange = (name, value) => {
    this.setState({[name]: value});
  };
  onSubmit = () => {
    const {currentPass, confirmPass, newPass} = this.state;
    let Field = {
      currentPass: currentPass,
      newPass: newPass,
      confirmnewPass: newPass,
      confirmnewPassConfirm: confirmPass,
    };
    let formdata = new FormData();
    formdata.append('password', currentPass);
    formdata.append('new_password', newPass);
    formdata.append('confirm_password', confirmPass);

    if (this.isValidate(Field, PasswordValidationRule)) {
      this.props.updatePassword(formdata);
    }
  };
  isValidate = (Field, ValidationRule) => {
    let res = validate(Field, ValidationRule);
    if (res.errors) {
      this.setState({
        errStatus: {
          currentPass: res.errors.currentPass ? true : false,
          confirmnewPass: res.errors.confirmnewPass
            ? true
            : res.errors.confirmnewPassConfirm
            ? true
            : false,
          newPass: res.errors.newPass ? true : false,
        },
        errMsg: res.errors,
      });
    }
    return res.isValid;
  };

  async componentDidUpdate(prevProps, prevState) {
    if (this.props.updatePasswordFailure !== prevProps.updatePasswordFailure) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        passErrMsg: this.props.updatePasswordFailureMessage,
      });
    } else if (
      this.props.updatePasswordSuccess !== prevProps.updatePasswordSuccess
    ) {
      let token = await AsyncStorage.getItem('loginToken');
      let path =
        this.props.route.params.userType === 'Barber'
          ? stylistBasepath
          : customerBasepath;
      try {
        let res = await Axios.get(path + 'logout', {
          headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        });
        if (res) {
          Alert.alert('Successfully password changed');
          this.props.logout();
          await AsyncStorage.clear();
          if (this.props.route.params.userType === 'Barber') {
            this.props.navigation.navigate('JoinAsBarber');
          } else {
            this.props.navigation.navigate('SignIn', {userType: 'Customer'});
          }
          // this.props.navigation.reset({
          //   index: 0,
          //   routes: [
          //     {
          //       name: 'ChooseUser',
          //     },
          //   ],
          // });
        }
      } catch (error) {
        console.log('', error);
      }
    }
  }
  render() {
    const {navigation, updatePasswordReq} = this.props;
    return (
      <ScrollView
        style={styles.ScrollViewStyle}
        showsVerticalScrollIndicator={false}>
        <View>
          <SafeAreaInsetsContext.Consumer>
            {(insets) => (
              <View
                // eslint-disable-next-line no-sparse-arrays
                style={[
                  CommonStyle.notifyCont,
                  {
                    marginTop:
                      Platform.OS === 'android'
                        ? 20
                        : insets.top === 20
                        ? 40
                        : 70,
                  },
                  ,
                  {backgroundColor: '#FFFFFF'},
                ]}>
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  activeOpacity={1}>
                  <Image
                    source={Images.SignUpIcon.BackArrow}
                    style={styles.BackArrowStyle}
                  />
                </TouchableOpacity>
                <Text style={[CommonStyle.welcomeName, {marginLeft: -25}]}>
                  Change Password{' '}
                </Text>
                <Text style={[CommonStyle.welcomeName, {fontSize: 16}]}> </Text>
              </View>
            )}
          </SafeAreaInsetsContext.Consumer>
          <View style={[CommonStyle.profileCard]}>
            <View style={styles.subTextView}>
              <Text style={styles.subText}>
                {/* Enter the Information below to reset your password */}
              </Text>

              <View style={styles.InputView}>
                <Input
                  label={'Current Password'}
                  icon={Images.SignUpIcon.Password}
                  value={this.state.currentPass}
                  errStatus={this.state.errStatus.currentPass}
                  errMsg={this.state.errMsg.currentPass}
                  showPass={this.state.showPass}
                  onChange={this.onChange}
                  onIconPress={() =>
                    this.setState({showPass: !this.state.showPass})
                  }
                  margin={20}
                  padding={0}
                  noAutofill={true}
                  closeEyeIcon={Images.SignUpIcon.CloseEye}
                  eyeIcon={Images.SignUpIcon.Eye}
                  name="currentPass"
                  type="password"
                />
              </View>

              <View style={styles.InputView}>
                <Input
                  label={'New Password'}
                  margin={20}
                  padding={0}
                  name="newPass"
                  errStatus={this.state.errStatus.newPass}
                  noAutofill={true}
                  errMsg={this.state.errMsg.newPass}
                  icon={Images.SignUpIcon.Password}
                  value={this.state.newPass}
                  showPass={this.state.showNewPass}
                  onChange={this.onChange}
                  onIconPress={() =>
                    this.setState({showNewPass: !this.state.showNewPass})
                  }
                  closeEyeIcon={Images.SignUpIcon.CloseEye}
                  eyeIcon={Images.SignUpIcon.Eye}
                  type="password"
                />
              </View>

              <View style={styles.InputView}>
                <Input
                  label={'Confirm Password'}
                  name="confirmPass"
                  padding={0}
                  noAutofill={true}
                  errStatus={this.state.errStatus.confirmnewPass}
                  errMsg={
                    this.state.errMsg.confirmnewPassConfirm
                      ? this.state.errMsg.confirmnewPassConfirm
                      : this.state.errMsg.confirmnewPass
                      ? this.state.errMsg.confirmnewPass
                      : ''
                  }
                  margin={20}
                  value={this.state.confirmPass}
                  showPass={this.state.showConfirmPass}
                  onChange={this.onChange}
                  onIconPress={() =>
                    this.setState({
                      showConfirmPass: !this.state.showConfirmPass,
                    })
                  }
                  icon={Images.SignUpIcon.Password}
                  closeEyeIcon={Images.SignUpIcon.CloseEye}
                  eyeIcon={Images.SignUpIcon.Eye}
                  type="password"
                />
              </View>
              {this.state.passErrMsg !== '' && (
                <Text style={[CommonStyle.errorMsg, styles.errMsgStyle]}>
                  {this.state.passErrMsg}
                </Text>
              )}
              {updatePasswordReq ? (
                <View style={[CommonStyle.loadingStyle]}>
                  <ActivityIndicator size="large" color="white" />
                </View>
              ) : (
                <View style={{width: 325}}>
                  <Button
                    title={'SAVE'}
                    onSubmit={this.onSubmit}
                    bgColor={Colors.Black}
                    navigation={navigation}
                    marginTop={50}
                  />
                </View>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  subText: {
    fontSize: 15,
    color: Colors.LightBlack,
    padding: 25,
    textAlign: 'center',
    fontFamily: Fonts.HeveticaNowText_Medium,
  },
  ScrollViewStyle: {
    height: 325,
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  errMsgStyle: {
    textAlign: 'center',
    marginTop: 40,
    marginBottom: -10,
  },
  InputView: {
    width: 325,
    marginBottom: 5,
  },
  subTextView: {
    padding: 10,
    alignItems: 'center',
  },
  BackArrowStyle: {
    height: 20.5,
    width: 12,
  },
});
const mapStateToProps = (state) => {
  return {
    userInfo: state.SignupReducer.userInfo,
    updatePasswordFailureMessage:
      state.ProfileReducer.updatePasswordFailureMessage,
    updatePasswordFailure: state.ProfileReducer.updatePasswordFailure,
    updatePasswordSuccess: state.ProfileReducer.updatePasswordSuccess,
    updatePasswordReq: state.ProfileReducer.updatePassword,
  };
};

const mapDispatchToProps = (dispatch) => ({
  updatePassword: (data) => dispatch(updatePassword(data)),
  logout: () => dispatch(logout()),
});
export default connect(mapStateToProps, mapDispatchToProps)(ChangePass);
