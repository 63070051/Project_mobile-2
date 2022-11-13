import { useRef, useState } from "react";
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
  Button,
} from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import {
  actions,
  RichEditor,
  RichToolbar,
} from "react-native-pell-rich-editor";
import RenderHtml from "react-native-render-html";
import * as DocumentPicker from "expo-document-picker";
import Path from "../../path";
import axios from "axios";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import SelectDropdown from "react-native-select-dropdown";
import Youtube from "react-native-youtube-iframe";
import moment from "moment";

function CreateDescription({route}) {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState(null);
  const [course, setCourse] = useState(route.params.course);
  const [user, setUser] = useState(route.params.user);
  const { width } = useWindowDimensions();
  const [description, setDescription] = useState("");
  const [selectType, setSelectType] = useState("");
  const type = ["Youtube", "Assignment"];
  const [selectedDate, setSelectedDate] = useState();
  const router = useNavigation();
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setSelectedDate(date);
    hideDatePicker();
  };

  async function createDescription() {
    await axios
      .post(`${Path}/createDescription`, {
        type: selectType,
        data: description,
        course_id: course.course_id,
        h_id: route.params.h_id,
        u_id: user.user_id,
        time : selectedDate
      })
      .then((response) => {
        if (response.data == "success") {
          alert("success");
          router.goBack();
        }
        // console.log(response.data)
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function RenderVideo(props) {
    const [playing, setPlaying] = useState(false);
    console.log(props);
    const togglePlaying = () => {
      setPlaying((prev) => !prev);
    };
    return (
      <Youtube
        height={220}
        width={width - 50}
        play={playing}
        videoId={props.videoId}
      />
    );
  }

  return (
    <View style={styles.container}>
      <SelectDropdown
        data={type}
        dropdownStyle={[styles.dropdown]}
        defaultButtonText={"Youtube"}
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
        placeholder={
          selectType == "Youtube"
            ? "Please input link youtube"
            : "Please input title assignment"
        }
      />
      {selectType == "Youtube" && description != "" && (
        <RenderVideo videoId={description.substring(32)} />
      )}
      <Text>{`Date:  ${
        selectedDate
          ? moment(selectedDate).format("D MMMM YYYY, h:mm:ss a")
          : "Please select date"
      }`}</Text>
      <Button title="Select Time" onPress={showDatePicker} />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      <TouchableOpacity
        onPress={() => {
          createDescription();
        }}
      >
        <Text>Upload</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF8EA",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  button: {
    width: 300,
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    marginTop: 20,
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
  input: {
    // width: "90%",
    padding: 12,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
  },
});

export default CreateDescription;
