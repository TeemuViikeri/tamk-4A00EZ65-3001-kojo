// Project components
import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import { StyleSheet, View, ScrollView, FlatList } from 'react-native'
import Constants from 'expo-constants'
import uuid from 'uuid'

// Custom components
import InputText from './components/InputText'
import ItemList from './components/ItemList'

export default function App() {
  // Declare a variable 'tasks' and a Hook 'setTasks'
  // Initiate 'tasks' with empty array
  const [tasks, setTasks] = useState([])

  // Function for adding a new to 'tasks' via 'setTasks' Hook
  const addTaskHandler = (task) => {
    // Generate UUID (Universally unique identifier) for task's key
    setTasks([...tasks, { key: uuid.v4(), text: task }])
  }

  // Function for deleting a 'tasks' via 'setTasks' Hook
  const deleteTaskHandler = (id) => {
    // filter() creates a new array with all elements that pass the test implemented by the provided function
    setTasks(tasks.filter((task) => task.key !== id))
  }

  return (
    <View style={stylesLight.root}>
      <View style={stylesLight.statusBar}>
        <StatusBar style='auto' />
      </View>

      {/* 
        Create input field for adding task 
        Send addTaskHandler() as a prop to InputText as a submit event function 
      */}
      <InputText submitText='OK' onSubmitPressed={addTaskHandler} />
      {/* 
        Create a list container for added task items
        Send deleteTaskHandler() as a prop to ItemList as a press and delete event function 
      */}
      <ItemList data={tasks} itemPressHandler={deleteTaskHandler} />
    </View>
  )
}

const stylesLight = StyleSheet.create({
  root: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    height: '100%',
    // The default status bar height for the device
    paddingTop: Constants.statusBarHeight,
  },
  statusBar: {
    // height: Constants.statusBarHeight
  },
  text: {
    width: 100,
    color: 'black',
  },
})

const stylesDark = StyleSheet.create({
  root: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'black',
    height: '100%',
  },
  text: {
    width: 100,
    color: '#FFF',
  },
})
