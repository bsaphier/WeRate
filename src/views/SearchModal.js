import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Button, Picker, StyleSheet } from 'react-native';
import { setPlaceFilterByTags } from '../state/App/action-creators';
import { ActionTag } from './components';



class SearchModal extends Component {
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
    navigator.dismissModal();
  }

  handleRemoveSelectedTag = (tagId) => {
    this.setState({
      selectedTags: this.state.selectedTags.filter(selectedTagId => selectedTagId != tagId)
    });
  }

  render() {
    const { tagsById, allTagIds, navigator } = this.props;
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
          <Text>select categories to view</Text>
          <View style={styles.foot}>
            <Button title="cancel" onPress={() => navigator.dismissModal()} />
            <Button title="search" onPress={() => this.handleSubmit()} />
          </View>
          <Picker style={styles.picker} selectedValue={this.state.selectedTag} onValueChange={this.handlePickerChange}>
            {
              allTagIds.map(tagId => (
                <Picker.Item key={`picker_${tagId}`} value={tagId} label={tagsById[tagId].title} />
              ))
            }
          </Picker>
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
    shadowOpacity: 1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 15 }
  }
});
