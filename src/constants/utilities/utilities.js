import {stylistBasepath} from '../Config';
import axios from 'axios';
import Geocoder from 'react-native-geocoding';
import GetLocation from 'react-native-get-location';
import {Alert} from 'react-native';

async function getState(formdata) {
  let retRes;
  await axios.post(stylistBasepath + 'get_us_state', formdata).then((res) => {
    let listOfData;
    if (typeof res.data.states === 'string') {
      listOfData = JSON.parse(JSON.stringify(res.data.states));
    } else {
      listOfData = res.data.states;
    }

    let statesList = Object.keys(listOfData).map((key, index) => {
      return {
        label: listOfData[key],
        value: key,
      };
    });
    retRes = statesList;
  });
  return retRes;
}
async function getCity(formdata) {
  let retRes;

  await axios.post(stylistBasepath + 'get_us_cities', formdata).then((res) => {
    let listOfData;
    if (typeof res.data.cities === 'string') {
      listOfData = JSON.parse(JSON.stringify(res.data.cities));
    } else {
      listOfData = res.data.cities;
    }

    let citiesList = Object.keys(listOfData).map((key, index) => {
      return {
        label: listOfData[key],
        value: key,
      };
    });
    retRes = citiesList;
  });

  return retRes;
}

const onLocationSearch = async (value) => {
  try {
    let json = await Geocoder.from(value);
    return json.results[0].geometry.location;
  } catch (error) {}
};

const getCurrentLocation = async () => {
  try {
    let location = await GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    });
    return {
      currentLatitude: location.latitude,
      currentLongitude: location.longitude,
    };
  } catch (ex) {
    const {code} = ex;
    if (code === 'CANCELLED') {
      Alert.alert('Location cancelled by user or by another request');
    }
    if (code === 'UNAVAILABLE') {
      Alert.alert('Location service is disabled or unavailable');
    }
    if (code === 'TIMEOUT') {
      Alert.alert('Location request timed out');
    }
    if (code === 'UNAUTHORIZED') {
      Alert.alert('Authorization denied');
    }
  }
};

const sortByDate = (a, b) => {
  var dateA = new Date(a.date_time).getTime();
  var dateB = new Date(b.date_time).getTime();
  return dateA > dateB ? 1 : -1;
};

export {getState, getCity, onLocationSearch, getCurrentLocation, sortByDate};
