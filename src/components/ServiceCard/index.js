import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Colors, Images} from '../../constants';
import CommonStyle from '../../constants/Style';
import PopupCard from '../PopupCard';
import {
  deleteStylistService,
  getStylistService,
} from '../../redux/actions/serviceAction';
import {connect} from 'react-redux';
class ServiceCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalStatus: false,
      itemId: null,
    };
  }
  onDelete = (id) => {
    this.setState({
      modalStatus: false,
    });
    this.props.deleteStylistService(id);
  };
  async componentDidUpdate(prevProps, prevState) {
    if (this.props.deleteServiceFailure !== prevProps.deleteServiceFailure) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        profileErrorMsg: this.props.deleteServiceFailureMessage,
      });
    } else if (
      this.props.deleteServiceSuccess !== prevProps.deleteServiceSuccess
    ) {
      this.props.getStylistService();
    }
  }
  render() {
    const {navigation, item, serviceCatList} = this.props;
    let timeValue;

    if (item.service_duration > 60) {
      if ((item.service_duration / 30 / 2).toString().split('.')[1] === '5') {
        timeValue =
          (item.service_duration / 30 / 2).toString().split('.')[0] +
          ' Hour 30 Mins';
      } else {
        timeValue =
          (item.service_duration / 30 / 2).toString().split('.')[0] + ' Hours';
      }
    }
    return (
      <View style={styles.profileCard}>
        <View style={styles.SubCont}>
          <View style={[CommonStyle.serviceViewAllCont]}>
            <View>
              <Text style={styles.NameText}>{item.name}</Text>
              <Text style={styles.DurationText}>
                {item.service_duration > 60
                  ? timeValue
                  : item.service_duration === 60
                  ? '1 Hour'
                  : item.service_duration + ' Min'}
              </Text>
            </View>
            <View style={styles.iconCont}>
              <TouchableOpacity
                activeOpacity={1}
                style={styles.ProfileIconOpacity}
                onPress={() =>
                  serviceCatList &&
                  navigation.navigate('AddService', {
                    value: 'editService',
                    item,
                  })
                }>
                <Image
                  source={Images.ProfileIcon.Edit}
                  style={styles.ProfileIconStyle}
                />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={1}
                style={styles.ServiceIconDeleteView}
                onPress={() =>
                  this.setState({modalStatus: true, itemId: item.id})
                }>
                <Image
                  source={Images.ServiceIcon.Delete}
                  style={styles.ProfileIconStyle}
                />
              </TouchableOpacity>
              <PopupCard
                modalStatus={this.state.modalStatus}
                onClose={() => this.setState({modalStatus: false})}
                onDelete={this.onDelete}
                id={this.state.itemId}
                label={
                  'Delete Service\nDo you really want to delete this\nservice?'
                }
              />
              <TouchableOpacity
                activeOpacity={1}
                style={styles.ServiceIconDeleteView}
                onPress={() => navigation.navigate('AddDiscount', {item})}>
                <Image
                  source={Images.ServiceIcon.Discount}
                  style={styles.ProfileIconStyle}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  profileCard: {
    height: 78,
    width: '100%',
    backgroundColor: '#ffffff',
    alignSelf: 'center',
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
    margin: 5,
  },
  DurationText: {
    color: Colors.ButtonColor,
    fontSize: 12,
    marginTop: 5,
  },
  ProfileIconStyle: {
    height: 25,
    width: 25,
  },
  ServiceIconDeleteView: {
    height: 35,
    width: 35,
    backgroundColor: Colors.InputBgColor,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ProfileIconOpacity: {
    height: 24,
    width: 24,
    backgroundColor: Colors.InputBgColor,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  NameText: {
    fontSize: 15,
    color: '#283A58',
  },

  iconCont: {
    width: '60%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  SubCont: {
    padding: 20,
  },
});
const mapStateToProps = (state) => {
  return {
    userInfo: state.SignupReducer.userInfo,
    deleteServiceFailureMessage:
      state.ProfileReducer.deleteServiceFailureMessage,
    deleteServiceFailure: state.ProfileReducer.deleteServiceFailure,
    deleteServiceSuccess: state.ProfileReducer.deleteServiceSuccess,
    deleteServiceReq: state.ProfileReducer.deleteService,
  };
};

const mapDispatchToProps = (dispatch) => ({
  deleteStylistService: (data) => dispatch(deleteStylistService(data)),
  getStylistService: () => dispatch(getStylistService()),
});
export default connect(mapStateToProps, mapDispatchToProps)(ServiceCard);
