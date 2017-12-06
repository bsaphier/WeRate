import { Navigation } from 'react-native-navigation';
import Login from './Login';
import HomeTab from './HomeTab';
import MoreTab from './MoreTab';
import PlacesTab from './PlacesTab';
import ProfileTab from './ProfileTab';
import PlaceModal from './PlaceModal';


// register all screens of the app (including internal ones)
export function registerScreens(store, Provider) {
  Navigation.registerComponent('werate.Login', () => Login, store, Provider);
  Navigation.registerComponent('werate.HomeTab', () => HomeTab, store, Provider);
  Navigation.registerComponent('werate.MoreTab', () => MoreTab, store, Provider);
  Navigation.registerComponent('werate.PlacesTab', () => PlacesTab, store, Provider);
  Navigation.registerComponent('werate.ProfileTab', () => ProfileTab, store, Provider);
  Navigation.registerComponent('werate.modal.Place', () => PlaceModal, store, Provider);
}
