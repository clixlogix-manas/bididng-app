/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-did-update-set-state */
import React, {Component} from 'react';
import {
  View,
  Text,
  // Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import {Images} from '../../constants';
import CommonStyle from '../../constants/Style';
import Button from '../../components/Button';
import Input from '../../components/Input';
import DateTimePicker from '@react-native-community/datetimepicker';
import BankAccountValidationRule from '../../constants/validation/BankAccountValidation';
import {validate} from '../../constants/utilities/validator';
import {TextInput} from 'react-native';
import Fonts from '../../constants/Fonts';
import Colors from '../../constants/Colors';
import moment from 'moment';
import Spinner from 'react-native-loading-spinner-overlay';
import {connect} from 'react-redux';
import {
  addBankAccount,
  getBankAccount,
  updateBankAccount,
} from '../../redux/actions/stripeAction';
import ContactButtons from '../../components/ContactButton/ContactButtons';
import {ActivityIndicator} from 'react-native';
import {SafeAreaInsetsContext} from 'react-native-safe-area-context';
import GooglePlacesInput from '../../components/GooglePlaceInput';
import SafeAreaView from 'react-native-safe-area-view';
// const {height} = Dimensions.get('window');

class PaymentInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: '',
      routing: '',
      ssn: '',
      email: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
      address: '',
      country: [
        {
          label: 'USA',
          value: 'us',
        },
      ],
      state: [],
      city: [],
      Country: '',
      State: '',
      City: '',
      CountryCode: '',
      StateCode: '',
      birthDate: '',
      calendarDate: new Date(1598051730000),
      errStatus: {},
      errMsg: {},
      zip: '',
      loader: false,
      stateLoader: false,
      commonLoader: false,
      show: false,
      radioRes: 'male',
      addBankAccountErrorMsg: '',
      action: 1,
      typeOfCity: 'US',
      idNumber: '',
    };
  }

  handleOnChange = async (name, value) => {
    this.setState({
      [name]: value,
    });
  };

  onAddressChange = (value) => {
    let street = '';
    let country;
    let state;
    let countrycode;
    let statecode;
    let city;
    let postal;
    value.address_components.map((comp) => {
      if (comp.types[0] === 'administrative_area_level_2') {
        city = comp.long_name;
      } else if (comp.types[0] === 'administrative_area_level_1') {
        state = comp.long_name;
        statecode = comp.short_name;
      } else if (comp.types[0] === 'country') {
        country = comp.long_name;
        countrycode = comp.short_name;
      } else if (comp.types[0] === 'postal_code') {
        postal = comp.long_name;
      } else if (comp.types[0] !== 'postal_code') {
        street = street + ' ' + comp.long_name;
      }
    });
    console.log(value);
    this.setState({
      Country: country,
      State: state,
      City: city,
      CountryCode: countrycode,
      StateCode: statecode,
      address: street,
      zip: postal,
    });
  };

  onSubmit = () => {
    const {
      email,
      firstName,
      lastName,
      birthDate,
      ssn,
      phoneNumber,
      address,
      City,
      zip,
      State,
      Country,
      CountryCode,
      account,
      routing,
      radioRes,
      calendarDate,
      idNumber,
    } = this.state;
    let Field = {
      email: email,
      firstName: firstName,
      lastName: lastName,
      birthDate: birthDate,
      ssn: ssn,
      phoneNumber: phoneNumber,
      address: address,
      City: City,
      zip: zip,
      State: State,
      Country: Country,
      account: account,
      routing: routing,
      idNumber: idNumber,
    };
    if (this.isValidate(Field, BankAccountValidationRule)) {
      var numbers = /^[0-9]+$/;
      if (account.match(numbers)) {
        let formdata = new FormData();
        formdata.append('email', email);
        formdata.append('first_name', firstName);
        formdata.append('last_name', lastName);
        formdata.append('dob_day', moment(calendarDate).format('DD'));
        formdata.append('dob_month', moment(calendarDate).format('MM'));
        formdata.append('dob_year', moment(calendarDate).format('YYYY'));
        formdata.append('ssn', ssn);
        formdata.append('phone', phoneNumber);
        formdata.append('addr_line1', address);
        formdata.append('city', City);
        formdata.append('zip', zip);
        formdata.append('state', State);
        formdata.append('country', CountryCode);
        formdata.append('account_number', account);
        formdata.append('routing_number', routing);
        formdata.append('acc_holder_name', firstName + ' ' + lastName);
        formdata.append('gender', radioRes);
        formdata.append('id_number', idNumber);
        console.log(formdata);
        if (this.state.action === 1) {
          this.props.addBankAccount(formdata);
        } else if (this.state.action === 2) {
          this.props.updateBankAccount(formdata);
        }
      } else {
        this.setState({
          errStatus: {
            account: true,
          },
          errMsg: {
            account: 'Please enter a valid account number',
          },
        });
      }
    }
  };
  isValidate = (Field, ValidationRule) => {
    let res = validate(Field, ValidationRule);
    if (res.errors) {
      this.setState({
        errStatus: {
          email: res.errors.email ? true : false,
          phoneNumber: res.errors.phoneNumber ? true : false,
          ssn: res.errors.ssn ? true : false,
          firstName: res.errors.firstName ? true : false,
          birthDate: res.errors.birthDate ? true : false,
          zip: res.errors.zip ? true : false,
          lastName: res.errors.lastName ? true : false,
          account: res.errors.account ? true : false,
          routing: res.errors.routing ? true : false,
          Country: res.errors.Country ? true : false,
          State: res.errors.State ? true : false,
          address: res.errors.address ? true : false,
          City: res.errors.City ? true : false,
          idNumber: res.errors.idNumber ? true : false,
        },
        errMsg: res.errors,
      });
    }
    return res.isValid;
  };
  onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    this.setState({
      birthDate: moment(currentDate).format('DD-MM-YYYY'),
      calendarDate: currentDate,
      show: false,
    });
  };
  componentDidMount() {
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({
      commonLoader: true,
    });
    this.props.getBankAccount();
  }
  async componentDidUpdate(prevProps, prevState) {
    if (this.props.addBankAccountFailure !== prevProps.addBankAccountFailure) {
      this.setState({
        addBankAccountErrorMsg: this.props.addBankAccountFailureMessage,
      });
    } else if (
      this.props.addBankAccountSuccess !== prevProps.addBankAccountSuccess
    ) {
      this.setState({
        addBankAccountErrorMsg: '',
      });
      this.props.navigation.goBack();
    } else if (
      this.props.getBankAccountSuccess !== prevProps.getBankAccountSuccess &&
      this.props.getBankAccountSuccess === true
    ) {
      if (this.props.bankInfo && this.props.bankInfo.success.individual) {
        let custData = this.props.bankInfo.success.individual;
        let bankData = this.props.bankInfo.success.external_accounts.data;
        this.setState({
          email: custData.email,
          firstName: custData.first_name,
          lastName: custData.last_name,
          birthDate:
            custData.dob.day +
            '-' +
            custData.dob.month +
            '-' +
            custData.dob.year,
          calendarDate: new Date(
            custData.dob.year,
            // eslint-disable-next-line radix
            parseInt(custData.dob.month) - 1,
            custData.dob.day,
          ),
          phoneNumber: custData.phone.slice(2, 12),
          address: custData.address.line1,
          zip: custData.address.postal_code,
          State: custData.address.state,
          City: custData.address.city,
          Country: custData.address.country,
          account: 'xxxxxxxx' + bankData[0].last4,
          routing: bankData[0].routing_number,
          radioRes: custData.gender,
          action: 2,
          commonLoader: false,
        });
      } else {
        this.setState({
          commonLoader: false,
        });
      }
    } else if (
      this.props.updateBankAccountSuccess !== prevProps.updateBankAccountSuccess
    ) {
      this.setState({
        addBankAccountErrorMsg: '',
      });
      this.props.navigation.goBack();
    } else if (
      this.props.updateBankAccountFailure !== prevProps.updateBankAccountFailure
    ) {
      this.setState({
        addBankAccountErrorMsg: this.props.updateBankAccountFailureMessage,
      });
    }
  }
  render() {
    const {navigation, addBankAccountReq, updateBankAccountReq} = this.props;
    return (
      <SafeAreaView style={styles.Container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{flex: 1}}
          keyboardShouldPersistTaps="always"
          listViewDisplayed={false}>
          <View>
            <Spinner
              visible={this.state.commonLoader}
              textContent={'Loading...'}
              textStyle={{color: Colors.BackgroundGray}}
            />
            {/* <ImageBackground
            source={Images.HomeIcon.RedBg}
            imageStyle={{
              borderBottomLeftRadius: 15,
              borderBottomRightRadius: 15,
            }}
            style={CommonStyle.backgroundStyle}> */}
            <SafeAreaInsetsContext.Consumer>
              {(insets) => (
                <View
                  style={[
                    styles.ViewCont,
                    {
                      marginTop: Platform.OS === 'ios' ? 0 : 10,
                    },
                  ]}>
                  <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    activeOpacity={1}>
                    <Image
                      source={Images.SignUpIcon.BackArrow}
                      style={styles.BackArrowImage}
                    />
                  </TouchableOpacity>
                  <View style={styles.headingCont}>
                    <Text style={[CommonStyle.ShopName]}>
                      Payment Information{' '}
                    </Text>
                    <Text style={styles.SubHeading}>
                      Fill up the information{' '}
                    </Text>
                  </View>
                </View>
              )}
            </SafeAreaInsetsContext.Consumer>

            {/* </ImageBackground> */}
            <View style={[CommonStyle.profileCard]}>
              <View style={{padding: 15}}>
                <View style={{marginTop: 20}} />
                <Input
                  label={'Email Address'}
                  placeholder="Email"
                  name="email"
                  maxLength={50}
                  propStyle={{}}
                  errStatus={this.state.errStatus.email}
                  errMsg={this.state.errMsg.email}
                  value={this.state.email}
                  onChange={this.handleOnChange}
                  type="text"
                />
                <View style={{marginTop: 10}}>
                  <Input
                    label={'First Name'}
                    type="capital"
                    value={this.state.firstName}
                    errStatus={this.state.errStatus.firstName}
                    errMsg={this.state.errMsg.firstName}
                    onChange={this.handleOnChange}
                    propStyle={{}}
                    maxLength={20}
                    name="firstName"
                  />
                </View>
                <View style={{marginTop: 10}}>
                  <Input
                    label={'Last Name'}
                    value={this.state.lastName}
                    errStatus={this.state.errStatus.lastName}
                    errMsg={this.state.errMsg.lastName}
                    maxLength={20}
                    onChange={this.handleOnChange}
                    propStyle={{}}
                    type="capital"
                    name="lastName"
                  />
                </View>
                <View style={[styles.inputCont]}>
                  {/* <Text style={styles.labelStyle}>Address</Text> */}
                  <GooglePlacesInput
                    placeholder="  Address"
                    value={
                      this.state.address
                        ? this.state.address
                        : this.props.bankInfo &&
                          this.props.bankInfo.success.individual
                        ? this.props.bankInfo.success.individual.address.line1
                        : ''
                    }
                    onAddressChange={this.onAddressChange}
                  />
                  {this.state.errStatus.address && (
                    <Text style={CommonStyle.errorMsg}>
                      {this.state.errMsg.address}
                    </Text>
                  )}
                </View>

                <Input
                  label="ZIP"
                  name="zip"
                  placeholder={'Zip'}
                  disabled={true}
                  maxLength={6}
                  errStatus={this.state.errStatus.zip}
                  errMsg={this.state.errMsg.zip}
                  type="number"
                  propStyle={{}}
                  onChange={this.handleOnChange}
                  value={this.state.zip}
                />
                <View style={styles.InputView}>
                  <Input
                    label="Country"
                    propStyle={{}}
                    name="Country"
                    disabled={true}
                    errStatus={this.state.errStatus.Country}
                    errMsg={this.state.errMsg.Country}
                    value={this.state.CountryCode}
                    onChange={this.handleOnChange}
                  />
                </View>

                <View style={styles.InputView}>
                  <Input
                    label={
                      this.state.typeOfCity === 'US' ? 'State' : 'Province'
                    }
                    disabled={true}
                    propStyle={{}}
                    name="State"
                    errStatus={this.state.errStatus.State}
                    errMsg={this.state.errMsg.State}
                    value={this.state.State}
                    onChange={this.handleOnChange}
                  />
                </View>

                <View style={styles.InputView}>
                  <Input
                    label="City"
                    propStyle={{}}
                    name="City"
                    disabled={true}
                    errStatus={this.state.errStatus.City}
                    errMsg={this.state.errMsg.City}
                    value={this.state.City}
                    onChange={this.handleOnChange}
                  />
                </View>

                <View style={styles.InputView}>
                  <Input
                    label="Bank Account Number"
                    name="account"
                    propStyle={{}}
                    type="number"
                    errStatus={this.state.errStatus.account}
                    errMsg={this.state.errMsg.account}
                    maxLength={12}
                    placeholder={'Account number'}
                    onChange={this.handleOnChange}
                    value={this.state.account}
                  />
                </View>
                <View style={styles.InputView}>
                  <Input
                    label="Routing Number"
                    name="routing"
                    maxLength={9}
                    errStatus={this.state.errStatus.routing}
                    errMsg={this.state.errMsg.routing}
                    type="number"
                    propStyle={{}}
                    onChange={this.handleOnChange}
                    value={this.state.routing}
                  />
                </View>
                <View style={styles.InputView}>
                  <Input
                    label="SSN"
                    placeholder={'Social Security Number (last 4 digits)'}
                    name="ssn"
                    maxLength={4}
                    errStatus={this.state.errStatus.ssn}
                    errMsg={this.state.errMsg.ssn}
                    type="number"
                    propStyle={{}}
                    onChange={this.handleOnChange}
                    value={this.state.ssn}
                  />
                </View>

                <View style={styles.InputView}>
                  <Input
                    label="Goverment Issued Id"
                    name="idNumber"
                    maxLength={9}
                    errStatus={this.state.errStatus.idNumber}
                    errMsg={this.state.errMsg.idNumber}
                    type="number"
                    propStyle={{}}
                    onChange={this.handleOnChange}
                    value={this.state.idNumber}
                  />
                </View>

                <View style={styles.InputView}>
                  <Input
                    label={'Phone Number'}
                    name="phoneNumber"
                    maxLength={10}
                    propStyle={{}}
                    value={this.state.phoneNumber}
                    errStatus={this.state.errStatus.phoneNumber}
                    errMsg={this.state.errMsg.phoneNumber}
                    onChange={this.handleOnChange}
                    type="phone"
                  />
                </View>

                <View style={[styles.inputCont, {width: '100%'}]}>
                  {/* <Text style={styles.labelStyle}>Date of Birth</Text> */}
                  <View style={CommonStyle.inputBorderStyle}>
                    <TouchableOpacity
                      activeOpacity={1}
                      style={{width: '100%'}}
                      onPress={() => this.setState({show: true})}>
                      <TextInput
                        placeholder={'Date of Birth'}
                        style={styles.birthDate_Style}
                        name="birthDate"
                        value={this.state.birthDate}
                        editable={false}
                      />
                    </TouchableOpacity>
                  </View>
                  {this.state.errStatus.birthDate && (
                    <Text style={CommonStyle.errorMsg}>
                      {this.state.errMsg.birthDate}
                    </Text>
                  )}
                </View>
                <View>
                  <Text style={styles.GenderText}>Gender</Text>
                </View>
                {this.state.show && (
                  <View>
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={this.state.calendarDate}
                      mode={'date'}
                      is24Hour={true}
                      display="default"
                      onChange={this.onDateChange}
                    />
                  </View>
                )}
                <View style={{width: '100%'}}>
                  <ContactButtons
                    value={this.state.radioRes}
                    account={true}
                    onpress={(value) => this.setState({radioRes: value})}
                    value1={'male'}
                    value2={'female'}
                    label1={'Male'}
                    label2={'Female'}
                  />
                </View>
                {this.state.addBankAccountErrorMsg !== '' && (
                  <Text style={CommonStyle.errorMsg}>
                    {this.state.addBankAccountErrorMsg}
                  </Text>
                )}
                {addBankAccountReq || updateBankAccountReq ? (
                  <View style={CommonStyle.loadingStyle}>
                    <ActivityIndicator size="large" color="white" />
                  </View>
                ) : (
                  <Button
                    title={'SAVE'}
                    navigation={navigation}
                    onSubmit={this.onSubmit}
                  />
                )}
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  errorMsg: {
    color: Colors.Red,
    fontSize: 13,
    width: '88%',
    fontFamily: Fonts.Lato_Bold,
  },
  InputView: {
    marginTop: 10,
  },
  BackArrowImage: {
    height: 20.5,
    width: 12,
    marginTop: 15,
  },
  birthDate_Style: {
    color: Colors.SelectColor,
    fontFamily: Fonts.HeveticaNowText_Medium,
    width: '100%',
    paddingStart: 10,
  },
  GenderText: {
    fontSize: 16,
    fontFamily: Fonts.HeveticaNowText_Medium,
  },
  labelStyle: {
    fontSize: 14,
    fontFamily: Fonts.HeveticaNowText_Medium,
  },
  inputCont: {
    flexDirection: 'column',
    marginTop: 15,
    width: '100%',
    justifyContent: 'center',
    backgroundColor: Colors.InputBgColor,
    marginBottom: 10,
    borderRadius: 5,
  },
  ViewCont: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
  },
  headingCont: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    marginTop: 8,
  },
  SubHeading: {
    fontSize: 18,
    marginTop: 10,
    fontFamily: Fonts.HeveticaNowText_Regular,
  },
});

