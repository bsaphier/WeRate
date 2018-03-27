import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSelectedUser } from '../state/Users/selectors';
import { UserProfile } from './components';



class ProfileScreen extends Component {
  componentWillMount() {
    const { user, navigator } = this.props;
    navigator.setTitle({
      title: `${user.firstName} ${user.lastName}`
    });
  }

  render() {
    return (
      <UserProfile user={this.props.user} />
    );
  }
}


const mapState = (state) => ({
  user: getSelectedUser(state)
});


export default connect(mapState)(ProfileScreen);
