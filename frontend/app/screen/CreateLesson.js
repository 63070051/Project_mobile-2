import { useRef, useState } from "react";
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import {
  actions,
  RichEditor,
  RichToolbar,
} from "react-native-pell-rich-editor";
import RenderHtml from "react-native-render-html";

function CreateLesson() {
  const richText = useRef();

  const [descHTML, setDescHTML] = useState("");
  const [showDescError, setShowDescError] = useState(false);
  const { width } = useWindowDimensions();
  const richTextHandle = (descriptionText) => {
    if (descriptionText) {
      setShowDescError(false);
      setDescHTML(descriptionText);
    } else {
      setShowDescError(true);
      setDescHTML("");
    }
  };

  const submitContentHandle = () => {
    const replaceHTML = descHTML.replace(/<(.|\n)*?>/g, "").trim();
    const replaceWhiteSpace = replaceHTML.replace(/&nbsp;/g, "").trim();

    if (replaceWhiteSpace.length <= 0) {
      setShowDescError(true);
    } else {
      // send data to your server!
    }
  };

  return (
    <ScrollView contentContainerStyle={{marginBottom : 30}}>
      <SafeAreaView edges={["bottom", "left", "right"]} style={{ flex: 1 }}>
        <View style={styles.container}>
          <Text style={[styles.headerStyle, {fontSize: 21}]}>Crate Lesson</Text>
          <Text style={[styles.headerStyle, {alignSelf: "flex-start"}]}>Lesson</Text>
          <TextInput 
            style={styles.textinput}
          />
          <Pressable onPress={() => richText.current?.dismissKeyboard()}>
            <Text style={[styles.headerStyle, {marginTop : 10}]}>Your Awesome Content</Text>
            <View style={styles.htmlBoxStyle}>
              <RenderHtml contentWidth={width} source={{ html: descHTML }} />
            </View>
          </Pressable>
          <View style={styles.richTextContainer}>
            <RichEditor
              ref={richText}
              onChange={richTextHandle}
              placeholder="Write your cool content here :)"
              androidHardwareAccelerationDisabled={true}
              style={styles.richTextEditorStyle}
              initialHeight={250}
            />
            <RichToolbar
              editor={richText}
              selectedIconTint="#873c1e"
              iconTint="#312921"
              actions={[
                actions.insertImage,
                actions.setBold,
                actions.setItalic,
                actions.insertBulletsList,
                actions.insertOrderedList,
                actions.insertLink,
                actions.setStrikethrough,
                actions.setUnderline,
                actions.insertVideo,
                actions.undo,
                actions.redo,
              ]}
              style={styles.richTextToolbarStyle}
            />
          </View>
          {showDescError && (
            <Text style={styles.errorTextStyle}>
              Your content shouldn't be empty 🤔
            </Text>
          )}

          <TouchableOpacity
            style={styles.saveButtonStyle}
            onPress={submitContentHandle}
          >
            <Text style={styles.textButtonStyle}>Add</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    backgroundColor: "#FFF8EA",
    padding: 20,
    alignItems: "center",
  },

  headerStyle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#312921",
    marginBottom: 10,
  },

  htmlBoxStyle: {
    height: 200,
    width: 374,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2.62,
    elevation: 4,
    fontSize: 20,
  },

  richTextContainer: {
    display: "flex",
    flexDirection: "column-reverse",
    width: "100%",
    marginBottom: 10,
  },

  richTextEditorStyle: {
    width: "100%",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderColor: "#ccaf9b",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2.62,
    elevation: 4,
    fontSize: 20,
  },

  richTextToolbarStyle: {
    backgroundColor: "#ffbA00",
    borderColor: "#ffbA00",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderWidth: 1,
  },

  errorTextStyle: {
    color: "#FF0000",
    marginBottom: 10,
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
    marginTop: 9,
    backgroundColor: "#ffbA00"
  },

  textButtonStyle: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
  },
  textinput: {
    backgroundColor: "white",
    width: "100%",
    padding: 13,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2.62,
    elevation: 4,
    fontSize: 20,
  },

});

export default CreateLesson;
