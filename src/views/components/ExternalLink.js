import React from 'react';
import { Text, Linking, TouchableOpacity, StyleSheet } from 'react-native';



function handleLink(url) {
  Linking.canOpenURL(url).then(supported => {
    if (!supported) {
      console.log('Can\'t handle url: ' + url);
    } else {
      return Linking.openURL(url);
    }
  }).catch(err => console.error('An error occurred', err));
}


const ExternalLink = ({ url, content, contentStyle }) => {
  return (
    <TouchableOpacity style={styles.contentContainer} onPress={() => handleLink(url)}>
      <Text style={contentStyle}>{content}</Text>
    </TouchableOpacity>
  );
};


export default ExternalLink;


const styles = StyleSheet.create({
  contentContainer: {
  }
});


