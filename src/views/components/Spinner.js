// @flow
import React from 'react';
import { ActivityIndicator } from 'react-native';


const Spinner = ({ large }: any) => (
  <ActivityIndicator size={large ? 'large' : 'small'} />
);

export default Spinner;
