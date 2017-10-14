// Imports
import React, { Component } from 'react';
import { Platform, Text, TextInput, View, FlatList, TouchableOpacity, TouchableHighlight, ScrollView, Animated } from 'react-native';
import styles from '../utils/styles'
import { connect, Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from '../reducer'
import { operate_deck, operate_card } from '../actions'
import { NavigationActions, TabNavigator, StackNavigator } from 'react-navigation';

import { white, black, red, purple, gray, blue, pink, lightPurp } from '../utils/colors'

// Component Class
class QuizView extends Component {
  constructor(props) {
    super(props);
    console.log("quiz view - ", this.props);

    let { deck } = this.props.navigation.state.params;
    var cards = deck.questions;

    this.state = {
      right: 0,
      wrong: 0,
      at: 0,
      deck: deck,
      cards: cards,
      cardsLength: cards.length,
      answerAsText: ""
    }
  }

  tryGuess(guess) {
    let card = this.state.cards[this.state.at];
    if(guess === card.answer) {
      this.setState((prevState) => {
        return {answerAsText: "", right: prevState.right + 1, at: prevState.at + 1}
      })
    }
    else {
      this.setState((prevState) => {
        return {answerAsText: "", wrong: prevState.wrong + 1, at: prevState.at + 1}
      })
    }
  }

  startOver() {
    this.setState({at: 0, right: 0, wrong: 0});
  }

  render() {
    if(this.state.cards[this.state.at] !== undefined) {
      return (
        <View style={styles.QuizContainer}>
        <ScrollView>
          <Text style={{marginTop: 50, marginBottom: 50, textAlign: 'center'}}>{this.state.deck.title} Quiz</Text>

          <Text style={styles.headTextCenter}>{this.state.cards[this.state.at].question}</Text>
          <Text style={{margin: 20, textAlign: 'center'}}>{this.state.answerAsText}</Text>

          <TouchableOpacity style={styles.btnOne} onPress={() => this.setState({answerAsText: String(this.state.cards[this.state.at].answer) })}>
            <Text>Show Answer</Text>
          </TouchableOpacity>

          <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <TouchableOpacity style={styles.btnBlue} onPress={() => this.tryGuess(true)}>
              <Text>True</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btnLP} onPress={() => this.tryGuess(false)}>
              <Text>False</Text>
            </TouchableOpacity>
          </View>



          <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around'}}>
            <Text style={{margin: 10}}>Right: {this.state.right}</Text>

            <Text style={{margin: 10}}>Wrong: {this.state.wrong}</Text>
          </View>

          <Text style={{marginTop: 30, marginBottom: 30, textAlign: 'center'}}>{`${this.state.at + 1}/${this.state.cardsLength}`} Quesions</Text>

          <TouchableOpacity style={styles.btnLP} onPress={() => this.startOver()}>
            <Text>Restart Quiz</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnOne} onPress={() => this.props.navigation.goBack()}>
            <Text>Back To Deck</Text>
          </TouchableOpacity>
        </ScrollView>
        </View>
      )
    }
    else {
      return (
        <View style={styles.QuizContainer}>
          <ScrollView>
            <Text style={{marginTop: 50, marginBottom: 50, textAlign: 'center'}}>{this.state.deck.title} Quiz</Text>

            <Text style={styles.headText}>Quiz Over!</Text>

            <Text>Your Score: {(this.state.right / this.state.cardsLength) * 100}%</Text>

            <TouchableOpacity style={styles.btnLP} onPress={() => this.startOver()}>
              <Text>Restart Quiz</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btnOne} onPress={() => this.props.navigation.goBack()}>
              <Text>Back To Deck</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      )
    }

  }
}

// Redux Connect
function mapStateToProps ({decks}) {
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
export default connect(mapStateToProps, mapDispatchToProps)(QuizView)
