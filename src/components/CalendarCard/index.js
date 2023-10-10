import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
  // Dimensions,
} from 'react-native';
import {Images} from '../../constants';
import CommonStyle from '../../constants/Style';
import DoubleDropdown from '../DoubleDropdown/index';
// const {width} = Dimensions.get('window');

class CalenderCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toogleStatus: false,
      heightExp: false,
      heightExp2: false,
      heightExp3: false,
      workEndZone: 'pm',
      workStartZone: 'am',
      breakEndZone: 'pm',
      breakStartZone: 'am',
    };
  }

  render() {
    const {
      day,
      status,
      onToogleChange,
      name,
      type,
      handleOnChange,
      handleOnZoneChange,
      workStart,
      workEnd,
      breakStart,
      breakEnd,
      timeList,
      endTimeList,
      workStartZone,
      workEndZone,
      breakStartZone,
      breakEndZone,
    } = this.props;
    const placeholder1 = 'Select';
    const placeholder2 = 'Select';
    return (
      <View style={[styles.inputCont]}>
        <View style={styles.topPart}>
          <View style={styles.thirdView}>
            <Text style={[CommonStyle.dayText, styles.dayTextsty]}>{day}</Text>
          </View>
          <TouchableOpacity
            onPress={() => onToogleChange(name, !this.state.toogleStatus)}
            activeOpacity={1}>
            <View style={styles.ImageView}>
              <Image
                source={
                  status
                    ? Images.ProfileBuildIcon.On
                    : Images.ProfileBuildIcon.Off
                }
                resizeMode="contain"
                style={
                  (styles.ProfileBuildIconStyle,
                  {height: 30, width: 52, transform: [{rotate: '180deg'}]})
                }
              />
            </View>
          </TouchableOpacity>
        </View>
        {status && (
          <View style={styles.ImageView}>
            {Platform.OS === 'android' ? (
              <DoubleDropdown
                label="WORKING TIME"
                items={timeList}
                items2={endTimeList}
                dayName={day}
                type={type}
                start={workStart}
                startTimeZone={workStartZone}
                endTimeZone={workEndZone}
                end={workEnd}
                handleOnZoneChange={handleOnZoneChange}
                onChange={handleOnChange}
                placeholder1={placeholder1}
                placeholder2={placeholder2}
              />
            ) : (
              <View style={styles.zIndexStyle}>
                <DoubleDropdown
                  label="WORKING TIME"
                  items={timeList}
                  items2={endTimeList}
                  dayName={day}
                  type={type}
                  start={workStart}
                  startTimeZone={workStartZone}
                  endTimeZone={workEndZone}
                  end={workEnd}
                  handleOnZoneChange={handleOnZoneChange}
                  onChange={handleOnChange}
                  placeholder1={placeholder1}
                  placeholder2={placeholder2}
                />
              </View>
            )}

            {Platform.OS === 'android' ? (
              <View style={styles.style1}>
                <DoubleDropdown
                  label="BREAK TIME"
                  items={timeList}
                  items2={endTimeList}
                  type={type}
                  start={breakStart}
                  end={breakEnd}
                  handleOnZoneChange={handleOnZoneChange}
                  dayName={day}
                  startTimeZone={breakStartZone}
                  endTimeZone={breakEndZone}
                  onOpen={(names, placeholder) => {
                    if (
                      names === 'Break Time' &&
                      placeholder === placeholder2
                    ) {
                      this.setState({heightExp2: true, heightExp3: false});
                    } else if (
                      names === 'Break Time' &&
                      placeholder === placeholder1
                    ) {
                      this.setState({heightExp: true, heightExp3: true});
                    }
                  }}
                  onClose={(names, placeholder) => {
                    if (
                      names === 'Break Time' &&
                      placeholder === placeholder2
                    ) {
                      this.setState({heightExp2: false, heightExp3: false});
                    } else if (
                      names === 'Break Time' &&
                      placeholder === placeholder1
                    ) {
                      this.setState({heightExp: false, heightExp3: false});
                    }
                  }}
                  onChange={handleOnChange}
                  placeholder1={placeholder1}
                  placeholder2={placeholder2}
                />
              </View>
            ) : (
              <View style={styles.styleTwo}>
                <DoubleDropdown
                  label="BREAK TIME"
                  items={timeList}
                  items2={endTimeList}
                  type={type}
                  start={breakStart}
                  end={breakEnd}
                  handleOnZoneChange={handleOnZoneChange}
                  dayName={day}
                  startTimeZone={breakStartZone}
                  endTimeZone={breakEndZone}
                  onOpen={(names, placeholder) => {
                    if (
                      names === 'Break Time' &&
                      placeholder === placeholder2
                    ) {
                      this.setState({heightExp2: true, heightExp3: false});
                    } else if (
                      names === 'Break Time' &&
                      placeholder === placeholder1
                    ) {
                      this.setState({heightExp: true, heightExp3: true});
                    }
                  }}
                  onClose={(names, placeholder) => {
                    if (
                      names === 'Break Time' &&
                      placeholder === placeholder2
                    ) {
                      this.setState({heightExp2: false, heightExp3: false});
                    } else if (
                      names === 'Break Time' &&
                      placeholder === placeholder1
                    ) {
                      this.setState({heightExp: false, heightExp3: false});
                    }
                  }}
                  onChange={handleOnChange}
                  placeholder1={placeholder1}
                  placeholder2={placeholder2}
                />
              </View>
            )}

            {this.state.heightExp2 && <View style={styles.heightStyle} />}
            {this.state.heightExp3 && <View style={styles.heightSty} />}
          </View>
        )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  inputCont: {
    width: 318,
    display: 'flex',
    marginBottom: 20,
    alignSelf: 'center',
    borderRadius: 15,
    // width: width - 40,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 1,
    elevation: 2,
    margin: 5,
  },
  heightStyle: {
    height: 90,
  },
  ImageView: {
    flex: 1,
  },
  heightSty: {
    height: 50,
  },
  style1: {
    marginBottom: 10,
    marginTop: 20,
  },
  dayTextsty: {
    textTransform: 'capitalize',
  },
  zIndexStyle: {
    zIndex: 2000,
  },
  thirdView: {
    flex: 1,
    justifyContent: 'center',
  },
  topPart: {
    flex: 0.5,
    paddingVertical: 15,
    paddingHorizontal: 15,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  borderLine: {
    borderBottomWidth: 1,
    alignSelf: 'center',
    borderBottomColor: '#F3F2F3',
    width: '95%',
  },
});
export default CalenderCard;
