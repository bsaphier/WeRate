import React from 'react';
import { reduxForm } from 'redux-form';
import { View } from 'react-native';
import { FormField } from '../components';



const NewPasswordForm = () => (
  <View>
    <FormField
        name="password"
        label="New Password"
        placeholder="*******"
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry
    />
    <FormField
        name="confirmPassword"
        label="Confirm New Password"
        placeholder="*******"
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry
    />
  </View>
);


export default reduxForm({
  form: 'newPasswordForm'
})(NewPasswordForm);
