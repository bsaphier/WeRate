import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Button, Picker, TextInput, StyleSheet } from 'react-native';
import { setPlaceFilterTags, setPlaceFilterSearchString, filterPlacesByTags, filterPlacesByName } from '../state/Filter/action-creators';
import { ActionTag } from './components';
import { FILTER_PLACES_BY_NAME, FILTER_PLACES_BY_TAGS, FILTER_PLACES_SHOW_ALL } from '../state/Filter/types';



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
    const { searchBy, tagsById, setPlaceFilterByName, onFilterPlaceByTag, onFilterPlaceByName } = this.props;
    if (searchBy === FILTER_PLACES_BY_TAGS) {
      const tagsToSetFilterBy = this.state.selectedTags.map(tagId => tagsById[tagId]);
      onFilterPlaceByTag(tagsToSetFilterBy);
    }
    if (searchBy === FILTER_PLACES_BY_NAME) {
      onFilterPlaceByName(input);
    }
    if (searchBy === FILTER_PLACES_SHOW_ALL) {
      setPlaceFilterByName();
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
      <View style={styles.contentContainer}>
        <View style={styles.pickerHeader}>
          <Text style={styles.pickerHeaderText}>Select Categories To View</Text>
          <View style={styles.pickerBtnWrap}><Button title="clear" onPress={() => this.setState({ selectedTags: [] })} /></View>
        </View>
        <View style={styles.pickerTagsContainer}>
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
        <Picker selectedValue={this.state.selectedTag} onValueChange={this.handlePickerChange}>
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
      <View style={styles.contentContainer}>
        <TextInput style={styles.textInput} placeholder="Name of Business" onChangeText={(input) => this.setState({input})} />
      </View>
    );
  }

  renderSearch() {
    const { searchBy } = this.props;
    switch (searchBy) {
      case FILTER_PLACES_BY_TAGS:
        return this.renderSearchByTags(); 
      case FILTER_PLACES_BY_NAME:
        return this.renderSerarchByName();   
      default:
        return this.renderSerarchByName();
    }
  }

  render() {
    const { navigator, setPlaceFilterByTag, setPlaceFilterByName } = this.props;
    return (
      <View style={styles.viewContainer}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Search by: </Text>
          <Button title="Tags" onPress={setPlaceFilterByTag} />
          <Button title="Name" onPress={setPlaceFilterByName} />
        </View>
        { this.renderSearch() }
        <View style={styles.foot}>
          <Button title="cancel" onPress={() => navigator.dismissModal()} />
          <Button title="search" onPress={() => this.handleSubmit()} />
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
  setPlaceFilterByTag: () => dispatch(filterPlacesByTags()),
  setPlaceFilterByName: () => dispatch(filterPlacesByName()), 
  onFilterPlaceByTag: (tags) => dispatch(setPlaceFilterTags(tags)),
  onFilterPlaceByName: (name) => (dispatch(setPlaceFilterSearchString(name)))
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
    paddingTop: 5,
    width: '100%',
    backgroundColor: '#FFF',
  },
  headerText: {
    fontSize: 17,
    alignSelf: 'center'
  },
  contentContainer: {
    flex: 1,
    width: '100%',
    borderBottomWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#fefefe'
  },
  pickerHeader: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    backgroundColor: '#f0f0f0',
  },
  pickerHeaderText: {
    flex: 1,
    fontSize: 17,
    alignSelf: 'center'
  },
  pickerBtnWrap: {
    justifyContent: 'flex-end'
  },
  foot: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: '#FFF',
  },
  pickerTagsContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginVertical: 5
  },
  textInput: {
    paddingRight: 5,
    paddingLeft: 5,
    paddingBottom: 2,
    color: '#262626',
    backgroundColor: '#f0f0f0',
    fontSize: 18,
    fontWeight: '200',
    height: 40,
    width: '100%'
  }
});
