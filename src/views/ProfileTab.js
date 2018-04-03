/* globals console */
import React, { Component } from 'react';
import { submit } from 'redux-form';
import { connect } from 'react-redux';
import { View, ScrollView, KeyboardAvoidingView } from 'react-native';
import { Btn, Spinner, UserProfile as UserProfileForm } from './components';
import { logout } from '../state/App/action-creators';
import { checkAuth } from '../state/Auth/action-creators';
import { editUser } from '../state/Users/action-creators';
import styles from './styles/layout';



// TODO: move to constants
const PROFILE_VALUES = ['firstName', 'lastName', 'email', 'business', 'phone', 'website'];

const canEdit = (() => {
  const canEditObj = {};
  PROFILE_VALUES.forEach(value => {
    canEditObj[value] = false;
  });
  return canEditObj;
})();


class ProfileTab extends Component {
  
  constructor(props) {
    super(props);
    this.state = { canEdit };
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
  }

  onNavigatorEvent = (event) => {
    if (event.type == 'NavBarButtonPress') {
      switch (event.id) {
        case 'global.event.logout':
          this.props.logout();
          break;
        default:
          break;
      }
    }
  }

  handleSubmit = async (values) => {
    const { user, handleEditUserProfile } = this.props;
    try {
      await handleEditUserProfile({ ...values, id: user.id });
    } catch (err) {
      console.log('handleSubmitForm', err);
    }
    this.setState({ canEdit });
  }

  onToggleEditState = (fieldName) => {
    this.setState({ canEdit: {
      ...this.state.canEdit,
      [fieldName]: !this.state.canEdit[fieldName]
    }});
  }

  renderSubmitButton = () => {
    let shouldRender = false;
    Object.keys(this.state.canEdit).forEach(field => {
      if (this.state.canEdit[field]) {
        shouldRender = true;
      }
    });
    return shouldRender ? (
      <View style={styles.buttonWrapper}>
        <Btn title="Save Changes" onPress={this.props.submitProfileEdit} />
      </View>
    ) : null;
  }

  render() {
    const { user, loggedIn, isLoading, initialValues } = this.props;
    return loggedIn && !isLoading ? (
      <KeyboardAvoidingView
          behavior="padding"
          keyboardVerticalOffset={64}
          style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.contentContainer} centerContent={true}>
          <UserProfileForm
              user={user}
              canEdit={this.state.canEdit}
              onSubmit={this.handleSubmit}
              initialValues={initialValues}
              handleToggleEditState={this.onToggleEditState}
          />
        </ScrollView>
        { this.renderSubmitButton() }
      </KeyboardAvoidingView>
    ) : (
      <View style={styles.contentContainer}>
        <Spinner large />
      </View>
    );
  }
}


const mapState = ({ auth }) => ({
  user: auth.user,
  loggedIn: auth.isLoggedIn,
  isLoading: auth.isLoading,
  initialValues: {
    firstName: auth.user.firstName,
    lastName: auth.user.lastName,
    email: auth.user.email,
    business: auth.user.business,
    phone: auth.user.phone,
    website: auth.user.website,
  }
});


const mapDispatch = dispatch => ({
  logout: () => dispatch(logout()),
  checkAuth: () => dispatch(checkAuth()),
  handleEditUserProfile: async (user) => await dispatch(editUser(user)),
  submitProfileEdit: () => dispatch(submit('editUserProfileForm'))
});


export default connect(mapState, mapDispatch)(ProfileTab);
