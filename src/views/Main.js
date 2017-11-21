import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LoginForm, Sketch, Header } from './components';
import { connect } from 'react-redux';
import { fetchInitialData } from '../state/Loader/action-creators';
import { checkAuth } from '../state/Auth/action-creators';


class Main extends Component {
  componentDidMount() {
    this.props.checkAuth();
  }

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
      return (
        <View style={styles.loadingScreen}>
          <Text style={styles.loadingText}>LOADING</Text>
        </View>
      );
    } else {
      return (<LoginForm />);
    }
  }
}


const styles = StyleSheet.create({
  loadingScreen: {
    height: '100%',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#eee'
  },
  loadingText: {
    fontWeight: 'bold',
    marginTop: 34,
    marginBottom: 13,
    fontSize: 55,
    color: '#444'
  }
});


const mapState = ({ auth, fetch }) => ({
  loggedIn: auth.isLoggedIn,
  initialized: fetch.initialStateLoaded
});

const mapDispatch = (dispatch) => ({
  checkAuth: () => dispatch(checkAuth()),
  fetchInitialState: () => dispatch(fetchInitialData())
});

export default connect(mapState, mapDispatch)(Main);
