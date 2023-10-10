import React from 'react';
import {View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {Images} from '../../constants';

const RenderItem = (props) => {
  const {
    path,
    imagePath,
    item,
    navigation,
    userType,
    onpress,
    type,
    imageError,
    handleImageErr,
  } = props;

  let image =
    type === 'news'
      ? imagePath + item.featured_img
      : type === 'favourites' || type === 'feature'
      ? imagePath + item.profile_pic
      : imagePath + item.image;
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() =>
        (onpress && type === 'favourites') || (onpress && type === 'feature')
          ? navigation.navigate(
              item.template_type === 1 ? 'StylistProfile' : 'StylistProfileTwo',
              {
                item: {uri: imagePath + item.profile_pic},
                stylist: {item},
                userType: 'preview',
              },
            )
          : onpress && type === 'news'
          ? navigation.navigate(path, {data: item, userType: userType})
          : type === 'myphoto'
          ? navigation.navigate('ViewImage', {
              item,
              type: 'show',
              myphoto: true,
              userType: 'Customer',
            })
          : {}
      }>
      {type === 'favourites' || type === 'feature' ? (
        <View>
          {imageError(item.user_id ? item.user_id : item.id) ? (
            <Image
              source={Images.CustomerHomeIcon.NoProfilePic}
              key={item.user_id ? item.user_id : item.id}
              style={styles.imageStyle}
            />
          ) : (
            <Image
              onError={() => {
                if (!imageError(item.user_id ? item.user_id : item.id)) {
                  handleImageErr(item.user_id ? item.user_id : item.id);
                }
              }}
              source={{uri: image}}
              key={item.user_id ? item.user_id : item.id}
              style={styles.imageStyle}
            />
          )}
        </View>
      ) : (
        <Image source={{uri: image}} key={item.id} style={styles.imageStyle} />
      )}
    </TouchableOpacity>
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
  imageStyle: {
    height: 80,
    width: 120,
    borderRadius: 5,
    margin: 5,
  },
});
export default RenderItem;
