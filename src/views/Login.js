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
      <View style={styles.buttonWrapper}>
        {(isLoading || isFetching) ? <Spinner /> : <Btn title={submitTitle} onPress={submitAction} />}
        <Btn title={this.state.signup ? 'Cancel' : 'Sign Up'} onPress={this.toggleSignupForm} />
      </View>
    );
  }

  renderLogin = () => {
    if (this.state.signup) {
      return <SignupForm err={this.props.err} onSubmit={this.props.signup} />;
    }
    else if (this.props.firstTimeUser) {
      return <NewPasswordForm err={this.props.err} onSubmit={this.props.firstTimeSignIn} />;
    }
    else {
      return <LoginForm err={this.props.err} onSubmit={this.props.login} />;
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          {}
        </View>
        <View style={styles.container}>
          <ScrollView contentContainerStyle={styles.inputWrapper} centerContent={true}>
            {this.renderLogin()}
          </ScrollView>
        </View>
        {this.renderButtons()}
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
    // height: '100%',
    flex: 1,
    // justifyContent: 'space-between'
  },
  header: {
    flex: 0.06,
    // backgroundColor: 'red'
  },
  buttonWrapper: {
    flex: 0.1,
    flexDirection: 'row',
    alignContent: 'center',
    paddingBottom: 15,
    paddingRight: 10,
    paddingLeft: 10
    // height: '100%'
  },
  inputWrapper: {
    // flex: 0.5,
    paddingTop: 20,
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
