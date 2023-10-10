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
              styles.OpacityStyle,
              {
                borderColor: value === value1 ? Colors.ButtonColor : '#F9F9F9',
              },
            ]}>
            <TouchableOpacity activeOpacity={1} onPress={() => onpress(value1)}>
              <Icon
                name={value === value1 ? 'dot-circle' : 'circle'}
                style={styles.IconStyle}
                size={20}
                color={value === value1 ? Colors.ButtonColor : '#333333'}
              />
            </TouchableOpacity>
            <Text
              style={[
                styles.label1Text,
                {color: value === value1 ? Colors.ButtonColor : '#191514'},
              ]}>
              {label1}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={1} onPress={() => onpress(value2)}>
          <View
            style={[
              styles.OpacityView,
              {
                marginTop: direction ? 20 : 0,
                borderColor: value === value2 ? Colors.ButtonColor : '#F9F9F9',
              },
            ]}>
            <TouchableOpacity
              activeOpacity={1}
              style={styles.CircleView}
              onPress={() => onpress(value2)}>
              <Icon
                name={value === value2 ? 'dot-circle' : 'circle'}
                size={20}
                style={styles.IconSty}
                color={value === value2 ? Colors.ButtonColor : '#333333'}
              />
            </TouchableOpacity>

            <Text
              style={[
                styles.label2Style,
                {
                  color: value === value1 ? '#191514' : Colors.ButtonColor,
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
  OpacityStyle: {
    width: 130,
    height: 40,
    borderWidth: 1,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF0F6',
  },
  IconSty: {
    marginLeft: 10,
  },
  IconStyle: {
    marginLeft: 10,
  },
  label1Text: {
    marginRight: 40,
    fontSize: 14,
    marginLeft: 10,
    fontFamily: Fonts.HeveticaNowText_Medium,
  },
  label2Style: {
    marginRight: 40,
    fontSize: 14,
    marginLeft: 10,
    fontFamily: Fonts.HeveticaNowText_Medium,
  },
  CircleView: {
    justifyContent: 'center',
  },
  OpacityView: {
    width: 130,
    height: 40,
    borderWidth: 1,
    flexDirection: 'row',
    borderRadius: 4,
    alignItems: 'center',
    backgroundColor: '#EFF0F6',
    marginStart: 15,
  },
});

export default ContactButton;
