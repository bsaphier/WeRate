import React from 'react';
import { Text } from 'react-native';
import styles from '../styles/text';



const Txt = ({ style, children }) => {
  return (
      <Text style={[styles.default, style]}>{ children }</Text>
  );
};


export default Txt;
