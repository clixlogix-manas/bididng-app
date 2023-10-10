import React, {Component} from 'react';
import moment from 'moment';
import {Fonts, Colors} from '../../constants';
import CalendarStrip from 'react-native-calendar-strip';
import {StyleSheet} from 'react-native';
class MiniCalendarComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDay: moment(new Date()).format('MMM, YYYY'),
      selectedDate: '',
    };
  }
  render() {
    const {selectedDate, onDateSelection} = this.props;
    return (
      <CalendarStrip
        daySelectionAnimation={{
          type: 'background',
          highlightColor: Colors.Red,
        }}
        calendarHeaderStyle={styles.calendarHeaderSty}
        dateNumberStyle={styles.dateNumberSty}
        selectedDate={selectedDate}
        onDateSelected={(date) => {
          onDateSelection(date);
        }}
        headerText={
          new Date(moment(selectedDate).format('llll')).getDate() ===
          new Date().getDate()
            ? 'Today                                         ' +
              this.state.selectedDay
            : '                                                    ' +
              this.state.selectedDay
        }
        dateNameStyle={styles.dayNameStyle}
        highlightDateNumberStyle={styles.highlightDateNumberStyle}
        highlightDateNameStyle={styles.highlightDateNameStyle}
        iconStyle={styles.iconSty}
        style={styles.style1}
      />
    );
  }
}
const styles = StyleSheet.create({
  dateNumberSty: {
    color: Colors.Black,
    fontSize: 13,
    fontFamily: Fonts.Lato_Black,
  },
  dayNameStyle: {
    color: Colors.Black,
    fontSize: 13,
    fontFamily: Fonts.HeveticaNowText_Black,
    textTransform: 'capitalize',
    marginBottom: 20,
  },
  iconSty: {
    height: 0,
  },
  dayNumberStyle: {
    fontSize: 13,
    fontFamily: Fonts.HeveticaNowText_Black,
  },
  calendarHeaderSty: {
    fontFamily: Fonts.HeveticaNowText_Black,
    fontSize: 16,
  },
  style1: {
    height: 180,
    paddingTop: 20,
    paddingBottom: 10,
    width: '100%',
  },
  highlightDateNameStyle: {
    textTransform: 'capitalize',
    height: 43,
    width: 40,
    paddingTop: 9,

    color: Colors.White,
    fontSize: 13,
    fontFamily: Fonts.HeveticaNowText_Black,
  },
  highlightDateNumberStyle: {
    color: Colors.White,
    fontSize: 13,
    fontFamily: Fonts.HeveticaNowText_Black,
    paddingBottom: 10,
  },
});
export default MiniCalendarComp;
