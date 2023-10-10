import React from 'react';
import {FlatList} from 'react-native';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Fonts} from '../../constants';
import CommonStyle from '../../constants/Style';
import ReviewCard from '../ReviewCard';
const RenderList = (props) => {
  const {
    title,
    items,
    navigation,
    errMsg,
    type,
    onpress,
    onScrollBegin,
    onScrollEnd,
  } = props;
  return (
    <View style={styles.Container}>
      <View style={[CommonStyle.viewAllCont, styles.SubContainer]}>
        <Text style={CommonStyle.dayText}>{title}</Text>
        <TouchableOpacity
          onPress={() =>
            onpress && navigation.navigate('ReviewComp', {name: type})
          }
          activeOpacity={1}>
          <View style={CommonStyle.viewAllBtn}>
            <Text style={(CommonStyle.viewAllFont, {color: '#790A13'})}>
              View All
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.FlatView}>
        {items && items.length > 0 ? (
          <FlatList
            data={items}
            renderItem={(itemData) => {
              let {item, index} = itemData;
              return (
                <ReviewCard
                  id={index}
                  image={item.profile_pic}
                  length={items.length}
                  starCount={item.rating}
                  star={true}
                  underLine={true}
                  username={type === 'review' ? item.title : item.name}
                  comment={item.content}
                />
              );
            }}
            keyExtractor={(item) => item.id.toString()}
            scrollEnabled={true}
            onScrollEndDrag={() => onScrollEnd}
            onScrollBeginDrag={() => onScrollBegin}
            nestedScrollEnabled={true}
            showsVerticalScrollIndicator={false}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
        ) : (
          <Text style={styles.ErrView}>{errMsg}</Text>
        )}
      </View>
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
  Container: {
    maxHeight: 400,
  },
  FlatView: {
    flexDirection: 'row',
    width: '100%',
  },
  SubContainer: {
    marginTop: 10,
    marginBottom: 10,
  },
  ErrView: {
    fontFamily: Fonts.HeveticaNowText_Black,
    fontSize: 14,
    alignSelf: 'center',
    paddingTop: 20,
  },
});
export default RenderList;
