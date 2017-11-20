// import { AppRegistry } from 'react-native';
// import App from './App';

// AppRegistry.registerComponent('WeRate', () => App);
import { Navigation } from 'react-native-navigation';

import { registerScreens } from './src/screens';

registerScreens(); // this is where you register all of your app's screens

// start the app
Navigation.startSingleScreenApp({
  screen: {
    screen: 'werate.Main', // this is a registered name for a screen
    title: 'Welcome'
  }
});