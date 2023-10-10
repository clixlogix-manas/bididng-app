/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  FlatList,
  Dimensions,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {Fonts, Colors} from '../../constants';
import {customerImagePath} from '../../constants/Config';
import Images from '../../constants/Images';
const {height, width} = Dimensions.get('window');
const STANDARD_WIDTH = 375;
const CURRENT_WIDTH = width;
const K = CURRENT_WIDTH / STANDARD_WIDTH;
class TagSearchComp extends Component {
  render() {
    const {
      isVisible,
      modalHandler,
      onTextChange,
      onTextSearch,
      searchSpinner,
      userList,
      onChangeTag,
    } = this.props;
    return (
      <Modal visible={isVisible} animationType="none" transparent={true}>
        <TouchableOpacity
          style={styles.modalContainer}
          activeOpacity={1}
          onPress={() => modalHandler()}>
          <TouchableWithoutFeedback>
            <View
              style={{
                backgroundColor: '#ffffff',
                width: width - K * 50,
                height: height - K * 250,
                borderRadius: 5,
                padding: 20,
              }}>
              <View style={styles.searchInput}>
                <TextInput
                  placeholder={'Search for Customer'}
                  style={{
                    width: '85%',
                    fontFamily: Fonts.Lato_Bold,
                  }}
                  name="search"
                  onChangeText={(value) => {
                    onTextChange(value);
                  }}
                />
                <TouchableOpacity onPress={() => onTextSearch()}>
                  <Image
                    style={{height: 20, width: 20, marginTop: 15}}
                    source={Images.StylistIcon.Search}
                  />
                </TouchableOpacity>
              </View>
              <Spinner
                visible={searchSpinner}
                textContent={'Loading...'}
                textStyle={{color: Colors.Black}}
              />
              {userList.length > 0 ? (
                <FlatList
                  data={userList}
                  showsVerticalScrollIndicator={false}
                  keyExtractor={(_, index) => index.toString()}
                  renderItem={({item, index}) => (
                    <TouchableOpacity
                      onPress={() => onChangeTag(item.name, item.value)}
                      style={{
                        paddingHorizontal: K * 16,
                        paddingVertical: K * 12,
                      }}>
                      <View
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <Text>{item.name}</Text>
                        {item.profile ? (
                          <Image
                            style={{
                              height: 80,
                              width: 80,
                              marginTop: 15,
                            }}
                            source={{
                              uri: customerImagePath + item.profile,
                            }}
                          />
                        ) : (
                          <Image
                            style={{
                              height: 80,
                              width: 80,
                              marginTop: 15,
                            }}
                            source={Images.CustomerHomeIcon.NoProfilePic}
                          />
                        )}
                      </View>
                    </TouchableOpacity>
                  )}
                />
              ) : (
                <Text
                  style={{
                    fontFamily: Fonts.Lato_Black,
                    fontSize: 14,
                    textAlign: 'center',
                    marginTop: 80,
                  }}>
                  No Match found / Search for a customer !
                </Text>
              )}
            </View>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </Modal>
    );
  }
}
const styles = StyleSheet.create({
  searchInput: {
    backgroundColor: Colors.White,
    width: '90%',
    alignSelf: 'center',
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 20,
  },
  modalContainer: {
    backgroundColor: '#00000055',
    flex: 1,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default TagSearchComp;
