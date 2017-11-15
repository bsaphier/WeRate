// @flow
import { connect } from 'react-redux';
import React, { Component } from 'react';
import firebase from 'react-native-firebase';
import { TouchableHighlight, View, Text, TextInput, Button, StyleSheet, FlatList } from 'react-native';
import { actionCreators as placesActionCreators } from '../../state/Places';
import type { placesTypes } from '../../state/Places';
import { createPlace } from '../../data/firestore-actions';


const Place = ({ name }) => (
  <TouchableHighlight onPress={() => { }}>
    <View style={styles.PlaceWrap}>
      <View style={styles.PlaceTitle}>
        <Text>{name}</Text>
      </View>
      <View style={styles.PlaceText}>
        <Text>FILLER</Text>
      </View>
    </View>
  </TouchableHighlight>
);


type sketchProps = {
  places: any,
  createPlace: any,
  removePlace: any
};
type sketchState = {
  textInput: string,
  loading: boolean
};

class Sketch extends Component<sketchProps, sketchState> {
  constructor(props) {
    super(props);
    this.state = {
      textInput: '',
      loading: true
    };
    // this.ref = firebase.firestore().collection('places');
    // this.unsubscribe = null;
  }

  componentDidMount() {
    // this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  componentWillUnmount() {
    // this.unsubscribe();
  }

  // onCollectionUpdate = (querySnapshot) => {
    // const places = [];
    // querySnapshot.forEach(doc => {
    //   const { name } = doc.data();
    //   places.push({
    //     key: doc.id,
    //     doc,
    //     name
    //   });
    // });
  //   this.setState({
  //     loading: false
  //   });
  // }

  updateTextInput(value) {
    this.setState({ textInput: value });
  }

  addPlace() {
    this.props.createPlace({ name: this.state.textInput })
      .then(ref => {
        this.updateTextInput('');
      });
  }

  render() {
    // if (this.state.loading) {
    //   return null;
    // }

    return (
      <View style={styles.SketchContainter}>
        <Text style={styles.Sketch}>List of Places</Text>
        <FlatList
            data={this.props.places.allIds.map(id => ({key: id, id}))}
            renderItem={({ item }) => <Place name={this.props.places.byId[item.id].name} />}
        />
        <View style={styles.InputWrap}>
          <TextInput
              style={styles.Input}
              placeholder={'Add A Place'}
              value={this.state.textInput}
              onChangeText={(text) => this.updateTextInput(text)}
          />
        </View>
        <Button
            title={'Add Place'}
            disabled={!this.state.textInput.length}
            onPress={() => this.addPlace()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  SketchContainter: {},
  Sketch: {
    fontWeight: 'bold',
    fontSize: 21,
    color: '#666'
  },
  InputWrap: {
    display: 'flex',
    alignItems: 'center'
  },
  Input: {
    fontWeight: 'bold',
    fontSize: 21,
    color: '#69F',
    margin: 5
  },
  PlaceWrap: {
    flex: 1,
    height: 48,
    flexDirection: 'row',
    alignItems: 'center'
  },
  PlaceTitle: { flex: 8 },
  PlaceText: { flex: 2 }
});


const mapState = ({ tags, places, reviews }) => ({
  tags,
  places,
  reviews
});

const mapDispatch = dispatch => ({
  createPlace: (place: placesTypes.Place) => dispatch(createPlace(place, placesActionCreators.addPlace)),
  removePlace: (place: placesTypes.Place) => dispatch(placesActionCreators.removePlace(place))
});


export default connect(mapState, mapDispatch)(Sketch);
