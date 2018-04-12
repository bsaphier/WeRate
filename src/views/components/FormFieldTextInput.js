import React, { PureComponent } from 'react';
import { TextInput } from 'react-native';
import styles from '../styles/forms';
import colors from '../styles/colors';



class FormFieldTextInput extends PureComponent {

  componentDidMount() {
    const { onMounted } = this.props;
    if (onMounted) { onMounted(); }
  }

  render() {
    const { input: { onChange, value, ...inputProps }, inputRef, ...props } = this.props;
    return (
      <TextInput
          style={props.style ? props.style : styles.formTextInput}
          value={value}
          onChangeText={onChange}
          placeholderTextColor={colors.SHADE.LIGHTER}
          ref={(r) => inputRef && inputRef(r)}
          {...inputProps}
          {...props}
      />
    );
  }
}


export default FormFieldTextInput;
