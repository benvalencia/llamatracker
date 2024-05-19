import {StyleSheet, TouchableOpacity, View} from 'react-native';
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

  const animationsTabIn = {
    0: {scale: 1, translateY: 0},
    .92: {scale: 1, translateY: -30},
    1: {scale: 1.15, translateY: -20},
  }
  const animationsTabOut = {
    0: {scale: 1.5, translateY: -20},

    1: {scale: 1, translateY: 0},
  }
  const animationsCircleIn = {
    0: {scale: 0},
    0.3: {scale: .5},
    0.5: {scale: .3},
    0.8: {scale: .7},
    1: {scale: 1}
  }
  const animationsCircleOut = {
    0: {scale: 1},
    1: {scale: 0}
  }

  const TabButton = (props: any) => {
    const {tab, index, onPress, accessibilityState} = props;
    const focused = accessibilityState.selected;
    const viewRef: React.MutableRefObject<any> = useRef(null)
    const circleRef: React.MutableRefObject<any> = useRef(null)
    const textRef: React.MutableRefObject<any> = useRef(null)

    useEffect(() => {
      if (focused) {
        viewRef.current.animate(animationsTabIn);
        circleRef.current.animate(animationsCircleIn);
        circleRef.current.transitionTo({scale: 1});

      } else {
        viewRef.current.animate(animationsTabOut);
        viewRef.current.animate(animationsCircleOut)
        circleRef.current.transitionTo({scale: 0});
      }
    }, [focused]);

    return (
      <TouchableOpacity
        key={index}
        onPress={onPress}
        activeOpacity={1}
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          height: 50,
        }}
      >
        <Animatable.View
          ref={viewRef}
          duration={1000}
          style={{
            width: 50,
            height: 50,
            borderRadius: 25,
            borderWidth: 4,
            borderColor: 'white',
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center',

          }}
        >
          <View style={{
            width: 50,
            height: 50,
            borderRadius: 25,
            borderWidth: 4,
            borderColor: 'white',
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center',

          }}>
            <Animatable.View
              ref={circleRef}
              style={
                {
                  ...StyleSheet.absoluteFillObject,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: Colors.secondary,
                  borderRadius: 25,
                }}
            >
              <AntDesign name={tab.icon} size={25} color={focused ? 'white' : 'black'}/>
            </Animatable.View>
          </View>
          <Animatable.Text
            ref={textRef}
            style={{fontSize: 12, color: Colors.secondary, textAlign: 'center'}}
          >{tab.label}</Animatable.Text>
        </Animatable.View>
      </TouchableOpacity>
    )
  }


  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 50,
          position: 'absolute',
          bottom: 25,
          right: 15,
          left: 15,
          borderRadius: 15,
          backgroundColor: 'white'
        }
      }}>
      {tabRoutes.map((tab, index) => {
        return (
          <Tab.Screen name={tab.route}
                      component={tab.component}
                      key={index}
                      options={{
                        tabBarButton: (props) => <TabButton {...props} tab={tab} index={index}/>
                      }}
          ></Tab.Screen>)
      })
      }
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});
