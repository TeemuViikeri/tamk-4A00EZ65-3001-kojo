import React from 'react'
import { FlatList, View, StyleSheet, TouchableOpacity } from 'react-native'
import RobotoText from './RobotoText'

const ItemList = (props) => {
  return (
    <FlatList
      // 'data' is a plain array which holds the data to be used in FlatList
      data={props.data}
      // Iterates over the items in 'data'
      // @item current 'data' item iterated
      // @index index of the current item in the array
      renderItem={({ item, index }) => {
        return (
          <View
            // Every other item has colorized background
            style={[
              index % 2 == 0 ? styles.itemEven : styles.itemOdd,
              styles.itemCommon,
            ]}
          >
            {/* 
              A wrapper for making views respond properly to touches
              Every click has animation where opacity changes 
             */}
            <TouchableOpacity
              // Open edit view of the selected item when pressed once
              onPress={() => props.onPress(item.key)}
              // Remove the item when long pressed
              onLongPress={() => props.onLongPress(item.key)}
            >
              <RobotoText>{item.title}</RobotoText>
            </TouchableOpacity>
          </View>
        )
      }}
    />
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
  itemCommon: {
    height: 30,
    justifyContent: 'center',
  },
})
