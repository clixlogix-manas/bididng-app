import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {Images, Fonts, Colors} from '../../../constants';
import Appointment from '../../../components/Appointment';
import CommonStyle from '../../../constants/Style';
import SafeAreaView from 'react-native-safe-area-view';
import {BASE_URL, imagePath, newsPath} from '../../../constants/Config';
import {SafeAreaInsetsContext} from 'react-native-safe-area-context';
import {sortByDate} from '../../../constants/utilities/utilities';
import RenderList from '../../../components/FlatListItem';
const {height} = Dimensions.get('window');

class CustomerHomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedScreen: 'Home',
      imageArr: [],
      favimageArr: [],
      popularStylist: [1, 2, 3],
    };
  }

  renderAppointItem = (itemData, preIndex) => {
    let {item, index} = itemData;
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          this.props.navigation.navigate('AppointmentByType', {
            type: 'Upcoming',
            item: item,
            userType: 'Customer',
          });
        }}>
        <Appointment
          user={item.provider_data.fname + ' ' + item.provider_data.lname}
          length={this.props.appointmentData.bookings.length}
          amount={item.service_charge}
          day={item.date_time.split(' ')[0]}
          time={item.date_time.split(' ')[1]}
          profession={item.service_name}
          id={index}
        />
      </TouchableOpacity>
    );
  };

  renderPopularItem = (itemData, preIndex) => {
    let {item} = itemData;
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={styles.TouchableOpacityStyle}
        onPress={() => {
          this.props.navigation.navigate('StylistProfile', {
            stylist: item,
            item: {uri: imagePath + item.profile_pic},
            userType: 'customer',
          });
        }}>
        <Image
          source={{uri: imagePath + item.profile_pic}}
          style={styles.profile_pic_img}
        />
        <Text style={styles.NameStyle}>{item.fname + ' ' + item.lname}</Text>

        <View style={styles.starCont}>
          <Image source={Images.StylistIcon.Star} style={styles.starImg} />
          <Text style={styles.avg_starsText}>{item.avg_stars}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  goToSearch = () => {
    this.props.navigation.navigate('GuestSearch', {
      userType: 'Customer',
    });
  };

  render() {
    const {
      navigation,
      userInfo,
      stylistList,
      appointmentData,
      photoOfTheDay,
      notificationData,
      newsList,
      popularStylistList,
      popularBarberList,
    } = this.props;
    let filterAppointment =
      appointmentData &&
      appointmentData.bookings &&
      appointmentData.bookings.filter((item) => {
        if (
          item.status === 5 &&
          item.type === 'online' &&
          new Date(item.date_time).getTime() >= new Date().getTime()
        ) {
          return item;
        } else if (
          item.status === 2 &&
          item.type === 'cash' &&
          new Date(item.date_time).getTime() >= new Date().getTime()
        ) {
          return item;
        }
      });
    if (filterAppointment && filterAppointment.length > 0) {
      filterAppointment.sort(sortByDate);
    }
    // eslint-disable-next-line no-unused-vars
    let featuredStylist =
      stylistList &&
      Object.values(stylistList).filter((item, index) => {
        if (item.is_featured) {
          return item;
        }
      });
    console.log('this,props===>', this.props);
    console.log(' popularBarberList ===>>', popularBarberList);
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor="gray" barStyle="dark-content" />
        <ScrollView
          style={styles.ScrollViewStyle}
          showsVerticalScrollIndicator={false}>
          <View>
            <SafeAreaInsetsContext.Consumer>
              {(insets) => (
                <View style={[styles.cont]}>
                  <View style={[styles.ViewCont4]}>
                    <View style={styles.ImageCont}>
                      <Image
                        style={styles.ImageStyle}
                        resizeMode={'contain'}
                        source={Images.HomeIcon.CustomerBlackBgLogo}
                      />
                    </View>
                    <TouchableOpacity
                      style={styles.Notif_style}
                      onPress={() =>
                        navigation.navigate('Notification', {
                          userType: 'Customer',
                        })
                      }
                      activeOpacity={1}>
                      <Image
                        source={
                          notificationData && notificationData.data.length > 0
                            ? Images.HomeIcon.NotifyIcon
                            : Images.HomeIcon.OffNotifyIcon
                        }
                        style={styles.style2}
                      />
                    </TouchableOpacity>
                  </View>

                  <View style={styles.ViewCont3}>
                    <Text style={[styles.helloText]}>{'Hello '}</Text>
                    <Text style={styles.NameText}>
                      {userInfo && userInfo.user_data
                        ? userInfo.user_data.fname
                        : ''}
                    </Text>
                  </View>

                  <View style={styles.ViewCont2}>
                    <View style={styles.searchInput}>
                      <TouchableOpacity>
                        <Image
                          style={styles.searchImg}
                          source={Images.InvoiceIcon.Search}
                        />
                      </TouchableOpacity>

                      <Text
                        style={styles.SearchText}
                        name="search"
                        onPress={this.goToSearch}>
                        {' Search barber/stylist'}
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('Filter', {
                          userType: 'Customer',
                        })
                      }
                      style={styles.FilterCont}>
                      <Image
                        style={styles.filtersty}
                        source={Images.HomeIcon.Filter}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </SafeAreaInsetsContext.Consumer>

            <View style={styles.stylistCont}>
              <View style={styles.popularStylistView}>
                <Text style={styles.popularStylistText}>Popular Stylist</Text>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('SeeMoreList', {
                      data: popularStylistList,
                      title: 'Popular Stylist',
                      userType: 'customer',
                    })
                  }>
                  <Text style={styles.SeeAllText2}>See all</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.FlatListView2}>
                <FlatList
                  horizontal={true}
                  data={popularStylistList}
                  renderItem={(item, index) =>
                    this.renderPopularItem(item, index)
                  }
                  keyExtractor={(item) => item.id.toString()}
                />
              </View>
              {/* <View style={{ height: 100 }} /> */}

              <View style={styles.popularBarberView}>
                <Text style={styles.popularBarbersty}>Popular Barber</Text>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('SeeMoreList', {
                      data: popularBarberList,
                      title: 'Popular Barber',
                      userType: 'customer',
                    })
                  }>
                  <Text style={styles.SeeAllText}>See all</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.FlatListView}>
                <FlatList
                  horizontal={true}
                  data={popularBarberList}
                  renderItem={(item, index) =>
                    this.renderPopularItem(item, index)
                  }
                  // keyExtractor={(item) => item.id.toString()}
                />
              </View>

              <View style={[CommonStyle.viewAllCont, styles.ViewCont]}>
                <Text style={CommonStyle.dayText}>Photo of the Day</Text>
              </View>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() =>
                  navigation.navigate('ViewImage', {
                    item: {
                      image: photoOfTheDay
                        ? {
                            uri: BASE_URL + '/storage' + photoOfTheDay.img_path,
                          }
                        : Images.Haicut.Haircut1,
                      data: photoOfTheDay,
                    },
                    type: 'show',
                    photooftheday: true,
                    userType: 'Customer',
                  })
                }>
                <Image
                  source={
                    photoOfTheDay
                      ? {
                          uri: BASE_URL + '/storage' + photoOfTheDay.img_path,
                        }
                      : Images.Haicut.Haircut1
                  }
                  style={styles.imgStyle}
                />
              </TouchableOpacity>

              <RenderList
                path={'NewsLists'}
                userType={'Customer'}
                type={'news'}
                title={'Latest news for you'}
                onpress={true}
                items={newsList ? newsList.news : null}
                navigateData={newsList}
                navigation={navigation}
                imagePath={newsPath}
                style={{color: Colors.ButtonColor}}
                itemPath={'NewsDetails'}
                errMsg={'No news added yet !'}
              />

              <View style={styles.style1} />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subText: {
    fontSize: 14,
    padding: 15,
    fontFamily: Fonts.HeveticaNowText_Medium,
    color: Colors.White,
  },
  searchImg: {
    height: 20,
    width: 20,
    marginStart: 10,
  },
  NameStyle: {
    fontSize: 13,
    color: Colors.textDarkGray,
    width: 70,
    textAlign: 'center',
    marginTop: 5,
  },
  starImg: {
    height: 10,
    width: 10,
    tintColor: Colors.Pink,
  },
  avg_starsText: {
    fontSize: 12,
    color: Colors.Pink,
    marginStart: 5,
  },
  starCont: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },
  ImageStyle: {
    height: 30,
    width: 150,
  },
  ScrollViewStyle: {
    flex: 1,
    height,
  },
  cont: {
    backgroundColor: Colors.ButtonColor,
    height: 150,
  },
  ViewCont4: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  },
  ImageCont: {
    width: 100,
  },
  Notif_style: {
    height: 30,
    width: 30,
    backgroundColor: Colors.White,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  helloText: {
    fontFamily: Fonts.HeveticaNowText_Regular,
    fontSize: 16,
    textAlign: 'center',
    color: Colors.White,
  },
  ViewCont3: {
    marginLeft: 15,
    flexDirection: 'row',
  },
  NameText: {
    fontFamily: Fonts.HeveticaNowText_Regular,
    fontSize: 16,
    textAlign: 'center',
    color: Colors.White,
  },
  ViewCont2: {
    flexDirection: 'row',
    padding: 10,
  },
  popularBarbersty: {
    fontFamily: Fonts.HeveticaNowText_Medium,
    color: Colors.Black,
    fontSize: 15,
  },
  popularStylistText: {
    fontFamily: Fonts.HeveticaNowText_Medium,
    color: Colors.Black,
    fontSize: 16,
  },
  filtersty: {
    height: 15,
    width: 20,
  },
  stylistCont: {
    flex: 1,
    marginHorizontal: 10,
  },
  style2: {
    height: 20,
    width: 20,
    tintColor: Colors.ButtonColor,
  },
  SearchText: {
    fontFamily: Fonts.HeveticaNowText_Regular,
    flex: 1,
    color: '#A0A3BD',
  },
  SeeAllText2: {
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
  popularStylistView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  FilterCont: {
    height: 40,
    width: 40,
    backgroundColor: Colors.White,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  ViewCont: {
    marginTop: 20,
    marginBottom: 10,
  },
  FlatListView2: {marginTop: 10},
  SeeAllText: {
    fontFamily: Fonts.HeveticaNowText_Regular,
    color: Colors.ButtonColor,
    fontSize: 13,
  },
  popularBarberView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  FlatListView: {
    marginTop: 10,
  },
  imgStyle: {
    height: 160,
    width: '100%',
    borderRadius: 10,
    alignSelf: 'center',
  },
  TouchableOpacityStyle: {
    marginEnd: 10,
    alignItems: 'center',
  },
  profile_pic_img: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  style1: {
    marginBottom: 100,
  },
});
export default CustomerHomeScreen;
