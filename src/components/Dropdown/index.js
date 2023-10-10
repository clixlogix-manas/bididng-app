import React, {Component} from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import CommonStyle from '../../constants/Style';
import {Fonts, Colors} from '../../constants';
class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Role: '',
      Experience: '',
    };
  }
  render() {
    const {
      items,
      onChange,
      value,
      placeholder,
      type,
      name,
      errStatus,
      errMsg,
      width,
    } = this.props;
    return (
      <View
        style={[
          styles.inputCont,
          // eslint-disable-next-line react-native/no-inline-styles
          {
            width: type === 'shop' ? (width ? width : '100%') : '100%',
            alignSelf: 'center',
          },
        ]}>
        <DropDownPicker
          items={items}
          defaultValue={value}
          placeholder={placeholder}
          // eslint-disable-next-line react-native/no-inline-styles
          containerStyle={{
            width: '100%',
            alignSelf: 'center',
            marginTop: 10,
            height: Platform.OS === 'android' ? 46 : 48,
          }}
          style={styles.dropDownSty}
          itemStyle={styles.itemSty}
          labelStyle={styles.labelSty}
          placeholderStyle={styles.placeholderSty}
          key={name}
          name={name}
          arrowSize={25}
          arrowColor={Colors.ImageColor}
          dropDownStyle={{backgroundColor: Colors.BorderGray}}
          onChangeItem={(item) => onChange(name, item.value)}
        />
        {errStatus && <Text style={CommonStyle.errorMsg}>{errMsg}</Text>}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  inputCont: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    marginBottom: 0,
  },
  dropDownSty: {
    borderWidth: 0,
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    backgroundColor: Colors.InputBgColor,
  },
  placeholderSty: {
    textAlign: 'left',
    fontSize: 13,
  },
  itemSty: {
    justifyContent: 'flex-start',
  },
  labelSty: {
    color: Colors.SelectColor,
    fontSize: 13,
    marginTop: 4,
    fontFamily: Fonts.HeveticaNowText_Medium,
  },
  iconStyle: {
    height: 20,
    width: 20,
  },
  labelStyle: {
    fontSize: 14,
    fontFamily: Fonts.HeveticaNowText_Medium,
  },
});
export default Dropdown;
