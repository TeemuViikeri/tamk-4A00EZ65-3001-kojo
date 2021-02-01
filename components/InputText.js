import React, { useState, useEffect } from 'react'
import { TextInput, Button, View, StyleSheet } from 'react-native'

const InputText = (props) => {
  // Declare a variable 'userText' and a Hook 'setUserText'
  // Initiate 'userText' with empty String
  const [userText, setUserText] = useState('')

  // Function for handling text change aka showing text in input text field
  const inputTextChangeHandler = (inputText) => {
    setUserText(inputText)
  }

  // Function for handling submit event
  const onSubmitPressedHandler = () => {
    // If input text field isn't empty...
    if (userText != '') {
      // Handle submit event with submit press event function from props
      props.onSubmitPressed(userText)
    }
  }

  useEffect(() => {
    if (props.text !== undefined) {
      setUserText(props.text)
    } else {
      setUserText('')
    }
  }, [props.text])

  return (
    <View style={styles.root}>
      <TextInput
        style={styles.input}
        placeholder='Add a new task'
        // Use inputTextChangeHandler as text input field's change event function
        onChangeText={inputTextChangeHandler}
        value={userText}
      />
      {/*      
          Use onSubmitPressedHandler button's submit event function
      */}
      <Button onPress={onSubmitPressedHandler} title={props.submitText} />
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    width: '80%',
  },
})

// Default export, joka palauttaa InputText-funkion
export default InputText
