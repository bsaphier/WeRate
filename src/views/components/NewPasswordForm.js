import React from 'react';
import { reduxForm } from 'redux-form';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Spinner, FormField } from '../components';



const NewPasswordForm = ({ err, values, isLoading, handleSubmit }) => (
  <View>
    <FormField
        name="password"
        label="Password"
        placeholder="*******"
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry
    />
    <FormField
        name="confirmPassword"
        label="ConfirmPassword"
        placeholder="*******"
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry
    />
    {err ? <Text style={styles.errorTextStyle}>{err}</Text> : null}
    {isLoading ? <Spinner /> : <Button title="Continue" onPress={() => handleSubmit(values)} />}
  </View>
);


export default reduxForm({
  form: 'newPasswordForm'
})(NewPasswordForm);


const styles = StyleSheet.create({
  errorTextStyle: {
    color: '#E64A19',
    alignSelf: 'center',
    paddingTop: 10,
    paddingBottom: 10
  }
});
