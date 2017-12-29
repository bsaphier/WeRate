// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import { LoginForm, SignupForm } from './components';
import { login, signup, checkIfLoggedIn } from '../state/App/action-creators';



class Login extends Component<loginProps, loginState> {
  constructor(props) {
    super(props);
    this.state = { signup: false };
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
  }

  componentDidMount() {
    this.props.checkIfLoggedIn();
  }

  onNavigatorEvent = (event) => {
    if (event.type == 'NavBarButtonPress') {
      if (event.id == 'login.event.toggleSignup') {
        this.toggleSignupForm();
      }
    }
  }

  toggleSignupForm = () => {
    this.setState({ signup: !this.state.signup });
    this.props.navigator.setButtons({
      rightButtons: [
        {
          title: this.state.signup ? 'cancel' : 'sign up',
          id: 'login.event.toggleSignup'
        }
      ]
    });
  }

  render() {
    return (
      <View style={styles.container}>
        { this.state.signup ? (
          <SignupForm
              err={this.props.err}
              signup={this.props.signup}
              isLoading={this.props.isLoading}
          />
        ) : (
          <LoginForm
              err={this.props.err}
              login={this.props.login}
              isLoading={this.props.isLoading}
          />
        )}
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
  signup: (newUser) => dispatch(signup(newUser)),
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


type loginProps = {
  err: any,
  login: any,
  signup: any,
  navigator: any,
  checkIfLoggedIn: any,
  isLoading: boolean
};

type loginState = {
  signup: boolean
}
