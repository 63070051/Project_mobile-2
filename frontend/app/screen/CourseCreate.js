import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { Entypo } from '@expo/vector-icons';
import Path from "../../path";

function CourseCreate({route}) {
  const [CourseName, setCourseName] = React.useState("");
  const [CourseSubTitle, setCourseSubTitle] = React.useState("");
  const [CourseKey, setCourseKey] = React.useState("");
  const [objectImg, setObjectImg] = React.useState([]);
  const [image, setImage] = React.useState(null);

  let Subject_not_upload = (
    <Image
    source={require("../assets/noimg.png")}
    style={{ width: 300, height: 200, borderRadius: 10, borderRadius: 10, }}
    />
  );

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
      setObjectImg(result);
    }
  };

  async function createCourse() {
    const data = new FormData();
    const newImageUri = "file:///" + objectImg.uri.split("file:/").join("");
    data.append("title", CourseName);
    data.append("subTitle", CourseSubTitle);
    data.append("teacherId", route.params.teacher);
    data.append("key", CourseKey);
    data.append("img_subject", {
      uri: newImageUri,
      type: "image",
      name: newImageUri.split("/").pop(),
    });
    await axios
      .post(`${Path}/addSubject`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        if (response.data == "success") {
          alert("Create Success");
          {
            route.params.route.replace("coursepage");
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 30 , alignItems: "center"}}
    >
        <View style={styles.box}>
            <Text style={styles.text_header}>Create Course</Text>
        </View>
        <View style={styles.inside}>
            <View style={styles.inputcontainer}>
                <View style={styles.inputcontainer}>
                    {!image && Subject_not_upload}
                    {image && (
                        <>
                        <Image
                            source={{ uri: image }}
                            style={{
                            width: 300,
                            height: 200,
                            borderRadius: 10,
                            }}
                        />
                        </>
                    )}
                </View>
                <TouchableOpacity
                onPress={pickImage}
                style={[
                    styles.buttonpho,
                    { backgroundColor: "royalblue", marginBottom: 20},
                ]}
                >
                    <Text style={{ color: "white" }}>Upload Photo</Text>
                </TouchableOpacity>
                <TouchableOpacity
                onPress={() => setImage(null)}
                style={[
                    styles.buttonpho,
                    image ? styles.rered : styles.regray,
                ]}
                >
                    <Text style={{ color: "white" }}>Remove Photo</Text>
                </TouchableOpacity>
            </View>
            {/* <Text style={styles.text}>Course Name</Text> */}
            <TextInput
            placeholder="Course Title"
            onChangeText={(title) => {
                setCourseName(title);
            }}
            style={styles.textinput}
            />
            {/* <Text style={styles.text}>Sub title</Text> */}
            <TextInput
            multiline={true}
            placeholder="Course Subtitle"
            onChangeText={(subtitle) => {
                setCourseSubTitle(subtitle);
            }}
            style={styles.textinput}
            />
            {/* <Text style={styles.text}>Enroll Key</Text> */}
            <TextInput
            placeholder="Course Key"
            onChangeText={(key) => {
                setCourseKey(key);
            }}
            style={styles.textinput}
            />
            <TouchableOpacity
            onPress={() => createCourse()}
            style={[
                styles.buttonpho,{
                backgroundColor: "orange",
            }]}
            >
            <Text style={{ color: "white" }}>Create Course</Text>
            </TouchableOpacity>
        </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF8EA",
  },
  text_header: {
    fontSize: 30,
    fontWeight: "600"
  },
  header: {
    // marginTop: 50,
    paddingHorizontal: 20,
    flexDirection: "row",
  },
  box: {
    width: "100%",
    alignItems: "center",
    paddingTop: 40,
    backgroundColor: "#FF9A00",
    height: 250,
    position: "absolute"
  },
  inside: {
    marginTop: 120,
    width: "90%",
    padding: 20,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: -2,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  textinput: {
    marginTop: 10,
    marginBottom: 20,
    width: "100%",
    padding: 10,
    // height: 30,
    borderRadius: 5,
    borderBottomWidth: 1,
    borderColor: "darkgray"
  },
  text: {
    fontSize: 20,
  },
  inputcontainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
    justifyContent: "center",
  },
  buttonpho: {
    width: "100%",
    backgroundColor: "#FF9A00",
    alignItems: "center",
    padding: 13,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: -2,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  rered: {
    backgroundColor: "red",
  },
  regray: {
    backgroundColor: "darkgray",
  },
});

export default CourseCreate;
