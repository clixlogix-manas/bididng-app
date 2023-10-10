/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-did-update-set-state */
import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  Dimensions,
  Alert,
} from 'react-native';
import {Images, Fonts, Colors} from '../../constants';
import CommonStyle from '../../constants/Style';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import Button from '../../components/Button';
import CheckBoxCont from '../../components/CheckboxCont';
import ImageResizer from 'react-native-image-resizer';
import {connect} from 'react-redux';
import {
  addPortfolioImage,
  addPortfolioImageSuccess,
  getPortfolioImage,
} from '../../redux/actions/profileAction';
import {getTaggableUser} from '../../redux/actions/stylistAction';
import TagSearchComp from '../../components/TagSearchComp';
import {SafeAreaInsetsContext} from 'react-native-safe-area-context';
import {Platform} from 'react-native';
const {height} = Dimensions.get('window');
class ImageUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hideFromProf: false,
      setAsBackground: false,
      tag: '',
      taggedUserId: '',
      upload: true,
      progress: 0.4,
      completeStatus: false,
      isVisible: false,
      portfolioErrMsg: '',
      search: '',
      searchSpinner: false,
      userList: [],
    };
  }
  handleOnChange = (name, value) => {
    this.setState({
      [name]: value,
    });
  };

  goBack() {
    const {navigation} = this.props;
    navigation.goBack();
  }

  onSubmit = async () => {
    const {response} = this.props.route.params;
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

        if (this.props.route.params.userType === 3) {
          fmData.append('is_background', this.state.setAsBackground ? 1 : 0);
          fmData.append('profile_hide', this.state.hideFromProf ? 0 : 1);
          if (this.state.taggedUserId !== '') {
            fmData.append('tag_id', this.state.taggedUserId);
          }
        }
        this.props.addPortfolioImage(fmData);

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
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.props.addPortfolioSuccess !== prevProps.addPortfolioSuccess) {
      this.setState({portfolioErrMsg: ''}, () => {
        this.props.navigation.goBack();
      });
    } else if (
      this.props.addPortfolioFailureMessage !==
      prevProps.addPortfolioFailureMessage
    ) {
      console.log('Errorp');
      if (this.props.addPortfolioFailureMessage) {
        Alert.alert(this.props.addPortfolioFailureMessage.join());
      }
    } else if (this.props.taggableUserList !== prevProps.taggableUserList) {
      let filterArr = [];
      if (
        this.props.taggableUserList &&
        this.props.taggableUserList.length > 0
      ) {
        this.props.taggableUserList.map((user) => {
          let item = {
            name: user.name,
            value: user.id,
            profile: user.profile_pic,
          };
          filterArr.push(item);
        });
        this.setState({userList: filterArr});
      } else {
        this.setState({userList: []});
      }
    }
  }
  onTextSearch = () => {
    if (this.state.search !== '') {
      let formdata = new FormData();
      formdata.append('letters', this.state.search);
      this.props.getTaggableUser(formdata);
    }
  };
  render() {
    const {navigation, route, addPortfolio, getTaggableUserReq} = this.props;

    let userType = route.params.userType;
    return (
      <View style={styles.Container}>
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
          <ImageBackground
            source={Images.HomeIcon.RedBg}
            imageStyle={styles.ImageBackgroundStyle}
            style={[CommonStyle.backgroundStyle]}>
            <SafeAreaInsetsContext.Consumer>
              {(insets) => (
                <View
                  style={[
                    CommonStyle.notifyCont,
                    {
                      marginTop:
                        Platform.OS === 'android'
                          ? 50
                          : insets.top === 20
                          ? 40
                          : 70,
                    },
                  ]}>
                  <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    activeOpacity={1}>
                    <Image
                      source={Images.Notification.BackArrow}
                      style={[CommonStyle.iconStyle]}
                    />
                  </TouchableOpacity>
                  <Text style={[CommonStyle.welcomeName, {marginLeft: -30}]} />
                  <Text style={[CommonStyle.welcomeName, {fontSize: 16}]}>
                    {' '}
                  </Text>
                </View>
              )}
            </SafeAreaInsetsContext.Consumer>
          </ImageBackground>
          <View
            style={[CommonStyle.profileCard, {minHeight: height - height / 5}]}>
            <View style={styles.ImageBackgroundCont}>
              <ImageBackground
                source={route.params.source}
                imageStyle={styles.sourceStyle}
                style={styles.style1}
              />
              <View style={styles.closeIconCont}>
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => this.goBack()}>
                  <Image
                    source={Images.Portfolio.Close}
                    style={styles.closeIcon}
                  />
                </TouchableOpacity>
              </View>
              {userType === 3 && (
                <View>
                  <CheckBoxCont
                    label="Hide from Profile"
                    marginTop={20}
                    checkvalue={this.state.hideFromProf}
                    onpress={() =>
                      this.setState({hideFromProf: !this.state.hideFromProf})
                    }
                  />
                  <CheckBoxCont
                    label="Set as Background"
                    checkvalue={this.state.setAsBackground}
                    onpress={() =>
                      this.setState({
                        setAsBackground: !this.state.setAsBackground,
                      })
                    }
                  />
                  <View
                    style={[
                      CommonStyle.inputBorderStyle,
                      styles.inputBorderSty,
                    ]}>
                    <View style={styles.ViewCont}>
                      <Image
                        source={Images.Portfolio.Tags}
                        style={styles.tagsImage}
                      />
                    </View>
                    <TouchableOpacity
                      activeOpacity={1}
                      style={{width: '85%'}}
                      onPress={() => this.setState({isVisible: true})}>
                      <TextInput
                        style={styles.TextInputStyle}
                        editable={false}
                        name="tag"
                        value={this.state.tag}
                      />
                    </TouchableOpacity>
                    <TagSearchComp
                      isVisible={this.state.isVisible}
                      modalHandler={() => this.setState({isVisible: false})}
                      onTextChange={(value) => this.setState({search: value})}
                      onTextSearch={this.onTextSearch}
                      searchSpinner={getTaggableUserReq}
                      userList={this.state.userList}
                      onChangeTag={(name, id) => {
                        this.setState({
                          tag: name,
                          taggedUserId: id,
                          search: '',
                          isVisible: false,
                        });
                      }}
                    />
                  </View>
                </View>
              )}
              {this.state.portfolioErrMsg !== '' && (
                <Text style={[CommonStyle.errorMsg, {textAlign: 'center'}]}>
                  {this.state.portfolioErrMsg}
                </Text>
              )}
              {addPortfolio ? (
                <View style={CommonStyle.loadingStyle}>
                  <ActivityIndicator size="large" color="white" />
                </View>
              ) : (
                <Button
                  title={'SAVE'}
                  onSubmit={this.onSubmit}
                  navigation={navigation}
                  marginTop={50}
                  marginBottom={60}
                />
              )}
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  Container: {
    flex: 1,
  },
  closeIcon: {
    height: 45,
    width: 45,
  },
  sourceStyle: {
    borderRadius: 20,
  },
  TextInputStyle: {
    color: Colors.SelectColor,
    fontFamily: Fonts.HeveticaNowText_Medium,
    marginLeft: 10,
    marginTop: 6,
    width: '95%',
  },
  ImageBackgroundCont: {
    padding: 10,
    marginTop: 40,
  },
  tagsImage: {
    height: 37,
    width: 37,
    tintColor: 'red',
  },
  closeIconCont: {
    height: 45,
    width: 45,
    position: 'absolute',
    right: 20,
    top: -10,
    alignSelf: 'flex-end',
  },
  ViewCont: {
    justifyContent: 'center',
  },
  inputBorderSty: {
    width: '85%',
    alignSelf: 'center',
  },
  style1: {
    height: 270,
    width: 270,
    alignSelf: 'center',
    borderRadius: 20,
  },
  shadowStyle: {
    position: 'absolute',
    height: 270,
    width: 270,
    borderRadius: 20,
    marginTop: 10,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ImageBackgroundStyle: {
    // borderBottomLeftRadius: 15,
    // borderBottomRightRadius: 15,
    tintColor: Colors.ButtonColor,
  },
  uploadText: {
    fontSize: 15,
    fontFamily: Fonts.Lato_Bold,
    color: Colors.White,
    margin: 20,
  },
});
const mapStateToProps = (state) => {
  return {
    portfolioData: state.ProfileReducer.portfolioData,
    addPortfolioFailureMessage:
      state.ProfileReducer.addPortfolioImageFailureMessage,
    addPortfolioFailure: state.ProfileReducer.addPortfolioImageFailure,
    addPortfolioSuccess: state.ProfileReducer.addPortfolioImageSuccess,
    addPortfolio: state.ProfileReducer.addPortfolioImage,
    getTaggableUserReq: state.StylistReducer.getTaggableUserReq,
    taggableUserList: state.StylistReducer.taggableUserList,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getPortfolioImage: () => dispatch(getPortfolioImage()),
  addPortfolioImage: (data) => dispatch(addPortfolioImage(data)),
  addPortfolioImageSuccess: (response) =>
    dispatch(addPortfolioImageSuccess(response)),
  getTaggableUser: (data) => dispatch(getTaggableUser(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ImageUpload);
