/* eslint-disable react/no-did-mount-set-state */
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Platform,
} from 'react-native';
import {Images, Fonts, Colors} from '../../constants';
import CommonStyle from '../../constants/Style';
import NotificationItem from '../../components/NotificationItem';
import {
  getStylistNotification,
  clearStylistNotification,
} from '../../redux/actions/notificationAction';
import {connect} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-community/async-storage';
import SafeAreaView from 'react-native-safe-area-view';
const {height, width} = Dimensions.get('window');

class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userType: '',
    };
  }
  renderNotification = ({item}) => {
    return (
      <NotificationItem
        title={item.title}
        item={item}
        notiId={item.id}
        booking_id={item.booking_id}
        navigation={this.props.navigation}
        userType={this.state.userType}
        description={item.description}
        image={item.image}
        viewStatus={item.is_viewed}
        date={item.created_at}
      />
    );
  };
  async componentDidMount() {
    console.log('uuff==>', this.props.userInfo);

    if (this.props.userInfo != null && this.props.userInfo !== undefined) {
      if (this.props.userInfo.user_data.user_type === 2) {
        this.setState({
          userType: 'Customer',
        });
      } else if (this.props.userInfo.provider.user_type === 3) {
        this.setState({
          userType: 'Barber',
        });
      }
    } else {
      this.setState({
        userType: 'Customer',
      });
    }

    let token = await AsyncStorage.getItem('loginToken');

    if (token) {
      this.props.getStylistNotification();
    }
  }
  render() {
    const {
      navigation,
      notificationData,
      clearStylistNotificationReq,
      getStylistNotificationReq,
    } = this.props;
    function sortFunction(a, b) {
      var dateA = new Date(a.created_at).getTime();
      var dateB = new Date(b.created_at).getTime();
      return dateA < dateB ? 1 : -1;
    }

    if (
      notificationData &&
      notificationData.data &&
      notificationData.data.length > 0
    ) {
      notificationData.data.sort(sortFunction);
    }
    return (
      <SafeAreaView style={styles.cont}>
        <Spinner
          visible={getStylistNotificationReq || clearStylistNotificationReq}
          textContent={'Loading...'}
          textStyle={{color: Colors.BackgroundGray}}
        />
        {/* <ImageBackground
          source={Images.HomeIcon.RedBg}
          imageStyle={{
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
          }}
          style={styles.backgroundStyle}>
          <SafeAreaInsetsContext.Consumer>
            {insets =>
              <View style={[styles.notifyCont, { marginTop: Platform.OS === 'android' ? 50 : insets.top === 20 ? 30 : 60 }]}>
                <TouchableOpacity
                  onPress={() =>
                    this.state.userType === 'Barber' && route.params.data
                      ? navigation.reset({
                        index: 0,
                        routes: [
                          {
                            name: 'HomeScreen',
                            params: { userType: 'Barber' },
                          },
                        ],
                      })
                      : this.state.userType === 'Customer' && route.params.data
                        ? navigation.reset({
                          index: 0,
                          routes: [
                            {
                              name: 'HomeScreenContainer',
                              params: { userType: 'Customer' },
                            },
                          ],
                        })
                        : navigation.goBack()
                  }
                  activeOpacity={1}>
                  <Image
                    source={Images.Notification.BackArrow}
                    style={{ height: 20, width: 20 }}
                  />
                </TouchableOpacity>
                <Text style={[styles.welcomeName, { marginLeft: 30 }]}>
                  Notifications{' '}
                </Text>
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() =>
                    notificationData.data.length > 0
                      ? this.props.clearStylistNotification()
                      : Alert.alert(
                        'Hair Biddy',
                        'No Notification to clear',
                        [{ text: 'OK', onPress: () => { } }],
                        { cancelable: true },
                      )
                  }>
                  <Text style={[styles.welcomeName, { fontSize: 15 }]}>
                    Clear All{' '}
                  </Text>
                </TouchableOpacity>
              </View>}
          </SafeAreaInsetsContext.Consumer>
        </ImageBackground> */}
        <View style={styles.ViewCont}>
          {this.state.userType === 'Customer' ? (
            <View style={styles.goBackCont}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={styles.opacitySty}
                activeOpacity={1}>
                <Image
                  source={Images.SignUpIcon.BackArrow}
                  style={styles.BackArrowImg}
                />
              </TouchableOpacity>
              <Text style={styles.Notification_text}>Notifications</Text>
            </View>
          ) : (
            <Text style={styles.Notification_text2}>Notifications</Text>
          )}

          <ScrollView style={styles.cont} showsVerticalScrollIndicator={false}>
            <View style={styles.Today_View}>
              <Text style={[CommonStyle.dayText, styles.Today_text]}>
                Today
              </Text>
              {notificationData && notificationData.data.length > 0 ? (
                <FlatList
                  data={notificationData.data}
                  renderItem={this.renderNotification}
                  keyExtractor={(item) => item.id.toString()}
                />
              ) : (
                <Text style={styles.NoNotif_text}>
                  No Notification Available !
                </Text>
              )}
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    padding: 40,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  backgroundStyle: {
    height: Platform.OS === 'android' ? height / 3 + 20 : height / 4 + 20,
    width,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  cont: {
    flex: 1,
  },
  opacitySty: {
    marginStart: 10,
  },
  Today_text: {marginTop: 0, padding: 5, fontSize: 16},
  profileCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignSelf: 'center',
    borderRadius: 20,
    marginBottom: 20,
  },
  goBackCont: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  BackArrowImg: {
    height: 20.5,
    width: 12,
    marginLeft: 5,
  },
  Today_View: {
    padding: 10,
    paddingBottom: 50,
  },
  Notification_text: {
    color: '#283A58',
    fontSize: 22,
    margin: 20,
    flex: 1,
    textAlign: 'center',
  },
  ViewCont: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  Notification_text2: {
    color: '#283A58',
    fontSize: 24,
    marginTop: 10,
    margin: 10,
    marginLeft: 17,
    fontFamily: Fonts.HeveticaNowText_Medium,
  },
  NoNotif_text: {
    fontFamily: Fonts.HeveticaNowText_Black,
    fontSize: 13,
    alignSelf: 'center',
    padding: 20,
  },
  notifyCont: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
  },
  welcomeName: {
    fontSize: 18,
    color: Colors.White,
    fontFamily: Fonts.Lato_Medium,
  },
});
const mapStateToProps = (state) => {
  return {
    userInfo: state.SignupReducer.userInfo,
    getStylistNotificationReq:
      state.NotificationReducer.getStylistNotificationReq,
    getStylistNotificationSuccess:
      state.NotificationReducer.getStylistNotificationSuccess,
    notificationData: state.NotificationReducer.notificationData,
    clearStylistNotificationReq:
      state.NotificationReducer.clearStylistNotificationReq,
    clearStylistNotificationSuccess:
      state.NotificationReducer.clearStylistNotificationSuccess,
    clearStylistNotificationFailure:
      state.NotificationReducer.clearStylistNotificationFailure,
    clearStylistNotificationFailureMessage:
      state.NotificationReducer.clearStylistNotificationFailureMessage,
  };
};
const mapDispatchToProps = (dispatch) => ({
  getStylistNotification: () => dispatch(getStylistNotification()),
  clearStylistNotification: () => dispatch(clearStylistNotification()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Notification);
