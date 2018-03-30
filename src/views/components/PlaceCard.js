import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Tag from './Tag';
import { iconsMap } from '../../utils/icons-loader';
import styles from '../styles/cards';



const PlaceCard = ({ tags, place, icon, onSelect, createdBy, reviewAvg = 0 }) => (
  <TouchableOpacity style={styles.container} onPress={onSelect}>
    
    <View style={styles.headerContainer}>

      <View style={styles.headerLeft}>
        <Image style={styles.icon} source={iconsMap[icon]} />
        <Text style={styles.headerTitle}>{place.name}</Text>
      </View>

      <View style={styles.headerRight}>
        <Text style={styles.reviewCount}>{`(${place.reviewIds.length})`}</Text>
        <Text style={styles.reviewAvg}>{reviewAvg.toFixed(2).replace(/\.00|0$/g, '')}</Text>
        <Image style={styles.star} source={iconsMap['ios-star']} />
      </View>

    </View>

    <View style={styles.tagsContainer}>
      { tags.map(tag => (tag && <Tag key={tag.id + place.name} name={tag.title} />)) }
    </View>

    <View style={styles.bodyContainer}>

      <Text style={styles.description}>
        {place.description.length > 140 ? `${place.description.slice(0, 140)}...` : place.description}
      </Text>

      <Text style={styles.detailContainer}>Address:
        <Text style={styles.detailContent}> {place.address} </Text>
      </Text>

      <Text style={styles.detailContainer}>Phone:
        <Text style={styles.detailContent}> {place.phone1} </Text>
      </Text>

      <Text style={styles.detailContainer}>Website:
        <Text style={styles.detailContent}> {place.website} </Text>
      </Text>

      <Text style={styles.detailContainer}>Created By:
        <Text style={styles.detailContent}> {`${createdBy.firstName} ${createdBy.lastName}`} </Text>
      </Text>
      
    </View>

  </TouchableOpacity>
);


export default PlaceCard;


const _styles = StyleSheet.create({
  // container: {
  //   display: 'flex',
  //   marginBottom: 21,
  //   borderBottomColor: '#e5e5e5',
  //   borderBottomWidth: 3,
  //   padding: 13
  // },
  // headerContainer: {
  //   display: 'flex',
  //   flexDirection: 'row',
  //   marginBottom: 13
  // },
  // headerTitle: {
  //   color: '#222',
  //   marginTop: 13,
  //   marginLeft: 21,
  //   marginRight: 21,
  //   fontWeight: 'bold'
  // },
  reviewAvg: {
    alignSelf: 'center',
    marginRight: 3,
    fontWeight: 'bold'
  },
  reviewCount: {
    fontSize: 11,
    marginRight: 2,
    // fontWeight: 'light'
    alignSelf: 'center',
  },
  tagsContainer: {
    marginBottom: 6,
    paddingLeft: 8,
    paddingRight: 8,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  // bodyContainer: {
  //   display: 'flex',
  //   borderTopColor: '#fafafa',
  //   borderTopWidth: 2,
  //   padding: 8,
  //   flexDirection: 'column',
  //   justifyContent: 'space-between'
  // },
  star: {
    width: 16,
    height: 16,
    marginBottom: 3,
    alignSelf: 'center'
  },
  description: {
    color: '#888'
  },
  detailContainer: {
    color: '#222',
    display: 'flex',
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  detailContent: {
    color: '#444',
    fontWeight: 'bold',
    marginLeft: 5
  }
});
