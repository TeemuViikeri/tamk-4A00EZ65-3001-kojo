// Project and modules imports
import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
// Custom component imports
import RobotoText from './RobotoText'

const Cell = (props) => {
  // Initialize state variable 'content' from props
  const [content] = useState(props.content)

  return (
    <View style={styles.cell}>
      {/* Use custom text component */}
      <RobotoText>{content}</RobotoText>
    </View>
  )
}

const styles = StyleSheet.create({
  cell: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'black',
  },
})

export default Cell
