import React, { Component } from 'react';
import { View } from 'react-native';
import { Login, Sketch, Header, Spinner } from './components';
import { connect } from 'react-redux';
import { fetchInitialData } from '../state/Loader/action-creators';


class Main extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.loggedIn && !nextProps.initialized) {
      this.props.fetchInitialState();
    }
  }

  render() {
    if (this.props.loggedIn && this.props.initialized) {
      return (
        <View>
          <Header />
          <Sketch />
        </View>
      );
    } else if (this.props.loggedIn && !this.props.initialized) {
      return (<Spinner />);
    } else {
      return (<Login />);
    }
  }
}

const mapState = ({ auth, fetch }) => ({
  loggedIn: auth.isLoggedIn,
  initialized: fetch.initialStateLoaded
});

const mapDispatch = (dispatch) => ({
  fetchInitialState: () => dispatch(fetchInitialData())
});

export default connect(mapState, mapDispatch)(Main);
