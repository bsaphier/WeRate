// @flow
import React from 'react';
import { View, Text } from 'react-native';
import styles from '../styles/forms';


const LabeledValue = ({ label, value }: LabeledValueProps) => (
  <View style={styles.inputContainerStyle}>
    <Text style={styles.labelStyle}>{label}</Text>
    <Text style={styles.formTextInput}>{value}</Text>
  </View>
);

export default LabeledValue;

type LabeledValueProps = {
  label: string;
  value: string;
};
