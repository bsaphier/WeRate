// @flow
import React, { Component } from 'react';
import { View, Text,Button, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { TitledInput, Spinner } from '../components';
import { actionCreators as authActionCreators } from '../../state/Auth';



class Login extends Component<sketchProps, sketchState> {
  state = { email: '', password: '', loading: false };

  renderButtonOrSpinner() {
    const { email, password, loading } = this.state;
    if (loading) {
      return <Spinner />;
    }
    return <Button onPress={() => this.props.requestLogin(email, password)} title="Log in" />;
  }

  render() {
    return (
      <View>
        <TitledInput
            label='Email Address'
            placeholder='you@domain.com'
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
        />
        <TitledInput
            label='Password'
            autoCorrect={false}
            placeholder='*******'
            secureTextEntry
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
        />
        <Text style={styles.errorTextStyle}>{this.props.err}</Text>
        { this.renderButtonOrSpinner() }
      </View>
    );
  }
}


const styles = StyleSheet.create({
  errorTextStyle: {
    color: '#E64A19',
    alignSelf: 'center',
    paddingTop: 10,
    paddingBottom: 10
  }
});


const mapState = ({ auth }) => ({
  err: auth.err
});

const mapDispatch = dispatch => ({
  requestLogin: (email, password) => dispatch(authActionCreators.loginRequest({ email, password })),
  requestSignup: (email, password) => dispatch(authActionCreators.signupRequest({ email, password }))
});

export default connect(mapState, mapDispatch)(Login);


type sketchProps = {
  err: any;
  requestLogin: any;
  requestSignup: any;
};

type sketchState = {
  loading: boolean;
  email: string;
  password: string;
};