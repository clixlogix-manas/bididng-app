/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Platform,
  Alert,
} from 'react-native';
import {connect} from 'react-redux';
import {Images} from '../../constants';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';
import CommonStyle from '../../constants/Style';
import SafeAreaView from 'react-native-safe-area-view';
import {
  getCustomerInvoice,
  getStylistInvoice,
} from '../../redux/actions/profileAction';

const {height} = Dimensions.get('window');

class Invoice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: true,
      InvoiceData: null,
      selectedType: 1,
    };
  }

  componentDidMount() {
    // this.props.getCustomerInvoice();
    // console.log('this.props', this.props.getStylistInvoice());
    // console.log(
    //   'this.props.route.params.userType',
    //   this.props.route.params.userType,
    // );
    if (this.props.route.params.userType === 3) {
      this.props.getStylistInvoice();
    } else {
      this.props.getCustomerInvoice();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.getInvoiceDetailsSuccess !==
        prevProps.getInvoiceDetailsSuccess &&
      this.props.getInvoiceDetailsSuccess === true
    ) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        loader: false,
      });
    }
  }

  invoiceTypeSelection(id) {
    this.setState({selectedType: id});
  }

  renderInvoiceItem = ({item}) => {
    let timeValue;
    if (item.service_duration > 60) {
      if ((item.service_duration / 30 / 2).toString().split('.')[1] === '5') {
        timeValue =
          (item.service_duration / 30 / 2).toString().split('.')[0] +
          ' Hour 30 Mins';
      } else {
        timeValue =
          (item.service_duration / 30 / 2).toString().split('.')[0] + ' Hours';
      }
    }
    return (
      <View style={[styles.dataMainCont]}>
        <View style={styles.Subcont}>
          <Image
            source={{
              uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjAAwQyKxGO39mWtUYjD0s_uhMSmEi4wXyPg&usqp=CAU',
            }}
            style={styles.ImageStyle}
          />
          <View style={styles.itemCont}>
            <View style={styles.dataCont}>
              {/* <Text style={styles.boldLabelStyle}>Customer name</Text> */}
              <Text style={styles.labelStyle}>{item.customer_name}</Text>
            </View>
            {/* <View style={styles.dataCont}>
            <Text style={styles.boldLabelStyle}>Service name</Text>
            <Text style={styles.labelStyle}>{item.service_name}</Text>
          </View> */}
            <View style={styles.dataCont}>
              {/* <Text style={styles.boldLabelStyle}>Service duration</Text> */}
              <Text style={styles.labelStyle}>
                {item.service_duration > 60 && timeValue}
                {item.service_duration === 60 && '1 Hour'}
                {item.service_duration < 60 && item.service_duration + 'Min'}
              </Text>
            </View>

            {/* <View style={styles.dataCont}>
            <Text style={styles.boldLabelStyle}>Payment type</Text>
            <Text style={styles.labelStyle}>{item.type}</Text>
          </View> */}
          </View>
          <View style={styles.dataCont}>
            {/* <Text style={styles.boldLabelStyle}>Service charge</Text> */}
            <Text style={[styles.labelStyle, {color: Colors.ButtonColor}]}>
              {item.final_service_charge
                ? item.final_service_charge
                : item.service_charge}
              .00 $
            </Text>
          </View>

          {this.props.route.params.userType === 'Barber' && (
            <View style={[styles.dataCont, styles.amountCont]}>
              <Text style={styles.boldLabelStyle}>Stylist income</Text>
              <Text style={styles.labelStyle}>{item.stylist_earning}.00 $</Text>
            </View>
          )}
        </View>
        <View style={styles.ViewStyle} />
      </View>
    );
  };
  render() {
    const {InvoiceData} = this.props;
    console.log('this.state.selectedType', this.state.selectedType);
    //let InvData = [{ id: 2, customer_name: "fff", service_duration: 30, date_time: "2021-08-05T19:29:31+05:30", final_service_charge: 49 }];
    return (
      <SafeAreaView style={styles.SafeAreaStyle}>
        {/* <ImageBackground
          source={Images.HomeIcon.RedBg}
          imageStyle={{
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
          }}
          style={CommonStyle.backgroundStyle}> */}
        {/* <Spinner
          visible={this.state.loader}
          textContent={'Loading...'}
          textStyle={{ color: Colors.BackgroundGray }}
        /> */}
        <View>
          <View
            style={[
              styles.BackArrowView,
              {
                marginTop: Platform.OS === 'ios' ? 0 : 10,
              },
            ]}>
            <TouchableOpacity
              onPress={() => Alert.alert('')}
              style={styles.OpacityStyle}>
              <Image
                source={Images.SignUpIcon.BackArrow}
                style={styles.BackArrowStyle}
              />
              <View style={styles.ViewStyle2} />
            </TouchableOpacity>

            <View style={styles.ViewStyle3} />
            <TouchableOpacity
              //   onPress={() => navigation.navigate("AddService", { serviceData: serviceData })}
              style={styles.SearchCont}
              activeOpacity={1}>
              <Image
                source={Images.InvoiceIcon.Search}
                style={styles.SearchImage}
              />
            </TouchableOpacity>
          </View>

          <Text style={[CommonStyle.ShopName, styles.ShopNameText]}>
            Invoice{' '}
          </Text>

          <View style={styles.invoiceTypeView}>
            <TouchableOpacity
              onPress={() => this.invoiceTypeSelection(1)}
              style={{
                backgroundColor:
                  this.state.selectedType === 1
                    ? Colors.ButtonColor
                    : '#EFF0F6',
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 5,
                fontFamily: Fonts.HeveticaNowText_Regular,
              }}>
              <Text
                style={{
                  color:
                    this.state.selectedType === 1 ? Colors.White : Colors.Black,
                  fontSize: 14,
                }}>
                Unpaid
              </Text>
            </TouchableOpacity>
            <View style={styles.invoiceTypeView2} />
            <TouchableOpacity
              onPress={() => this.invoiceTypeSelection(2)}
              style={{
                backgroundColor:
                  this.state.selectedType === 2
                    ? Colors.ButtonColor
                    : '#EFF0F6',
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 5,
                fontFamily: Fonts.HeveticaNowText_Regular,
              }}>
              <Text
                style={{
                  color:
                    this.state.selectedType === 2 ? Colors.White : Colors.Black,
                  fontSize: 14,
                }}>
                Paid
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* </ImageBackground> */}
        <View
          style={[
            styles.ScrollViewCont,
            {
              minHeight: height - height / 5,
            },
          ]}>
          <ScrollView
            style={styles.ScrollViewStyle}
            showsVerticalScrollIndicator={false}>
            {InvoiceData && InvoiceData.length > 0 ? (
              <FlatList
                data={InvoiceData}
                renderItem={this.renderInvoiceItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.contentContainerSty}
              />
            ) : (
              <Text style={styles.TextStyle}>No invoice generated yet !</Text>
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
    fontFamily: Fonts.Lato_Medium,
  },
  boldLabelStyle: {
    fontSize: 15,
    fontFamily: Fonts.Lato_Black,
  },
  OpacityStyle: {
    height: 20.5,
    width: 30,
    flexDirection: 'row',
  },
  TextStyle: {
    fontFamily: Fonts.HeveticaNowText_Black,
    fontSize: 14,
    alignSelf: 'center',
    padding: 20,
    marginTop: 10,
  },
  invoiceTypeView: {
    flexDirection: 'row',
    marginTop: 20,
    height: 30,
    width: 224,
    alignSelf: 'center',
  },
  ViewStyle2: {
    width: 10,
  },
  ScrollViewCont: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
  },
  ScrollViewStyle: {
    height,
    flex: 1,
  },
  invoiceTypeStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    fontFamily: Fonts.HeveticaNowText_Regular,
  },
  invoiceTypeView2: {
    height: '100%',
    backgroundColor: Colors.BorderGray,
  },
  SearchImage: {
    height: 24,
    width: 24,
    marginTop: 10,
  },
  ShopNameText: {
    textAlign: 'center',
    marginTop: -29,
  },
  dataMainCont: {
    width: 370,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  ViewStyle3: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  BackArrowStyle: {
    height: 20.5,
    width: 12,
    marginTop: 15,
  },
  SearchCont: {
    alignItems: 'center',
    height: 35,
    width: 35,
  },
  ImageStyle: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  SafeAreaStyle: {
    flex: 1,
    backgroundColor: Colors.BgColor,
  },
  contentContainerSty: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  BackArrowView: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
  },
  amountCont: {
    backgroundColor: Colors.White,
    marginTop: 30,
    height: 40,
    borderRadius: 10,
    padding: 10,
  },
  ViewStyle: {
    height: 1,
    width: '100%',
    backgroundColor: Colors.BorderGray,
    marginTop: 10,
  },
  dataCont: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 2.5,
  },
  Subcont: {
    flexDirection: 'row',
  },
  itemCont: {
    marginStart: 10,
    flex: 1,
  },
});
const mapStateToProps = (state) => {
  return {
    AboutUs: state.StaticReducer.AboutUs,
    getInvoiceDetails: state.ProfileReducer.getInvoiceDetails,
    getInvoiceDetailsSuccess: state.ProfileReducer.getInvoiceDetailsSuccess,
    getInvoiceDetailsFailure: state.ProfileReducer.getInvoiceDetailsFailure,
    InvoiceData: state.ProfileReducer.InvoiceData,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getStylistInvoice: () => dispatch(getStylistInvoice()),
  getCustomerInvoice: () => dispatch(getCustomerInvoice()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Invoice);
