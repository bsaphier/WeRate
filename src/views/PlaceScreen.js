import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, StyleSheet } from 'react-native';



class PlaceScreen extends Component {
  static navigatorButtons = {
    rightButtons: [
      {
        title: 'edit',
        id: 'tab.place.event.edit'
      }
    ]
  }

  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
  }

  onNavigatorEvent = (event) => {
    if (event.type == 'NavBarButtonPress') {
      if (event.id == 'tab.place.event.edit') {
        this.showEditPlaceForm();
      }
    }
  }

  showEditPlaceForm = () => {
    const { place, navigator } = this.props;
    navigator.showModal({
      screen: 'werate.modal.place',
      title: 'Place Modal',
      passProps: { edit: true, place }
    });
  }
  
  render() {
    console.log('PlaceScreen', this.props);
    return (
      <View><Text>Place Screen</Text></View>
    );
  }
}


const mapState = ({ tags, reviews }) => ({
  tagsById: tags.byId,
  reviewsById: reviews.byId
});


export default connect(mapState)(PlaceScreen);


const styles = StyleSheet.create({
});
