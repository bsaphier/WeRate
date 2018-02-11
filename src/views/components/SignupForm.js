import React from 'react';
import { reduxForm } from 'redux-form';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Spinner } from '../components';
import { FormField } from '../components';



const SignupForm = ({ err, values, isLoading, handleSubmit }) => (
  <View style={styles.container}>
    <FormField
        name="firstName"
        label="First Name"
        placeholder="First Name"
    />
    <FormField
        name="lastName"
        label="Last Name"
        placeholder="Last Name"
    />
    <FormField
        name="email"
        label="Email Address"
        placeholder="you@domain.com"
    />
    <FormField
        name="confirmEmail"
        label="Confirm Email"
        autoCorrect={false}
        placeholder="you@domain.com"
    />
    <FormField
        name="website"
        label="Website"
        placeholder="www.myWebsite.com"
    />
    <FormField
        name="business"
        label="Business"
        placeholder={`Your business' name`}
    />
    <FormField
        name="phone"
        label="Phone"
        placeholder="111 123 4567"
    />
{/*
    <FormField
        name="password"
        label="Password"
        autoCorrect={false}
        placeholder="*******"
        secureTextEntry
    />
    <FormField
        name="confirmPassword"
        label="Confirm Password"
        autoCorrect={false}
        placeholder="*******"
        secureTextEntry
    />
*/}
    {err ? <Text style={styles.errorTextStyle}>{err}</Text> : null}
    {isLoading ? <Spinner /> : <Button onPress={() => handleSubmit(values)} title="Sign Up" />}
  </View>
);


export default reduxForm({
  form: 'signupForm'
})(SignupForm);


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
