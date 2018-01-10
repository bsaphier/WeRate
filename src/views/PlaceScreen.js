import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Text, View, FlatList, StyleSheet } from 'react-native';
import { deleteReview } from '../state/Reviews/action-creators';
import { selectUser } from '../state/Users/action-creators';
import { ReviewCard } from './components';



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

  renderReviews = ({ item: { reviewId } }) => {
    const { isAdmin, usersById, deleteReview, reviewsById } = this.props;
    const review = reviewsById[reviewId];
    const createdBy = usersById[review.createdBy];
    return (
      <ReviewCard
          review={review}
          isAdmin={isAdmin}
          createdBy={createdBy}
          handleEdit={() => this.showEditRatingForm(review.id)}
          handleDelete={async () => { await deleteReview(review); }}
          handleSelectUser={() => this.showUserDetail(createdBy.id)}
      />
    );
  }
  
  render() {
    const { place: _place, usersById, placesById } = this.props;
    const place = placesById[_place.id]; // get the place this way because this.props.place will not update in response to a redux action
    const createdBy = usersById[place.createdBy];
    return (
      <View style={styles.viewContainer}>
        <Text>{place.name}</Text>
        <Text>{place.description}</Text>
        <Text>{place.email}</Text>
        <Text>{place.website}</Text>
        <Button title={`${createdBy.firstName} ${createdBy.lastName}`} onPress={() => this.showUserDetail(createdBy.id)} />
        <View style={styles.buttonWrapper}>
          <Button title="Add Review" onPress={this.showCreateRatingForm} />
        </View>
        <FlatList
            data={place.reviewIds.map(reviewId => ({ key: reviewId, reviewId }))}
            renderItem={this.renderReviews}
        />
      </View>
    );
  }
}


const mapState = ({ tags, user, users, places, reviews }) => ({
  isAdmin: user.admin,
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
  viewContainer: {
    display: 'flex',
    height: '100%'
  },
  buttonWrapper: {
    width: '100%',
    alignItems: 'center'
  }
});
