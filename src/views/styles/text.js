import { StyleSheet } from 'react-native';
import colors from './colors';


export default StyleSheet.create({
  default: {
    fontFamily: 'Futura'
  },
  title: {
    color: colors.PRIMARY.BASE,
    textAlign: 'center',
    fontSize: 14
  },
  subTitle: {
    marginTop: 8,
    fontSize: 12,
    textAlign: 'center',
    color: colors.PRIMARY.BASE
  },
  subTitleButton: {
    textDecorationLine: 'underline'
  }
});