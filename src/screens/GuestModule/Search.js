/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  FlatList,
  TouchableOpacity,
  TextInput,
  Platform,
} from 'react-native';
import {Images, Fonts, Colors} from '../../constants';
import {connect} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import CommonStyle from '../../constants/Style';
import {SafeAreaInsetsContext} from 'react-native-safe-area-context';
import {imagePath} from '../../constants/Config';
import {HeveticaNowText_Medium} from '../../constants/Fonts';
const {height, width} = Dimensions.get('window');
class GuestSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      listOfStylist: null,
      searchSpinner: false,
      filter: false,
    };
  }
  renderReviewData = (itemData, navigation) => {
    const {item} = itemData;
    console.log('rating item', item);
    let user_type =
      this.props.route.params.userType === 'Guest' ? 'guest' : 'customer';
    console.log('userType 11', this.props);
    return (
      <View>
        <TouchableOpacity
          activeOpacity={1}
          style={styles.Subcontainer}
          onPress={() => {
            this.props.navigation.navigate('StylistProfile', {
              stylist: item,
              userType: user_type,
            });
          }}>
          <Image
            source={{uri: imagePath + item.profile_pic}}
            style={styles.profile_picStyle}
          />
          <View style={styles.nameView}>
            <Text style={styles.nameText}>
              {item.name ? item.name : item.fname + ' ' + item.lname}
            </Text>
            <Text style={styles.commentText}>{item.profession}</Text>
          </View>
          <View style={{flex: 1}} />
          <View style={styles.ImageCont}>
            <Image source={Images.StylistIcon.Star} style={styles.StarStyles} />
            <Text style={styles.rating_text}>{item.rating || 0}</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.borderLine} />
      </View>
    );
  };

  componentDidMount() {
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({
      listOfStylist: this.props.stylistList,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.filterData !== prevProps.filterData &&
      this.props.filterData !== null
    ) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        listOfStylist: this.props.filterData,
        filter: true,
      });
    }
  }

  onTextChange = (txt) => {
    if (
      txt !== '' &&
      this.props.stylistList &&
      Object.keys(this.props.stylistList).length > 0
    ) {
      this.setState({searchSpinner: true}, () => {
        let filterRes = Object.values(this.props.stylistList).filter(
          (stylist, index) => {
            if (
              (stylist.fname + ' ' + stylist.lname)
                .toLowerCase()
                .includes(txt.toLowerCase())
            ) {
              return stylist;
            }
          },
        );
        this.setState({listOfStylist: filterRes, searchSpinner: false});
      });
    } else {
      this.setState({
        listOfStylist: this.props.stylistList,
        searchSpinner: false,
      });
    }
  };

  backHandler = () => {
    this.setState({
      backHandler: true,
    });
  };
  render() {
    const {navigation} = this.props;
    console.log('Search   this.props', this.props);
    return (
      <SafeAreaInsetsContext.Consumer>
        {(insets) => (
          <View style={{height, flex: 1, marginBottom: 46}}>
            <Spinner
              visible={this.state.searchSpinner}
              textContent={'Loading...'}
              textStyle={{color: Colors.BackgroundGray}}
            />
            <View
              style={[
                styles.backgroundStyle,
                {
                  backgroundColor:
                    this.props.route.params.userType === 'Guest'
                      ? Colors.Black
                      : Colors.ButtonColor,
                  height: 145,
                },
              ]}>
              <View
                style={[
                  styles.notifyCont,
                  {
                    marginTop: Platform.OS === 'android' ? 10 : 40,
                  },
                ]}>
                <View style={{flex: 1, alignItems: 'flex-start'}}>
                  {this.state.filter ? (
                    <TouchableOpacity
                      onPress={() => {
                        this.state.filter &&
                          this.setState({
                            listOfStylist: this.props.stylistList,
                            filter: false,
                          });
                      }}
                      activeOpacity={1}>
                      <Text
                        style={[CommonStyle.viewAllFont, styles.Clear_text]}>
                        Clear Filter
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={() => this.props.navigation.goBack()}
                      activeOpacity={1}>
                      <Image
                        source={Images.Notification.BackArrow}
                        style={[CommonStyle.backArrow]}
                      />
                    </TouchableOpacity>
                  )}
                </View>
                <View style={{flex: 2, alignItems: 'center'}}>
                  <Text style={[styles.welcomeName]}>Search </Text>
                </View>
                <View style={{flex: 1, alignItems: 'flex-end'}}>
                  <TouchableOpacity
                    // onPress={() =>
                    //   navigation.navigate('Filter', {userType: 'Guest'})
                    // }
                    activeOpacity={1}>
                    {/* <Image
                      source={Images.StylistIcon.Filter}
                      style={{height: 30, width: 30}}
                    /> */}
                  </TouchableOpacity>
                </View>
              </View>

              <View style={{flexDirection: 'row', padding: 10}}>
                <View style={styles.searchInput}>
                  <TouchableOpacity
                  // onPress={() => this.onTextChange()}
                  >
                    <Image
                      style={{height: 20, width: 20, marginStart: 10}}
                      source={Images.InvoiceIcon.Search}
                    />
                  </TouchableOpacity>

                  <TextInput
                    placeholder={' Search barber/stylist'}
                    style={styles.style1}
                    name="Search"
                    value={this.state.search}
                    onChangeText={(value) => {
                      this.onTextChange(value);
                      this.setState({search: value});
                    }}
                  />

                  <TouchableOpacity
                    onPress={() => {
                      this.onTextChange('');
                      this.setState({search: ''});
                    }}>
                    <Image
                      style={styles.Remove_image}
                      source={Images.CustomerHomeIcon.Remove}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View
              style={[
                {
                  height: '100%',
                },
              ]}>
              <View style={{}}>
                <Text style={styles.search_resultText}>Search Result</Text>
                {this.state.listOfStylist &&
                Object.values(this.state.listOfStylist).length > 0 ? (
                  <FlatList
                    data={Object.values(this.state.listOfStylist)}
                    renderItem={(item) =>
                      this.renderReviewData(item, navigation)
                    }
                    keyExtractor={(item) => item.id.toString()}
                    showsVerticalScrollIndicator={false}
                    nestedScrollEnabled={true}
                  />
                ) : (
                  <Text style={styles.NoResult_text}>No Result Found !</Text>
                )}
              </View>
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
  Clear_text: {
    color: Colors.White,
    borderBottomColor: 'white',
    borderBottomWidth: 1,
  },
  nameView: {
    flexDirection: 'column',
    marginStart: 10,
  },
  ImageCont: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Remove_image: {
    height: 20,
    width: 20,
    marginEnd: 10,
  },
  profile_picStyle: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  rating_text: {
    fontSize: 21,
    color: Colors.Pink,
    marginStart: 5,
  },
  Subcontainer: {
    margin: 10,
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 10,
  },
  backgroundStyle: {
    width,
  },
  style1: {
    fontFamily: Fonts.HeveticaNowText_Regular,
    flex: 1,
    color: Colors.textDarkGray,
  },
  nameText: {
    fontSize: 16,
    color: Colors.textDarkGray,
    fontFamily: HeveticaNowText_Medium,
    textAlign: 'center',
  },
  borderLine: {
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    width: 370,
  },
  search_resultText: {
    fontSize: 16,
    fontFamily: HeveticaNowText_Medium,
    margin: 10,
  },
  StarStyles: {
    height: 16.88,
    width: 18.18,
    tintColor: Colors.Pink,
    marginRight: 5,
  },
  profileCard: {
    width: '90%',
    backgroundColor: '#ffffff',
    alignSelf: 'center',
    borderRadius: 20,
    marginBottom: 20,
    marginTop: -90,
  },
  notifyCont: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width: '90%',
    height: 40,
    alignSelf: 'center',
  },
  NoResult_text: {
    fontFamily: Fonts.HeveticaNowText_Black,
    fontSize: 14,
    alignSelf: 'center',
  },
  welcomeName: {
    fontSize: 18,
    color: Colors.White,
    fontFamily: Fonts.HeveticaNowText_Medium,
  },
  searchInput: {
    flex: 1,
    backgroundColor: Colors.White,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    height: 40,
    marginHorizontal: 10,
    marginTop: 10,
  },
  commentText: {
    fontSize: 12,
    fontFamily: Fonts.HeveticaNowText_Medium,
    color: Colors.LightBlack,
  },
});
const mapStateToProps = (state) => {
  return {
    stylistList: state.HomeReducer.stylistList,
    filterData: state.StylistReducer.filterData,
    filterStylistSuccess: state.StylistReducer.filterStylistSuccess,
  };
};

export default connect(mapStateToProps, null)(GuestSearch);
