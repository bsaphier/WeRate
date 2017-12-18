import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Slider, Button, StyleSheet } from 'react-native';
import { TitledInput } from '../components';
import { editReview, createReview } from '../../state/Reviews/action-creators';



class ReviewForm extends Component {
  state = {
    rating: 5,
    comment: ''
  }

  componentWillMount() {
    if (this.props.edit) {
      const { rating, comment } = this.props.review;
      this.setState({ rating, comment });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.edit) {
      const { rating, comment } = nextProps.review;
      this.setState({ rating, comment });
    }
  }

  handleSubmit = async () => {
    const { rating, comment } = this.state;
    const { edit, place, review, handleSubmit, editRating, createRating } = this.props;
    const dismissModal = handleSubmit;
    const reviewObj = { rating, comment, placeId: place.id };
    try {
      if (edit) {
        await editRating({ ...reviewObj, id: review.id });
      } else {
        await createRating(reviewObj);
      }
    } catch (err) {
      console.log(err);
    }
    dismissModal();
  }

  handleRatingChange = (newRating) => {
    if (this.state.rating != newRating) {
      this.setState({ rating: newRating });
    }
  }

  render() {
    return (
      <View style={styles.containerStyle}>
        <Text>{`Rating: ${this.state.rating}`}</Text>
        <Slider
            style={styles.slider}
            value={this.state.rating}
            step={1}
            maximumValue={5}
            minimumValue={0}
            onValueChange={this.handleRatingChange}
        />
        
        <TitledInput
            label="Comment"
            placeholder="Your comment here"
            value={this.state.comment}
            onChangeText={comment => this.setState({ comment })}
        />
        
        <View style={styles.buttonWrapper}>
          <Button title="submit" onPress={this.handleSubmit} />
        </View>
      </View>
    );
  }
}



const mapState = () => ({});

const mapDispatch = dispatch => ({
  editRating: async rating => await dispatch(editReview(rating)),
  createRating: async rating => await dispatch(createReview(rating))
});


export default connect(mapState, mapDispatch)(ReviewForm);


const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%',
  },
  buttonWrapper: {
    width: '100%',
    alignItems: 'center'
  },
  slider: {
    width: '100%'
  }
});
