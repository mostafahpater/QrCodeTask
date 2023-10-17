import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import QrCodeScanner from '../screens/QrCodeScanner';
import ResultScanner from '../screens/ResultScanner';
import AllResults from '../screens/AllResults';
import TabBar from './TabBar';

export default function NavigateScreen() {
    const Stack = createNativeStackNavigator();
  return (
   
     
        <Stack.Navigator>
            <Stack.Screen name='QrCodeScanner' component={QrCodeScanner}/>
            <Stack.Screen name='ResultScanner' component={ResultScanner}/>
            <Stack.Screen name='Results' component={AllResults}/>
        </Stack.Navigator>
   

  )
}

