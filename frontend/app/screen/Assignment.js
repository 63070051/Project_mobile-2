import { StyleSheet, Text, View , Image, TouchableOpacity, ScrollView} from "react-native";
import * as React from "react";
import axios from 'axios';
import { Button } from "react-native";
import Path from "../../path";
import {useNavigation } from '@react-navigation/native';








function Assignment({route}) {
  const [user, setUser] = React.useState([]);
  return(
    <Text>test</Text>
  );
}
const styles = StyleSheet.create({
    container :{
      backgroundColor : "#FFF8EA"
    },
    logo:{
        width : 350,
        height : 150,
        marginTop : 50,
    },
    logocontainer:{
        // flex : 1,
        alignItems : "center"
    },
    textcenter: {
      textAlign : "center",
      // marginTop : 20,
      fontSize : 18 
    },
    textcontainer:{
      paddingLeft : 5,
      paddingRight : 5, 
      // marginTop : 40
    },
    enterclassbutton:{
      paddingTop : 8,
      paddingBottom : 8,
      paddingLeft : 12,
      paddingRight : 12,
      borderColor : "#FF9A00",
      borderWidth : 2,
      borderRadius : 5,
      backgroundColor: "#FFFFFF",
      height: 50,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 6,
      },
      shadowOpacity: 0.39,
      shadowRadius: 8.30,
    },
    textbutton:{
      textAlign : "center",
      fontSize : 20,

    },
    buttoncontainer :{
      // flex : 1,
      alignItems : "center",
      marginTop : 20,
      marginBottom : 20
    },
    userlogo:{
      width : 60,
      height : 60
    },
    textlogo : {
      fontSize : 20,
      textAlign : "center"
    },
    containercenter : {
      // flex : 1,
      alignItems : "center",
      padding : 10
    },
    card:{
      backgroundColor : "#EBF9FF",
      padding : 20,
      marginLeft : 20,
      marginRight : 20,
      marginBottom : 30,
      borderRadius : 10,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 6,
      },
      shadowOpacity: 0.39,
      shadowRadius: 8.30,
    },
    textcard:{
      fontSize : 20,
      marginTop : 50,
      textAlign : "center"
    },
});
export default Assignment;
