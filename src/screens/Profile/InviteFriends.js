import React, {Component} from 'react';
import {
  View,
  Text,
  // Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {connect} from 'react-redux';
import {Images, Colors, Fonts} from '../../constants';
import CommonStyle from '../../constants/Style';
import {SafeAreaInsetsContext} from 'react-native-safe-area-context';
import SafeAreaView from 'react-native-safe-area-view';
import Input from '../../components/Input';
import Button from '../../components/Button';
import {Platform} from 'react-native';
import {BARBER_USER_CODE, CUSTOMER_USER_CODE} from '../../constants/Config';

// const {height} = Dimensions.get('window');

class InviteFriends extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userType: 0,
    };
  }

  componentDidMount() {
    let userInfo = this.props.userInfo;
    console.log('uInfo===>', userInfo);
    let userType = null;
    if (userInfo && userInfo.provider !== undefined) {
      userType = userInfo.provider.user_type;
    } else if (userInfo && userInfo.user_data !== undefined) {
      userType = userInfo.user_data.user_type;
    }

    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({
      userType: userType,
    });
  }

  handleOnChange = async (name, value) => {
    this.setState({
      [name]: value,
    });
  };

  render() {
    const {navigation} = this.props;

    return (
      <SafeAreaView style={styles.container}>
        <SafeAreaInsetsContext.Consumer>
          {(insets) => (
            <View
              style={[
                CommonStyle.notifyCont,
                // eslint-disable-next-line react-native/no-inline-styles
                {marginTop: Platform.OS === 'ios' ? 0 : 10},
              ]}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                activeOpacity={1}>
                <Image
                  source={Images.SignUpIcon.BackArrow}
                  style={styles.BackArrowStyle}
                />
              </TouchableOpacity>
            </View>
          )}
        </SafeAreaInsetsContext.Consumer>
        <View style={styles.headingCont}>
          <Text style={styles.headingText}>Invite Friends </Text>
          <Text style={styles.Sub_headingText}>
            {
              'Your friend invite you to use Hairbiddy for great \nhair service.'
            }
          </Text>
        </View>

        {/* </ImageBackground> */}

        <ScrollView
          contentContainerStyle={styles.contentContainerSty}
          style={styles.LogoThreeStyle}>
          <Image
            source={Images.StaticPage.LogoThree}
            style={styles.LogoThreeImage}
          />

          {this.state.userType === BARBER_USER_CODE ? (
            <View>
              <View style={styles.ViewStyle}>
                <View style={styles.ViewStyle1}>
                  <Text style={styles.TextStyle}>8436HBY</Text>
                </View>
                <View style={styles.ImageCopy}>
                  <Image
                    source={Images.StaticPage.Copy}
                    style={styles.CopyStyle}
                  />
                </View>
              </View>
              <View>
                <Text style={styles.TextStyle1}>{'YOUR INVITE CODE'}</Text>
              </View>
            </View>
          ) : (
            <View style={styles.ViewCont}>
              <View>
                <Text style={styles.TextStyle2}>{'YOUR INVITE CODE'}</Text>
              </View>

              <View style={styles.ViewStyle2}>
                <Text style={styles.TextStyle3}>
                  https://66.175.217.67:8012
                </Text>
                <View style={styles.flex1Style} />
                <View style={styles.ImageView}>
                  <Image
                    source={Images.StaticPage.Copy}
                    style={styles.CopyImageStyle}
                  />
                </View>
              </View>
            </View>
          )}

          <View style={styles.InputView}>
            <Input
              label={'Email Address'}
              name="email"
              maxLength={50}
              padding={0}
              value={this.state.email}
              onChange={this.handleOnChange}
              // secondIcon={Images.Subscription.RedCheck}
              type="text"
            />

            <Button
              title={'Send Invite'}
              //  userType={userType}
              marginTop={40}
              // onSubmit={this.onSubmit}
              navigation={navigation}
            />

            {this.state.userType === CUSTOMER_USER_CODE ? (
              <View style={styles.OrContainer}>
                <View style={styles.OrSub_Cont} />
                <Text style={styles.OrText}>Or</Text>
                <View style={styles.ViewStyle3} />
              </View>
            ) : null}

            {this.state.userType === CUSTOMER_USER_CODE ? (
              <Button
                title={'Send Invite through Social'}
                //  userType={userType}
                marginTop={30}
                // onSubmit={this.onSubmit}
                navigation={navigation}
              />
            ) : null}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.BgColor,
    flex: 1,
  },
  headingText: {
    marginTop: -22,
    fontFamily: Fonts.HeveticaNowText_Regular,
    fontSize: 18,
    fontWeight: 'bold',
  },
  ViewCont: {
    marginTop: 40,
    width: '100%',
  },
  OrSub_Cont: {
    width: 100,
    height: 2,
    backgroundColor: Colors.BorderGray,
  },
  ViewStyle3: {
    width: 100,
    height: 2,
    backgroundColor: Colors.BorderGray,
  },
  ViewStyle2: {
    height: 40,
    backgroundColor: '#D1BFB8',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    width: '100%',
  },
  OrText: {
    marginHorizontal: 25,
  },
  OrContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: -10,
  },
  InputView: {
    width: '100%',
    marginHorizontal: 10,
    marginTop: 40,
  },
  ImageView: {
    height: 40,
    width: 40,
    backgroundColor: Colors.Black,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  CopyImageStyle: {
    height: 20,
    width: 20,
  },
  TextStyle3: {
    color: Colors.ButtonColor,
    fontSize: 15,
    fontWeight: 'bold',
    margin: 10,
  },
  flex1Style: {
    flex: 1,
  },
  TextStyle2: {
    textAlign: 'center',
    color: Colors.Black,
    marginTop: 15,
    marginBottom: 15,
    fontSize: 15,
    fontFamily: Fonts.HeveticaNowText_Regular,
  },
  TextStyle: {
    color: Colors.ButtonColor,
    fontSize: 15,
    fontWeight: 'bold',
  },
  ViewStyle1: {
    height: 40,
    backgroundColor: '#D1BFB8',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    paddingHorizontal: 20,
  },
  CopyStyle: {
    height: 20,
    width: 20,
  },
  TextStyle1: {
    textAlign: 'center',
    color: Colors.Black,
    marginTop: 15,
    marginBottom: 15,
    fontSize: 15,
    fontFamily: Fonts.HeveticaNowText_Regular,
  },
  ImageCopy: {
    height: 40,
    width: 40,
    backgroundColor: Colors.ButtonColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    paddingHorizontal: 10,
    marginStart: 10,
  },
  contentContainerSty: {
    alignItems: 'center',
  },
  LogoThreeImage: {
    height: 96.7,
    width: 150.81,
  },
  Sub_headingText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 15,
    fontFamily: Fonts.HeveticaNowText_Regular,
  },
  BackArrowStyle: {
    height: 20.5,
    width: 12,
    marginTop: 13,
  },
  LogoThreeStyle: {
    padding: 15,
    marginTop: 30,
    backgroundColor: Colors.BgColor,
    flex: 1,
  },
  ViewStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  headingCont: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const mapStateToProps = (state) => {
  return {
    PrivacyPolicies: state.StaticReducer.PrivacyPolicy,
    userInfo: state.SignupReducer.userInfo,
  };
};

export default connect(mapStateToProps, null)(InviteFriends);
