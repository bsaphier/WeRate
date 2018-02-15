import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, FlatList, View } from 'react-native';
import { logout } from '../state/App/action-creators';
import { UserCard, Spinner } from './components';



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

  renderUserCard = ({ item: { userId } }) => {
    const { admin, firstName, lastName, email, phone, business, website, reviewIds } = this.props.usersById[userId];
    return this.props.loaded && (
      <UserCard
          key={userId + 'userCard'}
          icon={'ios-images-outline'}
          admin={admin}
          email={email}
          phone={phone}
          website={website}
          business={business}
          lastName={lastName}
          firstName={firstName}
          reviewCount={reviewIds.length}
      />
    );
  }

  render() {
    const { loaded, allUserIds } = this.props;
    return loaded ? (
      <View style={styles.viewContainer}>
        <FlatList
            style={styles.listContainer}
            data={allUserIds.map(userId => ({ key: userId, userId }))}
            renderItem={this.renderUserCard}
        />
      </View>
    ) : (
      <View style={styles.spinnerContainter}>
        <Spinner large />
      </View>
    );
  }
}


const mapState = (state) => ({
  usersById: state.users.byId,
  allUserIds: state.users.allIds,
  loaded: state.fetch.initialStateLoaded
});


const mapDispatch = dispatch => ({
  logout: () => dispatch(logout())
});


export default connect(mapState, mapDispatch)(HomeTab);


const styles = StyleSheet.create({
  viewContainer: {
    height: '100%'
  },
  spinnerContainter: {
    flex: 1,
    justifyContent: 'space-around'
  },
  listContainer: {
    paddingBottom: 100
  }
});
