import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  ImageBackground,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {Images, Fonts, Colors} from '../../../constants';
import CommonStyle from '../../../constants/Style';
const {height} = Dimensions.get('window');

class ProfileCard extends Component {
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
    // let bgImage = Images.StylistTemplate.TemplateTwo;
    console.log('2 reviewLength template type 2', stylistData);
    console.log('onLikeDislikeStylist 000000', onLikeDislikeStylist);

    return (
      <View>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            type !== 'preview' &&
              this.props.navigation.navigate('ViewImage', {
                userType: 'Guest',
                item: {
                  image: backImage,
                },
              });
          }}>
          <ImageBackground
            source={backImage}
            style={[
              CommonStyle.backgroundStyle,
              {
                height:
                  Platform.OS === 'android' ? height / 3 - 10 : height / 4 + 20,
              },
            ]}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => navigation.goBack()}>
              <Image
                source={Images.Notification.BackArrow}
                style={[
                  CommonStyle.backArrow,
                  // eslint-disable-next-line react-native/no-inline-styles
                  {
                    marginLeft: 15,
                    marginTop: Platform.OS === 'android' ? 20 : 50,
                  },
                ]}
              />
            </TouchableOpacity>
          </ImageBackground>
        </TouchableOpacity>
        <ImageBackground
          style={styles.ProfileCard}
          source={Images.CustomerHomeIcon.BgImage}
          imageStyle={styles.imageStyle1}>
          <View style={styles.subCont}>
            <View style={[styles.viewAllCont, styles.style2]}>
              <TouchableOpacity
                activeOpacity={1}
                style={styles.OpacityStyle}
                onPress={() => {
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
                    });
                }}>
                {this.state.imageErr ? (
                  <Image
                    source={Images.CustomerHomeIcon.NoProfilePic}
                    style={styles.NoProfilePic_img}
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
                  style={styles.Message_Cont}>
                  <Image
                    source={Images.StylistIcon.Message}
                    style={styles.Message_img}
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
                  style={styles.styleCont}>
                  <Image
                    source={Images.StylistIcon.Like}
                    style={styles.Like_img}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.View_cont3}>
              <Text style={[styles.NameText]}>
                {stylistData.fname ||
                  (stylistData.other_data && stylistData.other_data.fname)}{' '}
                {stylistData.lname ||
                  (stylistData.other_data && stylistData.other_data.lname)}
              </Text>
            </View>

            <View style={[styles.viewAllCont, styles.style1]}>
              <TouchableOpacity style={styles.OpacityStyle2}>
                <Image
                  onPress={() => {
                    if (type !== 'preview') {
                      navigation.navigate('ReviewComp', {name: 'review'});
                    }
                  }}
                  source={Images.StylistTemplate.Rating}
                  style={styles.rating_img}
                />
                <Text style={styles.rating_text}>
                  {rating || stylistData.ratings}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.View_cont2}>
              <Text style={styles.proStyle}>
                {stylistData.profession ||
                  (stylistData.other_data && stylistData.other_data.profession)}
              </Text>
            </View>
            <View style={styles.View_cont}>
              <View style={styles.MapPin_View}>
                <Image
                  source={Images.ProfileIcon.MapPin}
                  style={styles.MapPin_img}
                />
                <Text style={styles.address_text}>
                  {(stylistData.address_1 ||
                    (stylistData.other_data &&
                      stylistData.other_data.address_1)) +
                    ' ' +
                    (stylistData.city ||
                      (stylistData.other_data && stylistData.other_data.city)) +
                    ' , '}
                  {(stylistData.country === 'us' && 'USA') ||
                    (stylistData.other_data &&
                      stylistData.other_data.country === 'us' &&
                      'USA')}
                </Text>
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  subText: {
    fontSize: 14,
    paddingTop: 5,
    fontFamily: Fonts.Lato_Bold,
    alignSelf: 'flex-end',
    color: Colors.Red,
  },
  styleCont: {
    width: 20,
    marginStart: 10,
    bottom: 8,
  },
  subCont: {
    padding: 10,
  },
  Message_Cont: {
    width: 20,
    paddingBottom: 50,
  },
  View_cont3: {
    marginTop: 5,
  },
  Like_img: {
    height: 24,
    width: 24,
  },
  stylistImage_img: {
    height: 74,
    width: 74,
    borderRadius: 100,
  },
  Message_img: {
    height: 24,
    width: 24,
    bottom: 8,
  },
  View_cont2: {
    alignItems: 'center',
  },
  OpacityStyle2: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  ProfileCard: {
    height: 214,
    width: 343,
    backgroundColor: Colors.White,
    alignSelf: 'center',
    borderRadius: 8,
    marginTop: -50,
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
  },
  style2: {
    marginTop: 10,
    flexDirection: 'row',
  },
  imageStyle1: {
    height: '100%',
    width: '100%',
    borderRadius: 20,
  },
  NameText: {
    fontSize: 16,
    color: '#283A58',
    fontFamily: Fonts.Lato_Semibold,
    textAlign: 'center',
  },
  style1: {
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  rating_img: {
    height: 8,
    width: 44,
    marginTop: 3,
  },
  NoProfilePic_img: {
    height: 74,
    width: 74,
    borderRadius: 100,
  },
  OpacityStyle: {
    flex: 1,
    alignItems: 'center',
    paddingStart: 45,
    marginTop: -5,
  },
  View_cont: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  MapPin_View: {
    textAlign: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    width: 220,
  },
  rating_text: {
    marginStart: 10,
    color: Colors.ButtonColor,
    marginTop: -2,
  },
  MapPin_img: {
    height: 15,
    width: 13,
    bottom: -4,
    marginRight: 3,
  },
  address_text: {
    fontSize: 12,
    marginTop: 3,
    marginStart: 3,
    fontFamily: Fonts.HeveticaNowText_Regular,
    fontStyle: 'italic',
    color: Colors.ButtonColor,
  },
  viewAllCont: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
  },
  proStyle: {
    fontSize: 14,
    marginStart: 0,
    fontFamily: Fonts.HeveticaNowText_Medium,
    color: Colors.LightBlack,
    textAlign: 'center',
  },
  cardStyle: {
    backgroundColor: Colors.Red,
    height: 100,
    width: 80,
    borderRadius: 10,
  },
  innerCardStyle: {
    alignSelf: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
    height: '90%',
    padding: 10,
  },
  text1Style: {
    color: Colors.White,
    fontSize: 16,
    fontFamily: Fonts.Lato_Bold,
  },
  text2Style: {
    color: Colors.White,
    fontSize: 14,
    fontFamily: Fonts.HeveticaNowText_Medium,
  },
});
export default ProfileCard;
