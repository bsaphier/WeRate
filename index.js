import { Navigation } from 'react-native-navigation';

import { registerScreens } from './src/screens';

registerScreens(); // this registers all of the app's screens

// start the app
Navigation.startSingleScreenApp({
  screen: {
    screen: 'werate.Main', // this is a registered name for a screen
    title: 'WeRate'
  }
});
