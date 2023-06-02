import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { useColorScheme } from 'react-native';
import { Main } from '../screens/Main';
import { getEnvironment } from '../environment';
import { useAuth0 } from '../utils/auth0';
import ApiClient from '../services/api/ApiClient';

const RootStack = createStackNavigator();

export const Navigation = () => {
  const { isAuthenticated, token } = useAuth0();
  const colorScheme = useColorScheme();
  const environment = getEnvironment();
  const apiClient: ApiClient = new ApiClient(token, environment.tenant, `https://${environment.apiUrl}`, '987654321')
  const anonymousClient: ApiClient = new ApiClient('anonymous', environment.tenant, `https://${environment.apiUrl}`, '987654321')

  return <NavigationContainer>
    <RootStack.Navigator screenOptions={({ route }) => {
      return {
        gestureEnabled: true, cardOverlayEnabled: false, headerShown: false, headerStyle: {
          backgroundColor: colorScheme === 'dark' ? '#35363A' : '#fff'
        }, ...TransitionPresets.ModalFadeTransition
      }
    }}>
      <RootStack.Screen options={{ headerShown: false}} name="Start">
      {(props) => <Main {...props} theme={colorScheme}></Main>}
    </RootStack.Screen>
    </RootStack.Navigator>
  </NavigationContainer>
}
