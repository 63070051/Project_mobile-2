import { StyleSheet, Text, View , Image, TouchableOpacity, ScrollView} from "react-native";
import * as React from "react";
import { Button } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign, Ionicons, Entypo } from "@expo/vector-icons";
import Home from "../screen/Home";





const HomeNavigator = createBottomTabNavigator()

function HomeNav(){
    return(
        <HomeNavigator.Navigator>
            <HomeNavigator.Screen>
                name="Home"
                component={Home}
                options={{
            tabBarIcon: () => {
            return <Entypo name="home" size={24} color="black" />
          },
        }}
        </HomeNavigator.Screen>
        </HomeNavigator.Navigator>
    );
}