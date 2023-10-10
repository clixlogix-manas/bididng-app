/* eslint-disable react/no-did-update-set-state */
import React, {Component} from 'react';
import {
  View,
  Dimensions,
  Image,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import {Images} from '../../constants';
import LinearGradient from 'react-native-linear-gradient';
import CommonStyle from '../../constants/Style';
import {portCustImagePath, portfolioImagePath} from '../../constants/Config';
import {connect} from 'react-redux';
import {
  customerDislikeStylistImage,
  customerLikeStylistImage,
  deleteStylistPortImage,
  disLikeMyPhoto,
  disLikePhotoOfTheDay,
  getTaggableUser,
  likeMyPhoto,
  likePhotoOfTheDay,
  tagCustomer,
} from '../../redux/actions/stylistAction';
import {getLikedPhoto} from '../../redux/actions/profileAction';
import TagSearchComp from '../../components/TagSearchComp';
import Spinner from 'react-native-loading-spinner-overlay';
import Colors from '../../constants/Colors';
const {height, width} = Dimensions.get('window');

class ViewImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tag: '',
      taggedUserId: '',
      isVisible: false,
      search: '',
      searchSpinner: false,
      userList: [],
      funLoader: false,
      imageLoadStatus: true,
    };
  }
  likeImage = () => {
    const {route} = this.props;
    let itemId = route.params.item.id
      ? route.params.item.id
      : route.params.item.data.id;
    let formdata = new FormData();
    formdata.append('image_id', itemId);
    if (route.params.myphoto) {
      this.props.likeMyPhoto(formdata);
    } else if (route.params.photooftheday) {
      this.props.likePhotoOfTheDay(formdata);
    } else {
      this.props.customerLikeStylistImage(formdata);
    }
  };
  onTextSearch = () => {
    if (this.state.search !== '') {
      this.setState({searchSpinner: true});
      let formdata = new FormData();
      formdata.append('letters', this.state.search);
      this.props.getTaggableUser(formdata);
    } else {
      this.setState({
        searchSpinner: false,
      });
    }
  };
  dislikeImage = () => {
    const {route} = this.props;
    let itemId;
    if (route.params.item.data) {
      itemId = route.params.item.data.image_id
        ? route.params.item.data.image_id
        : route.params.item.data.like_id;
    } else {
      itemId = route.params.item.id;
    }

    let formdata = new FormData();
    formdata.append('image_id', itemId);
    if (route.params.myphoto) {
      this.props.disLikeMyPhoto(formdata);
    } else if (route.params.photooftheday) {
      this.props.disLikePhotoOfTheDay(formdata);
    } else {
      this.props.customerDislikeStylistImage(formdata);
    }
  };
  deletePortImage = () => {
    const {route} = this.props;
    let itemId = route.params.item.id
      ? route.params.item.id
      : route.params.item.data.id;
    let formdata = new FormData();
    formdata.append('img_id', itemId);
    this.props.deleteStylistPortImage(formdata);
  };
  async componentDidUpdate(prevProps, prevState) {
    if (
      this.props.customerLikeStylistImageSuccess !==
      prevProps.customerLikeStylistImageSuccess
    ) {
      this.props.getLikedPhoto();
      this.props.navigation.goBack();
    } else if (
      this.props.customerDislikeStylistImageSuccess !==
      prevProps.customerDislikeStylistImageSuccess
    ) {
      this.props.getLikedPhoto();
      this.props.navigation.goBack();
    } else if (
      this.props.deleteStylistPortImageSuccess !==
      prevProps.deleteStylistPortImageSuccess
    ) {
      this.props.navigation.goBack();
    } else if (
      this.props.getTaggableUserSuccess !== prevProps.getTaggableUserSuccess &&
      this.props.getTaggableUserSuccess === true
    ) {
      if (this.props.taggableUserList !== prevProps.taggableUserList) {
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
          this.setState({userList: filterArr, searchSpinner: false});
        } else {
          this.setState({userList: [], searchSpinner: false});
        }
      }
    } else if (this.props.tagCustomerSuccess !== prevProps.tagCustomerSuccess) {
      this.props.navigation.goBack();
    } else if (this.props.tagCustomerFailure !== prevProps.tagCustomerFailure) {
      Alert.alert(
        'Hairbiddy',
        this.props.tagCustomerFailureMessage,
        [{text: 'OK', onPress: () => {}}],
        {cancelable: true},
      );
    }
  }
  render() {
    const {navigation, route, tagCustomerReq} = this.props;
    let item = route.params.item;
    let type = route.params.type;
    let subOption = route.params.subOption;
    let userType = route.params.userType;
    var image = this.state.imageLoadStatus
      ? Images.CustomerHomeIcon.LoadingImg
      : item.image.uri
      ? item.image
      : typeof item.image === 'number'
      ? item.image
      : {
          uri:
            userType === 2
              ? portCustImagePath + item.image
              : portfolioImagePath + item.image,
        };

    return (
      <ImageBackground
        source={image}
        onLoadEnd={() => this.setState({imageLoadStatus: false})}
        style={styles.bgStyle}
        imageStyle={styles.imageStyle1}>
        <Spinner
          visible={tagCustomerReq}
          textContent={'Loading...'}
          textStyle={{color: Colors.Black}}
        />
        {!subOption && subOption !== false && (
          <LinearGradient
            colors={['#bfbfbf00', '#2c3e50']}
            locations={[1, 1]}
            style={styles.linearGradient}>
            <View style={styles.container}>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => navigation.goBack()}>
                <Image
                  source={Images.Notification.BackArrow}
                  style={[CommonStyle.backArrow, styles.backArrow1]}
                />
              </TouchableOpacity>
              {userType !== 2 && userType !== 'Guest' && (
                <View style={styles.bottomCont}>
                  <View style={styles.ViewStyle}>
                    <TouchableOpacity
                      onPress={() => this.setState({isVisible: true})}>
                      <Image
                        style={styles.bottomBtn}
                        source={Images.Portfolio.Tag}
                      />
                    </TouchableOpacity>
                  </View>
                  <TagSearchComp
                    isVisible={this.state.isVisible}
                    modalHandler={() => this.setState({isVisible: false})}
                    onTextChange={(value) => this.setState({search: value})}
                    onTextSearch={this.onTextSearch}
                    searchSpinner={this.state.searchSpinner}
                    userList={this.state.userList}
                    onChangeTag={(name, id) => {
                      this.setState({
                        tag: name,
                        taggedUserId: id,
                        search: '',
                        isVisible: false,
                        funLoader: false,
                      });
                      let formdata = new FormData();
                      formdata.append('tag_id', id);
                      formdata.append('image_id', item.id);
                      this.props.tagCustomer(formdata);
                    }}
                  />
                  <TouchableOpacity
                    onPress={() => {
                      let formdata = new FormData();
                      formdata.append(
                        'profile_hide',
                        item.profile_hide === 1 ? 0 : 1,
                      );
                      formdata.append('image_id', item.id);
                      this.props.tagCustomer(formdata);
                    }}>
                    <View style={styles.ViewStyle}>
                      <Image
                        style={styles.bottomBtn}
                        source={Images.Portfolio.Photo}
                      />
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => this.deletePortImage()}>
                    <View style={styles.ViewStyle}>
                      <Image
                        style={styles.bottomBtn}
                        source={Images.Portfolio.Delete}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              )}
              {userType === 2 && type === 'show' && (
                <View
                  style={[
                    styles.bottomCont,
                    // eslint-disable-next-line react-native/no-inline-styles
                    {
                      width: '50%',
                      justifyContent: !route.params.item.liked
                        ? 'space-between'
                        : 'center',
                    },
                  ]}>
                  {!route.params.item.liked && (
                    <TouchableOpacity onPress={() => this.likeImage()}>
                      <View style={styles.ViewStyle}>
                        <Image
                          style={styles.bottomBtn}
                          source={Images.Portfolio.Like}
                        />
                      </View>
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity onPress={() => this.dislikeImage()}>
                    <View style={styles.ViewStyle}>
                      <Image
                        style={styles.bottomBtn}
                        source={Images.Portfolio.DisLike}
                      />
                    </View>
                  </TouchableOpacity>
                  {!route.params.item.liked && !route.params.photooftheday && (
                    <TouchableOpacity onPress={() => this.deletePortImage()}>
                      <View style={styles.ViewStyle}>
                        <Image
                          style={styles.bottomBtn}
                          source={Images.Portfolio.Delete}
                        />
                      </View>
                    </TouchableOpacity>
                  )}
                </View>
              )}
            </View>
          </LinearGradient>
        )}
        <></>
      </ImageBackground>
    );
  }
}
const styles = StyleSheet.create({
  bgStyle: {
    height: height,
    width: width,
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 50,
    alignItems: 'flex-start',
    height: height - 100,
  },
  bottomBtn: {
    height: 50,
    width: 50,
  },
  backArrow1: {
    marginLeft: 30,
  },
  imageStyle1: {
    resizeMode: 'cover',
  },
  bottomCont: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    width: '50%',
    marginBottom: 40,
  },
  ViewStyle: {
    height: 50,
    width: 50,
  },
  linearGradient: {
    width: '100%',
    height: '100%',
  },
});
const mapStateToProps = (state) => {
  return {
    customerLikeStylistImageReq:
      state.StylistReducer.customerLikeStylistImageReq,
    customerLikeStylistImageFailure:
      state.StylistReducer.customerLikeStylistImageFailure,
    customerLikeStylistImageSuccess:
      state.StylistReducer.customerLikeStylistImageSuccess,
    customerLikeStylistImageFailureMessage:
      state.StylistReducer.customerLikeStylistImageFailureMessage,
    customerDislikeStylistImageReq:
      state.StylistReducer.customerDislikeStylistImageReq,
    customerDislikeStylistImageSuccess:
      state.StylistReducer.customerDislikeStylistImageSuccess,
    deleteStylistPortImageReq: state.StylistReducer.deleteStylistPortImageReq,
    deleteStylistPortImageFailure:
      state.StylistReducer.deleteStylistPortImageFailure,
    deleteStylistPortImageSuccess:
      state.StylistReducer.deleteStylistPortImageSuccess,
    taggableUserList: state.StylistReducer.taggableUserList,
    tagCustomerReq: state.StylistReducer.tagCustomerReq,
    tagCustomerFailure: state.StylistReducer.tagCustomerFailure,
    tagCustomerSuccess: state.StylistReducer.tagCustomerSuccess,
    tagCustomerFailureMessage: state.StylistReducer.tagCustomerFailureMessage,
    getTaggableUserReq: state.StylistReducer.getTaggableUserReq,
    getTaggableUserSuccess: state.StylistReducer.getTaggableUserSuccess,
  };
};

const mapDispatchToProps = (dispatch) => ({
  customerLikeStylistImage: (data) => dispatch(customerLikeStylistImage(data)),
  customerDislikeStylistImage: (data) =>
    dispatch(customerDislikeStylistImage(data)),
  getLikedPhoto: () => dispatch(getLikedPhoto()),
  likeMyPhoto: (data) => dispatch(likeMyPhoto(data)),
  disLikeMyPhoto: (data) => dispatch(disLikeMyPhoto(data)),
  likePhotoOfTheDay: (data) => dispatch(likePhotoOfTheDay(data)),
  disLikePhotoOfTheDay: (data) => dispatch(disLikePhotoOfTheDay(data)),
  deleteStylistPortImage: (data) => dispatch(deleteStylistPortImage(data)),
  getTaggableUser: (data) => dispatch(getTaggableUser(data)),
  tagCustomer: (data) => dispatch(tagCustomer(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ViewImage);
