// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import { LoginForm, SignupForm, NewPasswordForm } from './components';
import { login, checkIfLoggedIn } from '../state/App/action-creators';
import { signupRequest } from '../state/Auth/action-creators';



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

  renderLogin() {
    return this.props.approvedUser ? (
      <NewPasswordForm
          err={this.props.err}
          onSubmit={this.props.login}
          isLoading={this.props.isLoading || this.props.isFetching}
      />
    ) : (
      <LoginForm
          err={this.props.err}
          onSubmit={this.props.login}
          isLoading={this.props.isLoading || this.props.isFetching}
      />
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.signup ? (
          <SignupForm
              err={this.props.err}
              onSubmit={this.props.signup}
              isLoading={this.props.isLoading || this.props.isFetching}
          />
        ) : (
          <LoginForm
              err={this.props.err}
              onSubmit={this.props.login}
              isLoading={this.props.isLoading || this.props.isFetching}
          />
        )}
      </View>
    );
  }
}


const mapState = ({ auth, fetch }) => ({
  err: auth.err,
  isLoading: auth.isLoading,
  isFetching: fetch.isFetching,
  approvedUser: auth.user.approved
});

const mapDispatch = dispatch => ({
  checkIfLoggedIn: () => dispatch(checkIfLoggedIn()),
  signup: (newUser) => dispatch(signupRequest(newUser)),
  login: ({ email, password }) => dispatch(login({ email, password }))
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
  confirmSignup: any,
  checkIfLoggedIn: any,
  isLoading: boolean,
  isFetching: boolean
};

type loginState = {
  signup: boolean
}
