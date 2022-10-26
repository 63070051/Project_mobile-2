import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList
} from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "react-native";




function RenderCrouse(props) {
  let img = ""
  if(props.img){
    img = "http://localhost:3000" + props.img
    console.log(img)
  }
  return (
    <View style={styles.box}>
      <View style={styles.inside}>
        <Image
          style={styles.courselogo}
          source={{uri : img}}
        ></Image>
      </View>
      <View style={{ padding: 5 }}>
        <Text numberOfLines={1} style={{ fontSize: 18 }}>
          {props.title}
        </Text>
      </View>
      <ScrollView style={{ padding: 10, height: 100 }}>
        <Text>
          {props.subtitle}
        </Text>
      </ScrollView>
      <View style={styles.buttoncontainer}>
        <TouchableOpacity style={styles.enterclassbutton}>
          <Text style={styles.textbutton}>Enroll</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function Course() {
  const [allCourse, setAllCourse] = useState([]);


  useEffect(() =>{
    axios.get(`http://localhost:3000/getSubject`)
    .then((response) => {
      setAllCourse(response.data);
    })
    .catch((err) => {
      console.log(err);
    })
  }, []);
  // console.log(allCourse);

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
        {/* <FlatList data={allCourse} renderItems={RenderCrouse} style={{ width: "100%" }}/> */}
        {allCourse.map((value) => {
            return <RenderCrouse key={value.key} id={value.course_id} img={value.img} title={value.title} subtitle={value.subtitle}/>;
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
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  textbutton: {
    height: 35,
    marginTop: 10,
    fontSize: 25,
  },
});

export default Course;
