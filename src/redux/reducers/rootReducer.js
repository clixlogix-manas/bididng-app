import {combineReducers} from 'redux';
import SignupReducer from './authReducer';
import PasswordReducer from './passwordReducer';
import StylistReducer from './stylistReducer';
import ServiceReducer from './serviceReducer';
import ProfileReducer from './profileReducer';
import HomeReducer from './homeReducer';
import AppointmentReducer from './appointmentReducer';
import NotificationReducer from './notificationReducer';
import SocialReducer from './socialReducer';
import StaticReducer from './StaticReducer';
import StripeReducer from './stripeReducer';
import FavouritesReducer from './favouritesReducer';

export default combineReducers({
  SignupReducer,
  PasswordReducer,
  StylistReducer,
  ServiceReducer,
  ProfileReducer,
  HomeReducer,
  AppointmentReducer,
  NotificationReducer,
  SocialReducer,
  StaticReducer,
  StripeReducer,
  FavouritesReducer,
});
