// Project components
import { StatusBar } from 'expo-status-bar'
import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Button } from 'react-native'
import Constants from 'expo-constants'
import * as FileSystem from 'expo-file-system'
import { v4 as uuidv4 } from 'uuid'

// Custom components
import CameraView from './components/CameraView'
import EditTask from './components/EditTask'
import ItemList from './components/ItemList'

import { IMAGE_DIRECTORY } from './data/Constants'
import { Priority } from './data/Enums'
import { loadTasks, saveTasks } from './data/TaskStorage'

export default function App() {
  const [tasks, setTasks] = useState([])
  const [isEditViewVisible, setEditViewVisibility] = useState(false)
  const [selectedTask, setSelectedTask] = useState(undefined)
  const [isCameraVisible, setIsCameraVisible] = useState(false)
  const [images, setImages] = useState([])

  // Load data from persisten storage (AsyncStorage) and set them to 'tasks'
  const loadData = async () => {
    // console.log('Loading tasks')
    let tasks = await loadTasks()
    // console.log(tasks)
    // console.log('Tasks loaded')
    setTasks(tasks)

    let pics = await loadPics()
    setImages(pics)
    // console.log(pics)
  }

  const loadPics = async () => {
    let dir = await FileSystem.readDirectoryAsync(IMAGE_DIRECTORY)
    let pics = []
    dir.forEach((val) => {
      pics.push(IMAGE_DIRECTORY + val)
    })

    return pics
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
  const addTaskHandler = (title, text, date, location, picPath, priority) => {
    // TODO
    let task = createTask(title, text, date, location, picPath, priority)

    // If there is a selected task defined...
    if (selectedTask !== undefined) {
      // Store title as current selectedTask's title
      selectedTask.title = title
      // Get tasks that aren't the selectedTask
      let updatedTasks = tasks.filter((task) => task.key !== selectedTask.key)
      setTasks([...updatedTasks, task])
    } else {
      // Set new task to 'tasks'
      setTasks([...tasks, task])
    }

    // Set showEdit
    showEditView(false)
  }

  // Function which creates a task object
  createTask = (title, text, date, location, picPath, priority) => {
    return {
      key: uuidv4(),
      title,
      text,
      date,
      location,
      picPath,
      priority,
    }
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

  // Function to toggle edit viewa
  const showEditView = (isShown) => {
    if (!isShown) {
      setSelectedTask(undefined)
    }

    setEditViewVisibility(isShown)
  }

  const closeCamera = () => {
    setIsCameraVisible(false)
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
        task={selectedTask}
      />

      <Button title='Add task' onPress={() => showEditView(true)} />

      <CameraView isVisible={isCameraVisible} onClosePressed={closeCamera} />

      <Button title='Open camera' onPress={() => setIsCameraVisible(true)} />
    </View>
  )
}

const stylesLight = StyleSheet.create({
  root: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    height: '100%',
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
