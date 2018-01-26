import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import { editUser } from '../state/Users/action-creators';
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

  handleSubmit = async (values) => {
    const { user, navigator, handleEditUser } = this.props;
    try {
      await handleEditUser({ ...values, id: user.id });
    } catch (err) {
      console.log('handleSubmitForm', err);
    }
    navigator.dismissModal();
  }

  render() {
    return (
      <View style={styles.container}>
        <ProfileForm
            user={this.props.user}
            onSubmit={this.handleSubmit}
        />
      </View>
    );
  }
}


const mapDispatch = dispatch => ({
  handleEditUser: async (user) => await dispatch(editUser(user))
});


export default connect(null, mapDispatch)(ProfileModal);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  }
});
