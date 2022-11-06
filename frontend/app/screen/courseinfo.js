import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput,
  Pressable,
} from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Youtube from "react-native-youtube-iframe";
import { TEST_ID } from "react-native-gifted-chat";

function RenderCourseInfo(props) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text_header}>Course Info</Text>
      </View>
      <View style={styles.box}>
        <View style={styles.inside}>
          <Text style={styles.text}>{props.name}</Text>
          <Text style={styles.text}>{props.description}</Text>
          <Text style={styles.text}>{props.member}</Text>
        </View>
      </View>
    </View>
  );
}

function RenderVideo(props) {
  const [playing, setPlaying] = useState(false);
  const togglePlaying = () => {
    setPlaying((prev) => !prev);
  };
  const videoId = "dQw4w9WgXcQ";
  return <Youtube height={160} width={250} play={playing} videoId={videoId} />;
}

function RenderCourseOverView(props) {
  return (
    <View style={styles.container}>
      <View style={styles.header2}>
        <Text style={styles.text_header}>{props.lesson}</Text>
      </View>
      <Text style={[{ textAlign: "left", padding : 10}]}>
        {props.course_description}
      </Text>
      <View style={styles.box}>
        <View style={styles.inside}>
          {/* {props.videoId != "" && <RenderVideo videoId={props.videoId} />}
          <Text style={styles.text}>{props.material}</Text>
          <View style={styles.material}>
            <Text style={styles.text}>{props.link}</Text>
          </View>
          <Button title={"Upload"} /> */}
        </View>
      </View>
    </View>
  );
}

function CourseInfo({ route }) {
  const [user, setUser] = useState(route.params.user);
  const [course, setCourse] = useState(route.params.course);
  const [member, setmember] = useState(0);
  const [lesson, setLesson] = useState("");
  const [modalVisibleCreateLesson, setModalVisibleCreateLesson] = useState(false);
  const [allLesson, setAllLesson] = useState([]);
  // console.log(user)

  async function getMember() {
    let users = await AsyncStorage.getItem("@login");
    await axios
      .post("http://localhost:3000/getMember", {
        course_id: course.course_id,
      })
      .then((response) => {
        // console.log(response.data)
        setmember(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
    await axios
      .post("http://localhost:3000/getUserId", {
        id: JSON.parse(users).user_id,
      })
      .then((response) => {
        setUser(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function getLesson() {
    await axios
      .post("http://localhost:3000/getLesson", {
        course_id: course.course_id,
      })
      .then((response) => {
        setAllLesson(response.data);
        // console.log(response.data)
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getMember();
    getLesson();
  }, []);
  console.log(allLesson);
  async function CreateLesson() {
    await axios
      .post("http://localhost:3000/createLesson", {
        lesson: lesson,
        course_id: course.course_id,
        u_id: user.user_id,
      })
      .then((response) => {
        if (response.data == "success") {
          getLesson();
          alert("success");
          setModalVisibleCreateLesson(!modalVisibleCreateLesson);
        }
        // console.log(response.data)
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <ScrollView
      contentContainerStyle={{ alignItems: "center", paddingBottom: 20 }}
      style={[styles.scrollview]}
    >
      <RenderCourseInfo
        name={course.title}
        description={course.subtitle}
        member={member}
      />
      <View style={styles.centeredView}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisibleCreateLesson}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisibleCreateLesson(!modalVisibleCreateLesson);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Create Lesson</Text>
              <TextInput
                onChangeText={(text) => setLesson(text)}
                style={styles.input}
                placeholder="Please Input"
              />
              <View
                style={{
                  flexDirection: "row",
                  width: "100%",
                  justifyContent: "center",
                }}
              >
                <Pressable
                  style={[
                    styles.button,
                    styles.buttonClose,
                    { marginLeft: 5, marginRight: 5 },
                  ]}
                  onPress={() => setModalVisibleCreateLesson(!modalVisibleCreateLesson)}
                >
                  <Text style={styles.textStyle}>Cancel</Text>
                </Pressable>
                <Pressable
                  style={[
                    styles.button,
                    styles.buttonConfirm,
                    { marginRight: 5, marginLeft: 5 },
                  ]}
                  onPress={() => {
                    CreateLesson();
                  }}
                >
                  <Text style={styles.textStyle}>Create</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </View>
      


      
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: "80%",
          marginTop: 10,
        }}
      >
        <Text style={{ fontSize: 24, fontWeight: "500" }}>Create Lesson</Text>
        <TouchableOpacity
          onPress={() => {
            setModalVisibleCreateLesson(!modalVisibleCreateLesson);
          }}
        >
          <Text style={{ fontSize: 24, fontWeight: "500" }}>+</Text>
        </TouchableOpacity>
      </View>
      {allLesson.map((value) => {
        return (
          <RenderCourseOverView
            key={value.h_id}
            lesson={value.lesson}
            course_description="Course Description"
            material="Material"
          />
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D9D9D9",
    justifyContent: "center",
    // alignItems: "center",
    borderRadius: 10,
    marginTop: 20,
    // marginLeft: 50,
    width: "90%",

    borderRadius: 10,
  },
  scrollview: {
    flex: 1,
    backgroundColor: "#FFF8EA",
    // marginTop: 50,
  },
  logo: {
    width: 300,
    height: 140,
  },
  header: {
    paddingHorizontal: 20,
    flexDirection: "row",
    backgroundColor: "#7AAFFF",
    width: "100%",
    justifyContent: "center",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    padding: 10,
  },

  box: {
    padding: 10,
    marginTop: 10,
  },

  header2: {
    paddingHorizontal: 20,
    flexDirection: "row",
    backgroundColor: "#FF9A00",
    width: "100%",
    justifyContent: "center",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    padding: 10,
  },
  inside: {
    width: "100%",
    alignItems: "center",
  },
  text: {
    marginBottom: 10,
  },
  material: {
    width: 250,
    backgroundColor: "#fff",
    shadowRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 0 },
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    width: "90%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    width: 100,
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: "#FA9828",
  },
  buttonConfirm: {
    backgroundColor: "#56F280",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  input: {
    height: 40,
    width: "90%",
    padding: 12,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CourseInfo;
