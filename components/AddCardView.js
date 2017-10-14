// Imports
import React, { Component } from 'react';
import { Platform, Text, TextInput, View, FlatList, TouchableOpacity, TouchableHighlight, Switch, Animated } from 'react-native';
import styles from '../utils/styles'
import { connect, Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from '../reducer'
import { operate_deck, operate_card } from '../actions'
import { NavigationActions, TabNavigator, StackNavigator } from 'react-navigation';
import { newCard } from '../utils/tools'
import { white, black, red, purple, gray, blue, pink, lightPurp } from '../utils/colors'

// Component Class
class AddCardView extends Component {
  state = {
    question: "",
    answer: false,
    msg: ""
  }

  constructor(props) {
    super(props)
  }

  componentDidMount(){
    console.log(this.props);
  }

  checkInput() {
    if(this.state.question < 3) {
      alert("Question Must Be At Least 3 Characters Long");
      return
    }
    else {
      this.addCard()
    }
  }

  addCard() {
    let deck_id = this.props.navigation.state.params.deck_id;
    let card = newCard(this.state.question, this.state.answer);
    this.props.operate_card(card, deck_id);
    this.props.navigation.state.params.updateDeckView(() => {
      this.setState({msg: "New Card Added!", question: "", answer: false}, () => {
        setTimeout(() => { this.setState({msg: ""}) } , 2000)
      });
    })

  }

  render() {
    let id = this.props.navigation.state.params.deck_id;
    let deck = this.props.decks[id];
    return (
      <View style={styles.NewDeckcontainer}>
        <Text style={{marginTop: 50}}>Add Card To {deck.title} Deck</Text>

        <TextInput style={styles.textField} placeholder="Enter Question"
          value={this.state.question} onChangeText={(question) => this.setState({question: question})} />

        <Text style={{margin: 20}}>Set The Answer</Text>
        <View style={{flexDirection: 'row'}}>
          <Text style={{marginRight: 20}}>False</Text>
          <Switch value={this.state.answer} onValueChange={(value) => this.setState({answer: value})}/>
          <Text style={{marginLeft: 20}}>True</Text>
        </View>

        <Text style={{marginTop: 30}}>{this.state.msg}</Text>

        <Text style={{margin: 15}}></Text>

        <TouchableOpacity style={styles.btnBlue} onPress={() => this.checkInput()}>
          <Text>Add</Text>
        </TouchableOpacity>

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
export default connect(mapStateToProps, mapDispatchToProps)(AddCardView)
