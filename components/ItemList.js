import React from 'react'
import {
  FlatList,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native'
import { Priority } from '../data/Enums'
import { WINDOW_WIDTH } from '../data/Constants'
import { getDate } from '../data/Utils'

const ITEM_MARGIN = 5

// Getter function for setting proper styling for tasks with different priority
const ItemList = (props) => {
  const getItemStyle = (priority) => {
    switch (priority) {
      case Priority.high:
        return styles.itemHigh
      case Priority.low:
        return styles.itemLow
      case Priority.medium:
      default:
        return styles.itemMedium
    }
  }

  return (
    <FlatList
      numColumns={2}
      contentContainerStyle={styles.container}
      // 'data' is a plain array which holds the data to be used in FlatList
      data={props.data}
      // Iterates over the items in 'data'
      // @item current 'data' item iterated
      // @index index of the current item in the array
      renderItem={({ item, index }) => {
        return (
          <TouchableOpacity
            // Open edit view of the selected item when pressed once
            onPress={() => props.onPress(item.key)}
            // Remove the item when long pressed
            onLongPress={() => props.onLongPress(item.key)}
            style={styles.touchArea}
          >
            <View
              // Every other item has colorized background
              style={[getItemStyle(item.priority), styles.itemCommon]}
            >
              {/* 
              A wrapper for making views respond properly to touches
              Every click has animation where opacity changes 
             */}
              <Text style={styles.headline}>{item.title}</Text>
              <Text style={styles.text}>{item.text}</Text>
              <Text style={styles.text}>{getDate(item.date)}</Text>
            </View>
          </TouchableOpacity>
        )
      }}
    />
  )
}

export default ItemList

const styles = StyleSheet.create({
  itemCommon: {
    height: 150,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    margin: ITEM_MARGIN,
    width: WINDOW_WIDTH / 2 - 2 * ITEM_MARGIN,
  },
  text: {},
  headline: {
    fontWeight: 'bold',
  },
  container: {
    width: '100%',
  },
  itemLow: {
    backgroundColor: 'green',
  },
  itemMedium: {
    backgroundColor: 'yellow',
  },
  itemHigh: {
    backgroundColor: 'red',
  },
  touchArea: {},
})
