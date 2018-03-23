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
    // height: 60,
    marginTop: 5,
    marginBottom: 21,
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%',
    // borderColor: colors.SHADE.LIGHTER,
    // borderBottomWidth: 1
  },
  labelStyle: {
    // marginBottom: 5,
    fontSize: 16,
    // fontFamily: 'Avenir Next',
    color: colors.PRIMARY.DARK,
    // fontWeight: '700',
    // flex: 0.8
  },
  formTextInput: {
    paddingBottom: 1,
    color: colors.PRIMARY.DARKER,
    fontSize: 25,
    // fontWeight: '100',
    fontFamily: 'Avenir Next',
    // flex: 1.2,
    // height: 59,
    width: '100%'
  }
});
