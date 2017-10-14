// Imports
import React, { Component } from 'react';
import { Platform, Text, TextInput, View, FlatList, TouchableOpacity, TouchableHighlight, Animated } from 'react-native';
import styles from '../utils/styles'
import { connect, Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from '../reducer'
import { operate_deck, operate_card } from '../actions'
import { NavigationActions, TabNavigator, StackNavigator } from 'react-navigation';

import { white, black, red, purple, gray, blue, pink, lightPurp } from '../utils/colors'

// Component Class
class DeckView extends Component {
  state = {
    deck: {}
  }

  constructor(props) {
    super(props)
    this.updateDeckView = this.updateDeckView.bind(this);
  }

  updateDeckView(callback) {
    this.props.navigation.state.params.updateHomeView()
    this.forceUpdate(() => {
      if(callback){
        callback()
      }
    });
  }

  startQuiz = (deck) => {
    if(deck.questions.length === 0) {
      alert("There are no cards to be quized on.");
      return
    }
    else {
      this.props.navigation.navigate( 'QuizView', {deck: deck} )
    }
  }

  render() {
    let id = this.props.navigation.state.params.deck_id;
    let deck = this.props.decks[id];
    let cardsList = deck.questions;
    return (
      <View style={styles.container}>
        <View style={{alignItems: 'center', paddingTop: 20}}>
          <View style={{marginBottom: 30}}>
            <Text style={styles.headTextCenter}>{deck.title}</Text>
            <Text style={{textAlign: 'center'}}>{cardsList.length + " Card(s)"}</Text>
          </View>

          <TouchableOpacity style={styles.btnOne} onPress={() => this.props.navigation.navigate(
            'AddCardView', {deck_id: id, updateDeckView: this.updateDeckView} )}>
            <Text>Add Card</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnLP} onPress={() => {this.startQuiz(deck)}}>
            <Text>Quiz</Text>
          </TouchableOpacity>
        </View>
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
export default connect(mapStateToProps, mapDispatchToProps)(DeckView)
