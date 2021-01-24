import React from 'react'
import { ScrollView, View, StyleSheet, TouchableOpacity } from 'react-native'
import RobotoText from './RobotoText'

const ItemList = (props) => {
  // Inititate 'index' variable
  let index = 0

  return (
    <ScrollView>
      {/*
        Use array.map() to create items to a list
      */}
      {props.data.map((item) => {
        // Increment index at every array element when iterating
        index++
        return (
          // Create View container for item
          <View
            // Use uuid as item's key
            key={item.key}
            // Use different styling for every other item
            style={index % 2 == 0 ? styles.itemEven : styles.itemOdd}
          >
            {/* 
              Make item pressable through Touchable component
              Use itemPressHandler from props as the press event handler
            */}
            <TouchableOpacity onPress={() => props.itemPressHandler(item.key)}>
              {/* 
                Use current array element's 'text' property as item's text content
              */}
              <RobotoText>{item.text}</RobotoText>
            </TouchableOpacity>
          </View>
        )
      })}
    </ScrollView>
  )
}

export default ItemList

const styles = StyleSheet.create({
  itemOdd: {
    backgroundColor: '#b2fffd',
  },
  itemEven: {
    backgroundColor: 'white',
  },
})
