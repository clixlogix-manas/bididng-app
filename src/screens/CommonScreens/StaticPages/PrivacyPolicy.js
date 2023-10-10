import React, {Component} from 'react';
import {
  View,
  Text,
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import {connect} from 'react-redux';
import {Images, Colors} from '../../../constants';
import CommonStyle from '../../../constants/Style';
import HTML from 'react-native-render-html';
import {SafeAreaInsetsContext} from 'react-native-safe-area-context';
import SafeAreaView from 'react-native-safe-area-view';
import Fonts from '../../../constants/Fonts';

const {height} = Dimensions.get('window');

class PrivacyPolicy extends Component {
  render() {
    const {navigation, PrivacyPolicies} = this.props;

    return (
      <SafeAreaView style={styles.container}>
        {/* <ImageBackground
          source={Images.HomeIcon.RedBg}
          imageStyle={{
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
          }}
          style={CommonStyle.backgroundStyle}> */}
        <SafeAreaInsetsContext.Consumer>
          {(insets) => (
            <View style={[styles.subCont]}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                activeOpacity={1}>
                <Image
                  source={Images.SignUpIcon.BackArrow}
                  style={styles.BackArrowImg}
                />
              </TouchableOpacity>
              <Text style={styles.textsty}>Privacy Policy </Text>
              <Text style={[CommonStyle.welcomeName, styles.welcomeText]}>
                {' '}
              </Text>
            </View>
          )}
        </SafeAreaInsetsContext.Consumer>
        {/* </ImageBackground> */}

        <View
          style={[CommonStyle.profileCard, {backgroundColor: Colors.White}]}>
          <ScrollView style={{height}} showsVerticalScrollIndicator={false}>
            <View style={styles.ViewCont}>
              <Text style={CommonStyle.staticText}>
                {PrivacyPolicies && (
                  <HTML
                    html={PrivacyPolicies.content}
                    imagesMaxWidth={Dimensions.get('window').width}
                    baseFontStyle={CommonStyle.staticText}
                  />
                )}
              </Text>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.White,
    flex: 1,
  },
  BackArrowImg: {
    height: 20.5,
    width: 12,
    marginTop: 4,
  },
  welcomeText: {
    fontSize: 16,
  },
  textsty: {
    fontSize: 18,
    marginLeft: -17,
    fontFamily: Fonts.HeveticaNowText_Bold,
    color: '#283A58',
    fontWeight: 'bold',
  },
  subCont: {
    marginTop: Platform.OS === 'android' ? 10 : 0,
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
  },
  ViewCont: {
    alignItems: 'center',
  },
});

const mapStateToProps = (state) => {
  return {
    PrivacyPolicies: state.StaticReducer.PrivacyPolicy,
  };
};

export default connect(mapStateToProps, null)(PrivacyPolicy);
