import React from 'react';
import { reduxForm } from 'redux-form';
import { View } from 'react-native';
import { FormField, Txt } from '../components';
import styles from '../styles/forms';



const LoginForm = ({ err }) => (
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
    {err ? (<Txt style={styles.errorTextStyle}>{ err }</Txt>) : null}
  </View>
);


export default reduxForm({
  form: 'loginForm'
})(LoginForm);
