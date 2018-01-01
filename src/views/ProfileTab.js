import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import { LabeledValue } from './components';
import { editUser } from '../state/User/action-creators';



class ProfileTab extends Component {
  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
  }

  onNavigatorEvent = (event) => {
    if (event.type == 'NavBarButtonPress') {
      if (event.id == 'tab.profile.event.edit') {
        this.showEditUserForm();
      }
    }
  }

  showEditUserForm = () => {
    this.props.navigator.showModal({
      screen: 'werate.modal.profile',
      title: 'Edit Profile',
      passProps: {
        user: this.props.user,
        handleSubmit: this.onEditUserSubmit
      }
    });
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
    const { email, firstName, lastName, business, phone, website } = this.props.user;
    return (
      <View style={styles.container}>
        <LabeledValue label="First Name" value={firstName} />
        <LabeledValue label="Last Name" value={lastName} />
        <LabeledValue label="Email" value={email} />
        <LabeledValue label="Business" value={business} />
        <LabeledValue label="Phone" value={phone} />
        <LabeledValue label="Website" value={website} />
      </View>
    );
  }
}


const mapState = ({ user }) => ({ user });


const mapDispatch = dispatch => ({
  onEditUser: async (user) => await dispatch(editUser(user))
});


export default connect(mapState, mapDispatch)(ProfileTab);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});
