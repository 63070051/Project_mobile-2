import React from "react";
import { StyleSheet, Text, View , Image, TouchableOpacity, ScrollView} from "react-native";
import { TextInput } from "react-native-gesture-handler";


function CourseCreate(){
    const [CourseName, setCourseName] = React.useState("");
    const [CourseSubTitle, setCourseSubTitle] = React.useState("");
    const [CourseKey, setCourseKey] = React.useState("");
    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.box}>
                <Text style={styles.text_header}>Create Course</Text>
                <View style={styles.inside}>
                    <Text style={styles.text}>Course Name</Text>
                <TextInput placeholder="Course Title"
                style={styles.textinput}>
                </TextInput>

                <Text style={styles.text}>Sub title</Text>
                <TextInput placeholder="Course Subtitle"
                style={styles.textinput}>
                </TextInput>

                <Text style={styles.text}>Enroll Key</Text>
                <TextInput placeholder="Course Key"
                style={styles.textinput}>
                </TextInput>

                

                </View>
                </View>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF8EA",
        alignItems: "center",
    },
    text_header:{
        fontSize: 30,
    },
    header: {
        // marginTop: 50,
        paddingHorizontal: 20,
        flexDirection: "row",
    },
    box:{
        width: "100%",
        padding: 10,
        marginTop: 20,
        backgroundColor: "#FF9A00",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
    },
    inside:{
        marginTop: 20,
        width: "100%",
        padding: 10,
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#ffaa6e",
        borderRadius: 10,
    },
    textinput:{
        backgroundColor: "#fff",
        marginTop: 10,
        marginBottom: 20,
        width: "80%",
        padding: 10,
        height: 30,
        borderRadius: 5,
    },
    text:{
        fontSize: 20,
    }
    });

export default CourseCreate;