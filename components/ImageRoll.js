import React, { useEffect, useRef, useState } from 'react'
import { Animated, Button, Easing, Image, StyleSheet, View } from 'react-native'
import { IMAGE_DIRECTORY } from '../data/Constants'

const ImageRoll = (props) => {
  // Hooks
  const [pathsList, setPathslist] = useState(props.paths)
  const [currentImagePath, setCurrentImagePath] = useState(props.paths[0])
  // Ref
  const scaleAnim = useRef(new Animated.Value(1)).current

  // Sets pathslist again and re-renders when props' paths property is changed
  useEffect(() => {
    setPathslist(props.paths)
  }, [props.paths])

  // Animation function that scales image size up
  const scaleImage = () => {
    // Sets scale value back to default
    scaleAnim.setValue(0.9)

    Animated.timing(scaleAnim, {
      // To what value animation will point towards
      toValue: 1,
      // Duration how long the animation should take
      duration: 500,
      // Define an easing function which will specify in what speed the animation moves from start to finish
      easing: Easing.linear,
      // Use native OS/UI driver to run the animation more smoothly
      useNativeDriver: true,
    }).start()
  }

  // Changes currentImagePath to next path in the pathslist
  const changeToNextImage = () => {
    if (currentImagePath === pathsList[pathsList.length - 1]) {
      setCurrentImagePath(pathsList[0])
      scaleImage()
      return
    }

    let i = pathsList.indexOf(currentImagePath)
    setCurrentImagePath(pathsList[++i])
    scaleImage()
  }

  // Changes currentImagePath to previous path in the pathslist
  const changeToPrevImage = () => {
    if (currentImagePath === pathsList[0]) {
      setCurrentImagePath(pathsList[pathsList.length - 1])
      scaleImage()
      return
    }

    let i = pathsList.indexOf(currentImagePath)
    setCurrentImagePath(pathsList[--i])
    scaleImage()
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {pathsList.length != 0 ? (
          <Animated.Image
            fadeDuration={0}
            source={{ uri: IMAGE_DIRECTORY + currentImagePath }}
            style={[styles.image, { transform: [{ scale: scaleAnim }] }]}
          />
        ) : (
          <></>
        )}
      </View>
      {pathsList.length === 0 || pathsList.length === 1 ? (
        <></>
      ) : (
        <View style={styles.buttonContainer}>
          <Button
            onPress={() => changeToPrevImage()}
            title={'Previous'}
          ></Button>
          <Button onPress={() => changeToNextImage()} title={'Next'}></Button>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {},
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
})

export default ImageRoll
