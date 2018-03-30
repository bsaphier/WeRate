import React from 'react';
import { View, Image } from 'react-native';
import { iconsMap } from '../../utils/icons-loader';
import { Txt, Tag, ExternalLink } from '../components';
import styles from '../styles/cards';



const UserCard = ({ icon, user, onSelectUser }) => (
  <View style={styles.container}>

    <View style={styles.headerContainer}>
      <Txt style={styles.headerTitle} onPress={onSelectUser}>{`${user.firstName} ${user.lastName}`}</Txt>
      <Image style={styles.icon} source={iconsMap[icon]} />
    </View>

    <View style={styles.subHeaderContainer}>
      {user.admin ? <Tag name="Admin" /> : null}
    </View>

    <View style={styles.bodyContainer}>

      <View style={styles.cardDataContainer}>
        <Txt style={styles.cardDataLabel}>Email: </Txt>
        <ExternalLink url={'mailto:' + user.email}>
          <Txt style={styles.cardData}>{user.email}</Txt>
        </ExternalLink>
      </View>

      <View style={styles.cardDataContainer}>
        <Txt style={styles.cardDataLabel}>Phone: </Txt>
        <ExternalLink url={'sms:' + user.phone}>
          <Txt style={styles.cardData}>{user.phone}</Txt>
        </ExternalLink>
      </View>

      <View style={styles.cardDataContainer}>
        <Txt style={styles.cardDataLabel}>Website: </Txt>
        <ExternalLink url={'http://' + user.website}>
          <Txt style={styles.cardData}>{user.website}</Txt>
        </ExternalLink>
      </View>

      <View style={styles.cardDataContainer}>      
        <Txt style={styles.cardDataLabel}>Business: </Txt>
        <Txt style={styles.cardData}>{user.business}</Txt>
      </View>

      <View style={styles.cardDataContainer}>      
        <Txt style={styles.cardDataLabel}>Reviews Written: </Txt>
        <Txt style={styles.cardData}>{user.reviewIds.length}</Txt>
      </View>
    </View>
  </View>
);


export default UserCard;
