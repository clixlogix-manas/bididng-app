/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';
import {Fonts, Colors} from '../../constants';
import DropDownPicker from 'react-native-dropdown-picker';

const listAMPM = [
  {
    label: 'AM',
    value: 'am',
  },
  {
    label: 'PM',
    value: 'pm',
  },
];

class DoubleDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Profession: '',
      Role: '',
      Experience: '',
    };
  }

  comp1 = (
    items,
    start,
    placeholder1,
    label,
    onOpen,
    onClose,
    dayName,
    startTimeZone,
    onChange,
    handleOnZoneChange,
  ) => {
    return (
      <View style={[styles.inputStyle]}>
        <View style={styles.SubCont}>
          <Text style={styles.FromText}>FROM</Text>
          {/* <View style={{ zIndex: Platform.OS === 'android' ? 3000 : 1000 }}> */}
          <DropDownPicker
            items={items}
            defaultValue={start}
            placeholder={placeholder1}
            dropDownDirection={'TOP'}
            zIndex={3000}
            zIndexInverse={1000}
            containerStyle={styles.containerSty}
            onOpen={() => onOpen && onOpen(label, placeholder1)}
            onClose={() => onClose && onClose(label, placeholder1)}
            style={styles.DropStyle}
            itemStyle={styles.itemS}
            labelStyle={styles.labelS}
            placeholderStyle={styles.placeholderS}
            dropDownMaxHeight={100}
            arrowSize={25}
            value={'3'}
            arrowColor={Colors.ImageColor}
            arrowStyle={styles.arrowS}
            dropDownStyle={styles.dropDownS}
            onChangeItem={(item) =>
              onChange(dayName, 'start', label, item.value, startTimeZone)
            }
          />
          <DropDownPicker
            items={listAMPM}
            defaultValue={startTimeZone}
            placeholder={placeholder1}
            zIndex={2000}
            zIndexInverse={2000}
            containerStyle={styles.containerS1}
            onOpen={() => onOpen && onOpen(label, placeholder1)}
            onClose={() => onClose && onClose(label, placeholder1)}
            style={styles.style1}
            itemStyle={styles.itemS1}
            labelStyle={styles.labelS1}
            placeholderStyle={styles.placeholderS1}
            dropDownMaxHeight={100}
            arrowSize={25}
            arrowColor={Colors.ImageColor}
            arrowStyle={styles.arrowS1}
            dropDownStyle={styles.dropDownS1}
            onChangeItem={
              (item) => handleOnZoneChange(dayName, label, 'start', item.value)
              //onChange(dayName, 'start', label, item.value, startTimeZone)
            }
          />
          {/* </View> */}
        </View>
        {/* <View
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            flex: 1.3,
          }}>
          <View
            style={[
              CommonStyle.buttonStyle,
              {
                borderWidth: 0,
                width: 52,
              },
            ]}>
            <Text style={[styles.labelStyle]}>AM</Text>
            <TouchableOpacity
              activeOpacity={1}
              style={{ justifyContent: 'center' }}
              onPress={() => handleOnZoneChange(dayName, label, 'start', 'am')}>
              <Icon
                name={startTimeZone === 'am' ? 'dot-circle' : 'circle'}
                style={{ marginLeft: 10 }}
                size={20}
                color={startTimeZone === 'am' ? Colors.Red : 'grey'}
              />
            </TouchableOpacity>
          </View>
          <View
            style={[
              CommonStyle.buttonStyle,
              {
                borderWidth: 0,
                width: 52,
              },
            ]}>
            <Text style={[styles.labelStyle]}>PM</Text>
            <TouchableOpacity
              activeOpacity={1}
              style={{ justifyContent: 'center' }}
              onPress={() => handleOnZoneChange(dayName, label, 'start', 'pm')}>
              <Icon
                name={startTimeZone === 'pm' ? 'dot-circle' : 'circle'}
                style={{ marginLeft: 10 }}
                size={20}
                color={startTimeZone === 'pm' ? Colors.Red : 'grey'}
              />
            </TouchableOpacity>
          </View>
        </View> */}
      </View>
    );
  };
  comp2 = (
    items2,
    end,
    placeholder2,
    label,
    onOpen,
    onClose,
    dayName,
    endTimeZone,
    onChange,
    handleOnZoneChange,
  ) => {
    return (
      <View style={[styles.inputStyle, styles.containerS2]}>
        <View style={styles.SubCont2}>
          <Text style={styles.TextS2}>TO</Text>

          {/* <View style={{ zIndex: Platform.OS === 'android' ? 2000 : 1000, zIndexInverse: 2000 }}> */}
          <DropDownPicker
            items={items2}
            defaultValue={end}
            placeholder={placeholder2}
            dropDownDirection={'TOP'}
            zIndex={3000}
            zIndexInverse={1000}
            containerStyle={{
              width: 110,
              alignSelf: 'center',
              height: Platform.OS === 'android' ? 40 : 44,
            }}
            style={styles.style2}
            itemStyle={styles.itemS1}
            labelStyle={styles.labelS1}
            placeholderStyle={styles.placeholderS1}
            dropDownMaxHeight={100}
            onOpen={() => onOpen && onOpen(label, placeholder2)}
            onClose={() => onClose && onClose(label, placeholder2)}
            arrowSize={25}
            arrowColor={Colors.ImageColor}
            arrowStyle={styles.arrowS}
            dropDownStyle={styles.DropdownS2}
            onChangeItem={(item) =>
              onChange(dayName, 'end', label, item.value, endTimeZone)
            }
          />
          {/* </View> */}
          <DropDownPicker
            items={listAMPM}
            defaultValue={endTimeZone}
            placeholder={placeholder2}
            zIndex={2000}
            zIndexInverse={2000}
            containerStyle={{
              alignSelf: 'center',
              justifyContent: 'center',
              width: 100,
              height: Platform.OS === 'android' ? 40 : 44,
            }}
            onOpen={() => onOpen && onOpen(label, placeholder2)}
            onClose={() => onClose && onClose(label, placeholder2)}
            style={styles.style3}
            itemStyle={styles.itemStyle3}
            labelStyle={styles.labelStyle3}
            placeholderStyle={styles.placeholderStyle3}
            dropDownMaxHeight={100}
            arrowSize={25}
            arrowColor={Colors.ImageColor}
            arrowStyle={styles.arrowS1}
            dropDownStyle={styles.dropDownStyle3}
            onChangeItem={
              (item) => handleOnZoneChange(dayName, label, 'end', item.value)
              //  onChange(dayName, 'start', label, item.value, startTimeZone)
            }
          />
        </View>

        <View style={styles.style11} />
      </View>
    );
  };
  render() {
    const {
      label,
      items,
      items2,
      onChange,
      start,
      end,
      placeholder1,
      placeholder2,
      onOpen,
      onClose,
      dayName,
      startTimeZone,
      endTimeZone,
      handleOnZoneChange,
    } = this.props;
    return (
      <View style={[styles.inputCont, styles.inputCont1]}>
        {Platform.OS === 'android' ? (
          <Text style={[styles.labelStyle, {color: Colors.ButtonColor}]}>
            {label}
          </Text>
        ) : (
          <Text style={[styles.labelStyle, styles.labelStyle11]}>{label}</Text>
        )}
        <View style={styles.dropdownCont}>
          {Platform.OS === 'android' ? (
            this.comp1(
              items,
              start,
              placeholder1,
              label,
              onOpen,
              onClose,
              dayName,
              startTimeZone,
              onChange,
              handleOnZoneChange,
            )
          ) : (
            <View style={styles.comp1Style}>
              {this.comp1(
                items,
                start,
                placeholder1,
                label,
                onOpen,
                onClose,
                dayName,
                startTimeZone,
                onChange,
                handleOnZoneChange,
              )}
            </View>
          )}
          {Platform.OS === 'android' ? (
            this.comp2(
              items2,
              end,
              placeholder2,
              label,
              onOpen,
              onClose,
              dayName,
              endTimeZone,
              onChange,
              handleOnZoneChange,
            )
          ) : (
            <View style={styles.comp2Style}>
              {this.comp2(
                items2,
                end,
                placeholder2,
                label,
                onOpen,
                onClose,
                dayName,
                endTimeZone,
                onChange,
                handleOnZoneChange,
              )}
            </View>
          )}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  inputCont: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    flex: 1,
    marginBottom: 20,
  },
  containerS2: {
    marginTop: 10,
  },
  labelStyle11: {
    color: Colors.ButtonColor,
    marginBottom: 10,
  },
  dropDownStyle3: {
    backgroundColor: Colors.BorderGray,
    alignItems: 'center',
    height: 90,
    marginLeft: 10,
    width: 90,
  },
  comp1Style: {
    zIndex: 10000,
  },
  comp2Style: {
    zIndex: 1000,
  },
  itemStyle3: {
    justifyContent: 'flex-start',
  },
  style11: {
    height: 40,
  },
  style2: {
    borderWidth: 1,
    backgroundColor: 'transparent',
    borderColor: Colors.Black,
  },
  labelStyle3: {
    color: Colors.Black,
    fontSize: 14,
    fontFamily: Fonts.HeveticaNowText_Medium,
  },
  inputCont1: {
    marginHorizontal: 15,
  },
  style3: {
    borderWidth: 1,
    backgroundColor: 'transparent',
    borderColor: Colors.Black,
    justifyContent: 'center',
    alignItems: 'center',
    marginStart: 10,
  },
  placeholderStyle3: {
    textAlign: 'left',
    fontSize: 13,
    marginRight: 20,
  },
  TextS2: {
    fontSize: 14,
    fontFamily: Fonts.Lato_Medium,
    color: Colors.ButtonColor,
    width: 80,
    fontStyle: 'italic',
  },
  DropdownS2: {
    backgroundColor: Colors.BorderGray,
    height: 90,
  },
  SubCont2: {
    flex: 2,
    alignItems: 'center',
    flexDirection: 'row',
  },
  dropDownS1: {
    backgroundColor: Colors.BorderGray,
    alignItems: 'flex-end',
    marginLeft: 10,
    height: 90,
    width: 90,
  },
  labelS1: {
    color: Colors.Black,
    fontSize: 14,
    fontFamily: Fonts.HeveticaNowText_Medium,
  },
  placeholderS1: {
    textAlign: 'left',
    fontSize: 13,
    marginRight: 20,
  },
  style1: {
    borderWidth: 1,
    backgroundColor: 'transparent',
    borderColor: Colors.Black,
    justifyContent: 'center',
    alignItems: 'center',
    marginStart: 10,
  },
  containerS1: {
    alignSelf: 'center',
    justifyContent: 'center',
    width: 100,
    height: Platform.OS === 'android' ? 40 : 44,
  },
  inputStyle: {},
  labelStyle: {
    fontSize: 14,
    fontFamily: Fonts.HeveticaNowText_Medium,
  },
  itemS1: {
    justifyContent: 'flex-start',
  },
  arrowS: {
    height: 25,
  },
  arrowS1: {
    height: 25,
  },
  placeholderS: {
    textAlign: 'left',
    fontSize: 13,
    marginRight: 20,
  },
  dropDownS: {
    backgroundColor: Colors.BorderGray,
    alignItems: 'center',
    height: 90,
  },
  dropdownCont: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 1,
  },
  labelS: {
    color: Colors.Black,
    fontSize: 14,
    fontFamily: Fonts.HeveticaNowText_Medium,
  },
  DropStyle: {
    borderWidth: 1,
    backgroundColor: 'transparent',
    borderColor: Colors.Black,
    justifyContent: 'center',
    alignItems: 'center',
  },
  SubCont: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  containerSty: {
    alignSelf: 'center',
    justifyContent: 'center',
    width: 110,
    height: Platform.OS === 'android' ? 40 : 44,
  },
  FromText: {
    fontSize: 14,
    fontFamily: Fonts.Lato_Medium,
    color: Colors.ButtonColor,
    width: 80,
    fontStyle: 'italic',
  },
  itemS: {
    justifyContent: 'flex-start',
  },
});
export default DoubleDropdown;
