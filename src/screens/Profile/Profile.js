/* eslint-disable react/no-did-update-set-state */
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
  Share,
  Alert,
} from 'react-native';
import {Images, Colors, Fonts} from '../../constants';
import CommonStyle from '../../constants/Style';
import PortfolioData from './PortfolioData';
import PopupCard from '../../components/PopupCard';
import UploadProfile from '../../components/UploadProfile';
import AsyncStorage from '@react-native-community/async-storage';
import {getPortfolioImage} from '../../redux/actions/profileAction';
import {connect} from 'react-redux';
import axios from 'axios';
import ImageResizer from 'react-native-image-resizer';
import {
  styistProfileUploadReq,
  fetchStylistDetails,
  fetchCustomerDetails,
  logout,
} from '../../redux/actions/authAction';
import {
  imagePath,
  stylistBasepath,
  customerBasepath,
  customerImagePath,
  BASE_URL,
  BARBER_USER_CODE,
  CUSTOMER_USER_CODE,
} from '../../constants/Config';
import {updateProfilePic} from '../../redux/actions/profileAction';
import Spinner from 'react-native-loading-spinner-overlay';
import SafeAreaView from 'react-native-safe-area-view';
import {Platform} from 'react-native';
const {height} = Dimensions.get('window');

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalStatus: false,
      editProfilePopup: false,
      name: '',
      spinner: false,
      userType: 0,
      // profilePicture:
      //   this.props.route.params.userType === 'Barber'
      //     ? Images.Haicut.Haircut1
      //     : Images.Haicut.Haircut5,
    };
  }

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
        let userType = this.props.route.params.userType;
        let path = userType === 'Barber' ? stylistBasepath : customerBasepath;
        try {
          let res = await axios.get(path + 'logout', {
            headers: {
              Authorization: 'Bearer ' + token,
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
          });
          if (res) {
            this.setState({spinner: false});
            this.props.logout();
            const r_email = await AsyncStorage.getItem('remembered_email');
            const r_password = await AsyncStorage.getItem(
              'remembered_password',
            );
            await AsyncStorage.clear();
            await AsyncStorage.setItem('remembered_email', r_email);
            await AsyncStorage.setItem('remembered_password', r_password);
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
        } catch (error) {}
      },
    );
  };
  onSubmit = (response) => {
    if (response !== null) {
      let fmData = new FormData();
      console.log('img==>', response);

      let img =
        Platform.OS === 'android' ? 'file://' + response.path : response.uri;

      ImageResizer.createResizedImage(img, 150, 150, 'PNG', 50, 0, null)
        .then((res) => {
          console.log('rsss=>', response);
          var photo = {
            uri:
              Platform.OS === 'android'
                ? res.uri
                : res.uri.replace('file://', ''),
            type: 'image/png',
            name: 'image.png',
          };

          fmData.append('image_upload', photo);

          this.setState({
            editProfilePopup: false,
          });

          fmData.append('prof_pic', photo);
          if (this.props.route.params.userType === 'Barber') {
            this.props.styistProfileUploadReq(fmData);
          } else {
            this.props.updateProfilePic(fmData);
          }

          // this.props.addPortfolioImage(fmData);

          // response.uri is the URI of the new image that can now be displayed, uploaded...
          // response.path is the path of the new image
          // response.name is the name of the new image with the extension
          // response.size is the size of the new image
        })
        .catch((err) => {
          console.log('errr=>', err);
          // Oops, something went wrong. Check that the filename is correct and
          // inspect err to get more details.
        });

      // const photo = {
      //   uri:
      //     Platform.OS === 'android'
      //       ? 'file://' + response.path
      //       : 'data:image/jpeg;base64,' + response.data,
      //   type: response.type,
      //   name: response.fileName !== null ? response.fileName : 'noNamedImage',
      // };
      // this.setState({
      //   editProfilePopup: false,
      // });
      // let formdata = new FormData();
      // formdata.append('prof_pic', photo);
      // if (this.props.route.params.userType === 'Barber') {
      //   this.props.styistProfileUploadReq(formdata);
      // } else {
      //   this.props.updateProfilePic(formdata);
      // }
    }
  };

  componentDidMount() {
    this.props.getPortfolioImage();
    const {userInfo} = this.props;
    let userType = null;
    if (userInfo) {
      userType = userInfo.provider.user_type;
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

  renderStylistPortfolio = (item, navigation, insets) => {
    return (
      <View
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          marginVertical: 10,
          marginHorizontal:
            Platform.OS === 'android' ? 7 : insets.top === 20 ? 10 : 18,
        }}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('ViewImage', {
              item: {
                // eslint-disable-next-line no-undef
                image: {uri: portfolioImagePath + item.image},
                data: item,
              },
              type: 'show',
              userType: this.state.userType,
            })
          }
          activeOpacity={1}>
          <Image
            // eslint-disable-next-line no-undef
            source={{uri: portfolioImagePath + item.image}}
            key={item.id}
            style={[CommonStyle.portfolioImg]}
          />
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    const {
      navigation,
      portfolioList,
      userInfo,
      updateProfilePicReq,
      styistProfUploadReq,
    } = this.props;

    // eslint-disable-next-line no-unused-vars
    let showProfileItem =
      portfolioList &&
      portfolioList.length > 0 &&
      portfolioList.filter((data, index) => {
        if (data.profile_hide === 0) {
          return data;
        }
      });
    return (
      <SafeAreaView style={styles.SafeAreaViewStyle}>
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
          <View>
            <View style={CommonStyle.profileCard}>
              <View style={styles.ViewStyle1}>
                {this.state.userType === CUSTOMER_USER_CODE ? (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('ViewImage', {
                        item: {
                          image: this.state.imageErr
                            ? Images.CustomerHomeIcon.NoProfilePic
                            : {
                                uri:
                                  customerImagePath +
                                  userInfo.user_data.profile_pic,
                              },
                        },
                        userType: 'Customer',
                        type: '',
                        subOption: false,
                      })
                    }>
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
                      style={styles.ImageStyle}
                    />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('ViewImage', {
                        item: {
                          image: this.state.imageErr
                            ? Images.CustomerHomeIcon.NoProfilePic
                            : {uri: imagePath + userInfo.provider.profile_pic},
                        },
                        userType: 'Barber',
                        type: '',
                        subOption: false,
                      })
                    }>
                    <Image
                      source={
                        userInfo &&
                        userInfo.provider &&
                        userInfo.provider.profile_pic
                          ? {uri: imagePath + userInfo.provider.profile_pic}
                          : Images.CustomerHomeIcon.Default
                      }
                      style={styles.ImageStyle1}
                    />
                  </TouchableOpacity>
                )}

                <View style={styles.ViewStyle2}>
                  <Text style={[CommonStyle.userName1, {fontWeight: '800'}]}>
                    {this.state.userType === BARBER_USER_CODE
                      ? userInfo && userInfo.provider && userInfo.provider.name
                        ? userInfo.provider.name
                        : ''
                      : userInfo && userInfo.user_data
                      ? userInfo.user_data.name
                      : ''}
                  </Text>
                  <Text style={styles.professionText}>
                    {userInfo != null ? userInfo.provider_info.profession : ''}
                  </Text>
                  <View style={styles.ImageView}>
                    <Image
                      source={Images.ProfileIcon.MapPin}
                      style={styles.ImageStyle2}
                    />
                    <Text style={styles.cityText}>
                      {userInfo != null
                        ? userInfo.provider_info.city +
                          ', ' +
                          userInfo.provider_info.state
                        : ''}
                    </Text>
                  </View>
                </View>

                <View>
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() =>
                      navigation.navigate('Account', {userType: 'Barber'})
                    }>
                    <Image
                      source={Images.ProfileIcon.Edit}
                      style={styles.Edit_Image}
                    />
                  </TouchableOpacity>
                </View>

                {/* <ProfileItem
                  icon={Images.ProfileIcon.Account}
                  title="Account Settings"
                  path="Account"
                  data={userInfo}
                  userType={this.state.userType}
                  navigation={navigation}
                /> */}
                {/* <View style={styles.borderLine}></View> */}
                {/* {this.state.userType === CUSTOMER_USER_CODE && (
                  <View style={{ alignItems: 'center', width: '100%' }}>
                    <ProfileItem
                      icon={Images.CustomerHomeIcon.MyPhoto}
                      title="My Photo"
                      userType={this.state.userType}
                      path="Portfolio"
                      navigation={navigation}
                    />
                    <View style={[styles.borderLine]}></View>

                    <ProfileItem
                      icon={Images.ProfileIcon.Payment}
                      title="Payment Information"
                      path="CardInfo"
                      navigation={navigation}
                    />
                    <View style={styles.borderLine}></View>
                    <ProfileItem
                      icon={Images.ProfileIcon.Invoice}
                      title="Invoice"
                      path="Invoice"
                      userType={this.state.userType}
                      navigation={navigation}
                    />
                    <View style={styles.borderLine}></View>
                  </View>
                )} */}

                {/* {this.state.userType === BARBER_USER_CODE && (
                  <View style={{ alignItems: 'center', width: '100%' }}>
                    <ProfileItem
                      icon={Images.ProfileIcon.Shop}
                      title="Shop Settings"
                      path="ShopSetting"
                      navigation={navigation}
                    />
                    <View style={styles.borderLine}></View>

                    <ProfileItem
                      icon={Images.ProfileIcon.Salon}
                      title="Salon Settings"
                      path="ShopSalon"
                      navigation={navigation}
                    />
                    <View style={styles.borderLine}></View>

                    <ProfileItem
                      icon={Images.ProfileIcon.Appointment}
                      title="Appointment Settings"
                      path="ShopWorkhour"
                      navigation={navigation}
                    />
                    <View style={styles.borderLine}></View>

                    <ProfileItem
                      icon={Images.ProfileIcon.Service}
                      title="Service Settings"
                      path="Service"
                      navigation={navigation}
                    />
                    <View style={styles.borderLine}></View>
                    <ProfileItem
                      icon={Images.ProfileIcon.Payment}
                      title="Payment Information"
                      path="PaymentInfo"
                      navigation={navigation}
                    />
                    <View style={styles.borderLine}></View>
                    <ProfileItem
                      icon={Images.ProfileIcon.Invoice}
                      title="Invoice"
                      path="Invoice"
                      userType={this.state.userType}
                      navigation={navigation}
                    />
                    <View style={styles.borderLine}></View>
                    <ProfileItem
                      icon={Images.ProfileIcon.Portfolio}
                      title="Portfolio"
                      path="Portfolio"
                      userType={this.state.userType}
                      navigation={navigation}
                    />
                    <View style={styles.borderLine}></View>

                    <ProfileItem
                      icon={Images.ProfileIcon.Subscription}
                      title="Subscriptions"
                      path="Subscription"
                      navigation={navigation}
                    />
                    <View style={styles.borderLine}></View>
                    <ProfileItem
                      icon={Images.ProfileIcon.Template}
                      title={'Profile Preview'}
                      path="ChangeTemplate"
                      userType={this.state.userType}
                      navigation={navigation}
                    />
                    <View style={styles.borderLine}></View>
                  </View>
                )} */}
                {/*
                <ProfileItem
                  icon={Images.ProfileIcon.Invite}
                  title="Invite a Friend"
                  path="invite"
                  onPress={() => this.shareLinkWithShareDialog()}
                  navigation={navigation}
                />
                <View style={styles.borderLine}></View>

                <ProfileItem
                  icon={Images.ProfileIcon.About}
                  title="About Us"
                  path="AboutUs"
                  navigation={navigation}
                />
                <View style={styles.borderLine}></View> */}

                {/* <ProfileItem
                  icon={Images.ProfileIcon.Privacy}
                  title="Privacy Policy"
                  path="PrivacyPolicy"
                  navigation={navigation}
                />
                <View style={styles.borderLine}></View>

                <ProfileItem
                  icon={Images.ProfileIcon.Logout}
                  openPopUp={() => this.showLogoutModal()}
                  title="Logout"
                  path="Logout"
                  navigation={navigation}
                /> */}
              </View>
              <Text style={styles.specialities_text}>
                {userInfo != null ? userInfo.provider_info.specialities : ''}
              </Text>

              <View style={styles.textView} />
              <Text style={styles.textStyle1}>{'Upload portfolio'}</Text>
              <PortfolioData navigation={navigation} />
              {/* {showProfileItem && (
                <FlatList
                  data={showProfileItem}
                  scrollEnabled={false}
                  showsVerticalScrollIndicator={false}
                  renderItem={({ item, index }) =>
                    this.renderStylistPortfolio(item, navigation, insets)
                  }
                  contentContainerStyle={{
                    flex: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems:
                      showProfileItem.length === 1
                        ? 'flex-start'
                        : 'center',
                  }}
                  keyExtractor={(item) => item.id.toString()}
                  numColumns={3}
                />
              )} */}
              {/* <Portfolio type='Stylist' renderScreen = 'portfolio' userType ="Barber"/> */}

              {this.state.modalStatus && (
                <PopupCard
                  screen={'logout'}
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
    borderBottomWidth: 1,
    borderBottomColor: Colors.BorderGray,
    width: '90%',
  },
  SafeAreaViewStyle: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  specialities_text: {
    textAlignVertical: 'center',
    marginTop: 5,
    color: Colors.Black,
    fontSize: 14,
    padding: 10,
    fontFamily: Fonts.HeveticaNowText_Medium,
  },
  ImageView: {
    flexDirection: 'row',
    marginTop: 5,
    alignItems: 'center',
  },
  professionText: {
    textAlignVertical: 'center',
    marginTop: 5,
    color: Colors.textDarkGray,
    fontSize: 15,
  },
  ViewStyle2: {
    flex: 1,
    marginStart: 20,
  },
  ImageStyle2: {
    height: 15,
    width: 13,
  },
  ImageStyle: {
    height: 80,
    width: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: Colors.ButtonColor,
  },
  ImageStyle1: {
    height: 80,
    width: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: Colors.ButtonColor,
  },
  cityText: {
    marginStart: 5,
    color: Colors.ButtonColor,
    fontSize: 14,
    fontStyle: 'italic',
  },
  ViewStyle1: {
    padding: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },
  ScrollViewStyle: {
    height,
    flex: 1,
  },
  textView: {
    height: 1,
    backgroundColor: Colors.BorderGray,
    width: '100%',
  },
  Edit_Image: {
    height: 24,
    width: 24,
    alignSelf: 'auto',
    marginBottom: 60,
  },
  textStyle1: {
    textAlignVertical: 'center',
    marginTop: 5,
    color: Colors.Black,
    fontSize: 18,
    padding: 10,
    fontFamily: Fonts.HeveticaNowText_Medium,
  },
});

const mapStateToProps = (state) => {
  return {
    userInfo: state.SignupReducer.userInfo,
    getPortfolioFailure: state.ProfileReducer.getPortfolioImageFailure,
    getPortfolioSuccess: state.ProfileReducer.getPortfolioImageSuccess,
    getPortfolio: state.ProfileReducer.getPortfolioImage,
    portfolioList: state.StylistReducer.portfolioList,
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
  getPortfolioImage: () => dispatch(getPortfolioImage()),
  logout: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
