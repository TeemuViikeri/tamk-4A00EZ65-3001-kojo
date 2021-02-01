import React, { useState } from 'react'
import { Modal, StyleSheet, View, Button } from 'react-native'

import InputText from './InputText'

const EditTask = (props) => {
  const onClosePressed = () => {
    // Call closeView() from props when onClosePressed ev func is called
    props.closeView()
  }

  return (
    // The Modal component is a basic way to present content above an enclosing view.
    <Modal
      // Modal uses fade animation to come into view 
      animationType='fade'
      // Sets Modal to be transparent
      transparent={true}
      // Sets Modal visible
      visible={props.isVisible}
      // The onRequestClose callback is called when the user taps the hardware back button on Android or the menu button on Apple TV
      onRequestClose={onClosePressed}
    >
      <View style={styles.root}>
        {
          // TODO: Aseta painikkeen teksti sen perusteella
          // ollaanko lisäämässä vai muokkaamassa taskia
        }
        <InputText
          submitText={props.text === undefined ? 'Add' : 'Edit'}
          onSubmitPressed={props.onSubmitPressed}
          text={props.text}
        />
        <Button title='Close' onPress={onClosePressed} />
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  root: {
    // Red, Green, Blue, Alpha
    // rgb arvoalue [0,255], a arvoalue [0,1]
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
})

export default EditTask
