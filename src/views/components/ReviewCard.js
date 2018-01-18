import React from 'react';
import { View, Text, Image, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { iconsMap } from '../../utils/icons-loader';



let starId = 0;

function makeStars({ id, rating }) {
  let stars = [];
  for (let star = 0; star < rating; star++, starId++) {
    stars.push(<Image style={styles.star} key={`${starId}${id}`} source={iconsMap['ios-star']} />);
  }
  return stars;
}

const ReviewCard = ({ review, isAdmin, createdBy, handleEdit, handleDelete, handleSelectUser }) => (
  <View style={styles.container}>

    <View style={styles.headerContainer}>
      <View style={styles.headerLeft}>
        <Text>Created By: </Text>
        <TouchableOpacity onPress={handleSelectUser}>
          <Text style={styles.headerText}>{`${createdBy.firstName} ${createdBy.lastName}`}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.headerRight}>
        {makeStars(review)}
      </View>
    </View>

    <View style={styles.bodyContainer}>
      <Text style={styles.detailContent}>{review.comment}</Text>
    </View>

    { isAdmin && (
      <View style={styles.actionButtonsWrapper}>
        <Button title="Edit Review" onPress={handleEdit} />
        <Button title="Delete Review" onPress={handleDelete} />
      </View>
    )}

  </View>
);


export default ReviewCard;


const styles = StyleSheet.create({
  container: {
    display: 'flex',
    marginBottom: 21,
    borderBottomColor: '#e5e5e5',
    borderBottomWidth: 3,
    padding: 13
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 13
  },
  headerLeft: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  headerRight: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  headerText: {
    color: '#222',
    fontWeight: 'bold'
  },
  buttonLabelContainer: {
    marginTop: 13,
    marginRight: 21,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  // reviewCount: {
  //   marginTop: 13,
  //   marginLeft: 'auto',
  //   marginRight: 13,
  //   fontWeight: 'bold'
  // },
  bodyContainer: {
    display: 'flex',
    borderTopColor: '#fafafa',
    borderTopWidth: 2,
    padding: 8,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  detailContent: {
    color: '#444',
    fontWeight: 'bold',
    marginLeft: 5
  },
  actionButtonsWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  star: {
    width: 16,
    height: 16
  }
});
