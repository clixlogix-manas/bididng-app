import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Fonts, Colors} from '../../constants';
import Images from '../../constants/Images';
import {connect} from 'react-redux';
import {fetchStylistDetails} from '../../redux/actions/authAction';
import {
  getAboutUs,
  getPrivacyPolicy,
  getTermAndCond,
} from '../../redux/actions/StaticAction';

class ChooseUser extends Component {
  componentDidMount() {
    this.props.getAboutUs();
    this.props.getTermAndCond();
    this.props.getPrivacyPolicy();
  }
  render() {
    const {navigation} = this.props;
    return (
      <ImageBackground
        source={Images.UserScreenIcon.BgImg}
        style={styles.flexSty}
        resizeMode={'cover'}>
        <View style={styles.subContainer}>
          <View style={styles.textCont}>
            <Image
              source={Images.UserScreenIcon.Applogo}
              style={styles.ApplogoStyle}
            />
          </View>
          <View style={styles.flexSty} />
          <View style={styles.userBoxCont}>
            <View style={styles.userBoxSubCont}>
              <TouchableOpacity
                onPress={() =>
                  //  navigation.navigate('Signup', { userType: 'Barber' })
                  navigation.navigate('JoinAsBarber')
                }
                activeOpacity={1}>
                <View style={styles.barberBox}>
                  <Image
                    source={Images.UserScreenIcon.BarberIcon}
                    style={styles.BarberIconSty}
                  />
                  <Text style={styles.userBoxText1}>
                    {'Stylist or Barber Panel'}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={styles.userBoxSubCont}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('SignIn', {userType: 'Customer'})
                }
                activeOpacity={1}>
                <View style={styles.customerBox}>
                  <Image
                    source={Images.UserScreenIcon.CustomerIcon}
                    style={styles.CustomerIconSty}
                  />
                  <Text style={styles.userBoxText3}>{'Customer Panel'}</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.signupBorderCont}>
            <View style={styles.OrBorder} />
            <Text style={styles.Or_text}>or</Text>
            <View style={styles.OrBorder} />
          </View>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate('GuestHome', {userType: 'Customer'})
            }
            style={styles.textCont2}
            activeOpacity={1}>
            <Text style={[styles.linkStyle]}>
              {'Sign in as a  '}
              <Text style={styles.Guest_text}>{'Guest User'}</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  OrBorder: {
    borderBottomWidth: 1,
    width: 123,
    alignItems: 'center',
    marginBottom: 8,
    borderBottomColor: Colors.White,
    paddingTop: 10,
  },
  BarberIconSty: {
    height: 20,
    width: 20,
    margin: 8,
  },
  flexSty: {
    flex: 1,
  },
  ApplogoStyle: {
    height: 116,
    width: 184,
  },
  textCont2: {
    alignSelf: 'center',
    marginTop: 30,
    marginBottom: -10,
  },
  CustomerIconSty: {
    height: 20,
    width: 20,
    margin: 8,
  },
  Or_text: {
    fontSize: 14,
    width: 50,
    textAlign: 'center',
    fontFamily: Fonts.HeveticaNowText_Medium,
    color: 'white',
  },
  Guest_text: {
    color: Colors.White,
    textDecorationLine: 'underline',
    fontWeight: 'bold',
    fontSize: 14,
  },
  signupBorderCont: {
    alignSelf: 'center',
    display: 'flex',
    width: '100%',
    padding: 2,
    paddingTop: 10,
    paddingBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: -15,
    marginTop: 23,
  },
  subContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  userBoxCont: {
    justifyContent: 'center',
  },
  userBoxSubCont: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  barberBox: {
    flexDirection: 'row',
    height: 48,
    width: 325,
    marginBottom: 25,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  customerBox: {
    flexDirection: 'row',
    height: 48,
    width: 325,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  userBoxText1: {
    fontSize: 16,
    color: '#191514',
    textAlign: 'center',
    fontFamily: Fonts.Lato_Bold,
  },
  userBoxText3: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    fontFamily: Fonts.Lato_Bold,
  },
  userBoxText2: {
    fontSize: 14,
    fontFamily: Fonts.Lato_Medium,
    color: Colors.LightBlack,
    marginTop: 10,
  },
  textCont: {
    marginTop: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  linkStyle: {
    fontSize: 14,
    fontFamily: Fonts.Lato_Bold,
    color: Colors.White,
    borderBottomColor: Colors.White,
    borderBottomWidth: 2,
    marginBottom: 60,
  },
  ORstyle: {
    fontSize: 14,
    height: -50,
    color: '#FFFFFF',
    textAlign: 'center',
    alignItems: 'baseline',
    marginTop: 20,
  },
});
const mapStateToProps = (state) => {
  return {
    userInfo: state.SignupReducer.userInfo,
    fetchStylist: state.SignupReducer.fetchDetails,
    fetchStylistSuccess: state.SignupReducer.fetchDetailsSuccess,
    AboutUs: state.StaticReducer.AboutUs,
    PrivacyPolicy: state.StaticReducer.PrivacyPolicy,
    TermAndCond: state.StaticReducer.TermAndCond,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchStylistDetails: (data) => dispatch(fetchStylistDetails(data)),
  getAboutUs: (data) => dispatch(getAboutUs(data)),
  getPrivacyPolicy: (data) => dispatch(getPrivacyPolicy(data)),
  getTermAndCond: (data) => dispatch(getTermAndCond(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ChooseUser);
