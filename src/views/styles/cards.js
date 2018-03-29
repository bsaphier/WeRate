import { StyleSheet } from 'react-native';
// import colors from './colors';

export default StyleSheet.create({
  container: {
    display: 'flex',
    marginBottom: 21,
    borderBottomColor: '#e5e5e5',
    borderBottomWidth: 3,
    padding: 13
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 13
  },
  headerTitle: {
    color: '#222',
    marginTop: 13,
    marginLeft: 21,
    marginRight: 21,
    fontWeight: 'bold'
  },
  tagContainer: {
    marginBottom: 6,
    paddingLeft: 8,
    paddingRight: 8,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  bodyContainer: {
    display: 'flex',
    borderTopColor: '#fafafa',
    borderTopWidth: 2,
    padding: 8,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  detailContainer: {
    color: '#222',
    display: 'flex',
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  detailContent: {
    color: '#444',
    fontWeight: 'bold',
    marginLeft: 5
  },
  icon: {
    width: 34,
    height: 34
  }
});
