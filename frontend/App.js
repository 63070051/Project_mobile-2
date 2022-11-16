import { StyleSheet, Text, View } from "react-native";
import MyNavigator from "./app/navigator/Navigation";
import registerNNPushToken from 'native-notify';

export default function App() {
  registerNNPushToken(4815, 'I2euvmyKYql7tVik6koMm9');


  return <MyNavigator />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
