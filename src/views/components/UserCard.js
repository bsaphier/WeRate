import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { iconsMap } from '../../utils/icons-loader';
import Tag from './Tag';



const UserCard = ({ icon, admin, email, phone, website, business, firstName, lastName, reviewCount }) => (
  <View style={styles.container}>
    <View style={styles.headerContainer}>
      <Image style={styles.icon} source={iconsMap[icon]} />
      <Text style={styles.headerTitle}>{`${firstName} ${lastName}`}</Text>
    </View>

    <View style={styles.tagContainer}>
      {admin ? <Tag name="Admin" /> : null}
    </View>

    <View style={styles.bodyContainer}>
      <Text style={styles.detailContainer}>Email:
        <Text style={styles.detailContent}>{email}</Text>
      </Text>
      <Text style={styles.detailContainer}>Phone:
        <Text style={styles.detailContent}>{phone}</Text>
      </Text>
      <Text style={styles.detailContainer}>Website:
        <Text style={styles.detailContent}>{website}</Text>
      </Text>
      <Text style={styles.detailContainer}>Business:
        <Text style={styles.detailContent}>{business}</Text>
      </Text>
      <Text style={styles.detailContainer}>Reviews Written:
        <Text style={styles.detailContent}>{reviewCount}</Text>
      </Text>
    </View>
  </View>
);


export default UserCard;


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
  tagContainer: {
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
  icon: {
    width: 34,
    height: 34
  }
});
