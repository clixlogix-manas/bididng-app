/* eslint-disable react/no-did-update-set-state */
import React, {Component} from 'react';
import {
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Text,
  Platform,
} from 'react-native';
import Button from '../../../components/Button';
import {Images, Fonts, Colors} from '../../../constants';
import CommonStyle from '../../../constants/Style';
import Input from '../../../components/Input';
import {TouchableWithoutFeedback} from 'react-native';
import moment from 'moment';
import {Modal} from 'react-native';
import {FlatList} from 'react-native';
import {TextInput} from 'react-native';
import CardValidationRule from '../../../constants/validation/CardValidation';
import {validate} from '../../../constants/utilities/validator';
import {connect} from 'react-redux';
import {
  addPaymentCard,
  createStripeCustomer,
} from '../../../redux/actions/stripeAction';
import {ActivityIndicator} from 'react-native';
const {height, width} = Dimensions.get('window');
const STANDARD_WIDTH = 375;
const CURRENT_WIDTH = width;
const K = CURRENT_WIDTH / STANDARD_WIDTH;
class AddCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardNo: '',
      holderName: '',
      expiryDate: '',
      cvv: '',
      month: '',
      year: '',
      arrayOfMonth: [
        {
          label: '01',
          value: '1',
        },
        {
          label: '02',
          value: '2',
        },
        {
          label: '03',
          value: '3',
        },
        {
          label: '04',
          value: '4',
        },
        {
          label: '05',
          value: '5',
        },
        {
          label: '06',
          value: '6',
        },
        {
          label: '07',
          value: '7',
        },
        {
          label: '08',
          value: '8',
        },
        {
          label: '09',
          value: '9',
        },
        {
          label: '10',
          value: '10',
        },
        {
          label: '11',
          value: '11',
        },
        {
          label: '12',
          value: '12',
        },
      ],
      errStatus: {},
      customerId: '',
      errMsg: {},
      isVisible: false,
      arrayOfYear: [],
      itemVisible: 'Year',
    };
  }

  handleOnChange = (name, value) => {
    this.setState({
      [name]: value,
    });
  };
  cc_format(value) {
    var v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    var matches = v.match(/\d{4,19}/g);
    var match = (matches && matches[0]) || '';
    var parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      this.setState({cardNo: parts.join(' ')});
    } else {
      this.setState({cardNo: value});
    }
  }
  componentDidMount() {
    const currentDate = new Date();
    const currentYear = moment(currentDate).format('YYYY');
    const currentYearNum = Number(currentYear);
    var arrayOfYear = [];
    for (var i = currentYearNum; i <= currentYearNum + 10; i++) {
      const obj = {
        label: `${i}`,
        value: `${i}`,
      };
      arrayOfYear.push(obj);
    }
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({arrayOfYear});
  }
  onCardSave = () => {
    let Field = {
      cardNo: this.state.cardNo,
      expiryMonth: this.state.month,
      expiryYear: this.state.year,
      cvv: this.state.cvv,
      holderName: this.state.holderName,
    };
    if (this.isValidate(Field, CardValidationRule)) {
      this.props.createStripeCustomer();
    }
  };
  isValidate = (Field, ValidationRule) => {
    let res = validate(Field, ValidationRule);
    if (res.errors) {
      this.setState({
        errStatus: {
          cardNo: res.errors.cardNo ? true : false,
          expiryMonth: res.errors.expiryMonth ? true : false,
          expiryYear: res.errors.expiryYear ? true : false,
          cvv: res.errors.cvv ? true : false,
          holderName: res.errors.holderName ? true : false,
        },
        errMsg: res.errors,
      });
    }
    return res.isValid;
  };
  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.createStripeCustSuccess !== prevProps.createStripeCustSuccess
    ) {
      this.setState(
        {
          customerId: this.props.customerData,
        },
        () => {
          let formdata = new FormData();
          formdata.append('stripe_id', this.props.customerData);
          formdata.append('card_number', this.state.cardNo.trim());
          formdata.append('exp_month', Number(this.state.month));
          formdata.append('exp_year', Number(this.state.year));
          formdata.append('cvc', this.state.cvv);
          formdata.append('name', this.state.holderName);
          this.props.addPaymentCard(formdata);
        },
      );
    } else if (
      this.props.addPaymentCardSuccess !== prevProps.addPaymentCardSuccess
    ) {
      if (this.props.cardData && this.props.cardData.card_info) {
        if (this.props.bookingData) {
          let formdata = new FormData();
          formdata = this.props.bookingData;
          formdata.append('card_id', this.props.cardData.card_info.id);
          formdata.append(
            'stripe_acc_id',
            this.props.cardData.card_info.customer,
          );
          this.setState({
            operationFailure: '',
          });
          if (this.props.screen === 'payment') {
            this.props.navigation.navigate('PaymentComplete', {
              booking_id: this.props.bookingData._parts[1][1],
              userType: 'Customer',
              bookingData: formdata,
            });
          } else {
            this.props.navigation.navigate('ReviewBooking', {
              bookingData: formdata,
            });
          }
        } else {
          this.props.goBack();
        }
      }
    } else if (
      this.props.addPaymentCardFailureMessage !==
        prevProps.addPaymentCardFailureMessage &&
      this.props.addPaymentCardFailureMessage !== ''
    ) {
      this.setState({
        operationFailure: this.props.addPaymentCardFailureMessage,
      });
    }
  }
  render() {
    const {navigation, addPaymentCardReq, createStripeCustReq} = this.props;
    return (
      <View style={[CommonStyle.subContainer, styles.container]}>
        <Text style={styles.signupText}>
          {'Enter information below to\nadd a card'}
        </Text>
        <View style={styles.InputView1}>
          <Input
            label="Card Number"
            placeholder={'Card Number'}
            name="cardNo"
            type="number"
            maxLength={19}
            margin={18}
            errStatus={this.state.errStatus.cardNo}
            errMsg={this.state.errMsg.cardNo}
            cardIcon={Images.CustomerHomeIcon.Master}
            value={this.state.cardNo}
            onChange={(name, cardNumber) => this.cc_format(cardNumber)}
          />
          <View style={styles.InputView}>
            <Input
              label="Account Holder Name"
              name="holderName"
              maxLength={20}
              errStatus={this.state.errStatus.holderName}
              errMsg={this.state.errMsg.holderName}
              margin={18}
              value={this.state.holderName}
              onChange={this.handleOnChange}
            />
          </View>
          <View style={[styles.inputCont]}>
            {/* <Text style={styles.labelStyle}>Expiry date</Text> */}
            <View style={[styles.viewCont]}>
              <TouchableOpacity
                activeOpacity={1}
                style={styles.style1}
                onPress={() =>
                  this.setState({
                    itemVisible: 'Month',
                    isVisible: true,
                  })
                }>
                <TextInput
                  placeholder={'Expire date (MM'}
                  style={styles.TextInputStyle3}
                  value={this.state.month}
                  editable={false}
                  name="expiryMonth"
                />
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={1} style={styles.style2}>
                <TextInput
                  placeholder={'/'}
                  style={styles.TextInputStyle2}
                  editable={false}
                />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={1}
                style={styles.OpacityStyle}
                onPress={() =>
                  this.setState({itemVisible: 'Year', isVisible: true})
                }>
                <TextInput
                  placeholder={'YY)'}
                  style={styles.TextInputStyle}
                  value={this.state.year}
                  editable={false}
                  name="expiryYear"
                />
              </TouchableOpacity>
            </View>
            {this.state.errStatus.expiryMonth ? (
              <Text style={CommonStyle.errorMsg}>
                {this.state.errMsg.expiryMonth}
              </Text>
            ) : this.state.errStatus.expiryYear ? (
              <Text style={CommonStyle.errorMsg}>
                {this.state.errMsg.expiryYear}
              </Text>
            ) : null}
          </View>
          <Input
            label="CVV"
            name="cvv"
            type="number"
            errStatus={this.state.errStatus.cvv}
            errMsg={this.state.errMsg.cvv}
            maxLength={4}
            margin={18}
            value={this.state.cvv}
            onChange={this.handleOnChange}
          />
          <Modal
            visible={this.state.isVisible}
            animationType="none"
            transparent={true}>
            <TouchableOpacity
              style={styles.modalContainer}
              activeOpacity={1}
              onPress={() => this.setState({isVisible: false})}>
              <TouchableWithoutFeedback>
                <View style={styles.monthView}>
                  <FlatList
                    data={
                      this.state.itemVisible === 'Month'
                        ? this.state.arrayOfMonth
                        : this.state.arrayOfYear
                    }
                    keyExtractor={(_, index) => index.toString()}
                    renderItem={({item, index}) => (
                      <TouchableOpacity
                        onPress={() =>
                          this.state.itemVisible === 'Month'
                            ? this.setState({
                                month: item.value,
                                isVisible: false,
                              })
                            : this.setState({
                                year: item.value,
                                isVisible: false,
                              })
                        }
                        style={{
                          paddingHorizontal: K * 16,
                          paddingVertical: K * 12,
                        }}>
                        <Text>{item.value}</Text>
                      </TouchableOpacity>
                    )}
                  />
                </View>
              </TouchableWithoutFeedback>
            </TouchableOpacity>
          </Modal>
        </View>
        {this.state.operationFailure !== '' && (
          <Text style={CommonStyle.errorMsg}>
            {this.state.operationFailure}
          </Text>
        )}
        {createStripeCustReq || addPaymentCardReq ? (
          <View style={[CommonStyle.loadingStyle]}>
            <ActivityIndicator size="large" color="white" />
          </View>
        ) : (
          <View style={styles.ButtonView}>
            <Button
              title={'SAVE'}
              onSubmit={this.onCardSave}
              navigation={navigation}
            />
          </View>
        )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  signupText: {
    fontSize: 18,
    fontFamily: Fonts.HeveticaNowText_Regular,
    color: Colors.LightBlack,
    marginTop: 5,
    textAlign: 'center',
    margin: 25,
  },
  TextInputStyle: {
    // width: '100%',
    marginTop: Platform.OS === 'android' ? 0 : 20,
    color: Colors.SelectColor,
    fontFamily: Fonts.HeveticaNowText_Medium,
    marginLeft: -20,
  },
  OpacityStyle: {
    width: '20%',
  },
  InputView: {
    marginTop: 5,
  },
  style2: {
    // width: '5%',
  },
  style1: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewCont: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    height: 50,
    paddingStart: 10,
    backgroundColor: Colors.InputBgColor,
  },
  TextInputStyle3: {
    // width: '100%',
    color: Colors.SelectColor,
    fontFamily: Fonts.HeveticaNowText_Medium,
    marginRight: -25,
  },
  ButtonView: {marginHorizontal: 10},
  TextInputStyle2: {
    color: Colors.SelectColor,
    fontFamily: Fonts.HeveticaNowText_Medium,
    marginLeft: 20,
    marginTop: Platform.OS === 'android' ? 0 : 20,
  },
  errorMsg: {
    color: Colors.Red,
    fontSize: 13,
    fontFamily: Fonts.Lato_Bold,
    marginTop: 10,
  },
  monthView: {
    backgroundColor: '#ffffff',
    width: width - K * 50,
    height: height - K * 200,
    borderRadius: 5,
  },
  modalContainer: {
    backgroundColor: '#00000055',
    flex: 1,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelStyle: {
    fontSize: 14,
    fontFamily: Fonts.HeveticaNowText_Medium,
  },
  InputView1: {
    marginTop: 10,
    marginHorizontal: 15,
  },
  inputCont: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    marginTop: 10,
    marginBottom: 5,
  },
});

const mapStateToProps = (state) => {
  return {
    createStripeCustReq: state.StripeReducer.createStripeCustReq,
    createStripeCustSuccess: state.StripeReducer.createStripeCustSuccess,
    createStripeCustFailure: state.StripeReducer.createStripeCustFailure,
    customerData: state.StripeReducer.customerData,
    addPaymentCardReq: state.StripeReducer.addPaymentCardReq,
    addPaymentCardSuccess: state.StripeReducer.addPaymentCardSuccess,
    addPaymentCardFailure: state.StripeReducer.addPaymentCardFailure,
    cardData: state.StripeReducer.cardData,
    addPaymentCardFailureMessage:
      state.StripeReducer.addPaymentCardFailureMessage,
  };
};

const mapDispatchToProps = (dispatch) => ({
  createStripeCustomer: () => dispatch(createStripeCustomer()),
  addPaymentCard: (data) => dispatch(addPaymentCard(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(AddCard);
