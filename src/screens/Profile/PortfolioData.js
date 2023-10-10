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

// const {height} = Dimensions.get('window');
const options = {
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

class PortfolioData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: false,
      selectedSource: '',
      renderScreen: 'Myphoto',
      userType: 3,
    };
  }
  launchLibrary = () => {
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.uri) {
        const source = {uri: response.uri};
        this.props.navigation.navigate('ImageUpload', {
          source,
          response,
          userType: this.state.userType,
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
                image: {uri: portfolioImagePath + item.image},
                data: item,
              },
              type: 'show',
              myphoto: true,
              userType: this.state.userType,
            })
          }
          activeOpacity={1}>
          <Image
            source={{
              uri:
                this.state.userType === 'Customer'
                  ? portCustImagePath + item.image
                  : portfolioImagePath + item.image,
            }}
            key={item.id}
            style={CommonStyle.portfolioImg}
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
              userType: this.state.userType,
            })
          }
          activeOpacity={1}>
          <Image
            source={{uri: portfolioImagePath + item.image}}
            key={item.id}
            style={[CommonStyle.portfolioImg]}
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
              userType: this.state.userType,
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
            style={CommonStyle.portfolioImg}
          />
        </TouchableOpacity>
      </View>
    );
  };
  async componentDidMount() {
    let token = await AsyncStorage.getItem('loginToken');
    if (token) {
      this.props.getPortfolioImage();
      if (this.state.userType === 'Customer') {
        this.props.getLikedPhoto();
      }
    }
  }
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
    let showProfileItem =
      portfolioList &&
      portfolioList.length > 0 &&
      portfolioList.filter((data, index) => {
        if (data.profile_hide === 0) {
          return data;
        }
      });
    return (
      <SafeAreaInsetsContext.Consumer>
        {(insets) => (
          <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
            <Spinner
              visible={getPortfolio || getLikedPhotoReq}
              textContent={'Loading...'}
              textStyle={{color: Colors.BackgroundGray}}
            />
            <View>
              <View style={[CommonStyle.profileCard]}>
                <View style={styles.ViewStyle1}>
                  {renderScreen === 'Myphoto' && (
                    <View>
                      <View
                        style={{
                          flex: 1,
                          display: 'flex',
                          justifyContent:
                            portfolioData && portfolioData.length === 1
                              ? 'flex-start'
                              : 'space-between',
                          alignItems: 'center',
                          flexDirection: 'row',
                        }}>
                        <View>
                          <TouchableOpacity
                            onPress={() => this.launchLibrary()}
                            activeOpacity={1}>
                            <View style={[styles.portfolioImg]}>
                              <Image
                                source={Images.Portfolio.Upload}
                                style={{height: 30, width: 30}}
                              />
                              <Text style={{marginTop: 10, fontSize: 12}}>
                                Upload Image
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
                              style={styles.TouchableOpacityStyle}
                              onPress={() =>
                                navigation.navigate('ViewImage', {
                                  item: portfolioData[0],
                                  type: 'show',
                                  myphoto: true,
                                  userType: this.state.userType,
                                })
                              }
                              activeOpacity={1}>
                              <Image
                                source={{
                                  uri:
                                    this.state.userType === 'Customer'
                                      ? portCustImagePath +
                                        portfolioData[0].image
                                      : portfolioImagePath +
                                        portfolioData[0].image,
                                }}
                                key={portfolioData[0].id}
                                style={CommonStyle.portfolioImg}
                              />
                            </TouchableOpacity>
                          </View>
                        )}
                        {portfolioData && portfolioData.length > 1 && (
                          <View>
                            <TouchableOpacity
                              style={styles.TouchableOpacityStyle}
                              onPress={() =>
                                navigation.navigate('ViewImage', {
                                  item: portfolioData[1],
                                  type: 'show',
                                  myphoto: true,
                                  userType: this.state.userType,
                                })
                              }
                              activeOpacity={1}>
                              <Image
                                source={{
                                  uri:
                                    this.state.userType === 'Customer'
                                      ? portCustImagePath +
                                        portfolioData[1].image
                                      : portfolioImagePath +
                                        portfolioData[1].image,
                                }}
                                key={portfolioData[1].id}
                                style={CommonStyle.portfolioImg}
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
                        <Text style={styles.textStyle}>Stylist photos</Text>
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
                        <Text style={styles.textStyle}>
                          Customer Own photos
                        </Text>
                        <FlatList
                          data={likedPhoto.cust_images}
                          showsVerticalScrollIndicator={false}
                          renderItem={({item, index}) =>
                            this.renderLikedPhoto(item, navigation, 2, insets)
                          }
                          horizontal={true}
                          contentContainerStyle={styles.contentContainerSty}
                          keyExtractor={(item) => item.id.toString()}
                        />
                      </View>
                    )}
                  {renderScreen === 'LikedPhoto' &&
                    likedPhoto &&
                    likedPhoto.pod_images.length > 0 && (
                      <View>
                        <Text style={styles.textStyle}>Photo of the day</Text>
                        <FlatList
                          data={likedPhoto.pod_images}
                          horizontal={true}
                          showsVerticalScrollIndicator={false}
                          renderItem={({item, index}) =>
                            this.renderLikedPhoto(item, navigation, 3, insets)
                          }
                          contentContainerStyle={
                            styles.contentContainerStyleNew
                          }
                          keyExtractor={(item) => item.user_id.toString()}
                        />
                      </View>
                    )}
                  {renderScreen === 'portfolio' && showProfileItem && (
                    <FlatList
                      data={showProfileItem}
                      scrollEnabled={false}
                      showsVerticalScrollIndicator={false}
                      renderItem={({item, index}) =>
                        this.renderStylistPortfolio(item, navigation, insets)
                      }
                      contentContainerStyle={{
                        flex: 1,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems:
                          showProfileItem.length === 1
                            ? 'flex-start'
                            : 'space-between',
                      }}
                      keyExtractor={(item) => item.id.toString()}
                      numColumns={3}
                    />
                  )}
                </View>
              </View>
            </View>
          </ScrollView>
        )}
      </SafeAreaInsetsContext.Consumer>
    );
  }
}
const styles = StyleSheet.create({
  portfolioImg: {
    height: 112,
    width: 112,
    borderRadius: 5,
    borderColor: Colors.ImageColor,
    borderStyle: 'dashed',
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 7,
    marginBottom: 3,
  },
  ViewStyle1: {
    padding: 5,
    marginLeft: -4,
  },
  TouchableOpacityStyle: {
    marginBottom: 3,
  },
  contentContainerStyleNew: {
    flex: 1,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contentContainerSty2: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  rowCont: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomColor: Colors.White,
    height: 45,
  },
  textStyle: {
    fontFamily: Fonts.HeveticaNowText_Black,
    fontSize: 15,
    padding: 20,
    alignSelf: 'center',
  },
  contentContainerSty: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  container: {
    marginVertical: 3,
    marginHorizontal: 1.4,
    marginLeft: 5,
    // Platform.OS === 'android' ? 7 : insets.top === 20 ? 3 : 18,
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

export default connect(mapStateToProps, mapDispatchToProps)(PortfolioData);
