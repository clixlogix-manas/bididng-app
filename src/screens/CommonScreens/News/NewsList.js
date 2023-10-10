import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  FlatList,
  Platform,
} from 'react-native';
import {Images, Fonts, Colors} from '../../../constants';
import CommonStyle from '../../../constants/Style';
import {connect} from 'react-redux';
import {getNewsList} from '../../../redux/actions/homeAction';
import {newsPath} from '../../../constants/Config';
import {SafeAreaInsetsContext} from 'react-native-safe-area-context';
import SafeAreaView from 'react-native-safe-area-view';
const {height, width} = Dimensions.get('window');
class NewsLists extends Component {
  renderNewItem = (item, navigation) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('NewsDetails', {
            data: item,
            userType: this.props.route.params.userType,
          })
        }
        activeOpacity={1}>
        <View style={styles.ImageCont}>
          <Image
            source={{uri: newsPath + item.featured_img}}
            key={item.id}
            style={styles.ImageStyle}
          />
          <Text style={[styles.subText]}>{item.title}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  render() {
    const {navigation, route} = this.props;
    return (
      <SafeAreaView style={styles.container}>
        {/* <ImageBackground
          source={Images.HomeIcon.RedBg}
          imageStyle={{
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
          }}
          style={styles.backgroundStyle}> */}
        <SafeAreaInsetsContext.Consumer>
          {(insets) => (
            <View style={[CommonStyle.notifyCont, styles.goBackCont]}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                activeOpacity={1}>
                <Image
                  source={Images.SignUpIcon.BackArrow}
                  style={styles.BackArrowImg}
                />
              </TouchableOpacity>
              <View style={styles.headingCont}>
                <Text style={[CommonStyle.NewsName]}>News </Text>
              </View>
            </View>
          )}
        </SafeAreaInsetsContext.Consumer>
        {/* </ImageBackground> */}
        <View style={[CommonStyle.profileCard, styles.newsListCont]}>
          <View>
            {route.params.newsList && route.params.newsList.news && (
              <FlatList
                style={styles.FlatListSty}
                data={route.params.newsList.news}
                scrollEnabled={true}
                showsVerticalScrollIndicator={false}
                renderItem={({item, index}) =>
                  this.renderNewItem(item, navigation)
                }
                contentContainerStyle={styles.contentContainerSty}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
              />
            )}
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F9F9F9',
  },
  backgroundStyle: {
    height: Platform.OS === 'android' ? height / 3 + 20 : height / 4 + 20,
    width,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  notifyCont: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
  },
  ImageStyle: {
    height: 115,
    width: 160,
    borderRadius: 4,
  },
  FlatListSty: {
    backgroundColor: '#F9F9F9',
  },
  BackArrowImg: {
    height: 20.5,
    width: 12,
  },
  headingCont: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    marginTop: 10,
    marginBottom: 10,
    marginRight: 6,
  },
  newsListCont: {
    marginTop: 10,
    backgroundColor: '#F9F9F9',
    minHeight: height - height / 5,
  },
  goBackCont: {
    backgroundColor: '#F9F9F9',
    paddingTop: Platform.OS === 'android' ? 10 : 0,
  },
  contentContainerSty: {
    justifyContent: 'flex-start',
    alignItems: 'baseline',
  },
  ImageCont: {
    marginBottom: 20,
    marginHorizontal: Platform.OS === 'android' ? 10 : 10,
  },
  welcomeName: {
    fontSize: 18,
    color: Colors.White,
    fontFamily: Fonts.HeveticaNowText_Medium,
  },
  subText: {
    fontSize: 14,
    color: Colors.LightBlack,
    fontFamily: Fonts.HeveticaNowText_Medium,
    alignItems: 'flex-start',
    width: 160,
    textAlign: 'center',
    marginTop: 10,
  },
});
const mapStateToProps = (state) => {
  return {
    newsList: state.HomeReducer.newsList,
    getNewsListSuccess: state.HomeReducer.getNewsListSuccess,
    getNewsList: state.HomeReducer.getNewsList,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getNewsList: () => dispatch(getNewsList()),
});
export default connect(mapStateToProps, mapDispatchToProps)(NewsLists);
