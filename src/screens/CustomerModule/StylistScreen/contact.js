/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-did-update-set-state */
import React, {Component} from 'react';
import {
  View,
  Text,
  // Dimensions,
  Image,
  ScrollView,
  // ImageBackground,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Platform,
} from 'react-native';
import {Images, Fonts, Colors} from '../../../constants';
import CommonStyle from '../../../constants/Style';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import {connect} from 'react-redux';
import {contactStylist} from '../../../redux/actions/stylistAction';
import {validate} from '../../../constants/utilities/validator';
import {SafeAreaInsetsContext} from 'react-native-safe-area-context';

// const {height} = Dimensions.get('window');
const ContactValidationRule = [
  {
    field: 'phone',
    validations: ['digit', 'required', 'numeric'],
    name: 'Phone number',
  },
  {
    field: 'message',
    validations: ['required'],
    name: 'Message',
  },
];
class ContactComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: '',
      message: '',
      fullname: '',
      email: '',
      contactStylistErrorMsg: '',
      errStatus: {},
      errMsg: {},
      inputHeight: 0,
    };
  }
  handleOnChange = (name, value) => {
    if (name === 'phone') {
      let res = validate({[name]: value}, ContactValidationRule);
      this.setState({
        errStatus: {[name]: res.errors[name] ? true : false},
        errMsg: {[name]: res.errors[name]},
      });
    }
    this.setState({[name]: value});
  };
  componentDidMount() {
    if (this.props.userInfo) {
      let data = this.props.userInfo.user_data;
      // eslint-disable-next-line react/no-did-mount-set-state
      this.setState({
        fullname: data.name,
        email: data.email,
      });
    }
  }
  onSubmit = () => {
    const {fullname, email, message, phone} = this.state;
    let Field = {
      message: message,
      phone: phone,
    };
    if (this.isValidate(Field, ContactValidationRule)) {
      let formdata = new FormData();
      formdata.append(
        'stylist_id',
        this.props.route.params.stylistData.user_id,
      );
      formdata.append('name', fullname);
      formdata.append('email', email);
      formdata.append('phone', phone);
      formdata.append('message', message);
      this.props.contactStylist(formdata);
    }
  };
  isValidate = (Field, ValidationRule) => {
    let res = validate(Field, ValidationRule);
    if (res.errors) {
      this.setState({
        errStatus: {
          phone: res.errors.phone ? true : false,
          message: res.errors.message ? true : false,
        },
        errMsg: res.errors,
      });
    }
    return res.isValid;
  };
  componentDidUpdate(prevProps, prevState) {
    if (this.props.contactStylistFailure !== prevProps.contactStylistFailure) {
      this.setState({
        contactStylistErrorMsg: this.props.contactStylistFailureMessage,
      });
    } else if (
      this.props.contactStylistSuccess !== prevProps.contactStylistSuccess
    ) {
      this.setState({contactStylistErrorMsg: ''});

      this.props.navigation.goBack();
    }
  }
  render() {
    const {navigation, contactStylistReq} = this.props;
    console.log('Contact props', this.props);
    return (
      <ScrollView
        style={{flex: 1, backgroundColor: '#ffffff'}}
        showsVerticalScrollIndicator={false}>
        <View>
          {/* <ImageBackground
            source={Images.HomeIcon.RedBg}
            imageStyle={styles.styleRedBg}
            style={CommonStyle.backgroundStyle}> */}
          <SafeAreaInsetsContext.Consumer>
            {(insets) => (
              <View
                style={[
                  CommonStyle.notifyCont,
                  {
                    marginTop:
                      Platform.OS === 'android'
                        ? 50
                        : insets.top === 20
                        ? 40
                        : 70,
                  },
                ]}>
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  activeOpacity={1}>
                  <Image
                    source={Images.Notification.BackArrow}
                    style={styles.BackArrowStyle}
                  />
                </TouchableOpacity>
                <Text style={[CommonStyle.welcomeName, {marginLeft: -15}]}>
                  Contact{' '}
                </Text>
                <Text style={[CommonStyle.welcomeName, {fontSize: 16}]}> </Text>
              </View>
            )}
          </SafeAreaInsetsContext.Consumer>
          {/* </ImageBackground> */}
          <View style={[CommonStyle.profileCard]}>
            <View style={styles.ViewCont}>
              <View style={{marginTop: 20}} />
              <Input
                label="Full Name"
                propStyle={{width: '100%', margin: 0}}
                name="fullname"
                // disabled={true}
                maxLength={20}
                value={this.state.fullname}
                onChange={this.handleOnChange}
              />
              <Input
                label="Email Address"
                name="email"
                maxLength={50}
                // disabled={true}
                value={this.state.email}
                onChange={this.handleOnChange}
                propStyle={{width: '100%', marginTop: 8}}
              />
              <Input
                label="Phone Number"
                propStyle={{width: '100%', marginTop: 8}}
                name="phone"
                type="phone"
                errStatus={this.state.errStatus.phone}
                errMsg={this.state.errMsg.phone}
                maxLength={14}
                value={this.state.phone}
                onChange={this.handleOnChange}
              />
              <Input
                label={'Message'}
                placeholder={'Leave your message'}
                maxLength={500}
                propStyle={{width: '100%', margin: 8}}
                errStatus={this.state.errStatus.message}
                errMsg={this.state.errMsg.message}
                value={this.state.message}
                height={this.state.inputHeight}
                onHeightChange={(height) =>
                  this.setState({inputHeight: height})
                }
                onChange={this.handleOnChange}
                type="service"
                name="message"
              />

              {this.state.contactStylistErrorMsg !== '' && (
                <Text style={CommonStyle.errorMsg}>
                  {this.state.contactStylistErrorMsg}
                </Text>
              )}
              {contactStylistReq ? (
                <View style={[CommonStyle.loadingStyle]}>
                  <ActivityIndicator size="large" color="white" />
                </View>
              ) : (
                <Button
                  title={'SUBMIT'}
                  onSubmit={this.onSubmit}
                  width="100%"
                  navigation={navigation}
                />
              )}

              <Text style={styles.messText}>
                {
                  'Fill-in the information Above to send an\nEmail to the Stylist!'
                }
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  messText: {
    fontFamily: Fonts.Lato_Bold,
    fontSize: 14,
    color: Colors.LightBlack,
    textAlign: 'center',
    padding: 20,
    paddingBottom: 40,
  },
  ViewCont: {
    padding: 10,
    alignItems: 'center',
  },
  styleRedBg: {
    height: 80,
    width: 80,
    borderRadius: 15,
    margin: 10,
  },
  BackArrowStyle: {
    height: 20.5,
    width: 12,
    tintColor: 'gray',
  },
});
const mapStateToProps = (state) => {
  return {
    contactStylistFailureMessage:
      state.StylistReducer.contactStylistFailureMessage,
    contactStylistFailure: state.StylistReducer.contactStylistFailure,
    contactStylistSuccess: state.StylistReducer.contactStylistSuccess,
    contactStylistReq: state.StylistReducer.contactStylistReq,
    userInfo: state.SignupReducer.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => ({
  contactStylist: (data) => dispatch(contactStylist(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ContactComp);
