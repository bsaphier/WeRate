// @flow
import React, { Component } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { actionCreators as authActionCreators } from '../../state/Auth';
type sketchProps = {
  requestLogin: any
};
type sketchState = {
  email: string,
  password: string
};



class Login extends Component<sketchProps, sketchState> {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '' };
  }

  render() {
    return (
      <View style={styles.fullPage}>
        <View style={styles.loginContainter}>
          <Text style={styles.login}>Email:</Text>
          <TextInput
              style={styles.input}
              value={this.state.email}
              placeholder="Email"
              keyboardType="email-address"
              clearButtonMode="unless-editing"
              onChangeText={(email) => this.setState({email})}
          />
          <Text style={styles.login}>Password:</Text>
          <TextInput
              style={styles.input}
              secureTextEntry
              selectTextOnFocus
              placeholder="Password"
              value={this.state.password}
              onChangeText={(password) => this.setState({password})}
          />
          <Button
              style={styles.button}
              title="Login"
              color="#98F"
              onPress={() => this.props.requestLogin(this.state.email, this.state.password)}
          />
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  fullPage: {
    height: '100%',
    display: 'flex',
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
  },
  button: {
    backgroundColor: '#cFF'
  }
});


const mapDispatch = dispatch => ({
  requestLogin: (email, password) => dispatch(authActionCreators.loginRequest({ email, password }))
});

export default connect(() => ({}), mapDispatch)(Login);
