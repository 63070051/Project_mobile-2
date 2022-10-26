import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import * as React from "react";
import axios from "axios";
import { Button } from "react-native";

function course() {
  return (
    <ScrollView style={styles.scrollview}>

      <View style={styles.container}>
        <Image
          style={styles.logo}
          source={require("../assets/courselogo.png")}
        ></Image>

        <View style={styles.header}>
          <Text style={styles.text_header}>Course</Text>
        </View>

        <View style={styles.box}>
          <View style={styles.inside}>
            <Image
                style={styles.courselogo}
             source={require("../assets/oop.jpg")}></Image>
          </View>

          <View style={styles.buttoncontainer}>
        <TouchableOpacity style={styles.enterclassbutton}>
          <Text style={styles.textbutton}>Enroll</Text>
        </TouchableOpacity>
      </View>

        </View>

        <View style={styles.box}>
          <View style={styles.inside}>
            <Image
                style={styles.courselogo}
             source={require("../assets/oop.jpg")}></Image>
          </View>

          <View style={styles.buttoncontainer}>
        <TouchableOpacity style={styles.enterclassbutton}>
          <Text style={styles.textbutton}>Enroll</Text>
        </TouchableOpacity>
      </View>

        </View>
        

        

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF8EA",
    alignItems: "center",
  },
  scrollview: {
    flex: 1,
    backgroundColor: "#FFF8EA",
    },
  logo: {
    width: 450,
    height: 200,
    marginTop: 50,
  },
  header: {
    marginTop: 50,
    paddingHorizontal: 20,
  },
  text_header: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 30,
    justifyContent: "flex-end",
    marginRight: 250,
  },
  box: {
    backgroundColor: "#fff",
    alignItems: "center",
    width: 350,
    borderRadius: 20,
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 50,
    flexDirection: "column",
    borderColor: "#FF9A00",
  },
  courselogo: {
    width: 350,
    height: 200,
    borderTopLeftRadius : 20,
    borderTopRightRadius : 20,
  },
  textbutton:{
    height: 35,
    marginTop: 10,
    fontSize: 25,
  },
});

export default course;
