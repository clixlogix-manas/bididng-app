/* eslint-disable react/no-did-update-set-state */
import React, {Component} from 'react';
import {
  View,
  Text,
  // Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {Images, Fonts} from '../../constants';
import CommonStyle from '../../constants/Style';
import ServiceCard from '../../components/ServiceCard';
import {
  getStylistService,
  getStylistServiceCatSuccess,
} from '../../redux/actions/serviceAction';
import {connect} from 'react-redux';
import Colors from '../../constants/Colors';
import axios from 'axios';
import {stylistBasepath} from '../../constants/Config';
import AsyncStorage from '@react-native-community/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import {SafeAreaInsetsContext} from 'react-native-safe-area-context';
import SafeAreaView from 'react-native-safe-area-view';
import {Platform, StyleSheet} from 'react-native';

// const {height} = Dimensions.get('window');

class Service extends Component {
  constructor(props) {
    super(props);
    this.state = {
      serviceList: null,
      loader: true,
    };
  }
  async componentDidMount() {
    let token = await AsyncStorage.getItem('loginToken');
    axios
      .get(stylistBasepath + 'servicecatlist', {
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      })
      .then((res) => {
        if (res.status === 200) {
          this.props.getStylistServiceCatSuccess(res.data.service_cats);
          this.props.getStylistService();
        }
      });
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.serviceList !== prevProps.serviceList &&
      this.props.serviceList !== null
    ) {
      this.setState({
        serviceList: this.props.serviceList,
        loader: false,
      });
    }
    if (this.props.deleteServiceFailure !== prevProps.deleteServiceFailure) {
      this.setState({
        deleteServiceErrorMsg: this.props.deleteServiceFailureMessage,
      });
    } else if (
      this.props.deleteServiceSuccess !== prevProps.deleteServiceSuccess
    ) {
      this.props.getStylistService();
    } else if (this.props.addServiceSuccess !== prevProps.addServiceSuccess) {
      this.props.getStylistService();
    } else if (this.props.editServiceSuccess !== prevProps.editServiceSuccess) {
      this.props.getStylistService();
    }
  }
  render() {
    const {
      navigation,
      addServiceReq,
      serviceCatList,
      editServiceReq,
      deleteServiceReq,
    } = this.props;

    return (
      <SafeAreaView style={styles.SafeAreaViewStyle}>
        <ScrollView
          style={styles.ScrollViewStyle}
          showsVerticalScrollIndicator={false}>
          <Spinner
            visible={
              this.state.loader ||
              deleteServiceReq ||
              addServiceReq ||
              editServiceReq
            }
            textContent={'Loading...'}
            textStyle={{color: Colors.BackgroundGray}}
          />
          <View>
            <SafeAreaInsetsContext.Consumer>
              {(insets) => (
                <View style={styles.ViewStyle}>
                  <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.backStyle}
                    activeOpacity={1}>
                    <Image
                      source={Images.SignUpIcon.BackArrow}
                      style={styles.BackArrowStyle}
                    />
                    <Text style={styles.BackText}>Back </Text>
                  </TouchableOpacity>

                  <View style={styles.AddServicesView} />

                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('AddService', {
                        passType: 'addService',
                      })
                    }
                    style={styles.AddServicesStyle}
                    activeOpacity={1}>
                    <Image
                      source={Images.ServiceIcon.Add}
                      style={styles.ImageStyle}
                    />
                  </TouchableOpacity>
                </View>
              )}
            </SafeAreaInsetsContext.Consumer>
            <View style={styles.headingView}>
              <Text style={[CommonStyle.ShopName]}>Service Settings </Text>
              <Text style={styles.textStyle1}>Available service for you </Text>
            </View>
            <View style={[CommonStyle.profileCard, styles.profileCardStyle]}>
              <View style={styles.FlatListView}>
                {this.state.serviceList &&
                this.state.serviceList.services.length > 0 ? (
                  <FlatList
                    data={this.state.serviceList.services}
                    scrollEnabled={false}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item, index}) => (
                      <ServiceCard
                        item={item}
                        navigation={navigation}
                        serviceCatList={serviceCatList}
                      />
                    )}
                    contentContainerStyle={styles.contentContStyle}
                    keyExtractor={(item) => item.id.toString()}
                    numColumns={1}
                  />
                ) : (
                  <Text style={[CommonStyle.welcomeName, styles.welcomeText]}>
                    No Service Added yet{' '}
                  </Text>
                )}
                {/* <Button
                  title={'ADD A SERVICE'}
                  path={'AddService'}
                  navigation={navigation}
                  value={'addService'}
                /> */}
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  headCont: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 35,
    paddingTop: 25,
  },
  ViewStyle: {
    marginTop: Platform.OS === 'android' ? 10 : 0,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 20,
    alignSelf: 'center',
  },
  contentContStyle: {
    justifyContent: 'flex-start',
    alignSelf: 'center',
  },
  FlatListView: {
    alignItems: 'center',
  },
  profileCardStyle: {
    backgroundColor: '#f7f7f7',
    marginTop: 10,
  },
  textStyle1: {
    fontSize: 18,
    marginTop: 10,
    marginBottom: 15,
    fontFamily: Fonts.HeveticaNowText_Regular,
  },
  AddServicesView: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  AddServicesStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    width: 40,
    backgroundColor: Colors.ButtonColor,
    justifyContent: 'center',
    borderRadius: 13,
    marginTop: 10,
  },
  ImageStyle: {
    height: 25,
    width: 25,
  },
  welcomeText: {
    textAlign: 'center',
    padding: 30,
    color: Colors.Black,
    fontSize: 15,
    fontFamily: Fonts.HeveticaNowText_Medium,
  },
  headingView: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    marginTop: 25,
  },
  BackArrowStyle: {
    height: 20.5,
    width: 12,
  },
  BackText: {
    fontSize: 14,
    marginStart: 10,
  },
  backStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  SafeAreaViewStyle: {
    flex: 1,
    backgroundColor: Colors.BgColor,
  },
  ScrollViewStyle: {
    flex: 1,
  },
});

const mapStateToProps = (state) => {
  return {
    serviceList: state.ServiceReducer.serviceList,
    serviceCatList: state.ServiceReducer.serviceCatList,
    getServiceReq: state.ServiceReducer.getServiceReq,
    deleteServiceReq: state.ServiceReducer.deleteServiceReq,
    deleteServiceSuccess: state.ServiceReducer.deleteServiceSuccess,
    deleteServiceFailure: state.ServiceReducer.deleteServiceFailure,
    deleteServiceFailureMessage:
      state.ServiceReducer.deleteServiceFailureMessage,
    addServiceReq: state.ServiceReducer.addServiceReq,
    addServiceSuccess: state.ServiceReducer.addServiceSuccess,
    editServiceSuccess: state.ServiceReducer.editServiceSuccess,
    editServiceReq: state.ServiceReducer.editServiceReq,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getStylistService: () => dispatch(getStylistService()),
  getStylistServiceCatSuccess: (data) =>
    dispatch(getStylistServiceCatSuccess(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Service);
