import { StyleSheet } from 'react-native';
import colors from './colors';

export default StyleSheet.create({
  default: {
    marginTop: 10,
    marginBottom: 10,
    padding: 15,
    borderRadius: 50,
    backgroundColor: colors.BRAND_MAIN.BASE
  },
  defaultText: {
    color: colors.SHADE.DARK,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Hiragino Sans'
  }
});
