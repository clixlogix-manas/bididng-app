import React, {useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  FlatList,
  StyleSheet,
  Dimensions,
  Image,
  StatusBar,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {SafeAreaInsetsContext} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import Colors from '../../constants/Colors';
import CommonStyle from '../../constants/Style';
import Images from '../../constants/Images';
import {
  getAllStylist,
  getNewsList,
  getPhotoOfTheDay,
} from '../../redux/actions/homeAction';
const {height} = Dimensions.get('window');
import {
  BASE_URL,
  imagePath,
  newsPath,
  stylistBasepath,
} from '../../constants/Config';
import Fonts from '../../constants/Fonts';
import Axios from 'axios';
import {
  getPopularStylist,
  getPopularBarber,
} from '../../redux/actions/homeAction';
import {getStylistServiceCatSuccess} from '../../redux/actions/serviceAction';
import SafeAreaView from 'react-native-safe-area-view';

const GuestHome = (props) => {
  const {
    photoOfTheDay,
    getPhotoOfTheDayReq,
    getNewsListReq,
    newsList,
    getAllStylistReq,
    popularStylistList,
    popularBarberList,
  } = useSelector((state) => ({
    photoOfTheDay: state.HomeReducer.photoOfTheDay,
    getPhotoOfTheDayReq: state.HomeReducer.getPhotoOfTheDay,
    getNewsListReq: state.HomeReducer.getNewsList,
    newsList: state.HomeReducer.newsList,
    getAllStylistReq: state.HomeReducer.getAllStylist,
    popularStylistList: state.HomeReducer.popularStylistList,
    popularBarberList: state.HomeReducer.popularBarberList,
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPhotoOfTheDay());
    dispatch(getNewsList());
    dispatch(getAllStylist());

    let formdataPS = new FormData();
    formdataPS.append('type', 'stylist');
    dispatch(getPopularStylist(formdataPS));

    let formdataPB = new FormData();
    formdataPB.append('type', 'barber');
    dispatch(getPopularBarber(formdataPB));

    Axios.get(stylistBasepath + 'servicecatlist', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    }).then((res) => {
      if (res.status === 200) {
        dispatch(getStylistServiceCatSuccess(res.data.service_cats));
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {}, [popularStylistList]);

  const goToSearch = () => {
    props.navigation.navigate('GuestSearch', {
      userType: 'Guest',
    });
  };

  const renderNews = (itemData, navigation) => {
    let item = itemData.item;

    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() =>
          props.navigation.navigate('NewsDetails', {
            data: item,
            userType: 'Barber',
          })
        }>
        <Image
          source={{uri: newsPath + item.featured_img}}
          key={item.id}
          style={styles.ImageStyle}
        />
      </TouchableOpacity>
    );
  };
  const renderPopularItem = (itemData, preIndex) => {
    let {item} = itemData;

    return (
      <TouchableOpacity
        activeOpacity={1}
        style={styles.opacityStyle}
        onPress={() => {
          props.navigation.navigate('StylistProfile', {
            stylist: item,
            item: {uri: imagePath + item.profile_pic},
            userType: 'guest',
          });
        }}>
        <Image
          source={{uri: imagePath + item.profile_pic}}
          style={styles.profile_picImg}
        />
        <Text style={styles.NameText}>{item.fname + ' ' + item.lname}</Text>
        <View style={styles.StarView}>
          <Image source={Images.StylistIcon.Star} style={styles.StarStyle} />
          <Text style={styles.avg_stars_Text}>{item.avg_stars}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaInsetsContext.Consumer>
      {(insets) => (
        <SafeAreaView style={styles.SafeAreaView_style}>
          <StatusBar backgroundColor="gray" barStyle="dark-content" />
          <Spinner
            visible={getPhotoOfTheDayReq || getNewsListReq || getAllStylistReq}
            textContent={'Loading...'}
            textStyle={{color: Colors.BackgroundGray}}
          />
          <ScrollView
            style={styles.ScrollView_style}
            showsVerticalScrollIndicator={false}>
            <View>
              <View style={[styles.ViewCont2]}>
                <View style={[styles.HomeBgLogo3_View]}>
                  <Image
                    style={styles.HomeBgLogo3_Style}
                    resizeMode={'stretch'}
                    source={Images.HomeIcon.HomeBgLogo3}
                  />
                  {/* </View> */}
                  <View style={styles.flex1} />
                  <TouchableOpacity
                    style={styles.navigation_Style}
                    onPress={() =>
                      props.navigation.navigate('Notification', {
                        userType: 'Guest',
                      })
                    }
                    activeOpacity={1}>
                    <Image
                      source={Images.HomeIcon.OffNotifyIcon}
                      style={styles.OffNotifyIconStyle}
                    />
                  </TouchableOpacity>
                </View>

                <View style={styles.helloView}>
                  <Text style={[styles.helloText]}>{'Hello '}</Text>
                  <Text style={styles.GuestTeat}>{'Guest'}</Text>
                </View>

                <View style={styles.ViewCont3}>
                  <TouchableOpacity style={styles.searchInput}>
                    <TouchableOpacity onPress={goToSearch}>
                      <Image
                        style={styles.SearchImage}
                        source={Images.InvoiceIcon.Search}
                      />
                    </TouchableOpacity>

                    <Text
                      //  placeholder={' Search barber/stylist'}
                      // editable={false}
                      style={styles.SearchTextSty}
                      name="search"
                      onPress={goToSearch}>
                      {' Search barber/stylist'}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() =>
                      props.navigation.navigate('Filter', {
                        userType: 'Guest',
                      })
                    }
                    style={styles.FilterStyle}>
                    <Image
                      style={styles.FilterImage}
                      source={Images.HomeIcon.Filter}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={[CommonStyle.container, styles.container2]}>
                <View style={styles.ViewCont}>
                  <Text style={styles.stylistText}>Popular Stylist</Text>
                  <TouchableOpacity
                    onPress={() =>
                      props.navigation.navigate('SeeMoreList', {
                        data: popularStylistList,
                        title: 'Popular Stylist',
                        userType: 'guest',
                      })
                    }>
                    <Text style={styles.SeeAll_Text2}>See all</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.ViewMargin}>
                  <FlatList
                    horizontal={true}
                    data={popularStylistList}
                    renderItem={(item, index) => renderPopularItem(item, index)}
                    keyExtractor={(item) => item.id.toString()}
                  />
                </View>

                <View style={styles.BarberTextView}>
                  <Text style={styles.BarberText}>Popular Barber</Text>
                  <TouchableOpacity
                    onPress={() =>
                      props.navigation.navigate('SeeMoreList', {
                        data: popularBarberList,
                        title: 'Popular Barber',
                        userType: 'guest',
                      })
                    }>
                    <Text style={styles.SeeAll_Text}>See all</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.ViewMargin}>
                  <FlatList
                    horizontal={true}
                    data={popularBarberList}
                    renderItem={(item, index) => renderPopularItem(item, index)}
                    keyExtractor={(item) => item.id.toString()}
                  />
                </View>

                <View style={styles.ViewHight} />

                <View style={[CommonStyle.viewAllCont, styles.Text_View]}>
                  <Text style={CommonStyle.dayText}>Photo of the Day</Text>
                </View>

                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => {
                    props.navigation.navigate('ViewImage', {
                      userType: 'Guest',
                      item: {
                        image: photoOfTheDay
                          ? {
                              uri:
                                BASE_URL + '/storage' + photoOfTheDay.img_path,
                            }
                          : Images.Haicut.Haircut1,
                      },
                    });
                  }}>
                  <Image
                    source={
                      photoOfTheDay
                        ? {
                            uri: BASE_URL + '/storage' + photoOfTheDay.img_path,
                          }
                        : Images.Haicut.Haircut1
                    }
                    style={styles.ImageStyle2}
                  />
                </TouchableOpacity>
                <View style={[CommonStyle.viewAllCont, styles.View_style]}>
                  <Text style={CommonStyle.dayText}>Latest news for you</Text>
                  <TouchableOpacity
                    onPress={() =>
                      props.navigation.navigate('NewsLists', {
                        userType: 'Customer',
                        newsList: newsList,
                      })
                    }
                    activeOpacity={1}>
                    <View style={CommonStyle.viewAllBtn}>
                      <Text
                        style={
                          (CommonStyle.viewAllFont,
                          {color: Colors.ButtonColor, fontSize: 13})
                        }>
                        View all
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
                {newsList && (
                  <FlatList
                    data={newsList.news}
                    renderItem={(item) => renderNews(item, props.navigation)}
                    keyExtractor={(item) => item.id.toString()}
                    horizontal={true}
                  />
                )}
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      )}
    </SafeAreaInsetsContext.Consumer>
  );
};

