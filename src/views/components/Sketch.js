// @flow
import { connect } from 'react-redux';
import React, { Component } from 'react';
import firebase from 'react-native-firebase';
import { TouchableHighlight, View, Text, TextInput, Button, StyleSheet, FlatList } from 'react-native';
import { actionCreators as placesActionCreators } from '../../state/Places';
import type { placesTypes } from '../../state/Places';


let id = -1;
function createPlace(name = 'A Place'): placesTypes.Place {
  id++;
  return {
    id: `${id}`,
    createdBy: '',
    reviewIds: [],
    categoryIds: [],
    name,
    description: '',
    address: {}
  };
}

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


type sketchProps = { };
type sketchState = {
  textInput: string,
  loading: boolean,
  places: Array<any>
};

class Sketch extends Component<sketchProps, sketchState> {
  constructor(props) {
    super(props);
    this.state = {
      textInput: '',
      loading: true,
      places: [{ key: '0', doc: {}, name: 'filler'}]
    };
    this.ref = firebase.firestore().collection('places');
    this.unsubscribe = null;
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  onCollectionUpdate = (querySnapshot) => {
    const places = [];

    querySnapshot.forEach(doc => {
      const { name } = doc.data();

      places.push({
        key: doc.id,
        doc,
        name
      });
    });

    this.setState({
      places,
      loading: false
    });
  }

  updateTextInput(value) {
    this.setState({ textInput: value });
  }

  addPlace() {
    this.ref.add(createPlace(this.state.textInput))
      .then(docRef => {
        console.log('************', docRef.id);
        this.updateTextInput('');
      });
  }

  render() {
    // const { places, addPlace, removePlace } = this.props;
    if (this.state.loading) {
      return null;
    }

    return (
      <View style={styles.SketchContainter}>
        <Text style={styles.Sketch}>List of Places</Text>
        <FlatList
            data={this.state.places}
            renderItem={({ item }) => <Place name={item.name} />}
        />
        <TextInput
            placeholder={'Add A Place'}
            value={this.state.textInput}
            onChangeText={(text) => this.updateTextInput(text)}
        />
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
  PlaceWrap: {
    flex: 1,
    height: 48,
    flexDirection: 'row',
    alignItems: 'center'
  },
  PlaceTitle: { flex: 8 },
  PlaceText: { flex: 2 }
});


const mapState = ({ places, reviews, categories }) => ({
  places,
  reviews,
  categories
});

const mapDispatch = dispatch => ({
  addPlace: (place: placesTypes.Place) => dispatch(placesActionCreators.addPlace(place)),
  removePlace: (place: placesTypes.Place) => dispatch(placesActionCreators.removePlace(place))
});


export default connect(mapState, mapDispatch)(Sketch);
