import {Animated, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useEffect, useRef} from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import ShopScreen from "@/app/screens/shop/shop";
import ProfileScreen from "@/app/screens/profile/profile";
import HomeScreen from "@/app/screens/home/home";
import {Ionicons} from "@expo/vector-icons";
import * as Animatable from 'react-native-animatable'
import IslandScreen from "@/app/screens/island/island";
import NewsScreen from "@/app/screens/news/news";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {useTheme} from "@react-navigation/native";

export default function AppScreen() {
  const {colors} = useTheme();
  const Tab = createBottomTabNavigator();
  const Stack = createNativeStackNavigator();
  const {bottom} = useSafeAreaInsets()

  const tabRoutes = [
    {
      route: 'screens/home/home',
      component: HomeScreen,
      icon: 'home',
    },
    {
      route: 'screens/news/news',
      component: NewsScreen,
      icon: 'notifications',
    },
    {
      route: 'screens/shop/shop',
      component: ShopScreen,
      icon: 'bag',
    },
    {
      route: 'screens/island/island',
      component: IslandScreen,
      icon: 'hammer',
    },
    {
      route: 'screens/profile/profile',
      component: ProfileScreen,
      icon: 'person-circle',
    },
  ];

  const TabButton = ({tab, onPress, accessibilityState}: any) => {
    const animatedValues = {
      translate: useRef(new Animated.Value(0)).current,
      scale: useRef(new Animated.Value(0)).current,
    }

    const {translate, scale} = animatedValues;
    const outlineIcon = !accessibilityState.selected ? '-outline' : '';


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
        outputRange: [0, 1],
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
          {/*<Animated.View style={[styles.animatedViewCircle, scaleStyles]}></Animated.View>*/}
          <Ionicons name={tab.icon + outlineIcon as any} size={25} color={colors.text}/>
        </Animatable.View>
      </TouchableOpacity>
    )
  }

  return (
    <Stack.Navigator>
      <Stack.Screen name="Tab" options={{headerShown: false}}>
        {() => (
          <Tab.Navigator
            screenOptions={{
              headerShown: false, tabBarStyle: [styles.tabNavigatorContainer,
                {
                  paddingBottom: bottom,
                  backgroundColor: colors.background
                }]
            }}>
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
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  // NAVIGATOR CONTAINER
  tabNavigatorContainer: {
  },

  // TAB CONTAINER
  tabContainer: {
    flex: 1,
    alignItems: 'center',
  },

  // ANIMATED CONTAINER
  animatedView: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // animatedViewCircle: {
  //   width: 50,
  //   height: 50,
  //   position: 'absolute',
  //   backgroundColor: Colors.secondary
  // },
});
