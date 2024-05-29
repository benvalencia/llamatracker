import {Animated, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useEffect, useRef} from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import ShopScreen from "@/app/screens/shop/shop";
import ProfileScreen from "@/app/screens/profile/profile";
import HomeScreen from "@/app/screens/home/home";
import LoginScreen from "@/app/screens/auth/login";
import RegisterScreen from './auth/register';
import {AntDesign} from "@expo/vector-icons";
import * as Animatable from 'react-native-animatable'
import {Colors} from "@/constants/Colors";
import ChallengesScreen from "@/app/screens/challenges/challenges";

export default function AppScreen() {

  const Tab = createBottomTabNavigator();
  const Stack = createNativeStackNavigator();

  const tabRoutes = [
    {
      route: 'screens/home/home',
      label: 'Inicio',
      component: HomeScreen,
      icon: 'home',
    },
    {
      route: 'screens/challenges/challenges',
      label: 'Misiones',
      component: ChallengesScreen,
      icon: 'plus',
    },
    {
      route: 'screens/shop/shop',
      label: 'Tienda',
      component: ShopScreen,
      icon: 'shoppingcart',
    },
    {
      route: 'screens/profile/profile',
      label: 'Profile',
      component: ProfileScreen,
      icon: 'user',
    },

  ];

  const TabButton = ({tab, onPress, accessibilityState}: any) => {
    const animatedValues = {
      translate: useRef(new Animated.Value(0)).current,
      scale: useRef(new Animated.Value(0)).current,
    }

    const {translate, scale} = animatedValues;
    const colorIcon = accessibilityState.selected ? 'white' : Colors.secondary;

    useEffect(() => {
      handleAnimated()
    }, [accessibilityState.selected]);


    const handleAnimated = () => {
      Animated.parallel([
        Animated.timing(translate, {
          toValue: accessibilityState.selected ? 1 : 0,
          duration: 350,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: accessibilityState.selected ? 1 : 0,
          duration: 200,
          useNativeDriver: true,
        })
      ]).start()
    }

    const translateStyles = {
      transform: [{
        translateY: translate.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -30],
          extrapolate: 'clamp',
        })
      }]
    }

    const scaleStyles = {
      opacity: scale.interpolate({
        inputRange: [0, 1],
        outputRange: [0.5, 1],
        extrapolate: 'clamp'
      }),
      transform: [{
        scale: scale
      }]
    }

    return (
      <TouchableOpacity onPress={onPress}
                        activeOpacity={1}
                        style={styles.tabContainer}>
        <Animatable.View style={[styles.animatedView, translateStyles]}>
          <Animated.View style={[styles.animatedViewCircle, scaleStyles]}></Animated.View>
          <AntDesign name={tab.icon} size={25} color={colorIcon}/>
        </Animatable.View>
        <Animatable.Text
          style={[styles.animatedText, {
            opacity: scale
          }]}>{tab.label}</Animatable.Text>

      </TouchableOpacity>
    )
  }

  return (
    <Stack.Navigator>
      <Stack.Screen name="Tab" options={{headerShown: false}}>
        {() => (
          <Tab.Navigator screenOptions={{headerShown: false, tabBarStyle: styles.tabNavigatorContainer}}>
            {tabRoutes.map((tab, index: number) => {
              return (
                <Tab.Screen
                  name={tab.route}
                  key={index}
                  component={tab.component}
                  options={{
                    tabBarButton: (props) => <TabButton {...props} tab={tab}/>,
                  }}
                />
              );
            })}
          </Tab.Navigator>
        )}
      </Stack.Screen>
      <Stack.Screen name="Login" component={LoginScreen}/>
      <Stack.Screen name="Register" component={RegisterScreen}/>
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  // NAVIGATOR CONTAINER
  tabNavigatorContainer: {
    height: 60,
    position: 'absolute',
    bottom: 25,
    right: 15,
    left: 15,
    borderRadius: 15,
    backgroundColor: 'white'
  },

  // TAB CONTAINER
  tabContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 65,
    alignSelf: 'stretch'
  },

  // ANIMATED CONTAINER
  animatedView: {
    width: 55,
    height: 55,
    borderRadius: 25,
    borderWidth: 4,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  animatedViewCircle: {
    width: 50,
    height: 50,
    borderRadius: 100,
    position: 'absolute',
    backgroundColor: Colors.secondary
  },
  animatedText: {
    fontSize: 12,
    color: Colors.secondary,
    textAlign: 'center',
    position: 'absolute',
    bottom: 20
  }
});
