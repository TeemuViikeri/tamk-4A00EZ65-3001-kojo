// Project components
import { StatusBar } from 'expo-status-bar'
import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Button } from 'react-native'
import Constants from 'expo-constants'
import uuid from 'uuid'

// Custom components
import EditTask from './components/EditTask'
import ItemList from './components/ItemList'
import Timer from './components/Timer'

export default function App() {
  const [tasks, setTasks] = useState([])
  const [isEditViewVisible, setEditViewVisibility] = useState(false)
  const [selectedTask, setSelectedTask] = useState(undefined)

  // Function for adding a new to 'tasks' via 'setTasks' Hook
  const addTaskHandler = (task) => {
    // If there is a selected task defined...
    if (selectedTask !== undefined) {
      // Store 'task' argument to selected task's 'text' property 
      selectedTask.text = task
    } else {
      // Generate UUID (Universally unique identifier) for task's key
      setTasks([...tasks, { key: uuid.v4(), text: task }])
    }

    // Set showEdit
    showEditView(false)
  }

  const onRemove = (key) => {
    // Remove item from 'tasks' which has correct key property
    setTasks(tasks.filter((item) => item.key !== key))
  }

  const onItemPressed = (key) => {
    // Store the task with the correct key property to the 'currentTask' variable
    let currentTask = tasks.find((task) => task.key == key)
    // Set 'currentTask' as the selected task
    setSelectedTask(currentTask)
    // Open edit view window
    showEditView(true)
  }

  const showEditView = (isShown) => {
    // If isShown argument is 'false', don't show selected task's window on screen
    if (!isShown) {
      setSelectedTask(undefined)
    }

    // Open or close edit view window 
    setEditViewVisibility(isShown)
  }

  return (
    <View style={stylesLight.root}>
      <View style={stylesLight.statusBar}>
        <StatusBar style='auto' />
      </View>
      <View>
        <Timer time={5} func={() => console.log("STOP")}/>
      </View>
      <ItemList data={tasks} onPress={onItemPressed} onLongPress={onRemove} />
      <EditTask
        onSubmitPressed={addTaskHandler}
        isVisible={isEditViewVisible}
        closeView={() => showEditView(false)}
        // If selected task isn't undefined, send current selected task's 'text' property as a prop
        text={selectedTask !== undefined ? selectedTask.text : undefined}
      />
      <Button title='Add task' onPress={() => showEditView(true)} />
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
  time: {},
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
