/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Platform,
  StyleSheet,
} from 'react-native';
import {Images} from '../../../constants';
import CommonStyle from '../../../constants/Style';
import Dropdown from '../../../components/Dropdown';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import Input from '../../../components/Input';
import ContactButton from '../../../components/ContactButton';
import Button from '../../../components/Button';
import {connect} from 'react-redux';
import {addStylistProfessionDetails} from '../../../redux/actions/authAction';
import {validate} from '../../../constants/utilities/validator';
import ProfValidationRule from '../../../constants/validation/ProfValidation';
const {height} = Dimensions.get('window');
class Step2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: 60,
      radioRes: 'male',
      profession: [
        {
          label: 'Stylist',
          value: 'Stylist',
        },
        {
          label: 'Barber',
          value: 'Barber',
        },
      ],
      role: [
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
      Profession: '',
      Role: '',
      Experience: '',
      licence: '',
      Specialities: '',
      profErrorMsg: '',
      errStatus: {},
      errMsg: {},
      inputHeight: 0,
    };
  }
  onSubmit = () => {
    const {Profession, Role, Experience, licence, Specialities, radioRes} =
      this.state;
    let formdata = new FormData();
    let Field = {
      Profession: Profession,
      Role: Role,
      Experience: Experience,
      licence: licence,
      Specialities: Specialities,
    };
    if (this.isValidate(Field, ProfValidationRule)) {
      formdata.append('profession', Profession);
      formdata.append('role', Role);
      formdata.append('specialities', Specialities);
      formdata.append('experience', Experience);
      formdata.append('gender', radioRes);
      formdata.append('license_number', licence);
      this.props.addStylistProfessionDetails(formdata);
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
      this.props.navigation.navigate('Step3');
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        profErrorMsg: '',
      });
    }
  }
  handleOnChange = (name, value) => {
    this.setState({
      [name]: value,
    });
  };

  render() {
    const placeholder = 'Profession';
    const placeholder2 = 'Experience';
    const placeholder3 = 'Ownership';
    const {navigation, addProfessDetails} = this.props;
    return (
      <View style={{flex: 1, backgroundColor: '#F9F9F9'}}>
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          style={{flex: 1, height: height}}>
          <View style={styles.goBackCont}>
            <View
              style={{
                height: 40,
                width: 40,
              }}>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => navigation.goBack()}>
                <Image
                  source={Images.SignUpIcon.BackArrow}
                  style={[CommonStyle.backArrow, {marginTop: 9}]}
                />
              </TouchableOpacity>
            </View>
            <Text
              style={[
                CommonStyle.logoText,
                {textAlign: 'center', width: '76%', marginTop: 0},
              ]}>
              Step 2
            </Text>
          </View>
          <View style={[CommonStyle.subContainer, {paddingHorizontal: 30}]}>
            <Text style={CommonStyle.startedText}>Shop Settings</Text>
            <Text style={CommonStyle.startedTextNew}>
              Fill up the information
            </Text>

            <View style={{alignItems: 'center'}}>
              {Platform.OS === 'android' ? (
                <View style={{marginTop: 20, marginBottom: 5, width: 325}}>
                  <Dropdown
                    label="Profession"
                    name="Profession"
                    propStyle={{width: 325}}
                    items={this.state.profession}
                    errStatus={this.state.errStatus.Profession}
                    errMsg={this.state.errMsg.Profession}
                    placeholder={placeholder}
                    onChange={this.handleOnChange}
                    value={this.state.Profession}
                  />
                </View>
              ) : (
                <View style={{zIndex: 3000, zIndexInverse: 1000}}>
                  <Dropdown
                    label="Profession"
                    name="Profession"
                    items={this.state.profession}
                    errStatus={this.state.errStatus.Profession}
                    errMsg={this.state.errMsg.Profession}
                    placeholder={placeholder}
                    onChange={this.handleOnChange}
                    value={this.state.Profession}
                  />
                </View>
              )}

              {Platform.OS === 'android' ? (
                <View style={{marginBottom: 5, width: 325}}>
                  <Dropdown
                    label="Role"
                    name="Role"
                    items={this.state.role}
                    errStatus={this.state.errStatus.Role}
                    errMsg={this.state.errMsg.Role}
                    onChange={this.handleOnChange}
                    value={this.state.Role}
                    placeholder={placeholder3}
                  />
                </View>
              ) : (
                <View style={{zIndex: 2000, zIndexInverse: 2000}}>
                  <Dropdown
                    label="Role"
                    name="Role"
                    items={this.state.role}
                    errStatus={this.state.errStatus.Role}
                    errMsg={this.state.errMsg.Role}
                    onChange={this.handleOnChange}
                    value={this.state.Role}
                    placeholder={placeholder3}
                  />
                </View>
              )}
              <View style={styles.SpecialitiesCont}>
                <Input
                  label={'Specialities'}
                  placeholder={'Specialities'}
                  maxLength={200}
                  propStyle={{
                    paddingBottom: 5,
                    borderRadius: 5,
                  }}
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
              {Platform.OS === 'android' ? (
                <View
                  style={{
                    width: 325,
                    marginBottom: 20,
                  }}>
                  <Dropdown
                    label="Experience"
                    name="Experience"
                    errStatus={this.state.errStatus.Experience}
                    errMsg={this.state.errMsg.Experience}
                    items={this.state.newexperience}
                    onChange={this.handleOnChange}
                    value={this.state.Experience}
                    placeholder={placeholder2}
                  />
                </View>
              ) : (
                <View
                  style={{
                    width: '100%',
                    zIndex: 2000,
                    zIndexInverse: 2000,
                  }}>
                  <Dropdown
                    label="Experience"
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

              <Text style={[CommonStyle.labelStyle, styles.Gender_text]}>
                Gender
              </Text>
              <View style={styles.ContactButtonCont}>
                <ContactButton
                  value={this.state.radioRes}
                  onpress={(value) => this.setState({radioRes: value})}
                  value1={'male'}
                  value2={'female'}
                  label1={'Male'}
                  label2={'Female'}
                />
              </View>
              <View style={styles.licenceCont}>
                <Input
                  label="Licence Number"
                  propStyle={{width: '100%'}}
                  maxLength={8}
                  type="licence"
                  uppercase={true}
                  errStatus={this.state.errStatus.licence}
                  errMsg={this.state.errMsg.licence}
                  value={this.state.licence}
                  onChange={this.handleOnChange}
                  name="licence"
                />
              </View>
            </View>
            <View style={styles.ButtonCont}>
              {addProfessDetails ? (
                <View style={CommonStyle.loadingStyle}>
                  <ActivityIndicator size="large" color="white" />
                </View>
              ) : (
                <Button
                  title={'NEXT'}
                  onSubmit={this.onSubmit}
                  navigation={navigation}
                  propStyle={{width: '100%'}}
                />
              )}
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  SpecialitiesCont: {
    marginTop: 5,
    marginBottom: 5,
    width: Platform.OS === 'android' ? 325 : '100%',
  },
  Gender_text: {
    textAlign: 'left',
    width: Platform.OS === 'android' ? 325 : '100%',
    zIndex: -1,
  },
  goBackCont: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: Platform.OS === 'android' ? 10 : 30,
    height: 50,
    width: '85%',
    marginBottom: 25,
    alignSelf: 'center',
  },
  ButtonCont: {
    width: Platform.OS === 'android' ? 325 : '100%',
    justifyContent: 'center',
    marginLeft: Platform.OS === 'android' ? -12 : 0,
  },
  licenceCont: {
    marginTop: 10,
    width: Platform.OS === 'android' ? 325 : '100%',
  },
  ContactButtonCont: {
    alignItems: 'flex-start',
    width: Platform.OS === 'android' ? 325 : '100%',
  },
});

const mapStateToProps = (state) => {
  return {
    addProfessDetailsFailureMessage:
      state.SignupReducer.addProfessDetailsFailureMessage,
    addProfessDetailsFailure: state.SignupReducer.addProfessDetailsFailure,
    addProfessDetailsSuccess: state.SignupReducer.addProfessDetailsSuccess,
    addProfessDetails: state.SignupReducer.addProfessDetails,
    step2Data: state.SignupReducer.step2Data,
  };
};

const mapDispatchToProps = (dispatch) => ({
  addStylistProfessionDetails: (data) =>
    dispatch(addStylistProfessionDetails(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Step2);
