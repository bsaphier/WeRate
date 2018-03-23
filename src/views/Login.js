// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { submit } from 'redux-form';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Btn, Spinner, LoginForm, SignupForm, NewPasswordForm } from './components';
import { login, checkIfLoggedIn, firstTimeSignIn } from '../state/App/action-creators';
import { signupRequest } from '../state/Auth/action-creators';



class Login extends Component<loginProps, loginState> {
  constructor(props) {
    super(props);
    this.state = { signup: false };
  }

  componentDidMount() {
    this.props.checkIfLoggedIn();
  }

  toggleSignupForm = () => {
    this.setState({ signup: !this.state.signup });
  }

  renderButtons = () => {
    const { signup, isLoading, isFetching, submitLogin, firstTimeUser, firstTimeSignIn } = this.props;
    const submitTitle = this.state.signup ? 'Sign Up' : firstTimeUser ? 'Continue' : 'Sign In';
    const submitAction = this.state.signup ? signup : firstTimeUser ? firstTimeSignIn : submitLogin;
    return (
      <View>
        {(isLoading || isFetching) ? <Spinner /> : <Btn title={submitTitle} onPress={submitAction} />}
        <Btn title={this.state.signup ? 'Cancel' : 'Sign Up'} onPress={this.toggleSignupForm} />
      </View>
    );
  }

  renderLogin = () => {
    return this.props.firstTimeUser ? (
      <NewPasswordForm
          err={this.props.err}
          onSubmit={this.props.firstTimeSignIn}
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
        <ScrollView contentContainerStyle={styles.inputWrapper} centerContent={true}>
          {this.state.signup ? (
            <SignupForm
                err={this.props.err}
                onSubmit={this.props.signup}
                isLoading={this.props.isLoading || this.props.isFetching}
            />
          ) : (this.renderLogin())}
          {this.renderButtons()}
        </ScrollView>
      </View>
    );
  }
}


const mapState = ({ auth, fetch }) => ({
  err: auth.err,
  isLoading: auth.isLoading,
  isFetching: fetch.isFetching,
  firstTimeUser: auth.isLoggedIn && !auth.user.approved
});

const mapDispatch = dispatch => ({
  checkIfLoggedIn: () => dispatch(checkIfLoggedIn()),
  submitLogin: () => dispatch(submit('loginForm')),
  submitSignUp: () => dispatch(submit('signupForm')),
  submitNewPassword: () => dispatch(submit('newPasswordForm')),
  signup: (newUser) => dispatch(signupRequest(newUser)),
  login: ({ email, password }) => dispatch(login({ email, password })),
  firstTimeSignIn: ({ password, confirmPassword }) => dispatch(firstTimeSignIn({ password, confirmPassword }))
});


export default connect(mapState, mapDispatch)(Login);


const styles = StyleSheet.create({
  container: {
    height: '100%'
  },
  inputWrapper: {
    paddingTop: 10,
    paddingRight: 25,
    paddingBottom: 8,
    paddingLeft: 25
  }
});


type loginProps = {
  err: any;
  login: any;
  submitLogin: any;
  submitSignUp: any;
  submitNewPassword: any;
  signup: any;
  navigator: any;
  confirmSignup: any;
  checkIfLoggedIn: any;
  firstTimeSignIn: any;
  isLoading: boolean;
  isFetching: boolean;
  firstTimeUser: boolean;
};

type loginState = {
  signup: boolean;
}
