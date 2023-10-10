/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {Images, Fonts, Colors} from '../../constants';
import {customerImagePath, imagePath} from '../../constants/Config';
class ReviewCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageErr: false,
      imageSno: '',
    };
  }
  renderStar = (startcount) => {
    let renderStarComp = [];
    for (let index = 0; index < startcount; index++) {
      renderStarComp.push(
        <Image source={Images.StylistIcon.Star} style={styles.StarIconStyle} />,
      );
    }
    return renderStarComp;
  };
  render() {
    const {
      navigation,
      username,
      comment,
      image,
      search,
      id,
      starCount,
      star,
      type,
      stylistData,
      template_type,
      guestUser,
    } = this.props;

    let sum = 0;
    if (starCount) {
      for (let i = 0; i < starCount.length; i++) {
        // eslint-disable-next-line radix
        sum = sum + parseInt(starCount[i].rating);
      }
    }
    // let rating = length ? Math.round(sum / length) : sum;
    console.log('ReviewCard starCount', starCount);
    return (
      <View style={styles.Container}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            if (type === 'stylist' && !guestUser) {
              navigation.navigate(
                template_type === 1 ? 'StylistProfile' : 'StylistProfileTwo',
                {
                  item: {uri: imagePath + image},
                  stylist: stylistData,
                  userType: 'preview',
                },
              );
            } else if (guestUser && guestUser === true) {
              navigation.navigate(
                template_type === 1
                  ? 'GuestStylistProfileOne'
                  : 'GuestStylistProfileTwo',
                {
                  item: {uri: imagePath + image},
                  stylist: stylistData,
                },
              );
            }
          }}>
          <View style={styles.viewAllCont}>
            {this.state.imageErr && this.state.imageSno === id ? (
              <Image
                source={Images.CustomerHomeIcon.NoProfilePic}
                style={styles.ImageSyles}
              />
            ) : (
              <Image
                onError={() => this.setState({imageErr: true, imageSno: id})}
                source={{
                  uri:
                    type === 'stylist'
                      ? imagePath + image
                      : customerImagePath + image,
                }}
                style={styles.ImageSyles}
              />
            )}
            <View style={[styles.MapView, {marginTop: search ? 30 : 0}]}>
              <Text style={styles.userText}>{username}</Text>
              {star && (
                <View style={styles.starCountStyle}>
                  {this.renderStar(starCount).map((item, index, rat) => {
                    return <View key={index}>{item}</View>;
                  })}
                  <View>
                    <Text style={styles.starCountText}>{starCount}</Text>
                  </View>
                </View>
              )}
            </View>
            <View style={styles.CommentView}>
              <Text style={styles.commentText}>{comment}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  Container: {
    marginTop: 10,
  },
  borderLine: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.BorderGray,
    marginTop: 20,
  },
  userText: {
    fontSize: 14,
    fontFamily: Fonts.Lato_Bold,
    color: Colors.Black,
  },
  starCountStyle: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    marginTop: 8,
  },
  CommentView: {
    margin: 10,
    bottom: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ImageSyles: {
    height: 32,
    width: 32,
    borderRadius: 15,
    margin: 10,
  },
  starCountText: {
    marginStart: 10,
    bottom: 3.5,
    color: Colors.ButtonColor,
  },
  MapView: {
    flex: 1,
    marginLeft: 60,
    bottom: 44,
    height: '100%',
  },
  commentText: {
    fontSize: 12,
    fontFamily: Fonts.HeveticaNowText_Medium,
    color: Colors.LightBlack,
    marginTop: 10,
  },
  viewAllCont: {
    backgroundColor: '#FFFFFF',
    width: 200,
    height: 118,
    borderRadius: 8,
    margin: 3,
    elevation: 2,
    shadowRadius: 2,
    shadowOpacity: 0.2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
  },
  StarIconStyle: {
    width: 8.9,
    height: 8.27,
    margin: 2,
    tintColor: '#790A13',
  },
});
export default ReviewCard;
