import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Home from "./app/screen/home";
import Login from "./app/screen/login";
import ManageRole from "./app/screen/ManageRole";
<<<<<<< HEAD
import Course from "./app/screen/Course";
import navbar from "./app/component/navbar";
export default function App() {
  return (
    <ManageRole/>
=======
import Register from "./app/screen/register";
import MyNavigator from "./app/navigator/navigation";
export default function App() {
  return (
    <MyNavigator />
>>>>>>> feb6b6edd2a536bf0e9ad7180acbd263d7314e41
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
