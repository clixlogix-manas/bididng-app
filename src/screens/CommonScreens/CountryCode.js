/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  StyleSheet,
} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faSearch, faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {countryCodeList} from '../../constants/Countries';
import Colors from '../../constants/Colors';
import {updateSelectedCountryDetail} from '../../redux/actions/authAction';
// import Loader from '../../components/loader/Loader';

const CountryCode = (props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [searchCountry, setSearchCountry] = useState('');
  const [countryList, setCountryList] = useState(countryCodeList);

  // const { countryCodeList } = useSelector((state: RootStateOrAny) => ({
  //     countryCodeList: state.CountryCodeReducer.countryCodeList
  // }));

  useEffect(() => {
    //dispatch(updateLoadingStatus(true))
    // dispatch(getCountryList());
  }, []);

  function filterCountry(text) {
    setSearchCountry(text);
    if (text === '') {
      setCountryList(countryCodeList);
    } else {
      let filteredCountry = [];
      countryCodeList.filter((country) => {
        if (country.name.toLowerCase().includes(text.toLowerCase())) {
          filteredCountry.push(country);
        }
      });
      setCountryList(filteredCountry);
    }
  }

  const onCountrySelected = (item) => {
    dispatch(updateSelectedCountryDetail(item));
    console.log(item);
    navigation.goBack();
  };

  function renderCountryDetail(item) {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => onCountrySelected(item)}
        style={{flexDirection: 'row', padding: 12}}>
        <Text style={{fontSize: 16}}>{item.flag}</Text>
        <Text style={{fontSize: 16, marginStart: 10, flex: 1}}>
          {item.name}
        </Text>
        <Text style={{fontSize: 16}}>{item.dial_code}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        padding: 15,
      }}>
      <View style={{flexDirection: 'row', height: 40, alignItems: 'center'}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesomeIcon
            icon={faArrowLeft}
            style={{
              width: 18,
              height: 18,
            }}
            size={20}
            color={Colors.Black}
          />
        </TouchableOpacity>
        <Text style={styles.headingText}>Select Country</Text>
      </View>
      <View style={styles.ViewCont}>
        <View style={{width: '10%'}}>
          <FontAwesomeIcon
            icon={faSearch}
            style={{
              width: 18,
              height: 18,
            }}
            size={20}
            color={Colors.textDarkGray}
          />
        </View>
        <View style={{width: '90%'}}>
          <TextInput
            value={searchCountry}
            onChangeText={(text) => filterCountry(text)}
            underlineColorAndroid="transparent"
            placeholder="Search Country"
            placeholderTextColor={Colors.textDarkGray}
            // maxLength={30}
            style={{fontSize: 16}}
          />
        </View>
      </View>
      {countryList.length > 0 ? (
        <FlatList
          data={countryList}
          keyExtractor={(_, index) => index.toString()}
          ItemSeparatorComponent={() => (
            <View
              style={{
                borderBottomColor: '#EBEBEE',
                borderBottomWidth: 1,
              }}
            />
          )}
          renderItem={({item}) => renderCountryDetail(item)}
        />
      ) : (
        <Text style={{color: Colors.Black}}>{'No result found'}</Text>
      )}
      {/* <Loader /> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headingText: {
    color: Colors.Black,
    fontSize: 20,
    textAlign: 'center',
    alignSelf: 'center',
    width: '100%',
    paddingEnd: 18,
  },
  ViewCont: {
    flexDirection: 'row',
    borderBottomColor: '#EBEBEE',
    borderBottomWidth: 1,
    padding: 8,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CountryCode;
