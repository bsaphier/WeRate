import React from 'react';
import { reduxForm } from 'redux-form';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Spinner, FormField } from '../components';



const LoginForm = ({ err, values, isLoading, handleSubmit }) => (
  <View>
    <FormField
        name="email"
        label="Email Address"
        placeholder="you@domain.com"
        autoCorrect={false}
        autoCapitalize="none"
        keyboardType="email-address"
    />
    <FormField
        name="password"
        label="Password"
        placeholder="*******"
        autoCorrect={false}
        autoCapitalize="none"
        secureTextEntry
    />
    {err ? <Text style={styles.errorTextStyle}>{err}</Text> : null}
    {isLoading ? <Spinner /> : <Button title="Sign In" onPress={() => handleSubmit(values)} />}
  </View>
);


export default reduxForm({
  form: 'loginForm'
})(LoginForm);


const styles = StyleSheet.create({
  errorTextStyle: {
    color: '#E64A19',
    alignSelf: 'center',
    paddingTop: 10,
    paddingBottom: 10
  }
});
