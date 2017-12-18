import React, { Component } from 'react';
// import { connect } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import { ReviewForm } from './components';



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

  handleSubmit = () => {
    this.props.navigator.dismissModal();
  }

  render() {
    const { edit, place, review } = this.props;
    return (
      <View style={styles.container}>
        <ReviewForm
            edit={edit}
            review={review}
            place={place}
            handleSubmit={this.handleSubmit}
        />
      </View>
    );
  }
}


export default ReviewModal;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  }
});
