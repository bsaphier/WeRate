// @flow
import React from 'react';
import { View } from 'react-native';
import styles from '../styles/forms';
import Txt from './Txt';


const LabeledValue = ({ label, value }: LabeledValueProps) => (
  <View style={styles.inputContainerStyle}>
    <Txt style={styles.labelStyle}>{label}</Txt>
    <Txt style={styles.formTextInput}>{value}</Txt>
  </View>
);

export default LabeledValue;

type LabeledValueProps = {
  label: string;
  value: string;
};
