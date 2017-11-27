// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import { LoginForm } from './components';
import { login, checkIfLoggedIn } from '../state/App/action-creators';



class Login extends Component<sketchProps> {

  componentDidMount() {
    this.props.checkIfLoggedIn();
  }

  render() {
    return (
      <View style={styles.container}>
        <LoginForm
            err={this.props.err}
            login={this.props.login}
            isLoading={this.props.isLoading}
        />
      </View>
    );
  }
}


const mapState = ({ auth }) => ({
  err: auth.err,
  isLoading: auth.isLoading
});

const mapDispatch = dispatch => ({
  checkIfLoggedIn: () => dispatch(checkIfLoggedIn()),
  login: (email, password) => dispatch(login({ email, password }))
});


export default connect(mapState, mapDispatch)(Login);


const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'center',
    backgroundColor: '#F0F0F0'
  }
});


type sketchProps = {
  err: any,
  login: any,
  checkIfLoggedIn: any,
  isLoading: boolean
};
