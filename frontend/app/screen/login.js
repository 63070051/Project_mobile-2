import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  ScrollView,
  TextInput,
} from "react-native";
import { useState, useEffect } from "react";



const SignIn = async (email, password) =>{
    console.log(email, password)
}

function login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <ScrollView style={styles.container}>
      <View style={styles.logocontainer}>
        <Image style={styles.logo} source={require("../assets/logo.png")} />
      </View>
      <Text style={styles.cop}>
        <Text style={styles.text}>Email</Text>
        <View style={styles.TextInput}>
          <TextInput style={styles.input} placeholder="Email" onChangeText={(email) => setEmail(email)}/>
        </View>
        <Text style={styles.text}>Password</Text>
        <View style={styles.TextInput}>
          <TextInput style={styles.input} placeholder="Password" onChangeText={(password) => setPassword(password)}/>
        </View>
      </Text>

      <TouchableHighlight onPress={SignIn(email, password)}>
        <View style={styles.button}>
          <Text>Sign in</Text>
        </View>
      </TouchableHighlight>
      <TouchableHighlight>
        <View style={styles.button}>
          <Text>Sign up</Text>
        </View>
      </TouchableHighlight>
      <View style={styles.countContainer}>
        <Text style={styles.countText}></Text>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF8EA",
    paddingTop: 70,
    paddingLeft: 40,
    paddingRight: 40,
  },
  text: {
    fontSize: 20,
  },
  TextInput: {
    alignItems: "center",
  },
  input: {
    width: 350,
    borderWidth: 1,
    margin: 10,
    padding: 10,
    borderRadius: 5,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#FF9A00",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  countContainer: {
    alignItems: "center",
    padding: 10,
  },
  logo: {
    width: 300,
    height: 140,
  },
  logocontainer: {
    // flex : 1,
    alignItems: "center",
  },
  cop: {
    alignItems: "center",
  },
});
export default login;
