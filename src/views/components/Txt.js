import React from 'react';
import { Text } from 'react-native';
import styles from '../styles/text';



const Txt = ({ style, children, ...props }) => {
  return (
      <Text style={[styles.default, style]} {...props}>{ children }</Text>
  );
};


export default Txt;
