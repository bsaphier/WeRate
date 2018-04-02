import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { getSelectedUser } from '../state/Users/selectors';
import { UserProfile } from './components/UserProfile'; // Not a redux-form
import styles from './styles/layout';



class ProfileScreen extends Component {
  componentWillMount() {
    const { user, navigator } = this.props;
    navigator.setTitle({
      title: `${user.firstName} ${user.lastName}`
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <UserProfile user={this.props.user} />
        </View>
      </View>
    );
  }
}


const mapState = (state) => ({
  user: getSelectedUser(state)
});


export default connect(mapState)(ProfileScreen);
