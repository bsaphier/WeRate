import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import store from './state/store';
import { registerScreens } from './views/screens';
import { iconsMap, loadIcons } from './utils/icons-loader';
import { appInitialized } from './state/App/action-creators';
import { APP_ROOT, LOGIN_ROOT, PENDING_SIGNUP_ROOT } from './state/App/types';



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

      case PENDING_SIGNUP_ROOT:
        Navigation.startSingleScreenApp({
          // TODO ...
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
          // ^^^ TODO ^^^
        });
        break;

      case APP_ROOT:
        Navigation.startTabBasedApp({
          tabs: [
            {
              title: 'My Group', // In the future, when there are multiple groups, this title will be fetched before loading
              label: 'Home',
              screen: 'werate.tab.home',
              icon: iconsMap['ios-home-outline'],
              overrideBackPress: false,
              navigatorStyle: {},
              navigatorButtons: {
                leftButtons: [
                  {
                    title: 'logout',
                    id: 'global.event.logout'
                  }
                ]
              }
            },
            {
              title: 'Places',
              label: 'Places',
              screen: 'werate.tab.places',
              icon: iconsMap['ios-pin-outline'],
              navigatorStyle: {},
              navigatorButtons: {
                leftButtons: [
                  {
                    title: 'logout',
                    id: 'global.event.logout'
                  }
                ],
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
              navigatorButtons: {
                leftButtons: [
                  {
                    title: 'logout',
                    id: 'global.event.logout'
                  }
                ],
                rightButtons: [
                  {
                    title: 'edit',
                    id: 'tab.profile.event.edit'
                  }
                ]
              }
            } /*,
            {
              title: 'More',
              label: 'More',
              screen: 'werate.tab.more',
              icon: iconsMap['ios-more-outline'],
              navigatorStyle: {},
              navigatorButtons: {
                leftButtons: [
                  {
                    title: 'logout',
                    id: 'global.event.logout'
                  }
                ]
              }
            } */
          ]
        });
        return;
    
      default:
        console.log('No Root Found');
        break;
    }
  }
}