import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Home from "./app/screen/home";
<<<<<<< HEAD
import Register from "./app/screen/register";
export default function App() {
  return (
    <Register />
=======
import Login from "./app/screen/login";
import ManageRole from "./app/screen/ManageRole";
export default function App() {
  return (
<<<<<<< HEAD
    <ManageRole />
=======
    <Login />
>>>>>>> 6e57cb8d80e3b3c52000f7a654913cc2919fb703
>>>>>>> 1cc79c73ca845b6e1f3fb43bea78c82bfc72bdd9
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
