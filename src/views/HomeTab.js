import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FlatList, View } from 'react-native';
import { logout } from '../state/App/action-creators';
import { selectUser } from '../state/Users/action-creators';
import { UserCard, Spinner } from './components';
import styles from './styles/layout';



class HomeTab extends Component {
  constructor(props) {
    super(props);
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

  handleSelectUser = (userId) => {
    const { onSelectUser, navigator } = this.props;
    onSelectUser(userId);
    navigator.push({
      screen: 'werate.screen.profile'
    });
  }

  renderUserCard = ({ item: { userId } }) => {
    return this.props.loaded && (
      <UserCard
          key={userId + 'userCard'}
          icon={'ios-images-outline'}
          user={this.props.usersById[userId]}
          onSelectUser={() => this.handleSelectUser(userId)}
      />
    );
  }

  render() {
    const { loaded, loggedIn, allUserIds } = this.props;
    return loggedIn && loaded ? (
      <View style={styles.contentContainer}>
        <FlatList
            data={allUserIds.map(userId => ({ key: userId, userId }))}
            renderItem={this.renderUserCard}
        />
      </View>
    ) : (
      <View style={styles.contentContainer}>
        <Spinner large />
      </View>
    );
  }
}


const mapState = (state) => ({
  usersById: state.users.byId,
  allUserIds: state.users.allIds,
  loggedIn: state.auth.isLoggedIn,
  loaded: state.fetch.initialStateLoaded
});


const mapDispatch = dispatch => ({
  logout: () => dispatch(logout()),
  onSelectUser: (userId) => dispatch(selectUser(userId)),
});


export default connect(mapState, mapDispatch)(HomeTab);
