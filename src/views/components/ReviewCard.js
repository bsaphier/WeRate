import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';



const ReviewCard = ({ review, isAdmin, createdBy, handleEdit, handleDelete, handleSelectUser }) => (
  <View style={styles.container}>

    <View style={styles.headerContainer}>
      <View style={styles.buttonLabelContainer}>
        <Text>Created By: </Text>
        <TouchableOpacity onPress={handleSelectUser}>
          <Text style={styles.headerText}>{`${createdBy.firstName} ${createdBy.lastName}`}</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.reviewCount}>{review.rating}</Text>
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
  reviewCount: {
    marginTop: 13,
    marginLeft: 'auto',
    marginRight: 13,
    fontWeight: 'bold'
  },
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
  }
});
