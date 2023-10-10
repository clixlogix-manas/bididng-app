/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  ImageBackground,
  TouchableOpacity,
  Image,
  Text,
  // Dimensions,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {SafeAreaInsetsContext} from 'react-native-safe-area-context';
import {connect} from 'react-redux';
import RadioButton from '../../components/RadioButton';
import Fonts from '../../constants/Fonts';
import Images from '../../constants/Images';
import Colors from '../../constants/Colors';
import CommonStyle from '../../constants/Style';
import {changeTemplate} from '../../redux/actions/profileAction';
import SafeAreaView from 'react-native-safe-area-view';
import Button from '../../components/Button';
import {Platform} from 'react-native';

// const {height} = Dimensions.get('window');

class ChangeTemplate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      radioRes: '1',
    };
  }
  async componentDidMount() {
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({
      radioRes:
        this.props.userInfo && this.props.userInfo.provider.template_type
          ? this.props.userInfo.provider.template_type.toString()
          : '1',
    });
  }
  onChange = (name, value) => {
    this.setState({radioRes: value});
    this.props.changeTemplate(value);
  };

  onSave = () => {
    this.props.changeTemplate(this.state.radioRes);
  };

  render() {
    const {navigation} = this.props;
    console.log(this.props.template);
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.ScrollViewStyle}>
          <SafeAreaInsetsContext.Consumer>
            {(insets) => (
              <View
                style={[
                  styles.SubContainer,
                  {
                    marginTop: Platform.OS === 'ios' ? 0 : 10,
                  },
                ]}>
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  activeOpacity={1}>
                  <Image
                    source={Images.SignUpIcon.BackArrow}
                    style={styles.BackArrowStyles}
                  />
                </TouchableOpacity>
                <View style={styles.HeadingView}>
                  <Text style={[CommonStyle.ShopName]}>Stylist Template </Text>
                  <Text style={styles.SubHeading_text}>
                    Choose your favorite Template{' '}
                  </Text>
                </View>
              </View>
            )}
          </SafeAreaInsetsContext.Consumer>
          <View style={styles.ViewStyle1}>
            <View style={styles.ViewStyle2}>
              <RadioButton
                value={this.state.radioRes}
                account={true}
                direction={'column'}
                onpress={(value) => this.onChange('radioRes', '1')}
                value1={'1'}
                label1={'Template 1'}
                // value2={'2'}
                // label2={'Template 2'}
              />
              <Text style={styles.TemplateOne_text}>Template one</Text>
            </View>

            <View
              style={[
                styles.ViewStyle3,
                {
                  paddingHorizontal: Platform.OS === 'android' ? 10 : 0,
                },
              ]}>
              <TouchableOpacity
                activeOpacity={1}
                //onPress={() => navigation.navigate('Post', { id: postId, token: data.token, userId: userId, adminId: data.userId, type: 'normal', isVote: 'false', isLike: islike, voteCount: 0 })}
              >
                <ImageBackground
                  imageStyle={styles.ImageBackgroundStyle}
                  style={styles.background_style}
                  resizeMode={'cover'}
                  source={Images.StylistTemplate.TemplateOne}
                />
              </TouchableOpacity>
              <View style={styles.flexstyle}>
                <View style={styles.TemplateTwo_img}>
                  <Image
                    source={Images.StylistTemplate.TemplateTwo}
                    style={styles.TemplateTwo_Imgstyle}
                  />
                  <View style={styles.textCont_View}>
                    <Text style={styles.textCont}>Patric Richards</Text>
                    <View style={styles.Image_View}>
                      <Image
                        source={Images.StylistTemplate.Rating}
                        style={styles.Rating_img}
                      />
                      <Text style={styles.TextCont2}>5.0</Text>
                    </View>
                    <Text style={styles.TextCont3}>Stylest</Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity
                onPress={() =>
                  // route.params.userType === 'Barber' &&
                  navigation.navigate('PreviewTwo')
                }
                style={styles.PreviewTwoStyle}>
                <Text style={{color: Colors.White}}>
                  View the full Template
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.RadioButtonView}>
              <RadioButton
                value={this.state.radioRes}
                account={true}
                direction={'column'}
                onpress={(value) => this.onChange('radioRes', '2')}
                value1={'2'}
                // label1={'Template 1'}
                // value2={'2'}
                label2={'Template 2'}
              />
              <Text style={styles.TemplateTwo_text}>Template two</Text>
            </View>

            <View
              style={[
                styles.ViewStyle4,
                {
                  paddingHorizontal: Platform.OS === 'android' ? 10 : 0,
                },
              ]}>
              <TouchableOpacity
                activeOpacity={1}
                //onPress={() => navigation.navigate('Post', { id: postId, token: data.token, userId: userId, adminId: data.userId, type: 'normal', isVote: 'false', isLike: islike, voteCount: 0 })}
              >
                <ImageBackground
                  imageStyle={styles.imageStyleNew}
                  style={styles.ImageBackgroundsty1}
                  resizeMode={'cover'}
                  source={Images.StylistTemplate.TemplateTwo}
                />
              </TouchableOpacity>
              <View style={{flex: 1}}>
                <View style={styles.ImageCont}>
                  <View style={styles.ImageSub_cont}>
                    <Image
                      source={Images.StylistIcon.Message}
                      style={styles.MessageImg}
                    />
                    <Image
                      source={Images.StylistIcon.Like}
                      style={styles.LikeImgStyle}
                    />
                  </View>
                  <Image
                    source={Images.StylistTemplate.TemplateTwo}
                    style={styles.TemplateTwo_ImageStyle}
                  />
                  <View style={styles.textCont_View}>
                    <Text style={styles.textCont2}>Patric Richards</Text>
                    <View style={styles.RatingView_cont}>
                      <Image
                        source={Images.StylistTemplate.Rating}
                        style={styles.Rating_ImageStyle}
                      />
                      <Text style={styles.TextStyle}>5.0</Text>
                    </View>
                    <Text style={styles.stylest_text}>Stylest</Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity
                onPress={() =>
                  // route.params.userType === 'Barber' &&
                  navigation.navigate('PreviewOne')
                }
                style={styles.PreviewOneStyle}>
                <Text style={{color: Colors.White}}>
                  View the full Template
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.ButtonView}>
              <Button
                title={'Save'}
                navigation={navigation}
                onSubmit={() => this.onSave()}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BgColor,
  },
  SubContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
  },
  ButtonView: {
    width: 311,
    alignSelf: 'center',
  },
  LikeImgStyle: {
    height: 24,
    width: 24,
    marginLeft: 7,
  },
  Rating_ImageStyle: {
    height: 15,
    width: 80,
  },
  Image_View: {
    flexDirection: 'row',
    marginTop: 5,
  },
  ImageSub_cont: {
    flexDirection: 'row',
    left: 110,
    top: 10,
  },
  TextStyle: {
    marginStart: 10,
    color: Colors.ButtonColor,
  },
  RatingView_cont: {
    flexDirection: 'row',
    marginTop: 5,
  },
  MessageImg: {
    height: 24,
    width: 24,
    marginLeft: 0,
  },
  textCont2: {
    color: Colors.Black,
    fontSize: 15,
    fontWeight: 'bold',
  },
  TemplateTwo_ImageStyle: {
    height: 70,
    width: 70,
    borderRadius: 35,
    marginTop: -20,
  },
  RadioButtonView: {
    marginBottom: 20,
    marginTop: 20,
    flexDirection: 'row',
    width: 370,
    marginLeft: 8,
  },
  ImageCont: {
    height: 140,
    width: 300,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 1,
    elevation: 2,
    position: 'absolute',
    bottom: 0,
    backgroundColor: Colors.White,
    alignItems: 'center',
  },
  ImageBackgroundsty1: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    height: 190,
    width: '100%',
    marginBottom: 50,
  },
  imageStyleNew: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  ViewStyle4: {
    height: 340,
    width: 343,
    borderRadius: 15,
    alignSelf: 'center',
    backgroundColor: Colors.White,
    marginBottom: 20,
  },
  PreviewTwoStyle: {
    height: 47,
    width: 325,
    marginLeft: 0,
    marginRight: 0,
    backgroundColor: Colors.ButtonColor,
    bottom: 0,
    borderBottomEndRadius: 15,
    borderBottomStartRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  TemplateTwo_text: {
    color: Colors.Black,
    marginStart: 20,
    fontSize: 16,
    fontFamily: Fonts.HeveticaNowText_Medium,
  },
  ImageBackgroundStyle: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  TemplateTwo_Imgstyle: {
    height: 70,
    width: 70,
    borderRadius: 35,
    marginStart: 15,
  },
  TextCont2: {
    marginStart: 10,
    color: Colors.ButtonColor,
  },
  flexstyle: {
    flex: 1,
  },
  Rating_img: {
    height: 15,
    width: 80,
  },
  textCont: {
    color: Colors.Black,
    fontSize: 15,
    fontWeight: 'bold',
  },
  TemplateTwo_img: {
    height: 80,
    width: 300,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 1,
    elevation: 2,
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    backgroundColor: Colors.White,
    alignItems: 'center',
  },
  textCont_View: {
    marginStart: 10,
  },
  background_style: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    height: 192,
    width: 325,
  },
  TextCont3: {
    color: Colors.textDarkGray,
    fontSize: 15,
  },
  SubHeading_text: {
    fontSize: 18,
    marginTop: 10,
    fontFamily: Fonts.HeveticaNowText_Regular,
  },
  TemplateOne_text: {
    color: Colors.Black,
    marginStart: 20,
    fontSize: 16,
    fontFamily: Fonts.HeveticaNowText_Medium,
  },
  ViewStyle2: {
    marginBottom: 20,
    marginTop: 20,
    flexDirection: 'row',
    width: 370,
    marginLeft: 8,
  },
  ViewStyle3: {
    height: 300,
    width: 343,
    borderRadius: 15,
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: Colors.White,
    marginBottom: 20,
  },
  ViewStyle1: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    backgroundColor: Colors.BgColor,
    alignItems: 'flex-start',
    display: 'flex',
  },
  HeadingView: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    marginTop: 0,
  },
  stylest_text: {
    color: Colors.textDarkGray,
    fontSize: 15,
    textAlign: 'center',
  },
  ScrollViewStyle: {
    height: '100%',
  },
  BackArrowStyles: {
    height: 20.5,
    width: 12,
    marginTop: 6,
  },
  PreviewOneStyle: {
    height: 47,
    width: 325,
    backgroundColor: Colors.ButtonColor,
    bottom: 0,
    borderBottomEndRadius: 15,
    borderBottomStartRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const mapStateToProps = (state) => {
  return {
    template: state.ProfileReducer.template,
    userInfo: state.SignupReducer.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => ({
  changeTemplate: (data) => dispatch(changeTemplate(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ChangeTemplate);
