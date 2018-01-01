import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';
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
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          PROFILE
        </Text>
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
