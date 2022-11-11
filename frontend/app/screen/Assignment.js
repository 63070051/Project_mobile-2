import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import Path from "../../path";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

function Assignment({ route }) {
  const [user, setUser] = useState([]);
  const [document, setDocument] = useState([]);
  const router = useNavigation();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    setDocument(result);
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    console.warn("A date has been picked: ", date);
    hideDatePicker();
  };

  function File_upload(props) {
    return (
      <View
        style={{
          width: "100%",
          padding: 13,
          borderBottomWidth: 1,
          borderColor: "darkgrey",
          justifyContent: "space-between",
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
          <AntDesign name="pdffile1" size={28} color="black" />
          <Text style={{ marginLeft: 10 }}>{props.name}</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            setDocument([]);
          }}
        >
          <MaterialIcons name="delete" size={28} color="red" />
        </TouchableOpacity>
      </View>
    );
  }
  let no_file = <Text style={{ alignSelf: "center" }}>Empty!</Text>;
  const submitContentHandle = async () => {
    const replaceHTML = descHTML.replace(/<(.|\n)*?>/g, "").trim();
    const replaceWhiteSpace = replaceHTML.replace(/&nbsp;/g, "").trim();

    if (replaceWhiteSpace.length <= 0) {
      setShowDescError(true);
    } else {
      if (document.name == undefined) {
      } else {
      }
      // send data to your server!
    }
  };
  console.log(document);
  return (
    <View>
      <View
        style={[
          styles.upload,
          no_file ? { justifyContent: "center", height: 100 } : null,
        ]}
      >
        {document.name == undefined && no_file}
        {document.name != undefined && (
          <File_upload key={document} name={document.name} />
        )}
      </View>
      <TouchableOpacity
        style={[styles.saveButtonStyle, { marginTop: 20 }]}
        onPress={() => {
          pickDocument();
        }}
      >
        <Button title="Show Date Picker" onPress={showDatePicker} />
        <Text style={styles.textButtonStyle}>Upload your file</Text>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF8EA",
  },

  upload: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2.62,
    elevation: 4,
    fontSize: 20,
    padding: 10,
  },
  saveButtonStyle: {
    borderWidth: 1,
    borderColor: "#ffbA00",
    borderRadius: 10,
    padding: 10,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2.62,
    elevation: 4,
    fontSize: 20,
    marginTop: 10,
    backgroundColor: "#ffbA00",
  },

  textButtonStyle: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
  },
});
export default Assignment;
