import React from 'react';
import { reduxForm } from 'redux-form';
import { View, Text } from 'react-native';
import { Btn, Spinner, FormField } from '../components';
import styles from '../styles/forms';



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
    {isLoading ? <Spinner /> : <Btn title="Sign In" onPress={() => handleSubmit(values)} />}
  </View>
);


export default reduxForm({
  form: 'loginForm'
})(LoginForm);
