// Imports
import React, { Component } from 'react';
import { Platform, Text, TextInput, View, FlatList, TouchableOpacity, TouchableHighlight } from 'react-native';
import styles from '../utils/styles'
import { connect, Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from '../reducer'
import { operate_deck, operate_card } from '../actions'
import { NavigationActions, TabNavigator, StackNavigator } from 'react-navigation';

import { white, black, red, purple, gray, blue, pink, lightPurp } from '../utils/colors'

// Component Class
class InfoView extends Component {
  constructor(props) {
    super(props);

  }

  componentDidMount(){

  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Info View</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(InfoView)
