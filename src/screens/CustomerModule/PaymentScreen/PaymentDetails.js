/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  // Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Platform,
} from 'react-native';
import {SafeAreaInsetsContext} from 'react-native-safe-area-context';
import {connect} from 'react-redux';
import {Images} from '../../../constants';
import Colors from '../../../constants/Colors';
import Fonts from '../../../constants/Fonts';
import SafeAreaView from 'react-native-safe-area-view';
import {
  getCustomerInvoice,
  getStylistInvoice,
} from '../../../redux/actions/profileAction';

// const {height} = Dimensions.get('window');

class PaymentDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: true,
      InvoiceData: null,
      selectedType: 1,
      paymentData: [{id: 1, i: 2}],
    };
  }

  componentDidMount() {
    if (this.props.route.params.userType === 'Barber') {
      //this.props.getStylistInvoice();
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
        // eslint-disable-next-line no-unused-vars
        timeValue =
          (item.service_duration / 30 / 2).toString().split('.')[0] + ' Hours';
      }
    }
    return (
      <View style={[styles.dataMainCont]}>
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: Platform.OS === 'ios' ? 0 : 25,
          }}>
          <Image
            source={{
              uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjAAwQyKxGO39mWtUYjD0s_uhMSmEi4wXyPg&usqp=CAU',
            }}
            style={styles.ImgStyle}
          />
          <View style={{marginStart: 10, flex: 1}}>
            <View style={styles.ViewCont3}>
              {/* <Text style={styles.boldLabelStyle}>Customer name</Text> */}
              <Text style={styles.labelStyle}>{'Gaby Tenda'}</Text>
              <Text style={styles.dataText}>{'20/3/2021'}</Text>
            </View>
            {/* <View style={styles.dataCont}>
                            <Text style={styles.boldLabelStyle}>Service duration</Text>
                            <Text style={styles.labelStyle}>
                                {item.service_duration > 60 && timeValue}
                                {item.service_duration === 60 && '1 Hour'}
                                {item.service_duration < 60 && item.service_duration + 'Min'}
                            </Text>
                        </View> */}

            {/* <View style={styles.dataCont}>
            <Text style={styles.boldLabelStyle}>Payment type</Text>
            <Text style={styles.labelStyle}>{item.type}</Text>
          </View> */}
          </View>
          <View style={styles.dataCont}>
            <Text style={[styles.labelStyle, {color: '#1B1C1ECC'}]}>
              {'$88'}
            </Text>
          </View>

          {this.props.route.params.userType === 'Barber' && (
            <View style={[styles.dataCont, styles.amountCont]}>
              <Text style={styles.boldLabelStyle}>Stylist income</Text>
              <Text style={styles.labelStyle}>{item.stylist_earning}.00 $</Text>
            </View>
          )}
        </View>
        <View style={styles.style1} />
      </View>
    );
  };
  render() {
    const {navigation} = this.props;
    return (
      <SafeAreaView style={styles.SafeAreaStyle}>
        <SafeAreaInsetsContext.Consumer>
          {(insets) => (
            <View style={styles.cont}>
              <View style={[styles.ViewCont2]}>
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  style={{flexDirection: 'row', alignItems: 'center'}}
                  activeOpacity={1}>
                  <Image
                    source={Images.SignUpIcon.BackArrow}
                    style={styles.BackArrowSty}
                  />
                  <Text style={styles.textStyle2}>Payment Details </Text>
                </TouchableOpacity>

                {/* <TouchableOpacity
                                onPress={() => navigation.navigate("AddService", { serviceData: serviceData })}
                                style={{
                                    alignItems: 'center',
                                    height: 35,
                                    width: 35,
                                }}
                                activeOpacity={1}>
                                <Image
                                    source={Images.InvoiceIcon.Search}
                                    style={{ height: 30, width: 30 }}
                                />
                            </TouchableOpacity> */}
              </View>
              <View style={styles.ViewCont}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={{color: Colors.White, fontSize: 15}}>{'$'}</Text>
                  <Text style={styles.textStyle}>{'200.00'}</Text>
                </View>
                <Text style={styles.total_text}>{'Total Spending'}</Text>
              </View>
            </View>
          )}
        </SafeAreaInsetsContext.Consumer>

        {/* <Text style={[CommonStyle.welcomeName, { textAlign: 'center' }]}>
                    Invoice{' '}
                </Text> */}

        {/* <View style={{ flexDirection: 'row', marginTop: 20, height: 40, width: "70%", alignSelf: 'center' }}>
                    <TouchableOpacity
                        onPress={() => this.invoiceTypeSelection(1)}
                        style={{ backgroundColor: this.state.selectedType == 1 ? Colors.ButtonColor : "#EFF0F6", flex: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}>
                        <Text style={{ color: this.state.selectedType == 1 ? Colors.White : Colors.Black, fontSize: 14 }}>Unpaid</Text>
                    </TouchableOpacity>
                    <View style={{ width: 1, height: '100%', backgroundColor: Colors.BorderGray }} />
                    <TouchableOpacity
                        onPress={() => this.invoiceTypeSelection(2)}
                        style={{ backgroundColor: this.state.selectedType == 2 ? Colors.ButtonColor : "#EFF0F6", flex: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}>
                        <Text style={{ color: this.state.selectedType == 2 ? Colors.White : Colors.Black, fontSize: 14 }}>Paid</Text>
                    </TouchableOpacity>
                </View> */}

        <View style={styles.ScrollViewCont}>
          <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
            <Text style={styles.trans_history}>Transaction History</Text>

            <FlatList
              data={this.state.paymentData}
              renderItem={this.renderInvoiceItem}
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={styles.contentContainerSty}
            />
            {/* ) :  */}

            {/* } */}
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  labelStyle: {
    fontSize: 16,
    fontFamily: Fonts.HeveticaNowText_Medium,
  },
  boldLabelStyle: {
    fontSize: 15,
    fontFamily: Fonts.HeveticaNowText_Black,
  },
  dataMainCont: {
    padding: 10,
    paddingHorizontal: Platform.OS === 'ios' ? 20 : 20,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  ImgStyle: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  BackArrowSty: {
    height: 20.5,
    width: 12,
    tintColor: Colors.White,
  },
  SafeAreaStyle: {
    flex: 1,
    backgroundColor: Colors.BgColor,
  },
  dataText: {
    fontSize: 13,
    marginTop: 5,
    fontFamily: Fonts.HeveticaNowText_Medium,
    fontStyle: 'italic',
    color: Colors.textDarkGray,
  },
  cont: {
    height: 300,
    backgroundColor: Colors.ButtonColor,
  },
  ViewCont2: {
    width: '90%',
    marginTop: 15,
    marginStart: 10,
  },
  ViewCont3: {
    justifyContent: 'space-between',
    marginTop: 10,
    marginStart: 10,
  },
  style1: {
    height: 1.5,
    width: 350,
    backgroundColor: '#222B4526',
    marginTop: 20,
  },
  textStyle2: {
    fontSize: 16,
    marginStart: 10,
    color: Colors.White,
  },
  ViewCont: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    marginBottom: 80,
  },
  textStyle: {
    color: Colors.White,
    fontSize: 30,
    fontWeight: 'bold',
  },
  total_text: {
    color: Colors.White,
    textAlign: 'center',
    marginTop: 20,
    fontSize: 15,
  },
  ScrollViewCont: {
    height: '100%',
    backgroundColor: Colors.White,
    marginHorizontal: 20,
    position: 'absolute',
    marginTop: 230,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  contentContainerSty: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  amountCont: {
    backgroundColor: Colors.White,
    marginTop: 30,
    height: 40,
    borderRadius: 10,
    padding: 10,
  },
  trans_history: {
    fontFamily: Fonts.HeveticaNowText_Medium,
    fontSize: 20,
    alignSelf: 'center',
    marginTop: 30,
  },
  dataCont: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 10,
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
export default connect(mapStateToProps, mapDispatchToProps)(PaymentDetails);
