import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import { PlaceForm } from './components';
import { editPlace, createPlace } from '../state/Places/action-creators';



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

  handleSubmit = async (values) => {
    const { edit, place, editPlace, createPlace, navigator } = this.props;
    try {
      if (edit && place) {
        await editPlace({ ...values, id: place.id });
      } else {
        await createPlace(values);
      }
    } catch (err) {
      console.log(err);
    }
    navigator.dismissModal();
  }

  render() {
    return (
      <View style={styles.container}>
        <PlaceForm
            edit={this.props.edit}
            place={this.props.place}
            onSubmit={this.handleSubmit}
        />
      </View>
    );
  }
}


const mapDispatch = dispatch => ({
  editPlace: async place => await dispatch(editPlace(place)),
  createPlace: async place => await dispatch(createPlace(place))
});


export default connect(null, mapDispatch)(PlaceModal);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  }
});
