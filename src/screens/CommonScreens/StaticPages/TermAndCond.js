import React, {Component} from 'react';
import {
  View,
  Text,
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {connect} from 'react-redux';
import {Images, Colors} from '../../../constants';
import CommonStyle from '../../../constants/Style';
import HTML from 'react-native-render-html';
import {SafeAreaInsetsContext} from 'react-native-safe-area-context';
import SafeAreaView from 'react-native-safe-area-view';

const {height} = Dimensions.get('window');

class TermAndCond extends Component {
  render() {
    const {navigation, TermAndCondition} = this.props;

    return (
      <SafeAreaView style={{backgroundColor: Colors.White}}>
        {/* <ImageBackground
          source={Images.HomeIcon.RedBg}
          imageStyle={{
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
          }}
          style={CommonStyle.backgroundStyle}> */}
        <SafeAreaInsetsContext.Consumer>
          {(insets) => (
            <View style={styles.subCont}>
              <View style={[CommonStyle.notifyCont]}>
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  activeOpacity={1}>
                  <Image
                    source={Images.SignUpIcon.BackArrow}
                    style={styles.BackArrowImg}
                  />
                </TouchableOpacity>
                <Text style={[CommonStyle.welcomeName]}>
                  Terms And Conditions{' '}
                </Text>
                <Text style={[CommonStyle.welcomeName, styles.textsty]}> </Text>
              </View>
            </View>
          )}
        </SafeAreaInsetsContext.Consumer>
        {/* </ImageBackground> */}
        <View
          style={[
            CommonStyle.profileCard,
            {
              minHeight: height - height / 5,
            },
          ]}>
          <ScrollView
            style={styles.ScrollViewsty}
            showsVerticalScrollIndicator={false}>
            <View style={styles.ViewCont}>
              <Text style={CommonStyle.staticText}>
                {TermAndCondition && (
                  <HTML
                    html={TermAndCondition.content}
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
  subCont: {
    marginTop: 20,
  },
  BackArrowImg: {
    height: 20.5,
    width: 12,
    marginTop: -5,
  },
  textsty: {
    fontSize: 16,
  },
  ViewCont: {
    padding: 10,
    alignItems: 'center',
  },
  ScrollViewsty: {
    height,
    flex: 1,
  },
});

const mapStateToProps = (state) => {
  return {
    TermAndCondition: state.StaticReducer.TermAndCond,
  };
};

export default connect(mapStateToProps, null)(TermAndCond);
