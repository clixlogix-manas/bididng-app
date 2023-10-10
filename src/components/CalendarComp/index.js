import React, {Component} from 'react';
import {Calendar} from 'react-native-calendars';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faAngleLeft, faAngleRight} from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import {Fonts, Colors} from '../../constants';

import {Text, StyleSheet} from 'react-native';
class CalendarComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      renderMonth: new Date(),
      selectedDate: '',
      maxDate: new Date(),
    };
  }
  render() {
    const {onDateSelect, selectedDate, DateArr, onMonthChange} = this.props;
    let markedArr = {};
    if (DateArr && DateArr.length > 0) {
      DateArr.map((date) => {
        let obj;
        obj = {
          [date]: {
            marked: true,
          },
        };
        Object.assign(markedArr, obj);
      });
    }
    let selDate = {
      [selectedDate]: {
        selected: true,
        disableTouchEvent: true,
        selectedColor: Colors.Pink,
        selectedTextColor: Colors.White,
      },
    };
    Object.assign(markedArr, selDate);
    return (
      <Calendar
        current={moment().format('YYYY-MM-DD')}
        minDate={moment().format('YYYY-MM-DD')}
        maxDate={moment(new Date().setMonth(new Date().getMonth() + 3)).format(
          'YYYY-MM-DD',
        )}
        onDayPress={(day) => {
          onDateSelect(day.dateString);
        }}
        markedDates={markedArr}
        onMonthChange={(month) => {
          if (onMonthChange) {
            onMonthChange(month);
          }
        }}
        style={styles.FontAwesomeStyle}
        hideArrows={false}
        renderArrow={(direction) =>
          direction === 'left' ? (
            <FontAwesomeIcon
              icon={faAngleLeft}
              size={30}
              color={Colors.ImageColor}
            />
          ) : (
            <FontAwesomeIcon
              icon={faAngleRight}
              size={30}
              color={Colors.ImageColor}
            />
          )
        }
        hideExtraDays={true}
        disableMonthChange={false}
        firstDay={1}
        onPressArrowLeft={(subtractMonth) => subtractMonth()}
        onPressArrowRight={(addMonth) => addMonth()}
        disableAllTouchEventsForDisabledDays={true}
        theme={{
          textDayFontFamily: Fonts.Lato_Black,
          textDayFontSize: 13,
          dayTextColor: Colors.Black,
          arrowColor: Colors.ImageColor,
          textDayHeaderFontFamily: Fonts.Lato_Black,
          textSectionTitleColor: Colors.mediumGray,
          selectedDayBackgroundColor: Colors.ButtonColor,
          selectedDayTextColor: Colors.Pink,
          todayTextColor: Colors.ButtonColor,
        }}
        /** Replace default month and year title with custom one. the function receive a date as parameter. */
        renderHeader={(date) => {
          return (
            <Text style={styles.DataText}>
              {moment(date.toString()).format('MMMM, YYYY')}
            </Text>
          );

          /*Return JSX*/
        }}
        enableSwipeMonths={true}
      />
    );
  }
}
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
  },
  FontAwesomeStyle: {
    borderRadius: 15,
    width: 385,
    height: 380,
  },
  DataText: {
    fontSize: 16,
    fontFamily: Fonts.Lato_Heavy,
    color: Colors.ButtonColor,
  },
});
export default CalendarComp;
