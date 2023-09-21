import React, { useState } from 'react';
import { View, Text, FlatList, SafeAreaView, TouchableOpacity, StyleSheet, TextInput, Button } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import Item from '../components/Item';
import { baseUrl } from '../util/baseUrl';
import Loader from '../components/Loader';
import { colors } from './colors';
import { useNavigation } from '@react-navigation/native';

const FilterItemScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState(''); // Initialize locationFilter
  const [categoryFilter, setCategoryFilter] = useState(''); // Initialize categoryFilter
  const [filterdItems, setFilteredItems] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation()

  const filterItemsfromBackend = async () => {
    if (searchQuery || locationFilter || categoryFilter) {
      try {
        setLoading(true);

        const filters = {
          name: searchQuery,
          location: locationFilter,
          category: categoryFilter,
        };

        const filteredFilters = Object.keys(filters).reduce((acc, key) => {
          if (filters[key]) {
            acc[key] = filters[key];
          }
          return acc;
        }, {});

        const response = await axios.get(`${baseUrl}/filter`, {
          params: filteredFilters,
        });

        setLoading(false);

        if (response.status !== 200) {
          console.error("Network response was not ok");
        } else {
          const data = response.data.items || [];

          if (data.length > 0) {
            setFilteredItems(data);
          } else {
            setFilteredItems([]);
          }
        }
      } catch (error) {
        setLoading(false);
        console.error("Error:", error);
      }
    } else {
      setFilteredItems(null);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={()=>navigation.goBack()}>
          <Ionicons size={25} name="arrow-back" color={colors.primary.darkblue} />
        </TouchableOpacity>
        <View style={styles.searchBar}>
          <TextInput
            placeholder="Item Name"
            value={searchQuery}
            onChangeText={text => setSearchQuery(text)}
            style={styles.searchInput}
          />
          <TextInput
            placeholder="Location"
            value={locationFilter}
            onChangeText={text => setLocationFilter(text)} // Update locationFilter
            style={styles.filterInput}
          />
          <TextInput
            placeholder="Category"
            value={categoryFilter}
            onChangeText={text => setCategoryFilter(text)} // Update categoryFilter
            style={styles.filterInput}
          />
          <TouchableOpacity style={styles.filterButton} onPress={filterItemsfromBackend}>
            <Text style={styles.filterButtonText}>Filter</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.content}>
        {loading ? (
          <Loader loading={loading} />
        ) : filterdItems !== null ? (
          filterdItems.length > 0 ? (
            <FlatList
              contentContainerStyle={{ flexGrow: 1 }}
              data={filterdItems}
              style={{ marginBottom: 70 }}
              numColumns={2}
              renderItem={({ item }) => <Item item={item} />}
              keyExtractor={item => item._id}
            />
          ) : (
            <View style={styles.noItemsFound}>
              <Text>No items found</Text>
            </View>
          )
        ) : (
          <View style={styles.noItemsFound}>
            <Text>Search items by name</Text>
          </View>
        )}
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingHorizontal: 5,
    flex: 1,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 10,
  },
  filterInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 10,
    marginLeft: 10,
  },
  filterButton: {
    backgroundColor: colors.primary.darkblue,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  filterButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noItemsFound: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default FilterItemScreen;
