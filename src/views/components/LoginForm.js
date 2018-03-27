import React from 'react';
import { View } from 'react-native';
import { reduxForm } from 'redux-form';
import { FormField } from '../components';



const LoginForm = () => (
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
  </View>
);


export default reduxForm({
  form: 'loginForm'
})(LoginForm);