const mapStateToProps = (state) => {
  return {
    addBankAccountReq: state.StripeReducer.addBankAccountReq,
    addBankAccountSuccess: state.StripeReducer.addBankAccountSuccess,
    addBankAccountFailure: state.StripeReducer.addBankAccountFailure,
    addBankAccountFailureMessage:
      state.StripeReducer.addBankAccountFailureMessage,
    updateBankAccountReq: state.StripeReducer.updateBankAccountReq,
    updateBankAccountSuccess: state.StripeReducer.updateBankAccountSuccess,
    updateBankAccountFailure: state.StripeReducer.updateBankAccountFailure,
    updateBankAccountFailureMessage:
      state.StripeReducer.updateBankAccountFailureMessage,
    getBankAccountReq: state.StripeReducer.getBankAccountReq,
    getBankAccountSuccess: state.StripeReducer.getBankAccountSuccess,
    getBankAccountFailure: state.StripeReducer.getBankAccountFailure,
    getBankAccountFailureMessage:
      state.StripeReducer.getBankAccountFailureMessage,
    bankInfo: state.StripeReducer.bankInfo,
  };
};

const mapDispatchToProps = (dispatch) => ({
  addBankAccount: (data) => dispatch(addBankAccount(data)),
  updateBankAccount: (data) => dispatch(updateBankAccount(data)),
  getBankAccount: (data) => dispatch(getBankAccount(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(PaymentInfo);
