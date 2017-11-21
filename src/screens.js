import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';

import Main from './views/Main';
import store from './state/store';

// register all screens of the app (including internal ones)
export function registerScreens() {
  Navigation.registerComponent('werate.Main', () => Main, store, Provider);
}
