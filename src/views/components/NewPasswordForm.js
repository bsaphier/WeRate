import React from 'react';
import { reduxForm } from 'redux-form';
import { View } from 'react-native';
import { Txt, FormField } from '../components';
import styles from '../styles/forms';



const NewPasswordForm = ({ err }) => (
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
    {err ? (<Txt style={styles.errorTextStyle}>{ err }</Txt>) : null}
    {/* isLoading ? <Spinner /> : <Btn title="Continue" onPress={() => handleSubmit(values)} /> */}
  </View>
);


export default reduxForm({
  form: 'newPasswordForm'
})(NewPasswordForm);
