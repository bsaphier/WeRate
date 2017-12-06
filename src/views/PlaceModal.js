import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, StyleSheet, Text, View } from 'react-native';
import { PlaceForm } from './components';



class PlaceModal extends Component {

  handleCancel = () => {
    this.props.navigator.dismissModal();
  }

  handleSubmit = () => {
    this.props.navigator.dismissModal();
  }

  render() {
    return (
      <View style={styles.container}>
          <Text style={styles.welcome}>Place Modal</Text>
          <Button title="cancel" onPress={this.handleCancel} />
          <PlaceForm handleSubmit={this.handleSubmit} />
      </View>
    );
  }
}


export default connect()(PlaceModal);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});
