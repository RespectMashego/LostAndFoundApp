import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
};

const ItemView = () => {
    const route = useRoute()
    const item = route?.params.item
    const navigation = useNavigation()
    const itemImages = item?.images
    const [thumbnailImages, setThumbnailImages] = useState(item?.images) // Placeholder icons
    const [activeThumbnailIndex, setActiveThumbnailIndex] = useState(0)
    console.log(thumbnailImages);
    const [mainImage, setMainImage] = useState(item?.images[0]);




    const handleThumbnailPress = (image, index) => {
        setMainImage(image)
        setActiveThumbnailIndex(index)

    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" color="#19204f" size={30} />
            </TouchableOpacity>
            <Image
                source={{ uri: mainImage }}
                style={styles.image}
                resizeMode="cover"
            />
            <View style={styles.thumbnailContainer}>
                {thumbnailImages?.map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => handleThumbnailPress(item, index)}
                        style={index === activeThumbnailIndex && styles.activeThumbnail}
                    >
                        <Image style={styles.thumbnailIcon} source={{ uri: item }} />
                        {/* <FontAwesome name={icon} size={48} /> */}
                    </TouchableOpacity>
                ))}
            </View>
            <View style={styles.detailsContainer}>
                <Text style={styles.title}>Item Name:{item?.itemName}</Text>
                <Text style={styles.location}>Location:{item?.location}</Text>
                <Text style={styles.timestamp}>posted at {new Date(item.createdAt).toLocaleString(undefined, options)}</Text>
                <Text style={styles.description}>Description:{item.description}</Text>
                <Text style={styles.itemType}>Item Type: {item?.postType}</Text>
                <Text style={styles.itemType}>Contact Information : {item?.contact}</Text>
                {/* <Text style={styles.postType}>Post Type: {item.postType}</Text>
                <TouchableOpacity style={styles.contactButton} onPress={handleContactPress}>
                    <Text style={styles.contactButtonText}>Contact</Text>
                </TouchableOpacity> */}
                {/* Add more item details here */}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F8F8',
    },
    activeThumbnail: {
        borderWidth: 2,
        borderColor: "red",
        borderRadius: 12
    },
    image: {
        flex: 1, // Add this line to make the image expand and center vertically and horizontally
        alignSelf: 'center', // Add this line to center horizontally within its parent
        aspectRatio: 1,
        marginVertical: 35,
        borderRadius: 25,
        elevation: 5,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        borderRadius: 10,

    },
    thumbnailContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginTop: 16,



    },
    thumbnailIcon: {
        width: 60,
        height: 60,
        borderRadius: 10,
        // marginBottom: 8,
        backgroundColor: '#edeff7', // Background color for the icon
        textAlign: 'center',
        lineHeight: 60,

    },
    detailsContainer: {
        marginTop: 16,
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#040824',
    },
    location: {
        fontSize: 20,
        color: 'green',
        marginBottom: 8,
    },
    timestamp: {
        fontSize: 16,
        color: '#555',
        marginBottom: 12,
    },
    description: {
        fontSize: 18,
        lineHeight: 28,
        color: '#333',
        marginBottom: 16,
    },
    itemType: {
        fontSize: 18,
        color: '#555',
        marginBottom: 8,
    },
    postType: {
        fontSize: 18,
        color: '#555',
        marginBottom: 16,
    },
    contactButton: {
        backgroundColor: '#040824',
        paddingVertical: 16,
        paddingHorizontal: 32,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 16,
    },
    contactButtonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
    backButton: {
        marginTop: 20,
        marginLeft: 20
    }
    // Add styles for additional item details here
});

export default ItemView;
