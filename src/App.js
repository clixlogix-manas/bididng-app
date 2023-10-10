import React, {Component} from 'react';
import {PersistGate} from 'redux-persist/es/integration/react';
import AppNavigator from './navigations/AppNavigator';
import {store, persistor} from './store/store';
import {Provider} from 'react-redux';
import {LogBox} from 'react-native';
import Geocoder from 'react-native-geocoding';
import {GOOGLE_PLACES_API_KEY} from './constants/Config';

Geocoder.init(GOOGLE_PLACES_API_KEY);
navigator.geolocation = require('@react-native-community/geolocation');

LogBox.ignoreAllLogs();
export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppNavigator newprops={this} />
        </PersistGate>
      </Provider>
    );
  }
}
