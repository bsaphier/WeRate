import React from 'react';
import { View, Image } from 'react-native';
import { iconsMap } from '../../utils/icons-loader';
import { Txt, Tag, ExternalLink } from '../components';
import styles from '../styles/cards';



const UserCard = ({ icon, user }) => (
  <View style={styles.container}>

    <View style={styles.headerContainer}>
      <Image style={styles.icon} source={iconsMap[icon]} />
      {/* TODO: make the name clickeable to open the user's profile */}
      <Txt style={styles.headerTitle}>{`${user.firstName} ${user.lastName}`}</Txt>
    </View>

    <View style={styles.tagContainer}>
      {user.admin ? <Tag name="Admin" /> : null}
    </View>

    <View style={styles.bodyContainer}>

      <Txt style={styles.detailContainer}>Email: </Txt>
      <ExternalLink
          contentStyle={styles.detailContent}
          content={user.email}
          url={'mailto:' + user.email}
      />

      <Txt style={styles.detailContainer}>Phone: </Txt>
      <ExternalLink
          contentStyle={styles.detailContent}
          content={user.phone}
          url={'sms:' + user.phone}
      />

      <Txt style={styles.detailContainer}>Website: </Txt>
      <ExternalLink
          contentStyle={styles.detailContent}
          content={user.website}
          url={'http://' + user.website}
      />

      <Txt style={styles.detailContainer}>Business:
        <Txt style={styles.detailContent}>{user.business}</Txt>
      </Txt>
      
      <Txt style={styles.detailContainer}>Reviews Written:
        <Txt style={styles.detailContent}>{user.reviewIds.length}</Txt>
      </Txt>
    </View>
  </View>
);


export default UserCard;
