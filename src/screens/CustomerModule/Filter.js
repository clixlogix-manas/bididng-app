/* eslint-disable no-unused-vars */
/* eslint-disable react/no-did-update-set-state */
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
import {Images, Fonts, Colors} from '../../constants';
import CommonStyle from '../../constants/Style';
import Button from '../../components/Button';
import Dropdown from '../../components/Dropdown';
import RangeSlider from 'rn-range-slider';
import CheckBoxCont from '../../components/CheckboxCont';
import {connect} from 'react-redux';
import {filterStylist} from '../../redux/actions/stylistAction';
import {SafeAreaInsetsContext} from 'react-native-safe-area-context';
import Map from '../../components/MapView';
import {getCurrentLocation} from '../../constants/utilities/utilities';
import {Platform} from 'react-native';
import GooglePlacesInput from '../../components/GooglePlaceInput';

const {height} = Dimensions.get('window');

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: [],
      distance: [
        {
          label: '10 Millis',
          value: '10',
        },
        {
          label: '25 Millis',
          value: '25',
        },
        {
          label: '50 Millis',
          value: '50',
        },
      ],
      reviewStar: [
        {
          label: '1',
          value: '1',
        },
        {
          label: '2',
          value: '2',
        },
        {
          label: '3',
          value: '3',
        },
        {
          label: '4',
          value: '4',
        },
        {
          label: '5',
          value: '5',
        },
      ],
      ReviewStar: '2',
      newexperience: [
        {
          label: '0-1 year',
          value: '0-1',
        },
        {
          label: '2-5 year',
          value: '2-5',
        },
        {
          label: '5-10 year',
          value: '5-10',
        },
        {
          label: '11-15 year',
          value: '11-15',
        },
        {
          label: '16-20 year',
          value: '16-20',
        },
        {
          label: '20+ year',
          value: '20+',
        },
      ],
      latitude: 37.78825,
      longitude: -122.4324,
      currentLatitude: 0,
      currentLongitude: 0,
      filterStylistErrorMsg: '',
      Category: '',
      Experience: '',
      Distance: '10',
      showService: false,
      onlnBooking: false,
      currentLocation: false,
      location: '',
      rangeLow: 5,
      rangeHigh: 1000,
      errMsg: {},
      errStatus: {},
      dollar: '$',
    };
  }
  handleOnChange = (name, value) => {
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
      location: street,
    });
  };
  componentDidMount() {
    console.log(
      'DidMount this.props.serviceCatList',
      this.props.serviceCatList,
    );
    if (this.props.serviceCatList) {
      let filterData = this.props.serviceCatList.map((category) => {
        return {
          label: category.name,
          value: category.id,
        };
      });
      // eslint-disable-next-line react/no-did-mount-set-state
      this.setState({
        category: filterData,
      });
    }
    getCurrentLocation().then((location) => {
      if (location) {
        this.setState({
          currentLatitude: location.currentLatitude,
          currentLongitude: location.currentLongitude,
          latitude: location.currentLatitude,
          longitude: location.currentLongitude,
        });
      }
    });
  }
  onCurrentLocationPress = () => {
    this.setState({
      currentLocation: !this.state.currentLocation,
      location: '',
      latitude: this.state.currentLatitude,
      longitude: this.state.currentLongitude,
    });
  };
  onSubmit = () => {
    const {
      location,
      rangeHigh,
      rangeLow,
      Experience,
      Category,
      Distance,
      latitude,
      longitude,
      ReviewStar,
    } = this.state;
    let formdata = new FormData();
    formdata.append('location', location);
    formdata.append('price_min', rangeLow);
    formdata.append('price_max', rangeHigh);
    formdata.append('experience', Experience);
    formdata.append('category_id', Category);
    formdata.append('latitude', latitude);
    formdata.append('longitude', longitude);
    formdata.append('distance_preference', Distance);
    formdata.append('rating_value', ReviewStar);
    // formdata.append('latitude', '40.758018');
    // formdata.append('longitude', '-73.974976');
    // debugger;
    console.log('latitude', latitude);
    console.log('longitude', longitude);
    console.log('filterStylist formdata', formdata);

    if (Category !== '') {
      if (location !== '') {
        if (Experience !== '') {
          this.props.filterStylist(formdata);
          // console.log('FilterStylist(formdata)', formdata);
        } else {
          this.setState({
            errMsg: {Experience: 'Please choose experience...'},
            errStatus: {Experience: true},
          });
        }
      } else {
        this.setState({
          errMsg: {location: 'Please enter location...'},
          errStatus: {location: true},
        });
      }
    } else {
      this.setState({
        errMsg: {Category: 'Please choose category...'},
        errStatus: {Category: true},
      });
    }
  };
  componentDidUpdate(prevProps, prevState) {
    console.log(
      'DidUpdate filter this.props.filterStylistSuccess',
      this.props.filterStylistSuccess,
    );
    if (this.props.filterStylistFailure !== prevProps.filterStylistFailure) {
      this.setState({
        filterStylistErrorMsg: this.props.filterStylistFailureMessage,
      });
    } else if (
      this.props.filterStylistSuccess !== prevProps.filterStylistSuccess &&
      this.props.filterStylistSuccess === true
    ) {
      // debugger;
      if (this.props.filterData !== prevProps.filterData) {
        console.log('filterData 111oooo', this.props.filterData);
        if (this.props.filterData && !Array.isArray(this.props.filterData)) {
          // this.setState({filterStylistErrorMsg: ''});
          this.props.navigation.navigate('AllFilterData', {
            data: this.props.filterData,
            title: 'Filter List',
          });
        } else {
          // this.setState({filterStylistErrorMsg: 'No data found'});
          this.props.navigation.navigate('AllFilterData', {
            data: [],
            title: 'Filter List',
          });
        }
      }
      // if (
      //   this.props.route.params &&
      //   this.props.route.params.userType === 'Guest'
      // ) {
      //   this.props.navigation.goBack();
      // } else {
      //   this.props.navigation.navigate('HomeScreenContainer', {
      //     screen: 'filter',
      //   });
      // }
    }
  }
  render() {
    const placeholder = 'Select Service Category...';
    const placeholder2 = 'Select Experience...';
    const placeholder3 = 'Select Review Stars...';

    const {navigation, filterStylistReq} = this.props;
    console.log('userType filter this.props --', this.props);

    return (
      <ScrollView
        style={styles.container}
        keyboardShouldPersistTaps="always"
        listViewDisplayed={false}
        showsVerticalScrollIndicator={false}>
        <View>
          <View style={styles.ViewCont2}>
            <SafeAreaInsetsContext.Consumer>
              {(insets) => (
                <View style={[CommonStyle.notifyCont, styles.notifyCont1]}>
                  <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    activeOpacity={1}>
                    <Image
                      source={Images.SignUpIcon.BackArrow}
                      style={styles.BackArrowsty}
                    />
                  </TouchableOpacity>
                  <Text style={[CommonStyle.welcomeName, styles.filterText]}>
                    Filter{' '}
                  </Text>
                  <Text style={[CommonStyle.welcomeName, styles.textCont]}>
                    {' '}
                  </Text>
                </View>
              )}
            </SafeAreaInsetsContext.Consumer>
          </View>
          <View style={[CommonStyle.profileCard, styles.profileCard1]}>
            <View style={styles.ViewCont}>
              <View style={styles.ViewCont1} />
              <Text style={styles.categoryText}>Select Category</Text>
              <Dropdown
                label="Service Category"
                type="shop"
                width={'100%'}
                name="Category"
                errStatus={this.state.errStatus.Category}
                errMsg={this.state.errMsg.Category}
                items={this.state.category}
                placeholder={placeholder}
                onChange={this.handleOnChange}
                value={this.state.Category}
              />
              <View style={[styles.inputCont]}>
                <Text style={(styles.labelStyle, {marginLeft: 0})}>
                  Location
                </Text>
                <View style={styles.locationCont}>
                  <GooglePlacesInput
                    placeholder="Select location"
                    onAddressChange={this.onAddressChange}
                    dataType="Guest"
                  />
                </View>
                <Map
                  userType={this.props.route.params.userType}
                  address1={this.state.location}
                  longitude={
                    this.state.currentLocation
                      ? this.state.currentLongitude
                      : this.state.longitude
                  }
                  latitude={
                    this.state.currentLocation
                      ? this.state.currentLatitude
                      : this.state.latitude
                  }
                />
                {this.state.errStatus.location && (
                  <Text style={CommonStyle.errorMsg}>
                    {this.state.errMsg.location}
                  </Text>
                )}
              </View>
              <Text style={styles.distanceText}>Distance Preference</Text>
              {Platform.OS === 'android' ? (
                <Dropdown
                  label="Distance Preference"
                  width={343}
                  type="shop"
                  name="Distance"
                  errStatus={this.state.errStatus.Distance}
                  errMsg={this.state.errMsg.Distance}
                  items={this.state.distance}
                  placeholder={'Select distance preference'}
                  onChange={this.handleOnChange}
                  value={this.state.Distance}
                />
              ) : (
                <View style={styles.distanceView}>
                  <Dropdown
                    label="Distance Preference"
                    width={'100%'}
                    type="shop"
                    name="Distance"
                    errStatus={this.state.errStatus.Distance}
                    errMsg={this.state.errMsg.Distance}
                    items={this.state.distance}
                    placeholder={'Select distance preference'}
                    onChange={this.handleOnChange}
                    value={this.state.Distance}
                  />
                </View>
              )}
              <Text style={styles.ExperienceText}>Experience</Text>
              {Platform.OS === 'android' ? (
                <Dropdown
                  label="Experience"
                  type="shop"
                  width={343}
                  name="Experience"
                  errStatus={this.state.errStatus.Experience}
                  errMsg={this.state.errMsg.Experience}
                  items={this.state.newexperience}
                  onChange={this.handleOnChange}
                  value={this.state.Experience}
                  placeholder={placeholder2}
                />
              ) : (
                <View style={styles.ExperienceCont}>
                  <Dropdown
                    label="Experience"
                    type="shop"
                    width={'100%'}
                    name="Experience"
                    errStatus={this.state.errStatus.Experience}
                    errMsg={this.state.errMsg.Experience}
                    items={this.state.newexperience}
                    onChange={this.handleOnChange}
                    value={this.state.Experience}
                    placeholder={placeholder2}
                  />
                </View>
              )}
              <Text style={styles.review_text}>Review</Text>

              {Platform.OS === 'android' ? (
                <Dropdown
                  label="Review"
                  type="shop"
                  width={343}
                  name="ReviewStar"
                  errStatus={this.state.errStatus.ReviewStar}
                  errMsg={this.state.errMsg.ReviewStar}
                  items={this.state.reviewStar}
                  onChange={this.handleOnChange}
                  value={this.state.ReviewStar}
                  placeholder={placeholder3}
                />
              ) : (
                <View style={styles.ReviewCont}>
                  <Dropdown
                    label="Review"
                    width={'100%'}
                    type="shop"
                    name="ReviewStar"
                    errStatus={this.state.errStatus.ReviewStar}
                    errMsg={this.state.errMsg.ReviewStar}
                    items={this.state.reviewStar}
                    onChange={this.handleOnChange}
                    value={this.state.ReviewStar}
                    placeholder={placeholder3}
                  />
                </View>
              )}
              <View style={[styles.inputCont]}>
                <Text style={styles.labelStyle}>Pricing</Text>

                {this.props.route.params.userType === 'Customer' ? (
                  <RangeSlider
                    style={styles.RangeSlidersty}
                    gravity={'center'}
                    min={0}
                    max={1000}
                    textFormat={'$%d'}
                    step={20}
                    labelBackgroundColor={Colors.White}
                    labelBorderColor={Colors.White}
                    labelTextColor={Colors.Black}
                    lineWidth={4}
                    thumbBorderWidth={2}
                    selectionColor={Colors.ButtonColor}
                    blankColor={'#A2A2A226'}
                    thumbColor={Colors.ButtonColor}
                    thumbBorderColor={Colors.White}
                    onValueChanged={(low, high, fromUser) => {
                      this.setState({rangeLow: low, rangeHigh: high});
                    }}
                  />
                ) : (
                  <RangeSlider
                    style={styles.RangeSlidersty}
                    gravity={'center'}
                    min={0}
                    max={1000}
                    textFormat={'$%d'}
                    step={20}
                    labelBackgroundColor={Colors.White}
                    labelBorderColor={Colors.White}
                    labelTextColor={Colors.Black}
                    lineWidth={4}
                    thumbBorderWidth={2}
                    selectionColor={Colors.Black}
                    blankColor={'#A2A2A226'}
                    thumbColor={Colors.Black}
                    thumbBorderColor={Colors.White}
                    onValueChanged={(low, high, fromUser) => {
                      this.setState({rangeLow: low, rangeHigh: high});
                    }}
                  />
                )}
              </View>
              <View style={styles.CheckBoxContsty}>
                <CheckBoxCont
                  label="Show Service on Profile"
                  marginTop={20}
                  width={343}
                  checkvalue={this.state.showService}
                  onpress={() =>
                    this.setState({showService: !this.state.showService})
                  }
                />

                <CheckBoxCont
                  label="Online Booking Payment"
                  width={343}
                  checkvalue={this.state.onlnBooking}
                  onpress={() =>
                    this.setState({onlnBooking: !this.state.onlnBooking})
                  }
                />
              </View>
              {this.state.filterStylistErrorMsg !== '' && (
                <Text style={CommonStyle.errorMsg}>
                  {this.state.filterStylistErrorMsg}
                </Text>
              )}
              {filterStylistReq ? (
                <View style={[CommonStyle.loadingStyle]}>
                  <ActivityIndicator size="large" color="white" />
                </View>
              ) : (
                <Button
                  title={'SAVE'}
                  bgColor={
                    this.props.route.params.userType === 'Guest'
                      ? '#191514'
                      : '#790A13'
                  }
                  userType={this.props.route.params.userType}
                  onSubmit={this.onSubmit}
                />
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  inputCont: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    width: '100%',
    marginTop: 10,
    marginBottom: 20,
    zIndex: -1,
  },
  profileCard1: {
    backgroundColor: '#F9F9F9',
  },
  container: {
    height,
    flex: 1,
  },
  BackArrowsty: {
    height: 20.5,
    width: 12,
    marginLeft: -6,
  },
  ViewCont2: {
    backgroundColor: '#F9F9F9',
  },
  filterText: {
    marginLeft: -20,
  },
  textCont: {
    fontSize: 16,
  },
  ExperienceCont: {
    zIndex: 2000,
  },
  ViewCont1: {
    marginTop: 20,
  },
  distanceView: {
    zIndex: 3000,
  },
  ViewCont: {
    padding: 10,
  },
  locationCont: {
    width: Platform.OS === 'android' ? 343 : '100%',
    paddingRight: 9,
    borderRadius: 5,
    marginLeft: 0,
    backgroundColor: '#F9F9F9',
    marginTop: 10,
    paddingStart: 10,
  },
  notifyCont1: {
    marginTop: Platform.OS === 'android' ? 10 : 40,
  },
  ExperienceText: {
    fontSize: 15,
    fontFamily: Fonts.HeveticaNowText_Medium,
    marginTop: 10,
  },
  categoryText: {
    marginStart: 0,
    fontSize: 15,
    fontFamily: Fonts.HeveticaNowText_Medium,
  },
  RangeSlidersty: {
    width: '100%',
    height: 80,
    alignSelf: 'center',
  },
  ReviewCont: {zIndex: 1000},
  labelStyle: {
    fontSize: 16,
    fontFamily: Fonts.HeveticaNowText_Medium,
  },
  distanceText: {
    fontSize: 15,
    fontFamily: Fonts.HeveticaNowText_Medium,
  },
  review_text: {
    marginStart: 0,
    fontSize: 15,
    fontFamily: Fonts.HeveticaNowText_Medium,
    marginTop: 10,
  },
  CheckBoxContsty: {
    width: 343,
    alignItems: 'baseline',
    justifyContent: 'flex-start',
  },
  errorMsg: {
    color: Colors.Red,
    fontSize: 13,
    fontFamily: Fonts.HeveticaNowText_Bold,
    marginTop: 10,
  },
});
const mapStateToProps = (state) => {
  return {
    serviceCatList: state.ServiceReducer.serviceCatList,
    filterStylistFailureMessage:
      state.StylistReducer.filterStylistFailureMessage,
    filterStylistFailure: state.StylistReducer.filterStylistFailure,
    filterStylistSuccess: state.StylistReducer.filterStylistSuccess,
    filterStylistReq: state.StylistReducer.filterStylistReq,
    filterData: state.StylistReducer.filterData,
  };
};

const mapDispatchToProps = (dispatch) => ({
  filterStylist: (data) => dispatch(filterStylist(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Filter);
