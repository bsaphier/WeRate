// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Btn, LoginForm, SignupForm, NewPasswordForm } from './components';
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

  renderToggleFormBtn = () => {
    return (
      <Btn title={this.state.signup ? 'Cancel' : 'Sign Up'} onPress={this.toggleSignupForm} />
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
          {this.renderToggleFormBtn()}
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
    paddingRight: 20,
    paddingBottom: 8,
    paddingLeft: 20
  }
});


type loginProps = {
  err: any;
  login: any;
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
