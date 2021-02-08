import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import RobotoText from './RobotoText'

export default function Timer(props) {
  const [time, setTime] = useState(props.time)
  const [isActive, setIsActive] = useState(true)

  useEffect(() => {
    let intervalId

    // If 'isActive' is true and 'time' is 0...
    if (isActive && time === 0) {
      // Set isActive to false
      setIsActive((prevIsActive) => !prevIsActive)
    }

    // If 'isActive' is true
    if (isActive) {
      // Let setInterval() run and decrease timer by one per second
      intervalId = setInterval(() => setTime((prevTime) => prevTime - 1), 1000)
    }

    return () => {
      // Clears interval running when component unmounts.
      clearInterval(intervalId)
    }
    // Run useEffect() again only when 'time' state variable changes
  }, [time])

  useEffect(() => {
    // setTimeout() calls func() once from props after the time has passed
    setTimeout(() => props.func(), props.time * 1000)
    // Pass '[]' as one argument so that the useEffect is only called once, when the component is mount
  }, [])

  return (
    <View>
      {/* Display timer only when timer is active */}
      {isActive ? <RobotoText align={'center'}>{time}</RobotoText> : <></>}
    </View>
  )
}
