import { StyleSheet } from 'react-native';
import colors from './colors';

export default StyleSheet.create({
  errorTextStyle: {
    color: 'red'
  },
  inputContainerStyle: {
    marginTop: 8,
    marginBottom: 13,
    width: '100%'
  },
  labelStyle: {
    fontSize: 12,
    color: colors.PRIMARY.DARK
  },
  formTextInput: {
    paddingBottom: 1,
    color: colors.SHADE.BASE,
    fontSize: 18,
    fontFamily: 'Avenir Next',
    width: '100%'
  }
});
