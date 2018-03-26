import { StyleSheet } from 'react-native';
import colors from './colors';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundFill: {
    paddingBottom: 3
  },
  innerContainer: {
    backgroundColor: 'white'
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    margin: 8,
    color: colors.PRIMARY.DARKER,
    backgroundColor: 'transparent'
  }
});
