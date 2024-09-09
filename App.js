import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import BuildingForm from './screens/BuildingForm';
import CapturingTaps from './screens/CapturingTaps';
import CustomComponent from './screens/CustomComponent';
import LongList from './screens/LongList';
import ScrollableContent from './screens/ScrollableContent';
import StateProps from './screens/StateProps';
import Styling from './screens/Styling';
import HelloWorld from './screens/helloWorld';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            switch (route.name) {
              case '1':
                iconName = 'home';
                break;
              case '2':
                iconName = 'hand-pointer-o';
                break;
              case '3':
                iconName = 'cogs';
                break;
              case '4':
                iconName = 'users';
                break;
              case '5':
                iconName = 'paint-brush';
                break;
              case '6':
                iconName = 'book';
                break;
              case '7':
                iconName = 'building';
                break;
              case '8':
                iconName = 'list';
                break;
              default:
                iconName = 'question';
            }

            return <FontAwesome name={iconName} size={size} color={color} />;
          },
          tabBarStyle: {
            backgroundColor: '#1f1f1f',  
            height: 100,                 
          },
          tabBarActiveTintColor: '#ff6347',  //focus
          tabBarInactiveTintColor: '#ccc',   //nofocus
          tabBarLabelStyle: {
          fontSize: 14,
          },
        })}
      >
        <Tab.Screen name="1" component={HelloWorld} />
        <Tab.Screen name="2" component={CapturingTaps} />
        <Tab.Screen name="3" component={CustomComponent} />
        <Tab.Screen name="4" component={StateProps} />
        <Tab.Screen name="5" component={Styling} />
        <Tab.Screen name="6" component={ScrollableContent} />
        <Tab.Screen name="7" component={BuildingForm} />
        <Tab.Screen name="8" component={LongList} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
