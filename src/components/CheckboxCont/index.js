/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, TouchableOpacity, Text, Image, StyleSheet} from 'react-native';
import CommonStyle from '../../constants/Style';
import Images from '../../constants/Images';
class CheckBoxCont extends Component {
  render() {
    const {label, checkvalue, onpress, marginTop, width, margin} = this.props;
    return (
      <View
        style={[
          CommonStyle.checkboxContainer,
          {
            margin: margin ? margin : 20,
            marginTop: marginTop ? marginTop : 0,
            width: width ? width : '90%',
            zIndex: -1,
          },
        ]}>
        <TouchableOpacity activeOpacity={1} onPress={() => onpress()}>
          <View style={[CommonStyle.checkboxContainer, styles.ImageView]}>
            <Image
              source={
                checkvalue
                  ? Images.ServiceIcon.Check
                  : Images.ServiceIcon.Uncheck
              }
              style={styles.ImageStyle}
            />
            <Text style={CommonStyle.label}>{label} </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  ImageStyle: {
    height: 20,
    width: 20,
  },
  ImageView: {
    margin: 0,
    width: '100%',
  },
});
export default CheckBoxCont;
