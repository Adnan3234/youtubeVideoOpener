// import 'react-native-gesture-handler';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ListContent from '../ListContent/ListContent';
const Stack = createNativeStackNavigator();

const Routes = ({ }) => {
    return (
        <Stack.Navigator initialRouteName='ListContent' >

            <Stack.Screen name='ListContent' component={ListContent} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
};
export default Routes
