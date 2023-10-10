import React, {Component} from 'react';
import {View, Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Images, Fonts} from '../../constants';

class PaymentCard extends Component {
  render() {
    const {cardType, userName, cardNo, icon, deleteCard, card_id, stripe_id} =
      this.props;

    return (
      <View style={styles.cardCont}>
        <View style={styles.cardSubCont}>
          <View style={styles.ImageView}>
            <Image
              source={Images.CustomerHomeIcon.Remove}
              style={styles.ImageStyle}
            />
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => deleteCard(card_id, stripe_id)}>
              <Image source={icon} style={styles.IconStyle} />
            </TouchableOpacity>
          </View>
          <View style={styles.CardView}>
            <Text style={styles.userName}>{cardType}</Text>
            <Text style={styles.cardText}>{userName}</Text>
            <Text style={[styles.cardTextNo]}>xxxx xxxx xxxx {cardNo}</Text>
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  CardView: {
    flex: 1,
  },
  IconStyle: {
    height: 60,
    width: 90,
    margin: 5,
  },
  ImageStyle: {
    height: 20,
    width: 20,
    margin: 5,
    position: 'absolute',
    alignSelf: 'flex-end',
  },
  ImageView: {
    flex: 1,
    width: '100%',
  },
  cardCont: {
    height: 190,
    width: 150,
    backgroundColor: '#f7f7f7',
    borderRadius: 20,
    margin: 10,
  },
  cardSubCont: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    padding: 10,
    height: '100%',
    width: '100%',
  },
  userName: {
    fontSize: 16,
    lineHeight: 25,
    fontFamily: Fonts.Lato_Bold,
  },
  cardText: {
    fontSize: 14,
    lineHeight: 25,
    fontFamily: Fonts.HeveticaNowText_Medium,
  },
  cardTextNo: {
    lineHeight: 25,
    fontFamily: Fonts.HeveticaNowText_Medium,
    fontSize: 12,
  },
});
export default PaymentCard;
