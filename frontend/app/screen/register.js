import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Button,
} from "react-native";
import * as React from "react";
import axios from "axios";
import { AntDesign, Zocial, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { launchImageLibrary } from "react-native-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";

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




function Register() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPass, setConfirmpass] = React.useState("");
  const [key, setKey] = React.useState("");
  const [checkpass, setCheckpass] = React.useState(false);
  const [image, setImage] = React.useState(null);
  const [secret, setSecret] = React.useState("");
  const checkHandle = () => {
      console.log(email.indexOf("@it.kmitl.ac.th"));
    setCheckpass(false);
    if (!email) {
      alert("Please Enter Email");
    } else if (email.indexOf("@it.kmitl.ac.th") == -1) {
      alert("Please use email IT KMITL");
    } else if (!password) {
      alert("Please Enter Password");
    } else if (!confirmPass) {
      alert("Please Enter Confirm Password");
    } else if (password != confirmPass) {
      alert("Password not match");
      setCheckpass(true);
    } else if (!key) {
      alert("Please Enter Secret Key");
    }
  };


  const sendSecretCode = () =>{
    let formdata = FormData();
    formdata.add('email' , email)
    axios.post("http://localhost:3000/confirmemail", formdata)
    .then((response) => {
        setSecret(response.data);
        console.log(response.data)
    })
    .catch((err) => {
        console.log(err);
    })
}

  let profile_user_not_upload = 
    <View style={styles.inputcontainer}>
      <Image
        source={require("../assets/user.png")}
        style={{ width: 150, height: 150, borderRadius: 999 }}
      />
    </View>
  ;

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <ScrollView contentContainerStyle={{paddingBottom : 60}} style={styles.container}>
      <Image
        source={require("../assets/newLogo.png")}
        style={styles.logo}
      ></Image>
      {!image && profile_user_not_upload}
      <View style={styles.inputcontainer}>
        {image && (
          <>
            <Image
              source={{ uri: image }}
              style={{ width: 150, height: 150, borderRadius: 999 }}
            />
          </>
        )}
        <View style={{flexDirection : "row", width : "65%", justifyContent : "space-between"}}>
            <TouchableOpacity onPress={pickImage}
                style={[styles.buttonpho, {backgroundColor : "royalblue"}]}
                >
                <Text style={{color : "white"}}>Upload Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setImage(null)}
            style={[styles.buttonpho, {backgroundColor : "red"}]}
            >
                <Text style={{color : "white"}}>Remove Photo</Text>
            </TouchableOpacity>
        </View>
      </View>
      <View style={[styles.inputcontainer, {flexDirection : "row"}]}>
        {/* <Zocial name="email" size={24} color="black" /> */}
        <TextInput
          style={[styles.input, {width : "60%"}]}
          placeholder="Email"
          keyboardType="email-address"
          onChangeText={(mail) => {
            setEmail(mail);
          }}
        />
        <TouchableOpacity
          style={[styles.button, {width : "20%", marginLeft : 15}]}
          onPress={() => {
            sendSecretCode();
          }}
        >
            <Text style={{color : "white"}}>Send</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.inputcontainer}>
        <TextInput
          style={styles.input}
          placeholder="Secret Key"
          onChangeText={(key) => {
            setKey(key);
          }}
        />
      </View>
      <View style={styles.inputcontainer}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          autoCorrect={false}
          onChangeText={(pass) => {
            setPassword(pass);
          }}
        />
      </View>
      <View style={styles.inputcontainer}>
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          secureTextEntry={true}
          autoCorrect={false}
          onChangeText={(pass) => {
            setConfirmpass(pass);
          }}
        />
        {checkpass ? (
          <Text style={{ color: "red" }}>Password not match</Text>
        ) : null}
      </View>
      <View style={styles.inputcontainer}>
        <TouchableOpacity style={styles.button} onPress={checkHandle}>
          <Text style={{ color: "white" }}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF8EA",
    paddingTop: 30,
    flex : 1, 
  },
  inputcontainer: {
    alignItems: "center",
    marginBottom: 20,
    justifyContent: "center",
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
  },
  button: {
    width: "83%",
    backgroundColor: "#FF9A00",
    alignItems: "center",
    padding: 13,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: -2,
      height: 4,
    },
    shadowOpacity: 2,
    shadowRadius: 5,
    elevation: 5,
  },
  logo: {
    alignSelf: "center",
    width: 180,
    height: 80,
    marginBottom: 30,
  },
  buttonpho: {
    backgroundColor: "#FF9A00",
    alignItems: "center",
    padding: 13,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: -2,
      height: 4,
    },
    shadowOpacity: 2,
    shadowRadius: 5,
    elevation: 5,
  },
});
export default Register;
