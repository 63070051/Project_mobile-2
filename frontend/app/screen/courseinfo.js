import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import * as React from "react";
import axios from "axios";
import { Button } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import Youtube from "react-native-youtube-iframe";

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
  const [playing, setPlaying] = React.useState(false);
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
        <Text style={styles.text_header}>Week {props.week}</Text>
      </View>
      <View style={styles.box}>
        <View style={styles.inside}>
          <Text style={styles.text}>{props.course_description}</Text>
          {props.videoId != "" && <RenderVideo videoId={props.videoId} />}
          <Text style={styles.text}>{props.material}</Text>
          <View style={styles.material}>
            <Text style={styles.text}>{props.link}</Text>
          </View>
          <Button title={"Upload"} />
        </View>
      </View>
    </View>
  );
}

function CourseInfo({ route }) {
  const [user, setUser] = React.useState(route.params.user);
  const [course, setCourse] = React.useState(route.params.course);
  const [member, setmember] = React.useState(0);
  // console.log(user)

  async function getMember() {
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
  }

  React.useEffect(() => {
    getMember();
  }, []);
  return (
    <ScrollView contentContainerStyle={{alignItems: 'center' , paddingBottom : 20}} style={[styles.scrollview]}>
      <RenderCourseInfo
        name={course.title}
        description={course.subtitle}
        member={member}
      />
      <RenderCourseOverView
        week="1"
        course_description="Course Description"
        material="Material"
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D9D9D9",
    justifyContent: "center",
    alignItems: "center",
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
});

export default CourseInfo;
