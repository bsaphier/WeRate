import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { iconsMap } from '../../utils/icons-loader';



const PlaceCard = ({ tags, name, icon, phone, address, website, reviewCount, description }) => (
  <View style={styles.container}>
    
      <View style={styles.headerContainer}>
          <Image
              style={styles.icon}
              source={iconsMap[icon]}
          />
          <Text style={styles.headerTitle}>{name}</Text>
          {
            // List of tags below name
            tags.map(tag => (tag && <Text key={tag.id}>{tag.title}</Text>))
          }
          {/* A count of how many reviews have been added */}
          <Text style={styles.reviewCount}>{reviewCount}</Text>
          
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

      </View>

  </View>
);


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
  headerTitle: {
    color: '#222',
    marginTop: 13,
    marginLeft: 21,
    marginRight: 21,
    fontWeight: 'bold'
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
  icon: {
    width: 34,
    height: 34
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
  },
  bold: {
    fontWeight: 'bold'
  }
});


export default PlaceCard;
