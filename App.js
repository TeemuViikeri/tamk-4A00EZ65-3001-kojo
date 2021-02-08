// Project components
import { StatusBar } from 'expo-status-bar'
import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Button } from 'react-native'
import Constants from 'expo-constants'
import { v4 as uuidv4 } from 'uuid'

// Custom components
import EditTask from './components/EditTask'
import ItemList from './components/ItemList'
import { loadTasks, saveTasks } from './data/TaskStorage'
import { Priority } from './data/Enums'

export default function App() {
  const [tasks, setTasks] = useState([])
  const [isEditViewVisible, setEditViewVisibility] = useState(false)
  const [selectedTask, setSelectedTask] = useState(undefined)

  // Load data from persisten storage (AsyncStorage) and set them to 'tasks' 
  const loadData = async () => {
    console.log('Loading tasks')
    let tasks = await loadTasks()
    console.log(tasks);
    console.log('Tasks loaded')
    setTasks(tasks)
  }

  // Load data only once when application is started
  useEffect(() => {
    loadData()
  }, [])

  // Save tasks every time there is a change to 'tasks'
  useEffect(() => {
    saveTasks(tasks)
  }, [tasks])

  // Function for adding a new to 'tasks' via 'setTasks' Hook
  const addTaskHandler = (title) => {
    // If there is a selected task defined...
    if (selectedTask !== undefined) {
      // Store title as current selectedTask's title
      selectedTask.title = title
      saveTasks()
    } else {
      // Create new task object
      task = {
        key: uuidv4(),
        title,
        text: "",
        date: new Date(2021, 2, 28),
        location: {
          latitude: '60',
          longitude: '60',
        },
        picPath: './assets/favicon.png',
        priority: Priority.none,
      }
      // Set new task to 'tasks'
      setTasks([...tasks, task])
    }

    // Set showEdit
    showEditView(false)
  }

  // Function for removing a task from 'tasks'
  const onRemove = (key) => {
    // Remove item from 'tasks' which has the corresponding key property
    setTasks(tasks.filter((item) => item.key !== key))
  }

  // Event function for when an item is pressed
  const onItemPressed = (key) => {
    // Store the task with the correct key property to the 'currentTask' variable
    let currentTask = tasks.find((task) => task.key == key)
    // Set 'currentTask' as the selected task
    setSelectedTask(currentTask)
    // Open edit view window
    showEditView(true)
  }

  // Function to toggle edit view
  const showEditView = (isShown) => {
    !isShow ? setSelectedTask(undefined) : setEditViewVisibility(isShown)
  }

  return (
    <View style={stylesLight.root}>
      <View style={stylesLight.statusBar}>
        <StatusBar style='auto' />
      </View>
      <ItemList data={tasks} onPress={onItemPressed} onLongPress={onRemove} />
      <EditTask
        onSubmitPressed={addTaskHandler}
        isVisible={isEditViewVisible}
        closeView={() => showEditView(false)}
        // If selected task isn't undefined, send current selected task's 'title' property as a prop
        text={selectedTask !== undefined ? selectedTask.title : undefined}
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
