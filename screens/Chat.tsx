import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { firebase } from "../config";

const auth = firebase.auth();
const db = firebase.database();
const ref_discussions = db.ref("discussions");

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    // Fetch messages from Firebase and listen for updates
    const listener = ref_discussions.on("value", (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const formattedMessages = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setMessages(formattedMessages);
      }
    });

    // Cleanup listener on unmount
    return () => ref_discussions.off("value", listener);
  }, []);

  const sendMessage = () => {
    if (text.trim()) {
      const newMessage = {
        text,
        timestamp: Date.now(),
        sender: auth.currentUser?.email || "jacerdjo@gmail.com",
      };
      ref_discussions.push(newMessage);
      setText(""); // Clear input after sending
    }
  };

  const renderItem = ({ item }) => (
    <View
      style={[
        styles.message,
        {
          backgroundColor:
            auth.currentUser?.email === item.sender ? "blue" : "#e0e0e0",
          alignSelf:
            auth.currentUser?.email === item.sender ? "flex-start" : "flex-end",
        },
      ]}
    >
      <Text
        style={[
          styles.sender,
          {
            color: auth.currentUser?.email === item.sender ? "white" : "black",
          },
        ]}
      >
        {item.sender}:
      </Text>
      <Text
        style={[
          styles.text,
          {
            color: auth.currentUser?.email === item.sender ? "white" : "black",
          },
        ]}
      >
        {item.text}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={messages.sort((a, b) => a.timestamp - b.timestamp)} // Sort messages by timestamp
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.messageList}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={text}
          onChangeText={setText}
        />
        <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  messageList: {
    flex: 1,
    padding: 10,
  },
  message: {
    marginBottom: 10,
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
    padding: 10,
    width: "80%",
  },
  sender: {
    fontWeight: "bold",
  },
  text: {
    marginTop: 5,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#ccc",
  },
  input: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  sendButton: {
    backgroundColor: "#007BFF",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  sendButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
