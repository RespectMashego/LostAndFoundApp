import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {clearUser} from '../redux/userSlice';
import {getItem, removeItem} from '../util/asyncStorage';
import Loader from '../components/Loader';
import axios from 'axios';
import Item from '../components/Item';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {baseUrl} from '../util/baseUrl';
import {useNavigation, useRoute} from '@react-navigation/native';
import {colors} from './colors';

const LostFoundProfileScreen = () => {
  const [activeTab, setActiveTab] = useState('PostedItems');
  const [loading, setLoading] = useState(false);
  const [userPostedItems, setUserPostedItems] = useState([]);
  const [istherError, setIstheError] = useState(false);

  const [itemExists, setItemsExists] = useState(true);
  const dispatch = useDispatch();

  const user = useSelector(state => state.user.user);

  useEffect(() => {
    console.log(user);
  }, [user]);
  console.log('user', user);

  const fetchUserItems = async () => {
    setItemsExists(true);
    setIstheError(false);
    setLoading(true);
    const token = await getItem('token');
    console.log('token', token);
    try {
      const response = await axios(`${baseUrl}/user/posted-items`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const items = await response.data.userPostedItems;
      console.log('user items', items);
      if (response.status == 200) {
        if (items?.length > 0) {
          setUserPostedItems(items);
          setIstheError(false);
          setShowText(false);
        }
      } else if (response.status == 201) {
        setUserPostedItems(items);
        setItemsExists(false);
      }
    } catch (error) {
      console.error('error occured', error);
      setIstheError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserItems();
  }, []);

  const switchTab = tabName => {
    setActiveTab(tabName);
  };

  const handleLogout = async () => {
    try {
      setLoading(!loading);
      dispatch(clearUser());
      await removeItem('user');
      await removeItem('token');
    } catch (error) {
      console.error('Logout failed', error);
    } finally {
      setLoading(false);
    }
  };

  const renderTabContent = () => {
    if (activeTab === 'PostedItems') {
      return (
        <View style={styles.tabContent}>
          {/* Display the user's posted items here */}
          <View>
            <TouchableOpacity style={{}} onPress={fetchUserItems}>
              <MaterialIcons
                name="refresh"
                size={30}
                color={colors.primary.darkblue}
              />
            </TouchableOpacity>
          </View>
          {istherError ? (
            <View className="w-full items-center pt-11 justify-center mb-10">
              <Text className="font-medium text-lg mb-5">
                Failed to load items
              </Text>
              <TouchableOpacity
                onPress={fetchUserItems}
                className="flex-row px-2 w-[100px] rounded items-center bg-primary-blue">
                <Text className="text-md p-1 text-primary-white mr-1 text-lg ">
                  refresh
                </Text>
                <MaterialIcons name="refresh" size={25} color={'white'} />
                <TouchableOpacity
                  style={{}}
                  onPress={fetchUserItems}></TouchableOpacity>
              </TouchableOpacity>
            </View>
          ) : itemExists ? (
            <FlatList
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.listContainer}
              data={userPostedItems}
              style={{marginBottom: 10, height: '72%'}}
              numColumns={2}
              renderItem={({item}) => (
                <Item showBottomButtons={true} item={item} />
              )}
              keyExtractor={item => item._id}
            />
          ) : (
            <View>
              <Text style={{color: 'black', fontSize: 19}}>
                You have not posted items yet
              </Text>
            </View>
          )}
        </View>
      );
    } else if (activeTab === 'Notifications') {
      return (
        <View style={styles.tabContent}>
          {/* Display the user's notifications here */}
          {/* You can use a FlatList or any other component to display notifications */}
          <Text style={{color: 'black', fontSize: 19}}>
            Feature will be available in a next update
          </Text>
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      <Loader loading={loading} />
      {/* <Image
        source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbIhi9l4npCGPNWMAc6szDbxp75kjB3c0R5w&usqp=CAU" }}
        style={styles.profileImage}
        resizeMode="cover"
      />
      <Text style={styles.profileName}>{user?.username}</Text>
      <Text style={styles.profileName}>{user?.email}</Text> */}

      {/* <Text style={styles.profileBio}>Frontend Developer</Text> */}

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'PostedItems' && styles.activeTab]}
          onPress={() => switchTab('PostedItems')}>
          <Text style={styles.tabText}>Posted Items</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'Notifications' && styles.activeTab,
          ]}
          onPress={() => switchTab('Notifications')}>
          <Text style={styles.tabText}>Notifications</Text>
        </TouchableOpacity>
      </View>

      {renderTabContent()}

      {/* <TouchableOpacity style={styles.editButton}>
        <Text style={styles.editButtonText}>Edit Profile</Text>
      </TouchableOpacity> */}
      <TouchableOpacity
        className="bg-primary-blue rounded-xl   "
        onPress={handleLogout}>
        <Text className="text-primary-white px-6 py-3 text-[19px] ">
          Log out
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    height: Dimensions.get('window').height,

    alignItems: 'center',
  },
  listContainer: {
    flexGrow: 1,
    alignSelf: 'center',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  profileBio: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    position: 'relative',
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderColor: 'transparent',
  },
  tabText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  activeTab: {
    borderColor: '#3498db',
  },
  tabContent: {
    width: '100%',
    height: '77%',
    justifyContent: 'center',
    alignItems: 'center',

    overflow: 'hidden',
    // backgroundColor:"red"
  },
  editButton: {
    backgroundColor: '#3498db',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LostFoundProfileScreen;
