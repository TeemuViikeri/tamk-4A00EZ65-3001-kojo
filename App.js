// Project components
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, View } from 'react-native'
// Custom components
import Header from './components/Header'
import TextContainer from './components/TextContainer'
import Table from './components/Table'

export default function App() {
  return (
    <View style={styles.container}>
      <Header headerText='Otsikko' />
      <TextContainer />
      {/* Render table component with size 3 (3x3) */}
      <Table size={3} />
      {/* Controls the appearance of the status bar while app is running ('auto' sets color by system) */}
      <StatusBar style='auto' />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    margin: 8,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
