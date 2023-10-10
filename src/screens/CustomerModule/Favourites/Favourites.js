/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-did-update-set-state */
import React, {Component} from 'react';
import {
  View,
  Text,
  Dimensions,
  stylistList,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  TextInput,
} from 'react-native';

import {SafeAreaInsetsContext} from 'react-native-safe-area-context';
import {connect} from 'react-redux';
import {Images} from '../../../constants';
import Colors from '../../../constants/Colors';
import Fonts from '../../../constants/Fonts';
import CommonStyle from '../../../constants/Style';
import SafeAreaView from 'react-native-safe-area-view';
import {getCustomerInvoice} from '../../../redux/actions/profileAction';
import {imagePath} from '../../../constants/Config';
import {
  getFavouritiesStylistList,
  getFavouritiesBarberList,
} from '../../../redux/actions/favouritesAction';

const {height} = Dimensions.get('window');

class Favourites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: true,
      InvoiceData: null,
      selectedType: 1,
      searchActive: false,
      search: '',
      listOfBarber: [],
      listOfStylist: [],
      searchSpinner: false,
    };
  }

  invoiceTypeSelection(id) {
    this.setState({selectedType: id});
  }

  componentDidMount() {
    let formdataFS = new FormData();
    formdataFS.append('type', 'stylist');
    this.props.getFavouritiesStylistList(formdataFS);

    let formdataFB = new FormData();
    formdataFB.append('type', 'barber');
    this.props.getFavouritiesBarberList(formdataFB);
    // this.setState({
    //   listOfStylist: this.props.favouritesStylistList,
    //   listOfBarber: this.props.favouriteBarberList,
    // });
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.favouritesStylistList !== prevProps.favouritesStylistList &&
      this.props.favouritesStylistList !== null
    ) {
      this.setState({
        listOfStylist: this.props.favouritesStylistList,
      });
    }

    if (
      this.props.favouriteBarberList !== prevProps.favouriteBarberList &&
      this.props.favouriteBarberList !== null
    ) {
      this.setState({
        listOfBarber: this.props.favouriteBarberList,
      });
    }
  }

  onTextChangeStylist = (txt) => {
    if (
      txt !== '' &&
      this.props.favouritesStylistList &&
      Object.keys(this.props.favouritesStylistList).length > 0
    ) {
      this.setState({searchSpinner: true}, () => {
        let filterRes = Object.values(this.props.favouritesStylistList).filter(
          (stylist, index) => {
            console.log('sss==>', stylist);
            if (
              (stylist.other_data.fname + ' ' + stylist.other_data.lname)
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
        listOfStylist: this.props.favouritesStylistList,
        searchSpinner: false,
      });
    }
  };

  onTextChangeBarber = (txt) => {
    if (
      txt !== '' &&
      this.props.favouriteBarberList &&
      Object.keys(this.props.favouriteBarberList).length > 0
    ) {
      this.setState({searchSpinner: true}, () => {
        let filterRes = Object.values(this.props.favouriteBarberList).filter(
          (stylist, index) => {
            if (
              (stylist.other_data.fname + ' ' + stylist.other_data.lname)
                .toLowerCase()
                .includes(txt.toLowerCase())
            ) {
              return stylist;
            }
          },
        );
        this.setState({listOfBarber: filterRes, searchSpinner: false});
      });
    } else {
      this.setState({
        listOfBarber: this.props.favouriteBarberList,
        searchSpinner: false,
      });
    }
  };

  searchHandler = () => {
    this.setState({searchActive: !this.state.searchActive});
  };

  renderInvoiceItem = ({item, navigation}) => {
    return (
      <View>
        <TouchableOpacity
          activeOpacity={1}
          style={styles.container}
          onPress={() => {
            this.props.navigation.navigate('StylistProfile', {
              stylist: item,
            });
          }}>
          <Image
            resizeMode={'cover'}
            source={{uri: imagePath + item.profile_pic}}
            style={styles.Imagestyle}
          />
          <View style={styles.nameCont}>
            <Text style={styles.nameText}>
              {item.name ? item.name : item.fname + ' ' + item.lname}
            </Text>
            <View style={styles.ViewCont2}>
              <Text style={styles.commentText}>
                {item.other_data.profession}
              </Text>
              <View style={styles.StarImgCont}>
                <Image
                  source={Images.StylistIcon.Star}
                  style={styles.starStyle}
                />
                <Text style={styles.RatingText}>{item.rating}</Text>
              </View>
            </View>
            <View style={styles.MapPinCont}>
              <Image
                source={Images.ProfileIcon.MapPin}
                style={styles.MapPinImg}
              />
              <Text style={styles.addressText}>
                {item.other_data.city + ', ' + item.other_data.state}
              </Text>
            </View>
          </View>
          <View style={styles.flexSty} />
          <View style={styles.starCont}>
            <Image source={Images.StylistIcon.Star3} style={styles.StarImg} />
          </View>
        </TouchableOpacity>
        <View style={styles.borderLine} />
      </View>
    );
  };

  render() {
    const {favouritesStylistList, favouriteBarberList} = this.props;
    console.log('fav props', this.props);
    return (
      <SafeAreaView style={styles.SafeAreaViewSty}>
        <SafeAreaInsetsContext.Consumer>
          {(insets) => (
            <View style={[CommonStyle.notifyCont, styles.headingCont]}>
              <Text style={[styles.heading]}>Favourites </Text>

              <View style={styles.ViewCont1} />

              <TouchableOpacity
                style={styles.search_cont}
                activeOpacity={1}
                onPress={this.searchHandler}>
                <Image
                  source={Images.InvoiceIcon.Search}
                  style={styles.search_img}
                />
              </TouchableOpacity>
            </View>
          )}
        </SafeAreaInsetsContext.Consumer>
        {this.state.searchActive === true ? (
          <View style={styles.searchCont}>
            <View style={styles.searchInput}>
              <TextInput
                placeholder={' Search...'}
                style={styles.TextInputSty}
                name="Search"
                value={this.state.search}
                onChangeText={(value) => {
                  this.state.selectedType === 1
                    ? this.onTextChangeBarber(value)
                    : this.onTextChangeStylist(value);
                  this.setState({search: value});
                }}
              />

              {/* <TouchableOpacity
                onPress={() => {
                  this.onTextChange('');
                  this.setState({search: ''});
                }}>
                <Image
                  style={{height: 20, width: 20, marginEnd: 10}}
                  source={Images.CustomerHomeIcon.Remove}
                />
              </TouchableOpacity> */}
              {/* <TextInput
             //  placeholder={' Search barber/stylist'}
             // editable={false}
             style={{ fontFamily: Fonts.Lato_Regular, flex: 1, color: Colors.textDarkGray }}
             name="search"
            // onPress={this.goToSearch}

           >{' Search barber/stylist'}</Text> */}
            </View>
          </View>
        ) : null}

        <View style={styles.ViewCont}>
          <TouchableOpacity
            onPress={() => this.invoiceTypeSelection(1)}
            style={{
              borderBottomColor:
                this.state.selectedType === 1 ? Colors.ButtonColor : '#EFF0F6',
              flex: 1,
              justifyContent: 'center',
              alignItems: 'baseline',
              borderBottomWidth: 2,
            }}>
            <Text
              style={{
                color:
                  this.state.selectedType === 1
                    ? Colors.ButtonColor
                    : Colors.Black,
                fontWeight: 'bold',
                fontSize: 15,
                marginLeft: 8,
              }}>
              Barbers
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.invoiceTypeSelection(2)}
            style={{
              borderBottomColor:
                this.state.selectedType === 2 ? Colors.ButtonColor : '#EFF0F6',
              flex: 2,
              justifyContent: 'center',
              alignItems: 'baseline',
              borderBottomWidth: 2,
            }}>
            <Text
              style={{
                color:
                  this.state.selectedType === 2
                    ? Colors.ButtonColor
                    : Colors.Black,
                fontWeight: 'bold',
                fontSize: 15,
                marginLeft: 8,
              }}>
              Stylist
            </Text>
          </TouchableOpacity>
        </View>

        <View style={[{minHeight: height - height / 5}]}>
          <ScrollView
            style={styles.ScrollViewStyle}
            showsVerticalScrollIndicator={false}>
            {favouritesStylistList &&
            favouritesStylistList.length > 0 &&
            this.state.selectedType === 2 ? (
              <FlatList
                data={this.state.listOfStylist}
                renderItem={this.renderInvoiceItem}
                //  keyExtractor={(item) => item.id.toString()}
              />
            ) : (
              <Text style={styles.NoList_Text2}>
                {this.state.selectedType === 2 ? 'No List Found !' : ''}
              </Text>
            )}

            {favouriteBarberList &&
            favouriteBarberList.length > 0 &&
            this.state.selectedType === 1 ? (
              <FlatList
                data={this.state.listOfBarber}
                renderItem={this.renderInvoiceItem}
                //  keyExtractor={(item) => item.id.toString()}
              />
            ) : (
              <Text style={styles.NoList_Text}>
                {this.state.selectedType === 1 ? 'No List Found !' : ''}
              </Text>
            )}
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  labelStyle: {
    fontSize: 15,
    fontFamily: Fonts.HeveticaNowText_Medium,
  },
  flexSty: {
    flex: 1,
  },
  TextInputSty: {
    fontFamily: Fonts.HeveticaNowText_Regular,
    flex: 1,
    color: Colors.textDarkGray,
  },
  container: {
    margin: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },
  StarImgCont: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginStart: 10,
  },
  ViewCont2: {
    flexDirection: 'row',
  },
  MapPinImg: {
    height: 12,
    width: 10,
    tintColor: Colors.Pink,
  },
  nameText: {
    fontSize: 13,
    color: Colors.Black,
    fontFamily: Fonts.HeveticaNowText_Medium,
  },
  starStyle: {
    height: 10,
    width: 10,
    tintColor: Colors.Pink,
  },
  nameCont: {
    flexDirection: 'column',
    marginStart: 10,
  },
  borderLine: {
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    width: 370,
  },
  MapPinCont: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2.5,
  },
  search_img: {
    height: 30,
    width: 30,
  },
  StarImg: {
    height: 19.16,
    width: 20.89,
    tintColor: Colors.Pink,
    marginRight: 10,
  },
  addressText: {
    fontSize: 12,
    color: Colors.Pink,
    marginStart: 5,
    fontStyle: 'italic',
  },
  starCont: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  SafeAreaViewSty: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  heading: {
    marginStart: 10,
    fontSize: 30,
    color: Colors.Black,
    fontFamily: Fonts.Lato_Bold,
  },
  headingCont: {
    marginTop: 10,
  },
  ViewCont1: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  search_cont: {
    alignItems: 'center',
    height: 35,
    width: 35,
  },
  boldLabelStyle: {
    fontSize: 15,
    fontFamily: Fonts.HeveticaNowText_Black,
  },
  ScrollViewStyle: {
    height,
    flex: 1,
  },
  RatingText: {
    fontSize: 12,
    color: Colors.Pink,
    marginStart: 5,
  },
  searchCont: {
    flexDirection: 'row',
    padding: 10,
  },
  ViewCont: {
    flexDirection: 'row',
    marginTop: 20,
    height: 40,
    width: '90%',
    alignSelf: 'center',
    borderBottomColor: Colors.BorderGray,
    borderBottomWidth: 1,
  },
  NoList_Text: {
    fontFamily: Fonts.HeveticaNowText_Black,
    fontSize: 14,
    alignSelf: 'center',
    padding: 20,
    marginTop: -59,
  },
  NoList_Text2: {
    fontFamily: Fonts.HeveticaNowText_Black,
    fontSize: 14,
    alignSelf: 'center',
    padding: 20,
    marginTop: -57,
  },
  dataMainCont: {
    width: 370,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  amountCont: {
    backgroundColor: Colors.White,
    marginTop: 30,
    height: 40,
    borderRadius: 10,
    padding: 10,
  },
  Imagestyle: {
    height: 60,
    width: 60,
    borderRadius: 30,
  },
  dataCont: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 10,
  },
  commentText: {
    fontSize: 12,
    fontFamily: Fonts.HeveticaNowText_Medium,
    color: Colors.mediumGray,
  },
  searchInput: {
    flex: 1,
    backgroundColor: Colors.White,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.ButtonColor,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    height: 40,
    marginHorizontal: 10,
    marginTop: 10,
  },
});
const mapStateToProps = (state) => {
  return {
    favouritesStylistList: state.FavouritesReducer.favouritesStylistList,
    favouriteBarberList: state.FavouritesReducer.favouriteBarberList,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getFavouritiesStylistList: (data) =>
    dispatch(getFavouritiesStylistList(data)),
  getFavouritiesBarberList: (data) => dispatch(getFavouritiesBarberList(data)),
  getCustomerInvoice: () => dispatch(getCustomerInvoice()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Favourites);
