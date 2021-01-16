// Project and modules imports
import React, { useState } from 'react'
import { Text, StyleSheet } from 'react-native'

const RobotoText = (props) => {
  // Initialize isHeader which will store boolean value if the component should be header
  const [isHeader] = useState(props.isHeader)
  // Declare text variable which will store Text component
  let text
  // Create Text component depending on if it should be a header or not
  isHeader
    ? (text = (
        // Header text component is bolded and has numberOfLines limit value
        <Text style={[styles.text, { fontWeight: 'bold' }]} numberOfLines={1}>
          {props.children}
        </Text>
      ))
    : (text = <Text style={styles.text}>{props.children}</Text>)

  // Render Text component in variable 'text'
  return text
}

const styles = StyleSheet.create({
  text: {
    // IMPORTANT: some Android phones (like OnePlus and OPPO) have default system fonts which break word cutting (via Text component's numberOfLines/ellipsizeMode props)
    // This is the reason why this custom text component has been created: setting up own font to texts fixes the problem
    fontFamily: 'Roboto',
  },
})

export default RobotoText
