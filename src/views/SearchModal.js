import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Button, Picker, TextInput, StyleSheet } from 'react-native';
import { setPlaceFilterByTags, setPlaceFilterSearchString, filterPlacesByName } from '../state/Filter/action-creators';
import { ActionTag } from './components';
import { FILTER_PLACES_BY_NAME, FILTER_PLACES_BY_TAGS } from '../state/Filter/types';



class SearchModal extends Component {
  state = {
    input: '',
    selectedTag: '',
    selectedTags: []
  }

  handlePickerChange = (itemValue) => {
    const { selectedTags } = this.state;
    this.setState({
      selectedTag: itemValue,
      selectedTags: selectedTags.indexOf(itemValue) >= 0 ? selectedTags : selectedTags.concat(itemValue)
    });
  }

  handleSubmit = () => {
    const { input } = this.state;
    const { searchBy, tagsById, onFilterPlaceByTag, onFilterPlaceByName } = this.props;
    if (searchBy === FILTER_PLACES_BY_TAGS) {
      const tagsToSetFilterBy = this.state.selectedTags.map(tagId => tagsById[tagId]);
      onFilterPlaceByTag(tagsToSetFilterBy);
    }
    if (searchBy === FILTER_PLACES_BY_NAME) {
      onFilterPlaceByName(input);
    }
    this.props.navigator.dismissModal();
  }

  handleRemoveSelectedTag = (tagId) => {
    this.setState({
      selectedTags: this.state.selectedTags.filter(selectedTagId => selectedTagId != tagId)
    });
  }

  renderSearchByTags() {
    const { tagsById, allTagIds } = this.props;
    return (
      <View style={styles.picker}>
        <Text>select categories to view</Text>
        <Picker style={styles.picker} selectedValue={this.state.selectedTag} onValueChange={this.handlePickerChange}>
          {
            allTagIds.map(tagId => (
              <Picker.Item key={`picker_${tagId}`} value={tagId} label={tagsById[tagId].title} />
            ))
          }
        </Picker>
      </View>
    );
  }

  renderSerarchByName() {
    return (
      <View>
        <TextInput style={styles.textInput} onChangeText={(input) => this.setState({input})} />
      </View>
    );
  }

  renderSearch() {
    const { searchBy } = this.props;
    switch (searchBy) {
      case ('tags'):
        return this.renderSearchByTags(); 
      case('name'):
        return this.renderSerarchByName();   
      default:
        break;
    }
  }

  render() {
    const { searchBy } = this.state;
    const { tagsById, navigator } = this.props;
    return (
      <View style={styles.viewContainer}>
        <View style={styles.header}>
          <Button title="clear" onPress={() => this.setState({ selectedTags: [] })} />
        </View>

        <View style={styles.tagsContainer}>
          {
            this.state.selectedTags.map(tagId => (
              <ActionTag
                  key={`tag_${tagId}`}
                  label={tagsById[tagId].title}
                  action={() => this.handleRemoveSelectedTag(tagId)}
              />
            ))
          }
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.foot}>
            <Button title="cancel" onPress={() => navigator.dismissModal()} />
            <Button title="search" onPress={() => this.handleSubmit()} />
          </View>
          {this.renderSearch(searchBy)}
        </View>
      </View>
    );
  }
}



const mapState = (state) => ({
  searchBy: state.filter.visibility,
  tagsById: state.tags.byId,
  allTagIds: state.tags.allIds
});


const mapDispatch = dispatch => ({
  setPlaceFilter: () => dispatch(filterPlacesByName()), 
  onFilterPlaceByName: (name) => (dispatch(setPlaceFilterSearchString(name))),
  onFilterPlaceByTag: (tags, order) => dispatch(setPlaceFilterByTags(tags, order))
});


export default connect(mapState, mapDispatch)(SearchModal);


const styles = StyleSheet.create({
  viewContainer: {
    height: '100%',
    backgroundColor: '#EEE'
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingTop: 26,
    width: '100%',
    height: 63.5,
    backgroundColor: '#FFF',
    shadowColor: '#ddd',
    shadowOpacity: 1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 }
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  picker: {
    backgroundColor: '#FCFCFC'
  },
  tagsContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginVertical: 5
  },
  foot: {
    zIndex: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
    borderBottomWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#fefefe',
    shadowColor: '#eee',
    // shadowOpacity: 1,
    // shadowRadius: 10,
    // shadowOffset: { width: 0, height: 15 }
  },
  textInput: {
    paddingRight: 5,
    paddingLeft: 5,
    paddingBottom: 2,
    color: '#262626',
    fontSize: 18,
    fontWeight: '200',
    flex: 1,
    height: 40,
    width: '100%'
  }
});
