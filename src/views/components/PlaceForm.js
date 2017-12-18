import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Button, StyleSheet } from 'react-native';
import { TitledInput, MultiSelect } from '../components';
import { editPlace, createPlace } from '../../state/Places/action-creators';



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

  componentWillMount() {
    if (this.props.edit) { // && (this.state.tagIds.length != this.props.place.tagIds.length)
      this.setState({ ...this.props.place });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.edit) {
      this.setState({ ...nextProps.place });
    }
  }

  handleSubmit = async () => {
    const { edit, place, editPlace, createPlace, handleSubmit } = this.props;
    const dismissModal = handleSubmit;
    try {
      if (edit && place) {
        await editPlace({ ...this.state, id: place.id });
      } else {
        await createPlace(this.state);
      }
    } catch (err) {
      console.log(err);
    }
    dismissModal();
  }

  render() {
    const { edit, place } = this.props;
    return (
      <View style={styles.containerStyle}>
          <TitledInput
              label="Name"
              placeholder={edit ? place.name : 'A Business'}
              value={this.state.name}
              onChangeText={name => this.setState({ name })}
          />
          <TitledInput
              label="Description"
              placeholder={edit ? place.description : 'A description of a business'}
              value={this.state.description}
              onChangeText={description => this.setState({ description })}
          />
          <TitledInput
              label="Address"
              placeholder={edit ? place.address : '123 Main St.'}
              value={this.state.address}
              onChangeText={address => this.setState({ address })}
          />
          <TitledInput
              label="Phone"
              keyboardType="phone-pad"
              placeholder={edit ? place.phone1 : '000 000 0000'}
              value={this.state.phone1}
              onChangeText={phone1 => this.setState({ phone1 })}
          />
          <TitledInput
              label="Phone alt"
              keyboardType="phone-pad"
              placeholder={edit ? place.phone2 : '000 000 0000'}
              value={this.state.phone2}
              onChangeText={phone2 => this.setState({ phone2 })}
          />
          <TitledInput
              label="Email"
              keyboardType="email-address"
              placeholder={edit ? place.email : 'email@website.com'}
              value={this.state.email}
              onChangeText={email => this.setState({ email })}
          />
          <TitledInput
              label="Website"
              placeholder={edit ? place.website : 'www.website.com'}
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
  editPlace: async place => await dispatch(editPlace(place)),
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
