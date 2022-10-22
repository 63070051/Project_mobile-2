import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import { useState } from "react";
import axios from "axios";
import { FlatList} from "react-native";
import SelectDropdown from "react-native-select-dropdown";

const role = ["Student", "Teacher"];

const MapData = (props) => {
  return (
    <View style={styles.inside}>
      <Text style={styles.text}>{props.email}</Text>

      <SelectDropdown
        data={role}
        dropdownStyle={styles.dropdown}
        buttonStyle={styles.button}
        onSelect={(selectedItem, index) => {
          console.log(selectedItem, index);
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
    </View>
  );
}

async function Box(){
  await axios.get('http://localhost:3000/getUser')
  .then((response) =>{
    // setAllUser(response.data);
    return response.data;
  })
  .catch((err) =>{
    console.log(err);
  })
}

function manageRole() {
  const [search, setSearch] = useState("");
  let allUser = Box();
  

  const renderItem = (itemData) => {
    console.log(itemData)
    // return (
    //   <MapData
    //     title={itemData.item.title}
    //     duration={itemData.item.duration}
    //     complexity={itemData.item.complexity}
    //     affordability={itemData.item.affordability}
    //     image={itemData.item.imageUrl}
    //     onSelectMeal={() => {
    //       props.route.navigation.navigate("S3", {data : itemData , props : props.route})
    //     }}
    //   />
    // );
  };
  console.log(allUser)
  return (
    <ScrollView nestedScrollEnabled={true} horizontal={true} style={styles.scrollview}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.text_header}>Manage Role</Text>
          <TextInput style={styles.textInput} placeholder="Search" />
        </View>
        <View style={styles.box}>
          {/* <FlatList data={allUser} renderItems={renderItem} style={{ width: "100%" }}/> */}
          {/* {allUser.map((value) =>{
            console.log(value.email);
          })} */}
          <MapData email={allUser[0]}/>
        </View>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  scrollview: {
    flex: 1,
    backgroundColor: "#FFF8EA",
  },

  container: {
    flex: 1,
    alignItems: "center",
  },
  header: {
    marginTop: 50,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  text_header: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 30,
  },
  textInput: {
    height: 50,
    width: 350,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    marginTop: 10,
    backgroundColor: "#FFFFFF",
    borderColor: "#FF9A00",
  },
  box: {
    backgroundColor: "#fff",
    alignItems: "center",
    width: 400,
    borderRadius: 10,
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 10,
    flexDirection: "column",
    borderColor: "#FF9A00",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
  },
  dropdown: {
    width: 200,
    height: 100,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    marginTop: 10,
    marginLeft: 10,
  },
  button: {
    width: 120,
    height: 40,
    borderColor: "#FF9A00",
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: "#A8E890",
  },
  inside: {
    flexDirection: "row",
    marginBottom: 10,
  },
});
export default manageRole;
