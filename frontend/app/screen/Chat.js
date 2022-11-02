import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Container,
  Card,
  UserInfo,
  UserImgWrapper,
  UserInfoText,
  UserImg,
  UserName,
  PostTime,
  MessageText,
  TextSection,
} from "../styles/chat";

function Chat(props) {
  const [allUser, setAllUser] = useState([]);
  const [user, setUser] = useState([]);
  const getUser = async () => {
    let users = await AsyncStorage.getItem("@login");
    axios
      .post("http://localhost:3000/getUserId", {
        id: JSON.parse(users).user_id,
      })
      .then((response) => {
        setUser(response.data);
        axios
          .post("http://localhost:3000/getUserChat", {
            id: response.data.user_id,
          })
          .then((response) => {
            setAllUser(response.data);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
    // return JSON.parse(user);
  };

  const renderItem = (itemData) => {
    let check = false;
    if (itemData.index == 0) {
      check = true;
    }
    return (
      // <View style={[styles.boxchat, check ? styles.boxeven : styles.boxodd]}>
      //   <Image style={styles.profile} source={{uri : "http://localhost:3000" + props.item.img}}/>
      //   <Text style={{fontSize : 20, paddingLeft : 12, fontWeight : "700"}}>
      //     {props.item.email}
      //   </Text>
      // </View>
      <Card onPress={() => props.navigation.navigate("chatinfo", {DATA : itemData, user : user})}>
        <UserInfo>
          <UserImgWrapper>
            <UserImg
              source={{ uri: "http://localhost:3000" + itemData.item.img }}
            />
          </UserImgWrapper>
          <TextSection>
            <UserName>{itemData.item.email}</UserName>
          </TextSection>
        </UserInfo>
      </Card>
    );
  };

  useEffect(() => {
    getUser();
  }, []);
  return (
    <Container>
      {allUser && (
        <FlatList
          data={allUser}
          keyExtractor={(user) => user.user_id}
          renderItem={renderItem}
        />
      )}
    </Container>
  );
}
const styles = StyleSheet.create({
  scrollview: {
    flex: 1,
    backgroundColor: "#FFF8EA",
  },

  container: {
    flex: 1,
    backgroundColor: "#FFFF",
    // paddingTop : 50,
    padding: 10,
    // alignItems: "center",
    // justifyContent : "center"
  },
  profile: {
    width: 60,
    height: 60,
    borderRadius: 999,
  },
  boxchat: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  boxeven: {
    backgroundColor: "#DBDBDB",
  },
  boxodd: {
    backgroundColor: "#B6B6B6",
  },
});
export default Chat;
