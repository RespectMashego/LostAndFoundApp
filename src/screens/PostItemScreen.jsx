import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, StyleSheet, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from './colors';
import { useNavigation } from '@react-navigation/native';


const PostItemScreen = () => {
  const navigation = useNavigation()
  const [itemName, setItemName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');

  const handlePostItem = () => {
    // Handle submitting the item to the backend
    // You can use this state to send the data to your API
    const newItem = {
      itemName,
      category,
      description,
      // Add other properties here
    };

    // Reset the form fields after submitting
    setItemName('');
    setCategory('');
    setDescription('');

    // You can also navigate the user back to the feed or another screen
    // depending on your app's flow
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" color="#19204f" size={30} />
            {/* <Text style={styles.backButtonText}>Home</Text> */}
          </TouchableOpacity>

        </View>
        <View style={styles.titleContainer}>
          <Text className="underline " style={styles.title}>Post Lost or Found Item</Text>
        </View>
        <KeyboardAvoidingView style={styles.formContainer} behavior="padding">
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Item Name</Text>
            <TextInput
              placeholderTextColor={colors.primary.darkblue}
              style={styles.input}
              placeholder="Enter item name"
              value={itemName}
              onChangeText={text => setItemName(text)}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Category</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter category"
              placeholderTextColor={colors.primary.darkblue}
              value={category}
              onChangeText={text => setCategory(text)}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              placeholderTextColor={colors.primary.darkblue}
              style={styles.input}
              placeholder="Enter description"
              value={description}
              onChangeText={text => setDescription(text)}
              multiline
            />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.submitButton} onPress={handlePostItem}>
          <Text style={styles.submitButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  header: {
    margin: 15,
    flexDirection:"row",
    alignItems:"center"
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButtonText: {
    color: '#19204f',
    fontSize: 17,
    fontWeight: '500',
    marginLeft: 5,
  },
  titleContainer: {
    justifyContent: 'center',
    marginLeft: 20,

  },
  title: {
    fontSize: 19,
    fontWeight: 'bold',
    color: colors.primary.darkblue,
    
  },
  formContainer: {
    flex: 1,
    margin: 10,
    marginTop:20
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
    marginLeft: 10,
    color: colors.primary.darkblue
  },
  input: {
    backgroundColor: '#f0f0f0',
    borderColor: '#e8e8e8',
    borderWidth: 2,
    borderRadius: 20,
    paddingLeft: 15,
    paddingVertical: 10,

  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,

  },
  submitButton: {
    backgroundColor: colors.primary.blue,
    borderRadius: 20,
    paddingVertical: 13,
    paddingHorizontal: 30,
    width: "93%",
    justifyContent: "center",
    alignItems: "center"

  },
  submitButtonText: {
    color: 'white',
    fontWeight: '600',
  },
});

export default PostItemScreen;
