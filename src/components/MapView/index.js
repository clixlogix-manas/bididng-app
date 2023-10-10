import React, {useState} from 'react';
import CommonStyle from '../../constants/Style';
import MapView, {Marker} from 'react-native-maps';
import {View, Image, StyleSheet} from 'react-native';
import Images from '../../constants/Images';

const Map = (props) => {
  const {latitude, longitude} = props;
  const [recenter] = useState(false);
  console.log('Map', props.userType);
  return (
    <View style={styles.Container}>
      <View style={[CommonStyle.mapContainer, styles.SubCont]}>
        <MapView
          style={CommonStyle.map}
          initialRegion={{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          region={{
            latitude: recenter ? latitude : latitude,
            longitude: recenter ? longitude : longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          <Marker
            coordinate={{
              latitude: latitude,
              longitude: longitude,
            }}
            title={props.address1}
            draggable>
            {props.userType === 'Guest' ? (
              <Image
                source={Images.StylistIcon.LocationPin1}
                style={styles.ImageStyle}
                resizeMode="contain"
              />
            ) : (
              <Image
                source={Images.StylistIcon.LocationPin}
                style={styles.ImageStyle}
                resizeMode="contain"
              />
            )}
          </Marker>
        </MapView>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  Container: {
    width: '100%',
  },
  SubCont: {
    width: '100%',
  },
  ImageStyle: {
    height: 50,
    width: 50,
  },
});
export default Map;
