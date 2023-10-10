/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
  FlatList,
  ImageBackground,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {Images, Fonts, Colors} from '../../../constants';
import ReviewCard from '../../../components/ReviewCard';
import {connect} from 'react-redux';
import {SafeAreaInsetsContext} from 'react-native-safe-area-context';
const {height, width} = Dimensions.get('window');
class ReviewComp extends Component {
  renderReviewData = (itemData) => {
    let {item, index} = itemData;

    return (
      <ReviewCard
        id={index}
        image={item.profile_pic}
        length={this.props.reviewList.data.length}
        starCount={item.rating}
        star={true}
        underLine={false}
        username={item.title}
        comment={item.content}
      />
    );
  };
  renderRecommendData = (itemData) => {
    let {item, index} = itemData;
    return (
      <ReviewCard
        id={index}
        image={item.profile_pic}
        underLine={false}
        length={this.props.recommendList.data.length}
        username={item.name}
        comment={item.content}
      />
    );
  };
  render() {
    const {navigation, route, reviewList, recommendList} = this.props;
    let screenName = route.params.name;
    return (
      <SafeAreaInsetsContext.Consumer>
        {(insets) => (
          <View>
            <ImageBackground
              source={Images.HomeIcon.RedBg}
              imageStyle={styles.RedBgStyle}
              style={[
                styles.backgroundStyle,
                {
                  height:
                    Platform.OS === 'android'
                      ? height / 3 + 20
                      : insets.top === 20
                      ? height / 3
                      : height / 4 + 20,
                },
              ]}>
              <View
                style={[
                  styles.notifyCont,
                  {
                    marginTop:
                      Platform.OS === 'android'
                        ? 50
                        : insets.top === 20
                        ? 40
                        : 60,
                  },
                ]}>
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  activeOpacity={1}>
                  <Image
                    source={Images.Notification.BackArrow}
                    style={{height: 20, width: 20}}
                  />
                </TouchableOpacity>
                <Text style={[styles.welcomeName, {marginRight: 25}]}>
                  {screenName === 'review' ? 'Reviews' : 'Recommendations'}{' '}
                </Text>
                <Text style={[styles.welcomeName, {fontSize: 16}]}> </Text>
              </View>
            </ImageBackground>
            <View style={styles.profileCard}>
              <ScrollView
                style={{height, flex: 1}}
                showsVerticalScrollIndicator={false}>
                <View style={{padding: 30}}>
                  {screenName === 'review' ? (
                    reviewList.data.length > 0 ? (
                      <FlatList
                        data={reviewList.data}
                        renderItem={this.renderReviewData}
                        keyExtractor={(item) => item.id.toString()}
                      />
                    ) : (
                      <Text style={styles.TextStyle}>
                        No review for current Stylist avaliable !
                      </Text>
                    )
                  ) : recommendList.data.length > 0 ? (
                    <FlatList
                      data={recommendList.data}
                      renderItem={this.renderRecommendData}
                      keyExtractor={(item) => item.id.toString()}
                    />
                  ) : (
                    <Text style={styles.TextStyle2}>
                      No recommendation for current Stylist avaliable !
                    </Text>
                  )}
                </View>
              </ScrollView>
            </View>
          </View>
        )}
      </SafeAreaInsetsContext.Consumer>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    padding: 40,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  backgroundStyle: {
    height: Platform.OS === 'android' ? height / 3 + 20 : height / 4 + 20,
    width,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  RedBgStyle: {
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  profileCard: {
    width: '90%',
    backgroundColor: '#ffffff',
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginBottom: 20,
    marginTop: -130,
    minHeight: height - height / 5,
  },
  TextStyle2: {
    fontFamily: Fonts.HeveticaNowText_Black,
    fontSize: 14,
    padding: 20,
    alignSelf: 'center',
  },
  TextStyle: {
    fontFamily: Fonts.HeveticaNowText_Black,
    fontSize: 14,
    padding: 20,
    alignSelf: 'center',
  },
  notifyCont: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
  },
  welcomeName: {
    marginTop: 15,
    fontSize: 14,
    color: Colors.White,
    fontFamily: Fonts.Lato_Medium,
  },
});
const mapStateToProps = (state) => {
  return {
    recommendList: state.StylistReducer.recommendList,
    reviewList: state.StylistReducer.reviewList,
  };
};

export default connect(mapStateToProps, null)(ReviewComp);
