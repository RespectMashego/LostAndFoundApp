import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, StyleSheet, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from './colors';
import { useNavigation } from '@react-navigation/native';

const PostItemScreen = () => {
  const navigation = useNavigation();

  // Add a step state to control the current step
  const [step, setStep] = useState(1);

  const [itemName, setItemName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [postType, setPostType] = useState('lost');

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

    // Navigate back to the initial step after submission
    setStep(1);
  }

  // Add a function to handle moving to the next step
  const handleNextStep = () => {
    // Validate and move to the next step
    if (step === 1 && (!itemName || !category || !description)) {
      alert('Please fill in all fields.');
      return;
    }
    
    // You can add more validation for other steps if needed

    // Move to the next step
    setStep(step + 1);
  };

  // You can also navigate the user back to the feed or another screen
  // depending on your app's flow

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" color="#19204f" size={30} />
          </TouchableOpacity>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Post Lost or Found Item</Text>
        </View>
        <KeyboardAvoidingView style={styles.formContainer} behavior="padding">
          {step === 1 && ( // Show Step 1 inputs
            <View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Item Name</Text>
                <TextInput
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
                  value={category}
                  onChangeText={text => setCategory(text)}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Description</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter description"
                  value={description}
                  onChangeText={text => setDescription(text)}
                  multiline
                />
              </View>
            </View>
          )}

          {/* You can add more steps here using similar logic */}
          
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Post Type</Text>
            <View style={styles.radioContainer}>
              <TouchableOpacity
                style={[
                  styles.radioButton,
                  postType === 'lost' && styles.radioButtonSelected,
                ]}
                onPress={() => setPostType('lost')}
              >
                <Text style={styles.radioButtonText}>Lost</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.radioButton,
                  postType === 'found' && styles.radioButtonSelected,
                ]}
                onPress={() => setPostType('found')}
              >
                <Text style={styles.radioButtonText}>Found</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
      <View style={styles.buttonContainer}>
        {step < 3 ? ( // Show Continue button for steps 1 and 2
          <TouchableOpacity style={styles.continueButton} onPress={handleNextStep}>
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.submitButton} onPress={handlePostItem}>
            <Text style={styles.submitButtonText}>Create Post</Text>
          </TouchableOpacity>
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
  scrollContainer: {
    flexGrow: 1,
  },
  header: {
    margin: 15,
    flexDirection: 'row',
    alignItems: 'center',
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
    marginTop: 20,
  },
  inputContainer:{
          marginBottom:20
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
    marginLeft: 10,
    color: colors.primary.darkblue,
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
  continueButton: {
    backgroundColor: colors.primary.blue,
    borderRadius: 20,
    paddingVertical: 13,
    paddingHorizontal: 30,
    width: '93%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  continueButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  submitButton: {
    backgroundColor: colors.primary.blue,
    borderRadius: 20,
    paddingVertical: 13,
    paddingHorizontal: 30,
    width: '93%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  radioContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    columnGap:10,
    marginTop: 10,
  },
  radioButton: {
    flex: 1,
    backgroundColor: 'white',
    borderColor: colors.primary.blue,
    borderWidth: 2,
    borderRadius: 20,
    paddingVertical: 10,
    alignItems: 'center',
  },
  radioButtonSelected: {
    backgroundColor: colors.primary.blue,
  },
  radioButtonText: {
    fontWeight: '600',
    color: colors.primary.darkblue,
  },
});

export default PostItemScreen;
