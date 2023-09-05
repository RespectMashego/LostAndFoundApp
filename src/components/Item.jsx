import React from 'react';
import { View, Text, TouchableOpacity, Image, Dimensions, StyleSheet } from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

const Item = () => {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: 'https://m.media-amazon.com/images/I/71h8ATGZZpL.jpg' }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Keys</Text>
        <View style={styles.locationContainer}>
          <FontAwesome6 name="location-dot" color="green" size={20} />
          <Text style={styles.locationText}>Library</Text>
        </View>
        <Text style={styles.timestamp}>54 mins ago</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width * 0.4,
    elevation: 2,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    backgroundColor: '#edeff7',
    borderRadius: 10,
  },
  imageContainer: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    aspectRatio: 1, // Set the aspect ratio to maintain the original image's proportions
  },
  contentContainer: {
    padding: 10,
  },
  title: {
    color: '#040824',
    fontSize: 18,
    fontWeight: '500',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  locationText: {
    color: '#040824',
    marginLeft: 5,
  },
  timestamp: {
    color: '#040824',
    fontSize: 12,
    fontWeight: '300',
    marginTop: 5,
  },
});

export default Item;
