import React, { useEffect, useState } from 'react'
import AppStack from './navigation/AppStack'
import AuthStack from './navigation/AuthStack'
import { useDispatch, useSelector } from 'react-redux';
import { getItem } from './util/asyncStorage';
import { setUser } from './redux/userSlice';


const AppNavigation = () => {

    // const [user, setUserForApp] = useState(null)
    const dispatch = useDispatch()

    const user = useSelector((state) => state.user.user);
    // const token = useSelector((state) => state.user.token);
    // console.log("token", token);


    const checkUserExsits = async () => {
        const userFromAysncStorage = await getItem("user")
        const token = await getItem("token")
        console.log(token);
        if (userFromAysncStorage) {
            const user = JSON.parse(userFromAysncStorage)
            dispatch(setUser({ user, token }))


        }



    }
    useEffect(() => {
        checkUserExsits()

    }, [])




    console.log("user", user);
    return (
        user ? <AppStack /> : <AuthStack />

    )
}

export default AppNavigation