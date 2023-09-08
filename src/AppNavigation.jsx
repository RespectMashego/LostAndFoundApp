import React from 'react'
import AppStack from './navigation/AppStack'
import AuthStack from './navigation/AuthStack'
import {useSelector} from 'react-redux';

const AppNavigation = () => {

    const user = useSelector((state) => state.user.user);
    console.log("user",user);
    return (
        user ? <AppStack /> : <AuthStack />

    )
}

export default AppNavigation