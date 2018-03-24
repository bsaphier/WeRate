import React from 'react';
import { View, TouchableHighlight } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Txt from './Txt';
import styles from '../styles/buttons';
import colors from '../styles/colors';



const Btn = ({ title, onPress }) => {
  return (
    <TouchableHighlight style={styles.container} onPress={onPress} underlayColor={colors.PRIMARY.LIGHTER}>
      <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={[colors.PRIMARY.LIGHTER, colors.PRIMARY.BASE]}
          style={styles.backgroundFill}
      >
        <View style={styles.innerContainer}>
          <Txt style={styles.buttonText}>{ title }</Txt>
        </View>
      </LinearGradient>
    </TouchableHighlight>
  );
};


export default Btn;
