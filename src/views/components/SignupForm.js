import React from 'react';
import { reduxForm } from 'redux-form';
import { View } from 'react-native';
import { FormField } from '../components';



const SignupForm = () => (
  <View>
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
        autoCapitalize="none"
        keyboardType="email-address"
        placeholder="you@domain.com"
    />
    <FormField
        name="confirmEmail"
        label="Confirm Email"
        autoCorrect={false}
        autoCapitalize="none"
        keyboardType="email-address"
        placeholder="you@domain.com"
    />
    <FormField
        name="website"
        label="Website"
        autoCapitalize="none"
        keyboardType="url"
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
        keyboardType="number-pad"
        placeholder="111 123 4567"
    />
  </View>
);


export default reduxForm({
  form: 'signupForm'
})(SignupForm);
