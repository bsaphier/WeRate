import React from 'react';
import { View } from 'react-native';
import LabeledValue from './LabeledValue';
import styles from '../styles/layout';


const UserProfile = ({ user }) => {
  const { email, firstName, lastName, business, phone, website } = user;
  return (
    <View style={styles.contentContainer}>
      <LabeledValue label="First Name" value={firstName} />
      <LabeledValue label="Last Name" value={lastName} />
      <LabeledValue label="Email" value={email} />
      <LabeledValue label="Business" value={business} />
      <LabeledValue label="Phone" value={phone} />
      <LabeledValue label="Website" value={website} />
    </View>
  );
};

export default UserProfile;
