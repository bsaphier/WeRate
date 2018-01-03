import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import { getSelectedUser } from '../state/Users/selectors';
import { LabeledValue } from './components';



class ProfileScreen extends Component {
  componentWillMount() {
    const { user, navigator } = this.props;
    navigator.setTitle({
      title: `${user.firstName} ${user.lastName}`
    });
  }

  render() {
    const { email, firstName, lastName, business, phone, website } = this.props.user;
    return (
      <View>
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


const mapState = (state) => ({
  user: getSelectedUser(state)
});


export default connect(mapState)(ProfileScreen);


const styles = StyleSheet.create({});
