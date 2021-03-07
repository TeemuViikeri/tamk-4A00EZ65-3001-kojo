import * as FileSystem from 'expo-file-system'
import { Dimensions } from 'react-native'

// Contains devices directory where images are being saved
export const IMAGE_DIRECTORY = FileSystem.documentDirectory + 'images/'
export const WINDOW_WIDTH = Dimensions.get('window').width
export const WINDOW_HEIGHT = Dimensions.get('window').height
