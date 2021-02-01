import React from 'react'
import { FlatList, View, StyleSheet, TouchableOpacity } from 'react-native'
import RobotoText from './RobotoText'

const ItemList = (props) => {
  return (
    <FlatList
      data={props.data}
      renderItem={({ item, index }) => {
        return (
          <View
            style={[
              index % 2 == 0 ? styles.itemEven : styles.itemOdd,
              styles.itemCommon,
            ]}
          >
            <TouchableOpacity
              onPress={() => props.onPress(item.key)}
              onLongPress={() => props.onLongPress(item.key)}
            >
              <RobotoText>{item.text}</RobotoText>
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
