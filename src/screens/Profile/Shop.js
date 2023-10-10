/* eslint-disable react-native/no-inline-styles */
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
  StyleSheet,
} from 'react-native';
import Fonts from '../../constants/Fonts';
import {Images} from '../../constants';
import CommonStyle from '../../constants/Style';
import ContactButton from '../../components/ContactButton';
import Input from '../../components/Input';
import Dropdown from '../../components/Dropdown';
import Button from '../../components/Button';
import {connect} from 'react-redux';
import {
  addStylistProfessionDetails,
  fetchStylistDetails,
} from '../../redux/actions/authAction';
import {validate} from '../../constants/utilities/validator';
import ProfValidationRule from '../../constants/validation/ProfValidation';
import AsyncStorage from '@react-native-community/async-storage';
import SafeAreaView from 'react-native-safe-area-view';

// const {height} = Dimensions.get('window');

class ShopSetting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
      radioRes: 'male',
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
      Profession: 'Stylist',

      ownership: [
        {
          label: 'Owner',
          value: 'Owner',
        },
        {
          label: 'Employee',
          value: 'Employee',
        },
        {
          label: 'Renter/Independent Contractor',
          value: 'Renter/Independent Contractor',
        },
        {
          label: 'Unknown',
          value: 'Unknown',
        },
      ],

      Ownership: '',
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
      Experience: '',
      licence: '',
      Specialities: '',
      errStatus: {},
      errMsg: {},
      inputHeight: 0,
    };
  }
  handleOnChange = (name, value) => {
    this.setState({
      [name]: value,
    });
  };
  async componentDidMount() {
    const {userInfo} = this.props;
    if (userInfo && userInfo.provider_info) {
      let info = userInfo.provider_info;
      // eslint-disable-next-line react/no-did-mount-set-state
      this.setState({
        Profession: info.profession,
        Ownership: info.role,
        licence: info.license_number,
        Specialities: info.specialities,
        Experience: info.experience,
        radioRes: info.gender,
      });
    }
  }
  onSubmit = () => {
    const {Profession, Ownership, Experience, licence, Specialities, radioRes} =
      this.state;
    let formdata = new FormData();
    let Field = {
      Profession: Profession,
      Role: Ownership,
      Experience: Experience,
      licence: licence,
      Specialities: Specialities,
    };
    if (this.isValidate(Field, ProfValidationRule)) {
      formdata.append('profession', Profession);
      formdata.append('role', Ownership);
      formdata.append('specialities', Specialities);
      formdata.append('experience', Experience);
      formdata.append('gender', radioRes);
      formdata.append('license_number', licence);
      this.props.updateStylistProfessionDetails(formdata);
    }
  };
  isValidate = (Field, ValidationRule) => {
    let res = validate(Field, ValidationRule);
    if (res.errors) {
      this.setState({
        errStatus: {
          Profession: res.errors.Profession ? true : false,
          Role: res.errors.Role ? true : false,
          Experience: res.errors.Experience ? true : false,
          licence: res.errors.licence ? true : false,
          Specialities: res.errors.Specialities ? true : false,
        },
        errMsg: res.errors,
      });
    }
    return res.isValid;
  };
  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.addProfessDetailsFailure !== prevProps.addProfessDetailsFailure
    ) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        profErrorMsg: this.props.addProfessDetailsFailureMessage,
      });
    } else if (
      this.props.addProfessDetailsSuccess !== prevProps.addProfessDetailsSuccess
    ) {
      AsyncStorage.getItem('loginToken').then((token) => {
        this.props.fetchStylistDetails(token);
        // this.props.navigation.navigate('Profile');
      });
    }
  }
  render() {
    const {navigation, updateProfessDetails} = this.props;
    const placeholder = 'Select your Profession...';
    const placeholder2 = 'Select your Experience...';
    const placeholder3 = 'Select Ownership...';
    return (
      <SafeAreaView style={styles.SafeAreaViewStyle}>
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

            <View
              style={[
                styles.ViewStyle1,
                {
                  marginTop: Platform.OS === 'ios' ? 0 : 10,
                },
              ]}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={styles.goBackStyle}
                activeOpacity={1}>
                <Image
                  source={Images.SignUpIcon.BackArrow}
                  style={styles.BackArrowStyle}
                />
              </TouchableOpacity>
              <View style={styles.ViewStyle2}>
                <Text style={[CommonStyle.ShopName]}>Shop Settings </Text>
                <Text style={styles.textStyle}>Fill up the information </Text>
              </View>
            </View>

            <View style={[CommonStyle.profileCard]}>
              <View style={styles.ViewStyle3}>
                <View style={styles.ViewStyle4} />

                {Platform.OS === 'android' ? (
                  <View style={styles.DropdownView}>
                    <Dropdown
                      label=""
                      type="shop"
                      name="Profession"
                      errStatus={this.state.errStatus.Role}
                      errMsg={"Ownership can't be emplty"}
                      items={this.state.professionList}
                      onChange={this.handleOnChange}
                      value={this.state.Profession}
                      //defaultValue={this.state.Profession}
                      placeholder={placeholder}
                    />
                  </View>
                ) : (
                  <View style={{zIndex: 3000, zIndexInverse: 1000}}>
                    <Dropdown
                      label=""
                      type="shop"
                      name="Profession"
                      errStatus={this.state.errStatus.Role}
                      errMsg={"Ownership can't be emplty"}
                      items={this.state.professionList}
                      onChange={this.handleOnChange}
                      value={this.state.Profession}
                      //defaultValue={this.state.Profession}
                      placeholder={placeholder}
                    />
                  </View>
                )}

                {/* <View style={{zIndex: Platform.OS === 'android' ? 0 : 1000}}> */}
                {Platform.OS === 'android' ? (
                  <View style={styles.DropdownView3}>
                    <Dropdown
                      label=""
                      type="shop"
                      name="Ownership"
                      errStatus={this.state.errStatus.Role}
                      errMsg={"Ownership can't be emplty"}
                      items={this.state.ownership}
                      onChange={this.handleOnChange}
                      value={this.state.Ownership}
                      placeholder={placeholder3}
                    />
                  </View>
                ) : (
                  <View style={styles.DropdownView2}>
                    <Dropdown
                      label=""
                      type="shop"
                      name="Ownership"
                      errStatus={this.state.errStatus.Role}
                      errMsg={"Ownership can't be emplty"}
                      items={this.state.ownership}
                      onChange={this.handleOnChange}
                      value={this.state.Ownership}
                      placeholder={placeholder3}
                    />
                  </View>
                )}

                {/* </View> */}
                <View style={styles.InputView}>
                  <Input
                    label={'Specialities'}
                    placeholder={'Enter your specialities'}
                    maxLength={200}
                    propStyle={{}}
                    errStatus={this.state.errStatus.Specialities}
                    errMsg={this.state.errMsg.Specialities}
                    value={this.state.Specialities}
                    height={this.state.inputHeight}
                    onHeightChange={(heights) =>
                      this.setState({inputHeight: heights})
                    }
                    onChange={this.handleOnChange}
                    type="service"
                    name="Specialities"
                  />
                </View>
                <Dropdown
                  label="Experience"
                  name="Experience"
                  type="shop"
                  items={this.state.newexperience}
                  errStatus={this.state.errStatus.Experience}
                  errMsg={this.state.errMsg.Experience}
                  onChange={this.handleOnChange}
                  value={this.state.Experience}
                  placeholder={placeholder2}
                />
                <Text style={[CommonStyle.labelStyle]}>Gender</Text>
                <ContactButton
                  value={this.state.radioRes}
                  onpress={(value) => this.setState({radioRes: value})}
                  propStyle={{}}
                  account={true}
                  value1={'male'}
                  value2={'female'}
                  label1={'Male'}
                  label2={'Female'}
                />
                <View style={styles.InputView}>
                  <Input
                    label={'Licence Number'}
                    type="text"
                    maxLength={8}
                    name="licence"
                    uppercase={true}
                    errStatus={this.state.errStatus.licence}
                    errMsg={this.state.errMsg.licence}
                    value={this.state.licence}
                    onChange={this.handleOnChange}
                    margin={10}
                  />
                </View>

                {updateProfessDetails ? (
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
  SafeAreaViewStyle: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  ScrollViewStyle: {
    flex: 1,
  },
  InputView: {
    marginTop: 10,
  },
  ViewStyle3: {
    padding: 17,
  },
  ViewStyle4: {
    marginTop: 20,
  },
  DropdownView: {
    marginTop: 5,
  },
  DropdownView3: {
    marginTop: 5,
  },
  textStyle: {
    fontSize: 18,
    marginTop: 10,
    fontFamily: Fonts.HeveticaNowText_Regular,
  },
  BackArrowStyle: {
    height: 20.5,
    width: 12,
    marginTop: 15,
  },
  goBackStyle: {
    alignSelf: 'auto',
  },
  ViewStyle1: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
  },
  ViewStyle2: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    marginTop: 10,
  },
});
const mapStateToProps = (state) => {
  return {
    userInfo: state.SignupReducer.userInfo,
    addProfessDetailsFailureMessage:
      state.SignupReducer.addProfessDetailsFailureMessage,
    addProfessDetailsFailure: state.SignupReducer.addProfessDetailsFailure,
    addProfessDetailsSuccess: state.SignupReducer.addProfessDetailsSuccess,
    updateProfessDetails: state.SignupReducer.addProfessDetails,
  };
};

const mapDispatchToProps = (dispatch) => ({
  updateStylistProfessionDetails: (data) =>
    dispatch(addStylistProfessionDetails(data)),
  fetchStylistDetails: (data) => dispatch(fetchStylistDetails(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ShopSetting);
