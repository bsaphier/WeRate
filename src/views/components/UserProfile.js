import React from 'react';
import { View } from 'react-native';
import { reduxForm } from 'redux-form';
import EditableValue from './EditableValue';



// TODO: make a HOC to create UserProfile by passing the form name and the props for the fields, etc..

const UserProfile = ({ user, canEdit, handleToggleEditState }) => {
  const { email, firstName, lastName, business, phone, website } = user;
  return (
    <View>
      <EditableValue
          name="firstName"
          label="First Name"
          value={firstName}
          canEdit={canEdit['firstName']}
          onToggleEditState={() => handleToggleEditState('firstName')}
      />
      <EditableValue
          name="lastName"
          label="Last Name"
          value={lastName}
          canEdit={canEdit['lastName']}
          onToggleEditState={() => handleToggleEditState('lastName')}
      />
      <EditableValue
          name="email"
          label="Email"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          canEdit={canEdit['email']}
          onToggleEditState={() => handleToggleEditState('email')}
      />
      <EditableValue
          name="business"
          label="Business"
          value={business}
          canEdit={canEdit['business']}
          onToggleEditState={() => handleToggleEditState('business')}
      />
      <EditableValue
          name="phone"
          label="Phone"
          keyboardType="number-pad"
          value={phone}
          canEdit={canEdit['phone']}
          onToggleEditState={() => handleToggleEditState('phone')}
      />
      <EditableValue
          name="website"
          label="Website"
          keyboardType="url"
          autoCapitalize="none"
          value={website}
          canEdit={canEdit['website']}
          onToggleEditState={() => handleToggleEditState('website')}
      />
    </View>
  );
};


export default reduxForm({
  form: 'editUserProfileForm'
})(UserProfile);
