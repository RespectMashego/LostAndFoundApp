import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, SafeAreaView, TouchableOpacity, Dimensions, StyleSheet, TextInput } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios'; // Import axios if not already imported
import Item from '../components/Item';

const FilterItemScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterdItems, setFilteredItems] = useState([]); // Initialize with an empty array
  const navigation = useNavigation();

  useEffect(() => {
    // Call the filtering function when the component mounts
    filterItemsfromBackend();
  }, []);

  const filterItemsfromBackend = async () => {
    try {
      const respond = await axios.get(`${baseUrl}/apilfilter/${searchQuery}`);

      if (!respond.ok) {
        console.error("Network respond was not ok");
      }

      const data = respond?.data.items || []; // Ensure data is an array
      console.log(data);
      setFilteredItems(data);
    } catch (error) {
      console.error("error", error);
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Ionicons name="arrow-back" color="#040824" size={30} />
        </TouchableOpacity>
        <View style={styles.searchBar}>
          <TextInput
            placeholder="Search"
            value={searchQuery}
            onChangeText={text => setSearchQuery(text)} // Update searchQuery
            onBlur={filterItemsfromBackend} // Trigger filtering when input loses focus
            style={styles.searchInput}
          />
          <TouchableOpacity onPress={filterItemsfromBackend}>
            <Feather name="search" color="#040824" size={24} />
          </TouchableOpacity>
        </View>
      </View>
      <View className="flex-1 items-center justify-center">
        {
          filterdItems.length > 0 ?
            <FlatList
              contentContainerStyle={{ flexGrow: 1 }}
              data={filterdItems}
              style={{ marginBottom: 70 }}
              numColumns={2}
              renderItem={({ item }) => <Item item={item} />}
              keyExtractor={item => item._id}
            /> :
            <View className="items-center justify-center ">
              <Text>
                Search  Text
              </Text>

            </View>

        }

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 20,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingHorizontal: 10,
    flex: 1,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  filterButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
  },
  filterButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#040824',
    marginHorizontal: 10,
  },
  filterButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#040824',
  },
  selectedFilter: {
    backgroundColor: '#040824',
  },
  selectedFilterText: {
    color: 'white',
  },
});

export default FilterItemScreen;
