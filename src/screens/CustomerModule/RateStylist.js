/* eslint-disable radix */
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {Images, Fonts, Colors} from '../../constants';
import CommonStyle from '../../constants/Style';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import Button from '../../components/Button';
import {addReviewReq} from '../../redux/actions/stylistAction';
import {connect} from 'react-redux';

const {height, width} = Dimensions.get('window');
class RateStylist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: '',
      starCount: [],
      startCountt: 0,
    };
  }
  countRating = (num) => {
    if (!this.state.starCount.includes(num)) {
      this.setState({
        starCount: [...this.state.starCount, num],
        startCountt: num,
      });
    } else {
      var array = [...this.state.starCount];
      var index = array.indexOf(num);
      array.splice(index, 1);
      this.setState({starCount: array, startCountt: num - 1});
    }
  };
  onSubmit = () => {
    let stylistData = this.props.route.params.serviceData;
    let formdata = new FormData();
    formdata.append('stylist_id', stylistData.provider_id);
    formdata.append('service_id', stylistData.service_id);
    formdata.append('review_title', stylistData.customer_name);
    formdata.append('star_rating', this.state.startCountt);
    formdata.append('description', this.state.comment);
    this.props.addReviewReq(formdata);
  };
  componentDidUpdate(prevProps, prevState) {
    if (this.props.addReviewSuccess !== prevProps.addReviewSuccess) {
      this.props.navigation.navigate('HomeScreenContainer');
    }
  }
  render() {
    const {navigation, route, addReview} = this.props;

    return (
      <View style={styles.cont}>
        <Image
          source={Images.ProfileBuildIcon.ProfileBackground}
          style={styles.ImagesStyle}
        />

        <KeyboardAwareScrollView
          style={styles.KeyboardAwareSty}
          showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <View style={styles.ImageView}>
              <Image
                source={Images.StylistIcon.RateStylist}
                style={styles.RateStylist_img}
              />
              <Text style={styles.headText}>{'Rate your\nExperience'}</Text>
              <Text style={styles.ratingText}>
                {'Please give your Precious\nRating'}
              </Text>
              <Text style={[CommonStyle.userName, styles.TextStyle]}>
                {route.params.serviceData.provider_data.fname +
                  ' ' +
                  route.params.serviceData.provider_data.lname}
              </Text>
              <View style={styles.starCont}>
                <TouchableOpacity
                  onPress={() => {
                    this.countRating(1);
                  }}
                  activeOpacity={1}>
                  <Image
                    source={
                      parseInt(this.state.startCountt) !== 0
                        ? parseInt(this.state.startCountt) >= 1
                          ? Images.StylistIcon.Star
                          : Images.StylistIcon.Star2
                        : Images.StylistIcon.Star2
                    }
                    style={styles.starStyle}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.countRating(2)}
                  activeOpacity={1}>
                  <Image
                    source={
                      parseInt(this.state.startCountt) !== 0
                        ? parseInt(this.state.startCountt) >= 2
                          ? Images.StylistIcon.Star
                          : Images.StylistIcon.Star2
                        : Images.StylistIcon.Star2
                    }
                    style={styles.starStyle}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.countRating(3)}
                  activeOpacity={1}>
                  <Image
                    source={
                      parseInt(this.state.startCountt) !== 0
                        ? parseInt(this.state.startCountt) >= 3
                          ? Images.StylistIcon.Star
                          : Images.StylistIcon.Star2
                        : Images.StylistIcon.Star2
                    }
                    style={styles.starStyle}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.countRating(4)}
                  activeOpacity={1}>
                  <Image
                    source={
                      parseInt(this.state.startCountt) !== 0
                        ? parseInt(this.state.startCountt) >= 4
                          ? Images.StylistIcon.Star
                          : Images.StylistIcon.Star2
                        : Images.StylistIcon.Star2
                    }
                    style={styles.starStyle}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.countRating(5)}
                  activeOpacity={1}>
                  <Image
                    source={
                      parseInt(this.state.startCountt) !== 0
                        ? parseInt(this.state.startCountt) >= 5
                          ? Images.StylistIcon.Star
                          : Images.StylistIcon.Star2
                        : Images.StylistIcon.Star2
                    }
                    style={styles.starStyle}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={[styles.inputCont]}>
              <Text style={styles.labelStyle}>Add Commment</Text>
              <View style={styles.inputStyle}>
                <TextInput
                  style={styles.TextInputStyle}
                  placeholder={'Limit 250 Characters '}
                  name="comment"
                  onChangeText={(value) => this.setState({comment: value})}
                  value={this.state.comment}
                  maxLength={200}
                  multiline
                  textAlignVertical="top"
                  numberOfLines={20}
                />
              </View>
            </View>
            {addReview ? (
              <View style={[CommonStyle.loadingStyle]}>
                <ActivityIndicator size="large" color="white" />
              </View>
            ) : (
              <Button
                title={'SUBMIT'}
                onSubmit={this.onSubmit}
                navigation={navigation}
              />
            )}
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  backgroundStyle: {
    height: height,
    width,
  },
  headText: {
    fontSize: 34,
    fontFamily: Fonts.Lato_Black,
    marginTop: 20,
  },
  cont: {
    flex: 1,
  },
  ImagesStyle: {
    width,
    height,
    position: 'absolute',
  },
  TextStyle: {
    textAlign: 'center',
    marginTop: 30,
  },
  ImageView: {
    margin: 20,
  },
  KeyboardAwareSty: {
    width: '100%',
  },
  RateStylist_img: {
    height: 150,
    width: 138,
    marginTop: 20,
  },
  ratingText: {
    fontSize: 14,
    fontFamily: Fonts.HeveticaNowText_Medium,
    color: Colors.LightBlack,
    marginTop: 10,
  },
  starCont: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 30,
    width: '80%',
  },
  inputCont: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    padding: 10,
    paddingTop: 20,
    width: '100%',
  },
  inputStyle: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: Colors.ImageColor,
    width: '100%',
  },

  labelStyle: {
    fontSize: 14,
    fontFamily: Fonts.Lato_Medium,
  },
  container: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    padding: 20,
  },
  starStyle: {
    height: 40,
    width: 40,
  },
});
const mapStateToProps = (state) => {
  return {
    addReview: state.StylistReducer.addReviewReq,
    addReviewSuccess: state.StylistReducer.addReviewSuccess,
    addReviewFailure: state.StylistReducer.addReviewFailure,
    addReviewFailureMessage: state.StylistReducer.addReviewFailureMessage,
    userInfo: state.SignupReducer.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => ({
  addReviewReq: (data) => dispatch(addReviewReq(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(RateStylist);
