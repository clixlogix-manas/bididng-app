/* eslint-disable no-undef */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {Alert, StatusBar, View, Image, Text} from 'react-native';
import ChooseUser from '../screens/CommonScreens/ChooseUser';
import JoinAsBarber from '../screens/BarberModule/JoinAsBarber';
import SignUp from '../screens/CommonScreens/Signup';
import OTPVerify from '../screens/BarberModule/OTPVerify';
import Step1 from '../screens/BarberModule/ProfileSetup/Step1';
import Step2 from '../screens/BarberModule/ProfileSetup/Step2';
import Step3 from '../screens/BarberModule/ProfileSetup/Step3';
import Step4 from '../screens/BarberModule/ProfileSetup/Step4';
import WelcomeScreen from '../screens/CommonScreens/WelcomeScreen';
import SignIn from '../screens/CommonScreens/SignIn';
import ForgotPass from '../screens/CommonScreens/ForgotPass';
import HomeScreen from '../screens/BarberModule/HomeScreen';
import Notification from '../screens/CommonScreens/Notification';
import PaymentDetails from '../screens/CustomerModule/PaymentScreen/PaymentDetails';
import AppointmentScreen from '../screens/CommonScreens/Appointment/AppointmentScreen';
import AppointmentByType from '../screens/CommonScreens/Appointment/AppointementByType';
import NewsLists from '../screens/CommonScreens/News/NewsList';
import SeeMoreList from '../screens/CustomerModule/HomeScreen/SeeMoreList';
import AllFilterData from '../screens/CustomerModule/AllFilterData';
import NewsDetails from '../screens/CommonScreens/News/NewsDetails';
import Favourites from '../screens/CustomerModule/Favourites/Favourites';
import Profile from '../screens/Profile/Profile';
import Menu from '../screens/Menu/Menu';
import Account from '../screens/Profile/Account';
import ChangePass from '../screens/Profile/ChangePass';
import ShopSetting from '../screens/Profile/Shop';
import ShopSalon from '../screens/Profile/ShopSalon';
import ShopWorkhour from '../screens/Profile/ShopWorkhour';
import Service from '../screens/Profile/Service';
import AddService from '../screens/Profile/AddService';
import AddDiscount from '../screens/Profile/AddDiscount';
import PaymentInfo from '../screens/Profile/AddBankAccount';
import Portfolio from '../screens/Profile/Portfolio';
import ViewImage from '../screens/Profile/ViewImage';
import ImageUpload from '../screens/Profile/ImageUpload';
import Subscription from '../screens/Profile/Subscription';
import AboutUs from '../screens/CommonScreens/StaticPages/AboutUs';
import PrivacyPolicy from '../screens/CommonScreens/StaticPages/PrivacyPolicy';
import SocialSignUp from '../screens/CustomerModule/SocialSignup';
import HomeScreenContainer from '../screens/CustomerModule/HomeScreen/HomeContainer';
import CardInfo from '../screens/CustomerModule/PaymentScreen/CardInfo';
import StylistProfile from '../screens/CustomerModule/StylistScreen';
import StylistProfileTwo from '../screens/CustomerModule/StylistScreen/secondIndex';
import ReviewComp from '../screens/CustomerModule/StylistScreen/review';
import ContactComp from '../screens/CustomerModule/StylistScreen/contact';
import BookingShedule from '../screens/CustomerModule/Booking/BookingShedule';
import ReviewBooking from '../screens/CustomerModule/Booking/ReviewBooking';
import RateStylist from '../screens/CustomerModule/RateStylist';
import PaymentComplete from '../screens/CustomerModule/PaymentScreen/index';
import Filter from '../screens/CustomerModule/Filter';
import messaging from '@react-native-firebase/messaging';
import SplashScreen from 'react-native-splash-screen';
import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux';
import {fetchStylistDetails} from '../redux/actions/authAction';
import TermAndCond from '../screens/CommonScreens/StaticPages/TermAndCond';
import ChangeTemplate from '../screens/Profile/ChangeTemplate';
import ViewNotifyImage from '../screens/BarberModule/ViewImage';
import Invoice from '../screens/Profile/Invoice';
import InviteFriends from '../screens/Profile/InviteFriends';
import PreviewOne from '../screens/BarberModule/StylistPreview/Preview1';
import PreviewTwo from '../screens/BarberModule/StylistPreview/Preview2';
import GuestHome from '../screens/GuestModule';
import GuestSearch from '../screens/GuestModule/Search';
import GuestStylistProfileOne from '../screens/GuestModule/Preview1';
import GuestStylistProfileTwo from '../screens/GuestModule/Preview2';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import CountryCode from '../screens/CommonScreens/CountryCode';
import {Colors} from '../constants';
export const navigationRef = React.createRef();
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

