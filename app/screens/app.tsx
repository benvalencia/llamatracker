import {Animated, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useEffect, useRef} from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import ShopScreen from "@/app/screens/shop/shop";
import ProfileScreen from "@/app/screens/profile/profile";
import HomeScreen from "@/app/screens/home/home";
import {AntDesign} from "@expo/vector-icons";
import * as Animatable from 'react-native-animatable'
import {Colors} from "@/constants/Colors";

export default function AppScreen() {

  const Tab = createBottomTabNavigator();

  const tabRoutes = [
    {
      route: 'screens/home/home',
      label: 'home',
      component: HomeScreen,
      icon: 'home',
    },
    {
      route: 'screens/stats/stats',
      label: 'home',
      component: HomeScreen,
      icon: 'home',
    },
    {
      route: 'screens/shop/shop',
      label: 'shop',
      component: ShopScreen,
      icon: 'shoppingcart',
    },
    {
      route: 'screens/profile/profile',
      label: 'profile',
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

    useEffect(() => {
      handleAnimated()
    }, [accessibilityState.selected]);


    const handleAnimated = () => {
      Animated.parallel([
        Animated.timing(translate, {
          toValue: accessibilityState.selected ? 1 : 0,
          duration: 350,
          useNativeDriver: false,
        }),
        Animated.timing(scale, {
          toValue: accessibilityState.selected ? 1 : 0,
          duration: 200,
          useNativeDriver: false,
        })
      ]).start()
    }

    const translateStyles = {
      transform: [{
        translateY: translate.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -30],
          extrapolate: 'clamp'
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
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={1}
        style={styles.tabContainer}
      >
        <Animatable.View
          style={[{
            width: 55,
            height: 55,
            borderRadius: 25,
            borderWidth: 4,
            borderColor: 'white',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
          }, translateStyles]}
        >
          <Animated.View style={[{
            width: 50,
            height: 50,
            borderRadius: 100,
            position: 'absolute',
            backgroundColor: Colors.secondary
          }, scaleStyles]}></Animated.View>

          <AntDesign name={tab.icon} size={25} color={accessibilityState.selcted ? 'white' : 'black'}/>

        </Animatable.View>
        <Animatable.Text
          style={[{fontSize: 12, color: Colors.secondary, textAlign: 'center', position: 'absolute', bottom: 20}, {
            opacity: scale
          }]}>{tab.label}</Animatable.Text>

      </TouchableOpacity>
    )
  }


  return (
    <Tab.Navigator screenOptions={{headerShown: false, tabBarStyle: styles.tabNavigatorContainer}}>

      {tabRoutes.map((tab, index: number) => {
        return (
          <Tab.Screen name={tab.route}
                      key={index}
                      component={tab.component}
                      options={{
                        tabBarButton: (props) => <TabButton {...props} tab={tab}/>
                      }}
          ></Tab.Screen>)
      })}

    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabNavigatorContainer: {
    height: 60,
    position: 'absolute',
    bottom: 25,
    right: 15,
    left: 15,
    borderRadius: 15,
    backgroundColor: 'white'
  },

  tabContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 65,
    alignSelf: 'stretch'
  }
});
