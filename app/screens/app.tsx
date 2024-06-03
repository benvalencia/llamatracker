import {Animated, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useEffect, useRef} from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import ShopScreen from "@/app/screens/shop/shop";
import ProfileScreen from "@/app/screens/profile/profile";
import HomeScreen from "@/app/screens/home/home";
import {AntDesign} from "@expo/vector-icons";
import * as Animatable from 'react-native-animatable'
import {Colors} from "@/constants/Colors";
import IslandScreen from "@/app/screens/island/island";
import NewsScreen from "@/app/screens/news/news";
import {useSafeAreaInsets} from "react-native-safe-area-context";

export default function AppScreen() {

  const Tab = createBottomTabNavigator();
  const Stack = createNativeStackNavigator();
  const {bottom} = useSafeAreaInsets()

  const tabRoutes = [
    {
      route: 'screens/home/home',
      // label: 'Inicio',
      component: HomeScreen,
      icon: 'home',
    },
    {
      route: 'screens/news/news',
      // label: 'Noticias',
      component: NewsScreen,
      icon: 'plus',
    },
    {
      route: 'screens/shop/shop',
      // label: 'Tienda',
      component: ShopScreen,
      icon: 'shoppingcart',
    },
    {
      route: 'screens/island/island',
      // label: 'Isla',
      component: IslandScreen,
      icon: 'shoppingcart',
    },
    {
      route: 'screens/profile/profile',
      // label: 'Profile',
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
          outputRange: [0, 1],
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
        {/*<Animatable.Text*/}
        {/*  style={[styles.animatedText, {*/}
        {/*    opacity: scale*/}
        {/*  }]}>{tab.label}</Animatable.Text>*/}

      </TouchableOpacity>
    )
  }

  return (
    <Stack.Navigator>
      <Stack.Screen name="Tab" options={{headerShown: false}}>
        {() => (
          <Tab.Navigator
            screenOptions={{headerShown: false, tabBarStyle: [styles.tabNavigatorContainer, {paddingBottom: bottom}]}}>
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
      {/*<Stack.Screen name="Login" component={LoginScreen}/>*/}
      {/*<Stack.Screen name="Register" component={RegisterScreen}/>*/}
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  // NAVIGATOR CONTAINER
  tabNavigatorContainer: {
    position: 'absolute',
    backgroundColor: 'white'
  },

  // TAB CONTAINER
  tabContainer: {
    flex: 1,
    alignItems: 'center',
    height: 60,
  },

  // ANIMATED CONTAINER
  animatedView: {
    width: 60,
    height: 60,
    borderRadius: 25,
    borderWidth: 4,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  animatedViewCircle: {
    width: 60,
    height: 60,
    borderRadius: 100,
    position: 'absolute',
    backgroundColor: Colors.secondary
  },
});
