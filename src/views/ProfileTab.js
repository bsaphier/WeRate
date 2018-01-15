import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import { logout } from '../state/Auth/action-creators';
import { LabeledValue } from './components';



class ProfileTab extends Component {
  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
  }

  onNavigatorEvent = (event) => {
    if (event.type == 'NavBarButtonPress') {
      switch (event.id) {
        case 'tab.profile.event.edit':
          this.showEditUserForm();
          break;
        case 'global.event.logout':
          this.props.logout();
          break;
        default:
          break;
      }
    }
  }

  showEditUserForm = () => {
    this.props.navigator.showModal({
      screen: 'werate.modal.profile',
      title: 'Edit Profile',
      passProps: {
        user: this.props.user
      }
    });
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
  logout: () => dispatch(logout())
});


export default connect(mapState, mapDispatch)(ProfileTab);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});
