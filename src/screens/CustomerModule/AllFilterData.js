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

import {Images, Fonts, Colors} from '../.././constants';
import CommonStyle from '../.././constants/Style';
import {connect} from 'react-redux';
import {getNewsList} from '../.././redux/actions/homeAction';
import {imagePath} from '../.././constants/Config';
import {SafeAreaInsetsContext} from 'react-native-safe-area-context';
import SafeAreaView from 'react-native-safe-area-view';
const {height, width} = Dimensions.get('window');

class AllFilterData extends Component {
  renderPopularItem = (itemData, item, preIndex) => {
    console.log('AllFilter renderPopularItem', itemData);
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={styles.container}
        onPress={() => {
          this.props.navigation.navigate('StylistProfile', {
            stylist: itemData,
            userType: 'customer',
            // stylist: item,
            item: {uri: imagePath + item.profile_pic},
          });
        }}>
        <Image
          source={{uri: imagePath + itemData.profile_pic}}
          style={styles.profile_pic_img}
        />
        <View style={styles.NameCont}>
          <Text style={styles.NameText}>{itemData.fname + itemData.lname}</Text>
          <View style={styles.starCont}>
            <Image source={Images.StylistIcon.Star} style={styles.star_img} />
            <Text style={styles.avg_starsText}>{itemData.ratings}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    const {navigation, route} = this.props;
    console.log('AllFilter Data this.props', this.props);
    const objData = route.params.data;
    let filterData = [];
    Object.keys(objData).map((key) => filterData.push(objData[key]));
    console.log('AllFilter Data route.params.data', route.params.data);
    return (
      <SafeAreaView>
        <SafeAreaInsetsContext.Consumer>
          {(insets) => (
            <View style={[CommonStyle.notifyCont, styles.SubCont]}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                activeOpacity={1}>
                <Image
                  source={Images.SignUpIcon.BackArrow}
                  style={styles.BackArrowImg}
                />
              </TouchableOpacity>
              <View style={styles.titalCont}>
                <Text style={[CommonStyle.welcomeName]}>
                  {route.params.title}{' '}
                </Text>
              </View>
            </View>
          )}
        </SafeAreaInsetsContext.Consumer>

        <View style={[{minHeight: height - height / 5}]}>
          <View style={styles.FlatListCont}>
            {(filterData && filterData.length > 0 && (
              <FlatList
                data={filterData}
                scrollEnabled={true}
                showsVerticalScrollIndicator={false}
                renderItem={({item, index}) =>
                  this.renderPopularItem(item, index)
                }
              />
            )) || <Text>No data found</Text>}
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  NameText: {
    fontSize: 13,
    color: Colors.textDarkGray,
    textAlign: 'center',
    marginTop: 5,
  },
  FlatListCont: {
    padding: 10,
    marginTop: 10,
  },
  SubCont: {
    marginTop: Platform.OS === 'android' ? 12 : 0,
  },
  avg_starsText: {
    fontSize: 12,
    color: Colors.Pink,
    marginStart: 5,
  },
  BackArrowImg: {height: 20.5, width: 12, marginTop: 3},
  backgroundStyle: {
    height: Platform.OS === 'android' ? height / 3 + 20 : height / 4 + 20,
    width,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  profile_pic_img: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  starCont: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    marginEnd: 10,
  },
  titalCont: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  star_img: {
    height: 10,
    width: 10,
    tintColor: Colors.Pink,
  },
  NameCont: {
    alignItems: 'center',
    justifyContent: 'center',
    marginStart: 10,
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
    fontSize: 18,
    color: Colors.White,
    fontFamily: Fonts.HeveticaNowText_Medium,
  },
  subText: {
    fontSize: 14,
    color: Colors.LightBlack,
    fontFamily: Fonts.HeveticaNowText_Medium,
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
export default connect(mapStateToProps, mapDispatchToProps)(AllFilterData);
