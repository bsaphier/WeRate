// @flow
import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { TitledInput, Spinner } from '../components';



class SignupForm extends Component<signupFormProps, signupFormState> {
  state = {
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    business: '',
    phone: '',
    website: ''
  };

  renderButtonOrSpinner() {
    const { signup, isLoading } = this.props;
    return isLoading ? <Spinner /> : <Button onPress={() => signup(this.state)} title="Sign Up" />;
  }

  render() {
    return (
      <View style={styles.container}>
        <TitledInput
            label='First Name'
            placeholder='First Name'
            value={this.state.firstName}
            onChangeText={firstName => this.setState({ firstName })}
        />
        <TitledInput
            label='Last Name'
            placeholder='Last Name'
            value={this.state.lastName}
            onChangeText={lastName => this.setState({ lastName })}
        />
        <TitledInput
            label='Email Address'
            placeholder='you@domain.com'
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
        />
        <TitledInput
            label='Website'
            placeholder='www.myWebsite.com'
            value={this.state.website}
            onChangeText={website => this.setState({ website })}
        />
        <TitledInput
            label='Business'
            placeholder={`Your business' name`}
            value={this.state.business}
            onChangeText={business => this.setState({ business })}
        />
        <TitledInput
            label='Phone'
            placeholder='111 123 4567'
            value={this.state.phone}
            onChangeText={phone => this.setState({ phone })}
        />
        <TitledInput
            label='Password'
            autoCorrect={false}
            placeholder='*******'
            secureTextEntry
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
        />
        <TitledInput
            label='Confirm Password'
            autoCorrect={false}
            placeholder='*******'
            secureTextEntry
            value={this.state.confirmPassword}
            onChangeText={confirmPassword => this.setState({ confirmPassword })}
        />
        {this.props.err ? <Text style={styles.errorTextStyle}>{this.props.err}</Text> : null}
        {this.renderButtonOrSpinner()}
      </View>
    );
  }
}


export default SignupForm;


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


type signupFormProps = {
  err: any,
  signup: any,
  isLoading: boolean
};

type signupFormState = {
  email: string,
  password: string,
  confirmPassword: string,
  firstName: string,
  lastName: string,
  business: string,
  phone: string,
  website: string
};