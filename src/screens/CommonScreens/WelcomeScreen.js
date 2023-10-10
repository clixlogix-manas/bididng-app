import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
  Image,
  ScrollView,
  StatusBar,
} from 'react-native';
import {Images, Fonts, Colors} from '../../constants';
import AppIntroSlider from 'react-native-app-intro-slider';
import Button from '../../components/Button';
import {Platform} from 'react-native';
const {height, width} = Dimensions.get('window');
const slides = [
  {
    key: 1,
    title: 'Get inspired',
    image: Images.WelcomeIcon.EasyBooking,
    subtitle:
      'Save hairstyle images you like and get inspired next time you visit a salon.',
  },
  {
    key: 2,
    title: 'Pay online',
    image: Images.WelcomeIcon.Portfolio,
    subtitle:
      "Don't have cash? No worries! Pay securely through Hairbiddy and confirm your appointment immediately. ",
  },
  {
    key: 3,
    title: 'Trusted Professionals',
    image: Images.WelcomeIcon.PreBenefit,
    subtitle: 'Choose professionals with a track record of positive ratings.',
  },
  {
    key: 4,
    title: 'Filter and Find',
    image: Images.WelcomeIcon.InviteFriend,
    subtitle:
      "Can't see what you're looking for? Use our filters to get the service of your dreams.",
  },
];

class WelcomeScreen extends Component {
  onSubmit = () => {
    this.props.navigation.reset({
      index: 0,
      routes: [
        {
          name:
            this.props.route.params.userType === 'Customer'
              ? 'HomeScreenContainer'
              : 'HomeScreen',
          params: {userType: this.props.route.params.userType},
        },
      ],
    });
  };
  _renderItem = ({item}) => {
    console.warn(item.subtitle);
    return (
      <View style={{marginTop: 0}}>
        <View style={styles.subCont}>
          <View style={styles.imageView}>
            <Image
              source={item.image}
              resizeMode={'contain'}
              style={styles.imagesty}
            />
          </View>
        </View>
        <Text style={styles.welcomeTitle}>{item.title}</Text>
        <Text style={styles.subText}>{item.subtitle}</Text>
      </View>
    );
  };
  render() {
    const {navigation} = this.props;
    return (
      <ScrollView>
        <StatusBar backgroundColor="gray" barStyle="dark-content" />
        <ImageBackground
          // source={Images.ProfileBuildIcon.ProfileBackground}
          style={styles.backgroundImg}>
          <View style={styles.textCont}>
            <Text style={styles.boldText}>{'Welcome to \nHairBiddy'}</Text>
            <Text style={styles.redText}>{'Congratulation!'}</Text>
            <Text style={styles.subText}>
              {'Your account has been Created\nSuccessfully.'}
            </Text>
            <View style={styles.AppIntroCont}>
              <AppIntroSlider
                renderItem={this._renderItem}
                data={slides}
                dotStyle={styles.dotStyle}
                nextLabel={''}
                doneLabel=""
                activeDotStyle={[
                  styles.dotStyle,
                  {
                    backgroundColor: Colors.Red,
                  },
                ]}
                keyExtractor={(item) => item.key.toString()}
              />
            </View>
            <Button
              title={"LET'S GO"}
              onSubmit={this.onSubmit}
              marginTop={Platform.OS === 'android' ? 60 : 80}
              navigation={navigation}
            />
          </View>
        </ImageBackground>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  welcomeImage: {
    height: 230,
    width: 202,
  },
  subCont: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    paddingVertical: Platform.OS === 'android' ? 20 : 40,
  },
  boldText: {
    fontSize: 30,
    lineHeight: 38,
    fontFamily: Fonts.Lato_Black,
    color: Colors.Black,
    paddingBottom: 0,
    marginTop: 20,
    marginBottom: 0,
  },
  imageView: {
    height: 210,
    width: 242,
  },
  imagesty: {
    height: '100%',
    width: '100%',
  },
  backgroundImg: {
    width: width,
    height,
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  textCont: {
    padding: 40,
    paddingTop: Platform.OS === 'android' ? 20 : 40,
  },
  AppIntroCont: {
    height: Platform.OS === 'android' ? 350 : 400,
  },
  redText: {
    fontSize: 20,
    color: Colors.Red,
    paddingTop: Platform.OS === 'android' ? 10 : 15,
    paddingBottom: 0,
    fontFamily: Fonts.Lato_Medium,
  },
  subText: {
    fontSize: 14,
    lineHeight: 22,
    paddingTop: 10,
    fontFamily: Fonts.Lato_Medium,
    color: Colors.LightBlack,
  },
  welcomeTitle: {
    fontFamily: Fonts.Lato_Heavy,
    fontSize: 20,
    paddingBottom: 0,
  },
  dotStyle: {
    height: 10,
    width: 10,
    backgroundColor: Colors.LightBlack,
    marginTop: 150,
  },
});
export default WelcomeScreen;
