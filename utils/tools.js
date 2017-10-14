import React, { Component } from 'react';
import { AsyncStorage } from 'react-native'
import { Notifications, Permissions } from 'expo'

// Code


const NOTIFICATION_KEY = 'Flashcards:notifications'

export function clearLocalNotifications() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
    .catch((error) => {
      console.log("Error With Notifications - ", error);
    })
}
export function createNotification() {
  return {
    title: "Study!",
    body: "Don't Forget To Study! Every Day Count!",
    ios: {
      sound: true
    },
    android: {
      sound: true,
      priority: 'high',
      vibrate: true,
      sticky: false
    }
  }
}
export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
  .then((data) => {
    if(data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
        .then(({ status }) => {
          if(status === 'granted') {
            Notifications.cancelAllScheduledNotificationsAsync()
            let tomorrow = new Date()
            tomorrow.setDate(tomorrow.getDate() + 1)
            tomorrow.setHours(20)
            tomorrow.setMinutes(0)
            Notifications.scheduleLocalNotificationAsync(
              createNotification(), {time: tomorrow, repeat: 'day'}
            )
            AsyncStorage.setItem(NOTIFICATION_KEY, "true")
          }
        })
    }
  })
  .catch((error) => {
    console.log("Error With Notifications - ", error);
  })
}


/* --- */

export function randomValue() {
  return Math.random().toString(36).substr(2, 34) + Math.random().toString(36).substr(2, 34)
}

export function newDeck(title) {
  return {
    id: randomValue(),
    title: title,
    questions: []
  }
}

export function newCard(question, answer) {
  return {
    id: randomValue(),
    question: question,
    answer: answer
  }
}
