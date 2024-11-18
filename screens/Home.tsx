import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import React from "react";
import { Pressable, Text, View } from "react-native";
import firebase from "../config";

const auth = firebase.auth();

const tabs = createMaterialBottomTabNavigator();
export default function Home(props: any) {
  function handleLogout() {
    auth.signOut().then(() => props.navigation.replace("Auth"));
  }

  return (
    <View>
      <Text>home</Text>
      <Pressable onPress={handleLogout}>
        <Text>Logout</Text>
      </Pressable>
      <Pressable onPress={() => props.navigation.replace("Profile")}>
        <Text>Profile</Text>
      </Pressable>
    </View>
  );
}
