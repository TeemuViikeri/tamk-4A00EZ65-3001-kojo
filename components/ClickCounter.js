import React, { useState } from 'react'
import { View, Text, Button } from 'react-native'
import RobotoText from './RobotoText'

const ClickCounter = () => {
  const [count, setCount] = useState(0)

  const onButtonPressHandler = () => {
    setCount(count + 1)
  }

  return (
    <View>
      <RobotoText>You clicked {count} times</RobotoText>
      <Button onPress={onButtonPressHandler} title='Increase' />
    </View>
  )
}

export default ClickCounter
