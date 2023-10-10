/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {Images, Fonts, Colors} from '../../../constants';
import CommonStyle from '../../../constants/Style';
class ProfileCardTwo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageErr: false,
    };
  }
  render() {
    const {
      navigation,
      stylistImage,
      stylistData,
      reviewLength,
      reviewData,
      onLikeDislikeStylist,
      backImage,
      type,
    } = this.props;
    let sum = 0;
    if (reviewData) {
      for (let i = 0; i < reviewData.length; i++) {
        // eslint-disable-next-line radix
        sum = sum + parseInt(reviewData[i].rating);
      }
    }
    let rating = reviewLength ? Math.round(sum / reviewLength) : sum;

    console.log('stylistData @@', stylistData);
    return (
      <View style={styles.container}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() =>
            type !== 'preview' &&
            this.props.navigation.navigate('ViewImage', {
              userType: 'Guest',
              item: {
                image: backImage,
              },
            })
          }>
          <ImageBackground
            source={backImage}
            style={CommonStyle.backgroundStyle}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => navigation.goBack()}>
              <Image
                source={Images.Notification.BackArrow}
                style={[
                  CommonStyle.backArrow,
                  {
                    marginLeft: 15,
                    marginTop: Platform.OS === 'android' ? 20 : 40,
                  },
                ]}
              />
            </TouchableOpacity>
          </ImageBackground>
        </TouchableOpacity>
        <View style={styles.ProfileCard} imageStyle={styles.imageStyle1}>
          <View style={{padding: 10}}>
            <View style={styles.ViewCont}>
              <View style={(styles.leftCont, {marginLeft: 10})}>
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() =>
                    type !== 'preview' &&
                    navigation.navigate('ViewImage', {
                      item: {
                        image: this.state.imageErr
                          ? Images.CustomerHomeIcon.NoProfilePic
                          : stylistImage,
                        data: stylistData,
                        showLike: false,
                      },
                      userType: 'Customer',
                      type: '',
                    })
                  }>
                  {this.state.imageErr ? (
                    <Image
                      source={Images.CustomerHomeIcon.NoProfilePic}
                      style={styles.NoProfilePic_Img}
                    />
                  ) : (
                    <Image
                      onError={() => this.setState({imageErr: true})}
                      source={stylistImage}
                      style={styles.stylistImage_img}
                    />
                  )}
                </TouchableOpacity>
                <View style={[styles.viewAllCont]}>
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {
                      if (type === 'preview') {
                      } else if (type === 'guest') {
                        navigation.navigate('SignIn', {
                          userType: 'Customer',
                        });
                      } else {
                        navigation.navigate('ContactComp', {
                          stylistData: stylistData,
                        });
                      }
                    }}
                    style={{width: 35}}>
                    <Image
                      source={Images.StylistIcon.Message}
                      style={{height: 24, width: 24, marginLeft: 5}}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {
                      if (type === 'preview') {
                      } else if (type === 'guest') {
                        navigation.navigate('SignIn', {
                          userType: 'Customer',
                        });
                      } else {
                        onLikeDislikeStylist();
                      }
                    }}
                    style={{width: 30, marginStart: 5}}>
                    <Image
                      source={Images.StylistIcon.Like}
                      style={styles.like_icon}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.rightCont}>
                <Text style={[styles.NameText]}>
                  {stylistData.fname ||
                    (stylistData.other_data &&
                      stylistData.other_data.fname)}{' '}
                  {stylistData.lname ||
                    (stylistData.other_data && stylistData.other_data.lname)}
                </Text>

                <View style={[styles.viewAllCont]}>
                  <TouchableOpacity style={styles.OpacityStyle}>
                    <Image
                      onPress={() => {
                        if (type !== 'preview') {
                          navigation.navigate('ReviewComp', {name: 'review'});
                        }
                      }}
                      source={Images.StylistTemplate.Rating}
                      style={styles.Rating_img}
                    />
                    <Text style={styles.ratingText}>{rating}</Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.proStyle}>
                  {stylistData.profession ||
                    (stylistData.other_data &&
                      stylistData.other_data.profession)}
                </Text>
                <View style={styles.MapPin_view}>
                  <Image
                    source={Images.ProfileIcon.MapPin}
                    style={styles.MapPinStyle}
                  />
                  <Text style={[styles.proStyle]}>
                    {(stylistData.address_1 ||
                      (stylistData.other_data &&
                        stylistData.other_data.address_1)) +
                      ' ' +
                      (stylistData.city ||
                        (stylistData.other_data &&
                          stylistData.other_data.city)) +
                      ' , '}
                    {(stylistData.country === 'us' && 'USA') ||
                      (stylistData.other_data &&
                        stylistData.other_data.country === 'us' &&
                        'USA')}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
  },
  subText: {
    fontSize: 14,
    paddingTop: 5,
    fontFamily: Fonts.Lato_Bold,
    alignSelf: 'flex-end',
    color: Colors.Red,
  },
  imageStyle1: {
    height: '100%',
    width: '100%',
    borderRadius: 20,
  },
  OpacityStyle: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  ViewCont: {
    display: 'flex',
    flexDirection: 'row',
    height: '100%',
    alignItems: 'center',
  },
  Rating_img: {
    height: 15,
    width: 80,
  },
  NoProfilePic_Img: {
    height: 74,
    width: 74,
    borderRadius: 100,
  },
  stylistImage_img: {
    height: 74,
    width: 74,
    borderRadius: 50,
  },
  ratingText: {
    marginStart: 10,
    color: Colors.ButtonColor,
    bottom: 1.5,
  },
  MapPin_view: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  like_icon: {
    height: 24,
    width: 24,
  },
  ProfileCard: {
    height: 141,
    width: 343,
    backgroundColor: Colors.White,
    alignSelf: 'center',
    borderRadius: 8,
    marginTop: -60,
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
  },
  NameText: {
    fontSize: 16,
    fontFamily: Fonts.Lato_Bold,
    color: '#283A58',
  },
  viewAllCont: {
    width: '100%',
    flexDirection: 'row',
    alignSelf: 'flex-start',
    marginTop: 10,
  },
  proStyle: {
    fontSize: 12,
    fontFamily: Fonts.HeveticaNowText_Medium,
    fontStyle: 'italic',
    color: '#42403F',
    marginTop: 10,
    marginStart: 5,
    marginRight: 20,
  },
  starCont: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignSelf: 'center',
    width: '80%',
  },
  starStyle: {
    height: 12,
    width: 12,
  },
  MapPinStyle: {
    height: 15,
    width: 13,
    marginTop: 5,
  },
  rightCont: {
    flex: 1,
    marginStart: 15,
  },
  leftCont: {
    alignSelf: 'center',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
});
export default ProfileCardTwo;
