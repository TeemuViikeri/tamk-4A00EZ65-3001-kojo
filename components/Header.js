// Project and modules imports
import React from 'react'
import { View, StyleSheet } from 'react-native'
// Custom component imports
import RobotoText from './RobotoText'

const Header = (props) => {
  return (
    <View style={styles.container}>
      {/* Use custom text component which will turn into a header throught isHeader prop */}
      <RobotoText isHeader={true}>{props.headerText}</RobotoText>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
  },
})

export default Header
