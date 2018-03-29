/* globals console */
import React from 'react';
import { Linking, TouchableOpacity } from 'react-native';



function handleLink(url) {
  Linking.canOpenURL(url).then(supported => {
    if (!supported) {
      console.log('Can\'t handle url: ' + url);
    } else {
      return Linking.openURL(url);
    }
  }).catch(err => console.error('An error occurred', err));
}


const ExternalLink = ({ url, children }) => {
  return (
    <TouchableOpacity onPress={() => handleLink(url)}>
      { children }
    </TouchableOpacity>
  );
};


export default ExternalLink;
