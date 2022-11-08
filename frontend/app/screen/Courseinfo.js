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
  Linking,
} from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Youtube from "react-native-youtube-iframe";
import { TEST_ID } from "react-native-gifted-chat";
import Path from "../../path";

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
  return (
    <Youtube height={200} width={350} play={playing} videoId={props.videoId} />
  );
}

function RenderTitle(props) {
  return (
    <Text style={{ fontSize: 24, fontWeight: "bold" }}>{props.title}</Text>
  );
}

function RenderText(props) {
  return <Text style={{ fontSize: 16, fontWeight: "400" }}>{props.text}</Text>;
}

function RenderLink(props) {
  return (
    <Text
      style={{ fontSize: 16, fontWeight: "400", color: "blue" }}
      onPress={() => Linking.openURL(`${props.link}`)}
    >
      {props.link}
    </Text>
  );
}

function CourseInfo({ route }) {
  const [user, setUser] = useState(route.params.user);
  const [course, setCourse] = useState(route.params.course);
  const [member, setmember] = useState(0);
  const [lesson, setLesson] = useState("");
  const [description, setDescription] = useState("");
  const [allDescription, setAllDescription] = useState([]);
  const [selectType, setSelectType] = useState("");
  const [lessonId, setLessonId] = useState("");
  const [modalVisibleCreateLesson, setModalVisibleCreateLesson] =
    useState(false);
  const [modalVisibleCreateDescription, setModalVisibleCreateDescription] =
    useState(false);
  const [material, setMaterial] = useState(false);
  const [allLesson, setAllLesson] = useState([]);
  const type = ["Youtube", "Text", "Title", "Link"];
  // console.log(user)

  function RenderCourseOverView(props) {
    return (
      <View style={styles.container}>
        <View style={styles.header2}>
          <Text style={styles.text_header}>{props.lesson}</Text>
        </View>
        <View
          style={{
            padding: 10,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 16 }}>{props.course_description}</Text>
          <TouchableOpacity
            onPress={() => {
              setModalVisibleCreateDescription(!modalVisibleCreateDescription);
              setLessonId(props.value.h_id);
            }}
          >
            <Text style={{ fontSize: 16 }}>+</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.box}>
          <View style={styles.inside}>
            {allDescription &&
              allDescription.map((value) => {
                if (value.type == "Youtube" && props.value.h_id == value.h_id) {
                  return (
                    <RenderVideo
                      key={value.d_id}
                      videoId={value.data.substring(32)}
                    />
                  );
                } else if (
                  value.type == "Title" &&
                  props.value.h_id == value.h_id
                ) {
                  return <RenderTitle key={value.d_id} title={value.data} />;
                } else if (
                  value.type == "Text" &&
                  props.value.h_id == value.h_id
                ) {
                  return <RenderText key={value.d_id} text={value.data} />;
                } else if (
                  value.type == "Link" &&
                  props.value.h_id == value.h_id
                ) {
                  return <RenderLink key={value.d_id} link={value.data} />;
                }
              })}
            <TouchableOpacity
              style={styles.material}
              onPress={() => {
                setLessonId(props.value.h_id);
                setMaterial(!material);
              }}
            >
              <Text style={styles.text}>{props.material}</Text>
            </TouchableOpacity>
            {material && props.value.h_id == lessonId && (
              <View>
                <Text>dffdsfssfs</Text>
              </View>
            )}
          </View>
        </View>
      </View>
    );
  }
  async function getMember() {
    let users = await AsyncStorage.getItem("@login");
    await axios
      .post(`${Path}/getMember`, {
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
      .post(`${Path}/getUserId`, {
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
      .post(`${Path}/getLesson`, {
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
  async function getDesciption() {
    await axios
      .post(`${Path}/getDescription`, {
        course_id: course.course_id,
      })
      .then((response) => {
        setAllDescription(response.data);
        // console.log(response.data)
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getMember();
    getLesson();
    getDesciption();
  }, []);
  async function CreateLesson() {
    await axios
      .post(`${Path}/createLesson`, {
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

  async function createDescription() {
    await axios
      .post(`${Path}/createDescription`, {
        type: selectType,
        data: description,
        course_id: course.course_id,
        h_id: lessonId,
        u_id: user.user_id,
      })
      .then((response) => {
        if (response.data == "success") {
          // getLesson();
          alert("success");
          getDesciption();
          setModalVisibleCreateDescription(!modalVisibleCreateDescription);
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
                style={[styles.input, { width: "90%" }]}
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
                  onPress={() =>
                    setModalVisibleCreateLesson(!modalVisibleCreateLesson)
                  }
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

      <View style={styles.centeredView}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisibleCreateDescription}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisibleCreateDescription(!modalVisibleCreateDescription);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Create Description</Text>
              <View style={{ width: "100%", alignItems: "center" }}>
                <SelectDropdown
                  data={type}
                  dropdownStyle={[styles.dropdown]}
                  // defaultButtonText={props.role}
                  buttonStyle={styles.button}
                  onSelect={(selectedItem, index) => {
                    {
                      setSelectType(selectedItem);
                    }
                  }}
                  buttonTextAfterSelection={(selectedItem, index) => {
                    // text represented after item is selected
                    // if data array is an array of objects then return selectedItem.property to render after item is selected
                    return selectedItem;
                  }}
                  rowTextForSelection={(item, index) => {
                    // text represented for each item in dropdown
                    // if data array is an array of objects then return item.property to represent item in dropdown
                    return item;
                  }}
                />
                <TextInput
                  onChangeText={(text) => setDescription(text)}
                  multiline={true}
                  style={[
                    selectType == "Text" ? styles.textArea : styles.input,
                    { width: "100%", marginTop: 10 },
                  ]}
                  placeholder="Please Input"
                />
              </View>
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
                  onPress={() =>
                    setModalVisibleCreateDescription(
                      !modalVisibleCreateDescription
                    )
                  }
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
                    createDescription();
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
            value={value}
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
    // width: "90%",
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
  dropdown: {
    width: 200,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    marginTop: 10,
    marginLeft: 10,
  },
  textArea: {
    height: 300,
    padding: 12,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
  },
});

export default CourseInfo;
