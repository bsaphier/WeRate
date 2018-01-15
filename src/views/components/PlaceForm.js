import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Field, reduxForm } from 'redux-form';
import { FormField, FormMultiSelect } from '../components';



const PlaceForm = ({ tags, values, handleSubmit }) => (
  <View style={styles.containerStyle}>
    <FormField
        name="name"
        label="Name"
        placeholder="A Business"
    />
    <FormField
        name="description"
        label="Description"
        placeholder="A description of a business"
    />
    <FormField
        name="address"
        label="Address"
        placeholder="123 Main St."
    />
    <FormField
        name="phone1"
        label="Phone"
        keyboardType="phone-pad"
        placeholder="000 000 0000"
    />
    <FormField
        name="phone2"
        label="Phone alt"
        keyboardType="phone-pad"
        placeholder="000 000 0000"
    />
    <FormField
        name="email"
        label="Email"
        keyboardType="email-address"
        placeholder="email@website.com"
    />
    <FormField
        name="website"
        label="Website"
        placeholder="www.website.com"
    />
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
  labelStyle: {
    fontSize: 12,
    color: '#7F7D7D',
    fontWeight: '200',
    flex: 1
  },
  buttonWrapper: {
    width: '100%',
    alignItems: 'center'
  }
});
