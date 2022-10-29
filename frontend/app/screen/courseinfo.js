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

function CourseInfo() {
  return (
    <ScrollView style={styles.scrollview}>
      <View style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.text_header}>Course Info</Text>
            <Text style={styles.text}>XXXXXXXXXXXX</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "gray",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 10,
    marginLeft: 50,
    width: 300,
    

  },
  scrollview: {
    flex: 1,
    backgroundColor: "#FFF8EA",
    marginTop: 50,
    
  },
  logo: {
    width: 300,
    height: 140,
  },
    header: {

    },
});

export default CourseInfo;
