import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import store from './state/store';
import { registerScreens } from './views/screens';
import { iconsMap, loadIcons } from './utils/icons-loader';
import { appInitialized } from './state/App/action-creators';
import { APP_ROOT, LOGIN_ROOT } from './state/App/types';



registerScreens(store, Provider);
loadIcons();

export default class App extends Component {
  
  constructor(props) {
    super(props);
    store.subscribe(this.onStoreUpdate);
    store.dispatch(appInitialized());
  }

  onStoreUpdate = () => {
    let { root } = store.getState().root;
    
    // handle a root change
    if (this.currentRoot != root) {
      this.currentRoot = root;
      this.startApp(root);
    }
  }
  
  startApp(root) {
    switch (root) {
      case LOGIN_ROOT:
        Navigation.startSingleScreenApp({
          screen: {
            screen: 'werate.Login',
            title: 'Welcome',
            navigatorStyle: {},
            navigatorButtons: {}
          }
        });
        break;

      case APP_ROOT:
        Navigation.startTabBasedApp({
          tabs: [
            {
              label: 'Home',
              screen: 'werate.HomeTab',
              title: 'Home Tab',
              overrideBackPress: false,
              navigatorStyle: {},
              navigatorButtons: {}
            },
            {
              label: 'Profile',
              screen: 'werate.ProfileTab',
              title: 'Profile Tab',
              navigatorStyle: {},
              navigatorButtons: {}
            }
          ],
        });
        return;
    
      default:
        console.log('No Root Found');
        break;
    }
  }
}