import React, {Component} from 'react';
import {
  View,
  Text,
  Dimensions,
  Image,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  Platform,
  StyleSheet,
} from 'react-native';
import {connect} from 'react-redux';
import {Images} from '../../../constants';
import CommonStyle from '../../../constants/Style';
import HTML from 'react-native-render-html';
import {SafeAreaInsetsContext} from 'react-native-safe-area-context';
import Fonts from '../../../constants/Fonts';
const {height} = Dimensions.get('window');

class AboutUs extends Component {
  render() {
    // eslint-disable-next-line no-shadow
    const {navigation, AboutUs} = this.props;

    return (
      <View>
        <ImageBackground
          source={Images.StaticPage.AboutUs}
          style={CommonStyle.backgroundStyle}>
          <SafeAreaInsetsContext.Consumer>
            {(insets) => (
              <View
                style={[
                  // eslint-disable-next-line react-native/no-inline-styles
                  {
                    marginTop:
                      Platform.OS === 'android'
                        ? 30
                        : insets.top === 20
                        ? 40
                        : 60,
                  },
                ]}>
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  activeOpacity={1}>
                  <Image
                    source={Images.Notification.BackArrow}
                    style={styles.BackArrowSty}
                  />
                </TouchableOpacity>
                {/* <Text style={[CommonStyle.welcomeName, { marginLeft: -30 }]}>
                  About Us{' '}
                </Text>
                <Text style={[CommonStyle.welcomeName, { fontSize: 16 }]}> </Text> */}
                <View style={styles.ImageCont}>
                  <Image
                    source={Images.StaticPage.LogoTwo}
                    style={styles.ImageStyle}
                  />
                </View>
              </View>
            )}
          </SafeAreaInsetsContext.Consumer>
        </ImageBackground>
        <View style={styles.viewCont}>
          <View style={styles.textCont}>
            <Text style={styles.textSty}>About Us</Text>
          </View>
          <View
            style={[
              CommonStyle.profileCard,
              {
                minHeight: height - height / 5,
              },
            ]}>
            <ScrollView
              style={styles.ScrollViewSty}
              showsVerticalScrollIndicator={false}>
              <View style={styles.textCont2}>
                <Text style={CommonStyle.staticText}>
                  {AboutUs && (
                    <HTML
                      html={AboutUs.content}
                      imagesMaxWidth={Dimensions.get('window').width}
                      baseFontStyle={CommonStyle.staticText}
                    />
                  )}
                </Text>
              </View>
            </ScrollView>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  BackArrowSty: {
    height: 20.5,
    width: 12,
    marginLeft: 15,
    tintColor: '#8E8E93',
  },
  ImageCont: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  ScrollViewSty: {
    height,
    flex: 1,
  },
  textCont2: {
    padding: 10,
    alignItems: 'center',
  },
  textSty: {
    fontSize: 18,
    color: '#283A58',
    fontFamily: Fonts.Lato_Bold,
  },
  textCont: {
    alignItems: 'flex-start',
    marginTop: 20,
    marginLeft: 20,
  },
  ImageStyle: {
    height: 80,
    width: 130,
    marginBottom: '25%',
  },
  viewCont: {
    backgroundColor: '#FFFFFF',
  },
});

const mapStateToProps = (state) => {
  return {
    AboutUs: state.StaticReducer.AboutUs,
  };
};

export default connect(mapStateToProps, null)(AboutUs);
