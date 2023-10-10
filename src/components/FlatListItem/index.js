/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {FlatList} from 'react-native';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Fonts} from '../../constants';
import RenderItem from './renderItem';
import CommonStyle from '../../constants/Style';
const RenderList = (props) => {
  const {
    path,
    userType,
    title,
    items,
    navigateData,
    navigation,
    imagePath,
    itemPath2,
    itemPath,
    errMsg,
    onpress,
    type,
    imageError,
    handleImageErr,
  } = props;
  return (
    <View>
      <View style={[CommonStyle.viewAllCont, styles.SubCont]}>
        <Text style={CommonStyle.dayTextOne}>{title}</Text>
        <TouchableOpacity
          onPress={() =>
            props.navigation.navigate(path, {
              userType: userType,
              newsList: navigateData,
            })
          }
          activeOpacity={1}>
          {type !== 'favourites' && type !== 'feature' && type !== 'myphoto' && (
            <View style={(CommonStyle.viewAllBtn, {marginRight: 10})}>
              <Text
                style={[
                  CommonStyle.viewAllFont,
                  {color: userType === 'Barber' ? '#83838B' : '#790A13'},
                ]}>
                View all
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
      {items && items.length > 0 ? (
        <FlatList
          data={items}
          renderItem={(item) => {
            return (
              <RenderItem
                path={itemPath}
                imagePath={imagePath}
                itemPath2={itemPath2}
                type={type}
                item={item.item}
                userType={userType}
                onpress={onpress}
                imageError={imageError}
                handleImageErr={handleImageErr}
                navigation={navigation}
              />
            );
          }}
          keyExtractor={(item) =>
            item.id ? item.id.toString() : item.user_id.toString()
          }
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      ) : (
        <Text style={styles.errMsgText}>{errMsg}</Text>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  cardCont: {
    height: 190,
    width: 150,
    backgroundColor: '#f7f7f7',
    borderRadius: 20,
    margin: 10,
  },
  SubCont: {
    marginTop: 10,
    marginBottom: 20,
  },
  errMsgText: {
    fontFamily: Fonts.HeveticaNowText_Bold,
    fontSize: 14,
    alignSelf: 'center',
    paddingTop: 20,
  },
});
export default RenderList;
