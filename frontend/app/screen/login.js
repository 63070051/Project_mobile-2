import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import { useState, useEffect } from "react";
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";







function Login(props) {
  if(props.login){
    props.navigation.navigate("TabHome");
  }
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  let TextError = null;


  const getUser = async () =>{
    let users = await AsyncStorage.getItem("@login");
    if(users != undefined){
      props.navigation.replace("TabHome");
    }
    // return JSON.parse(user);
  }
  useEffect(() =>{
    getUser();
  }, [])
  
  const SignIn = async () => {
    axios.post("http://localhost:3000/checkUser", {
      email : email,
      password : password
    })
    .then((response) => {
      if(response.data != "error login"){
        setError(false);
        AsyncStorage.setItem("@login" , JSON.stringify(response.data));
        {props.navigation.replace("TabHome", {user : response.data})}
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
        <Image style={styles.logo} source={require("../assets/logo_login.png")} />
      </View>
      <View style={styles.box}>
        <View style={styles.TextInput}>
          <Text style={styles.text}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={(email) => setEmail(email)}
          />
        </View>
        <View style={styles.TextInput}>
          <Text style={styles.text}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="*************"
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
          />
        </View>
          <View>{TextError}</View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            SignIn();
          }}
        >
          <Text style={{color: "white"}}>Sign in</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => {props.navigation.navigate("register")}}>
          <Text style={{color: "white"}}>Sign up</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.countContainer}>
        <Text style={styles.countText}></Text>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor : "#FFF8EA",
    paddingTop: 60,
  },
  text: {
    fontSize: 20,
  },
  TextInput: {
    justifyContent: "flex-start",
  },
  input: {
    width: 330,
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
        width: -2,
        height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
    backgroundColor: "white",
    marginVertical: 9
  },
  button: {
    width: 330,
    backgroundColor: "#FF9A00",
    alignItems: "center",
    padding: 13,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: -2,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
    marginVertical: 9
  },
  countContainer: {
    alignItems: "center",
    padding: 10,
    justifyContent: "center"
  },
  box: {
    alignSelf: "center"
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
