import React from 'react';
import { TouchableHighlight } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Txt from './Txt';
import styles from '../styles/buttons';
import colors from '../styles/colors';



const Btn = ({ title, onPress }) => {
  return (
    <TouchableHighlight style={styles.container} onPress={onPress} underlayColor={colors.PRIMARY.LIGHTER}>
      <LinearGradient colors={[colors.PRIMARY.LIGHT, colors.PRIMARY.DARK]} style={styles.backgroundFill}>
        <Txt style={styles.buttonText}>{ title }</Txt>
      </LinearGradient>
    </TouchableHighlight>
  );
};


export default Btn;
