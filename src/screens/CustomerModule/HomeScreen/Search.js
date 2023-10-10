import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  FlatList,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  Platform,
} from 'react-native';
import {Images, Fonts, Colors} from '../../../constants';
import ReviewCard from '../../../components/ReviewCard';
import {connect} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import CommonStyle from '../../../constants/Style';
import {SafeAreaInsetsContext} from 'react-native-safe-area-context';
const {height, width} = Dimensions.get('window');
class Search extends Component {
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
    return (
      <ReviewCard
        id={item.id}
        stylistData={{item: item}}
        image={item.profile_pic}
        type="stylist"
        navigation={navigation}
        length={this.state.listOfStylist.length}
        underLine={false}
        star={false}
        search={true}
        template_type={item.template_type}
        username={item.name ? item.name : item.fname + ' ' + item.lname}
        comment={item.profession}
      />
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
  onTextChange = () => {
    if (this.state.search !== '') {
      this.setState({searchSpinner: true}, () => {
        let filterRes = Object.values(this.props.stylistList).filter(
          (stylist, index) => {
            if (
              (stylist.fname + ' ' + stylist.lname)
                .toLowerCase()
                .includes(this.state.search.toLowerCase())
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
    return (
      <SafeAreaInsetsContext.Consumer>
        {(insets) => (
          <View style={styles.cont}>
            <Spinner
              visible={this.state.searchSpinner}
              textContent={'Loading...'}
              textStyle={{color: Colors.BackgroundGray}}
            />
            <ImageBackground
              source={Images.HomeIcon.RedBg}
              imageStyle={styles.RedBgImg}
              style={[
                styles.backgroundStyle,
                {
                  height:
                    Platform.OS === 'android'
                      ? height / 3 + 20
                      : insets.top === 20
                      ? height / 3 + 20
                      : height / 3,
                },
              ]}>
              <View
                style={[
                  styles.notifyCont,
                  // eslint-disable-next-line react-native/no-inline-styles
                  {
                    marginTop:
                      Platform.OS === 'android'
                        ? 30
                        : insets.top === 20
                        ? 30
                        : 50,
                  },
                ]}>
                <View style={styles.viewCont}>
                  <TouchableOpacity
                    onPress={() => {
                      this.state.filter &&
                        this.setState({
                          listOfStylist: this.props.stylistList,
                          filter: false,
                        });
                    }}
                    activeOpacity={1}>
                    {this.state.filter && (
                      <Text style={[CommonStyle.viewAllFont, styles.TextCont]}>
                        Clear Filter
                      </Text>
                    )}
                  </TouchableOpacity>
                </View>
                <View style={styles.searchView}>
                  <Text style={[styles.welcomeName]}>Search </Text>
                </View>
                <View style={styles.filtersty}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Filter')}
                    activeOpacity={1}>
                    <Image
                      source={Images.StylistIcon.Filter}
                      style={styles.ImageCont}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.searchInput}>
                <TextInput
                  placeholder={'Search'}
                  style={styles.TextInputsty}
                  name="search"
                  onChangeText={(value) => {
                    if (value === '') {
                      this.setState({listOfStylist: this.props.stylistList});
                    }
                    this.setState({search: value});
                  }}
                />
                <TouchableOpacity onPress={() => this.onTextChange()}>
                  <Image
                    style={styles.ImageSty}
                    source={Images.StylistIcon.Search}
                  />
                </TouchableOpacity>
              </View>
            </ImageBackground>
            <View
              style={[
                styles.profileCard,
                {
                  height:
                    Platform.OS === 'android'
                      ? height - height / 2 + 90
                      : insets.top === 20
                      ? height - height / 2 + 90
                      : height - height / 2 + 120,
                },
              ]}>
              <View style={styles.viewCont2}>
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
                  <Text style={styles.textStyle2}>No Result Found !</Text>
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
  Cont: {
    height,
    flex: 1,
  },
  ImageSty: {height: 20, width: 20, marginTop: 15},
  ImageCont: {
    height: 30,
    width: 30,
  },
  viewCont2: {
    padding: 30,
  },
  TextInputsty: {
    width: '85%',
    fontFamily: Fonts.Lato_Bold,
  },
  searchView: {
    flex: 2,
    alignItems: 'center',
  },
  filtersty: {
    flex: 1,
    alignItems: 'flex-end',
  },
  backgroundStyle: {
    height: height / 3,
    width,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  TextCont: {
    color: Colors.White,
    borderBottomColor: 'white',
    borderBottomWidth: 1,
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
  textStyle2: {
    fontFamily: Fonts.Lato_Black,
    fontSize: 14,
    alignSelf: 'center',
  },
  viewCont: {
    flex: 1,
    alignItems: 'center',
  },
  welcomeName: {
    fontSize: 18,
    color: Colors.White,
    fontFamily: Fonts.Lato_Medium,
  },
  searchInput: {
    backgroundColor: Colors.White,
    width: '90%',
    alignSelf: 'center',
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 20,
    height: 50,
  },
  RedBgImg: {
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
});
const mapStateToProps = (state) => {
  return {
    stylistList: state.HomeReducer.stylistList,
    filterData: state.StylistReducer.filterData,
    filterStylistSuccess: state.StylistReducer.filterStylistSuccess,
  };
};

export default connect(mapStateToProps, null)(Search);
