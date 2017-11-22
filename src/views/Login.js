// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import { LoginForm } from './components';
import { login } from '../state/App/action-creators';
// import { checkAuth } from '../state/Auth/action-creators';




class Login extends Component<sketchProps> {

  // componentDidMount() {
  //   this.props.checkAuth();
  // }

  render() {
    return (
      <View style={styles.container}>
        <LoginForm
            err={this.props.err}
            login={this.props.login}
            isLoading={this.props.isLoading}
        />
      </View>
    );
  }
}


const mapState = ({ auth }) => ({
  err: auth.err,
  isLoading: auth.isLoading
});

const mapDispatch = dispatch => ({
  // checkAuth: () => dispatch(checkAuth()),
  login: (email, password) => dispatch(login({ email, password }))
});


export default connect(mapState, mapDispatch)(Login);


const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'center',
    backgroundColor: '#F0F0F0'
  }
});


type sketchProps = {
  err: any,
  login: any,
  isLoading: boolean
};
