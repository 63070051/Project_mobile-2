import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "react-native";
import { AntDesign, Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

function RenderCrouse(props) {
  let img = "";
  if (props.img) {
    img = "http://localhost:3000" + props.img;
  }
  return (
    <View style={styles.box}>
      <View style={styles.inside}>
        <Image style={styles.courselogo} source={{ uri: img }}></Image>
      </View>
      <View style={{ padding: 5 }}>
        <Text numberOfLines={1} style={{ fontSize: 20, fontWeight : "600" , padding: 10}}>
          {props.title}
        </Text>
      </View>
      <ScrollView
        style={{ padding: 10, height: 100, marginBottom: 10 }}
        contentContainerStyle={{ paddingBottom: 30 }}
      >
        <Text style={{fontSize : 16, paddingLeft : 5, paddingRight : 5}}>{props.subtitle}</Text>
      </ScrollView>
      {props.role == "Student" && (
        <View style={styles.buttoncontainer}>
          <TouchableOpacity style={styles.enterclassbutton}>
            <Entypo name="lock" size={30} color="red" />
          </TouchableOpacity>
        </View>
      )}
      {(props.role == "Teacher" || props.role == "Admin") && (
        <View style={styles.buttoncontainer1}>
          <TouchableOpacity style={styles.editcontainer}>
            <AntDesign name="edit" size={30} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.deletecontainer}>
            <MaterialCommunityIcons name="delete" size={30} color="red" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

function Course(props) {
  const [allCourse, setAllCourse] = useState([]);
  const [user, setUser] = useState([]);

  const getUser = async () => {
    let users = await AsyncStorage.getItem("@login");
    axios
      .post("http://localhost:3000/getUserId", {
        id: JSON.parse(users).user_id,
      })
      .then((response) => {
        setUser(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
    // return JSON.parse(user);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3000/getSubject`)
      .then((response) => {
        setAllCourse(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
    getUser();
  }, []);

  return (
    <ScrollView style={styles.scrollview} contentContainerStyle={{ paddingBottom: 30 }}>
      <View style={styles.container}>
        <Image
          style={styles.logo}
          source={require("../assets/courselogo.png")}
        ></Image>

        {user.role == "Student" && (
          <View style={styles.header}>
            <Text style={styles.text_header}>Course</Text>
          </View>
        )}
        {(user.role == "Teacher" || user.role == "Admin") && (
          <View style={styles.header1}>
            <Text style={styles.text_header}>Course</Text>
            <TouchableOpacity style={styles.plus} onPress={() =>{
              props.navigation.navigate("coursecreate");
            }}>
              <AntDesign name="plus" size={30} color="black" />
            </TouchableOpacity>
          </View>
        )}
        {/* <FlatList data={allCourse} renderItems={RenderCrouse} style={{ width: "100%" }}/> */}
        {allCourse.map((value) => {
          return (
            <RenderCrouse
              key={value.course_id}
              id={value.course_id}
              img={value.img}
              title={value.title}
              subtitle={value.subtitle}
              role={user.role}
            />
          );
        })}
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
    // marginTop: 50,
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
    // borderWidth: 1,
    marginTop: 50,
    flexDirection: "column",
    borderColor: "#FF9A00",
  },
  courselogo: {
    width: 350,
    height: 200,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  textbutton: {
    height: 35,
    marginTop: 10,
    fontSize: 25,
  },
  enterclassbutton: {
    padding: 10,
    backgroundColor: "#ffd7a8",
    alignItems: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  buttoncontainer: {
    width: "100%",
  },
  buttoncontainer1: {
    flexDirection: "row",
    backgroundColor: "#ffd7a8",
    padding: 5,
    width: "100%",
    justifyContent: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  editcontainer: {
    marginTop: 10,
    marginBottom: 10,
    marginRight: 150,
  },
  deletecontainer: {
    marginTop: 10,
    marginBottom: 10,
  },
  header1: {
    marginTop: 50,
    paddingHorizontal: 20,
    flexDirection: "row",
  },
  plus: {
    marginTop: 5,
  },
});

export default Course;
