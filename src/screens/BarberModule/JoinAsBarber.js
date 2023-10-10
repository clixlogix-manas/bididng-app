import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {Fonts, Colors} from '../../constants';
import Images from '../../constants/Images';
import {connect} from 'react-redux';
import CommonStyle from '../../constants/Style';
import {fetchStylistDetails} from '../../redux/actions/authAction';
import {
  getAboutUs,
  getPrivacyPolicy,
  getTermAndCond,
} from '../../redux/actions/StaticAction';

class JoinAsBarber extends Component {
  componentDidMount() {
    this.props.getAboutUs();
    this.props.getTermAndCond();
    this.props.getPrivacyPolicy();
  }
  render() {
    const {navigation} = this.props;
    return (
      <ImageBackground
        source={Images.JoinAsBarberIcon.BgBarberImg}
        style={styles.cont}
        resizeMode={'cover'}>
        <View style={[CommonStyle.backArrowCont, styles.BackArrowSty]}>
          <TouchableOpacity
            style={styles.goBackCont}
            activeOpacity={1}
            onPress={() => navigation.goBack()}>
            <Image
              source={Images.SignUpIcon.BackArrow}
              style={[CommonStyle.backArrow, {tintColor: Colors.White}]}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.subContainer}>
          <View style={styles.textCont}>
            <Image
              source={Images.UserScreenIcon.BarbersIcon}
              style={styles.BarbersIconSty}
            />
          </View>
          <Text style={styles.titleTxt}>{'Join as a Stylist or Barber'}</Text>
          <Text style={styles.discTxt}>
            {'Create an account to connect \nyour customers'}
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Signup', {userType: 'Barber'})}
            style={styles.OpacitySty}>
            <Text style={styles.buttonText}>{'Create Account'}</Text>
          </TouchableOpacity>
          <View style={styles.textCont2}>
            <Text style={styles.Already_text}>
              {'Already have an account?  '}
              <TouchableOpacity
                style={styles.LoginCont}
                onPress={() =>
                  navigation.navigate('SignIn', {userType: 'Barber'})
                }>
                <Text style={styles.LoginText}>{'Log In'}</Text>
              </TouchableOpacity>
            </Text>
          </View>
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
  cont: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textCont2: {
    alignSelf: 'center',
    marginTop: 25,
  },
  BarbersIconSty: {
    height: 50,
    width: 50,
  },
  goBackCont: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: 10,
  },
  OpacitySty: {
    height: 48,
    width: 325,
    borderRadius: 5,
    backgroundColor: '#790A13',
    marginTop: 20,
  },
  BackArrowSty: {
    position: 'absolute',
    top: 0,
    marginTop: Platform.OS === 'android' ? 10 : 30,
    left: 0,
  },
  buttonText: {
    color: Colors.White,
    textAlign: 'center',
    fontFamily: Fonts.HeveticaNowText_Regular,
    fontSize: 17,
    marginTop: 10,
  },
  LoginCont: {
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Already_text: {
    color: Colors.White,
    fontFamily: Fonts.HeveticaNowText_Regular,
    fontSize: 16,
  },
  LoginText: {
    color: Colors.ButtonColor,
    textDecorationLine: 'underline',
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: Platform.OS === 'android' ? 5 : 2,
  },
  textCont: {
    height: 100,
    width: 100,
    borderRadius: 50,
    alignSelf: 'center',
    backgroundColor: '#790A13',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleTxt: {
    color: Colors.White,
    fontFamily: Fonts.HeveticaNowText_Regular,
    textAlign: 'center',
    fontSize: 24,
    marginTop: 10,
  },
  discTxt: {
    color: Colors.White,
    textAlign: 'center',
    fontFamily: Fonts.HeveticaNowText_Regular,
    fontSize: 16,
    marginTop: 10,
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
export default connect(mapStateToProps, mapDispatchToProps)(JoinAsBarber);
