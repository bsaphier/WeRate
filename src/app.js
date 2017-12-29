import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import store from './state/store';
import { registerScreens } from './views/screens';
import { iconsMap, loadIcons } from './utils/icons-loader';
import { appInitialized } from './state/App/action-creators';
import { APP_ROOT, LOGIN_ROOT } from './state/App/types';



loadIcons();
registerScreens(store, Provider);

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
            navigatorButtons: {
              rightButtons: [
                {
                  title: 'sign up',
                  id: 'login.event.toggleSignup'
                }
              ]
            }
          }
        });
        break;

      case APP_ROOT:
        Navigation.startTabBasedApp({
          tabs: [
            {
              title: 'Home',
              label: 'Home',
              screen: 'werate.tab.home',
              icon: iconsMap['ios-home-outline'],
              overrideBackPress: false,
              navigatorStyle: {},
              navigatorButtons: {}
            },
            {
              title: 'Places',
              label: 'Places',
              screen: 'werate.tab.places',
              icon: iconsMap['ios-pin-outline'],
              navigatorStyle: {},
              navigatorButtons: {
                rightButtons: [
                  {
                    title: 'New Place',
                    id: 'tab.place.event.new'
                  }
                ]
              }
            },
            {
              title: 'Profile',
              label: 'Profile',
              screen: 'werate.tab.profile',
              icon: iconsMap['ios-body-outline'],
              navigatorStyle: {},
              navigatorButtons: {}
            },
            {
              title: 'More',
              label: 'More',
              screen: 'werate.tab.more',
              icon: iconsMap['ios-more-outline'],
              navigatorStyle: {},
              navigatorButtons: {}
            }
          ]
        });
        return;
    
      default:
        console.log('No Root Found');
        break;
    }
  }
}