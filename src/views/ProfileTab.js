/* globals console */
import React, { Component } from 'react';
import { View } from 'react-native';
import { submit } from 'redux-form';
import { connect } from 'react-redux';
import { Btn, UserProfile } from './components';
import { logout } from '../state/App/action-creators';
import { editUser } from '../state/Users/action-creators';
import styles from './styles/layout';



class ProfileTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      canEdit: {
        firstName: false,
        lastName: false,
        email: false,
        business: false,
        phone: false,
        website: false
      }
    };
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
    const { user, loggedIn, initialValues } = this.props;
    return loggedIn && (
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <UserProfile
              user={user}
              canEdit={this.state.canEdit}
              onSubmit={this.handleSubmit}
              initialValues={initialValues}
              handleToggleEditState={this.onToggleEditState}
          />
        </View>
        { this.renderSubmitButton() }
      </View>
    );
  }
}


const mapState = ({ auth }) => ({
  user: auth.user,
  loggedIn: auth.isLoggedIn,
  initialValues: {
    email: auth.user.email,
    phone: auth.user.phone,
    website: auth.user.website,
    business: auth.user.business,
    lastName: auth.user.lastName,
    firstName: auth.user.firstName
  }
});


const mapDispatch = dispatch => ({
  logout: () => dispatch(logout()),
  handleEditUserProfile: async (user) => await dispatch(editUser(user)),
  submitProfileEdit: () => dispatch(submit('editUserProfileForm'))
});


export default connect(mapState, mapDispatch)(ProfileTab);
