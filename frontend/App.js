import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Home from "./app/screen/home";
import Login from "./app/screen/login";
import ManageRole from "./app/screen/ManageRole";
import Course from "./app/screen/Course";
import Register from "./app/screen/register";
import MyNavigator from "./app/navigator/navigation";
import CourseInfo from "./app/screen/courseinfo";
import CourseAdmin from "./app/screen/CourseAdmin";
export default function App() {
  return (
    <CourseAdmin />
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
