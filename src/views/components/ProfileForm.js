// @flow
import React, { Component } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { TitledInput } from '../components';
import type { User } from '../../state/User/types';



class ProfileForm extends Component<profileFormProps, profileFormState> {
  state = {
    email: '',
    firstName: '',
    lastName: '',
    business: '',
    phone: '',
    website: ''
  };

  componentWillMount() {
    const { email, firstName, lastName, business, phone, website } = this.props.user;
    this.setState({ email, firstName, lastName, business, phone, website });
  }

  handleSubmitForm = async () => {
    const { user, handleSubmit } = this.props;
    try {
      await handleSubmit({ ...this.state, id: user.id });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      <View style={styles.containerStyle}>
        <TitledInput
            label='First Name'
            placeholder='First Name'
            value={this.state.firstName}
            onChangeText={firstName => this.setState({ firstName })}
        />
        <TitledInput
            label='Last Name'
            placeholder='Last Name'
            value={this.state.lastName}
            onChangeText={lastName => this.setState({ lastName })}
        />
        <TitledInput
            label='Email Address'
            placeholder='you@domain.com'
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
        />
        <TitledInput
            label='Website'
            placeholder='www.myWebsite.com'
            value={this.state.website}
            onChangeText={website => this.setState({ website })}
        />
        <TitledInput
            label='Business'
            placeholder={`Your business' name`}
            value={this.state.business}
            onChangeText={business => this.setState({ business })}
        />
        <TitledInput
            label='Phone'
            placeholder='111 123 4567'
            value={this.state.phone}
            onChangeText={phone => this.setState({ phone })}
        />
        <View style={styles.buttonWrapper}>
          <Button title="submit" onPress={this.handleSubmitForm} />
        </View>
      </View>
    );
  }
}

export default ProfileForm;


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


type profileFormProps = {
  user: User,
  editUser: any,
  handleSubmit: any
};

type profileFormState = {
  email: string,
  firstName: string,
  lastName: string,
  business: string,
  phone: string,
  website: string
};