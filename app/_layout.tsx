import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import {createStackNavigator} from '@react-navigation/stack';

import { useColorScheme } from '@/hooks/useColorScheme';
import HomeScreen from "@/app/screens/home/home";
import ValidateAccountScreen from "@/app/screens/site/validateAccount";
import NotFoundScreen from "@/app/screens/site/notFound";
import ForgotPasswordScreen from "@/app/screens/auth/forgotPassword";
import RegisterScreen from "@/app/screens/auth/register";
import LoginScreen from "@/app/screens/auth/login";
import ProfileScreen from "@/app/screens/profile/profile";
import StatsScreen from "@/app/screens/profile/stats";

const Stack = createStackNavigator();

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack.Navigator initialRouteName="screens/home/home">
        <Stack.Screen name="screens/home/home" options={{title: 'Home', headerShown: false, gestureEnabled: false}}
                      component={HomeScreen}/>

        {/*PROFILE*/}
        <Stack.Screen name="screens/profile/stats" options={{title: 'Stats', headerShown: false, gestureEnabled: false}}
                      component={StatsScreen}/>
        <Stack.Screen name="screens/profile/profile"
                      options={{title: 'Profile', headerShown: false, gestureEnabled: false}}
                      component={ProfileScreen}/>
        {/*AUTH*/}
        <Stack.Screen name="screens/auth/login" options={{title: 'Login', headerShown: false, gestureEnabled: false}}
                      component={LoginScreen}/>
        <Stack.Screen name="screens/auth/register"
                      options={{title: 'Register', headerShown: false, gestureEnabled: false}}
                      component={RegisterScreen}/>
        <Stack.Screen name="screens/auth/forgotPassword"
                      options={{title: 'Forgot password', headerShown: false, gestureEnabled: false}}
                      component={ForgotPasswordScreen}/>
        {/*SITE*/}
        <Stack.Screen name="screens/site/notFound"
                      options={{title: 'Not found', headerShown: false, gestureEnabled: false}}
                      component={NotFoundScreen}/>
        <Stack.Screen name="screens/site/validateAccount"
                      options={{title: 'Validate account', headerShown: false, gestureEnabled: false}}
                      component={ValidateAccountScreen}/>
      </Stack.Navigator>
    </ThemeProvider>
  );
}
