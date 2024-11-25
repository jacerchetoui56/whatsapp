import React, { useState, useEffect } from "react";
import {
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { StatusBar } from "expo-status-bar";
import { firebase } from "../../config";

const db = firebase.database();
const ref_listprofiles = db.ref("list_profiles/");

export default function ListProfiles(props: any) {
  const [data, setdata] = useState<any[]>([]);
  const currentId = props.route.params("currentId");
  useEffect(() => {
    let d: any[] = [];
    ref_listprofiles.on("value", (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        if (childSnapshot.val().id !== currentId) d.push(childSnapshot.val());
      });
      console.log(snapshot);
      setdata(d);
    });
    return () => {
      ref_listprofiles.off();
    };
  }, []);

  return (
    <ImageBackground
      source={require("../../assets/me2.jpg")}
      style={styles.container}
    >
      <StatusBar style="light" />
      <Text style={styles.textstyle}>List Profiles</Text>
      <FlatList
        data={data}
        keyExtractor={(data) => data.key}
        renderItem={({ item }) => (
          <View>
            <Text
              onPress={() => {
                props.navigation.navigate("Chat", {
                  currentId,
                  secondId: item.id,
                });
              }}
              style={{ fontSize: 30, color: "#fff", margin: 10 }}
            >
              {item.nom}
            </Text>
            <Text style={{ fontSize: 30, color: "#fff", margin: 10 }}>
              {item.prenom}
            </Text>
            <Text style={{ fontSize: 30, color: "#fff", margin: 10 }}>
              {item.telephone}
            </Text>
          </View>
        )}
      />
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
