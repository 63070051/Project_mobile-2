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

function CreateDescription() {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState(null);



//   async function createDescription() {
//     await axios
//       .post(`${Path}/createDescription`, {
//         type: selectType,
//         data: description,
//         course_id: course.course_id,
//         h_id: lessonId,
//         u_id: user.user_id,
//       })
//       .then((response) => {
//         if (response.data == "success") {
//           // getLesson();
//           alert("success");
//           getDesciption();
//           setModalVisibleCreateDescription(!modalVisibleCreateDescription);
//         }
//         // console.log(response.data)
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }

  return <Text>test</Text>;
}

export default CreateDescription;
