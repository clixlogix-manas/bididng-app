import React, {Component} from 'react';
import {
  View,
  Text,
  // Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
} from 'react-native';
import {Images, Fonts, Colors} from '../../constants';
import CommonStyle from '../../constants/Style';
import Input from '../../components/Input';
import Button from '../../components/Button';
import {
  addStylistSalonDetails,
  fetchStylistDetails,
} from '../../redux/actions/authAction';
import {connect} from 'react-redux';
import {validate} from '../../constants/utilities/validator';
import ShopValidationRule from '../../constants/validation/ShopValidation';
import AsyncStorage from '@react-native-community/async-storage';
import {onLocationSearch} from '../../constants/utilities/utilities';
import Spinner from 'react-native-loading-spinner-overlay';
import {SafeAreaInsetsContext} from 'react-native-safe-area-context';
import SafeAreaView from 'react-native-safe-area-view';
import Map from '../../components/MapView';
import {StyleSheet} from 'react-native';
import GooglePlacesInput from '../../components/GooglePlaceInput';

// const {height} = Dimensions.get('window');

class ShopSalon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
      radioRes: 'male',
      country: [
        {
          label: 'USA',
          value: 'us',
        },
      ],
      state: [],
      city: [],
      Country: '',
      CountryCode: '',
      State: '',
      StateCode: '',
      City: '',
      salon: '',
      address: '',
      latitude: 37.78825,
      longitude: -122.4324,
      errStatus: {},
      errMsg: {},
      salonShopErrorMsg: '',
      loader: true,
      citySelec: false,
      cityLoader: false,
      stateLoader: false,
      typeOfCity: 'US',
    };
  }
  async componentDidMount() {
    const {userInfo} = this.props;
    if (userInfo && userInfo.provider_info) {
      let info = userInfo.provider_info;
      onLocationSearch(info.address_1).then((location) => {
        if (location) {
          this.setState({
            longitude: location.lng,
            latitude: location.lat,
          });
        }
      });
      // eslint-disable-next-line react/no-did-mount-set-state
      this.setState({
        loader: false,
        address: info.address_1,
        City: info.city,
        Country: info.country,
        CountryCode: info.country.toUpperCase(),
        typeOfCity: info.country,
        salon: info.salon_name,
        State: info.state,
      });
    }
  }
  onSubmit = () => {
    const {
      salon,
      Country,
      CountryCode,
      State,
      City,
      address,
      latitude,
      longitude,
    } = this.state;
    let formdata = new FormData();
    let Field = {
      salon: salon,
      Country: Country,
      State: State,
      address1: address,
      City: City,
    };
    if (this.isValidate(Field, ShopValidationRule)) {
      formdata.append('salon_name', salon);
      formdata.append('address_1', address);
      formdata.append('country', CountryCode);
      formdata.append('state', State);
      formdata.append('city', City);
      formdata.append('latitude', latitude);
      formdata.append('longitude', longitude);
      this.props.updateStylistSalonDetails(formdata);
    }
  };
  isValidate = (Field, ValidationRule) => {
    let res = validate(Field, ValidationRule);
    if (res.errors) {
      this.setState({
        errStatus: {
          salon: res.errors.salon ? true : false,
          Country: res.errors.Country ? true : false,
          State: res.errors.State ? true : false,
          address: res.errors.address1 ? true : false,
          City: res.errors.City ? true : false,
        },
        errMsg: res.errors,
      });
    }
    return res.isValid;
  };
  async componentDidUpdate(prevProps, prevState) {
    if (
      this.props.updateSalonDetailsFailure !==
      prevProps.updateSalonDetailsFailure
    ) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        salonShopErrorMsg: this.props.updateSalonDetailsFailureMessage,
      });
    } else if (
      this.props.updateSalonDetailsSuccess !==
      prevProps.updateSalonDetailsSuccess
    ) {
      let token = await AsyncStorage.getItem('loginToken');
      this.props.fetchStylistDetails(token);
      // this.props.navigation.navigate('Profile');
    }
  }
  onAddressChange = (value) => {
    let street = '';
    let country;
    let state;
    let countrycode;
    let statecode;
    let city;

    value.address_components.map((comp) => {
      if (comp.types[0] === 'administrative_area_level_2') {
        city = comp.long_name;
      } else if (comp.types[0] === 'administrative_area_level_1') {
        state = comp.long_name;
        statecode = comp.short_name;
      } else if (comp.types[0] === 'country') {
        country = comp.long_name;
        countrycode = comp.short_name;
      } else if (comp.types[0] !== 'postal_code') {
        street = street + ' ' + comp.long_name;
      }
    });
    this.setState({
      longitude: value.geometry.location.lng,
      latitude: value.geometry.location.lat,
      Country: country,
      State: state,
      City: city,
      CountryCode: countrycode,
      StateCode: statecode,
      address: street,
    });
  };

  handleOnChange = async (name, value) => {
    this.setState({
      [name]: value,
    });
  };
  render() {
    const placeholder = this.state.address || 'Location';
    const {navigation, updateSalonDetails} = this.props;
    return (
      <SafeAreaView style={styles.SafeAreaViewStyle}>
        <ScrollView
          style={styles.ScrollViewStyle}
          keyboardShouldPersistTaps="always"
          listViewDisplayed={false}
          showsVerticalScrollIndicator={false}>
          <Spinner
            visible={this.state.loader}
            textContent={'Loading...'}
            textStyle={{color: Colors.BackgroundGray}}
          />
          <View>
            <SafeAreaInsetsContext.Consumer>
              {(insets) => (
                <View style={[styles.ScrollViewStyle]}>
                  <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    activeOpacity={1}>
                    <Image
                      source={Images.SignUpIcon.BackArrow}
                      style={styles.BackArrowStyle}
                    />
                  </TouchableOpacity>
                  <View style={styles.ViewStyle}>
                    <Text style={[CommonStyle.ShopName]}>Salon Settings </Text>
                    <Text style={styles.FillUp_text}>
                      Fill up the information{' '}
                    </Text>
                  </View>
                </View>
              )}
            </SafeAreaInsetsContext.Consumer>
            <View style={[CommonStyle.profileCard]}>
              <View style={styles.ViewStyle1}>
                <View style={styles.ViewStyle2} />

                <Input
                  label="Salon Name"
                  propStyle={{}}
                  name="salon"
                  errStatus={this.state.errStatus.salon}
                  errMsg={this.state.errMsg.salon}
                  value={this.state.salon}
                  onChange={this.handleOnChange}
                />
                <View style={[styles.inputCont]}>
                  <GooglePlacesInput
                    placeholder={placeholder}
                    value={
                      this.state.address
                        ? this.state.address
                        : this.props.userInfo.provider_info.address_1
                    }
                    onAddressChange={this.onAddressChange}
                  />

                  {/* <Text style={styles.adressText}>{this.state.address}</Text> */}

                  {this.state.errStatus.address && (
                    <Text style={CommonStyle.errorMsg}>
                      {this.state.errMsg.address}
                    </Text>
                  )}
                </View>

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
                <View style={styles.mapView}>
                  <Map
                    address1={this.state.address}
                    longitude={this.state.longitude}
                    latitude={this.state.latitude}
                  />
                </View>
                {updateSalonDetails ? (
                  <View style={CommonStyle.loadingStyle}>
                    <ActivityIndicator size="large" color="white" />
                  </View>
                ) : (
                  <Button
                    title={'SAVE'}
                    onSubmit={this.onSubmit}
                    navigation={navigation}
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
  inputCont: {
    display: 'flex',
    backgroundColor: '#EFF0F6',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    paddingHorizontal: 10,
    marginTop: 15,
    borderRadius: 5,
  },
  BackArrowStyle: {
    height: 20.5,
    width: 12,
    marginTop: 22,
    marginLeft: 15,
  },
  SafeAreaViewStyle: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  InputView: {
    marginTop: 10,
  },
  ViewStyle1: {
    padding: 17,
  },
  FillUp_text: {
    fontSize: 18,
    marginTop: 10,
    fontFamily: Fonts.HeveticaNowText_Medium,
  },
  ViewStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    marginTop: -27,
  },
  ViewStyle2: {
    marginTop: 20,
  },
  labelStyle: {
    fontSize: 14,
    marginLeft: Platform.OS === 'android' ? 0 : 5,
    fontFamily: Fonts.HeveticaNowText_Medium,
  },
  ScrollViewStyle: {
    flex: 1,
  },
  mapView: {
    width: '100%',
  },
  adressText: {
    color: Colors.SelectColor,
    fontSize: 12,
    fontFamily: Fonts.Lato_Bold,
    marginTop: 10,
    paddingBottom: 10,
    paddingStart: 10,
  },
});
const mapStateToProps = (state) => {
  return {
    userInfo: state.SignupReducer.userInfo,
    updateSalonDetailsFailureMessage:
      state.SignupReducer.addSalonDetailsFailureMessage,
    updateSalonDetailsFailure: state.SignupReducer.addSalonDetailsFailure,
    updateSalonDetailsSuccess: state.SignupReducer.addSalonDetailsSuccess,
    updateSalonDetails: state.SignupReducer.addSalonDetails,
  };
};

const mapDispatchToProps = (dispatch) => ({
  updateStylistSalonDetails: (data) => dispatch(addStylistSalonDetails(data)),
  fetchStylistDetails: (data) => dispatch(fetchStylistDetails(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ShopSalon);
