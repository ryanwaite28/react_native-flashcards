// Imports
import React, { Component } from 'react';
import { Platform, Text, View, FlatList, TouchableOpacity, TouchableHighlight, Switch, Animated } from 'react-native';
import styles from '../utils/styles'
import { connect, Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from '../reducer'
import { operate_deck, operate_card } from '../actions'
import { NavigationActions, TabNavigator, StackNavigator } from 'react-navigation';
import { white, black, red, purple, gray, blue, pink, lightPurp } from '../utils/colors'

// Component Class
class HomeView extends Component {
  state = {
    decksLength: 0,
    selected: false,
    opacity: new Animated.Value(0)
  }

  constructor(props) {
    super(props)
    this.updateHomeView = this.updateHomeView.bind(this);
  }

  updateHomeView(callback) {
    this.forceUpdate(() => {
      if(callback){
        callback()
      }
    });
  }

  componentDidMount() {
    console.log("home view - ", this.props);
    let { opacity } = this.state
    Animated.timing(opacity, { toValue: 1, duration: 500 }).start()
  }

  buildDecksList() {
    let decks = [];
    Object.keys(this.props.decks).forEach((deck_id, index) => {
      let deck = this.props.decks[deck_id];
      decks.push(deck)
    });
    return decks
  }

  showDeck(deck) {
    print("pressed - ", deck.title)
  }

  makeListItem = (obj) => {
    return (
        <TouchableHighlight style={styles.deckItemBtn} onPress={() => this.props.navigation.navigate(
          'Deck', {deck_id: obj.item.id, updateHomeView: this.updateHomeView} )}>
        <View style={styles.deckItemView}>
          <Text style={styles.headText}>{obj.item.title}</Text>
          <Text style={{justifyContent: 'center'}}>{obj.item.questions.length + " Card(s)"}</Text>
        </View>
      </TouchableHighlight>
    )
  }
  getKey(item, index) {
    return item.id
  }

  render() {
    let decksLength = Object.keys(this.props.decks).length;
    if( decksLength <= 0 ){
      let { opacity } = this.state
      return (
        <View style={styles.HomeContainerOne}>
          <Animated.View style={{ opacity }}>
          <Text style={{textAlign: 'center'}}>No Decks</Text>
          <TouchableOpacity style={styles.btnOne}
            onPress={() => this.props.navigation.navigate("CreateDeckView", { updateHomeView: this.updateHomeView })}>
            <Text>Create Deck</Text>
          </TouchableOpacity>
          </Animated.View>
        </View>
      )
    }
    else {
      let decksList = this.buildDecksList();
      console.log("", decksList);
      return (
        <View style={styles.container_two}>
          <View style={{alignItems: 'center'}}>
            <Text style={{marginTop: 30, justifyContent: 'center', textAlign: 'center'}}>{decksList.length + " Deck(s)"}</Text>
            <TouchableOpacity style={styles.btnOne}
              onPress={() => this.props.navigation.navigate("CreateDeckView", { updateHomeView: this.updateHomeView })}>
              <Text>Create Deck</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.container_three}>
            <FlatList style={styles.list} data={decksList} renderItem={this.makeListItem} keyExtractor={this.getKey} />
          </View>
        </View>
      )
    }
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeView)
