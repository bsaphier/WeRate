import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Button, Text } from 'react-native';
import { logout } from '../state/Auth/action-creators';
import { Sketch } from './components';
import { getAdminUser } from '../utils/firestore-actions';



class Moretab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      admin: {}
    }
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

  getAdmin = () => {
    // const admin = await getAdminUser();
    // this.setState({ admin });
  }

  render() {
    console.log('*$@*@$*@$*@$*@$*@*$$*@*', this.state.admin)
    return (
      <View style={styles.container}>
      <Button title="Get Admin" onPress={this.getAdmin} />
       {/* <Sketch /> */}
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
