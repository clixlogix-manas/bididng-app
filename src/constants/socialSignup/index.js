/* eslint-disable no-alert */
import {Alert} from 'react-native';
import {
  AccessToken,
  GraphRequest,
  GraphRequestManager,
  LoginManager,
} from 'react-native-fbsdk';
import {GoogleSignin, statusCodes} from 'react-native-google-signin';
import {TwitterLogin} from 'react-native-login-twitter';
import {
  TWITTER_CONSUMER_KEY,
  TWITTER_CONSUMER_SECRET,
  webClientId,
} from '../Config';
import {appleAuth} from '@invertase/react-native-apple-authentication';

export const fbSignUp = async (navigation, userType) => {
  try {
    LoginManager.logOut();
    LoginManager.setLoginBehavior('web_only');
    let result = await LoginManager.logInWithPermissions([
      'email',
      'public_profile',
      'user_friends',
    ]);
    if (result.isCancelled) {
      return;
    }
    const data = await AccessToken.getCurrentAccessToken();
    if (data.accessToken) {
      const infoRequest = new GraphRequest(
        '/me?fields=id,name,email,first_name,last_name',
        null,
        (error, results) => {
          if (error) {
            alert('Error fetching data: ' + error.errorMessage.toString());
          } else {
            navigation.navigate('SocialSignUp', {
              userType: userType,
              details: results,
              social_type: 'facebook',
            });
          }
        },
      );

      new GraphRequestManager().addRequest(infoRequest).start();
    }
  } catch (error) {
    alert('Error fetching data: ' + error.message.toString());
  }
};

export const googleSignUp = async (navigation, userType) => {
  try {
    await GoogleSignin.configure({
      offlineAccess: true,
      webClientId: webClientId,
    });
    await GoogleSignin.signOut();
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    let data = {
      email: userInfo.user.email,
      first_name: userInfo.user.givenName,
      id: userInfo.user.id,
      last_name: userInfo.user.familyName,
    };
    if (userInfo) {
      navigation.navigate('SocialSignUp', {
        userType: userType,
        details: data,
        social_type: 'google',
      });
    }
  } catch (error) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      Alert.alert('The user canceled the sign in request');
    } else if (error.code === statusCodes.IN_PROGRESS) {
      Alert.alert('Sign in is already in progress');
    }
  }
};

export const twitterSignUp = async (navigation, userType) => {
  try {
    TwitterLogin.init(TWITTER_CONSUMER_KEY, TWITTER_CONSUMER_SECRET);

    const {name, last_name, userID, email} = await TwitterLogin.logIn();
    let data = {
      email: email,
      first_name: name,
      id: userID,
      last_name: last_name ? last_name : 'test',
    };
    if (userID) {
      navigation.navigate('SocialSignUp', {
        userType: userType,
        details: data,
        social_type: 'twitter',
      });
    }
  } catch (error) {
    Alert.alert(error.message);
  }
};

export const AppleSignUp = async (navigation, userType) => {
  try {
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });

    try {
      const credentialState = await appleAuth.getCredentialStateForUser(
        appleAuthRequestResponse.user,
      );
      if (credentialState === appleAuth.State.AUTHORIZED) {
        let data = {
          email: userInfo.user.email,
          first_name: userInfo.user.givenName,
          id: userInfo.user.id,
          last_name: userInfo.user.familyName,
        };
        if (userInfo) {
          navigation.navigate('SocialSignUp', {
            userType: userType,
            details: data,
            social_type: 'apple',
          });
        }
      }
    } catch (error) {
      console.error('hello to get error', error);
    }
  } catch (error) {}
};
