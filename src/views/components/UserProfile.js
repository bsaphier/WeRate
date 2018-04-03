import React from 'react';
import { View } from 'react-native';
import { reduxForm } from 'redux-form';
import EditableValue from './EditableValue';



// TODO: make a HOC to create UserProfile by passing the form name and the props for the fields, etc..

// If this component is imported (instead of the default export), it will not be registered as a form.
export const UserProfile = ({ user, canEdit = {}, handleToggleEditState = () => {} }) => {
  const { email, firstName, lastName, business, phone, website } = user;
  return (
    <View>
      <EditableValue
          name="firstName"
          label="First Name"
          value={firstName}
          canEdit={canEdit['firstName']}
          onToggleEditState={handleToggleEditState}
      />
      <EditableValue
          name="lastName"
          label="Last Name"
          value={lastName}
          canEdit={canEdit['lastName']}
          onToggleEditState={handleToggleEditState}
      />
      <EditableValue
          name="email"
          label="Email"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          canEdit={canEdit['email']}
          onToggleEditState={handleToggleEditState}
      />
      <EditableValue
          name="business"
          label="Business"
          value={business}
          canEdit={canEdit['business']}
          onToggleEditState={handleToggleEditState}
      />
      <EditableValue
          name="phone"
          label="Phone"
          keyboardType="number-pad"
          value={phone}
          canEdit={canEdit['phone']}
          onToggleEditState={handleToggleEditState}
      />
      <EditableValue
          name="website"
          label="Website"
          keyboardType="url"
          autoCapitalize="none"
          value={website}
          canEdit={canEdit['website']}
          onToggleEditState={handleToggleEditState}
      />
    </View>
  );
};


export default reduxForm({
  form: 'editUserProfileForm'
})(UserProfile);
