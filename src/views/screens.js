import { Navigation } from 'react-native-navigation';
import Login from './Login';
import HomeTab from './HomeTab';
import MoreTab from './MoreTab';
import PlacesTab from './PlacesTab';
import ProfileTab from './ProfileTab';
import PlaceModal from './PlaceModal';
import PlaceScreen from './PlaceScreen';
import ReviewModal from './ReviewModal';
import SearchModal from './SearchModal';
import ProfileModal from './ProfileModal';


// register all screens of the app (including internal ones)
export function registerScreens(store, Provider) {
  Navigation.registerComponent('werate.Login', () => Login, store, Provider);
  Navigation.registerComponent('werate.tab.home', () => HomeTab, store, Provider);
  Navigation.registerComponent('werate.tab.more', () => MoreTab, store, Provider);
  Navigation.registerComponent('werate.tab.places', () => PlacesTab, store, Provider);
  Navigation.registerComponent('werate.tab.profile', () => ProfileTab, store, Provider);
  Navigation.registerComponent('werate.modal.place', () => PlaceModal, store, Provider);
  Navigation.registerComponent('werate.modal.review', () => ReviewModal, store, Provider);
  Navigation.registerComponent('werate.modal.search', () => SearchModal, store, Provider);
  Navigation.registerComponent('werate.screen.place', () => PlaceScreen, store, Provider);
  Navigation.registerComponent('werate.modal.profile', () => ProfileModal, store, Provider);
}
