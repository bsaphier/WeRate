import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { ProfileForm } from './components';



class ProfileModal extends Component {
  static navigatorButtons = {
    rightButtons: [
      {
        title: 'cancel',
        id: 'modal.profile.event.cancel'
      }
    ]
  }

  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
  }

  onNavigatorEvent = (event) => {
    if (event.type == 'NavBarButtonPress') {
      if (event.id == 'modal.profile.event.cancel') {
        this.props.navigator.dismissModal();
      }
    }
  }

  onEditUserSubmit = async (user) => {
    try {
      await this.props.onEditUser(user);
    } catch (err) {
      console.log('onEditUserSubmit', err);
    }
    this.props.navigator.dismissModal();
  }

  render() {
    const { user } = this.props;
    return (
      <View style={styles.container}>
        <ProfileForm
            user={user}
            handleSubmit={this.onEditUserSubmit}
        />
      </View>
    );
  }
}


export default ProfileModal;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  }
});
