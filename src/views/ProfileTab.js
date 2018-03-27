import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logout } from '../state/App/action-creators';
import { UserProfile } from './components';



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
    return (
      <UserProfile user={this.props.user} />
    );
  }
}


const mapState = ({ auth }) => ({ user: auth.user });


const mapDispatch = dispatch => ({
  logout: () => dispatch(logout())
});


export default connect(mapState, mapDispatch)(ProfileTab);
