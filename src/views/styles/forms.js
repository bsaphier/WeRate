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
    height: 60,
    marginTop: 5,
    marginBottom: 20,
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%',
    borderColor: colors.SHADE.LIGHT,
    borderBottomWidth: 1
  },
  labelStyle: {
    fontSize: 16,
    color: colors.PRIMARY.DARK,
    fontWeight: '800',
    flex: 0.8
  },
  inputStyle: {
    paddingRight: 2,
    paddingLeft: 2,
    paddingBottom: 1,
    color: colors.PRIMARY.DARK,
    fontSize: 26,
    fontWeight: '200',
    flex: 1.2,
    height: 59,
    width: '100%'
  }
});
