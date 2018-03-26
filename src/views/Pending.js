import React from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { changeAppRoot } from '../state/App/action-creators';
import { LOGIN_ROOT } from '../state/App/types';
import { Btn, Txt } from './components';
import layoutStyles from './styles/layout';
import textStyles from './styles/text';


const SignupSuccess = (props) => (
  <View style={layoutStyles.container}>
    <View style={layoutStyles.contentContainer}>
      <Txt style={textStyles.title}>Thank You For Signing Up!</Txt>
      <Txt style={textStyles.subTitle}>Your info is being reviewed by an administator. An email will be sent to the address you provided when your account is approved.</Txt>
    </View>
    <View style={layoutStyles.buttonWrapper}>
      <Btn title="Back To Login" onPress={props.goToLoginScreen} />
    </View>
  </View>
);


const mapState = () => ({});

const mapDispatch = dispatch => ({
  goToLoginScreen: () => dispatch(changeAppRoot(LOGIN_ROOT))
});


export default connect(mapState, mapDispatch)(SignupSuccess);
