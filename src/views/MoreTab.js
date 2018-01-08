import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import { logout } from '../state/Auth/action-creators';
import { Sketch } from './components';



class Moretab extends Component {
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

  render() {
    return (
      <View style={styles.container}>
        <Sketch />
      </View>
    );
  }
}


const mapState = () => ({});


const mapDispatch = dispatch => ({
  logout: () => dispatch(logout())
});


export default connect(mapState, mapDispatch)(Moretab);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});
