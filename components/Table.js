// Project and modules imports
import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { v4 as uuidv4 } from 'uuid'
// Custom component imports
import Row from './Row'

const Table = (props) => {
  // Initialize state variable 'size' from props
  const [size] = useState(props.size)

  // Initialize 'rows' array
  const rows = []
  // Add Row components to 'rows'
  for (let i = 0; i < size; i++) {
    // Use uuidv4() to give a unique key value
    // Send multiplier to Row to dynamically set the correct number as con
    rows[i] = <Row key={uuidv4()} size={size} multiplier={i * size} />
  }

  // Render
  return <View style={styles.table}>{rows}</View>
}

const styles = StyleSheet.create({
  table: {
    width: '100%',
  },
})

export default Table
