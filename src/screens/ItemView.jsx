import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { baseUrl } from '../util/baseUrl';
import Loader from '../components/Loader';
import { getItem } from '../util/asyncStorage';

const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
};

const ItemView = () => {
    const route = useRoute()
    const { item, showBottomButtons } = route?.params || {}
    console.log("showBottomButtons", showBottomButtons);
    const navigation = useNavigation()


    const itemImages = item?.images
    const [thumbnailImages, setThumbnailImages] = useState(item?.images) // Placeholder icons
    const [activeThumbnailIndex, setActiveThumbnailIndex] = useState(0)
    const [loading, setLoading] = useState(false)
    console.log(thumbnailImages);
    const [mainImage, setMainImage] = useState(item?.images[0]);
    const deleteItem = async () => {
        setLoading(true)
        const token = await getItem("token")
        {
            try {
                const response = await axios.delete(`${baseUrl}/api/item/${item._id}`, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                })
                if (response.status = 200) {
                    console.log("item was succesfuly deleted");

                } else {
                    console.error("error occured when deleting an ite m")
                }

            }
            catch (error) {
                console.error("Error", error)

            }
            finally {
                setLoading(false)
            }

        }

    }
    const editItem = () => {
        navigation.navigate('PostItemScreen', {
            item: item,
            update: true

        })

    }




    const handleThumbnailPress = (image, index) => {
        setMainImage(image)
        setActiveThumbnailIndex(index)

    };

    const BoxDetails = ({ fieldName, info }) => {
        return (<View className=" flex-col items-center  justify-between">
            <View className=" w-full flex-row items-center mt-5 mb-5 justify-between  ">
                <Text className="text-[16px]">{fieldName}</Text>
                <Text className="text-[16px]">{info}</Text>
            </View>
            <View className="w-full h-[1px] bg-primary-darkblue" />

        </View>)

    }

    return (
        <SafeAreaView style={styles.container}>
            <Loader loading={loading} />
            <View className="flex-row items-center justify-center h-10 ">
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" color="#19204f" size={35} />
                </TouchableOpacity>
                <Text className="text-primary-darkblue text-xl font-bold">{item?.itemName}</Text>
            </View>

            <View style={styles.imageContainer}>

                <Image
                    source={{ uri: mainImage }}
                    style={styles.image}
                    resizeMode="cover"
                />
                <Text className="text-primary-white font-bold text-lg absolute bottom-2 left-2 ">{item?.itemName}</Text>
            </View>

            <View style={styles.thumbnailContainer}>
                {thumbnailImages?.map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => handleThumbnailPress(item, index)}
                        style={[
                            styles.thumbnailIcon,
                            index === activeThumbnailIndex && styles.activeThumbnail,
                        ]}
                    >
                        <Image style={styles.thumbnailImage} source={{ uri: item }} />
                    </TouchableOpacity>
                ))}
            </View>
            <ScrollView style={styles.detailsContainer}>

                <BoxDetails fieldName="Item Name" info={item.itemName} />
                <BoxDetails fieldName="Category" info={item.category} />
                <BoxDetails fieldName="Description" info={item.description} />
                <BoxDetails fieldName="Location" info={item.location} />
                <BoxDetails fieldName="Contact" info={item.contact} />
                <BoxDetails
                    fieldName="Date"
                    info={new Date(item.createdAt).toLocaleString(undefined, options)}
                />
            </ScrollView>
            {showBottomButtons &&
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity style={styles.button} onPress={() => markAsFound()}>
                        <FontAwesome name="check" color="#fff" size={20} />
                        <Text style={styles.buttonText}> Found</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => editItem()}>
                        <Ionicons name="create-outline" color="#fff" size={20} />
                        <Text style={styles.buttonText}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => deleteItem()}>
                        <Ionicons name="create-outline" color="#fff" size={20} />
                        <Text style={styles.buttonText}>Delete</Text>
                    </TouchableOpacity>
                </View>
            }


        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },

    activeThumbnail: {
        borderWidth: 2,
        borderColor: '#19204f',
        borderRadius: 12
    },
    imageContainer: {
        width: '100%',
        height: 300,
        justifyContent: 'center',
        alignItems: 'center',


        backgroundColor: "lightgrey"
    },
    image: {
        flex: 1,
        // aspectRatio: 1,

        width: '100%',
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
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 2,
    },
    thumbnailImage: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },
    detailsContainer: {

        padding: 20,

        backgroundColor: '#fff',

    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#19204f',
        marginBottom: 8,
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
    contact: {
        fontSize: 18,
        color: '#555',
        marginBottom: 16,
    },
    contactButton: {
        backgroundColor: '#19204f',
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
        color: '#fff',
    },
    backButton: {
        position: "absolute",
        left: 0
    },
    button: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'between',
        backgroundColor: '#19204f',
        borderRadius: 10,
        marginHorizontal: 5,
        padding: 10,
        // paddingHorizontal:10

    },
    buttonText: {
        color: '#fff',
        marginLeft: 5,
    },
    buttonsContainer: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'space-between',
        paddingHorizontal: 25,
        marginVertical: 16,
    },
});

export default ItemView;