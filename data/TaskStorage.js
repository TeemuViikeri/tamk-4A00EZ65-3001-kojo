import AsyncStorage from '@react-native-async-storage/async-storage'

const STORAGE_KEY = 'Tasks'

// Returns loaded tasks from persistent storage if there are any
export const loadTasks = async () => {
  try {
    let tasks = await AsyncStorage.getItem(STORAGE_KEY)
    if (tasks == null) {
      tasks = []
    } else {
      tasks = JSON.parse(tasks)
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
  AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
}
