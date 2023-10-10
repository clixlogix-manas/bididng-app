import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {Images, Fonts, Colors} from '../../constants';
import CommonStyle from '../../constants/Style';
import Spinner from 'react-native-loading-spinner-overlay';
import {addSubscription} from '../../redux/actions/profileAction';
import {connect} from 'react-redux';
import {fetchStylistDetails} from '../../redux/actions/authAction';
import AsyncStorage from '@react-native-community/async-storage';
import {SafeAreaInsetsContext} from 'react-native-safe-area-context';
import SafeAreaView from 'react-native-safe-area-view';

// const {height} = Dimensions.get('window');

class Subscription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPlan: 'free',
      loader: false,
    };
  }
  onPlanSelection = (plan) => {
    this.setState({selectedPlan: plan, loader: true});
    let formdata = new FormData();
    formdata.append('plan', plan);
    this.props.addSubscription(formdata);
  };
  async componentDidUpdate(prevProps, prevState) {
    if (
      this.props.addSubscriptionSuccess !== prevProps.addSubscriptionSuccess
    ) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        loader: false,
      });
      let token = await AsyncStorage.getItem('loginToken');
      this.props.fetchStylistDetails(token);
    }
  }
  componentDidMount() {
    if (this.props.userInfo && this.props.userInfo.provider_info.plan) {
      // eslint-disable-next-line react/no-did-mount-set-state
      this.setState({selectedPlan: this.props.userInfo.provider_info.plan});
    }
  }
  render() {
    const {navigation, addSubscriptionReq} = this.props;
    return (
      <SafeAreaView style={styles.SafeAreaViewStyle}>
        <SafeAreaInsetsContext.Consumer>
          {(insets) => (
            <ScrollView
              style={styles.SafeAreaViewStyle}
              showsVerticalScrollIndicator={false}>
              <Spinner
                visible={addSubscriptionReq}
                textContent={'Loading...'}
                textStyle={{color: Colors.BackgroundGray}}
              />
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
                    styles.Style1,
                    // eslint-disable-next-line react-native/no-inline-styles
                    {
                      // eslint-disable-next-line no-undef
                      marginTop: Platform.OS === 'ios' ? 0 : 10,
                    },
                  ]}>
                  <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    activeOpacity={1}>
                    <Image
                      source={Images.SignUpIcon.BackArrow}
                      style={styles.BackArrowStyle}
                    />
                  </TouchableOpacity>
                  <Text style={[CommonStyle.ShopName, styles.ShopNameText]}>
                    Subscription{' '}
                  </Text>
                  <Text style={[CommonStyle.welcomeName, styles.welcomeText]}>
                    {' '}
                  </Text>
                </View>

                <View style={[styles.headCont]}>
                  <Text style={[styles.welcomeName]}>{'Choose your Plan'}</Text>
                  <Text style={styles.hairbiddyText}>
                    {'Hairbiddy app provides you 2 \nplans to choose from'}
                  </Text>
                </View>

                {/* </ImageBackground> */}
                <View style={styles.imageCont}>
                  <Image
                    source={
                      this.state.selectedPlan === 'free'
                        ? Images.Subscription.RedCheck
                        : Images.Subscription.CircleCheck
                    }
                    style={styles.heightWidth}
                  />
                  <Text style={styles.freePlanText}>Free Plan</Text>
                </View>
                <View style={[styles.profileCard]}>
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => this.onPlanSelection('free')}>
                    <ImageBackground
                      source={Images.Subscription.FreePlanBg}
                      imageStyle={styles.imageStyle1}
                      style={styles.rowCont}>
                      <View style={styles.ViewStyle1}>
                        <Text style={[styles.planText]}>{'FREE PLAN'}</Text>
                        <Text
                          style={
                            (styles.bulletCont,
                            {
                              color: Colors.ButtonColor,
                              marginBottom: 5,
                              marginTop: 5,
                            })
                          }>
                          <Text style={styles.textStyle3}>{'\u2B24'}</Text>{' '}
                          Online Booking
                        </Text>
                        <Text style={styles.bulletCont}>
                          <Text style={styles.textStyle2}>{'\u2B24'}</Text>{' '}
                          Gallery Management
                        </Text>

                        <Text style={styles.subText}>
                          {'You are Currently Subscribed\nto our Free Plan'}
                        </Text>
                      </View>
                      <View style={styles.columnCont}>
                        <Image
                          source={Images.Subscription.FreeBadge}
                          style={styles.FreeBadgeImg}
                        />
                      </View>
                    </ImageBackground>
                  </TouchableOpacity>
                </View>

                <View style={styles.imageStyle2}>
                  <Image
                    source={
                      this.state.selectedPlan === 'paid'
                        ? Images.Subscription.RedCheck
                        : Images.Subscription.CircleCheck
                    }
                    style={styles.heightWidth}
                  />
                  <Text style={styles.premiumText}>Premium Plan</Text>
                </View>

                <View style={styles.profileCard}>
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => this.onPlanSelection('paid')}>
                    <ImageBackground
                      source={Images.Subscription.PaidPlanBg}
                      imageStyle={styles.imageStyle1}
                      style={styles.rowCont}>
                      <View style={styles.ViewStyle}>
                        <Text style={styles.planText}>{'PREMIUM PLAN'}</Text>
                        <Text
                          style={
                            (styles.bulletCont,
                            {color: Colors.ButtonColor, marginTop: 10})
                          }>
                          <Text style={styles.textStyle2}>{'\u2B24'}</Text>{' '}
                          {'A dedicate customer\n   Agent'}
                        </Text>
                        <Text style={[styles.bulletCont]}>
                          <Text style={styles.managementText}>{'\u2B24'}</Text>{' '}
                          Gallery Management
                        </Text>

                        <Text style={styles.subText}>
                          {
                            'With this plan,Exicutives from\nHairBiddy team would contact for\nthe Service out of the app.'
                          }
                        </Text>
                      </View>
                      <View style={[styles.columnCont]}>
                        {/* <View style={{ flex: 1, padding: 15 }}>
                          <Image
                            source={
                              this.state.selectedPlan === 'paid'
                                ? Images.Subscription.RedCheck
                                : Images.Subscription.GrayCheck
                            }
                            style={{ height: 40, width: 40 }}
                          />
                        </View> */}
                        <Image
                          source={Images.Subscription.PremiumBadge}
                          style={styles.SubscriptionStyle}
                        />
                      </View>
                    </ImageBackground>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          )}
        </SafeAreaInsetsContext.Consumer>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  headCont: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 35,
    paddingTop: 25,
  },
  welcomeText: {
    fontSize: 16,
  },
  ViewStyle1: {
    flex: 2,
    padding: 20,
    marginTop: 5,
  },
  ShopNameText: {
    marginLeft: -17,
    marginTop: 0,
  },
  imageCont: {
    flexDirection: 'row',
    marginBottom: 10,
    marginStart: 15,
    alignItems: 'center',
    width: 343,
  },
  BackArrowStyle: {
    height: 20.5,
    width: 12,
    marginTop: 6,
  },
  hairbiddyText: {
    marginTop: 5,
    fontSize: 16,
    lineHeight: 25,
    fontFamily: Fonts.HeveticaNowText_Regular,
    color: Colors.Black,
    textAlign: 'center',
    marginBottom: 0,
  },
  FreeBadgeImg: {
    height: 87.97,
    width: 87.99,
    margin: 10,
    marginTop: 25,
    marginRight: 20,
    borderBottomRightRadius: 15,
  },
  freePlanText: {
    color: Colors.Black,
    fontSize: 14,
    marginStart: 15,
  },
  imageStyle2: {
    flexDirection: 'row',
    marginBottom: 10,
    marginStart: 17,
    alignItems: 'center',
  },
  SafeAreaViewStyle: {
    flex: 1,
  },
  textStyle2: {
    fontSize: 10,
  },
  textStyle3: {
    fontSize: 10,
    color: Colors.ButtonColor,
  },
  ViewStyle: {
    flex: 2,
    padding: 22,
    marginTop: 10,
  },
  imageStyle1: {
    borderRadius: 30,
  },
  SubscriptionStyle: {
    height: 96.24,
    width: 82.25,
    marginTop: 20,
    marginRight: 20,
    borderBottomRightRadius: 15,
  },
  heightWidth: {
    height: 24,
    width: 24,
  },
  premiumText: {
    color: Colors.Black,
    fontSize: 14,
    marginStart: 15,
  },
  managementText: {
    fontSize: 10,
  },
  Style1: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
  },
  welcomeName: {
    fontSize: 20,
    color: Colors.Black,
    fontFamily: Fonts.HeveticaNowText_Medium,
  },
  profileCard: {
    width: 343,
    alignSelf: 'center',
    borderRadius: 15,
    marginBottom: 20,
    height: 200,
    marginTop: 8,
  },
  rowCont: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    height: '100%',
  },
  columnCont: {
    flexDirection: 'column',
    height: '100%',
  },
  planText: {
    fontSize: 18,
    marginTop: -15,
    marginBottom: -5,
    color: Colors.Black,
    fontFamily: Fonts.Lato_Heavy,
  },
  subText: {
    fontSize: 14,
    lineHeight: 18,
    fontFamily: Fonts.HeveticaNowText_Medium,
    color: Colors.White,
    marginBottom: -5,
  },
  bulletCont: {
    padding: 15,
    paddingLeft: 0,
    fontSize: 14,
    color: Colors.ButtonColor,
    marginTop: 10,
  },
});
const mapStateToProps = (state) => {
  return {
    userInfo: state.SignupReducer.userInfo,
    addSubscriptionReq: state.ProfileReducer.addSubscription,
    addSubscriptionSuccess: state.ProfileReducer.addSubscriptionSuccess,
    addSubscriptionFailure: state.ProfileReducer.addSubscriptionFailure,
    addSubscriptionFailureMessage:
      state.ProfileReducer.addSubscriptionFailureMessage,
  };
};

const mapDispatchToProps = (dispatch) => ({
  addSubscription: (data) => dispatch(addSubscription(data)),
  fetchStylistDetails: (data) => dispatch(fetchStylistDetails(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Subscription);
