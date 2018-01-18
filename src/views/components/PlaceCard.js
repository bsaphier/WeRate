import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Tag from './Tag';
import { iconsMap } from '../../utils/icons-loader';



const PlaceCard = ({ tags, name, icon, phone, address, website, onSelect, createdBy, reviewCount, reviewAvg = 0, description }) => (
  <TouchableOpacity style={styles.container} onPress={onSelect}>
    
    <View style={styles.headerContainer}>
      <View style={styles.headerLeft}>
        <Image style={styles.icon} source={iconsMap[icon]} />
        <Text style={styles.headerTitle}>{name}</Text>
      </View>
      <View style={styles.headerRight}>
        <Text style={styles.reviewCount}>{`(${reviewCount})`}</Text>
        <Text style={styles.reviewAvg}>{reviewAvg}</Text>
        <Image style={styles.star} source={iconsMap['ios-star']} />
      </View>
    </View>

    <View style={styles.tagsContainer}>
      { tags.map(tag => (tag && <Tag key={tag.id + name} name={tag.title} />)) }
    </View>

    <View style={styles.bodyContainer}>
      <Text style={styles.description}>
        {description.length > 140 ? `${description.slice(0, 140)}...` : description}
      </Text>
      <Text style={styles.detailContainer}>Address:
        <Text style={styles.detailContent}> {address} </Text>
      </Text>
      <Text style={styles.detailContainer}>Phone:
        <Text style={styles.detailContent}> {phone} </Text>
      </Text>
      <Text style={styles.detailContainer}>Website:
        <Text style={styles.detailContent}> {website} </Text>
      </Text>
      <Text style={styles.detailContainer}>Created By:
        <Text style={styles.detailContent}> {`${createdBy.firstName} ${createdBy.lastName}`} </Text>
      </Text>
    </View>

  </TouchableOpacity>
);


export default PlaceCard;


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
  headerTitle: {
    color: '#222',
    marginTop: 13,
    marginLeft: 21,
    marginRight: 21,
    fontWeight: 'bold'
  },
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
  bodyContainer: {
    display: 'flex',
    borderTopColor: '#fafafa',
    borderTopWidth: 2,
    padding: 8,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  icon: {
    width: 34,
    height: 34
  },
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
