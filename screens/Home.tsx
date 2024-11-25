import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import React, { useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { firebase } from "../config";

type Profile = {
  nom: string;
  prenom: string;
  telephone: string;
};

const auth = firebase.auth();

const db = firebase.database();
const ref_listprofiles = db.ref("list_profiles/");

const tabs = createMaterialBottomTabNavigator();
export default function Home(props: any) {
  const [data, setData] = useState<Profile[]>([]);
  useEffect(() => {
    ref_listprofiles.on("value", (snapshot) => {
      const d: Profile[] = [];
      const list = snapshot.forEach((profile) => {
        d.push(profile.val());
      });
      setData(d);
    });

    return () => ref_listprofiles.off("value");
  }, []);

  console.log("data: ", data);

  function handleLogout() {
    auth.signOut().then(() => props.navigation.replace("Auth"));
  }

  return (
    <View>
      <Text>home</Text>
      <Pressable onPress={handleLogout}>
        <Text>Logout</Text>
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={() => props.navigation.replace("Profile")}
      >
        <Text style={{ color: "white" }}>Profile</Text>
      </Pressable>
      <Pressable
        style={[styles.button, { backgroundColor: "orange" }]}
        onPress={() => props.navigation.navigate("Chat")}
      >
        <Text style={{ color: "white" }}>Chat</Text>
      </Pressable>
      {/* make a flatlist of the profiles */}
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <View style={styles.profile}>
            <Pressable
              onPress={() =>
                props.navigation.navigate("Chat", { profile: item })
              }
            >
              <Text>{item.nom}</Text>
              <Text>{item.prenom}</Text>
              <Text>{item.telephone}</Text>
            </Pressable>
          </View>
        )}
        keyExtractor={(item) => item.telephone}
      />
    </View>
  );
}

// styles for the profiles list
const styles = StyleSheet.create({
  profile: {
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
  },
  button: {
    backgroundColor: "blue",
    color: "#fff",
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
});
