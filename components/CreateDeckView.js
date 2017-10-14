// Imports
import React, { Component } from 'react';
import { Platform, Text, TextInput, View, FlatList, TouchableOpacity, TouchableHighlight, Animated } from 'react-native';
import styles from '../utils/styles'
import { connect, Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from '../reducer'
import { operate_deck, operate_card } from '../actions'
import { ADD_DECK, ADD_CARD } from '../actions'
import { NavigationActions, TabNavigator, StackNavigator } from 'react-navigation';
import { newDeck } from '../utils/tools'
import { white, black, red, purple, gray, blue, pink, lightPurp } from '../utils/colors'

// Component Class
class CreateDeckView extends Component {
  state = {
    title: "",
    msg: ""
  }

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    console.log("create deck check - ", this.props);
    if(this.props.decks == undefined) {
      return
    }
  }

  checkInput() {
    if(this.state.title.length < 3) {
      alert("Title Must Be At Least 3 Characters Long");
      return
    }
    this.createDeck();
  }

  createDeck() {
    let deck = newDeck(this.state.title);
    console.log(deck);
    this.props.operate_deck(deck);
    this.props.navigation.state.params.updateHomeView(() => {
      // this.props.navigation.goBack();
      this.props.navigation.navigate(
        'Deck', {deck_id: deck.id, updateHomeView: this.props.navigation.state.params.updateHomeView} )
    })
  }

  render() {
    return (
      <View style={styles.NewDeckcontainer}>
        <Text style={{marginTop: 50}}>Create Deck View</Text>

        <TextInput style={styles.textField} placeholder="Title"
          value={this.state.title} onChangeText={(title) => this.setState({title})} />

        <TouchableOpacity style={styles.btnBlue} onPress={() => this.checkInput()}>
          <Text>Submit</Text>
        </TouchableOpacity>

        <Text style={{marginTop: 30}}>{this.state.msg}</Text>
      </View>
    )
  }
}

// Redux Connect
function mapStateToProps (decks) {
  return {
    decks: decks
  }
}
function mapDispatchToProps(dispatch) {
  return {
    operate_deck: (deck) => dispatch(operate_deck(deck)),
    operate_card: (card, deck_id) => dispatch(operate_card(card, deck_id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateDeckView)