class AppNavigator extends Component {
  moveOnNotification = async (userType, path) => {
    navigationRef.current.reset({
      index: 0,
      routes: [
        {
          name: path,
          params: {userType: userType},
        },
      ],
    });
    SplashScreen.hide();
  };
  async componentDidMount() {
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {});

    let token = await AsyncStorage.getItem('loginToken');
    let temptoken = await AsyncStorage.getItem('temploginToken');
    let type = await AsyncStorage.getItem('loggedUserType');
    let deviceToken = await messaging().getToken();
    await AsyncStorage.setItem('deviceToken', deviceToken);
    messaging().onMessage(async (remoteMessage) => {
      if (remoteMessage.data.type && remoteMessage.data.type === 'tag') {
        Alert.alert(
          remoteMessage.notification.title,
          remoteMessage.notification.body,
          [
            {
              text: 'View Image',
              onPress: () => {
                if (navigationRef.current && navigationRef.current.navigate) {
                  navigationRef.current.navigate('ViewNotifyImage', {
                    data: remoteMessage.data.tag_image_id,
                    userType: type,
                  });
                }
                SplashScreen.hide();
              },
            },
          ],
          {cancelable: true},
        );
      } else {
        Alert.alert(
          remoteMessage.notification.title,
          remoteMessage.notification.body,
          [
            {
              text: 'OK',
              onPress: () => {
                if (navigationRef.current && navigationRef.current.navigate) {
                  navigationRef.current.navigate('Notification', {
                    data: remoteMessage.notification,
                    userType: type,
                  });
                }
                SplashScreen.hide();
              },
            },
          ],
          {cancelable: true},
        );
      }
    });
    /*
     * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
     * */
    this.notificationOpenedListener = messaging().onNotificationOpenedApp(
      async (notificationOpen) => {
        // const {title, body} = notificationOpen.notification;
        if (
          notificationOpen.data.type &&
          notificationOpen.data.type === 'tag'
        ) {
          navigationRef.current.reset({
            index: 0,
            routes: [
              {
                name: 'ViewNotifyImage',
                params: {
                  data: notificationOpen.data.tag_image_id,
                  userType: type,
                },
              },
            ],
          });
        } else {
          navigationRef.current.reset({
            index: 0,
            routes: [
              {
                name: 'Notification',
                params: {data: notificationOpen.notification, userType: type},
              },
            ],
          });
        }
        SplashScreen.hide();
      },
    );
    /*
     * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
     * */
    const notificationOpen = await messaging().getInitialNotification();
    if (notificationOpen) {
      // const {title, body} = notificationOpen.notification;
      if (notificationOpen.data.type && notificationOpen.data.type === 'tag') {
        navigationRef.current.reset({
          index: 0,
          routes: [
            {
              name: 'ViewNotifyImage',
              params: {
                data: notificationOpen.data.tag_image_id,
                userType: type,
              },
            },
          ],
        });
      } else {
        navigationRef.current.reset({
          index: 0,
          routes: [
            {
              name: 'Notification',
              params: {data: notificationOpen.notification, userType: type},
            },
          ],
        });
      }
      SplashScreen.hide();
    } else {
      if (token && type === 'Barber') {
        this.moveOnNotification('Barber', 'HomeScreen');
      } else if (token && type === 'Customer') {
        this.moveOnNotification('Customer', 'HomeScreenContainer');
      } else if (temptoken) {
        this.props.fetchStylistDetails(temptoken);
        SplashScreen.hide();
      } else {
        SplashScreen.hide();
      }
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.userInfo !== this.props.userInfo &&
      this.props.userInfo !== null
    ) {
      const {userInfo} = this.props;
      if (userInfo !== null && userInfo.steps) {
        if (userInfo.steps.step_one === 'false') {
          navigationRef.current.reset({
            index: 0,
            routes: [
              {
                name: 'Step1',
                params: {userType: 'Barber'},
              },
            ],
          });
          SplashScreen.hide();
        } else if (userInfo.steps.step_two === 'false') {
          navigationRef.current.reset({
            index: 0,
            routes: [
              {
                name: 'Step2',
                params: {userType: 'Barber'},
              },
            ],
          });
          SplashScreen.hide();
        } else if (userInfo.steps.step_three === 'false') {
          navigationRef.current.reset({
            index: 0,
            routes: [
              {
                name: 'Step3',
                params: {userType: 'Barber'},
              },
            ],
          });
          SplashScreen.hide();
        } else if (userInfo.steps.step_four === 'false') {
          navigationRef.current.reset({
            index: 0,
            routes: [
              {
                name: 'Step4',
                params: {userType: 'Barber'},
              },
            ],
          });
          SplashScreen.hide();
        }
      }
    }
  }

  //Render Guest User Bottom Tab Navigation
  renderGuestTabBar = () => {
    return (
      <>
        <Tab.Navigator
          backBehavior="initialRoute"
          tabBarOptions={{
            showLabel: false,
            style: {
              position: 'absolute',
              elevation: 0,
              backgroundColor: Colors.Black,
              height: 60,
            },
          }}>
          <Tab.Screen
            name="Home"
            component={GuestHome}
            options={{
              tabBarIcon: ({focused}) => (
                <View
                  style={{
                    alignSelf: 'center',
                    marginTop: Platform.OS === 'android' ? 0 : 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    resizeMode={'contain'}
                    style={{
                      height: 20,
                      width: 30,
                      tintColor: focused ? Colors.White : Colors.menuGray,
                      alignSelf: 'center',
                    }}
                    source={require('../../assets/images/home.png')}
                  />
                  <Text
                    style={{
                      color: focused ? Colors.White : Colors.menuGray,
                      fontSize: 12,
                    }}>
                    Home
                  </Text>
                </View>
              ),
            }}
          />
          <Tab.Screen
            name="Appointment"
            component={SignUp}
            listeners={({navigation}) => ({
              tabPress: (e) => {
                // Prevent default action
                e.preventDefault();

                // Do something with the `navigation` object
                navigation.navigate('SignIn', {userType: 'Customer'}); // Here!!!!!!!!!!!!!!!!!!!!!!!!!!!!
              },
            })}
            options={{
              tabBarIcon: ({focused}) => (
                <View
                  style={{
                    alignSelf: 'center',
                    marginTop: Platform.OS === 'android' ? 0 : 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    resizeMode={'contain'}
                    style={{
                      height: 20,
                      width: 30,
                      tintColor: focused ? Colors.White : Colors.menuGray,
                    }}
                    source={require('../../assets/images/calendar.png')}
                  />
                  <Text
                    style={{
                      color: focused ? Colors.White : Colors.menuGray,
                      fontSize: 12,
                    }}>
                    Appointment
                  </Text>
                </View>
              ),
            }}
          />
          <Tab.Screen
            name="Menu"
            component={SignUp}
            listeners={({navigation}) => ({
              tabPress: (e) => {
                // Prevent default action
                e.preventDefault();

                // Do something with the `navigation` object
                navigation.navigate('SignIn', {userType: 'Customer'}); // Here!!!!!!!!!!!!!!!!!!!!!!!!!!!!
              },
            })}
            options={{
              tabBarIcon: ({focused}) => (
                <View
                  style={{
                    alignSelf: 'center',
                    marginTop: Platform.OS === 'android' ? 0 : 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    resizeMode={'contain'}
                    style={{
                      height: 20,
                      width: 30,
                      tintColor: focused ? Colors.White : Colors.menuGray,
                    }}
                    source={require('../../assets/images/user.png')}
                  />
                  <Text
                    style={{
                      color: focused ? Colors.White : Colors.menuGray,
                      fontSize: 12,
                    }}>
                    Account
                  </Text>
                </View>
              ),
            }}
          />
        </Tab.Navigator>
      </>
    );
  };

  //Render Customer Bottom Tab Navigation
  renderCustomerTabBar = () => {
    return (
      <>
        <Tab.Navigator
          backBehavior="initialRoute"
          tabBarOptions={{
            showLabel: false,
            style: {
              position: 'absolute',
              elevation: 0,
              backgroundColor: Colors.ButtonColor,
              height: 60,
            },
          }}>
          <Tab.Screen
            name="Home"
            component={HomeScreenContainer}
            options={{
              tabBarIcon: ({focused}) => (
                <View
                  style={{
                    alignSelf: 'center',
                    marginTop: Platform.OS === 'android' ? 0 : 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    resizeMode={'contain'}
                    style={{
                      height: 20,
                      width: 30,
                      tintColor: focused ? Colors.White : Colors.menuGray,
                      alignSelf: 'center',
                    }}
                    source={require('../../assets/images/home.png')}
                  />
                  <Text
                    style={{
                      color: focused ? Colors.White : Colors.menuGray,
                      fontSize: 12,
                    }}>
                    Home
                  </Text>
                </View>
              ),
            }}
          />
          <Tab.Screen
            name="Appointment"
            component={AppointmentScreen}
            options={{
              tabBarIcon: ({focused}) => (
                <View
                  style={{
                    alignSelf: 'center',
                    marginTop: Platform.OS === 'android' ? 0 : 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    resizeMode={'contain'}
                    style={{
                      height: 20,
                      width: 30,
                      tintColor: focused ? Colors.White : Colors.menuGray,
                    }}
                    source={require('../../assets/images/calendar.png')}
                  />
                  <Text
                    style={{
                      color: focused ? Colors.White : Colors.menuGray,
                      fontSize: 12,
                    }}>
                    Appointment
                  </Text>
                </View>
              ),
            }}
          />
          <Tab.Screen
            name="Favourites"
            component={Favourites}
            options={{
              tabBarIcon: ({focused}) => (
                <View
                  style={{
                    alignSelf: 'center',
                    marginTop: Platform.OS === 'android' ? 0 : 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    resizeMode={'contain'}
                    style={{
                      height: 20,
                      width: 30,
                      tintColor: focused ? Colors.White : Colors.menuGray,
                    }}
                    source={require('../../assets/images/fav.png')}
                  />
                  <Text
                    style={{
                      color: focused ? Colors.White : Colors.menuGray,
                      fontSize: 12,
                    }}>
                    Favourites
                  </Text>
                </View>
              ),
              unmountOnBlur: true,
            }}
          />
          <Tab.Screen
            name="Menu"
            component={Menu}
            options={{
              tabBarIcon: ({focused}) => (
                <View
                  style={{
                    alignSelf: 'center',
                    marginTop: Platform.OS === 'android' ? 0 : 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    resizeMode={'contain'}
                    style={{
                      height: 20,
                      width: 30,
                      tintColor: focused ? Colors.White : Colors.menuGray,
                    }}
                    source={require('../../assets/images/user.png')}
                  />
                  <Text
                    style={{
                      color: focused ? Colors.White : Colors.menuGray,
                      fontSize: 12,
                    }}>
                    Account
                  </Text>
                </View>
              ),
            }}
          />
        </Tab.Navigator>
      </>
    );
  };

  //Render Barber Bottom Tab Navigation
  renderTabBar = () => {
    return (
      <>
        <Tab.Navigator
          backBehavior="initialRoute"
          tabBarOptions={{
            showLabel: false,
            style: {
              position: 'absolute',
              elevation: 0,
              backgroundColor: Colors.ButtonColor,
              height: 60,
            },
          }}>
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              tabBarIcon: ({focused}) => (
                <View
                  style={{
                    alignSelf: 'center',
                    marginTop: Platform.OS === 'android' ? 0 : 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    resizeMode={'contain'}
                    style={{
                      height: 20,
                      width: 30,
                      tintColor: focused ? Colors.White : Colors.menuGray,
                      alignSelf: 'center',
                    }}
                    source={require('../../assets/images/home.png')}
                  />
                  <Text
                    style={{
                      color: focused ? Colors.White : Colors.menuGray,
                      fontSize: 12,
                    }}>
                    Home
                  </Text>
                </View>
              ),
            }}
          />

          <Tab.Screen
            name="Profile"
            component={Profile}
            options={{
              tabBarIcon: ({focused}) => (
                <View
                  style={{
                    alignSelf: 'center',
                    marginTop: Platform.OS === 'android' ? 0 : 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    resizeMode={'contain'}
                    style={{
                      height: 20,
                      width: 30,
                      tintColor: focused ? Colors.White : Colors.menuGray,
                    }}
                    source={require('../../assets/images/user.png')}
                  />
                  <Text
                    style={{
                      color: focused ? Colors.White : Colors.menuGray,
                      fontSize: 12,
                    }}>
                    Profile
                  </Text>
                </View>
              ),
            }}
          />

          <Tab.Screen
            name="Notification"
            component={Notification}
            options={{
              tabBarIcon: ({focused}) => (
                <View
                  style={{
                    alignSelf: 'center',
                    marginTop: Platform.OS === 'android' ? 0 : 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    resizeMode={'contain'}
                    style={{
                      height: 20,
                      width: 30,
                      tintColor: focused ? Colors.White : Colors.menuGray,
                    }}
                    source={require('../../assets/images/notification_bell.png')}
                  />
                  <Text
                    style={{
                      color: focused ? Colors.White : Colors.menuGray,
                      fontSize: 12,
                    }}>
                    Notification
                  </Text>
                </View>
              ),
            }}
          />

          <Tab.Screen
            name="Menu"
            component={Menu}
            options={{
              tabBarIcon: ({focused}) => (
                <View
                  style={{
                    alignSelf: 'center',
                    marginTop: Platform.OS === 'android' ? 0 : 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    resizeMode={'contain'}
                    style={{
                      height: 20,
                      width: 30,
                      tintColor: focused ? Colors.White : Colors.menuGray,
                    }}
                    source={require('../../assets/images/menu.png')}
                  />
                  <Text
                    style={{
                      color: focused ? Colors.White : Colors.menuGray,
                      fontSize: 12,
                    }}>
                    Menu
                  </Text>
                </View>
              ),
            }}
          />
        </Tab.Navigator>
      </>
    );
  };

  render() {
    return (
      <NavigationContainer ref={navigationRef}>
        <StatusBar
          barStyle="light-content"
          hidden={false}
          translucent={false}
          backgroundColor={'gray'}
        />
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}>
          <Stack.Screen name="ChooseUser" component={ChooseUser} />
          <Stack.Screen name="JoinAsBarber" component={JoinAsBarber} />
          <Stack.Screen name="Signup" component={SignUp} />
          <Stack.Screen name="CountryCode" component={CountryCode} />
          <Stack.Screen name="OTPVerify" component={OTPVerify} />
          <Stack.Screen name="Step1" component={Step1} />
          <Stack.Screen name="Step2" component={Step2} />
          <Stack.Screen name="Step3" component={Step3} />
          <Stack.Screen name="Step4" component={Step4} />
          <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="ForgotPass" component={ForgotPass} />
          <Stack.Screen name="HomeScreen" component={this.renderTabBar} />
          <Stack.Screen name="Notification" component={Notification} />
          <Stack.Screen name="Favourites" component={Favourites} />
          <Stack.Screen name="PaymentDetails" component={PaymentDetails} />
          <Stack.Screen name="InviteFriends" component={InviteFriends} />
          <Stack.Screen
            name="AppointmentScreen"
            component={AppointmentScreen}
          />
          <Stack.Screen
            name="AppointmentByType"
            component={AppointmentByType}
          />
          <Stack.Screen name="NewsLists" component={NewsLists} />
          <Stack.Screen name="NewsDetails" component={NewsDetails} />
          <Stack.Screen name="SeeMoreList" component={SeeMoreList} />
          <Stack.Screen name="AllFilterData" component={AllFilterData} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Account" component={Account} />
          <Stack.Screen name="ChangePass" component={ChangePass} />
          <Stack.Screen name="ShopSetting" component={ShopSetting} />
          <Stack.Screen name="ShopSalon" component={ShopSalon} />
          <Stack.Screen name="ShopWorkhour" component={ShopWorkhour} />
          <Stack.Screen name="Service" component={Service} />
          <Stack.Screen name="Invoice" component={Invoice} />
          <Stack.Screen name="AddService" component={AddService} />
          <Stack.Screen name="AddDiscount" component={AddDiscount} />
          <Stack.Screen name="ViewNotifyImage" component={ViewNotifyImage} />
          <Stack.Screen name="PaymentInfo" component={PaymentInfo} />
          <Stack.Screen name="Portfolio" component={Portfolio} />
          <Stack.Screen
            name="ViewImage"
            component={ViewImage}
            options={{cardStyle: {backgroundColor: 'transparent'}}}
          />
          <Stack.Screen name="ImageUpload" component={ImageUpload} />
          <Stack.Screen name="Subscription" component={Subscription} />
          <Stack.Screen name="AboutUs" component={AboutUs} />
          <Stack.Screen name="TermAndCond" component={TermAndCond} />
          <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
          <Stack.Screen name="SocialSignUp" component={SocialSignUp} />
          <Stack.Screen
            name="HomeScreenContainer"
            component={this.renderCustomerTabBar}
          />
          <Stack.Screen name="CardInfo" component={CardInfo} />
          <Stack.Screen name="StylistProfile" component={StylistProfile} />
          <Stack.Screen
            name="StylistProfileTwo"
            component={StylistProfileTwo}
          />
          <Stack.Screen
            name="GuestStylistProfileOne"
            component={GuestStylistProfileOne}
          />
          <Stack.Screen
            name="GuestStylistProfileTwo"
            component={GuestStylistProfileTwo}
          />
          <Stack.Screen name="ChangeTemplate" component={ChangeTemplate} />
          <Stack.Screen name="ReviewComp" component={ReviewComp} />
          <Stack.Screen name="ContactComp" component={ContactComp} />
          <Stack.Screen name="BookingShedule" component={BookingShedule} />
          <Stack.Screen name="ReviewBooking" component={ReviewBooking} />
          <Stack.Screen name="RateStylist" component={RateStylist} />
          <Stack.Screen name="Filter" component={Filter} />
          <Stack.Screen name="PaymentComplete" component={PaymentComplete} />
          <Stack.Screen name="PreviewOne" component={PreviewOne} />
          <Stack.Screen name="PreviewTwo" component={PreviewTwo} />
          <Stack.Screen name="GuestHome" component={this.renderGuestTabBar} />
          <Stack.Screen name="GuestSearch" component={GuestSearch} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    userInfo: state.SignupReducer.userInfo,
    fetchStylist: state.SignupReducer.fetchDetails,
    fetchStylistSuccess: state.SignupReducer.fetchDetailsSuccess,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchStylistDetails: (data) => dispatch(fetchStylistDetails(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(AppNavigator);
