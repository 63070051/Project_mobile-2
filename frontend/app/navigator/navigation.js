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
import ChatPeople from "../screen/ChatPeople";
import CourseInfo from "../screen/CourseInfo";
import axios from "axios";
import { LogBox } from "react-native";
LogBox.ignoreLogs([
  "AsyncStorage has been extracted from react-native core and will be removed in a future release",
]);
LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
]);
LogBox.ignoreLogs([
  "Warning: Can't perform a React state update on an unmounted component",
]);


const LoginNavigator = createNativeStackNavigator();
const CourseNavigator = createNativeStackNavigator();
const ChatNavigator = createNativeStackNavigator();
// const FavNavigator = createNativeStackNavigator();
// const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
// const FilterNavigator = createNativeStackNavigator();

function ChatStack() {
  return (
    <ChatNavigator.Navigator>
      <ChatNavigator.Screen name="Messages" component={Chat} />
      <ChatNavigator.Screen
        name="chatinfo"
        component={ChatPeople}
        options={({ route }) => ({
          title: route.params.DATA.item.email,
          headerBackTitleVisible: false,
        })}
      />
    </ChatNavigator.Navigator>
  );
}


function CourseStack() {
  return (
    <CourseNavigator.Navigator>
      <CourseNavigator.Screen
        name="coursepage"
        component={Course}
        options={{
          headerShown: false,
          title: "Course",
        }}
      />
      <CourseNavigator.Screen
        name="courseinfo"
        component={CourseInfo}
        options={{
          title: "Course Info",
        }}
      />
      <CourseNavigator.Screen
        name="coursecreate"
        component={CourseCreate}
        options={{
          title: "Create Course",
        }}
      />
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
        component={ChatStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name="chatbubble" size={size} color="black" />;
          },
        }}
      />
      {role == "Admin" && (
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
      )}
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
function MyNavigator(props) {
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

  return <NavigationContainer>{page_componet}</NavigationContainer>;
}

export default MyNavigator;
