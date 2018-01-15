import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import { ReviewForm } from './components';
import { editReview, createReview } from '../state/Reviews/action-creators';



class ReviewModal extends Component {
  static navigatorButtons = {
    rightButtons: [
      {
        title: 'cancel',
        id: 'modal.review.event.cancel'
      }
    ]
  }

  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
  }

  onNavigatorEvent = (event) => {
    if (event.type == 'NavBarButtonPress') {
      if (event.id == 'modal.review.event.cancel') {
        this.handleCancel();
      }
    }
  }

  handleCancel = () => {
    this.props.navigator.dismissModal();
  }

  handleSubmit = async ({ rating, comment }) => {
    const { edit, place, review, editRating, navigator, createRating } = this.props;
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
    navigator.dismissModal();
  }

  render() {
    return (
      <View style={styles.container}>
        <ReviewForm
            edit={this.props.edit}
            review={this.props.review}
            onSubmit={this.handleSubmit}
        />
      </View>
    );
  }
}


const mapDispatch = dispatch => ({
  editRating: async review => await dispatch(editReview(review)),
  createRating: async review => await dispatch(createReview(review))
});


export default connect(null, mapDispatch)(ReviewModal);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  }
});
