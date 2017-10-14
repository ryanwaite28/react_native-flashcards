import { ADD_DECK, ADD_CARD } from '../actions'
import beginnerState from '../utils/beginnerstate'

export default function decks(state = beginnerState, action){
  switch (action.type) {

    case ADD_DECK:
      var newState = Object.assign({}, state, {[action.deck.id]: action.deck});
      console.log("newState - ", newState);
      return newState

    case ADD_CARD:
      console.log("admit one card");
      var newState = state;
      newState[action.deck_id].questions.push(action.card);
      console.log("newState - ", newState);
      return newState

    default:
      return state
  }
}
