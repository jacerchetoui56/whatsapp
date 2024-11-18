import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableHighlight,
} from "react-native";
import firebase from "../../config";

const auth = firebase.auth();

export default function MyProfile(props: any) {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [telephone, setTelephone] = useState("");

  const profile = auth.currentUser;

  console.log("profile : ", profile);

  useEffect(() => {
    if (profile) {
      const displayName = profile.displayName || "";
      const [_prenom, _nom] = displayName.split(" ");
      console.log("updating: ", _prenom, _nom, profile.phoneNumber);
      setNom(_nom);
      setPrenom(_prenom);
      setTelephone(profile.phoneNumber || "");
    }
  }, []);

  function handleUpdateData() {
    auth
      .updateCurrentUser({
        ...profile,
        displayName: prenom + " " + nom,
        phoneNumber: telephone,
      })
      .then(() => props.navigation.replace("Home"))
      .catch(() => ToastAndroid.show("Error Updating", ToastAndroid.SHORT));
  }

  return (
    <ImageBackground
      source={require("../../assets/me.jpg")}
      style={styles.container}
    >
      <StatusBar style="light" />
      <Text style={styles.textstyle}>My Account</Text>

      <Image
        source={require("../../assets/icon.png")}
        style={{
          height: 200,
          width: 200,
          borderRadius: 100,
        }}
      />

      <TextInput
        onChangeText={(text) => {
          setNom(text);
        }}
        value={nom}
        textAlign="center"
        placeholderTextColor="#fff"
        placeholder="Nom"
        keyboardType="name-phone-pad"
        style={styles.textinputstyle}
      ></TextInput>
      <TextInput
        onChangeText={(text) => {
          setPrenom(text);
        }}
        value={prenom}
        textAlign="center"
        placeholderTextColor="#fff"
        placeholder="Prenom"
        keyboardType="name-phone-pad"
        style={styles.textinputstyle}
      ></TextInput>
      <TextInput
        onChangeText={(text) => {
          setTelephone(text);
        }}
        value={telephone}
        placeholderTextColor="#fff"
        textAlign="center"
        placeholder="Numero"
        style={styles.textinputstyle}
      ></TextInput>
      <TouchableHighlight
        activeOpacity={0.5}
        underlayColor="#DDDDDD"
        onPress={handleUpdateData}
        style={{
          marginBottom: 10,
          borderColor: "#00f",
          borderWidth: 2,
          backgroundColor: "#08f6",
          fontSize: 24,
          height: 60,
          width: "50%",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 5,
          marginTop: 20,
        }}
      >
        <Text
          style={{
            color: "#FFF",
            fontSize: 24,
          }}
        >
          Save
        </Text>
      </TouchableHighlight>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  textinputstyle: {
    fontWeight: "bold",
    backgroundColor: "#0004",
    fontSize: 20,
    color: "#fff",
    width: "75%",
    height: 50,
    borderRadius: 10,
    margin: 5,
  },
  textstyle: {
    fontSize: 40,
    fontFamily: "serif",
    color: "#07f",
    fontWeight: "bold",
  },
  container: {
    color: "blue",
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
