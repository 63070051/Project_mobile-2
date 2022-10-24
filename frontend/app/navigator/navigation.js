import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import Login from "../screen/login";
import Home from "../screen/home";
import Register from "../screen/register";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
      <LoginNavigator.Screen name="Home" component={Home} options={{
        headerShown : false
      }}/>
    </LoginNavigator.Navigator>
  );
}
function MyNavigator() {
  const [login, setLogin] = useState(false);


  const checkUser = async () => {
    try {
      const value = await AsyncStorage.getItem("@login");
      if (value !== null) {
        // We have data!!
        // console.log(value);
        setLogin(true);
      }
      else{
        setLogin(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  let page_componet = (<LoginStackNavigator />);
  {checkUser()}
  // console.log(AsyncStorage.getItem("@login"))
  if(login){
    page_componet = (<Home/>);
  }
  return (
    <NavigationContainer>
      {page_componet}
    </NavigationContainer>
  );
}


export default MyNavigator;
