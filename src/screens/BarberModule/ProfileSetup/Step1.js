/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {Images, Fonts, Colors} from '../../../constants';
import CommonStyle from '../../../constants/Style';
import ImagePicker from 'react-native-image-picker';
import Button from '../../../components/Button';
import {connect} from 'react-redux';
import {styistProfileUploadReq} from '../../../redux/actions/authAction';
import {Platform} from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
const {height, width} = Dimensions.get('window');
const options = {
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};
let bs = React.createRef();
let fall = new Animated.Value(1);
const animatedShadowOpacity = Animated.interpolateNode(fall, {
  inputRange: [0, 1],
  outputRange: [0.5, 0],
});

class Step1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: 60,
      avatarSource: null,
      uploadImage: null,
      profileErrorMsg: '',
    };
  }

  launchCamera = () => {
    bs.current.snapTo(1);
    ImagePicker.launchCamera(options, (response) => {
      if (response.uri) {
        const source = {uri: response.uri};
        this.setState({
          avatarSource: source,
          uploadImage: response,
          profileErrorMsg: '',
        });
      }
    });
  };
  launchLibrary = () => {
    bs.current.snapTo(1);
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.uri) {
        const source = {uri: response.uri};
        this.setState({
          avatarSource: source,
          uploadImage: response,
          profileErrorMsg: '',
        });
      }
    });
  };
  onSubmit = () => {
    if (this.state.uploadImage !== null) {
      var photo = {
        uri:
          Platform.OS === 'android'
            ? 'file://' + this.state.uploadImage.path
            : 'data:image/jpeg;base64,' + this.state.uploadImage.data,
        type: this.state.uploadImage.type,
        name:
          this.state.uploadImage.fileName !== null
            ? this.state.uploadImage.fileName
            : 'noNamedImage',
      };

      let formdata = new FormData();
      formdata.append('prof_pic', photo);
      this.props.styistProfileUploadReq(formdata);
    } else {
      this.setState({
        profileErrorMsg: 'Please choose atleast a profile pic to upload',
      });
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.styistProfUploadFailure !== prevProps.styistProfUploadFailure
    ) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        profileErrorMsg: this.props.styistProfUploadFailureMessage,
      });
    } else if (
      this.props.styistProfUploadSuccess !== prevProps.styistProfUploadSuccess
    ) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({profileErrorMsg: ''});
      this.props.navigation.navigate('Step2');
    }
  }

  renderInner = () => (
    <View style={{height: '100%'}}>
      <View
        style={{
          height: '70%',
          borderBottomWidth: 1,
          backgroundColor: 'rgba(18, 17, 17, 0.79)',
        }}>
        <TouchableOpacity onPress={() => bs.current.snapTo(1)}>
          <View>
            <Text style={{textAlign: 'left'}} />
          </View>
        </TouchableOpacity>
      </View>
      <View
        style={{borderBottomWidth: 1, borderColor: '#04040F66', height: '10%'}}>
        <Text style={styles.photo_text}>Photo</Text>
      </View>
      <View
        style={{
          borderBottomWidth: 1,
          borderColor: '#04040F66',
          height: '10%',
        }}>
        <TouchableOpacity activeOpacity={1} onPress={() => this.launchCamera()}>
          <View>
            <Text style={styles.TextStyle1}>Take from camera</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={{height: '10%'}}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => this.launchLibrary()}>
          <View>
            <Text style={styles.TextStyle}>Choose from gallery</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );

  renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  );

  render() {
    const {navigation, styistProfUploadReq} = this.props;
    return (
      <View style={{flex: 1}}>
        <BottomSheet
          ref={bs}
          snapPoints={Platform.OS === 'android' ? ['100%', 0] : ['100%', 0]}
          renderContent={this.renderInner}
          renderHeader={this.renderHeader}
          height={{flex: 1}}
          initialSnap={1}
          callbackNode={this.fall}
          enabledGestureInteraction={true}
          isBackDrop={true}
          isBackDropDismissByPress={true}
          backDropColor="red"
        />
        <Image
          // source={Images.ProfileBuildIcon.ProfileBackground}
          style={styles.ImageStyle}
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{flex: 1, height: height}}>
          <View style={styles.HeaderCont}>
            <View style={styles.goBackCont}>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => navigation.goBack()}>
                <Image
                  source={Images.SignUpIcon.BackArrow}
                  style={[CommonStyle.backArrow, {marginTop: -4}]}
                />
              </TouchableOpacity>
            </View>
            <Text
              style={[
                CommonStyle.logoText,
                {textAlign: 'center', width: '95%'},
              ]}>
              Step 1
            </Text>
          </View>
          <View style={[CommonStyle.subContainer, {paddingHorizontal: 30}]}>
            <Text style={CommonStyle.startedText}>Upload Photo</Text>
            <Text style={CommonStyle.startedTextNew2}>
              We may use your information for the purposes of managing our
              account and keeping it in working order.{' '}
            </Text>
            <View style={styles.imageShow}>
              <Image
                source={
                  this.state.avatarSource
                    ? this.state.avatarSource
                    : Images.ProfileBuildIcon.Default
                }
                style={styles.imageShow}
              />
              <TouchableOpacity
                activeOpacity={1}
                style={styles.PlusButton}
                onPress={() => bs.current.snapTo(0)}>
                <View>
                  <Image
                    source={Images.ProfileBuildIcon.Plus}
                    style={styles.PlusButton}
                  />
                </View>
              </TouchableOpacity>
            </View>

            {this.state.profileErrorMsg !== '' && (
              <View style={{marginTop: 20, alignItems: 'center'}}>
                <Text style={[CommonStyle.errorMsg]}>
                  {this.state.profileErrorMsg}
                </Text>
              </View>
            )}
            {styistProfUploadReq ? (
              <View style={CommonStyle.loadingStyle}>
                <ActivityIndicator size="large" color="white" />
              </View>
            ) : (
              <Button
                title={'NEXT'}
                marginTop={80}
                onSubmit={this.onSubmit}
                navigation={navigation}
              />
            )}
          </View>
        </ScrollView>
        <Animated.View
          pointerEvents="none"
          style={[
            {
              ...StyleSheet.absoluteFillObject,
              backgroundColor: '#000',
              opacity: animatedShadowOpacity,
            },
          ]}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  imageShow: {
    height: 120,
    width: 120,
    borderRadius: 100,
    marginTop: 20,
    alignSelf: 'center',
  },
  TextStyle: {
    fontSize: 15,
    textAlign: 'left',
    margin: 26,
    borderColor: 'black',
    marginLeft: 45,
  },
  photo_text: {
    fontWeight: 'bold',
    fontSize: 21,
    textAlign: 'left',
    marginLeft: 45,
    margin: 21,
  },
  TextStyle1: {
    fontSize: 15,
    textAlign: 'left',
    margin: 26,
    marginLeft: 45,
  },
  HeaderCont: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: Platform.OS === 'android' ? 10 : 30,
    height: 50,
    width: '85%',
    marginBottom: 35,
    alignSelf: 'center',
  },
  goBackCont: {
    height: 40,
    width: 10,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  PlusButton: {
    height: 30,
    width: 30,
    borderRadius: 120,
    bottom: 13,
    left: 10,
    alignSelf: 'center',
  },
  ImageStyle: {
    height,
    width,
    position: 'absolute',
    backgroundColor: '#F9F9F9',
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 0,
    borderRadius: 4,
    marginBottom: 1,
  },
  header: {
    backgroundColor: '#04040F66',
    shadowColor: 'blue',
    shadowOffset: {width: -1, height: -3},
  },

  labelStyle: {
    fontSize: 16,
    fontFamily: Fonts.HeveticaNowText_Medium,
    color: Colors.Red,
    width: '80%',
  },
  signupButton: {
    width: 280,
    height: 60,
    backgroundColor: Colors.Pink,
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    margin: 20,
    marginBottom: 0,
    padding: 20,
    paddingLeft: 30,
    borderRadius: 10,
  },
});
const mapStateToProps = (state) => {
  return {
    styistProfUploadFailureMessage:
      state.SignupReducer.styistProfUploadFailureMessage,
    styistProfUploadFailure: state.SignupReducer.styistProfUploadFailure,
    styistProfUploadSuccess: state.SignupReducer.styistProfUploadSuccess,
    styistProfUploadReq: state.SignupReducer.styistProfUploadReq,
    step1Data: state.SignupReducer.step1Data,
  };
};

const mapDispatchToProps = (dispatch) => ({
  styistProfileUploadReq: (data) => dispatch(styistProfileUploadReq(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Step1);
