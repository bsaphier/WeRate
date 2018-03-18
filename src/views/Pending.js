import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Button, View, Text } from 'react-native';
import { changeAppRoot } from '../state/App/action-creators';
import { LOGIN_ROOT } from '../state/App/types';


const SignupSuccess = (props) => (
  <View style={styles.container}>
    <Text>Thank You For Signing Up. You will receive an email when your account has been approved.</Text>
    <Button title="Back To Login" onPress={props.goToLoginScreen} />
  </View>
);


const mapState = () => ({});

const mapDispatch = dispatch => ({
  goToLoginScreen: () => dispatch(changeAppRoot(LOGIN_ROOT))
});


export default connect(mapState, mapDispatch)(SignupSuccess);


const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'center',
    backgroundColor: '#F0F0F0'
  }
});
