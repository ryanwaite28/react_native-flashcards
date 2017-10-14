// Action Constants
export const ADD_DECK = "ADD_DECK";
export const ADD_CARD = "ADD_CARD";



// Deck Function
export function operate_deck(deck) {
  return {
    type: ADD_DECK,
    deck: deck
  }
}

// Card Funtion
export function operate_card(card, deck_id) {
  return {
    type: ADD_CARD,
    card: card,
    deck_id: deck_id
  }
}
