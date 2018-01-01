// @flow
import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { TitledInput, Spinner } from '../components';



class LoginForm extends Component<loginFormProps, loginFormState> {
  state = { email: '', password: '' };

  renderButtonOrSpinner() {
    const { email, password } = this.state;
    const { login, isLoading } = this.props;
    return isLoading ? <Spinner /> : <Button onPress={() => login(email, password)} title="Log in" />;
  }

  render() {
    return (
      <View style={styles.container}>
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
        {this.props.err ? <Text style={styles.errorTextStyle}>{this.props.err}</Text> : null}
        {this.renderButtonOrSpinner()}
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingRight: 20,
    paddingLeft: 20,
    backgroundColor: '#FFF'
  },
  errorTextStyle: {
    color: '#E64A19',
    alignSelf: 'center',
    paddingTop: 10,
    paddingBottom: 10
  }
});


export default LoginForm;


type loginFormProps = {
  err: any,
  login: any,
  isLoading: boolean
};

type loginFormState = {
  email: string,
  password: string
};