import React from 'react';
import { View } from 'react-native';
import styles from '../styles/cards';
import Txt from './Txt';



const Tag = ({ name }) => {
  return (
    <View style={styles.tagWrapper}>
      <Txt style={styles.tagContent}>{name}</Txt>
    </View>
  );
};

export default Tag;
