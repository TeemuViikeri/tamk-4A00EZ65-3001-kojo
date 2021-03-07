// Imports
import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, View, Button, Modal, Image } from 'react-native'
import { Camera } from 'expo-camera'
import * as FileSystem from 'expo-file-system'
import RobotoText from './RobotoText'
import LoadingAnimation from './LoadingAnimation'
import ImageRoll from './ImageRoll'
import {
  IMAGE_DIRECTORY,
  WINDOW_WIDTH,
  WINDOW_HEIGHT,
} from '../data/Constants/'

// Constants
const FRONT_CAMERA = 'front'
const BACK_CAMERA = 'back'

export default CameraView = (props) => {
  // Hooks
  const [hasCameraPermission, setHasCameraPermission] = useState(undefined)
  const [cameraType, setCameraType] = useState(BACK_CAMERA)
  const [picturesList, setPicturesList] = useState()
  // Refs
  const camera = useRef(undefined)

  // Load pictures into picturesList hook when mounting this component
  useEffect(() => {
    loadPictures()
  }, [])

  // Loads pictures from image directory to paths hook
  const loadPictures = async () => {
    try {
      const paths = await FileSystem.readDirectoryAsync(IMAGE_DIRECTORY)
      setPicturesList(paths)
    } catch (error) {
      console.log(error)
    }
  }

  // Sets boolean value to hasCameraPermission if permission to camera usage was granted by the user
  const onShowCamera = () => {
    const getPermission = async () => {
      const { status } = await Camera.requestPermissionsAsync()
      setHasCameraPermission(status === 'granted')
    }

    getPermission()
  }

  // Toggle camera type to cameraType hook
  const toggleCameras = () => {
    const type = cameraType === FRONT_CAMERA ? BACK_CAMERA : FRONT_CAMERA
    setCameraType(type)
  }

  // Takes a picture with device's camera
  const snap = () => {
    const snapAsync = async () => {
      if (camera !== undefined) {
        try {
          // Take a photo which is saved to cache
          const photo = await camera.current.takePictureAsync()
          // Get metadata of the image directory
          let imageFolderInfo = await FileSystem.getInfoAsync(IMAGE_DIRECTORY)

          // If image folder doesn't exists...
          if (!imageFolderInfo.exists) {
            try {
              // Create the directory
              await FileSystem.makeDirectoryAsync(IMAGE_DIRECTORY, {
                intermediates: true,
              })
            } catch (error) {
              console.log(error)
            }
          }
          // Set photos file name as current datetime integer representation
          const photoName = Date.now().toString() + '.jpg'
          // Create the full path of the photo file
          const fullPath = IMAGE_DIRECTORY + photoName

          try {
            // Move file from temporary cache location to permament storage
            await FileSystem.moveAsync({ from: photo.uri, to: fullPath })
            // Load pictures from the storage to picturesList hook
            loadPictures()
            // Set picture path to EditTask hook state 
            if (props.onPicTaken !== undefined) {
              props.onPicTaken(fullPath)
            }
          } catch (error) {
            console.log(error)
          }
        } catch (error) {
          console.log(error)
        }
      }
    }

    snapAsync()
  }

  // If camera permission hasn't been denied or given...
  if (hasCameraPermission === undefined) {
    // Show Modal where the permission to camera is asked from the user
    return (
      <Modal
        onShow={onShowCamera}
        animationType='fade'
        visible={props.isVisible}
        onRequestClose={props.onClosePressed}
      >
        <View>
          <LoadingAnimation
            duration={1000}
            style={{ width: 400, height: 400 }}
          />
          <RobotoText>Waiting for camera permission</RobotoText>
        </View>
      </Modal>
    )
    // If user didn't give camera permission
  } else if (hasCameraPermission === false) {
    // Show Modal which tells no permission hasn't been given to camera
    return (
      <Modal
        animationType='fade'
        visible={props.isVisible}
        onRequestClose={props.onClosePressed}
      >
        <View style={styles.root}>
          <RobotoText>No access to camera</RobotoText>
        </View>
      </Modal>
    )
    // If user gave camera permission
  } else {
    // Show Modal where camera is being used
    return (
      <Modal
        animationType='fade'
        visible={props.isVisible}
        onRequestClose={props.onClosePressed}
      >
        <View style={styles.root}>
          <View style={styles.topButtonsContainer}>
            <Button title='Switch' onPress={toggleCameras} />
          </View>
          <Camera ref={camera} style={styles.camera} type={cameraType}></Camera>
          <View style={styles.bottomButtonsContainer}>
            <Button title='Snap' onPress={snap} />
          </View>
          <ImageRoll paths={picturesList} />
        </View>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  root: {},
  topButtonsContainer: {
    height: 35,
  },
  camera: {
    width: WINDOW_WIDTH,
    height: (4 / 3) * WINDOW_WIDTH,
  },
  bottomButtonsContainer: {
    height: 35,
  },
  prevPic: {
    width: 120,
    height: 90,
  },
})
