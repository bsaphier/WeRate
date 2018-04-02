// @flow
import React, { Component } from 'react';
import { View } from 'react-native';
import { Field } from 'redux-form';
import { Txt, FormFieldTextInput } from '../components';
import styles from '../styles/forms';



class EditableValue extends Component<EditableValueProps> {

  renderField = () => {
    const { canEdit, value, ...props } = this.props;
    return canEdit ? (
      <Field component={FormFieldTextInput} {...props} />
    ) : (
      <Txt style={styles.formTextInput}>{ value }</Txt>
    );
  }

  render() {
    const { label, canEdit, onToggleEditState } = this.props;
    return (
      <View style={styles.inputContainerStyle}>
        <View style={styles.labelWrapper}>
          <Txt style={styles.labelStyle}>{label}</Txt>
          {(canEdit !== undefined) && (
            <Txt style={styles.toggleEditableField} onPress={onToggleEditState}>
              {canEdit ? 'cancel' : 'edit'}
            </Txt>
          )}
        </View>
        { this.renderField() }
      </View>
    );
  }
}


export default EditableValue;


type EditableValueProps = {
  name: string;
  label: string;
  value: string;
  canEdit?: boolean;
  onToggleEditState?: () => {};
  placeholder?: string;
  keyboardType?: string;
  autoCapitalize?: string;
};
