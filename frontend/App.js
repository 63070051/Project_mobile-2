import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Home from "./app/screen/Home";
import ManageRole from "./app/screen/ManageRole";
import Course from "./app/screen/Course";
import navbar from "./app/component/navbar";
export default function App() {
  return (
    <ManageRole/>
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
