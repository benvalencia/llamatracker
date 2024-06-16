import {DarkTheme, DefaultTheme, ThemeProvider} from '@react-navigation/native';
import {useFonts} from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import {useEffect} from 'react';
import 'react-native-reanimated';
import {createStackNavigator} from '@react-navigation/stack';
import {useColorScheme} from '@/hooks/useColorScheme';
import HomeScreen from "@/app/screens/home/home";
import ValidateAccountScreen from "@/app/screens/site/validateAccount";
import NotFoundScreen from "@/app/screens/site/notFound";
import ForgotPasswordScreen from "@/app/screens/auth/forgotPassword";
import RegisterScreen from "@/app/screens/auth/register";
import LoginScreen from "@/app/screens/auth/login";
import ProfileScreen from "@/app/screens/profile/profile";
import StatsScreen from "@/app/screens/profile/stats";
import {Button, Pressable} from "react-native";
import {router} from "expo-router";
import {AntDesign} from "@expo/vector-icons";
import ShopScreen from "@/app/screens/shop/shop";
import AppScreen from "@/app/screens/app";
import NewsScreen from "@/app/screens/news/news";
import SettingsScreen from "@/app/screens/settings/settings";
import ItemDetailScreen from "@/app/screens/shop/itemDetail";
import NewsDetailScreen from "@/app/screens/news/newsDetail";

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
      <Stack.Navigator initialRouteName="screens/app">
        {/*BASE*/}
        <Stack.Screen name="screens/app" options={{title: 'App', headerShown: false, gestureEnabled: false}}
                      component={AppScreen}/>

        {/*HOME*/}
        <Stack.Screen name="screens/home/home" options={{title: 'Home', headerShown: false, gestureEnabled: false}}
                      component={HomeScreen}/>

        {/*PROFILE*/}
        <Stack.Screen name="screens/profile/profile"
                      options={{title: 'Profile', headerShown: false, gestureEnabled: false}}
                      component={ProfileScreen}/>
        <Stack.Screen name="screens/profile/stats"
                      options={{
                        title: '',
                        headerBackTitle: '',
                        headerShadowVisible: false,
                        headerLeft: () => (
                          <Pressable onPress={router.back}>
                            <AntDesign name="arrowleft" size={35} color="white" style={{paddingLeft: 5}}/>
                          </Pressable>
                        ),
                      }} component={StatsScreen}/>

        {/*AUTH*/}
        <Stack.Screen name="screens/auth/login" options={{title: 'Login', headerShown: false, gestureEnabled: false}}
                      component={LoginScreen}/>
        <Stack.Screen name="screens/auth/register"
                      options={{title: 'Register', headerShown: false, gestureEnabled: false}}
                      component={RegisterScreen}/>
        <Stack.Screen name="screens/auth/forgotPassword"
                      options={{title: 'Forgot password', headerShown: false, gestureEnabled: false}}
                      component={ForgotPasswordScreen}/>

        {/*SHOP*/}
        <Stack.Screen name="screens/shop/shop" options={{title: 'Shop', headerShown: false, gestureEnabled: false}}
                      component={ShopScreen}/>
        <Stack.Screen name="screens/shop/itemDetail"
                      options={{
                        title: '',
                        presentation: 'modal',
                        cardStyle: {marginTop: 50, borderRadius: 15},
                        gestureResponseDistance: 380,
                        headerShown: false,
                        headerBackTitle: '',
                        headerShadowVisible: false,
                        gestureEnabled: true,
                        headerLeft: () => (
                          <Pressable onPress={router.back}>
                            <AntDesign name="arrowleft" size={35} color="white" style={{paddingLeft: 5}}/>
                          </Pressable>
                        ),
                        headerRight: () => (
                          <Pressable onPress={router.back}>
                            <Button title={'campana'}></Button>
                          </Pressable>
                        ),
                      }}
                      component={ItemDetailScreen}/>

        {/*NEWS*/}
        <Stack.Screen name="screens/news/news" options={{
          title: '',
          headerBackTitle: '',
          headerShadowVisible: false,
          // headerLeft: () => (
          //   <Pressable onPress={router.back}>
          //     <AntDesign name="arrowleft" size={35} color="white" style={{paddingLeft: 5}}/>
          //   </Pressable>
          // ),
        }}
                      component={NewsScreen}/>
        <Stack.Screen name="screens/news/newsDetail"
                      options={{

                        title: '',
                        presentation: 'modal',
                        cardStyle: {marginTop: 50, borderRadius: 15},
                        gestureResponseDistance: 380,
                        headerShown: false,
                        headerBackTitle: '',
                        headerShadowVisible: false,
                        gestureEnabled: true,
                        headerLeft: () => (
                          <Pressable onPress={router.back}>
                            <AntDesign name="arrowleft" size={35} color="white" style={{paddingLeft: 5}}/>
                          </Pressable>
                        ),
                      }}
                      component={NewsDetailScreen}/>

        {/*SETTINGS*/}
        <Stack.Screen name="screens/settings/settings"
                      options={{title: 'Settings', headerShown: false, gestureEnabled: false}}
                      component={SettingsScreen}/>

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
