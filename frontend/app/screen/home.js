import { StyleSheet, Text, View , Image, TouchableOpacity, ScrollView} from "react-native";
import * as React from "react";
import axios from 'axios';
import { Button } from "react-native";


const testget = () => {
  axios.get(`http://localhost:3000/getSubject`)
  .then((response) => {
    console.log(response.data);
  })
  .catch((err) => {
    console.log(err);
  })
}

function home() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.navbar}>
      </View>
      <View style={styles.logocontainer}>
        <Image style={styles.logo} source={require('../assets/logo.png')}/>
      </View>

      <View style={styles.buttoncontainer}>
        <TouchableOpacity onPress={testget} style={styles.enterclassbutton}>
          <Text style={styles.textbutton}>เข้าสู่ระบบ</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.card}>
        <View style={styles.containercenter}>
          <Image style={styles.userlogo} source={require('../assets/users.png')} />
          <Text style={styles.textlogo}>ใช้งาน</Text>
          <Text style={styles.textcard}>ระบบ J: Learn ออกแบบมาเพื่อให้ผู้ใช้สามารถใช้งานได้อย่างง่ายดาย ไม่มีความซับซ้อน</Text>
        </View>
      </View>
      <View style={styles.card}>
        <View style={styles.containercenter}>
          <Image style={styles.userlogo} source={require('../assets/users.png')} />
          <Text style={styles.textlogo}>โค้ด</Text>
          <Text style={styles.textcard}>ระบบตรวจโครงสร้างอัตโนมัติ ช่วยลดระยะการตรวจของผู้สอน</Text>
        </View>
      </View>
      <View style={styles.card}>
        <View style={styles.containercenter}>
          <Image style={styles.userlogo} source={require('../assets/users.png')} />
          <Text style={styles.textlogo}>ฟีเจอร์</Text>
          <Text style={styles.textcard}>ส่วนช่วยจัดการผู้เรียนได้ง่าย ตรวจสอบผู้เรียนได้ง่าย และจัดการงานแต่ละงานได้ง่าย</Text>
        </View>
      </View>
      <View style={styles.card}>
        <View style={styles.containercenter}>
          <Image style={styles.userlogo} source={require('../assets/users.png')} />
          <Text style={styles.textlogo}>เพิ่มประสิทธิภาพ</Text>
          <Text style={styles.textcard}>เพิ่มประสิทธิภาพให้กับผู้เรียน เนื่องจากลดภาระของผู้สอน ให้ผู้สอนสามารถครอบคลุมผู้เรียนได้อย่างทั่วถึง</Text>
        </View>
      </View>
      <View style={{backgroundColor : "#B4DAFF", padding : 20}}>
        <Text style={{fontSize : 15, textAlign : "center", fontWeight : "bold"}}>© FIT-KMITL</Text>
        <Text style={{fontSize : 13, textAlign : "center"}}>Faculty of Information Technology, King Mongkut's Institute of Technology Ladkrabang</Text>
        <Text style={{fontSize : 13, textAlign : "center"}}>1 Chalongkrung Road Bangkok Thailand 10520</Text>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
    container :{
      backgroundColor : "#FFF8EA"
    },
    logo:{
        width : 500,
        height : 300,
        marginTop : 20,
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
      width: 150,
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
export default home;
