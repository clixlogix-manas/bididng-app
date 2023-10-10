calendar-red-background issue fix:
- node_modules\react-native-calendar-strip\src\CalendarDay.js
- Line no.402 replace with
    _dateViewStyle.push({ backgroundColor: daySelectionAnimation.highlightColor,height:90,borderRadius:10 });

Instagram-login-issue page not found fix:
- node_modules\react-native-instagram-login\Instagram.js
- Line no.77 replace with
 let form = new FormData();
 form.append('client_id', appId);
 form.append('client_secret', appSecret);

- node_modules/react-native-google-places-autocomplete/GooglePlacesAutocomplete.js
- Line no.138 replace code 
 _handleChangeText(stateText); to 
 
 if(props.value){
      _handleChangeText(props.value);

    }else{
      _handleChangeText(stateText);

    }