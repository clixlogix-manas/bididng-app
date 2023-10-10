/* eslint-disable radix */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-did-update-set-state */
import React, {Component} from 'react';
import {
  View,
  Text,
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Platform,
} from 'react-native';
import {Images} from '../../constants';
import CommonStyle from '../../constants/Style';
import Button from '../../components/Button';
import Input from '../../components/Input';
import {
  addServiceDiscount,
  getStylistService,
} from '../../redux/actions/serviceAction';
import {connect} from 'react-redux';
import {SafeAreaInsetsContext} from 'react-native-safe-area-context';
import SafeAreaView from 'react-native-safe-area-view';

const {height} = Dimensions.get('window');

class AddDiscount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      service: '',
      termcond: '',
      percentage: 0,
      priceDiscount: 0,
      price: '',
      serviceId: '',
      errMsg: '',
      errStatus: false,
      inputHeight: 0,
    };
  }
  handleOnChange = (name, value) => {
    if (name === 'percentage' && value) {
      this.setState(
        {
          [name]: value,
        },
        () => {
          let discount =
            (parseInt(this.state.price) * parseInt(this.state.percentage)) /
            100;
          this.setState({
            priceDiscount: parseInt(this.state.price) - discount,
          });
        },
      );
    } else if (name === 'termcond') {
      this.setState({
        [name]: value,
      });
    } else {
      this.setState({
        [name]: value,
        priceDiscount: 0,
      });
    }
  };
  onSubmit = () => {
    if (this.state.percentage !== 0) {
      let formdata = new FormData();
      formdata.append('discount_percent', parseInt(this.state.percentage, 10));
      formdata.append('service_id', this.state.serviceId);
      formdata.append('final_service_charge', this.state.priceDiscount);
      formdata.append('term_condition', this.state.termcond);
      this.props.addServiceDiscount(formdata);
    } else {
      this.setState({
        errStatus: true,
        errMsg: 'Please enter a vald percentage',
      });
    }
  };
  componentDidMount() {
    if (this.props.route.params.item) {
      let data = this.props.route.params.item;
      // eslint-disable-next-line react/no-did-mount-set-state
      this.setState({
        service: data.name,
        serviceId: data.id,
        price: data.service_charge.toString(),
        percentage: data.discount_percent
          ? data.discount_percent.toString()
          : 0,
        priceDiscount: data.final_service_charge
          ? data.final_service_charge.toString()
          : 0,
        termcond: data.term_condition ? data.term_condition : '',
      });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.addDiscountFailure !== prevProps.addDiscountFailure) {
      this.setState({
        addDiscountErrorMsg: this.props.addDiscountFailureMessage,
      });
    } else if (this.props.addDiscountSuccess !== prevProps.addDiscountSuccess) {
      this.setState({
        addDiscountErrorMsg: '',
      });
      this.props.getStylistService();
      this.props.navigation.navigate('Service');
    }
  }
  render() {
    const {navigation, addDiscountReq} = this.props;
    return (
      <SafeAreaView style={styles.Container}>
        <ScrollView
          style={styles.ScrollViewStyle}
          showsVerticalScrollIndicator={false}>
          <View>
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
                    CommonStyle.notifyCont,
                    {
                      marginTop: Platform.OS === 'android' ? 15 : 0,
                      backgroundColor: '#ffffff',
                    },
                  ]}>
                  <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.goBackStyle}
                    activeOpacity={1}>
                    <Image
                      source={Images.SignUpIcon.BackArrow}
                      style={styles.BackArrowImage}
                    />
                    <Text style={styles.HeadingText}>Discount </Text>
                  </TouchableOpacity>

                  <View style={styles.ViewCont} />
                </View>
              )}
            </SafeAreaInsetsContext.Consumer>
            {/* </ImageBackground> */}
            <View style={[CommonStyle.profileCard]}>
              <View style={{padding: 15}}>
                <View style={{marginTop: 20}} />
                <Input
                  label={'Service Name'}
                  name={'service'}
                  // disabled={true}
                  propStyle={{marginBottom: 5}}
                  onChange={this.handleOnChange}
                  value={this.state.service}
                />
                <Input
                  label="Service Price"
                  name="price"
                  // disabled={true}
                  propStyle={{marginBottom: 5}}
                  onChange={this.handleOnChange}
                  value={this.state.price}
                />
                <Input
                  label="Enter Discount Percentage"
                  type="number"
                  name="percentage"
                  errStatus={this.state.errStatus}
                  errMsg={this.state.errMsg}
                  propStyle={{marginBottom: 5}}
                  onChange={this.handleOnChange}
                  value={this.state.percentage}
                />
                <Input
                  label="Service Price After Discount"
                  type="number"
                  name="priceDiscount"
                  // disabled={true}
                  propStyle={{marginBottom: 5}}
                  onChange={this.handleOnChange}
                  value={this.state.priceDiscount.toString()}
                />
                <Input
                  label={'Terms and conditions'}
                  placeholder={'Terms & conditions'}
                  maxLength={200}
                  propStyle={{height: 80}}
                  errStatus={this.state.errStatus.termcond}
                  errMsg={this.state.errMsg.termcond}
                  value={this.state.termcond}
                  height={this.state.inputHeight}
                  onHeightChange={(heights) =>
                    this.setState({inputHeight: heights})
                  }
                  onChange={this.handleOnChange}
                  type="service"
                  name="termcond"
                />
                {/* <Input
                    label={'Description'}
                    placeholder={'Enter Few words about service'}
                    maxLength={200}
                    propStyle={{ margin: 0 }}
                    errStatus={this.state.errStatus.description}
                    errMsg={this.state.errMsg.description}
                    value={this.state.description}
                    height={this.state.inputHeight}
                    onHeightChange={(height) =>
                      this.setState({ inputHeight: height })
                    }
                    onChange={this.handleOnChange}
                    type="service"
                    name="description"
                  /> */}

                {this.state.addDiscountErrorMsg !== '' && (
                  <Text style={CommonStyle.errorMsg}>
                    {this.state.addDiscountErrorMsg}
                  </Text>
                )}
                {addDiscountReq ? (
                  <View style={CommonStyle.loadingStyle}>
                    <ActivityIndicator size="large" color="white" />
                  </View>
                ) : (
                  <Button
                    title={'ADD DISCOUNT'}
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
    backgroundColor: '#ffffff',
  },
  BackArrowImage: {
    height: 20.5,
    width: 12,
  },
  HeadingText: {
    fontSize: 14,
    marginStart: 10,
  },
  ScrollView: {
    height,
    flex: 1,
  },
  goBackStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ViewCont: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});

const mapStateToProps = (state) => {
  return {
    addDiscountReq: state.ServiceReducer.addDiscountReq,
    addDiscountSuccess: state.ServiceReducer.addDiscountSuccess,
    addDiscountFailure: state.ServiceReducer.addDiscountFailure,
    addDiscountFailureMessage: state.ServiceReducer.addDiscountFailureMessage,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getStylistService: () => dispatch(getStylistService()),
  addServiceDiscount: (data) => dispatch(addServiceDiscount(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(AddDiscount);
