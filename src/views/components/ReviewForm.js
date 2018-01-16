import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { View, Text, Button, StyleSheet } from 'react-native';
import { FormField, FormSlider } from '../components';



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
    <FormField
        name="comment"
        label="Comment"
        placeholder="Your comment here"
    />
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
  buttonWrapper: {
    width: '100%',
    alignItems: 'center'
  },
  slider: {
    width: '100%'
  }
});
