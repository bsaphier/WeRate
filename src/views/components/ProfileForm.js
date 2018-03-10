import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { View, Button, StyleSheet } from 'react-native';
import { FormField } from '../components';



const ProfileForm = ({ values, handleSubmit }) => (
  <View style={styles.containerStyle}>
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
    <View style={styles.buttonWrapper}>
      <Button title="submit" onPress={() => handleSubmit(values)} />
    </View>
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


const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%',
  },
  buttonWrapper: {
    width: '100%',
    alignItems: 'center'
  },
});
