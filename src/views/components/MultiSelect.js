import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableHighlight } from 'react-native';



class ListItem extends React.PureComponent {
  render() {
    const { item, style, onPress } = this.props;
    return (
      <View style={styles.listItem}>
        <TouchableHighlight onPress={onPress} underlayColor="#D5DCDD">
          <Text style={style}>{item.title}</Text>
        </TouchableHighlight>
      </View>
    );
  }
}



export default class MultiSelect extends Component {
  constructor(props) {
    super(props);
    const selectedItems = {};
    const { selectedItemIds } = props;
    if (selectedItemIds.length) {
      selectedItemIds.forEach(itemId => selectedItems[itemId] = true);
    }
    this.state = { selectedItems };
  }

  onItemPressed(item) {
    const selectedItemIds = [];
    const prevSelectedItems = this.state.selectedItems;
    const itemState = prevSelectedItems[item.id];
    prevSelectedItems[item.id] = itemState ? false : true;
    this.setState({ selectedItems: prevSelectedItems });
    Object.keys(prevSelectedItems).forEach(itemId => {
      if (prevSelectedItems[itemId]) selectedItemIds.push(itemId);
    });
    this.props.onValueChange(selectedItemIds);
  }

  getStyle(item) {
    return this.state.selectedItems[item.id] ? styles.itemTextSelected : styles.itemText;
  }

  renderItem = ({ item }) => {
    return (
      <ListItem
          item={item}
          style={this.getStyle(item)}
          onPress={() => this.onItemPressed(item)}
      />
    );
  }

  render() {
    return (
      <View style={styles.rootView}>
        <FlatList
            style={styles.list}
            extraData={this.state}
            data={this.props.data}
            renderItem={this.renderItem}
        />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  rootView: {
    flex: 1
  },
  itemText: {
    padding: 4,
    color: '#7F7D7D',
    fontSize: 18,
    fontWeight: '200',
    width: '100%',
    textAlign: 'center'
  },
  itemTextSelected: {
    padding: 4,
    color: '#262626',
    fontSize: 18,
    fontWeight: '200',
    backgroundColor: '#E4EBEE',
    textAlign: 'center'
  },
  list: {
    flex: 1
  },
  listItem: {
    flex: 1
  }
});
