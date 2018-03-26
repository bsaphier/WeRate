// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { submit } from 'redux-form';
import { View, ScrollView, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { Txt, Btn, Spinner, LoginForm, SignupForm, NewPasswordForm } from './components';
import { login, checkIfLoggedIn, firstTimeSignIn } from '../state/App/action-creators';
import { signupRequest } from '../state/Auth/action-creators';
import formStyles from './styles/forms';



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
    const { isLoading, isFetching, submitLogin, submitSignUp, firstTimeUser, submitNewPassword } = this.props;
    const submitTitle = this.state.signup ? 'Sign Up' : firstTimeUser ? 'Continue' : 'Sign In';
    const submitAction = this.state.signup ? submitSignUp : firstTimeUser ? submitNewPassword : submitLogin;
    return (isLoading || isFetching) ? <Spinner large /> : (
      <View style={styles.buttonWrapper}>
        <Btn title={this.state.signup ? 'Cancel' : 'Sign Up'} onPress={this.toggleSignupForm} />
        <Btn title={submitTitle} onPress={submitAction} />
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
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View style={styles.header}>
          {}
        </View>
        <View style={styles.container}>
          <ScrollView contentContainerStyle={styles.inputWrapper} centerContent={true}>
            {this.renderLogin()}
          </ScrollView>
        </View>
        {this.props.err ? <Txt style={formStyles.errorTextStyle}>{this.props.err}</Txt> : null}
        {this.renderButtons()}
      </KeyboardAvoidingView>
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
    flex: 1
  },
  header: {
    height: '8%'
  },
  buttonWrapper: {
    flexDirection: 'row'
  },
  inputWrapper: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingRight: 25,
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
