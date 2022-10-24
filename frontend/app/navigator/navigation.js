import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import Login from "../screen/login";
import Home from "../screen/home";
import Register from "../screen/register";

const LoginNavigator = createNativeStackNavigator();
// const FavNavigator = createNativeStackNavigator();
// const Drawer = createDrawerNavigator();
// const MealsFavTabNavigator = createBottomTabNavigator();
// const FilterNavigator = createNativeStackNavigator();

function LoginStackNavigator() {
  return (
    <LoginNavigator.Navigator>
      <LoginNavigator.Screen name="login" component={Login} options={{
        title : "Login"
      }}/>
      <LoginNavigator.Screen name="register" component={Register} options={{
        title : "Register"
      }}/>
    </LoginNavigator.Navigator>
  );
}
// สร้าง Navigator หลัก
export default function MyNavigator() {
  return (
    <NavigationContainer>
      <LoginStackNavigator />
    </NavigationContainer>
  );
}
