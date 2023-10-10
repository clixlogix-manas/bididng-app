import React, {Component} from 'react';
import {
  View,
  Text,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  ScrollView,
  Platform,
} from 'react-native';
import {Images} from '../../../constants';
import CommonStyle from '../../../constants/Style';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import {connect} from 'react-redux';
import ShopValidationRule from '../../../constants/validation/ShopValidation';
import {addStylistSalonDetails} from '../../../redux/actions/authAction';
import {validate} from '../../../constants/utilities/validator';
import {
  // getState,
  // getCity,
  // onLocationSearch,
  getCurrentLocation,
} from '../../../constants/utilities/utilities';
import Map from '../../../components/MapView';
import Fonts from '../../../constants/Fonts';
import {StyleSheet} from 'react-native';
import GooglePlacesInput from '../../../components/GooglePlaceInput';
import SafeAreaView from 'react-native-safe-area-view';

const {height, width} = Dimensions.get('window');
class Step3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: 60,
      radioRes: 'male',
      country: [
        {
          label: 'USA',
          value: 'us',
        },
      ],
      latitude: 37.78825,
      longitude: -122.4324,
      state: [],
      city: [],
      Country: '',
      CountryCode: '',
      State: '',
      StateCode: '',
      City: '',
      salon: '',
      address1: '',
      address2: '',
      errStatus: {},
      errMsg: {},
      salonErrorMsg: '',
      loader: false,
      stateLoader: false,
      typeOfCity: 'US',
      height: false,
    };
  }

  onSubmit = () => {
    const {
      salon,
      Country,
      CountryCode,
      State,
      City,
      address1,
      latitude,
      longitude,
    } = this.state;

    let Field = {
      salon: salon,
      Country: Country,
      State: State,
      address1: address1,
      City: City,
    };
    let formdata = new FormData();

    if (this.isValidate(Field, ShopValidationRule)) {
      formdata.append('salon_name', salon);
      formdata.append('address_1', address1);
      formdata.append('country', CountryCode);
      formdata.append('state', State);
      formdata.append('city', City);
      formdata.append('latitude', latitude);
      formdata.append('longitude', longitude);
      this.props.addStylistSalonDetails(formdata);
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
          address1: res.errors.address1 ? true : false,
          City: res.errors.City ? true : false,
        },
        errMsg: res.errors,
      });
    }
    return res.isValid;
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.addSalonDetailsFailure !== prevProps.addSalonDetailsFailure
    ) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        salonErrorMsg: this.props.addSalonDetailsFailureMessage,
      });
    } else if (
      this.props.addSalonDetailsSuccess !== prevProps.addSalonDetailsSuccess
    ) {
      this.props.navigation.navigate('Step4');
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        salonErrorMsg: '',
      });
    }
  }

  componentDidMount() {
    getCurrentLocation().then((location) => {
      if (location) {
        this.setState({
          latitude: location.currentLatitude,
          longitude: location.currentLongitude,
        });
      }
    });
  }

  handleOnChange = async (name, value) => {
    this.setState({
      [name]: value,
      height: false,
    });
  };

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
      typeOfCity: countrycode,
      CountryCode: countrycode,
      StateCode: statecode,
      address1: street,
    });
  };

  render() {
    const {navigation, addSalonDetails} = this.props;
    return (
      <SafeAreaView style={styles.SafeAreaStyle}>
        {/* <Image
          source={Images.ProfileBuildIcon.ProfileBackground}
          style={{ height, width, position: 'absolute' }}
        /> */}
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="always"
          listViewDisplayed={false}
          style={styles.ScrollViewStyle}>
          <View style={styles.headerCont}>
            <View style={styles.backArrowCont}>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => navigation.goBack()}>
                <Image
                  source={Images.SignUpIcon.BackArrow}
                  style={[CommonStyle.backArrow]}
                />
              </TouchableOpacity>
            </View>
            <Text style={[styles.Step3_Text]}>Step 3</Text>
          </View>
          <View style={[CommonStyle.subContainer, styles.heading_text]}>
            <Text style={[CommonStyle.startedText, styles.heading]}>
              Salon Settings
            </Text>
            <Text style={CommonStyle.startedTextNew}>
              Fill up the information
            </Text>
            <View style={styles.inputsCont}>
              <View style={styles.salonName_Cont} />
              <Input
                label="Salon Name"
                name="salon"
                type="capital"
                maxLength={20}
                propStyle={styles.propSty}
                errStatus={this.state.errStatus.salon}
                errMsg={this.state.errMsg.salon}
                value={this.state.salon}
                onChange={this.handleOnChange}
              />
              <View style={[styles.inputCont]}>
                <View style={styles.GooglePlacesCont}>
                  {/* <Text style={styles.labelStyle}>Street 1 Address</Text> */}
                  <View>
                    <GooglePlacesInput
                      placeholder=" Salon Address"
                      onAddressChange={this.onAddressChange}
                    />
                  </View>
                  {this.state.errStatus.address1 && (
                    <Text style={CommonStyle.errorMsg}>
                      {this.state.errMsg.address1}
                    </Text>
                  )}
                </View>
              </View>
              <View style={styles.InputView}>
                <Input
                  label="Country"
                  name="Country"
                  disabled={true}
                  errStatus={this.state.errStatus.Country}
                  errMsg={this.state.errMsg.Country}
                  value={this.state.CountryCode}
                  propStyle={styles.propSty}
                  onChange={this.handleOnChange}
                />
              </View>
              <View style={styles.InputView}>
                <Input
                  label={this.state.typeOfCity === 'US' ? 'State' : 'Province'}
                  disabled={true}
                  name="State"
                  errStatus={this.state.errStatus.State}
                  errMsg={this.state.errMsg.State}
                  value={this.state.State}
                  propStyle={styles.propSty}
                  onChange={this.handleOnChange}
                />
              </View>
              <View style={styles.CityCont}>
                <Input
                  label="City"
                  name="City"
                  disabled={true}
                  errStatus={this.state.errStatus.City}
                  errMsg={this.state.errMsg.City}
                  value={this.state.City}
                  propStyle={styles.propSty}
                  onChange={this.handleOnChange}
                />
              </View>
              <View style={styles.MapView}>
                <Map
                  address1={this.state.address1}
                  longitude={this.state.longitude}
                  latitude={this.state.latitude}
                />
              </View>
            </View>
          </View>
          <View style={styles.ButtonCont}>
            {addSalonDetails ? (
              <View style={CommonStyle.loadingStyle}>
                <ActivityIndicator size="large" color="white" />
              </View>
            ) : (
              <Button
                title={'NEXT'}
                onSubmit={this.onSubmit}
                navigation={navigation}
              />
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  inputCont: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    marginBottom: 5,
    marginTop: 15,
    width: Platform.OS === 'android' ? '100%' : '100%',
    backgroundColor: '#EFF0F6',
    borderRadius: 5,
  },
  inputsCont: {
    alignItems: 'center',
  },
  propSty: {
    width: '100%',
  },
  backArrowCont: {
    marginLeft: 10,
    marginTop: 10,
    height: 40,
    width: 40,
  },
  salonName_Cont: {
    marginTop: 20,
  },
  heading: {},
  heading_text: {
    paddingHorizontal: 30,
  },
  headerCont: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 10,
    height: 50,
    margin: 20,
    width: '90%',
    alignSelf: 'center',
  },
  Step3_Text: {
    width: '70%',
    fontSize: 18,
    textAlignVertical: 'center',
    textAlign: 'center',
    bottom: 5,
    fontFamily: Fonts.HeveticaNowText_Bold,
  },
  ButtonCont: {
    paddingHorizontal: 20,
    width: '100%',
  },
  GooglePlacesCont: {
    marginBottom: 35,
  },
  CityCont: {
    marginTop: 5,
    width: '100%',
  },
  InputView: {
    marginBottom: 5,
    marginTop: 5,
    width: '100%',
  },
  labelStyle: {
    fontSize: 14,
    fontFamily: Fonts.HeveticaNowText_Medium,
  },
  MapView: {
    width: '100%',
  },
  SafeAreaStyle: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  ScrollViewStyle: {
    flex: 1,
    height,
    width,
  },
});
const mapStateToProps = (state) => {
  return {
    addSalonDetailsFailureMessage:
      state.SignupReducer.addSalonDetailsFailureMessage,
    addSalonDetailsFailure: state.SignupReducer.addSalonDetailsFailure,
    addSalonDetailsSuccess: state.SignupReducer.addSalonDetailsSuccess,
    addSalonDetails: state.SignupReducer.addSalonDetails,
  };
};

const mapDispatchToProps = (dispatch) => ({
  addStylistSalonDetails: (data) => dispatch(addStylistSalonDetails(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Step3);
