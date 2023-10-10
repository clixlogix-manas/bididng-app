/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  // Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Platform,
} from 'react-native';
import {Images, Colors, Fonts} from '../../constants';
import CommonStyle from '../../constants/Style';
import ImagePicker from 'react-native-image-picker';
import {connect} from 'react-redux';
import {
  getLikedPhoto,
  getPortfolioImage,
} from '../../redux/actions/profileAction';
import Spinner from 'react-native-loading-spinner-overlay';
import {
  BASE_URL,
  portCustImagePath,
  portfolioImagePath,
} from '../../constants/Config';
import AsyncStorage from '@react-native-community/async-storage';
import {SafeAreaInsetsContext} from 'react-native-safe-area-context';
import SafeAreaView from 'react-native-safe-area-view';

// const {height} = Dimensions.get('window');
const options = {
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

class Portfolio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: false,
      selectedSource: '',
      renderScreen:
        this.props.route.params.type === 'Stylist'
          ? this.props.route.params.renderScreen === 'portfolio'
            ? 'portfolio'
            : 'LikedPhoto'
          : 'Myphoto',
    };
  }
  launchLibrary = () => {
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.uri) {
        const source = {uri: response.uri};
        this.props.navigation.navigate('ImageUpload', {
          source,
          response,
          userType: this.props.route.params.userType,
          navigation: this.props.navigation,
        });

        this.setState({
          selectedSource: source,
        });
      }
    });
  };
  renderMyphoto = (item, navigation, insets) => {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('ViewImage', {
              item: {
                image: {
                  uri:
                    this.props.route.params.userType === 2
                      ? portCustImagePath + item.image
                      : portfolioImagePath + item.image,
                },
                data: item,
              },
              type: 'show',
              // myphoto: true,
              userType: this.props.route.params.userType,
            })
          }
          activeOpacity={1}>
          <Image
            source={{
              uri:
                this.props.route.params.userType === 2
                  ? portCustImagePath + item.image
                  : portfolioImagePath + item.image,
            }}
            key={item.id}
            style={CommonStyle.myportfolioImg}
          />
        </TouchableOpacity>
      </View>
    );
  };
  renderStylistPortfolio = (item, navigation, insets) => {
    return (
      <View
        style={{
          marginVertical: 10,
          marginHorizontal:
            Platform.OS === 'android' ? 7 : insets.top === 20 ? 10 : 18,
        }}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('ViewImage', {
              item: {
                image: {uri: portfolioImagePath + item.image},
                data: item,
              },
              type: 'show',
              userType: this.props.route.params.userType,
            })
          }
          activeOpacity={1}>
          <Image
            source={{uri: portfolioImagePath + item.image}}
            key={item.id}
            style={[CommonStyle.myportfolioImg]}
          />
        </TouchableOpacity>
      </View>
    );
  };
  renderLikedPhoto = (item, navigation, type, insets) => {
    return (
      <View
        style={{
          marginVertical: 10,
          marginHorizontal:
            Platform.OS === 'android' ? 7 : insets.top === 20 ? 10 : 18,
        }}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('ViewImage', {
              item: {
                image:
                  type === 2
                    ? {uri: portCustImagePath + item.image}
                    : type === 3
                    ? {uri: BASE_URL + '/' + item.img_path}
                    : {uri: portfolioImagePath + item.image},
                data: item,
                liked: true,
              },
              type: 'show',
              myphoto: type === 2 ? true : undefined,
              photooftheday: type === 3 ? true : undefined,
              userType: this.props.route.params.userType,
            })
          }
          activeOpacity={1}>
          <Image
            source={
              type === 2
                ? {uri: portCustImagePath + item.image}
                : type === 3
                ? {uri: BASE_URL + '/' + item.img_path}
                : {uri: portfolioImagePath + item.image}
            }
            key={item.id}
            style={CommonStyle.myportfolioImg}
          />
        </TouchableOpacity>
      </View>
    );
  };
  async componentDidMount() {
    let token = await AsyncStorage.getItem('loginToken');
    if (token) {
      this.props.getPortfolioImage();
      if (this.props.route.params.userType === 'Customer') {
        this.props.getLikedPhoto();
      }
    }
  }

  renderPortolio = ({item}) => {
    return (
      <Image
        source={{uri: portfolioImagePath + item.image}}
        key={item.id}
        style={styles.ImageStyle2}
      />
    );
  };
  componentDidUpdate(prevProps, prevState) {
    if (this.props.addPortfolioSuccess !== prevProps.addPortfolioSuccess) {
      this.props.getPortfolioImage();
    } else if (
      this.props.customerLikeStylistImageSuccess !==
      prevProps.customerLikeStylistImageSuccess
    ) {
      this.props.getLikedPhoto();
    } else if (
      this.props.customerDislikeStylistImageSuccess !==
      prevProps.customerDislikeStylistImageSuccess
    ) {
      this.props.getLikedPhoto();
    } else if (
      this.props.deleteStylistPortImageSuccess !==
      prevProps.deleteStylistPortImageSuccess
    ) {
      this.props.getPortfolioImage();
    }
  }
  render() {
    const {
      navigation,
      route,
      getPortfolio,
      portfolioData,
      portfolioList,
      likedPhoto,
      getLikedPhotoReq,
    } = this.props;
    const {renderScreen} = this.state;
    let listOfImages =
      portfolioData &&
      portfolioData.length > 0 &&
      portfolioData.filter((data, index) => {
        if (index !== 0 && index !== 1) {
          return data;
        }
      });
    // eslint-disable-next-line no-unused-vars
    let showProfileItem =
      portfolioList &&
      portfolioList.length > 0 &&
      portfolioList.filter((data, index) => {
        if (data.profile_hide === 1) {
          return data;
        }
      });

    let type = route.params.type;
    let userType = route.params.userType;
    return (
      <SafeAreaView style={styles.SafeAreaViewStyle}>
        <View style={styles.SubCont}>
          <TouchableOpacity
            style={{height: 40, width: 40}}
            activeOpacity={1}
            onPress={() => navigation.goBack()}>
            <Image
              source={Images.SignUpIcon.BackArrow}
              style={styles.BackArrowStyle}
            />
          </TouchableOpacity>

          <Text style={[CommonStyle.welcomeName1, styles.welcomeText1]}>
            {'My Photos'}
          </Text>
        </View>
        {/* <Text style={styles.Upload_PhotosText}>Upload Photos</Text> */}
        {userType === 'Customer' ? (
          <View style={[styles.serviceCont]}>
            <FlatList
              data={showProfileItem}
              renderItem={this.renderPortolio}
              scrollEnabled={true}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
              }}
              keyExtractor={(item) => item.id.toString()}
              numColumns={3}
            />
          </View>
        ) : null}
        <SafeAreaInsetsContext.Consumer>
          {(insets) => (
            <ScrollView
              style={styles.ScrollViewStyle}
              showsVerticalScrollIndicator={false}>
              <Spinner
                visible={getPortfolio || getLikedPhotoReq}
                textContent={'Loading...'}
                textStyle={{color: Colors.BackgroundGray}}
              />
              <View>
                {userType === 'Customer' && type !== 'Stylist' && (
                  <View
                    style={[CommonStyle.notifyCont, styles.notifyContStyle]}>
                    <TouchableOpacity
                      onPress={() => this.setState({renderScreen: 'Myphoto'})}
                      activeOpacity={1}>
                      <View
                        style={[
                          styles.rowCont,
                          {
                            borderBottomWidth:
                              renderScreen === 'Myphoto' ? 2 : 0,
                          },
                        ]}>
                        <Image
                          source={Images.CustomerHomeIcon.MyPhoto2}
                          style={styles.MyPhotoStyle}
                        />
                        <Text
                          style={[CommonStyle.welcomeName, styles.welcomeText]}>
                          My Photos{' '}
                        </Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() =>
                        this.setState({renderScreen: 'LikedPhoto'})
                      }
                      activeOpacity={1}>
                      <View
                        style={[
                          styles.rowCont,
                          {
                            borderBottomWidth:
                              renderScreen === 'LikedPhoto' ? 2 : 0,
                          },
                        ]}>
                        <Image
                          source={Images.CustomerHomeIcon.Like}
                          style={styles.ImageStyle1}
                        />
                        <Text
                          style={[CommonStyle.welcomeName, styles.LikedText]}>
                          Liked Photos{' '}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                )}

                <View style={[CommonStyle.profileCard]}>
                  <View style={styles.ViewStyle}>
                    {renderScreen === 'Myphoto' && (
                      <View>
                        <View
                          style={[
                            styles.launchLibraryView,
                            {
                              justifyContent:
                                portfolioData && portfolioData.length === 1
                                  ? 'flex-start'
                                  : 'space-between',
                            },
                          ]}>
                          <View>
                            <TouchableOpacity
                              onPress={() => this.launchLibrary()}
                              activeOpacity={1}>
                              <View style={[styles.myportfolioImg]}>
                                <Image
                                  source={Images.Portfolio.Upload}
                                  style={styles.ImageStyle}
                                />
                                <Text style={styles.upload_text}>
                                  Upload Images
                                </Text>
                              </View>
                            </TouchableOpacity>
                          </View>
                          {portfolioData && portfolioData.length > 0 && (
                            <View
                              style={{
                                marginLeft:
                                  portfolioData && portfolioData.length === 1
                                    ? '10%'
                                    : 0,
                              }}>
                              <TouchableOpacity
                                style={styles.OpaacityStyle}
                                onPress={() =>
                                  navigation.navigate('ViewImage', {
                                    item: portfolioData[0],
                                    type: 'show',
                                    myphoto: true,
                                    userType: route.params.userType,
                                  })
                                }
                                activeOpacity={1}>
                                <Image
                                  source={{
                                    uri:
                                      route.params.userType === 2
                                        ? portCustImagePath +
                                          portfolioData[0].image
                                        : portfolioImagePath +
                                          portfolioData[0].image,
                                  }}
                                  key={portfolioData[0].id}
                                  style={CommonStyle.myportfolioImg}
                                />
                              </TouchableOpacity>
                            </View>
                          )}
                          {portfolioData && portfolioData.length > 1 && (
                            <View>
                              <TouchableOpacity
                                style={styles.OpaacityStyle}
                                onPress={() =>
                                  navigation.navigate('ViewImage', {
                                    item: portfolioData[1],
                                    type: 'show',
                                    myphoto: true,
                                    userType: route.params.userType,
                                  })
                                }
                                activeOpacity={1}>
                                <Image
                                  source={{
                                    uri:
                                      route.params.userType === 2
                                        ? portCustImagePath +
                                          portfolioData[1].image
                                        : portfolioImagePath +
                                          portfolioData[1].image,
                                  }}
                                  key={portfolioData[1].id}
                                  style={CommonStyle.myportfolioImg}
                                />
                              </TouchableOpacity>
                            </View>
                          )}
                        </View>

                        {portfolioData && portfolioData.length > 2 && (
                          <FlatList
                            data={listOfImages}
                            scrollEnabled={false}
                            showsVerticalScrollIndicator={false}
                            renderItem={({item, index}) =>
                              this.renderMyphoto(item, navigation, insets)
                            }
                            contentContainerStyle={{
                              flex: 1,
                              display: 'flex',
                              justifyContent: 'space-between',
                              marginLeft: -2,
                              alignItems:
                                portfolioData &&
                                (portfolioData.length === 3 ||
                                  portfolioData.length === 4)
                                  ? 'flex-start'
                                  : 'flex-start',
                            }}
                            keyExtractor={(item) => item.id.toString()}
                            numColumns={3}
                          />
                        )}
                      </View>
                    )}
                    {renderScreen === 'LikedPhoto' &&
                      likedPhoto &&
                      likedPhoto.images.length > 0 && (
                        <View>
                          <Text style={styles.textStyle3}>Stylist photos</Text>
                          <FlatList
                            data={likedPhoto.images}
                            horizontal={true}
                            showsVerticalScrollIndicator={false}
                            renderItem={({item, index}) =>
                              this.renderLikedPhoto(item, navigation, 1, insets)
                            }
                            contentContainerStyle={styles.contentContainerSty2}
                            keyExtractor={(item) => item.id.toString()}
                          />
                        </View>
                      )}
                    {renderScreen === 'LikedPhoto' &&
                      likedPhoto &&
                      likedPhoto.cust_images.length > 0 && (
                        <View>
                          <Text style={styles.textStyle2}>
                            Customer Own photos
                          </Text>
                          <FlatList
                            data={likedPhoto.cust_images}
                            showsVerticalScrollIndicator={false}
                            renderItem={({item, index}) =>
                              this.renderLikedPhoto(item, navigation, 2, insets)
                            }
                            horizontal={true}
                            contentContainerStyle={styles.contentContainerSty2}
                            keyExtractor={(item) => item.id.toString()}
                          />
                        </View>
                      )}
                    {renderScreen === 'LikedPhoto' &&
                      likedPhoto &&
                      likedPhoto.pod_images.length > 0 && (
                        <View>
                          <Text style={styles.textStyle1}>
                            Photo of the day
                          </Text>
                          <FlatList
                            data={likedPhoto.pod_images}
                            horizontal={true}
                            showsVerticalScrollIndicator={false}
                            renderItem={({item, index}) =>
                              this.renderLikedPhoto(item, navigation, 3, insets)
                            }
                            contentContainerStyle={styles.contentContainerSty}
                            keyExtractor={(item) => item.user_id.toString()}
                          />
                        </View>
                      )}
                  </View>
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
  myportfolioImg: {
    height: 112,
    width: 112,
    borderRadius: 5,
    borderColor: Colors.ImageColor,
    borderStyle: 'dashed',
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    // marginLeft: 5,
    padding: 3,
    marginRight: 2.5,
  },
  BackArrowStyle: {
    height: 20.5,
    width: 12,
    marginTop: 15,
  },
  SafeAreaViewStyle: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  ImageStyle1: {
    height: 25,
    width: 25,
    marginRight: 10,
  },
  SubCont: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
  },
  welcomeText: {
    fontSize: 16,
    marginLeft: 10,
  },
  ScrollViewStyle: {
    flex: 1,
    marginLeft: 3,
  },
  contentContainerSty2: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  Upload_PhotosText: {
    color: Colors.Black,
    marginTop: 10,
    marginStart: 15,
    alignItems: 'flex-start',
    fontSize: 15,
    fontFamily: Fonts.HeveticaNowText_Medium,
  },
  welcomeText1: {
    marginLeft: -30,
    marginTop: 10,
    textAlign: 'center',
    flex: 1,
  },
  contentContainerSty: {
    flex: 1,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  MyPhotoStyle: {
    height: 25,
    width: 25,
  },
  launchLibraryView: {
    flex: 1,
    display: 'flex',
    marginTop: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },
  LikedText: {
    fontSize: 16,
  },
  notifyContStyle: {
    marginTop: 5,
  },
  upload_text: {
    marginTop: 10,
    color: Colors.Black,
    fontSize: 12,
  },
  textStyle2: {
    fontFamily: Fonts.HeveticaNowText_Black,
    fontSize: 15,
    padding: 20,
    alignSelf: 'center',
  },
  ViewStyle: {
    marginHorizontal: 3,
  },
  ImageStyle: {
    height: 30,
    width: 30,
    tintColor: Colors.ButtonColor,
  },
  textStyle1: {
    fontFamily: Fonts.HeveticaNowText_Black,
    fontSize: 15,
    padding: 20,
    alignSelf: 'center',
  },
  container: {
    marginVertical: 3,
    marginHorizontal: 3,
  },
  OpaacityStyle: {
    marginBottom: 3,
    marginHorizontal: 3,
  },
  rowCont: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomColor: Colors.White,
    height: 45,
  },
  ImageStyle2: {
    height: 112,
    width: 112,
    borderRadius: 10,
    margin: 1.5,
  },

  serviceCont: {
    width: 343,
    alignSelf: 'center',
    marginTop: 15,
  },
});
const mapStateToProps = (state) => {
  return {
    portfolioData: state.ProfileReducer.portfolioData,
    getPortfolioFailureMessage:
      state.ProfileReducer.getPortfolioImageFailureMessage,
    getPortfolioFailure: state.ProfileReducer.getPortfolioImageFailure,
    getPortfolioSuccess: state.ProfileReducer.getPortfolioImageSuccess,
    getPortfolio: state.ProfileReducer.getPortfolioImage,
    getLikedPhotoSuccess: state.ProfileReducer.getLikedPhotoSuccess,
    getLikedPhotoReq: state.ProfileReducer.getLikedPhoto,
    likedPhoto: state.ProfileReducer.likedPhoto,
    portfolioList: state.StylistReducer.portfolioList,
    addPortfolioSuccess: state.ProfileReducer.addPortfolioImageSuccess,
    customerLikeStylistImageSuccess:
      state.StylistReducer.customerLikeStylistImageSuccess,
    customerDislikeStylistImageSuccess:
      state.StylistReducer.customerDislikeStylistImageSuccess,
    deleteStylistPortImageSuccess:
      state.StylistReducer.deleteStylistPortImageSuccess,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getPortfolioImage: () => dispatch(getPortfolioImage()),
  getLikedPhoto: () => dispatch(getLikedPhoto()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio);
