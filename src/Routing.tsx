import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { Icon, theme } from 'native-base';
import { StatusBar } from 'react-native';
import { AnimatedTabBarNavigator } from 'react-native-animated-nav-tab-bar';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { HomeScreen } from '@/modules/home/HomeScreen';
import {
  navigate,
  navigationRef,
  useScreenFocus,
} from '@/utils/rootNavigation';

import { FavsScreen } from './modules/favs/FavsScreen';
import { MoviesScreen } from './modules/movies/MoviesScreen';

if (__DEV__ && process.env.NODE_ENV !== 'test') {
  const DevMenu = require('react-native-dev-menu');
  DevMenu.addItem('Storybook', () => navigate('Storybook'));
  DevMenu.addItem('Network helper', () => navigate('NetworkHelper'));
}

const Tabs = AnimatedTabBarNavigator();

const Routing = () => {
  useScreenFocus();

  return (
    <NavigationContainer ref={navigationRef}>
      <StatusBar barStyle="light-content" />
      <Tabs.Navigator
        initialRouteName="Home"
        // default configuration from React Navigation
        tabBarOptions={{
          activeTintColor: theme.colors.gray[900],
          inactiveTintColor: theme.colors.gray[100],
          activeBackgroundColor: theme.colors.gray[100],
          labelStyle: { display: 'none', width: 0 },
        }}
        appearance={{
          floating: true,
          tabBarBackground: theme.colors.gray[800],
          dotSize: 'small',
        }}
      >
        <Tabs.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ focused, color }) => (
              <Icon
                as={MaterialCommunityIcons}
                name="movie-open"
                color={focused ? color : theme.colors.gray[100]}
                size={8}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="Movies"
          component={MoviesScreen}
          options={{
            tabBarIcon: ({ focused, color }) => (
              <Icon
                as={MaterialCommunityIcons}
                name="ticket"
                color={focused ? color : theme.colors.gray[100]}
                size={8}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="Favorites"
          component={FavsScreen}
          options={{
            tabBarIcon: ({ focused, color }) => (
              <Icon
                as={Feather}
                name="heart"
                color={focused ? color : theme.colors.gray[100]}
                size={8}
              />
            ),
          }}
        />
      </Tabs.Navigator>
    </NavigationContainer>
  );
};

export default Routing;
