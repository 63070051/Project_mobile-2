import { StyleSheet, Text, View , Image, TouchableOpacity, ScrollView, TextInput, Button} from "react-native";
import * as React from "react";
import axios from 'axios';
import {AntDesign, Zocial, Ionicons} from "@expo/vector-icons";
import { launchImageLibrary } from 'react-native-image-picker';
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
  

function Register() {
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [confirmPass, setConfirmpass] = React.useState("")
    const [key, setKey] = React.useState("")
    const [checkpass, setCheckpass] = React.useState(false)
    const checkHandle = () => {
        console.log(email.indexOf('@it.kmitl.ac.th'));
        if(!email){
            alert('Please Enter Email');
        }else if(email.indexOf('@it.kmitl.ac.th') == -1){
            alert('Please use email IT KMITL')
        }else if(!password){
            alert('Please Enter Password')
        }else if(!confirmPass){
            alert('Please Enter Confirm Password')
        }else if(password != confirmPass){
            alert('Password not match')
        }else if(!key){
            alert('Please Enter Secret Key')
        }
    }

    const [photo, setPhoto] = React.useState(null);
    const handleChoosePhoto = () => {
        launchImageLibrary({ noData: true }, (response) => {
            console.log(response);
            if (response) {
                setPhoto(response);
            }
        });
    };

    const handleUploadPhoto = () => {
        fetch(`${SERVER_URL}/api/upload`, {
          method: 'POST',
          body: createFormData(photo, { userId: '123' }),
        })
          .then((response) => response.json())
          .then((response) => {
            console.log('response', response);
          })
          .catch((error) => {
            console.log('error', error);
          });
      };

    return(
        <ScrollView style={styles.container}>
            <Image source={require('../assets/newLogo.png')} style={styles.logo}></Image>
            <View style={styles.inputcontainer}>
                {photo && (
                    <>
                        <Image
                            source={{ uri: photo.uri }}
                            style={{ width: 300, height: 300 }}
                        />
                        <Button title="Upload Photo" onPress={handleUploadPhoto} />
                    </>
                )}
                <Button title="Choose Photo" onPress={handleChoosePhoto} />
            </View>
            <View style={styles.inputcontainer}>
                {/* <Zocial name="email" size={24} color="black" /> */}
                <TextInput 
                    style={styles.input}
                    placeholder="Email"
                    keyboardType="email-address"
                    onChangeText={(mail) =>{
                        setEmail(mail)
                    }}
                />
            </View>
            <View style={styles.inputcontainer}>
                <TextInput 
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry={true}
                    autoCorrect={false}
                    onChangeText={(pass) =>{
                        setPassword(pass)
                    }}
                />
            </View>
            <View style={styles.inputcontainer}>
                <TextInput 
                    style={styles.input}
                    placeholder="Confirm Password"
                    secureTextEntry={true}
                    autoCorrect={false}
                    onChangeText={(pass) =>{
                        setConfirmpass(pass)
                    }}
                />
                {checkpass ? <Text style={{color : "red"}}>Password not match</Text> : null}
            </View>
            <View style={styles.inputcontainer}>
                <TouchableOpacity style={styles.button} onPress={() => {test()}}>
                    <Text style={{color: "white"}}>Get Secret Key</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.inputcontainer}>
                <TextInput 
                    style={styles.input}
                    placeholder="Secret Key"
                    onChangeText={(key) =>{
                        setKey(key)
                    }}
                />
            </View>
            <View style={styles.inputcontainer}>
                <TouchableOpacity style={styles.button} 
                    onPress={checkHandle}>
                    <Text style={{color: "white"}}>Sign up</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}
const styles = StyleSheet.create({
    container :{
        backgroundColor : "#FFF8EA",
        paddingTop: 60,
    },
    inputcontainer:{
        alignItems: "center",
        marginBottom: 20,
        flexDirection: "row",
        justifyContent: "center"
    },
    input:{
        width: "80%",
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
        width: "80%",
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
        width : 180,
        height : 80,
        marginBottom: 30
    }
});
export default Register;