import React, { useState } from 'react'
import {
  Modal,
  StyleSheet,
  ScrollView,
  View,
  Button,
  Text,
  TextInput,
  Image,
} from 'react-native'
import { Priority } from '../data/Enums'
import { Picker } from '@react-native-picker/picker'
import DateTimePicker from '@react-native-community/datetimepicker'
import CameraView from './CameraView'
import Maps from './Maps'
import { getDate } from '../data/Utils'

const EditTask = (props) => {
  const [headline, setHeadline] = useState('')
  const [text, setText] = useState('')
  const [date, setDate] = useState(new Date())
  const [priority, setPriority] = useState(Priority.medium)
  const [image, setImage] = useState(undefined)
  const [location, setLocation] = useState(undefined)
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false)
  const [isCameraVisible, setIsCameraVisible] = useState(false)
  const [isMapsVisible, setIsMapsVisible] = useState(false)

  // Save task item to application's tasks 
  const save = () => {
    props.onSubmitPressed(headline, text, date, location, image, priority)
    close()
  }

  // Close edit view and reset
  const close = () => {
    reset()
    props.closeView()
  }

  // Reset state hooks for next time edit view opens
  const reset = () => {
    setHeadline('')
    setText('')
    setDate(new Date())
    setPriority(Priority.medium)
    setImage(undefined)
    setLocation(undefined)
  }

  // Set correct hooks when a task is opened 
  const onShowView = () => {
    if (props.task == undefined) {
      reset()
    } else {
      setHeadline(props.task.title)
      setText(props.task.task)
      setDate(props.task.date)
      setPriority(props.task.priority)
      setImage(props.task.picPath)
      setLocation(props.task.location)
    }
  }

  // Close map view and set location value
  const closeMap = (taskLocation) => {
    setIsMapsVisible(false)
    setLocation(taskLocation)
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
      onRequestClose={props.closeView}
      onShow={onShowView}
    >
      <ScrollView contentContainerStyle={styles.root}>
        {/* A camera view for setting a task picture */}
        {/* Note: not visible by default */}
        <CameraView
          isVisible={isCameraVisible}
          onClosePressed={() => setIsCameraVisible(false)}
          onPicTaken={(picPath) => {
            setImage(picPath)
            setIsCameraVisible(false)
          }}
        />

        {/* A map view for setting task location*/}
        {/* Note: not visible by default */}
        <Maps
          taskLocation={location}
          isVisible={isMapsVisible}
          onClose={closeMap}
        />

        {/* A text input field for task title */}
        <TextInput
          style={styles.inputText}
          placeholder='Headline'
          value={headline}
          onChangeText={(enteredHeadline) => setHeadline(enteredHeadline)}
        />

        {/* A text input field for task description */}
        <TextInput
          style={styles.inputText}
          placeholder='Description'
          value={text}
          onChangeText={(enteredText) => setText(enteredText)}
        />

        {/* A picker which lets you choose a priority value for the task */}
        <Picker
          selectedValue={priority}
          style={styles.picker}
          onValueChange={(itemValue, itemIndex) => {
            setPriority(itemValue)
          }}
        >
          <Picker.Item label='High' value={Priority.high} />
          <Picker.Item label='Medium' value={Priority.medium} />
          <Picker.Item label='Low' value={Priority.low} />
        </Picker>

        {/* A date picker for task deadline */}
        {/* Note: not visible by default */}
        {isDatePickerVisible && (
          <DateTimePicker
            value={date}
            mode={'date'}
            is24Hour={true}
            onChange={(event, selectedDate) => {
              setIsDatePickerVisible(false)
              setDate(selectedDate)
            }}
          />
        )}

        {/* Wrapper containing visible task date and button for setting date */}
        {/* Button opens the date picker */}
        <View style={styles.dateWrapper}>
          <Text>{getDate(date)}</Text>
          <Button
            title='Set date'
            onPress={() => setIsDatePickerVisible(true)}
          />
        </View>
          
        {/* A button for setting task picture */}
        {/* Opens the camera view */}
        <View style={styles.button}>
          <Button title='Take a pic' onPress={() => setIsCameraVisible(true)} />
        </View>

        {/* A button for setting task location */}
        {/* Opens the map view */}
        <View style={styles.button}>
          <Button
            title='Set coordinate'
            onPress={() => setIsMapsVisible(true)}
          />
        </View>

        {/* Task picture taken from camera view */}
        <Image source={{ uri: image }} style={styles.image} />

        {/* Button container for closing and saving task */}
        <View style={styles.buttonContainer}>
          <Button title='Close' onPress={close} />
          <Button title='Save' onPress={save} />
        </View>
      </ScrollView>
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
  inputText: {
    borderBottomWidth: 1,
    borderColor: 'black',
    height: 40,
    width: '85%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 50,
  },
  button: {
    margin: 10,
  },
  picker: {
    width: 200,
    height: 50,
  },
  image: {
    width: 240,
    height: 180,
    borderColor: 'black',
    borderWidth: 2,
  },
  dateWrapper: {
    width: '85%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
})

export default EditTask
