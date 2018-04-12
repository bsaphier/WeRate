// @flow
import React, { Component } from 'react';
import { View } from 'react-native';
import { Field } from 'redux-form';
import { Txt, FormFieldTextInput } from '../components';
import styles from '../styles/forms';



class EditableValue extends Component<EditableValueProps> {

  formFieldRef: any;

  handleToggleEditState = () => {
    const { name, onToggleEditState } = this.props;
    if (onToggleEditState) {
      onToggleEditState(name);
    }
  }
  
  handleFormFieldMounted = () => {
    this.formFieldRef && this.formFieldRef.focus();
  }

  renderField = () => {
    const { canEdit, value, ...props } = this.props;
    return canEdit ? (
      <Field
          style={styles.formTextInputSelected}
          component={FormFieldTextInput}
          onMounted={this.handleFormFieldMounted}
          inputRef={(ref) => this.formFieldRef = ref}
          withRef
          {...props}
      />
    ) : (
      <Txt style={styles.formTextInput}>{ value }</Txt>
    );
  }

  render() {
    const { label, canEdit } = this.props;
    const labelStyle = canEdit ? styles.labelStyleSelected : styles.labelStyle;
    return (
      <View style={styles.inputContainerStyle}>
        <View style={styles.labelWrapper}>
          <Txt style={labelStyle}>{label}</Txt>
          {(canEdit !== undefined) && (
            <Txt style={styles.toggleEditableField} onPress={this.handleToggleEditState}>
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
  onToggleEditState?: (string) => {};
  placeholder?: string;
  keyboardType?: string;
  autoCapitalize?: string;
};
