import colors from './colors';


export const navigatorStyle = {
  navBarNoBorder: true,
  navBarBackgroundColor: 'white',
  navBarTextColor: colors.PRIMARY.DARK,
  navBarButtonColor: colors.PRIMARY.BASE,
  disabledButtonColor: colors.PRIMARY.LIGHTER
};

export const tabsStyle = {
  tabBarTextFontFamily: 'Futura',
  tabBarBackgroundColor: 'white',
  tabBarButtonColor: colors.PRIMARY.DARKER,
  tabBarHideShadow: true, // iOS only
  tabBarLabelColor: colors.PRIMARY.DARKER, // iOS only
  tabBarSelectedButtonColor: colors.PRIMARY.LIGHT, // iOS only
  tabBarSelectedTextColor: colors.PRIMARY.LIGHT // iOS only
};

export default {
  tabsStyle,
  navigatorStyle
};
