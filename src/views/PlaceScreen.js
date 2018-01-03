import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Text, View, StyleSheet } from 'react-native';
import { deleteReview } from '../state/Reviews/action-creators';
import { selectUser } from '../state/Users/action-creators';



class PlaceScreen extends Component {
  static navigatorButtons = {
    rightButtons: [
      {
        title: 'edit',
        id: 'tab.place.event.edit'
      }
    ]
  }

  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
  }

  onNavigatorEvent = (event) => {
    if (event.type == 'NavBarButtonPress') {
      if (event.id == 'tab.place.event.edit') {
        this.showEditPlaceForm();
      }
    }
  }

  showEditPlaceForm = () => {
    const { place, navigator } = this.props;
    navigator.showModal({
      screen: 'werate.modal.place',
      title: 'Edit Place Modal',
      passProps: { edit: true, place }
    });
  }

  showCreateRatingForm = () => {
    const { place, navigator } = this.props;
    navigator.showModal({
      screen: 'werate.modal.review',
      title: 'Rating Modal',
      passProps: { edit: false, place }
    });
  }

  showEditRatingForm = (reviewId) => {
    const { place, navigator, reviewsById } = this.props;
    navigator.showModal({
      screen: 'werate.modal.review',
      title: 'Rating Modal',
      passProps: { edit: true, place, review: reviewsById[reviewId] }
    });
  }

  showUserDetail = (userId) => {
    const { onSelectUser, navigator } = this.props;
    onSelectUser(userId);
    navigator.push({
      screen: 'werate.screen.profile'
    });
  }

  renderReviews = () => {
    const { place, placesById, deleteReview, reviewsById } = this.props;
    const _place = placesById[place.id];
    if (_place.reviewIds) {
      return _place.reviewIds.map(reviewId => {
        const review = reviewsById[reviewId];
        return (
          <View key={review.id}>
            <Text>{`Comment: ${review.comment}`}</Text>
            <Text>{`Rating: ${review.rating}`}</Text>
            <Button title="Edit Review" onPress={() => this.showEditRatingForm(reviewId)} />
            <Button title="Delete Review" onPress={async () => { await deleteReview(review); }} />
          </View>
        );
      });
    }
  }
  
  render() {
    const { place, usersById } = this.props;
    const createdBy = usersById[place.createdBy];
    return (
      <View>
        <Text>{place.name}</Text>
        <Text>{place.description}</Text>
        <Text>{place.email}</Text>
        <Text>{place.website}</Text>
        <Button title={`${createdBy.firstName} ${createdBy.lastName}`} onPress={() => this.showUserDetail(createdBy.id)} />
        { this.renderReviews() }
        <View style={styles.buttonWrapper}>
          <Button title="Add Review" onPress={this.showCreateRatingForm} />
        </View>
      </View>
    );
  }
}


const mapState = ({ tags, users, places, reviews }) => ({
  tagsById: tags.byId,
  usersById: users.byId,
  placesById: places.byId,
  reviewsById: reviews.byId
});

const mapDispatch = dispatch => ({
  onSelectUser: (userId) => dispatch(selectUser(userId)),
  deleteReview: async review => await dispatch(deleteReview(review))
});


export default connect(mapState, mapDispatch)(PlaceScreen);


const styles = StyleSheet.create({
  buttonWrapper: {
    width: '100%',
    alignItems: 'center'
  }
});
