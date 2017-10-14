// Imports
import React, { Component } from 'react';
import { Platform, Text, View, StatusBar, Animated, AsyncStorage } from 'react-native';
import styles from './utils/styles'
import { connect, Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './reducer'
import { operate_deck, operate_card } from './actions'
import { NavigationActions, TabNavigator, StackNavigator, DrawerNavigator } from 'react-navigation';
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { Constants } from 'expo'

import HomeView from './components/HomeView'
import QuizView from './components/QuizView'
import CreateDeckView from './components/CreateDeckView'
import DeckView from './components/DeckView'
import AddCardView from './components/AddCardView'

import { white, black, red, purple, gray, blue, pink, lightPurp } from './utils/colors'
import { setLocalNotification, createNotification, clearLocalNotifications } from './utils/tools'

const Stack = StackNavigator({
  Home: {
    screen: HomeView,
    navigationOptions: {
      title: "Home"
    }
  },
  Deck: {
    screen: DeckView,
    navigationOptions: {
      title: "Deck"
    }
  },
  CreateDeckView: {
    screen: CreateDeckView,
    navigationOptions: {
      title: "Create Deck"
    }
  },
  AddCardView: {
    screen: AddCardView,
    navigationOptions: {
      title: "Add Card"
    }
  },
  QuizView: {
    screen: QuizView,
    navigationOptions: {
      title: "Quiz"
    }
  }
})

const Drawer = DrawerNavigator({
  Home: {
    screen: Stack,
    navigationOptions: {
      drawerLabel: "Home",
      drawerIcon: () => <FontAwesome name="home" size={30} />
    }
  },
  CreateDeckView: {
    screen: CreateDeckView,
    navigationOptions: {
      drawerLabel: "Create Deck",
      drawerIcon: () => <FontAwesome name="plus" size={30} />
    }
  }
}, {
  navigationOptions: {
    header: null
  },
  drawerOptions: {
    activeTintColor: Platform.OS === 'ios' ? purple : white,
    style: {
      height: 55,
      backgroundColor: Platform.OS === 'ios' ? white : purple
    }
  }
})

// Main Component Class <StatusBar translucent backgroundColor={purple} {...props} /> | ≥
export default class App extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount(){
    setLocalNotification()
  }

  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{flex:1}}>
          <StatusBar translucent backgroundColor={purple}/>
          <Stack />
        </View>
      </Provider>
    );
  }
}
