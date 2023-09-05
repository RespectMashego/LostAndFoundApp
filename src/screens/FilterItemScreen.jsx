import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Dimensions, StyleSheet, TextInput } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

const FilterItemScreen = () => {
  const [selectedFilter, setSelectedFilter] = useState('lost');
  const [searchText, setSearchText] = useState('');

  const navigation=useNavigation()

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
  };

  const handleSearch = (text) => {
    setSearchText(text);
    // You can add search functionality here
  };
  const handleBack=()=>{
    navigation.goBack()
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Ionicons name="arrow-back" color="#040824" size={30} />
        </TouchableOpacity>
        <View style={styles.searchBar}>
          <TextInput
            placeholder="Search"
            value={searchText}
            onChangeText={handleSearch}
            style={styles.searchInput}
          />
          <TouchableOpacity>
            <Feather name="search" color="#040824" size={24} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.filterButtons}>
        <TouchableOpacity
          style={[
            styles.filterButton,
            selectedFilter === 'lost' && styles.selectedFilter,
          ]}
          onPress={() => handleFilterChange('lost')}
        >
          <Text
            style={[
              styles.filterButtonText,
              selectedFilter === 'lost' && styles.selectedFilterText,
            ]}
          >
            Lost Items
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterButton,
            selectedFilter === 'found' && styles.selectedFilter,
          ]}
          onPress={() => handleFilterChange('found')}
        >
          <Text
            style={[
              styles.filterButtonText,
              selectedFilter === 'found' && styles.selectedFilterText,
            ]}
          >
            Found Items
          </Text>
        </TouchableOpacity>
      </View>
      {/* Add your filter options or other content here */}
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
