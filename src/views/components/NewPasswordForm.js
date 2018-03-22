import React from 'react';
import { reduxForm } from 'redux-form';
import { View, Text } from 'react-native';
import { Txt, Btn, Spinner, FormField } from '../components';
import styles from '../styles/forms';



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
    {err ? (<Txt><Text style={styles.errorTextStyle}>{err}</Text></Txt>) : null}
    {isLoading ? <Spinner /> : <Btn title="Continue" onPress={() => handleSubmit(values)} />}
  </View>
);


export default reduxForm({
  form: 'newPasswordForm'
})(NewPasswordForm);
