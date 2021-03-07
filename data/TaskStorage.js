import AsyncStorage from '@react-native-async-storage/async-storage'
import { getPriority } from './Enums'

// Key to the storage where tasks are loaded
const STORAGE_KEY = 'Tasks'

// Returns loaded tasks from persistent storage if there are any
export const loadTasks = async () => {
  try {
    let tasks = await AsyncStorage.getItem(STORAGE_KEY)
    if (tasks == null) {
      tasks = []
    } else {
      // Parse tasks data back into JS object form and iterate over the tasks
      tasks = JSON.parse(tasks).map((task) => {
        // Set date property into Date object form
        task.date = new Date(task.date)
        // Set priority to Priority enum insted of integer
        task.priority = getPriority(task.priority)
        return task
      })

    }
    return tasks
  } catch (error) {
    console.log('Error fetching tasks ' + error)
    return []
  }
}

// Saves tasks to persistent storage with key 'STORAGE_KEY'
// NOTE: should this be async or not?
export const saveTasks = (tasks) => {
  // console.log(tasks);
  AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
}
