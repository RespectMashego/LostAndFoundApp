import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  TextInput,
  ScrollView,
  FlatList,
  Modal,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Item from '../components/Item';
import { colors } from './colors';
import axios from 'axios';
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import Loader from '../components/Loader';

const FeedScreen = () => {
  const [isFilterModalVisible, setFilterModalVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false)

  const [feedItems, setFeedItems] = useState([])

  const toggleFilterModal = () => {
    setFilterModalVisible(!isFilterModalVisible);
  };

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
  };

  const handleLocationChange = (location) => {
    setSelectedLocation(location);
  };

  const handleTypeChange = (type) => {
    setSelectedType(type);
  };

  const handleSearch = (text) => {
    setSearchText(text);
    // You can add search functionality here
  };
  const fetchItems = async () => {

    setLoading(true)
    try {
      const response = await axios.get("http://192.168.74.44:3000/api/feed")
      const items = await response.data.items

      if (response.status == 200) {
        console.log(items);
        setFeedItems(items)
        console.log("feed items fetched sucessfully")
      } else {
        console.log("failed to fetch items")
      }


    }
    catch (error) {
      console.error("error", error)
    }
    finally {
      setLoading(false)
    }

  }

  useEffect(() => {

    fetchItems()

  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={{}} onPress={fetchItems}>
          <MaterialIcons name="refresh" size={25} color={colors.primary.darkblue} />
        </TouchableOpacity>
        <View style={styles.searchBar}>
          <View style={styles.searchInput}>
            <TextInput
              placeholder="Search"
              value={searchText}
              onChangeText={handleSearch}


            />
            <TouchableOpacity style={{}}>
              <Feather name="search" size={25} color={colors.primary.darkblue} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={toggleFilterModal} style={styles.filterButton}>
            <Ionicons name="filter" color="#fff" size={24} />
          </TouchableOpacity>
        </View>
      </View>
      {/* <ScrollView
        contentContainerStyle={{
          height: '100%',
          flexDirection: 'row',
          flexWrap: 'wrap',
          marginTop: 40,
          alignItems: 'center',
          gap: 23,
          width: '100%',
        }}
        style={{
          paddingHorizontal: Dimensions.get('window').width * 0.07,
        }}
      >
        <Item />
        <Item />
        <Item />
        <Item />
      </ScrollView> */}
      <Loader loading={loading} />

      <FlatList
        contentContainerStyle={styles.listContainer}
        data={feedItems}
        style={{ marginBottom: 70 }}
        numColumns={2}
        renderItem={({ item }) => <Item item={item} />}
        keyExtractor={item => item.id}
      />

      {/* Filter Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isFilterModalVisible}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Filter Options</Text>

            {/* Filter by Lost or Found */}
            <View style={styles.filterGroup}>
              <Text style={styles.filterLabel}>Filter by:</Text>
              <View style={styles.filterDropdown}>
                <TouchableOpacity
                  style={[
                    styles.filterOption,
                    selectedFilter === 'all' && styles.selectedFilterOption,
                  ]}
                  onPress={() => handleFilterChange('all')}
                >
                  <Text
                    style={[
                      styles.filterOptionText,
                      selectedFilter === 'all' && styles.selectedFilterOptionText,
                    ]}
                  >
                    All
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.filterOption,
                    selectedFilter === 'lost' && styles.selectedFilterOption,
                  ]}
                  onPress={() => handleFilterChange('lost')}
                >
                  <Text
                    style={[
                      styles.filterOptionText,
                      selectedFilter === 'lost' && styles.selectedFilterOptionText,
                    ]}
                  >
                    Lost
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.filterOption,
                    selectedFilter === 'found' && styles.selectedFilterOption,
                  ]}
                  onPress={() => handleFilterChange('found')}
                >
                  <Text
                    style={[
                      styles.filterOptionText,
                      selectedFilter === 'found' && styles.selectedFilterOptionText,
                    ]}
                  >
                    Found
                  </Text>
                </TouchableOpacity>
                {/* Add more filter options here */}
              </View>
            </View>

            {/* Filter by Location */}
            <View style={styles.filterGroup}>
              <Text style={styles.filterLabel}>Filter by Location:</Text>
              <View style={styles.filterDropdown}>
                <TouchableOpacity
                  style={[
                    styles.filterOption,
                    selectedLocation === 'all' && styles.selectedFilterOption,
                  ]}
                  onPress={() => handleLocationChange('all')}
                >
                  <Text
                    style={[
                      styles.filterOptionText,
                      selectedLocation === 'all' && styles.selectedFilterOptionText,
                    ]}
                  >
                    All
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.filterOption,
                    selectedLocation === 'city' && styles.selectedFilterOption,
                  ]}
                  onPress={() => handleLocationChange('city')}
                >
                  <Text
                    style={[
                      styles.filterOptionText,
                      selectedLocation === 'city' && styles.selectedFilterOptionText,
                    ]}
                  >
                    City
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.filterOption,
                    selectedLocation === 'suburb' && styles.selectedFilterOption,
                  ]}
                  onPress={() => handleLocationChange('suburb')}
                >
                  <Text
                    style={[
                      styles.filterOptionText,
                      selectedLocation === 'suburb' && styles.selectedFilterOptionText,
                    ]}
                  >
                    Suburb
                  </Text>
                </TouchableOpacity>
                {/* Add more location filter options here */}
              </View>
            </View>

            {/* Filter by Type */}
            <View style={styles.filterGroup}>
              <Text style={styles.filterLabel}>Filter by Type:</Text>
              <View style={styles.filterDropdown}>
                <TouchableOpacity
                  style={[
                    styles.filterOption,
                    selectedType === 'all' && styles.selectedFilterOption,
                  ]}
                  onPress={() => handleTypeChange('all')}
                >
                  <Text
                    style={[
                      styles.filterOptionText,
                      selectedType === 'all' && styles.selectedFilterOptionText,
                    ]}
                  >
                    All
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.filterOption,
                    selectedType === 'book' && styles.selectedFilterOption,
                  ]}
                  onPress={() => handleTypeChange('book')}
                >
                  <Text
                    style={[
                      styles.filterOptionText,
                      selectedType === 'book' && styles.selectedFilterOptionText,
                    ]}
                  >
                    Book
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.filterOption,
                    selectedType === 'phone' && styles.selectedFilterOption,
                  ]}
                  onPress={() => handleTypeChange('phone')}
                >
                  <Text
                    style={[
                      styles.filterOptionText,
                      selectedType === 'phone' && styles.selectedFilterOptionText,
                    ]}
                  >
                    Phone
                  </Text>
                </TouchableOpacity>
                {/* Add more type filter options here */}
              </View>
            </View>

            {/* Apply Button */}
            <TouchableOpacity style={styles.applyButton} onPress={toggleFilterModal}>
              <Text style={styles.applyButtonText}>Apply Filters</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    alignItems: 'center',


  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 20,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    flex: 1,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    backgroundColor: 'white',
    marginRight: 15,
    borderRadius: 10000,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10

  },
  listContainer: {
    flexGrow: 1,


  },
  filterButton: {
    backgroundColor: '#040824',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 1000000,
  },
  filterButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  // Modal Styles
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    width: '80%',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  filterGroup: {
    marginBottom: 20,
  },
  filterLabel: {
    fontSize: 16,
    marginBottom: 5,
  },
  filterDropdown: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  filterOption: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#040824',
    marginHorizontal: 5,
    marginBottom: 5,
  },
  filterOptionText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#040824',
  },
  selectedFilterOption: {
    backgroundColor: '#040824',
  },
  selectedFilterOptionText: {
    color: 'white',
  },
  applyButton: {
    backgroundColor: '#040824',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  applyButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FeedScreen;
