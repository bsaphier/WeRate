import React from 'react';
import { Text } from 'react-native';
import style from '../styles/buttons';



const Txt = ({ children }) => {
  return (
      <Text style={style.defaultText}>{ children }</Text>
  );
};


export default Txt;
