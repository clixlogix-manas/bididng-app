/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-did-mount-set-state */
import React, {Component} from 'react';
import {
  View,
  Text,
  Dimensions,
  Image,
  Alert,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
} from 'react-native';

import Dropdown from '../../components/Dropdown';
import ImagePicker from 'react-native-image-picker';
import {getCurrentLocation} from '../../constants/utilities/utilities';
import {Images, Colors, Fonts} from '../../constants';
import CommonStyle from '../../constants/Style';
import Input from '../../components/Input';
import ContactButton from '../../components/ContactButton';
import Button from '../../components/Button';
import {updateAccountInfo} from '../../redux/actions/profileAction';
import {connect} from 'react-redux';
import {validate} from '../../constants/utilities/validator';
import ValidationRule from '../../constants/validation/SignupValidation';
import AsyncStorage from '@react-native-community/async-storage';
import SafeAreaView from 'react-native-safe-area-view';
import GooglePlacesInput from '../../components/GooglePlaceInput';
import UploadProfile from '../../components/UploadProfile';
import {updateProfilePic} from '../../redux/actions/profileAction';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';

import {
  fetchCustomerDetails,
  fetchStylistDetails,
} from '../../redux/actions/authAction';
import {SafeAreaInsetsContext} from 'react-native-safe-area-context';
import {
  imagePath,
  customerImagePath,
  CUSTOMER_USER_CODE,
} from '../../constants/Config';

