import React from 'react';
import { Text } from 'react-native';
import style from '../styles/text';



const Txt = ({ children }) => {
  return (
      <Text style={style.default}>{ children }</Text>
  );
};


export default Txt;
