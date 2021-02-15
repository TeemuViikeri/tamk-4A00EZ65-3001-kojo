import { Animated, View, StyleSheet, Easing } from 'react-native'
import React, { useRef, useEffect } from 'react'

const LoadingAnimation = (props) => {
  // Define variable that contains animation spin value through re-renders
  const spinValue = useRef(new Animated.Value(0))

  // Makes the spin animation and loops it
  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue.current, {
        // To what value animation will point towards
        toValue: 1,
        // Duration how long the animation should take
        duration: props.duration,
        // Define an easing function which will specify in what speed the animation moves from start to finish
        easing: Easing.inOut(Easing.sin),
        // Use native OS/UI driver to run the animation more smoothly 
        useNativeDriver: true,
      })
    ).start()
  }, [spinValue])

  // Interpolate spin animation's input range (0..1) into degrees (0deg..360deg)
  const spin = () => {
    return spinValue.current.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    })
  }

  return (
    <View>
      <Animated.Image
        source={require('../assets/loading.png')}
        // Apply the rotation animation to image via transform CSS property
        // rotate property gets its value from spin() function that interpolates value into a proper rotation value
        style={[styles.image, { transform: [{ rotate: spin() }] }]}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
  },
})

export default LoadingAnimation
