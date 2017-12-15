import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Button, StyleSheet } from 'react-native';
import { TitledInput, MultiSelect } from '../components';
import { createPlace } from '../../state/Places/action-creators';



class PlaceForm extends Component {
  state = {
    name: '',
    description: '',
    address: '',
    phone1: '',
    phone2: '',
    email: '',
    website: '',
    tagIds: [],
    reviewIds: []
  }

  handleSubmit = async () => {
    const dismissModal = this.props.handleSubmit;
    await this.props.createPlace(this.state);
    dismissModal();
  }

  render() {
    return (
      <View style={styles.containerStyle}>
          <TitledInput
              label="Name"
              placeholder="A Business"
              value={this.state.name}
              onChangeText={name => this.setState({ name })}
          />
          <TitledInput
              label="Description"
              placeholder="A description of a business"
              value={this.state.description}
              onChangeText={description => this.setState({ description })}
          />
          <TitledInput
              label="Address"
              placeholder="123 Main St."
              value={this.state.address}
              onChangeText={address => this.setState({ address })}
          />
          <TitledInput
              label="Phone"
              placeholder="000 000 0000"
              value={this.state.phone1}
              onChangeText={phone1 => this.setState({ phone1 })}
          />
          <TitledInput
              label="Phone alt"
              placeholder="000 000 0000"
              value={this.state.phone2}
              onChangeText={phone2 => this.setState({ phone2 })}
          />
          <TitledInput
              label="Email"
              placeholder="email@website.com"
              value={this.state.email}
              onChangeText={email => this.setState({ email })}
          />
          <TitledInput
              label="Website"
              placeholder="www.website.com"
              value={this.state.website}
              onChangeText={website => this.setState({ website })}
          />

          <View style={styles.scrollContainerStyle}>
            <Text style={styles.labelStyle}>{'TYPE OF BUSINESS (select all that apply)'}</Text>
            <MultiSelect
                data={this.props.tags.allIds.map(id => ({ key: id, ...this.props.tags.byId[id] }))}
                onValueChange={tagIds => this.setState({ tagIds })}
                selectedItemIds={this.state.tagIds}
            />
          </View>
          <View style={styles.buttonWrapper}>
            <Button title="submit" onPress={this.handleSubmit} />
          </View>
      </View>
    );
  }
}



const mapState = ({ tags }) => ({ tags });

const mapDispatch = dispatch => ({
  createPlace: async place => await dispatch(createPlace(place))
});


export default connect(mapState, mapDispatch)(PlaceForm);


const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%',
  },
  scrollContainerStyle: {
    height: 90,
    flexDirection: 'column',
    width: '100%',
    borderColor: '#D4D4D4',
    borderBottomWidth: 1,
  },
  buttonWrapper: {
    width: '100%',
    alignItems: 'center'
  },
  labelStyle: {
    fontSize: 12,
    color: '#7F7D7D',
    fontWeight: '200'
  }
});
