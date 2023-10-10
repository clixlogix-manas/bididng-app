/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {Images, Fonts} from '../../constants';
import CommonStyle from '../../constants/Style';
import Button from '../../components/Button';
import Dropdown from '../../components/Dropdown';
import Input from '../../components/Input';
import Colors from '../../constants/Colors';
import CheckBoxCont from '../../components/CheckboxCont';
import {connect} from 'react-redux';
import {validate} from '../../constants/utilities/validator';
import ServiceValidationRule from '../../constants/validation/ServiceValidation';
import {
  getStylistService,
  addStylistService,
  editStylistService,
} from '../../redux/actions/serviceAction';
import {SafeAreaInsetsContext} from 'react-native-safe-area-context';
import {Platform} from 'react-native';
const {height} = Dimensions.get('window');
import SafeAreaView from 'react-native-safe-area-view';

class AddService extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: [],
      duration: [
        {
          label: '30 Mins',
          value: 30,
        },
        {
          label: '1 Hours',
          value: 60,
        },
        {
          label: '1 hour 30 Mins',
          value: 90,
        },
        {
          label: '2 Hours',
          value: 120,
        },
        {
          label: '2 hour 30 Mins',
          value: 150,
        },
        {
          label: '3 Hours',
          value: 180,
        },
        {
          label: '3 hour 30 Mins',
          value: 210,
        },
        {
          label: '4 Hours',
          value: 240,
        },
      ],
      Category: '',
      Duration: '',
      showService: false,
      onlnBooking: false,
      service: '',
      description: '',
      price: '',
      errStatus: {},
      errMsg: {},
      inputHeight: 0,
      addServiceErrorMsg: '',
    };
  }
  handleOnChange = (name, value) => {
    this.setState({
      [name]: value,
    });
  };
  async componentDidMount() {
    let filterData;
    if (this.props.serviceCatList) {
      filterData = this.props.serviceCatList.map((category) => {
        return {
          label: category.name,
          value: category.id,
        };
      });
      // eslint-disable-next-line react/no-did-mount-set-state
      this.setState(
        {
          category: filterData,
        },
        () => {
          if (this.props.route.params.item) {
            let data = this.props.route.params.item;

            let filterCategory = this.props.serviceCatList.filter(
              (filterdata) => {
                return filterdata.id === data.cat_id;
              },
            );

            let filterDuration = this.state.duration.filter((filterdata) => {
              return filterdata.value === data.service_duration;
            });

            this.setState({
              Category: filterCategory[0].id,
              Duration: filterDuration[0].value,
              showService: data.show_service_on_profile === 1 ? true : false,
              onlnBooking: data.online_book_payment === 1 ? true : false,
              service: data.name,
              description: data.description,
              price: data.service_charge.toString(),
            });
          }
        },
      );
    }
    this.props.getStylistService();
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.addServiceFailure !== prevProps.addServiceFailure) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        addServiceErrorMsg: this.props.addServiceFailureMessage,
      });
    } else if (this.props.addServiceSuccess !== prevProps.addServiceSuccess) {
      this.props.navigation.goBack();
    } else if (this.props.editServiceSuccess !== prevProps.editServiceSuccess) {
      this.props.navigation.navigate('Service');
    }
  }
  onSubmit = () => {
    const {
      Category,
      Duration,
      service,
      description,
      price,
      showService,
      onlnBooking,
    } = this.state;
    const {userInfo} = this.props;
    let Field = {
      Category: Category,
      Duration: Duration,
      service: service,
      description: description,
      price: price,
    };

    if (this.isValidate(Field, ServiceValidationRule)) {
      let formdata = new FormData();
      formdata.append('service_name', service);
      formdata.append('service_category', Category);
      formdata.append('Service_Provider', userInfo.provider.id);
      // eslint-disable-next-line radix
      formdata.append('service_charge', parseInt(price));
      formdata.append('service_duration', Duration);
      formdata.append('status', 1);
      formdata.append('description', description);
      formdata.append('show_service_on_profile', showService ? 1 : 0);
      formdata.append('online_book_payment', onlnBooking ? 1 : 0);
      if (this.props.route.params.passType === 'addService') {
        this.props.addStylistService(formdata);
      } else {
        this.props.editStylistService(
          formdata,
          this.props.route.params.item.id,
        );
      }
    }
  };
  isValidate = (Field, ValidationRule) => {
    let res = validate(Field, ValidationRule);
    if (res.errors) {
      this.setState({
        errStatus: {
          Category: res.errors.Category ? true : false,
          Duration: res.errors.Duration ? true : false,
          service: res.errors.service ? true : false,
          description: res.errors.description ? true : false,
          price: res.errors.price ? true : false,
        },
        errMsg: res.errors,
      });
    }
    return res.isValid;
  };
  render() {
    const placeholder = 'Select Service Category...';
    const placeholder2 = 'Select Service Duration...';
    const {navigation, addServiceReq, editServiceReq} = this.props;
    // let listData = route.params.data ? route.params.data : null;

    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#ffffff'}}>
        <ScrollView
          style={{height, flex: 1}}
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
                    {marginTop: Platform.OS === 'android' ? 10 : 0},
                  ]}>
                  <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{flexDirection: 'row', alignItems: 'center'}}
                    activeOpacity={1}>
                    <Image
                      source={Images.SignUpIcon.BackArrow}
                      style={{height: 20.5, width: 12}}
                    />
                    <Text style={{fontSize: 14, marginStart: 10}}>Edit </Text>
                  </TouchableOpacity>
                  <View style={styles.ViewStyles} />
                </View>
              )}
            </SafeAreaInsetsContext.Consumer>
            {/* </ImageBackground> */}
            <View style={[CommonStyle.profileCard]}>
              <View style={{padding: 10}}>
                {/* <View style={{ marginTop: 20 }}></View> */}

                {Platform.OS === 'android' ? (
                  <View style={{marginTop: 0}}>
                    <Dropdown
                      label="Service Category"
                      type="shop"
                      name="Category"
                      items={this.state.category}
                      placeholder={placeholder}
                      errStatus={this.state.errStatus.Category}
                      errMsg={this.state.errMsg.Category}
                      onChange={this.handleOnChange}
                      value={this.state.Category}
                    />
                  </View>
                ) : (
                  <View style={{zIndex: 3000, zIndexInverse: 1000}}>
                    <Dropdown
                      label="Service Category"
                      type="shop"
                      name="Category"
                      items={this.state.category}
                      placeholder={placeholder}
                      errStatus={this.state.errStatus.Category}
                      errMsg={this.state.errMsg.Category}
                      onChange={this.handleOnChange}
                      value={this.state.Category}
                    />
                  </View>
                )}

                {/* <Text style={styles.addCategory}>
                {route.params.passType === 'addService'
                  ? 'Add a Category'
                  : 'Edit Category'}
                 </Text> */}
                <View style={{marginTop: 10}}>
                  <Input
                    label="Service Name"
                    name="service"
                    type="capital"
                    errStatus={this.state.errStatus.service}
                    errMsg={this.state.errMsg.service}
                    propStyle={{}}
                    onChange={this.handleOnChange}
                    value={this.state.service}
                  />
                </View>

                {Platform.OS === 'android' ? (
                  <View style={{}}>
                    <Dropdown
                      label="Select Service Duration"
                      type="shop"
                      name="Duration"
                      errStatus={this.state.errStatus.Duration}
                      errMsg={this.state.errMsg.Duration}
                      items={this.state.duration}
                      onChange={this.handleOnChange}
                      value={this.state.Duration}
                      placeholder={placeholder2}
                    />
                  </View>
                ) : (
                  <View style={{zIndex: 2000, zIndexInverse: 2000}}>
                    <Dropdown
                      label="Select Service Duration"
                      type="shop"
                      name="Duration"
                      errStatus={this.state.errStatus.Duration}
                      errMsg={this.state.errMsg.Duration}
                      items={this.state.duration}
                      onChange={this.handleOnChange}
                      value={this.state.Duration}
                      placeholder={placeholder2}
                    />
                  </View>
                )}
                <View style={{marginTop: 10}}>
                  <Input
                    label="Service Price"
                    name="price"
                    type="number"
                    errStatus={this.state.errStatus.price}
                    errMsg={this.state.errMsg.price}
                    propStyle={{}}
                    onChange={this.handleOnChange}
                    value={this.state.price}
                  />
                </View>
                <View style={{marginTop: 10}}>
                  <Input
                    label={'Description'}
                    placeholder={'Enter Few words about service'}
                    maxLength={200}
                    propStyle={{}}
                    errStatus={this.state.errStatus.description}
                    errMsg={this.state.errMsg.description}
                    value={this.state.description}
                    height={this.state.inputHeight}
                    onHeightChange={(heights) =>
                      this.setState({inputHeight: heights})
                    }
                    onChange={this.handleOnChange}
                    type="service"
                    name="description"
                  />
                </View>
                <CheckBoxCont
                  label="Show Service on Profile"
                  marginTop={20}
                  width={Platform.OS === 'android' ? '95%' : '93%'}
                  checkvalue={this.state.showService}
                  onpress={() =>
                    this.setState({showService: !this.state.showService})
                  }
                />
                <CheckBoxCont
                  label="Online Booking Payment"
                  width={Platform.OS === 'android' ? '95%' : '93%'}
                  checkvalue={this.state.onlnBooking}
                  onpress={() =>
                    this.setState({onlnBooking: !this.state.onlnBooking})
                  }
                />
                {this.state.addServiceErrorMsg !== '' && (
                  <Text style={CommonStyle.errorMsg}>
                    {this.state.addServiceErrorMsg}
                  </Text>
                )}
                {addServiceReq || editServiceReq ? (
                  <View style={CommonStyle.loadingStyle}>
                    <ActivityIndicator size="large" color="white" />
                  </View>
                ) : (
                  <Button title={'SAVE'} onSubmit={this.onSubmit} />
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
  addCategory: {
    fontSize: 14,
    textAlign: 'left',
    width: '90%',
    marginBottom: 20,
    color: Colors.Red,
    fontFamily: Fonts.Lato_Heavy,
    zIndex: -1,
  },
  ViewStyles: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});
const mapStateToProps = (state) => {
  return {
    userInfo: state.SignupReducer.userInfo,
    addServiceReq: state.ServiceReducer.addServiceReq,
    editServiceReq: state.ServiceReducer.editServiceReq,
    addServiceSuccess: state.ServiceReducer.addServiceSuccess,
    editServiceSuccess: state.ServiceReducer.editServiceSuccess,
    addServiceFailure: state.ServiceReducer.addServiceFailure,
    addServiceFailureMessage: state.ServiceReducer.addServiceFailureMessage,
    serviceList: state.ServiceReducer.serviceList,
    serviceCatList: state.ServiceReducer.serviceCatList,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getStylistService: () => dispatch(getStylistService()),
  addStylistService: (data) => dispatch(addStylistService(data)),
  editStylistService: (data, id) => dispatch(editStylistService(data, id)),
});
export default connect(mapStateToProps, mapDispatchToProps)(AddService);
