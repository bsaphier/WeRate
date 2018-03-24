import { StyleSheet } from 'react-native';
import colors from './colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    // borderRadius: 3
  },
  backgroundFill: {
    // paddingTop: 10,
    // paddingRight: 10,
    paddingBottom: 3,
    // paddingLeft: 10,
    // borderRadius: 3
  },
  innerContainer: {
    backgroundColor: 'white'
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
    margin: 8,
    color: colors.PRIMARY.DARKER,
    // borderBottomWidth: 2,
    // borderColor: colors.PRIMARY.BASE,
    backgroundColor: 'transparent'
  }
});
