import { StyleSheet } from 'react-native';
import colors from './colors';

export default StyleSheet.create({
  errorTextStyle: {
    color: '#E64A19',
    alignSelf: 'center',
    paddingTop: 10,
    paddingBottom: 10
  },
  inputContainerStyle: {
    marginTop: 5,
    marginBottom: 21,
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%'
  },
  labelStyle: {
    // marginBottom: 5,
    fontSize: 14,
    // fontFamily: 'Avenir Next',
    color: colors.PRIMARY.DARK,
    // fontWeight: '700',
    // flex: 0.8
  },
  formTextInput: {
    paddingBottom: 1,
    color: colors.SHADE.BASE,
    fontSize: 25,
    // fontWeight: '100',
    fontFamily: 'Avenir Next',
    // flex: 1.2,
    // height: 59,
    width: '100%'
  }
});
