import React, {Component} from 'react';
import {
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  Text,
  FlatList,
  ScrollView,
  StyleSheet,
} from 'react-native';
import Button from '../../../components/Button';
import AddCard from './AddCard';
import Images from '../../../constants/Images';
import CommonStyle from '../../../constants/Style';
import PaymentCard from '../../../components/PaymentCard';
import {connect} from 'react-redux';
import {
  deletePaymentCard,
  getPaymentCard,
} from '../../../redux/actions/stripeAction';
import Spinner from 'react-native-loading-spinner-overlay';
import Colors from '../../../constants/Colors';
import Fonts, {HeveticaNowText_Medium} from '../../../constants/Fonts';
import PopupCard from '../../../components/PopupCard';
import {SafeAreaInsetsContext} from 'react-native-safe-area-context';
import {Platform} from 'react-native';

const {height} = Dimensions.get('window');

class CardInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      renderScreen: 'Cardinfo',
      modalStatus: false,
      cardId: '',
      stripeId: '',
    };
  }
  componentDidMount() {
    this.props.getPaymentCard();
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.addPaymentCardSuccess !== prevProps.addPaymentCardSuccess) {
      this.props.getPaymentCard();
    } else if (
      this.props.deletePaymentCardSuccess !== prevProps.deletePaymentCardSuccess
    ) {
      this.props.getPaymentCard();
    }
  }
  renderCardInfo = ({item}) => {
    let icon;
    switch (item.brand) {
      case 'Visa':
        icon = Images.CustomerHomeIcon.Visa;
        break;
      case 'Master':
        icon = Images.CustomerHomeIcon.Master;
        break;
      case 'Paypal':
        icon = Images.CustomerHomeIcon.Paypal;
        break;
      case 'American':
        icon = Images.CustomerHomeIcon.American;
        break;
      default:
        icon = Images.CustomerHomeIcon.Visa;
        break;
    }
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          if (this.props.route.params.bookingData) {
            let formdata = new FormData();
            formdata = this.props.route.params.bookingData;
            formdata.append('card_id', item.card_id);
            formdata.append('stripe_acc_id', item.stripe_acc_id);
            if (this.props.route.params.screen === 'payment') {
              this.props.navigation.navigate('PaymentComplete', {
                booking_id: this.props.route.params.bookingData._parts[1][1],
                userType: 'Customer',
                bookingData: formdata,
              });
            } else {
              this.props.navigation.navigate('ReviewBooking', {
                bookingData: formdata,
              });
            }
          }
        }}>
        <PaymentCard
          cardType={item.brand}
          userName={item.name}
          cardNo={item.card_last_digits}
          icon={icon}
          card_id={item.card_id}
          stripe_id={item.stripe_acc_id}
          deleteCard={this.deleteCardPopup}
          navigation={this.props.navigation}
        />
      </TouchableOpacity>
    );
  };
  deleteCard = (card, stripe) => {
    this.setState({
      modalStatus: false,
    });
    let formdata = new FormData();
    formdata.append('card_id', card);
    formdata.append('stripe_id', stripe);
    this.props.deletePaymentCard(formdata);
  };
  deleteCardPopup = (card, stripe) => {
    this.setState({
      cardId: card,
      stripeId: stripe,
      modalStatus: true,
    });
  };
  render() {
    const {navigation, route, getPaymentCardReq, deletePaymentCardReq} =
      this.props;
    let sendData = route && route.params && route.params.bookingData;
    return (
      <View style={styles.container}>
        <Spinner
          visible={getPaymentCardReq || deletePaymentCardReq}
          textContent={'Loading...'}
          textStyle={{color: Colors.BackgroundGray}}
        />

        <PopupCard
          modalStatus={this.state.modalStatus}
          onClose={() => this.setState({modalStatus: false})}
          deleteCard={this.deleteCard}
          screen="card"
          card={this.state.cardId}
          stripe={this.state.stripeId}
          label="Do you really want to delete this card?"
        />

        <ScrollView
          style={styles.ScrollViewStyle}
          showsVerticalScrollIndicator={false}>
          <SafeAreaInsetsContext.Consumer>
            {(insets) => (
              <View style={styles.ViewCont}>
                <View style={[styles.ViewCont2]}>
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() =>
                      this.state.renderScreen === 'addCard'
                        ? this.setState({renderScreen: 'Cardinfo'})
                        : navigation.goBack()
                    }>
                    <Image
                      source={Images.SignUpIcon.BackArrow}
                      style={styles.BackArrowImg}
                    />
                  </TouchableOpacity>
                </View>
                <Text style={[CommonStyle.logoText, styles.textStyle2]}>
                  {this.state.renderScreen === 'addCard'
                    ? 'Add Card'
                    : 'Card Information'}
                </Text>
              </View>
            )}
          </SafeAreaInsetsContext.Consumer>
          {this.state.renderScreen === 'Cardinfo' && (
            <View style={[CommonStyle.subContainer, styles.marginstyle]}>
              {this.props.cardList && this.props.cardList.length > 0 ? (
                <View style={styles.ViewCont3}>
                  <FlatList
                    data={this.props.cardList}
                    renderItem={this.renderCardInfo}
                    keyExtractor={(item) => item.id.toString()}
                    scrollEnabled={true}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.contentContainerSty}
                    numColumns={2}
                  />
                </View>
              ) : (
                <View style={styles.cardView}>
                  <Image
                    source={Images.ProfileIcon.Card}
                    style={styles.cardImg}
                  />
                  <Text style={styles.NoCard}>No card added yet !</Text>
                </View>
              )}

              <View style={styles.ButtonView}>
                <Button
                  title={'Add a Card'}
                  path={'addCard'}
                  onScreenChange={() =>
                    this.setState({renderScreen: 'addCard'})
                  }
                  marginTop={50}
                  navigation={navigation}
                />
              </View>
            </View>
          )}

          {this.state.renderScreen === 'addCard' && (
            <AddCard
              navigation={navigation}
              bookingData={sendData ? sendData : ''}
              screen={this.props.route.params.screen}
              goBack={() => this.setState({renderScreen: 'Cardinfo'})}
            />
          )}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BgColor,
  },
  ScrollViewStyle: {
    flex: 1,
    height,
  },
  textStyle2: {
    textAlign: 'center',
    width: '76%',
    marginTop: -20,
    fontFamily: HeveticaNowText_Medium,
    fontWeight: 'bold',
    fontSize: 18,
  },
  marginstyle: {
    marginTop: 20,
  },
  ViewCont3: {
    height: 400,
  },
  cardImg: {
    height: 27,
    width: 35,
  },
  ViewCont2: {
    height: 40,
    width: 40,
  },
  BackArrowImg: {
    height: 20.5,
    width: 12,
  },
  ButtonView: {
    marginHorizontal: 20,
  },
  cardView: {
    width: '90%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'dotted',
    borderWidth: 1,
    alignSelf: 'center',
    borderRadius: 5,
    marginTop: 20,
  },
  contentContainerSty: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  ViewCont: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: Platform.OS === 'ios' ? 40 : 20,
    height: 50,
    width: '85%',
    alignSelf: 'center',
  },
  NoCard: {
    fontFamily: Fonts.HeveticaNowText_Regular,
    color: Colors.textDarkGray,
    fontSize: 18,
    marginTop: 15,
    alignSelf: 'center',
  },
});

const mapStateToProps = (state) => {
  return {
    getPaymentCardReq: state.StripeReducer.getPaymentCardReq,
    getPaymentCardSuccess: state.StripeReducer.getPaymentCardSuccess,
    getPaymentCardFailure: state.StripeReducer.getPaymentCardFailure,
    cardList: state.StripeReducer.cardList,
    addPaymentCardSuccess: state.StripeReducer.addPaymentCardSuccess,
    deletePaymentCardReq: state.StripeReducer.deletePaymentCardReq,
    deletePaymentCardSuccess: state.StripeReducer.deletePaymentCardSuccess,
    deletePaymentCardFailure: state.StripeReducer.deletePaymentCardFailure,
    deletePaymentCardFailureMessage:
      state.StripeReducer.deletePaymentCardFailureMessage,
  };
};

const mapDispatchToProps = (dispatch) => ({
  deletePaymentCard: (data) => dispatch(deletePaymentCard(data)),
  getPaymentCard: (data) => dispatch(getPaymentCard(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(CardInfo);
