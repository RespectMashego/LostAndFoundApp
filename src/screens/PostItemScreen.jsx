import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, StyleSheet, ScrollView, ActivityIndicator, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';
import { colors } from './colors';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Loader from '../components/Loader';


const PostItemScreen = () => {

  const [step, setStep] = useState(1);
  const [itemName, setItemName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [selectedImages, setSelectedImages] = useState(Array(4).fill(null));
  const [postType, setPostType] = useState('found');
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [location, setLocation] = useState("")
  const [contact, setContact] = useState("")
  const [loading, setLoading] = useState("")
  const navigation = useNavigation()

  console.log(selectedImages);

  const handlePostItem = async () => {
    setLoading(!loading
    )
    const formData = new FormData();
    formData.append('itemName', itemName);
    formData.append('category', category);
    formData.append('description', description);
    formData.append('location', location);
    formData.append('contact', contact);
    formData.append('postType', postType);

    // Loop through selectedImages and append each image to formData
    selectedImages.forEach((image, index) => {
      if (image) {
        const filename = `image${index}.jpg`;
        const file = {
          uri: image.path,
          type: 'image/jpeg',
          name: filename,
        };
        formData.append(`images`, file);
      }
    });

    try {
      const response = await axios.post('http://192.168.74.44:3000/api/item', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        console.log('Item posted successfully');
      } else {
        console.log('Failed to post item');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false)
    }

    // Reset the form fields after submitting
    setItemName('');
    setCategory('');
    setDescription('');
    setLocation('');
    setContact(""),
      setLocation()

    // Navigate back to the initial step after submission
    navigation.navigate('FeedScreen');
  };


  const handleNextStep = () => {
    // Validate and move to the next step
    if (step === 1 && (!itemName || !category || !description || !contact || !location)) {
      alert('Please fill in all fields.');
      return;
    }
    if (step === 2 && (!selectedImages)) {
      alert('Please select at least one image of the item');
    }

    // You can add more validation for other steps if needed

    // Move to the next step
    setStep(step + 1);
  };

  const handleImageSelection = async () => {
    try {
      if (!isCameraOpen) {
        const images = await ImagePicker.openPicker({
          multiple: true,
          mediaType: 'photo',
        });

        // Distribute selected images into empty slots
        const newImages = [...selectedImages];
        images.forEach((image, index) => {
          console.log(image);
          const emptySlotIndex = newImages.findIndex((img) => img === null);
          if (emptySlotIndex !== -1) {
            newImages[emptySlotIndex] = image;
          }
        });

        setSelectedImages(newImages);
      }
    } catch (error) {
      console.error('ImagePicker Error:', error);

    }
  };

  const handleOpenCamera = () => {
    setIsCameraOpen(true);

    ImagePicker.openCamera({
      includeBase64: true,
    })
      .then((image) => {
        // Find the first empty slot and insert the image
        const newImages = [...selectedImages];
        const emptySlotIndex = newImages.findIndex((img) => img === null);
        if (emptySlotIndex !== -1) {
          newImages[emptySlotIndex] = image;
          setSelectedImages(newImages);
        }
      })
      .catch((error) => {
        console.error('Camera Error:', error);
      })
      .finally(() => {
        setIsCameraOpen(false);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Loader loading={loading} />

        <KeyboardAvoidingView style={styles.formContainer} behavior="padding">
          {step === 1 && (
            <>
              <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                  <Ionicons name="arrow-back" color="#19204f" size={30} />
                </TouchableOpacity>
              </View>
              <View>

                <View style={styles.titleContainer}>
                  <Text style={styles.title}>Post Lost or Found Item</Text>
                </View>
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
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Contact Information</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter Contact information"
                    value={contact}
                    onChangeText={text => setContact(text)}
                    multiline
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Location</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter Location you found or lost the item"
                    value={location}
                    onChangeText={text => setLocation(text)}
                    multiline
                  />
                </View>
                {/* <View style={styles.inputContainer}>
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
                </View> */}
              </View>
            </>


          )}

          {step === 2 && (
            <View>
              <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => setStep(step - 1)}>
                  <Ionicons name="arrow-back" color="#19204f" size={30} />
                </TouchableOpacity>
              </View>
              <Text style={styles.label}>Add Pictures</Text>
              <View style={styles.imageContainer}>
                {selectedImages.map((image, index) => (
                  <View key={index} style={styles.imageBox}>
                    {image ? (
                      <Image
                        source={{ uri: image?.path }}
                        style={styles.selectedImage}
                        resizeMode="cover" // Add resizeMode
                      />
                    ) : (
                      <Ionicons name="image-outline" size={50} color="gray" />
                    )}
                  </View>
                ))}
              </View>
              <TouchableOpacity style={styles.selectImageButton} onPress={handleImageSelection}>
                <Text style={styles.selectImageButtonText}>Select from Gallery</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.selectImageButton} onPress={handleOpenCamera}>
                <Text style={styles.selectImageButtonText}>Capture Photo</Text>
              </TouchableOpacity>
              {isCameraOpen && <ActivityIndicator size="large" color="#19204f" />}
            </View>
          )}
          {/* {step === 3 && (<View>
            <View style={styles.header}>
              <TouchableOpacity style={styles.backButton} onPress={() => setStep(step - 1)}>
                <Ionicons name="arrow-back" color="#19204f" size={30} />
              </TouchableOpacity>
            </View>
            <View>

              <Text style={{
                color: colors.primary.darkblue,
                fontSize: 19,
                fontWeight: "700",
                marginBottom: 20,
                marginLeft: 5

              }}>User Info</Text>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your Name"
                value={itemName}
                onChangeText={text => setItemName(text)}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>User Number</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your number"
                value={itemName}
                onChangeText={text => setItemName(text)}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Item Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter item name"
                value={itemName}
                onChangeText={text => setItemName(text)}
              />
            </View>


          </View>)

          } */}

        </KeyboardAvoidingView>
      </ScrollView>
      <View style={styles.buttonContainer}>
        {step < 2 ? (
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
    marginBottom: 20
  },
  formContainer: {
    flex: 1,
    margin: 10,
    marginTop: 20,
  },
  inputContainer: {
    marginBottom: 20,
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
    columnGap: 10,
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
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: "space-around",
    marginTop: 10,

  },
  imageBox: {

    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#e8e8e8',
    borderWidth: 2,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 10,
    height: 180,
    marginRight: 1
  },
  selectedImage: {
    width: '100%',
    height: '100%',
    margin: 50


  },
  selectImageButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary.blue,
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 20,
    width: "80%",
    alignSelf: 'center',
    marginTop: 10,
  },
  selectImageButtonText: {
    color: 'white',
    fontWeight: '600',
  },
});

export default PostItemScreen;
