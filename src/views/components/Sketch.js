// @flow
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { TouchableHighlight, View, Text, StyleSheet, FlatList } from 'react-native';
import type { tagsTypes } from '../../state/Tags';
import type { placesTypes } from '../../state/Places';
import type { reviewsTypes } from '../../state/Reviews';
type sketchProps = {
  tags: any,
  places: any,
  reviews: any
};
type sketchState = {
  name: string,
  description: string
};



class Sketch extends Component<sketchProps, sketchState> {
  render() {
    const { tags, places, reviews } = this.props;
    return (
      <View style={styles.SketchContainter}>
        <Text style={styles.Sketch}>List of Places</Text>
        <FlatList
            data={places.allIds.map(id => ({ key: id, id }))}
            renderItem={({ item }) => {
              const place: placesTypes.Place = places.byId[item.id];
              return (
                <TouchableHighlight underlayColor="#CDF" onPress={() => { }}>
                  <View style={styles.PlaceWrap}>
                    <View style={styles.PlaceTitle}>
                      <Text>{place.name}</Text>
                      <Text>{place.description}</Text>
                    </View>
                  </View>
                </TouchableHighlight>
              );
            }}
        />
        <Text style={styles.Sketch}>List of Tags</Text>
        <FlatList
            data={tags.allIds.map(id => ({ key: id, id }))}
            renderItem={({ item }) => {
              const tag: tagsTypes.Place = tags.byId[item.id];
              return (
                <TouchableHighlight underlayColor="#CDF" onPress={() => { }}>
                  <View style={styles.PlaceWrap}>
                    <View style={styles.PlaceTitle}>
                      <Text>{tag.title}</Text>
                    </View>
                  </View>
                </TouchableHighlight>
              );
            }}
        />
        <Text style={styles.Sketch}>List of Reviews</Text>
        <FlatList
            data={reviews.allIds.map(id => ({ key: id, id }))}
            renderItem={({ item }) => {
              const review: reviewsTypes.Place = reviews.byId[item.id];
              return (
                <TouchableHighlight underlayColor="#CDF" onPress={() => { }}>
                  <View style={styles.PlaceWrap}>
                    <View style={styles.PlaceTitle}>
                      <Text>{review.rating}</Text>
                      <Text>{review.comment}</Text>
                    </View>
                  </View>
                </TouchableHighlight>
              );
            }}
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
    height: 34,
    flexDirection: 'row',
    alignItems: 'center'
  },
  PlaceTitle: {
    flex: 8,
    padding: 2,
    flexDirection: 'column'
  }
});


const mapState = ({ tags, places, reviews }) => ({ tags, places, reviews });


export default connect(mapState)(Sketch);
