/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Colors, Fonts} from '../../constants';
import CommonStyle from '../../constants/Style';
import Icon from 'react-native-vector-icons/FontAwesome5';

class ContactButton extends Component {
  render() {
    const {value, onpress, account, value1, value2, label1, label2, direction} =
      this.props;
    return (
      <View
        style={[
          CommonStyle.buttonCont,
          {
            width: account ? '100%' : '100%',
            flexDirection: direction ? 'column' : 'row',
            zIndex: -1,
          },
        ]}>
        <TouchableOpacity activeOpacity={1} onPress={() => onpress(value1)}>
          <View
            style={[
              styles.IconView,
              {
                borderColor: value === value1 ? Colors.ButtonColor : '#F9F9F9',
              },
            ]}>
            <TouchableOpacity activeOpacity={1} onPress={() => onpress(value1)}>
              <Icon
                name={value === value1 ? 'dot-circle' : 'circle'}
                style={styles.IconS}
                size={20}
                color={value === value1 ? Colors.ButtonColor : 'grey'}
              />
            </TouchableOpacity>
            <Text
              style={[
                styles.label1style,
                {
                  color: value === value1 ? Colors.ButtonColor : '#000',
                },
              ]}>
              {label1}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={1} onPress={() => onpress(value2)}>
          <View
            style={[
              styles.ValueView,
              {
                borderColor: value === value2 ? Colors.ButtonColor : '#F9F9F9',
                marginTop: direction ? 20 : 0,
              },
            ]}>
            <TouchableOpacity
              activeOpacity={1}
              style={styles.OpacityIcon}
              onPress={() => onpress(value2)}>
              <Icon
                name={value === value2 ? 'dot-circle' : 'circle'}
                size={20}
                style={styles.IconV}
                color={value === value2 ? Colors.ButtonColor : 'grey'}
              />
            </TouchableOpacity>

            <Text
              style={[
                styles.label2Style,
                {
                  color: value === value1 ? '#000' : Colors.ButtonColor,
                },
              ]}>
              {label2}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  IconView: {
    width: 130,
    height: 40,
    borderWidth: 1,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF0F6',
  },
  ValueView: {
    width: 130,
    height: 40,
    borderWidth: 1,
    flexDirection: 'row',
    borderRadius: 4,
    alignItems: 'center',
    backgroundColor: '#EFF0F6',
    marginStart: 15,
  },
  label2Style: {
    marginRight: 40,
    fontSize: 14,
    marginLeft: 10,
    fontFamily: Fonts.HeveticaNowText_Medium,
  },
  IconV: {
    marginLeft: 10,
  },
  OpacityIcon: {
    justifyContent: 'center',
  },
  IconS: {
    marginLeft: 10,
  },
  label1style: {
    marginRight: 40,
    fontSize: 14,
    marginLeft: 10,
    fontFamily: Fonts.HeveticaNowText_Medium,
  },
});
export default ContactButton;