const styles = StyleSheet.create({
  searchText: {
    fontSize: 15,
    fontFamily: Fonts.Lato_Heavy,
  },
  OffNotifyIconStyle: {
    height: 20,
    width: 20,
    marginTop: 0,
    tintColor: Colors.ButtonColor,
  },
  container2: {
    paddingBottom: 100,
  },
  SearchImage: {
    height: 20,
    width: 20,
    marginStart: 10,
  },
  ViewHight: {
    height: 100,
  },
  View_style: {
    marginTop: 20,
    marginBottom: 10,
  },
  ViewMargin: {
    marginTop: 10,
  },
  flex1: {
    flex: 1,
  },
  Text_View: {
    marginTop: 20,
    marginBottom: 10,
  },
  helloView: {
    marginLeft: 10,
    flexDirection: 'row',
  },
  FilterImage: {
    height: 15,
    width: 20,
  },
  StarView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },
  ViewCont3: {
    flexDirection: 'row',
    padding: 10,
  },
  SafeAreaView_style: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  ScrollView_style: {
    flex: 1,
    height,
    backgroundColor: Colors.White,
  },
  opacityStyle: {
    marginEnd: 10,
    alignItems: 'center',
  },
  avg_stars_Text: {
    fontSize: 12,
    color: Colors.Pink,
    marginStart: 5,
  },
  NameText: {
    fontSize: 13,
    color: Colors.textDarkGray,
    width: 70,
    textAlign: 'center',
    marginTop: 5,
  },
  StarStyle: {
    height: 10,
    width: 10,
    tintColor: Colors.Pink,
  },
  navigation_Style: {
    height: 30,
    width: 30,
    backgroundColor: Colors.White,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  ViewCont2: {
    backgroundColor: Colors.Black,
    height: 150,
  },
  HomeBgLogo3_View: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
    height: 40,
  },
  profile_picImg: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  HomeBgLogo3_Style: {
    height: 40,
    width: 160,
    alignSelf: 'flex-start',
  },
  BarberText: {
    fontFamily: Fonts.Lato_Bold,
    color: Colors.Black,
    fontSize: 15,
  },
  GuestTeat: {
    fontFamily: Fonts.Lato_Semibold,
    fontSize: 16,
    textAlign: 'center',
    color: Colors.White,
  },
  helloText: {
    fontFamily: Fonts.Lato_Semibold,
    fontSize: 16,
    textAlign: 'center',
    color: Colors.White,
  },
  SearchTextSty: {
    fontFamily: Fonts.HeveticaNowText_Regular,
    flex: 1,
    color: '#A0A3BD',
  },
  stylistText: {
    fontFamily: Fonts.Lato_Bold,
    color: Colors.Black,
    fontSize: 15,
  },
  BarberTextView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  ViewCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  FilterStyle: {
    height: 40,
    width: 40,
    backgroundColor: Colors.White,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  SeeAll_Text2: {
    fontFamily: Fonts.HeveticaNowText_Medium,
    color: Colors.ButtonColor,
    fontSize: 13,
  },
  searchCont: {
    height: 80,
    marginTop: -45,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    width: '90%',
    backgroundColor: Colors.White,
    borderRadius: 50,
  },
  SeeAll_Text: {
    fontFamily: Fonts.HeveticaNowText_Medium,
    color: Colors.ButtonColor,
    fontSize: 13,
  },
  searchInput: {
    flex: 1,
    backgroundColor: Colors.White,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    height: 40,
    marginEnd: 10,
  },
  ImageStyle: {
    height: 80,
    width: 120,
    borderRadius: 5,
    margin: 5,
  },
  ImageStyle2: {
    height: 160,
    width: '100%',
    borderRadius: 10,
    alignSelf: 'center',
  },
});
export default GuestHome;
