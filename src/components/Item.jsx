import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, TouchableOpacity, Image, Dimensions, StyleSheet } from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

const Item = ({ item }) => {
    const navigation = useNavigation()
    const options = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
    };
    const handleItemView = () => {
        navigation.navigate("ItemViewScreen", { item: item })
    }
    return (
        <TouchableOpacity style={styles.container} onPress={handleItemView}>
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: item.images[0] }}
                    style={styles.image}
                    resizeMode="cover"
                />
            </View>
            <View style={styles.contentContainer}>
                <Text style={styles.title}>{item.itemName}</Text>
                <View style={styles.locationContainer}>
                    <FontAwesome6 name="location-dot" color="green" size={20} />
                    <Text style={styles.locationText}>{item.location}</Text>
                </View>
                <Text style={styles.timestamp}>{new Date(item.createdAt).toLocaleString(undefined, options)}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width * 0.4,
        elevation: 2,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        backgroundColor: '#edeff7',
        borderRadius: 10,
        margin: 13

    },
    imageContainer: {
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        aspectRatio: 1, // Set the aspect ratio to maintain the original image's proportions
    },
    contentContainer: {
        padding: 10,
    },
    title: {
        color: '#040824',
        fontSize: 18,
        fontWeight: '500',
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    locationText: {
        color: '#040824',
        marginLeft: 5,
    },
    timestamp: {
        color: '#040824',
        fontSize: 12,
        fontWeight: '300',
        marginTop: 5,
    },
});

export default Item;
