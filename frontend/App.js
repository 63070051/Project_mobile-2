import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Home from "./app/screen/home";
import Register from "./app/screen/register";
import Login from "./app/screen/login";
import ManageRole from "./app/screen/ManageRole";
import Course from "./app/screen/Course";
import Register from "./app/screen/register";
import MyNavigator from "./app/navigator/navigation";
export default function App() {
  return (
    <MyNavigator/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
