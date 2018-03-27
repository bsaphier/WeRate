/* globals console */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { submit } from 'redux-form';
import { View } from 'react-native';
import { editUser } from '../state/Users/action-creators';
import { Btn, ProfileForm } from './components';
import layoutStyles from './styles/layout';


// TODO: move all events (like this) to a single file of event constants
const CLOSE_MODAL_EVENT = 'modal.profile.event.cancel';


class ProfileModal extends Component {

  static navigatorButtons = {
    rightButtons: [
      {
        title: 'cancel',
        id: CLOSE_MODAL_EVENT
      }
    ]
  }

  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
  }

  onNavigatorEvent = (event) => {
    if (event.type == 'NavBarButtonPress') {
      if (event.id == CLOSE_MODAL_EVENT) {
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
      <View style={layoutStyles.container}>
        <View style={layoutStyles.contentContainer}>
          <ProfileForm user={this.props.user} onSubmit={this.handleSubmit} />
        </View>
        <View style={layoutStyles.buttonWrapper}>
          <Btn title="submit" onPress={this.props.submitProfileForm} />
        </View>
      </View>
    );
  }
}


const mapDispatch = dispatch => ({
  submitProfileForm: () => dispatch(submit('profileForm')),
  handleEditUser: async (user) => await dispatch(editUser(user))
});

export default connect(null, mapDispatch)(ProfileModal);
