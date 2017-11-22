import { Navigation } from 'react-native-navigation';
import Login from './Login';
import HomeTab from './HomeTab';
import ProfileTab from './ProfileTab';


// register all screens of the app (including internal ones)
export function registerScreens(store, Provider) {
  Navigation.registerComponent('werate.Login', () => Login, store, Provider);
  Navigation.registerComponent('werate.HomeTab', () => HomeTab, store, Provider);
  Navigation.registerComponent('werate.ProfileTab', () => ProfileTab, store, Provider);
}
