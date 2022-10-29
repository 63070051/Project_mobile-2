import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {
  AntDesign,
  Ionicons,
  Entypo,
  FontAwesome,
  Octicons,
} from "@expo/vector-icons";
import Login from "../screen/Login";
import Home from "../screen/Home";
import Register from "../screen/Register";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Profile from "../screen/Profile";
import Chat from "../screen/Chat";
import Course from "../screen/Course";
import ManageRole from "../screen/ManageRole";
import CourseCreate from "../screen/CourseCreate";
import axios from "axios";

const LoginNavigator = createNativeStackNavigator();
const CourseNavigator = createNativeStackNavigator();
// const FavNavigator = createNativeStackNavigator();
// const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
// const FilterNavigator = createNativeStackNavigator();

function CourseStack() {
  return (
    <CourseNavigator.Navigator>
      <CourseNavigator.Screen name="coursepage" component={Course} options={{
        headerShown : false,
        title : "Course"
      }}/>
      <CourseNavigator.Screen name="coursecreate" component={CourseCreate} options={{
        title : "Create Course"
      }}/>
    </CourseNavigator.Navigator>
  );
}

function TabNavigater() {
  const [role, setRole] = useState("");
  const checkRole = async () => {
    try {
      const value = await AsyncStorage.getItem("@login");
      if (value !== null) {
        axios
          .post("http://localhost:3000/getUserId", {
            id: JSON.parse(value).user_id,
          })
          .then((response) => {
            setRole(response.data.role);
            console.log(role);
          })
          .catch((err) => {
            console.log(err);
          });
        // setRole(JSON.parse(value).role);
        // // We have data!!
        // // console.log(value);
      }
    } catch (error) {
      console.log(error);
    }
  };
  let page_componet = <LoginStackNavigator />;
  useEffect(() => {
    checkRole();
  }, []);

  if (role == "Admin") {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => {
              return <Ionicons name="home" size={size} color="black" />;
            },
          }}
        />
        <Tab.Screen
          name="Course"
          component={CourseStack}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => {
              return <Entypo name="open-book" size={size} color="black" />;
            },
          }}
        />
        <Tab.Screen
          name="Chat"
          component={Chat}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => {
              return <Ionicons name="chatbubble" size={size} color="black" />;
            },
          }}
        />
        <Tab.Screen
          name="Manage"
          component={ManageRole}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => {
              return <Octicons name="gear" size={size} color="black" />;
            },
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => {
              return (
                <FontAwesome name="user-circle" size={size} color="black" />
              );
            },
          }}
        />
      </Tab.Navigator>
    );
  }
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name="home" size={size} color="black" />;
          },
        }}
      />
      <Tab.Screen
        name="Course"
        component={CourseStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            return <Entypo name="open-book" size={size} color="black" />;
          },
        }}
      />
      <Tab.Screen
        name="Chat"
        component={Chat}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name="chatbubble" size={size} color="black" />;
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            return <FontAwesome name="user-circle" size={size} color="black" />;
          },
        }}
      />
    </Tab.Navigator>
  );
}

function LoginStackNavigator() {
  return (
    <LoginNavigator.Navigator>
      <LoginNavigator.Screen
        name="login"
        component={Login}
        options={{
          title: "Login",
        }}
      />
      <LoginNavigator.Screen
        name="register"
        component={Register}
        options={{
          title: "Register",
        }}
      />
      <LoginNavigator.Screen
        name="TabHome"
        component={TabNavigater}
        options={{
          headerShown: false,
        }}
      />
    </LoginNavigator.Navigator>
  );
}
function MyNavigator() {
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState([]);
  const checkUser = async () => {
    try {
      const value = await AsyncStorage.getItem("@login");
      if (value !== null) {
        setUser(JSON.parse(value));
        // We have data!!
        // console.log(value);
        setLogin(true);
      } else {
        setLogin(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  let page_componet = <LoginStackNavigator />;
  useEffect(() => {
    checkUser();
  }, []);
  if (login) {
    page_componet = <TabNavigater />;
  }
  return <NavigationContainer>{page_componet}</NavigationContainer>;
}

export default MyNavigator;
