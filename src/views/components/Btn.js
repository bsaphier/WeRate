import React from 'react';
import { View, TouchableHighlight } from 'react-native';
import Txt from './Txt';
import style from '../styles/buttons';
import colors from '../styles/colors';



const Btn = ({ title, onPress }) => {
  return (
    <TouchableHighlight style={style.default} onPress={onPress} underlayColor={colors.BRAND_MAIN.LIGHT}>
      <View><Txt>{ title.toUpperCase() }</Txt></View>
    </TouchableHighlight>
  );
};


export default Btn;
