import React from 'react';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {GOOGLE_PLACES_API_KEY} from '../../constants/Config';
import {Fonts, Colors} from '../../constants';

const GooglePlacesInput = (props) => {
  const {placeholder, onAddressChange, value} = props;
  return (
    <GooglePlacesAutocomplete
      placeholder={placeholder}
      fetchDetails={true}
      onPress={(data, details) => {
        onAddressChange(details);
      }}
      isRowScrollable={true}
      currentLocation={true}
      currentLocationLabel="Select your current location"
      styles={{
        textInputContainer: {
          width: '100%',
          alignSelf: 'center',
        },
        container: {
          flex: 0,
          width: '96.5%',
          borderRadius: 4,
          marginLeft: 5,
        },
        textInput: {
          fontFamily: Fonts.HeveticaNowText_Medium,
          marginLeft: 0,
          fontSize: 13,
          borderRadius: 0,
          backgroundColor: 'transparent',
          // borderBottomWidth: 1,
          height: 46,
          color: Colors.SelectColor,
          paddingHorizontal: 5,
          // borderColor: Colors.ImageColor,
        },
        description: {
          color: Colors.SelectColor,
        },
      }}
      value={value}
      query={{
        key: GOOGLE_PLACES_API_KEY,
        language: 'en',
        components: 'country:us|country:ca',
      }}
    />
  );
};

export default GooglePlacesInput;
