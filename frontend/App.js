import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Home from "./app/screen/home";
import Login from "./app/screen/login";
import ManageRole from "./app/screen/ManageRole";
export default function App() {
  return (
    <ManageRole />
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
