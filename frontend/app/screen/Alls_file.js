import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  useWindowDimensions,
} from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Path from "../../path";
import { useNavigation } from "@react-navigation/native";
import {
  AntDesign,
  MaterialCommunityIcons,
  Ionicons,
  FontAwesome,
  Feather,
  MaterialIcons,
} from "@expo/vector-icons";

function AllFile({ route }) {
//   console.log(route);
  const { width } = useWindowDimensions();
  const router = useNavigation();
  const [allFile, setAllFile] = useState([]);
  const [descriptionLesson, setDescriptionLesson] = useState([]);
  const [course, setCourse] = useState(route.params.course);

  useEffect(() => {
    getAllDescription();
    getAllFile();
  }, []);
  console.log(descriptionLesson)
  async function getAllFile() {
    await axios
      .get(`${Path}/getSFile`)
      .then((response) => {
        setAllFile(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function getAllDescription() {
    await axios
      .post(`${Path}/getDescriptionLesson`, {h_id : route.params.h_id})
      .then((response) => {
        setDescriptionLesson(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function Render_File_Upload(props) {
    return (
      <TouchableOpacity
        onPress={() => {
          Linking.openURL(`${Path}${props.path}`);
        }}
        style={{
          width: "90%",
          padding: 13,
          borderColor: "darkgrey",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text>{props.value.email}</Text>
          <AntDesign name="pdffile1" size={28} color="black" />
          <Text style={{ marginLeft: 10 }}>{props.name}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  function LessonComponent(props) {
    const [toggle, setToggle] = useState(false);
    return (
      <View style={styles.material}>
        <TouchableOpacity
          style={[
            styles.topMaterial,
            !toggle
              ? { borderBottomEndRadius: 10, borderBottomStartRadius: 10 }
              : null,
          ]}
          onPress={() => {
            setToggle(!toggle);
          }}
        >
          <FontAwesome name="book" size={20} color="black" />
          <Text style={{ marginLeft: 8 }}>{props.title}</Text>
        </TouchableOpacity>
        {toggle && (
          <View style={styles.mainMaterail}>
            {allFile.length != 0 &&
              allFile.map((value) => {
                if (props.value.h_id == value.h_id) {
                  return (
                    <Render_File_Upload
                      key={value.f_id}
                      name={value.name}
                      path={value.path}
                      value={value}
                    />
                  );
                }
              })}
          </View>
        )}
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={{ alignItems: "center", paddingBottom: 30 }}
      style={styles.container}
    >
      {descriptionLesson.map((value) => {
        return (
          <LessonComponent key={value.d_id} title={value.data} value={value} />
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF8EA",
    paddingHorizontal: 40,
  },
  topMaterial: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#7AAFFF",
    borderTopStartRadius: 10,
    borderTopRightRadius: 10,
  },
  mainMaterail: {
    padding: 10,
  },
  material: {
    width: "100%",
    backgroundColor: "#fff",
    shadowRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 0 },
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
    alignItems: "center",
  },
});

export default AllFile;
