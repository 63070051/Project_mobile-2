import { StyleSheet, Text, View , Image, TouchableHighlight, ScrollView, TextInput} from "react-native";
import * as React from "react";

function login() {
  return (
    <ScrollView style={styles.container}>
         <View style={styles.logocontainer}>
        <Image style={styles.logo} source={require('../assets/logo.png')}/>
      </View>
      <Text style={styles.cop}>
      <Text style={styles.text}>Email</Text>
        <View style={styles.TextInput}>
            <TextInput
                style={styles.input}
                placeholder="Email"
            />
        </View>
        <Text style={styles.text}>Password</Text>
        <View style={styles.TextInput}>
            <TextInput
                style={styles.input}
                placeholder="Password"
            />
        </View>
      </Text>
            
        <TouchableHighlight >
            <View style={styles.button}>
                <Text>Sign in</Text>
            </View>
            
        </TouchableHighlight>
        <TouchableHighlight >
            <View style={styles.button}>
                <Text>Sign up</Text>
            </View>
            
        </TouchableHighlight>
        <View style={styles.countContainer}>
            <Text style={styles.countText}>
            
            </Text>
        
      </View>

    </ScrollView>
  );
}
const styles = StyleSheet.create({
    container :{
      backgroundColor : "#FFF8EA",
      marginTop: 70,
      
    //   flex: 1
    },
    text: {
        margin: 40,
        fontSize: 20,
        
    },
    TextInput: {
        alignItems: "center"
    },
    input: {
        height: 40,
        width: 400,
        borderWidth: 1,
        margin: 10,
        padding: 10,
        borderRadius: 5
      },
    button: {
        alignItems: "center",
        backgroundColor: "#FF9A00",
        padding: 10,
        margin: 10,
        borderRadius: 5
    },
    countContainer: {
        alignItems: "center",
        padding: 10,
        
    },
    logo:{
        width : 300,
        height : 140,
    },
    logocontainer:{
        // flex : 1,
        alignItems : "center"

    },
    cop: {
        alignItems: "center",
        
    }
});
export default login;
