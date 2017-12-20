import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Button, Picker, StyleSheet, TouchableHighlight } from 'react-native';
import { setPlaceFilterByTags } from '../state/App/action-creators';



class SearchDrawer extends Component {
  state = { selectedTag: '', selectedTags: [] }

  handlePickerChange = (itemValue) => {
    const { selectedTags } = this.state;
    this.setState({
      selectedTag: itemValue,
      selectedTags: selectedTags.indexOf(itemValue) >= 0 ? selectedTags : selectedTags.concat(itemValue)
    });
  }

  handleSubmit = () => {
    const { tagsById, navigator, onFilterPlaceByTag } = this.props;
    const tagsToSetFilterBy = this.state.selectedTags.map(tagId => tagsById[tagId]);
    onFilterPlaceByTag(tagsToSetFilterBy);
    navigator.toggleDrawer({ side: 'right' });
  }

  render() {
    const { tagsById, allTagIds, navigator } = this.props;
    return (
      <View style={styles.viewContainer}>

        <View style={styles.header}>
          <Button
              title="cancel"
              onPress={() => navigator.toggleDrawer({ side: 'right' })}
          />
          <Button
              title="clear"
              onPress={() => this.setState({ selectedTags: [] })}
          />
        </View>

        <View style={styles.tagsContainer}>
          {
            this.state.selectedTags.map(tagId => (
              <View key={`tag_${tagId}`} style={styles.tagContainer}>
                <TouchableHighlight
                    style={styles.tagCloseBtn}
                    onPress={() => this.setState({ selectedTags: this.state.selectedTags.filter(selectedTagId => selectedTagId != tagId) })}
                >
                  <Text>{tagsById[tagId].title}</Text>
                </TouchableHighlight>
              </View>
            ))
          }
        </View>

        <View style={styles.contentContainer}>
          <Picker selectedValue={this.state.selectedTag} onValueChange={this.handlePickerChange}>
            {
              allTagIds.map(tagId => (
                <Picker.Item
                    key={`picker_${tagId}`}
                    value={tagId}
                    label={tagsById[tagId].title}
                />
              ))
            }
          </Picker>
          <Text>select categories to view</Text>
        </View>

        <View style={styles.foot}>
          <Button
              title="submit"
              onPress={() => this.handleSubmit()}
          />
        </View>

      </View>
    );
  }
}



const mapState = (state) => ({
  tagsById: state.tags.byId,
  allTagIds: state.tags.allIds
});


const mapDispatch = dispatch => ({
  onFilterPlaceByTag: (tags, order) => dispatch(setPlaceFilterByTags(tags, order))
});


export default connect(mapState, mapDispatch)(SearchDrawer);


const styles = StyleSheet.create({
  viewContainer: {
    height: '100%'
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 26,
    width: '100%'
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'flex-start'
  },
  tagsContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 5
  },
  tagContainer: {
    flexDirection: 'row'
  },
  tagCloseBtn: {
    margin: 3,
    padding: 5,
    borderRadius: 2
  },
  foot: {
    width: '100%',
    borderTopWidth: 1,
    borderColor: '#D4D4D4'
  }
});
