import React from 'react';
import { reduxForm } from 'redux-form';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Spinner, FormField } from '../components';



const NewPasswordForm = ({ err, values, isLoading, handleSubmit }) => (
  <View style={styles.container}>
    <FormField
        name="password"
        label="Password"
        placeholder="*******"
        autoCorrect={false}
        secureTextEntry
    />
    <FormField
        name="confirmPassword"
        label="ConfirmPassword"
        placeholder="*******"
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
