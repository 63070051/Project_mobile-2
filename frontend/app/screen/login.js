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
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";



const test = async () => {
  try {
    const value = await AsyncStorage.getItem("@login");
    if (value !== null) {
      // We have data!!
      console.log(value);
    }
  } catch (error) {
    console.log(error);
  }
};




function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  let TextError = null;


  
  const SignIn = async () => {
    axios.post("http://localhost:3000/checkUser", {
      email : email,
      password : password
    })
    .then((response) => {
      if(response.data != "error login"){
        setError(false);
        AsyncStorage.setItem("@login" , JSON.stringify(response.data));
      }
      else{
        setError(true);
      }
    })
  };


  if(error){
    TextError = (
        <Text style={{color : "red", marginBottom : 10, fontSize : 15}}>The username or password is incorrect</Text>
    );
  }


  return (
    <ScrollView style={styles.container}>
      <View style={styles.logocontainer}>
        <Image style={styles.logo} source={require("../assets/logo.png")} />
      </View>
      <Text style={styles.text}>Email</Text>
      <View style={styles.TextInput}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={(email) => setEmail(email)}
        />
      </View>
      <Text style={styles.text}>Password</Text>
      <View style={styles.TextInput}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={(password) => setPassword(password)}
        />
      </View>
        <View>{TextError}</View>
      <TouchableHighlight
        onPress={() => {
          SignIn();
        }}
      >
        <View style={styles.button}>
          <Text>Sign in</Text>
        </View>
      </TouchableHighlight>
      <TouchableHighlight onPress={() => {props.navigation.navigate("register")}}>
        <View style={styles.button}>
          <Text>Sign up</Text>
        </View>
      </TouchableHighlight>
      <TouchableHighlight onPress={() => {test()}}>
        <View style={styles.button}>
          <Text>test</Text>
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
export default Login;
