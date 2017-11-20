// @flow
import React, { Component } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { actionCreators as authActionCreators } from '../../state/Auth';
type sketchProps = {
  requestLogin: any,
  requestSignup: any
};
type sketchState = {
  signup: boolean,
  email: string,
  password: string
};



class Login extends Component<sketchProps, sketchState> {
  constructor(props) {
    super(props);
    this.state = { signup: false, email: '', password: '' };
  }

  signup(x: boolean) {
    this.setState({ signup: x });
  }

  renderLogin() {
    return (
      <View style={styles.loginContainter}>
        <Text style={styles.login}>Email:</Text>
        <TextInput
            style={styles.input}
            value={this.state.email}
            placeholder="Email"
            keyboardType="email-address"
            clearButtonMode="unless-editing"
            onChangeText={(email) => this.setState({ email })}
        />
        <Text style={styles.login}>Password:</Text>
        <TextInput
            style={styles.input}
            secureTextEntry
            selectTextOnFocus
            placeholder="Password"
            value={this.state.password}
            onChangeText={(password) => this.setState({ password })}
        />
        <Button
            title="Login"
            color="#85D"
            onPress={() => this.props.requestLogin(this.state.email, this.state.password)}
        />
      </View>
    );
  }

  renderSignup() {
    return (
      <View style={styles.loginContainter}>
        <Text style={styles.login}>Email:</Text>
        <TextInput
            style={styles.input}
            value={this.state.email}
            placeholder="Email"
            keyboardType="email-address"
            clearButtonMode="unless-editing"
            onChangeText={(email) => this.setState({ email })}
        />
        <Text style={styles.login}>Password:</Text>
        <TextInput
            style={styles.input}
            secureTextEntry
            selectTextOnFocus
            placeholder="Password"
            value={this.state.password}
            onChangeText={(password) => this.setState({ password })}
        />
        <Button
            title="Signup"
            color="#53D"
            onPress={() => this.props.requestSignup(this.state.email, this.state.password)}
        />
      </View>
    );
  }

  render() {
    return (
      <View style={styles.fullPage}>
        { this.state.signup ? this.renderSignup() : this.renderLogin() }
        <Button
            title={this.state.signup ? 'Login' : 'Signup'}
            color="#58D"
            onPress={() => this.signup(!this.state.signup)}
        />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  fullPage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee'
  },
  loginContainter: {
    height: '38%',
    width: '90%',
    padding: 21,
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: '#fefefe'
  },
  input: {
    height: 34,
    padding: 5,
    fontSize: 21,
    borderColor: '#666',
    borderWidth: 1,
    backgroundColor: '#fff'
  },
  login: {
    fontSize: 13,
    color: '#444'
  }
});


const mapDispatch = dispatch => ({
  requestLogin: (email, password) => dispatch(authActionCreators.loginRequest({ email, password })),
  requestSignup: (email, password) => dispatch(authActionCreators.signupRequest({ email, password }))
});

export default connect(() => ({}), mapDispatch)(Login);
