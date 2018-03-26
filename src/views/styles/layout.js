import { StyleSheet } from 'react-native';
// import colors from './colors';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: '8%'
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingRight: 25,
    paddingLeft: 25
  },
  buttonWrapper: {
    justifyContent: 'center',
    flexDirection: 'row'
  }
});
