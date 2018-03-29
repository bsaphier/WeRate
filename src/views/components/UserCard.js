import React from 'react';
import { View, Image } from 'react-native';
import { iconsMap } from '../../utils/icons-loader';
import { Txt, Tag, ExternalLink } from '../components';
import styles from '../styles/cards';



const UserCard = ({ icon, admin, email, phone, website, business, firstName, lastName, reviewCount }) => (
  <View style={styles.container}>
    <View style={styles.headerContainer}>
      <Image style={styles.icon} source={iconsMap[icon]} />
      {/* TODO: make the name clickeable to open the user's profile */}
      <Txt style={styles.headerTitle}>{`${firstName} ${lastName}`}</Txt>
    </View>

    <View style={styles.tagContainer}>
      {admin ? <Tag name="Admin" /> : null}
    </View>

    <View style={styles.bodyContainer}>
      <Txt style={styles.detailContainer}>Email: </Txt>
      <ExternalLink
          contentStyle={styles.detailContent}
          content={email}
          url={'mailto:' + email}
      />
      <Txt style={styles.detailContainer}>Phone: </Txt>
      <ExternalLink
          contentStyle={styles.detailContent}
          content={phone}
          url={'sms:' + phone}
      />
      <Txt style={styles.detailContainer}>Website: </Txt>
      <ExternalLink
          contentStyle={styles.detailContent}
          content={website}
          url={'http://' + website}
      />
      <Txt style={styles.detailContainer}>Business:
        <Txt style={styles.detailContent}>{business}</Txt>
      </Txt>
      <Txt style={styles.detailContainer}>Reviews Written:
        <Txt style={styles.detailContent}>{reviewCount}</Txt>
      </Txt>
    </View>
  </View>
);


export default UserCard;
