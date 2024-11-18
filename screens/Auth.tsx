import { StatusBar } from "expo-status-bar";
import {
  Pressable,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  View,
  ToastAndroid,
} from "react-native";
import firebase from "../config";

const auth = firebase.auth();

export default function Auth(props: any) {
  var email: string, password: string;

  function handleSubmit() {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        ToastAndroid.show("Logged in", ToastAndroid.SHORT);
        props.navigation.replace("Home");
      })
      .catch((e) => {
        ToastAndroid.show(e.message, ToastAndroid.SHORT);
      });
  }

  return (
    <ImageBackground
      source={require("../assets/me.jpg")}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.overlayContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.welcomeText}>Bienvenue!</Text>

          <TextInput
            keyboardType="email-address"
            placeholder="Email@mail.site"
            placeholderTextColor="#ccc"
            style={styles.textInputStyle}
            onChangeText={(txt) => {
              email = txt;
            }}
          />

          <TextInput
            placeholder="Password"
            secureTextEntry={true}
            placeholderTextColor="#ccc"
            style={styles.textInputStyle}
            onChangeText={(pwd) => {
              password = pwd;
            }}
          />

          <View style={styles.buttonContainer}>
            <Pressable style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Login</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.secondaryButton]}
              onPress={() => {
                props.navigation.navigate("NewUser");
              }}
            >
              <Text style={styles.buttonText}>Sign Up</Text>
            </Pressable>
          </View>
        </View>
        <StatusBar style="light" />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  overlayContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)", // Dark overlay
    width: "100%",
  },
  formContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.9)", // Transparent white background
    padding: 25,
    borderRadius: 15,
    width: "85%",
    alignItems: "center",
  },
  welcomeText: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#025f",
    marginBottom: 25,
    fontStyle: "italic",
    textAlign: "center",
  },
  textInputStyle: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    height: 50,
    marginBottom: 20,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    width: "100%",
    fontSize: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  buttonContainer: {
    width: "100%",
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between", // Positions buttons on opposite sides
  },
  button: {
    flex: 1, // Equal size for buttons
    backgroundColor: "#025f",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 5, // Adds space between buttons
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  secondaryButton: {
    backgroundColor: "#ccc",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
