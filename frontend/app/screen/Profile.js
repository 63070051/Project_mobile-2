import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";
import * as React from "react";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import {
  Foundation,
  MaterialCommunityIcons,
  SimpleLineIcons,
  MaterialIcons,
  AntDesign
} from "@expo/vector-icons";

function Profile() {
  const [checkinpass, setCheckinpass] = React.useState(false);
  const [checkpass, setCheckpass] = React.useState(false);
  const [checkNewpass, setChecknewpass] = React.useState(false)
  const [oldPassword, setOldpass] = React.useState("");
  const [newPassword, setNewpass] = React.useState("");
  const [image, setImage] = React.useState(null);
  const [objectImg, setObjectImg] = React.useState([]);
  const [openReset, setOpenreset] = React.useState(false);
  const checkResetpassword = () => {
    let password = "1234";
    if (!oldPassword){
      setCheckinpass(true)
    } else if (password != oldPassword) {
      setCheckpass(true);
    } else if(!newPassword) {
      setChecknewpass(true)
    } else {
      return Alert.alert(
        "Are your sure?",
        "Are you sure you want to reset password?",
        [
          // The "Yes" button
          {
            text: "Yes",
            onPress: () => {
              setOpenreset(false)
              setOldpass("")
              setNewpass("")
            },
          },
          // The "No" button
          // Does nothing but dismiss the dialog when tapped
          {
            text: "No",
          },
        ]
      );
    }
  };
  const logout = () => {
    return Alert.alert(
      "Are your sure?",
      "Are you to Logout?",
      [
        // The "Yes" button
        {
          text: "Yes",
          onPress: () => {
          },
        },
        // The "No" button
        // Does nothing but dismiss the dialog when tapped
        {
          text: "No",
        },
      ]
    );
  }
  let profile_user_not_upload = (
    <View style={[styles.box]}>
      <Image source={require("../assets/user.png")} style={styles.image} />
    </View>
  );
  let reset_password = (
    <View>
      <TextInput
        style={[styles.input]}
        placeholder="Old Password"
        secureTextEntry={true}
        autoCorrect={false}
        onChangeText={(pass) => {
          setOldpass(pass);
          setCheckpass(false);
          setCheckinpass(false)
        }}
      />
      {checkpass && (
        <Text style={{ color: "red", marginTop: 5, marginLeft: 5 }}>
          Incorrect password
        </Text>
      )}
      {checkinpass && (
        <Text style={{ color: "red", marginTop: 5, marginLeft: 5 }}>
          Please insert password
        </Text>
      )}
      <TextInput
        style={[styles.input, { marginTop: 20 }]}
        placeholder="New Password"
        secureTextEntry={true}
        autoCorrect={false}
        onChangeText={(pass) => {
          setNewpass(pass);
          setChecknewpass(false)
        }}
      />
      {checkNewpass && (
        <Text style={{ color: "red", marginTop: 5, marginLeft: 5 }}>
          Please insert password
        </Text>
      )}
      <View
        style={{
          marginTop: 20,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity
          onPress={checkResetpassword}
          style={[styles.buttonpho, { backgroundColor: "#FF9A00" }]}
        >
          <Text style={{ color: "white" }}>Confirm Reset Password</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setOldpass("")
            setNewpass("")
            setOpenreset(false);
            setCheckinpass(false);
            setChecknewpass(false);
            setCheckpass(false);
          }}
          style={[styles.buttonpho, { backgroundColor: "darkgray" }]}
        >
          <Text style={{ color: "white" }}>cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  let but_reset = (
    <TouchableOpacity
      onPress={() => {
        setOpenreset(true);
      }}
      style={[styles.button, { flexDirection: "row" }]}
    >
      <MaterialCommunityIcons name="lock-reset" size={24} color="grey" />
      <Text style={[{ marginLeft: 10 }, { color: "grey" }]}>
        Reset Password
      </Text>
    </TouchableOpacity>
  );
  let confirm_addphoto = (
    <TouchableOpacity
      style={[styles.button, { flexDirection: "row" }]}
    >
      <MaterialIcons name="add-photo-alternate" size={24} color="grey" />
      <Text style={[{ marginLeft: 10 }, { color: "grey" }]}>Confirm to update photo</Text>
    </TouchableOpacity>
  );
  let remove_photo = (
    <TouchableOpacity
      onPress={() => setImage(null)}
      style={[styles.button, { flexDirection: "row" }]}
    >
      <MaterialIcons name="no-photography" size={24} color="grey" />
      <Text style={[{ marginLeft: 10 }, { color: "grey" }]}>Remove Photo</Text>
    </TouchableOpacity>
  );
  let add_photo = (
    <TouchableOpacity
      onPress={() => {
        pickImage();
      }}
      style={[styles.button, { flexDirection: "row" }]}
    >
      <MaterialIcons name="add-a-photo" size={24} color="grey" />
      <Text style={[{ marginLeft: 10 }, { color: "grey" }]}>Add new Photo</Text>
    </TouchableOpacity>
  );
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
      setObjectImg(result);
    }
  };
  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 60 }}
      style={styles.container}
    >
      <View style={styles.boxback}></View>
      <View style={styles.box}></View>
      <View style={styles.boxset}>
        {!image && profile_user_not_upload}
        {image && (
          <View style={styles.box}>
            <Image source={{ uri: image }} style={styles.image} />
          </View>
        )}
        <View style={{ height: 40 }}>
          <Text style={[{ fontSize: 17 }, { fontWeight: "700" }]}>
            63070077@it.kmitl.ac.th
          </Text>
        </View>
        {image && confirm_addphoto}
        {!image && add_photo}
        {image && remove_photo}
        {!openReset && but_reset}
        {openReset && reset_password}
        <TouchableOpacity
          onPress={() => {
            logout()
          }}
          style={[styles.button, { flexDirection: "row" }]}
        >
          <SimpleLineIcons name="logout" size={20} color="grey" />
          <Text style={[{ marginLeft: 14 }, { color: "grey" }]}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF8EA",
    flex: 1,
  },
  box: {
    height: 90,
    alignItems: "center",
    justifyContent: "center",
  },
  boxset: {
    backgroundColor: "white",
    alignItems: "center",
    marginTop: 50,
    marginHorizontal: 20,
    justifyContent: "center",
    // borderWidth : 1,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: -2,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  buttonpho: {
    alignItems: "center",
    padding: 13,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: -2,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  button: {
    width: "100%",
    // backgroundColor: "#FF9A00",
    alignItems: "center",
    padding: 15,
    // borderWidth : 1
  },
  input: {
    width: 330,
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: -2,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
    backgroundColor: "white",
  },
  image: {
    height: 150,
    width: 150,
    borderRadius: 999,
    shadowColor: "#000",
    shadowOffset: {
      width: -2,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    // elevation: 5,
    position: "absolute",
    top: -80,
  },
  boxback: {
    backgroundColor: "#FF9A00",
    height: 200,
    width: "100%",
    position: "absolute",
  },
});
export default Profile;
