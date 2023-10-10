import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {Images, Fonts, Colors} from '../../../constants';
import CommonStyle from '../../../constants/Style';
import {newsPath} from '../../../constants/Config';
import {SafeAreaInsetsContext} from 'react-native-safe-area-context';
import SafeAreaView from 'react-native-safe-area-view';
import {WebView} from 'react-native-webview';

const {height} = Dimensions.get('window');

class NewsDetails extends Component {
  render() {
    const {navigation, route} = this.props;

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.subCont} showsVerticalScrollIndicator={false}>
          <View>
            <ImageBackground
              source={{uri: newsPath + route.params.data.featured_img}}
              style={CommonStyle.backgroundStyle}>
              <SafeAreaInsetsContext.Consumer>
                {(insets) => (
                  <View style={[CommonStyle.notifyCont, styles.ViewCont2]}>
                    <TouchableOpacity
                      onPress={() => navigation.goBack()}
                      activeOpacity={1}>
                      <Image
                        source={Images.SignUpIcon.BackArrow}
                        style={styles.BackArrowImg}
                      />
                    </TouchableOpacity>
                    <View style={styles.ViewCont}>
                      {/* <Text style={[CommonStyle.welcomeName]}>
                      News{' '}
                    </Text> */}
                    </View>
                  </View>
                )}
              </SafeAreaInsetsContext.Consumer>
            </ImageBackground>
            <View style={[styles.dataCont]}>
              <View style={styles.dataSubCont}>
                {/* <Image
                  source={{ uri: newsPath + route.params.data.featured_img }}
                  style={{ width: '100%', height: 224, borderRadius: 0 }}
                /> */}
                <Text style={[styles.titleText]}>
                  {route.params.data.title}
                </Text>
                <Text style={styles.dataText}>
                  Date: {route.params.data.created_at}
                </Text>
                {/*<Text style={[styles.subText]}>
                  {route.params.data.content}
                </Text> */}
                {/* <View style={{ height: '100%', width: '100%', margin: 10, paddingBottom: 15 }}> */}
                {/* <View style={{flex: 1,}}>
                     <WebView
                                bounces={false}
                                injectedJavaScript={`<meta name="viewport" content="width=device-width, initial-scale=3.0">`}
                                scalesPageToFit={false}
                                //onLoad={webLoaded}
                                source={{ html:  }}
                      />
                    </View> */}
                {/* </View> */}

                <WebView
                  scalesPageToFit={false}
                  injectedJavaScript={
                    '<meta name="viewport", content="width=device-width, initial-scale=3.0",>'
                  }
                  style={styles.WebViewStyle}
                  source={{html: route.params.data.content}}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  subText: {
    fontSize: 14,
    color: Colors.LightBlack,
    padding: 5,
    paddingBottom: 20,
    fontFamily: Fonts.HeveticaNowText_Regular,
  },
  WebViewStyle: {
    height: 686,
    width: 343,
    fontSize: 14,
    backgroundColor: 'transparent',
    fontFamily: Fonts.HeveticaNowText_Medium,
  },
  dataSubCont: {
    padding: 10,
  },
  ViewCont2: {
    marginTop: Platform.OS === 'android' ? 20 : 0,
  },
  ViewCont: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  BackArrowImg: {
    height: 20.5,
    width: 12,
    tintColor: '#ffffff',
  },
  container: {
    flex: 1,
    backgroundColor: Colors.BgColor,
  },
  subCont: {
    height,
    flex: 1,
  },
  dataCont: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    backgroundColor: Colors.BgColor,
  },
  dataText: {
    fontSize: 14,
    fontFamily: Fonts.HeveticaNowText_LightItalic,
    margin: 8,
  },
  titleText: {
    fontSize: 18,
    fontFamily: Fonts.HeveticaNowText_Medium,
    padding: 10,
    paddingLeft: 8,
  },
});
export default NewsDetails;
