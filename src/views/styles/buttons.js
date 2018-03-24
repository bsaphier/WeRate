import { StyleSheet } from 'react-native';
import colors from './colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    // borderRadius: 3
  },
  backgroundFill: {
    flex: 1,
    // paddingTop: 10,
    // paddingRight: 10,
    paddingBottom: 2,
    // paddingLeft: 10,
    // borderRadius: 3
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    // paddingLeft: 15,
    // paddingRight: 15,
    // borderRadius: 3,
    backgroundColor: 'white'
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
    // margin: 5,
    // color: 'white',
    borderBottomWidth: 2,
    borderColor: colors.PRIMARY.BASE,
    backgroundColor: 'transparent'
  }
});
