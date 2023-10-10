/* eslint-disable react/no-did-update-set-state */
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {Images, Colors} from '../../constants';
import CommonStyle from '../../constants/Style';
import ProfileItem from '../../components/ProfileItem';
import PopupCard from '../../components/PopupCard';
import UploadProfile from '../../components/UploadProfile';
import AsyncStorage from '@react-native-community/async-storage';
import SafeAreaView from 'react-native-safe-area-view';
import {connect} from 'react-redux';
import Share from 'react-native-share';
import axios from 'axios';
import {
  styistProfileUploadReq,
  fetchStylistDetails,
  fetchCustomerDetails,
  logout,
} from '../../redux/actions/authAction';
import {
  stylistBasepath,
  customerBasepath,
  customerImagePath,
  BASE_URL,
  BARBER_USER_CODE,
  CUSTOMER_USER_CODE,
} from '../../constants/Config';
import {updateProfilePic} from '../../redux/actions/profileAction';
import Spinner from 'react-native-loading-spinner-overlay';
import {Platform} from 'react-native';
import Fonts from '../../constants/Fonts';
const {height} = Dimensions.get('window');

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalStatus: false,
      editProfilePopup: false,
      name: '',
      spinner: false,
      // userType: 0,

      //   profilePicture:
      //     this.props.route.params.userType === 'Barber'
      //       ? Images.Haicut.Haircut1
      //       : Images.Haicut.Haircut5,
    };
  }

  myCustomShare = async () => {
    console.log('hello');
    const shareOptions = {
      message:
        'Your friend invite you to use Hairbiddy for great hair service http://66.175.217.67:8012/',
      url: BASE_URL,
      title: 'Hairbiddy Invitation from ' + this.state.name,
    };
    try {
      const ShareResponse = await Share.open(shareOptions);
    } catch (error) {
      console.log('Error => ', error);
    }
  };

  shareLinkWithShareDialog() {
    Share.share(
      {
        message:
          'Your friend invite you to use Hairbiddy for great hair service http://66.175.217.67:8012/',
        url: BASE_URL,
        title: 'Hairbiddy Invitation from ' + this.state.name,
      },
      {
        // Android only:
        dialogTitle: 'Share Hairbiddy Invite with your friends',
        // iOS only:
        excludedActivityTypes: ['com.apple.UIKit.activity.PostToTwitter'],
      },
    );
  }

  showLogoutModal = () => {
    this.setState({
      modalStatus: true,
    });
  };
  onLogout = () => {
    this.setState(
      {
        modalStatus: false,
        spinner: true,
      },
      async () => {
        let token = await AsyncStorage.getItem('loginToken');
        //let userType = this.props.route.params.userType;
        console.log('token', token);

        let path =
          this.state.userType === BARBER_USER_CODE
            ? stylistBasepath
            : customerBasepath;
        try {
          console.log('@@@@@@@@@@token', token);
          let res = await axios.get(path + 'logout', {
            headers: {
              Authorization: 'Bearer ' + token,
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
          });
          console.log('$$$$$$$$$ logout res', res);
          if (res) {
            this.setState({spinner: false});
            this.props.logout();

            const r_email = await AsyncStorage.getItem('remembered_email');
            const r_password = await AsyncStorage.getItem(
              'remembered_password',
            );
            await AsyncStorage.clear();
            if (r_email !== null) {
              await AsyncStorage.setItem('remembered_email', r_email);
            }
            if (r_password !== null) {
              await AsyncStorage.setItem('remembered_password', r_password);
            }
            console.log('remember me data 12', r_email);
            this.props.navigation.reset({
              index: 0,
              routes: [
                {
                  name: 'ChooseUser',
                },
              ],
            });
          }
        } catch (error) {
          console.log('%%%%%%%%%%%%%%%%% ERRor', error);
        }
      },
    );
  };

  onSubmit = (response) => {
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
      });
      let formdata = new FormData();
      formdata.append('prof_pic', photo);
      if (this.state.userType === BARBER_USER_CODE) {
        this.props.styistProfileUploadReq(formdata);
      } else {
        this.props.updateProfilePic(formdata);
      }
    }
  };

  componentDidMount() {
    // const { route, userInfo } = this.props
    let userInfo = this.props.userInfo;
    console.log('userInfo===>', userInfo);
    let userType = null;
    if (userInfo && userInfo.provider !== undefined) {
      userType = userInfo.provider.user_type;
    } else if (userInfo && userInfo.user_data !== undefined) {
      userType = userInfo.user_data.user_type;
    }

    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({
      name:
        userType === BARBER_USER_CODE
          ? userInfo && userInfo.provider && userInfo.provider.name
            ? userInfo.provider.name
            : ''
          : userInfo && userInfo.user_data
          ? userInfo.user_data.name
          : '',
      userType: userType,
    });
  }

  async componentDidUpdate(prevProps, prevState) {
    if (
      this.props.styistProfUploadFailure !==
        prevProps.styistProfUploadFailure &&
      this.props.styistProfUploadFailureMessage !== ''
    ) {
      this.setState({
        profileErrorMsg: this.props.styistProfUploadFailureMessage,
        spinner: false,
      });
      Alert.alert(
        'Hair Biddy',
        this.props.styistProfUploadFailureMessage,
        [{text: 'OK', onPress: () => {}}],
        {cancelable: true},
      );
    } else if (
      this.props.styistProfUploadSuccess !== prevProps.styistProfUploadSuccess
    ) {
      this.setState({spinner: false});
      let token = await AsyncStorage.getItem('loginToken');
      if (token) {
        this.props.fetchStylistDetails(token);
      }
    } else if (
      this.props.updateProfilePicSuccess !==
        prevProps.updateProfilePicSuccess &&
      this.props.updateProfilePicSuccess
    ) {
      this.setState({
        profileErrorMsg: '',
        spinner: false,
      });
      let token = await AsyncStorage.getItem('loginToken');
      if (token) {
        this.props.fetchCustomerDetails(token);
      }
    } else if (
      this.props.updateProfilePicFailure !==
        prevProps.updateProfilePicFailure &&
      this.props.updateProfilePicFailureMessage !== ''
    ) {
      this.setState({
        profileErrorMsg: this.props.updateProfilePicFailureMessage,
        spinner: false,
      });
      Alert.alert(
        'Hair Biddy',
        this.props.updateProfilePicFailureMessage,
        [{text: 'OK', onPress: () => {}}],
        {cancelable: true},
      );
    }
  }
  render() {
    const {navigation, userInfo, updateProfilePicReq, styistProfUploadReq} =
      this.props;
    return (
      <SafeAreaView style={styles.flex1}>
        <ScrollView
          style={styles.ScrollViewStyle}
          showsVerticalScrollIndicator={false}>
          <Spinner
            visible={
              updateProfilePicReq || this.state.spinner || styistProfUploadReq
            }
            textContent={'Loading...'}
            textStyle={{color: Colors.BackgroundGray}}
          />
          <View style={styles.View_Cont2}>
            {/* <ImageBackground
                        source={Images.HomeIcon.RedBg}
                        imageStyle={{
                            borderBottomLeftRadius: 15,
                            borderBottomRightRadius: 15,fon
                        }}
                        style={CommonStyle.backgroundStyle}> */}

            <View style={styles.View_Cont5}>
              {this.state.userType === BARBER_USER_CODE ? (
                <Text style={styles.Menu_text}>Menu</Text>
              ) : null}
            </View>
            {/* </ImageBackground> */}
            <View style={CommonStyle.profileCard}>
              <View style={styles.View_Cont4}>
                {this.state.userType === CUSTOMER_USER_CODE ||
                this.state.userType === 0 ? (
                  <TouchableOpacity>
                    <Image
                      source={
                        userInfo &&
                        userInfo.user_data &&
                        userInfo.user_data.profile_pic
                          ? {
                              uri:
                                customerImagePath +
                                userInfo.user_data.profile_pic,
                            }
                          : Images.CustomerHomeIcon.Default
                      }
                      style={styles.profile_picStyle}
                    />
                  </TouchableOpacity>
                ) : null}

                {this.state.userType === CUSTOMER_USER_CODE ||
                this.state.userType === 0 ? (
                  <View style={styles.textView}>
                    <Text style={[CommonStyle.userName1, styles.userName2]}>
                      {(this.state.userType === CUSTOMER_USER_CODE ||
                        this.state.userType === 0) &&
                      userInfo &&
                      userInfo.user_data
                        ? userInfo.user_data.name
                        : ''}
                    </Text>

                    <View style={styles.MapPin_View}>
                      <Image
                        source={Images.ProfileIcon.MapPin}
                        style={styles.MapPin_style}
                      />
                      <Text style={styles.Address_text}>
                        {userInfo != null
                          ? userInfo.user_data.city +
                            ', ' +
                            userInfo.user_data.state
                          : ''}
                      </Text>
                    </View>
                  </View>
                ) : null}

                {this.state.userType === CUSTOMER_USER_CODE ||
                this.state.userType === 0 ? (
                  <View style={styles.View_Cont} />
                ) : null}

                {(this.state.userType === CUSTOMER_USER_CODE ||
                  this.state.userType === 0) && (
                  <View style={styles.ProfileItem_View}>
                    <ProfileItem
                      icon={Images.ProfileIcon.Account}
                      title="Account Settings"
                      path="Account"
                      data={userInfo}
                      userType={this.state.userType}
                      navigation={navigation}
                    />

                    <View style={[styles.borderLine]} />

                    <ProfileItem
                      icon={Images.CustomerHomeIcon.MyPhoto}
                      title="My Photo"
                      userType={this.state.userType}
                      path="Portfolio"
                      navigation={navigation}
                      sizeH={0}
                      sizeW={0}
                    />
                    <View style={[styles.borderLine]} />

                    <ProfileItem
                      icon={Images.ProfileIcon.Card}
                      title="Card Information"
                      path="CardInfo"
                      navigation={navigation}
                      sizeH={0}
                      sizeW={2}
                    />
                    <View style={styles.borderLine} />
                    <ProfileItem
                      icon={Images.ProfileIcon.Payment}
                      title="Payment Details"
                      path="PaymentDetails"
                      userType={this.state.userType}
                      navigation={navigation}
                      sizeH={0}
                      sizeW={0}
                    />
                  </View>
                )}

                {this.state.userType === BARBER_USER_CODE && (
                  <View style={styles.View_Cont3}>
                    <View style={styles.Menu_View}>
                      <Text style={styles.Menu_text2}>Menu</Text>
                    </View>
                    <View style={styles.settings_view}>
                      <ProfileItem
                        icon={Images.ProfileIcon.Shop}
                        title="Shop Settings"
                        path="ShopSetting"
                        navigation={navigation}
                        sizeH={0}
                        sizeW={1}
                      />
                      <View style={[styles.borderLine]} />

                      <ProfileItem
                        icon={Images.ProfileIcon.Salon}
                        title="Salon Settings"
                        path="ShopSalon"
                        navigation={navigation}
                        sizeH={0}
                        sizeW={0}
                      />
                      <View style={styles.borderLine} />

                      <ProfileItem
                        icon={Images.ProfileIcon.Appointment}
                        title="Appointment Settings"
                        path="ShopWorkhour"
                        navigation={navigation}
                        sizeH={0}
                        sizeW={0}
                      />
                      <View style={styles.borderLine} />

                      <ProfileItem
                        icon={Images.ProfileIcon.Service}
                        title="Service Settings"
                        path="Service"
                        navigation={navigation}
                        sizeH={0}
                        sizeW={0}
                      />
                      <View style={styles.borderLine} />
                      <ProfileItem
                        icon={Images.ProfileIcon.Payment}
                        title="Payment Information"
                        path="PaymentInfo"
                        navigation={navigation}
                        sizeH={0}
                        sizeW={0}
                      />
                      <View style={styles.borderLine} />
                      <ProfileItem
                        icon={Images.ProfileIcon.Invoice}
                        title="Invoice"
                        path="Invoice"
                        userType={this.state.userType}
                        navigation={navigation}
                        sizeH={1}
                        sizeW={0}
                      />
                      <View style={styles.borderLine} />
                      <ProfileItem
                        icon={Images.ProfileIcon.Portfolio}
                        title="Portfolio"
                        path="Portfolio"
                        userType={this.state.userType}
                        navigation={navigation}
                        sizeH={0}
                        sizeW={0}
                      />
                      <View style={styles.borderLine} />

                      <ProfileItem
                        icon={Images.ProfileIcon.Subscription}
                        title="Subscriptions"
                        path="Subscription"
                        navigation={navigation}
                        sizeH={0}
                        sizeW={2}
                      />
                      <View style={styles.borderLine} />
                      <ProfileItem
                        icon={Images.ProfileIcon.Template}
                        title={'Stylist Template'}
                        path="ChangeTemplate"
                        userType={this.state.userType}
                        navigation={navigation}
                        sizeH={0}
                        sizeW={1}
                      />
                    </View>
                  </View>
                )}
                <View style={styles.borderLine} />
                <ProfileItem
                  icon={Images.ProfileIcon.Invite}
                  title="Invite a Friend"
                  path="InviteFriends"
                  navigation={navigation}
                  myCustomShare={() => this.myCustomShare()}
                  sizeH={0}
                  sizeW={0}
                />
                <View style={styles.borderLine} />

                <ProfileItem
                  icon={Images.ProfileIcon.About}
                  title="About Us"
                  path="AboutUs"
                  navigation={navigation}
                  sizeH={0}
                  sizeW={0}
                />
                <View style={styles.borderLine} />

                <ProfileItem
                  icon={Images.ProfileIcon.Privacy}
                  title="Privacy Policy"
                  path="PrivacyPolicy"
                  navigation={navigation}
                  sizeH={1}
                  sizeW={1}
                />
                <View style={styles.borderLine} />

                <ProfileItem
                  icon={Images.ProfileIcon.Logout}
                  openPopUp={() => this.showLogoutModal()}
                  title="Logout"
                  path="Logout"
                  navigation={navigation}
                  sizeH={0}
                  sizeW={0}
                />
              </View>

              {this.state.modalStatus && (
                <PopupCard
                  screen={'logout'}
                  title={'Log Out'}
                  modalStatus={this.state.modalStatus}
                  onClose={() => this.setState({modalStatus: false})}
                  onYes={() => this.onLogout()}
                  label={'Are you sure you want to\nlogout?'}
                />
              )}

              {this.state.editProfilePopup && (
                <UploadProfile
                  modalStatus={this.state.editProfilePopup}
                  onClose={() => this.setState({editProfilePopup: false})}
                  onChoose={(response) => this.onSubmit(response)}
                />
              )}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  borderLine: {
    borderBottomWidth: 2,
    borderBottomColor: '#F3F2F3',
    width: '100%',
  },
  borderLine2: {
    borderBottomWidth: 2,
    borderBottomColor: '#F3F2F3',
  },
  View_Cont3: {
    width: '100%',
  },
  Address_text: {
    marginStart: 5,
    color: Colors.ButtonColor,
    fontSize: 13,
    fontFamily: Fonts.HeveticaNowText_BlackItalic,
    fontStyle: 'italic',
  },
  userName2: {
    marginTop: 10,
  },
  View_Cont5: {
    height: 0,
  },
  settings_view: {
    alignItems: 'center',
  },
  View_Cont2: {
    flex: 1,
    flexDirection: 'column',
    paddingBottom: 55,
  },
  profile_picStyle: {
    height: 96,
    width: 96,
    borderRadius: 48,
    borderWidth: 2,
    borderColor: Colors.ButtonColor,
    marginTop: 5,
  },
  MapPin_style: {
    height: 15,
    width: 13,
  },
  View_Cont4: {alignItems: 'center'},
  flex1: {
    flex: 1,
  },
  textView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  MapPin_View: {
    flexDirection: 'row',
    marginTop: 5,
    alignItems: 'center',
  },
  Menu_text: {
    fontSize: 24,
    margin: 10,
    fontFamily: Fonts.HeveticaNowText_Medium,
  },
  ScrollViewStyle: {
    height,
    flex: 1,
    backgroundColor: Colors.White,
  },
  View_Cont: {
    borderBottomWidth: 5,
    marginTop: 20,
    borderBottomColor: '#F3F2F3',
    width: '100%',
  },
  Menu_text2: {
    fontSize: 24,
    color: '#283A58',
    fontFamily: Fonts.HeveticaNowText_Medium,
  },
  Menu_View: {
    alignItems: 'flex-start',
    margin: 10,
    marginLeft: 20,
  },
  ProfileItem_View: {
    alignItems: 'center',
    width: '100%',
  },
});

const mapStateToProps = (state) => {
  return {
    userInfo: state.SignupReducer.userInfo,
    styistProfUploadFailureMessage:
      state.SignupReducer.styistProfUploadFailureMessage,
    styistProfUploadFailure: state.SignupReducer.styistProfUploadFailure,
    styistProfUploadSuccess: state.SignupReducer.styistProfUploadSuccess,
    styistProfUploadReq: state.SignupReducer.styistProfUploadReq,
    updateProfilePicReq: state.ProfileReducer.updateProfilePic,
    updateProfilePicFailure: state.ProfileReducer.updateProfilePicFailure,
    updateProfilePicSuccess: state.ProfileReducer.updateProfilePicSuccess,
    updateProfilePicFailureMessage:
      state.ProfileReducer.updateProfilePicFailureMessage,
  };
};

const mapDispatchToProps = (dispatch) => ({
  styistProfileUploadReq: (data) => dispatch(styistProfileUploadReq(data)),
  updateProfilePic: (data) => dispatch(updateProfilePic(data)),
  fetchStylistDetails: (data) => dispatch(fetchStylistDetails(data)),
  fetchCustomerDetails: (data) => dispatch(fetchCustomerDetails(data)),
  logout: () => dispatch(logout()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Menu);
