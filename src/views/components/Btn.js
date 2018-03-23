import React from 'react';
import { View, TouchableHighlight } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Txt from './Txt';
import style from '../styles/buttons';
import colors from '../styles/colors';



const Btn = ({ title, onPress }) => {
  return (
    <TouchableHighlight style={style.container} onPress={onPress} underlayColor={colors.PRIMARY.LIGHTER}>
      <LinearGradient colors={[colors.PRIMARY.LIGHT, colors.PRIMARY.LIGHTER]} style={style.backgroundFill}>
        <Txt>{ title.toUpperCase() }</Txt>
      </LinearGradient>
    </TouchableHighlight>
  );
};


export default Btn;
