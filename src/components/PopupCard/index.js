import React, {Component} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import CommonStyle from '../../constants/Style';
import {Fonts, Colors} from '../../constants';

class PopupCard extends Component {
  render() {
    const {
      modalStatus,
      onClose,
      onYes,
      label,
      title,
      screen,
      id,
      card,
      stripe,
      deleteCard,
      onDelete,
    } = this.props;
    return (
      <Modal
        backdropOpacity={0.4}
        swipeDirection="right"
        onBackButtonPress={onClose}
        onBackdropPress={onClose}
        isVisible={modalStatus}
        // swipeDirection="down"
        animationOutTiming={1000}
        animationInTiming={700}
        style={CommonStyle.overlayCont}>
        <View style={styles.Container}>
          <Text style={styles.TitleText}>{title}</Text>
        </View>
        <View style={styles.LabelText}>
          <Text style={[styles.messText]}>{label}</Text>
        </View>
        <View style={styles.bottomCont}>
          <View style={styles.OpacityView}>
            <TouchableOpacity activeOpacity={1} onPress={() => onClose()}>
              <Text style={[styles.buttonText]}>NO</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.YesView}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() =>
                screen && screen === 'logout'
                  ? onYes()
                  : screen === 'card'
                  ? deleteCard(card, stripe)
                  : onDelete(id)
              }>
              <Text style={[styles.buttonText, {color: Colors.Red}]}>YES</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
}
const styles = StyleSheet.create({
  YesView: {
    flex: 1,
    height: 50,
  },
  OpacityView: {
    flex: 1,
    height: 50,
  },
  LabelText: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 2.5,
  },
  TitleText: {
    color: Colors.Black,
    fontSize: 15,
    fontWeight: 'bold',
  },
  messText: {
    textAlign: 'center',
    fontFamily: Fonts.HeveticaNowText_Medium,
    fontSize: 16,
  },
  Container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  buttonText: {
    textAlign: 'center',
    padding: 15,
    fontSize: 14,
    height: 50,
    fontFamily: Fonts.Lato_Bold,
    borderColor: Colors.ImageColor,
    borderRightWidth: 1,
  },
  bottomCont: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: Colors.ImageColor,
  },
});
export default PopupCard;
