import React, {Component} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {Colors} from '../../constants';
import Icon from 'react-native-vector-icons/FontAwesome5';

class RadioButton extends Component {
  render() {
    const {value, onpress, value1, direction} = this.props;
    return (
      <View
        style={[
          // eslint-disable-next-line react-native/no-inline-styles
          {
            flexDirection: direction ? 'column' : 'row',
          },
          styles.Container,
        ]}>
        <TouchableOpacity activeOpacity={1} onPress={() => onpress(value1)}>
          <TouchableOpacity
            activeOpacity={1}
            style={styles.OpacityView}
            onPress={() => onpress(value1)}>
            <Icon
              name={value === value1 ? 'dot-circle' : 'circle'}
              style={styles.IconStyle}
              size={20}
              color={value === value1 ? Colors.ButtonColor : 'grey'}
            />
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  Container: {
    alignItems: 'center',
    alignSelf: 'center',
  },
  OpacityView: {
    justifyContent: 'center',
  },
  IconStyle: {
    marginLeft: 10,
  },
});
export default RadioButton;
