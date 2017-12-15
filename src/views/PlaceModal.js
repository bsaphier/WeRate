import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, StyleSheet, View } from 'react-native';
import { PlaceForm } from './components';



class PlaceModal extends Component {
  static navigatorButtons = {
    rightButtons: [
      {
        title: 'cancel',
        id: 'modal.place.event.cancel'
      }
    ]
  }

  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
  }

  onNavigatorEvent = (event) => {
    if (event.type == 'NavBarButtonPress') {
      if (event.id == 'modal.place.event.cancel') {
        this.handleCancel();
      }
    }
  }

  handleCancel = () => {
    this.props.navigator.dismissModal();
  }

  handleSubmit = () => {
    this.props.navigator.dismissModal();
  }

  render() {
    const { edit, place } = this.props;
    return (
      <View style={styles.container}>
          <PlaceForm
              edit={edit}
              place={place}
              handleSubmit={this.handleSubmit}
          />
      </View>
    );
  }
}


export default connect()(PlaceModal);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  }
});
