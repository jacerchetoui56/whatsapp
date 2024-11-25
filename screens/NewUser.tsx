import { StatusBar } from "expo-status-bar";
import {
  Pressable,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { firebase } from "../config";

const auth = firebase.auth();

export default function NewUser(props: any) {
  var email: string, password: string;

  function handleSubmit() {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        const currentId = auth.currentUser?.uid;
        props.navigation.replace("Home", {
          currentId,
        });
      })
      .catch((e) => console.log("error: ", e.message));
  }

  return (
    <ImageBackground
      source={require("../assets/me.jpg")}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.overlayContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.welcomeText}>New User!</Text>

          <TextInput
            keyboardType="email-address"
            placeholder="Email@mail.site"
            placeholderTextColor="#ccc"
            style={styles.textInputStyle}
          />

          <TextInput
            placeholder="Password"
            secureTextEntry={true}
            placeholderTextColor="#ccc"
            style={styles.textInputStyle}
          />
          <TextInput
            placeholder="Confirm Password"
            secureTextEntry={true}
            placeholderTextColor="#ccc"
            style={styles.textInputStyle}
          />

          <View style={styles.buttonContainer}>
            <Pressable style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Submit</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.secondaryButton]}
              onPress={() => {
                props.navigation.goBack("NewUser");
              }}
            >
              <Text style={styles.buttonText}>Back</Text>
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
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    width: "100%",
  },
  formContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
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
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    backgroundColor: "#025f",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 5,
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
