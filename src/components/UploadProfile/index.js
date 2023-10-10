/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/jsx-no-duplicate-props */
import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import Modal from 'react-native-modal';
import {Fonts, Colors, Images} from '../../constants';
import ImagePicker from 'react-native-image-picker';
const options = {
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};
class UploadProfile extends Component {
  launchCamera = () => {
    ImagePicker.launchCamera(options, (response) => {
      if (response.uri) {
        this.props.onChoose(response);
      }
    });
  };
  launchLibrary = () => {
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.uri) {
        this.props.onChoose(response);
      }
    });
  };
  render() {
    const {modalStatus, onClose} = this.props;
    return (
      <Modal
        backdropOpacity={0.6}
        swipeDirection="right"
        onBackButtonPress={onClose}
        onBackdropPress={onClose}
        isVisible={modalStatus}
        swipeDirection="down"
        animationOutTiming={1000}
        animationInTiming={700}
        style={[styles.overlayCont]}>
        <View style={styles.messCont}>
          <Text style={styles.messText}>Upload Profile Picture</Text>
        </View>
        <View style={styles.bottomCont}>
          <View style={{alignItems: 'center'}}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => this.launchCamera()}>
              <Image
                source={Images.CustomerHomeIcon.Camera}
                style={styles.iconStyle}
              />
            </TouchableOpacity>
            <Text style={styles.labelStyle}>Camera</Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => this.launchLibrary()}>
              <Image
                source={Images.CustomerHomeIcon.Gallery}
                style={styles.iconStyle}
              />
            </TouchableOpacity>
            <Text style={styles.labelStyle}>Gallery</Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <TouchableOpacity activeOpacity={1} onPress={() => onClose()}>
              <Image
                source={Images.CustomerHomeIcon.Close}
                style={styles.iconStyle}
              />
            </TouchableOpacity>
            <Text style={styles.labelStyle}>Close</Text>
          </View>
        </View>
      </Modal>
    );
  }
}
const styles = StyleSheet.create({
  bottomCont: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    flexDirection: 'row',
    flex: 2,
  },
  iconStyle: {
    height: 50,
    width: 50,
  },
  overlayCont: {
    backgroundColor: 'white',
    borderRadius: 15,
    top: Platform.OS === 'android' ? '60%' : '65%',
    alignSelf: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxHeight: 300,
    width: '100%',
  },
  messText: {
    fontSize: 18,
    fontFamily: Fonts.Lato_Bold,
    padding: 30,
  },
  labelStyle: {
    fontSize: 14,
    marginTop: 15,
    color: Colors.Black,
    fontFamily: Fonts.Lato_Bold,
  },
  messCont: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
});
export default UploadProfile;
