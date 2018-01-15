import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { View, Text, Button, StyleSheet } from 'react-native';
import { FormSlider, FormTextInput } from '../components';



const ReviewForm = ({ values, ratingValue, handleSubmit }) => (
  <View style={styles.containerStyle}>
    <View style={styles.inputContainerStyle}>
      <Text>{`Rating: ${ratingValue}`}</Text>
      <Field
          name="rating"
          style={styles.slider}
          step={1}
          maximumValue={5}
          minimumValue={0}
          component={FormSlider}
      />
    </View>
    <View style={styles.inputContainerStyle}>
      <Text style={styles.labelStyle}>Comment</Text>
      <Field
          name="comment"
          placeholder="Your comment here"
          style={styles.inputStyle}
          component={FormTextInput}
      />
    </View>
    <View style={styles.buttonWrapper}>
      <Button title="submit" onPress={() => handleSubmit(values)} />
    </View>
  </View>
);


const selector = formValueSelector('reviewForm');

const mapState = (state, ownProps) => ({
  initialValues: {
    rating: ownProps.edit ? ownProps.review.rating : 0,
    comment: ownProps.edit ? ownProps.review.comment : undefined
  },
  ratingValue: selector(state, 'rating')
});


export default connect(mapState)(reduxForm({
  form: 'reviewForm'
})(ReviewForm));


const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%',
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
  },
  slider: {
    width: '100%'
  }
});
