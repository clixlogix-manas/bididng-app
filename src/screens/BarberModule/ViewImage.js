/* eslint-disable react/no-did-mount-set-state */
import React, {Component} from 'react';
import {
  View,
  Dimensions,
  Image,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {Images, Colors} from '../../constants';
import LinearGradient from 'react-native-linear-gradient';
import CommonStyle from '../../constants/Style';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import {BASE_URL, portfolioImagePath} from '../../constants/Config';
const {height, width} = Dimensions.get('window');

class ViewNotifyImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: true,
      image: '',
    };
  }
  async componentDidMount() {
    try {
      let token = await AsyncStorage.getItem('loginToken');

      let formdata = new FormData();
      formdata.append('image_id', this.props.route.params.data);
      let imageRes = await axios.post(
        BASE_URL + '/api/stylist/view_single_portfolio_image',
        formdata,
        {
          headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        },
      );
      this.setState({
        image: imageRes.data[0].image,
        loader: false,
      });
    } catch (error) {
      this.setState({
        loader: false,
      });
    }
  }
  render() {
    const {navigation} = this.props;
    return (
      <ImageBackground
        source={{uri: portfolioImagePath + this.state.image}}
        style={styles.bgStyle}
        imageStyle={styles.imageSty}>
        <Spinner
          visible={this.state.loader}
          textContent={'Loading...'}
          textStyle={{color: Colors.BackgroundGray}}
        />
        <LinearGradient
          colors={['#bfbfbf00', '#2c3e50']}
          locations={[0, 1]}
          style={styles.linearGradient}>
          <View style={styles.container}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => navigation.goBack()}>
              <Image
                source={Images.Notification.BackArrow}
                style={[CommonStyle.backArrow, styles.BackArrowSty]}
              />
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </ImageBackground>
    );
  }
}
const styles = StyleSheet.create({
  bgStyle: {
    height: height,
    width: width,
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 50,
    alignItems: 'flex-start',
    height: 660,
  },
  imageSty: {
    resizeMode: 'cover',
  },
  BackArrowSty: {
    marginLeft: 30,
  },
  bottomBtn: {
    height: 50,
    width: 50,
  },
  bottomCont: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    width: '60%',
    marginBottom: 40,
  },
  linearGradient: {
    width: '100%',
    height: '100%',
  },
});
export default ViewNotifyImage;
