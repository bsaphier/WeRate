import React from 'react';
import { View, Text, Image, TouchableHighlight, StyleSheet } from 'react-native';
import { iconsMap } from '../../utils/icons-loader';



const ActionTag = ({ label, action }) => {
  return (
    <View style={styles.tagContainer}>
      <TouchableHighlight style={styles.tagCloseBtn} onPress={action} underlayColor="#CEF">
        <Text>{label}</Text>
      </TouchableHighlight>
      <Image style={styles.actionIcon} source={iconsMap['ios-close-circle']} />
    </View>
  );
};


const styles = StyleSheet.create({
  tagContainer: {
    margin: 5,
    flexDirection: 'row'
  },
  tagCloseBtn: {
    padding: 13,
    paddingTop: 5,
    paddingBottom: 5,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: '#444',
    backgroundColor: '#EFF'
  },
  actionIcon: {
    position: 'absolute',
    top: -3,
    right: -3,
    width: 16,
    height: 16
  }
});


export default ActionTag;
