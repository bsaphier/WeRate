import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { FormField } from '../components';



const ProfileForm = () => (
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
        keyboardType="email-address"
        placeholder="you@domain.com"
    />
    <FormField
        name="website"
        label="Website"
        keyboardType="url"
        autoCapitalize="none"
        placeholder="www.myWebsite.com"
    />
    <FormField
        name="business"
        label="Business"
        placeholder="Your business' name"
    />
    <FormField
        name="phone"
        label="Phone"
        keyboardType="number-pad"
        placeholder="111 123 4567"
    />
  </View>
);


const mapState = (state, { user }) => ({
  initialValues: {
    email: user.email,
    phone: user.phone,
    website: user.website,
    business: user.business,
    lastName: user.lastName,
    firstName: user.firstName
  },
});


export default connect(mapState)(reduxForm({
  form: 'profileForm'
})(ProfileForm));
