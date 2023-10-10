import {StyleSheet, Dimensions, Platform} from 'react-native';
import Fonts from './Fonts';
import Colors from './Colors';
const {height, width} = Dimensions.get('window');

export default StyleSheet.create({
  subContainer: {
    width: '100%',
    justifyContent: 'center',
    bottom: 34,
  },
  logoText: {
    fontSize: 18,
    fontFamily: Fonts.HeveticaNowText_Bold,
    lineHeight: 40,
    marginTop: 10,
  },
  startedText: {
    textAlign: 'center',
    fontSize: 24,
    fontFamily: Fonts.HeveticaNowText_Regular,
  },
  startedTextNew: {
    textAlign: 'center',
    fontSize: 18,
    fontFamily: Fonts.HeveticaNowText_Medium,
  },
  startedTextNew2: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 16,
    fontFamily: Fonts.HeveticaNowText_Regular,
  },

  labelStyle: {
    fontSize: 14,
    marginStart: 14,
    marginTop: 17,
    fontFamily: Fonts.HeveticaNowText_Medium,
    marginBottom: Platform.OS === 'android' ? 10 : 0,
  },

  signupButton: {
    width: '100%',
    marginHorizontal: 30,
    height: 48,
    backgroundColor: Colors.ButtonColor,
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  signupButtonText: {
    textAlign: 'center',
    textAlignVertical: 'center',
    padding: 18,
    fontSize: 16,
    color: Colors.White,
    fontFamily: Fonts.HeveticaNowText_Black,
  },
  nextButtonText: {
    textAlign: 'center',
    textAlignVertical: 'center',
    padding: 18,
    fontSize: 16,
    color: Colors.White,
    // paddingBottom: 25,
    // alignItems: 'center',
    fontFamily: Fonts.HeveticaNowText_Black,
  },
  backArrow: {
    height: 20.5,
    width: 12,
    justifyContent: 'center',
  },
  backArrowCont: {
    marginTop: 10,
    height: 40,
    flexDirection: 'row',
    marginLeft: 20,
  },
  stepArrow: {
    height: 40,
    width: 40,
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signupText: {
    fontSize: 18,
    fontFamily: Fonts.HeveticaNowText_Regular,
    lineHeight: 20,
    color: Colors.LightBlack,
    marginTop: 10,
    margin: 25,
    textAlign: 'center',
  },
  buttonCont: {
    alignItems: 'center',
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 10,
  },
  buttonStyle: {
    width: 130,
    height: 40,
    borderWidth: 1,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  buttonText: {
    alignSelf: 'center',
    marginRight: 40,
    padding: 0,
  },
  headStyle: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 10,
    height: 50,
    width: '85%',
    alignSelf: 'center',
  },
  boldText: {
    fontSize: 35,
    lineHeight: 50,
    fontFamily: Fonts.HeveticaNowText_Black,
    color: Colors.White,
  },
  subText: {
    fontSize: 14,
    lineHeight: 25,
    fontFamily: Fonts.HeveticaNowText_Medium,
    color: Colors.White,
  },
  socialCont: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: Platform.OS === 'android' ? '80%' : '90%',
    padding: 20,
    paddingTop: 10,
    alignSelf: 'center',
    alignItems: 'center',
  },
  socialIcon: {
    height: 40,
    width: 40,
  },

  signupBorder: {
    borderBottomWidth: 1,
    width: 75,
    alignItems: 'center',
    marginBottom: 8,
    borderBottomColor: Colors.LightBlack,
  },
  lBorder: {
    borderBottomWidth: 1,
    width: 137,
    alignItems: 'center',
    marginBottom: 8,
    borderBottomColor: Colors.LightBlack,
  },
  signupBorderCont: {
    alignSelf: 'center',
    display: 'flex',
    width: '100%',
    padding: 2,
    paddingTop: 10,
    paddingBottom: 15,
    flexDirection: 'row',
  },
  bottomCont: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  dayText: {
    fontSize: 16,
    marginTop: 5,
    fontFamily: Fonts.HeveticaNowText_Medium,
    color: '#283A58',
  },
  dayTextOne: {
    fontSize: 16,
    marginTop: 5,
    fontFamily: Fonts.HeveticaNowText_Medium,
    color: '#283A58',
    marginLeft: 5,
  },
  viewAllCont: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  viewAllBtn: {
    color: Colors.ButtonColor,
    fontFamily: Fonts.HeveticaNowText_Medium,
    fontSize: 14,
    textAlign: 'center',
    borderBottomColor: Colors.ButtonColor,
  },
  viewAllFont: {
    fontFamily: Fonts.HeveticaNowText_Regular,
    fontSize: 13,
    textAlign: 'center',
    marginTop: 6,
  },
  userCont: {
    color: Colors.Black,
    fontFamily: Fonts.HeveticaNowText_Medium,
    fontSize: 14,
    textAlign: 'center',
    marginTop: 6,
  },
  inputCont: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    margin: 10,
    marginBottom: 20,
  },
  inputStyle: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    padding: 20,
    paddingBottom: 0,
    paddingLeft: 0,
  },
  iconStyle: {
    height: 20,
    width: 20,
  },
  borderLine: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.BorderGray,
    marginTop: 20,
    width: '100%',
  },

  backgroundStyle: {
    height: Platform.OS === 'android' ? height / 4 + 20 : height / 4 + 20,
    width,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    backgroundColor: '#F9F9F9',
  },
  profileCard: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
  },
  profileCard2: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    // backgroundColor: '#FFFFFF',
    // shadowColor: '#000',
    // shadowOpacity: 0.5,
    // shadowRadius: 2,
    // elevation: 2,
    // borderRadius: 1,
    // margin: 2,
  },
  notifyCont: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
  },
  welcomeName: {
    fontSize: 22,
    color: Colors.Black,
    fontFamily: Fonts.HeveticaNowText_Medium,
    marginTop: 0,
  },

  ShopName: {
    fontSize: 24,
    color: Colors.Black,
    fontFamily: Fonts.HeveticaNowText_ExtraBold,
    marginTop: 0,
  },

  NewsName: {
    fontSize: 24,
    color: Colors.Black,
    fontFamily: Fonts.HeveticaNowText_Bold,
    marginTop: 0,
  },

  welcomeName1: {
    fontSize: 18,
    color: Colors.Black,
    fontFamily: Fonts.HeveticaNowText_Regular,
    marginTop: -12,
  },

  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 0,
    alignSelf: 'center',
    width: '80%',
  },
  checkbox: {
    alignSelf: 'center',
  },
  label: {
    fontSize: 14,
    textAlign: 'center',
    fontFamily: Fonts.HeveticaNowText_Regular,
    margin: 9,
    marginRight: 0,
  },
  termcondStyle: {
    display: 'flex',
    justifyContent: 'flex-start',
    width: '80%',
  },
  portfolioImg: {
    height: Platform.OS === 'android' ? 112 : width - 285,
    width: Platform.OS === 'android' ? 112 : width - 285,
    borderRadius: 5,
  },
  myportfolioImg: {
    height: Platform.OS === 'android' ? 112 : width - 285,
    width: Platform.OS === 'android' ? 112 : width - 285,
    borderRadius: 5,
  },
  inputBorderStyle: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    height: 50,
    backgroundColor: Colors.InputBgColor,
  },
  staticText: {
    marginTop: 20,
    padding: 15,
    fontSize: 14,
    lineHeight: 25,
    fontFamily: Fonts.HeveticaNowText_Medium,
    color: Colors.LightBlack,
  },
  overlayCont: {
    backgroundColor: 'white',
    borderRadius: 15,
    top: '30%',
    alignSelf: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxHeight: 150,
    width: width / 2 + 100,
  },
  linkText: {
    marginTop: 5,
    marginBottom: 8,
    fontSize: 14,
    textAlign: 'center',
    fontFamily: Fonts.HeveticaNowText_Regular,
    color: Colors.Blue,
    textDecorationLine: 'underline',
  },
  container: {
    padding: 20,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  commonProfileCard: {
    height: 50,
    width: '100%',
    backgroundColor: Colors.BgColor,
    alignSelf: 'center',
  },
  editIcon: {
    marginTop: -50,
    marginRight: -10,
  },
  commonUserCont: {
    color: Colors.ButtonColor,
    fontFamily: Fonts.Lato_Semibold,
    fontSize: 16,
    textAlign: 'center',
  },
  commonNotifyCont: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 20,
  },
  userName: {
    fontSize: 18,
    fontFamily: Fonts.HeveticaNowText_Medium,
  },
  userName1: {
    fontSize: 18,
    fontFamily: Fonts.HeveticaNowText_Medium,
    color: '#283A58',
  },
  serviceLabelStyle: {
    fontSize: 15,
    color: '#283A58',
    fontFamily: Fonts.Lato_Bold,
  },
  serviceViewAllCont: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  errorMsg: {
    color: Colors.Red,
    fontSize: 15,
    fontFamily: Fonts.Lato_Bold,
    marginTop: 20,
  },
  loadingStyle: {
    width: 280,
    height: 55,
    backgroundColor: Colors.ButtonColor,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 30,
    borderRadius: 10,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  mapContainer: {
    height: 450,
    width: '90%',
    margin: 20,
    alignSelf: 'center',
  },
});
