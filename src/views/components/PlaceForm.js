import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Field, reduxForm } from 'redux-form';
import { FormTextInput, FormMultiSelect } from '../components';



const PlaceForm = ({ tags, values, handleSubmit }) => (
  <View style={styles.containerStyle}>
    <View style={styles.inputContainerStyle}>
      <Text style={styles.labelStyle}>Name</Text>
      <Field
          name="name"
          placeholder="A Business"
          style={styles.inputStyle}
          component={FormTextInput}
      />
    </View>
    <View style={styles.inputContainerStyle}>
      <Text style={styles.labelStyle}>Description</Text>
      <Field
          name="description"
          placeholder="A description of a business"
          style={styles.inputStyle}
          component={FormTextInput}
      />
    </View>
    <View style={styles.inputContainerStyle}>
      <Text style={styles.labelStyle}>Address</Text>
      <Field
          name="address"
          placeholder="123 Main St."
          style={styles.inputStyle}
          component={FormTextInput}
      />
    </View>
    <View style={styles.inputContainerStyle}>
      <Text style={styles.labelStyle}>Phone</Text>
      <Field
          name="phone1"
          placeholder="000 000 0000"
          keyboardType="phone-pad"
          style={styles.inputStyle}
          component={FormTextInput}
      />
    </View>
    <View style={styles.inputContainerStyle}>
      <Text style={styles.labelStyle}>Phone alt</Text>
      <Field
          name="phone2"
          placeholder="000 000 0000"
          keyboardType="phone-pad"
          style={styles.inputStyle}
          component={FormTextInput}
      />
    </View>
    <View style={styles.inputContainerStyle}>
      <Text style={styles.labelStyle}>Website</Text>
      <Field
          name="email"
          placeholder="email@website.com"
          keyboardType="email-address"
          style={styles.inputStyle}
          component={FormTextInput}
      />
    </View>
    <View style={styles.inputContainerStyle}>
      <Text style={styles.labelStyle}>Website</Text>
      <Field
          name="website"
          placeholder="www.website.com"
          style={styles.inputStyle}
          component={FormTextInput}
      />
    </View>
    <View style={styles.scrollContainerStyle}>
      <Text style={styles.labelStyle}>{'TYPE OF BUSINESS (select all that apply)'}</Text>
      <Field
          name="tagIds"
          data={tags.allIds.map(id => ({ key: id, ...tags.byId[id] }))}
          component={FormMultiSelect}
      />
    </View>
    <View style={styles.buttonWrapper}>
      <Button title="submit" onPress={() => handleSubmit(values)} />
    </View>
  </View>
);



const mapState = (state, ownProps) => ({
  tags: state.tags,
  initialValues: {
    tagIds: ownProps.edit ? ownProps.place.tagIds : [],
    name: ownProps.edit ? ownProps.place.name : undefined,
    email: ownProps.edit ? ownProps.place.email : undefined,
    reviewIds: ownProps.edit ? ownProps.place.reviewIds : [],
    phone1: ownProps.edit ? ownProps.place.phone1 : undefined,
    phone2: ownProps.edit ? ownProps.place.phone2 : undefined,
    website: ownProps.edit ? ownProps.place.website : undefined,
    address: ownProps.edit ? ownProps.place.address : undefined,
    description: ownProps.edit ? ownProps.place.description : undefined
  }
});


export default connect(mapState)(reduxForm({
  form: 'placeForm'
})(PlaceForm));


const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%',
  },
  scrollContainerStyle: {
    height: 90,
    flexDirection: 'column',
    width: '100%',
    borderColor: '#D4D4D4',
    borderBottomWidth: 1,
  },
  inputContainerStyle: {
    height: 45,
    marginBottom: 20,
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%',
    borderColor: '#D4D4D4',
    borderBottomWidth: 1
  },
  labelStyle: {
    fontSize: 12,
    color: '#7F7D7D',
    fontWeight: '200',
    flex: 1
  },
  inputStyle: {
    paddingRight: 5,
    paddingLeft: 5,
    paddingBottom: 2,
    color: '#262626',
    fontSize: 18,
    fontWeight: '200',
    flex: 1,
    height: 40,
    width: '100%'
  },
  buttonWrapper: {
    width: '100%',
    alignItems: 'center'
  }
});
