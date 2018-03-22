import React from 'react';
import { Text, TouchableHighlight } from 'react-native';
import style from '../styles/buttons';
import colors from '../styles/colors';



const Btn = ({ title, onPress }) => {
  return (
    <TouchableHighlight style={style.default} onPress={onPress} underlayColor={colors.BRAND_MAIN.LIGHT}>
      <Text style={style.defaultText}>{ title.toUpperCase() }</Text>
    </TouchableHighlight>
  );
};


export default Btn;