const {height} = Dimensions.get('window');
const options = {
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};
let bs = React.createRef();
let fall = new Animated.Value(1);
// eslint-disable-next-line no-unused-vars
const animatedShadowOpacity = Animated.interpolateNode(fall, {
  inputRange: [0, 1],
  outputRange: [0.5, 0],
});

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
      radioRes: 'email',
      firstName: '',
      surName: '',
      Profession: '',
      email: '',
      home: '',
      business: '',
      mobile: '',
      profile_pic: '',
      typeOfSignup: null,
      errStatus: {},
      errMsg: {},
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
      typeOfCity: 'US',
      height: false,
      editProfilePopup: false,
      profileImg: null,
      userType: '',
      professionList: [
        {
          label: 'Stylist',
          value: 'Stylist',
        },
        {
          label: 'Barber',
          value: 'Barber',
        },
      ],
    };
  }
  onChange = (name, value) => {
    this.setState({[name]: value});
  };

  launchCamera = () => {
    bs.current.snapTo(1);
    ImagePicker.launchCamera(options, (response) => {
      if (response.uri) {
        this.onSubmitImage(response);
        // const source = { uri: response.uri };
        // this.setState({
        //   avatarSource: source,
        //   uploadImage: response,
        //   profileErrorMsg: '',
        // });
      }
    });
  };
  launchLibrary = () => {
    bs.current.snapTo(1);
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.uri) {
        this.onSubmitImage(response);
        // const source = { uri: response.uri };
        // this.setState({
        //   avatarSource: source,
        //   uploadImage: response,
        //   profileErrorMsg: '',
        // });
      }
    });
  };

  onSubmit = () => {
    const {
      firstName,
      email,
      surName,
      mobile,
      radioRes,
      CountryCode,
      State,
      City,
      address1,
      latitude,
      longitude,
      Profession,
    } = this.state;

    let Field = {
      firstName: firstName,
      lastName: surName,
      email: email,
      mobile: mobile,
      home: mobile,
      business: mobile,
      preferred_contact: radioRes,
      Profession: Profession,
    };

    let formdata = new FormData();
    formdata.append('first_name', firstName);
    formdata.append('last_name', surName);
    formdata.append('profession', Profession);
    formdata.append('email', email);
    formdata.append('mobile_number', mobile);
    formdata.append('home_number', mobile);
    formdata.append('business_number', mobile);
    formdata.append('preferred_contact', radioRes);
    formdata.append('address_1', address1);
    formdata.append('country', CountryCode);
    formdata.append('state', State);
    formdata.append('city', City);
    formdata.append('latitude', latitude);
    formdata.append('longitude', longitude);

    if (this.state.profileImg != null) {
      formdata.append('prof_pic', this.state.profileImg);
      console.log('profile_image', this.state.profileImg);
    }

    if (this.isValidate(Field, ValidationRule)) {
      this.props.updateAccountInfo(formdata);
    }
  };

  onSubmitImage = (response) => {
    if (response !== null) {
      const photo = {
        uri:
          Platform.OS === 'android'
            ? 'file://' + response.path
            : 'data:image/jpeg;base64,' + response.data,
        type: response.type,
        name: response.fileName !== null ? response.fileName : 'noNamedImage',
      };
      this.setState({
        editProfilePopup: false,
        profileImg: photo,
      });
      let formdata = new FormData();
      formdata.append('prof_pic', photo);
      if (this.props.route.params.userType === 'Barber') {
        // this.props.styistProfileUploadReq(formdata);
      } else {
        this.props.updateProfilePic(formdata);
      }
    }
  };

  isValidate = (Field, ValidationRules) => {
    let res = validate(Field, ValidationRules);
    if (res.errors) {
      this.setState({
        errStatus: {
          firstName: res.errors.firstName ? true : false,
          surName: res.errors.lastName ? true : false,
          mobile: res.errors.mobile ? true : false,
          Profession: res.errors.Profession ? true : false,
        },
        errMsg: res.errors,
      });
    }
    return res.isValid;
  };

  componentDidMount() {
    const {userInfo} = this.props;

    console.log('==>', userInfo);

    getCurrentLocation().then((location) => {
      if (location) {
        this.setState({
          latitude: location.currentLatitude,
          longitude: location.currentLongitude,
        });
      }
    });
    if (userInfo && userInfo.provider_info) {
      let info = userInfo.provider_info;
      let provider = userInfo.provider;

      this.setState({
        firstName: info.fname,
        surName: info.lname,
        mobile: info.mobile_number ? info.mobile_number : '',
        profile_pic: userInfo.provider.profile_pic,
        home: info.home_number ? info.home_number : '',
        business: info.business_number ? info.business_number : '',
        email: provider.email,
        radioRes: info.contact_preference ? info.contact_preference : 'email',
        address1: info.address_1,
        CountryCode: info.country,
        State: info.state,
        City: info.city,
        Profession: info.profession,
      });
    } else if (userInfo && userInfo.user_data) {
      let info = userInfo.user_data;
      console.log('info===>', info);
      this.setState({
        firstName: info.fname,
        surName: info.lname,
        mobile: info.mobile_number,
        profile_pic: info.profile_pic,
        home: info.home_number,
        business: info.business_number,
        email: info.email,
        radioRes: info.contact_preference ? info.contact_preference : 'email',
        address1: info.address_1,
        CountryCode: info.country,
        State: info.state,
        City: info.city,
        Profession: info.fname,
      });
    }
  }

  onAddressChange = (value) => {
    console.log('===>', value);

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

  async componentDidUpdate(prevProps, prevState) {
    console.log(
      'Update account failure==>',
      this.props.updateAccountInfoFailureMessage,
    );
    console.log(
      'Update account Success==>',
      this.props.updateAccountInfoSuccess,
    );

    if (
      this.props.updateAccountInfoFailure !== prevProps.updateAccountInfoFailure
    ) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        profileErrorMsg: this.props.updateAccountInfoFailureMessage,
      });
    } else if (
      this.props.updateAccountInfoSuccess !== prevProps.updateAccountInfoSuccess
    ) {
      console.log('succc', this.props.updateAccountInfoSuccess);
      let token = await AsyncStorage.getItem('loginToken');
      if (token) {
        if (this.props.route.params.userType === CUSTOMER_USER_CODE) {
          this.props.fetchCustomerDetails(token);
        } else {
          this.props.fetchStylistDetails(token);
          Alert.alert('Profile updated !');
        }
      }
    }
  }

  handleOnChange = async (name, value) => {
    this.setState({
      [name]: value,
      height: false,
    });
  };

  renderInner = () => (
    <View style={{height: '100%'}}>
      <View
        style={{
          height: '70%',
          borderBottomWidth: 1,
          backgroundColor: 'rgba(18, 17, 17, 0.79)',
        }}>
        <TouchableOpacity onPress={() => bs.current.snapTo(1)}>
          <View style={styles.renderInnerView}>
            <Text style={styles.textStyle1} />
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.TextView}>
        <Text style={styles.photoText}>Photo</Text>
      </View>
      <View style={styles.launchCamView}>
        <TouchableOpacity activeOpacity={1} onPress={() => this.launchCamera()}>
          <View>
            <Text style={styles.launchCamText}>Take from camera</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={{height: '10%'}}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => this.launchLibrary()}>
          <View style={{backgroundColor: 'white'}}>
            <Text style={styles.textStyle2}>Choose from gallery</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );

  renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  );

  render() {
    const placeholder = 'Profession';
    const placeholder1 = this.state.address1 || 'Location';

    const {navigation, route, updateStylistAccountReq} = this.props;
    return (
      <SafeAreaView style={styles.container}>
        <BottomSheet
          ref={bs}
          snapPoints={Platform.OS === 'ios' ? ['100%', 0] : ['100%', 0]}
          renderContent={this.renderInner}
          renderHeader={this.renderHeader}
          initialSnap={1}
          callbackNode={this.fall}
          enabledGestureInteraction={true}
          isBackDrop={true}
          isBackDropDismissByPress={true}
          backDropColor="red"
        />
        <ScrollView
          style={{height, flex: 1}}
          keyboardShouldPersistTaps="always"
          listViewDisplayed={false}
          contentInsetAdjustmentBehavior="automatic"
          showsVerticalScrollIndicator={false}>
          <View style={{backgroundColor: '#FFFFFF'}}>
            <SafeAreaInsetsContext.Consumer>
              {(insets) => (
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  style={styles.goBackStyle}
                  activeOpacity={1}>
                  <Image
                    source={Images.SignUpIcon.BackArrow}
                    style={styles.BackArrowStyle}
                  />
                  {this.props.route.params.userType === CUSTOMER_USER_CODE ? (
                    <Text style={styles.heading1}>Account Settings </Text>
                  ) : (
                    <Text style={styles.heading2}>Edit profile </Text>
                  )}
                </TouchableOpacity>
              )}
            </SafeAreaInsetsContext.Consumer>
            <View style={CommonStyle.profileCard}>
              <View style={{padding: 10}}>
                <View
                  onPress={() =>
                    navigation.navigate('ViewImage', {
                      item: {
                        image: this.state.imageErr
                          ? Images.CustomerHomeIcon.NoProfilePic
                          : // eslint-disable-next-line no-undef
                            {uri: imagePath + userInfo.provider.profile_pic},
                      },
                      // uri: BASE_URL + '/storage' + photoOfTheDay.img_path,
                      userType: 'Barber',
                      type: '',
                      subOption: false,
                    })
                  }
                  style={{alignSelf: 'center'}}>
                  <Image
                    style={styles.ImageStyle}
                    source={
                      this.state && this.state.profile_pic
                        ? {
                            uri:
                              this.state.profileImg != null
                                ? this.state.profileImg.uri
                                : this.props.route.params.userType ===
                                  CUSTOMER_USER_CODE
                                ? customerImagePath + this.state.profile_pic
                                : imagePath + this.state.profile_pic,
                          }
                        : Images.CustomerHomeIcon.Default
                    }
                  />
                  <TouchableOpacity
                    style={styles.OpacityStyle}
                    activeOpacity={1}
                    onPress={() => bs.current.snapTo(0)}>
                    <Image
                      source={Images.ProfileIcon.AddFill}
                      style={styles.AddFillImg}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.ViewCont2}>
                  <View style={styles.InputView1}>
                    <Input
                      label={'First Name'}
                      type="capital"
                      value={this.state.firstName}
                      errStatus={this.state.errStatus.firstName}
                      errMsg={this.state.errMsg.firstName}
                      onChange={this.onChange}
                      maxLength={20}
                      name="firstName"
                    />
                  </View>

                  <View style={styles.InputView}>
                    <Input
                      label={'Surname'}
                      value={this.state.surName}
                      errStatus={this.state.errStatus.surName}
                      errMsg={this.state.errMsg.lastName}
                      maxLength={20}
                      onChange={this.onChange}
                      type="capital"
                      name="surName"
                    />
                  </View>

                  {/* {dropdown} */}
                  {this.props.route.params.userType !== CUSTOMER_USER_CODE ? (
                    Platform.OS === 'android' ? (
                      <View style={styles.DropdownView}>
                        <Dropdown
                          label="Profession"
                          name="Profession"
                          items={this.state.professionList}
                          errStatus={this.state.errStatus.Profession}
                          errMsg={this.state.errMsg.Profession}
                          placeholder={placeholder}
                          onChange={this.handleOnChange}
                          value={this.state.Profession}
                          width={325}
                        />
                      </View>
                    ) : (
                      <View style={{zIndex: 3000, zIndexInverse: 1000}}>
                        <Dropdown
                          label="Profession"
                          name="Profession"
                          items={this.state.professionList}
                          errStatus={this.state.errStatus.Profession}
                          errMsg={this.state.errMsg.Profession}
                          placeholder={placeholder}
                          onChange={this.handleOnChange}
                          value={this.state.Profession}
                        />
                      </View>
                    )
                  ) : null}

                  <View style={[styles.inputCont]}>
                    <GooglePlacesInput
                      placeholder={placeholder1}
                      onAddressChange={this.onAddressChange}
                    />

                    {/* <Text style={styles.adressText}>{this.state.address1}</Text> */}
                  </View>

                  <View style={styles.InputView}>
                    <Input
                      label={'Country'}
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
                      name="State"
                      errStatus={this.state.errStatus.State}
                      errMsg={this.state.errMsg.State}
                      value={this.state.State}
                      onChange={this.handleOnChange}
                    />
                  </View>

                  <View style={styles.InputView}>
                    <Input
                      label={'City'}
                      name="City"
                      disabled={true}
                      errStatus={this.state.errStatus.City}
                      errMsg={this.state.errMsg.City}
                      value={this.state.City}
                      onChange={this.handleOnChange}
                    />
                  </View>

                  {this.props.route.params.userType !== CUSTOMER_USER_CODE ? (
                    <View style={styles.InputView}>
                      <Input
                        label={'About'}
                        value={this.state.surName}
                        errStatus={this.state.errStatus.surName}
                        errMsg={this.state.errMsg.lastName}
                        maxLength={200}
                        onChange={this.onChange}
                        propStyle={{}}
                        type="text"
                        name="surName"
                      />
                    </View>
                  ) : null}

                  <View style={styles.InputView}>
                    <Input
                      label={'Email Address'}
                      value={this.state.email}
                      maxLength={50}
                      onChange={this.onChange}
                      type="text"
                      name="email"
                    />
                  </View>

                  <View style={styles.InputView}>
                    <Input
                      label={'Contact Number'}
                      maxLength={15}
                      errStatus={this.state.errStatus.mobile}
                      errMsg={this.state.errMsg.mobile}
                      value={this.state.mobile}
                      onChange={this.onChange}
                      type="phone"
                      name="mobile"
                    />
                  </View>
                </View>
                <View style={styles.ViewCont1}>
                  <View>
                    <Text style={[CommonStyle.labelStyle, styles.textStyle4]}>
                      What's your preferred method of contact?
                    </Text>

                    <ContactButton
                      value={this.state.radioRes}
                      onpress={(value) => this.setState({radioRes: value})}
                      propStyle={styles.propStyle1}
                      account={true}
                      value1={'email'}
                      label1={'Email'}
                      value2={'mobile'}
                      label2={'Phone'}
                    />
                  </View>
                  {/* {route.params.userType !== CUSTOMER_USER_CODE && */}
                  {this.props.userInfo && (
                    <View style={styles.changePassText}>
                      <Text style={{fontSize: 16}}>
                        Want to change password?
                      </Text>
                      <View style={{flex: 1}} />
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('ChangePass', {
                            userType: this.props.route.params.userType,
                          })
                        }
                        style={[
                          styles.textStyle3,
                          {
                            backgroundColor:
                              route.params.userType === CUSTOMER_USER_CODE
                                ? '#000000'
                                : '#283A58',
                          },
                        ]}>
                        <Text style={styles.changePassStyle}>
                          Change password
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}

                  {this.state.editProfilePopup && (
                    <UploadProfile
                      modalStatus={this.state.editProfilePopup}
                      onClose={() => this.setState({editProfilePopup: false})}
                      onChoose={(response) => this.onSubmitImage(response)}
                    />
                  )}
                  <View style={styles.ViewCont}>
                    {/* dkdk */}
                    {updateStylistAccountReq ? (
                      <View
                        style={[
                          CommonStyle.loadingStyle,
                          {backgroundColor: Colors.Black},
                        ]}>
                        <ActivityIndicator size="large" color="white" />
                      </View>
                    ) : (
                      <Button
                        title={'SAVE'}
                        bgColor={Colors.ButtonColor}
                        onSubmit={this.onSubmit}
                        navigation={navigation}
                      />
                    )}
                  </View>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: Colors.White,
  },
  inputCont: {
    display: 'flex',
    backgroundColor: Colors.InputBgColor,
    justifyContent: 'flex-start',
    flexDirection: 'column',
    marginTop: 10,
    paddingLeft: 5,
    paddingRight: 3,
    borderRadius: 5,
    width: '100%',
  },
  AddFillImg: {
    height: 25,
    width: 25,
  },
  goBackStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    backgroundColor: '#FFFFFF',
  },
  BackArrowStyle: {
    height: 20.5,
    width: 12,
  },
  heading1: {
    fontSize: 16,
    textAlign: 'center',
    flex: 1,
    marginLeft: -7,
    fontWeight: 'bold',
  },
  ImageStyle: {
    height: 80,
    width: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: Colors.ButtonColor,
  },
  heading2: {
    fontSize: 14,
    marginStart: 10,
  },
  DropdownView: {
    marginTop: 0,
    marginBottom: 0,
    width: '100%',
  },
  ViewCont2: {
    alignItems: 'center',
    width: '100%',
  },
  ViewCont1: {
    marginLeft: 10,
    alignItems: 'flex-start',
  },
  InputView1: {
    marginTop: 20,
    width: '100%',
  },
  textStyle4: {
    paddingLeft: 0,
    marginTop: 20,
    marginLeft: 0,
  },
  changePassStyle: {
    color: Colors.White,
    fontSize: 10,
  },
  propStyle1: {
    width: 325,
    alignItems: 'flex-start',
  },
  ViewCont: {
    width: '100%',
    alignSelf: 'center',
    alignContent: 'flex-start',
    marginLeft: -6.5,
  },
  InputView: {
    marginTop: 5,
    width: '100%',
  },
  OpacityStyle: {
    height: 25,
    width: 25,
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  launchCamText: {
    fontSize: 15,
    textAlign: 'left',
    margin: 26,
    marginLeft: 45,
  },
  textStyle3: {
    width: 112,
    height: 32,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle2: {
    fontSize: 15,
    textAlign: 'left',
    margin: 26,
    borderColor: 'black',
    marginLeft: 45,
  },
  photoText: {
    fontWeight: 'bold',
    fontSize: 21,
    textAlign: 'left',
    marginLeft: 45,
    margin: 21,
  },
  changePassText: {
    flexDirection: 'row',
    marginTop: 30,
    alignItems: 'center',
    marginRight: 5,
    marginBottom: 5,
    width: '100%',
  },
  launchCamView: {
    height: '10%',
    borderBottomWidth: 1,
    borderColor: '#04040F66',
    backgroundColor: 'white',
  },
  TextView: {
    borderBottomWidth: 1,
    borderColor: '#04040F66',
    backgroundColor: 'white',
    height: '10%',
  },
  labelStyle: {
    fontSize: 14,
    fontFamily: Fonts.HeveticaNowText_Medium,
  },
  textStyle1: {
    textAlign: 'left',
    // margin: 245,
  },
  adressText: {
    color: Colors.SelectColor,
    fontSize: 12,
    fontFamily: Fonts.Lato_Bold,
    marginTop: 10,
    paddingBottom: 10,
    paddingStart: 10,
  },
  // renderInnerView: {
  //   borderBottomWidth: 1,
  //   backgroundColor: 'rgba(41, 39, 36, 0.83)',
  // },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 0,
    borderRadius: 4,
    marginBottom: 1,
  },
  header: {
    backgroundColor: '#04040F66',
    shadowColor: 'blue',
    shadowOffset: {width: -1, height: -3},
  },
});

const mapStateToProps = (state) => {
  return {
    userInfo: state.SignupReducer.userInfo,
    updateAccountInfoFailureMessage:
      state.ProfileReducer.updateAccountInfoFailureMessage,
    updateAccountInfoFailure: state.ProfileReducer.updateAccountInfoFailure,
    updateAccountInfoSuccess: state.ProfileReducer.updateAccountInfoSuccess,
    updateStylistAccountReq: state.ProfileReducer.updateAccountInfo,
    updateProfilePicReq: state.ProfileReducer.updateProfilePic,
    updateProfilePicFailure: state.ProfileReducer.updateProfilePicFailure,
    updateProfilePicSuccess: state.ProfileReducer.updateProfilePicSuccess,
    updateProfilePicFailureMessage:
      state.ProfileReducer.updateProfilePicFailureMessage,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchStylistDetails: (data) => dispatch(fetchStylistDetails(data)),
  updateAccountInfo: (data) => dispatch(updateAccountInfo(data)),
  updateProfilePic: (data) => dispatch(updateProfilePic(data)),
  fetchCustomerDetails: (data) => dispatch(fetchCustomerDetails(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Account);
