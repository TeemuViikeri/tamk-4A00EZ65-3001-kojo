// Project and modules imports
import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { v4 as uuidv4 } from 'uuid'
// Custom component imports
import Cell from './Cell'

const Row = (props) => {
  // Initialize state variables
  const [size] = useState(props.size)
  const [multiplier] = useState(props.multiplier)

  // Initialize 'cells' array
  const cells = []
  // Add Cell components to 'cells'
  for (let i = 0; i < size; i++) {
    // Use uuidv4() to give a unique key value
    // Use multiplier to calculate correct integer as content
    cells[i] = <Cell key={uuidv4()} content={multiplier + i + 1} />
  }

  // Render all Cell components from cells array
  return <View style={styles.row}>{cells}</View>
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    height: 100
  },
})

export default Row
