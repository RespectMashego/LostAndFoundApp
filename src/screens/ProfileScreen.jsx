import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch } from 'react-redux';
import { clearUser } from '../redux/userSlice';
import { removeItem } from '../util/asyncStorage';
import Loader from '../components/Loader';

const LostFoundProfileScreen = () => {
  const [activeTab, setActiveTab] = useState('PostedItems');
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

  const switchTab = (tabName) => {
    setActiveTab(tabName);
  };


  const handleLogout = async () => {
    try {
      setLoading(!loading)
      dispatch(clearUser())
      await removeItem("user")
      await removeItem("token")
    }
    catch (error) {
      console.error('Logout failed', error);
    } finally {
      setLoading(false)
    }

  }

  const renderTabContent = () => {
    if (activeTab === 'PostedItems') {
      return (
        <View style={styles.tabContent}>
          {/* Display the user's posted items here */}
          {/* You can use a FlatList or any other component to display the items */}
          <Text>Your Posted Items</Text>
        </View>
      );
    } else if (activeTab === 'Notifications') {
      return (
        <View style={styles.tabContent}>
          {/* Display the user's notifications here */}
          {/* You can use a FlatList or any other component to display notifications */}
          <Text>Your Notifications</Text>
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      <Loader loading={loading}/>
      <Image
        source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbIhi9l4npCGPNWMAc6szDbxp75kjB3c0R5w&usqp=CAU" }}
        style={styles.profileImage}
        resizeMode="cover"
      />
      <Text style={styles.profileName}>John Doe</Text>
      <TouchableOpacity className="bg-primary-blue rounded-xl   " onPress={handleLogout}>
        <Text className="text-primary-white px-6 py-3 text-[19px] ">
          Log out
        </Text>
      </TouchableOpacity>
      {/* <Text style={styles.profileBio}>Frontend Developer</Text> */}

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'PostedItems' && styles.activeTab,
          ]}
          onPress={() => switchTab('PostedItems')}
        >
          <Text style={styles.tabText}>Posted Items</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'Notifications' && styles.activeTab,
          ]}
          onPress={() => switchTab('Notifications')}
        >
          <Text style={styles.tabText}>Notifications</Text>
        </TouchableOpacity>
      </View>

      {renderTabContent()}

      {/* <TouchableOpacity style={styles.editButton}>
        <Text style={styles.editButtonText}>Edit Profile</Text>
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    alignItems: 'center',
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
    marginBottom: 20,
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
