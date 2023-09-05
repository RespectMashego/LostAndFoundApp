import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const demoItem = {
    title: 'Keys',
    location: 'Library',
    timestamp: '54 mins ago',
    description: 'A set of keys found near the front entrance.',
    contact: 'John Doe (johndoe@example.com)',
    itemType: 'Book',
    postType: 'Found',
    // Add more item details here
};

const ItemView = ({ item = demoItem }) => {
    const [mainImage] = useState('https://m.media-amazon.com/images/I/71h8ATGZZpL.jpg');
    const thumbnailIcons = ['image', 'image', 'image',"image"]; // Placeholder icons

    const handleThumbnailPress = (image) => {
        // Handle changing the main image when a thumbnail is pressed
        // You can implement this logic if needed
    };

    const handleContactPress = () => {
        // Implement your contact logic here
        // For example, you can open an email client with the contact email
        // or show a contact form.
    };

    return (
        <View style={styles.container}>
            <Image
                source={{ uri: mainImage }}
                style={styles.image}
                resizeMode="cover"
            />
            <View style={styles.thumbnailContainer}>
                {thumbnailIcons.map((icon, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => handleThumbnailPress(item.thumbnailImages[index])}
                    >
                        <FontAwesome name={icon} size={48} style={styles.thumbnailIcon} />
                    </TouchableOpacity>
                ))}
            </View>
            <View style={styles.detailsContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.location}>{item.location}</Text>
                <Text style={styles.timestamp}>{item.timestamp}</Text>
                <Text style={styles.description}>{item.description}</Text>
                <Text style={styles.itemType}>Item Type: {item.itemType}</Text>
                <Text style={styles.postType}>Post Type: {item.postType}</Text>
                <TouchableOpacity style={styles.contactButton} onPress={handleContactPress}>
                    <Text style={styles.contactButtonText}>Contact</Text>
                </TouchableOpacity>
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
    image: {
        width: '100%',
        aspectRatio: 1, // This maintains the aspect ratio of the image
    },
    thumbnailContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        marginTop: 16,
    },
    thumbnailIcon: {
        width: 60,
        height: 60,
        borderRadius: 10,
        marginBottom: 8,
        backgroundColor: '#edeff7', // Background color for the icon
        textAlign: 'center',
        lineHeight: 60,
    },
    detailsContainer: {
        marginTop: 16,
        padding: 16,
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
    // Add styles for additional item details here
});

export default ItemView;
