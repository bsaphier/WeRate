import { StyleSheet } from 'react-native';
import colors from './colors';

export default StyleSheet.create({
  container: {
    marginBottom: 21,
    padding: 13,
    borderColor: colors.SHADE.LIGHT,
    borderWidth: 1,
    borderRadius: 8
  },
  headerContainer: {
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  headerLeft: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  headerRight: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  headerTitle: {
    fontSize: 14,
    color: colors.PRIMARY.DARKER,
    alignSelf: 'center'
    // textAlign: 'center',
    // textAlignVertical: 'bottom'
    // marginTop: 13,
    // marginLeft: 21,
    // marginRight: 21,
    // fontWeight: 'bold'
  },
  subHeaderContainer: {
    // marginBottom: 6,
    // paddingLeft: 8,
    // paddingRight: 8,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  bodyContainer: {
    // borderTopColor: '#fafafa',
    // borderTopWidth: 2,
    // padding: 8,
    // flexDirection: 'column',
    // justifyContent: 'space-between'
  },
  cardDataContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  cardDataLabel: {
    fontSize: 13,
    color: colors.PRIMARY.DARK
  },
  cardData: {
    color: colors.SHADE.DARK,
    fontSize: 13,
    fontFamily: 'Avenir Next'
  },
  icon: {
    width: 34,
    height: 34
  },
  star: {
    // width: 16,
    // height: 16,
    // marginBottom: 3,
    // alignSelf: 'center'
  },
  tagWrapper: {
    alignSelf: 'center',
    borderRadius: 3,
    padding: 2,
    backgroundColor: colors.PRIMARY.LIGHTER
  },
  tagContent: {
    marginLeft: 6,
    marginRight: 6,
    color: colors.SHADE.DARK,
    fontSize: 11,
    fontWeight: '600',
    fontFamily: 'Avenir Next',
  }
});
