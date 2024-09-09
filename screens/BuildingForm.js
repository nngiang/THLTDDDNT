import React, { useState } from "react";
import { TextInput, Text, View, StyleSheet, Button, TouchableOpacity, Alert } from "react-native";

const BuildingForm = () => {
  const [name, setName] = useState("");

  const handlePress = () => {
    if (name.trim() === "") {
      Alert.alert("Thông báo", "Vui lòng nhập tên của bạn");
    } else {
      Alert.alert(`Xin chào ${name} mình là Nam Giang!`);
      setName("");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Tên của bạn là gì?</Text>
      <TextInput
        style={styles.input}
        placeholder="Nhập tên của bạn"
        placeholderTextColor="rgba(0, 0, 0, 0.5)"
        onChangeText={(text) => setName(text)}
        value={name}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handlePress}
      >
        <Text style={styles.buttonText}>Xác nhận</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 300,
  },
  label: {
    fontWeight: "bold",
    fontSize: 18,
  },
  input: {
    marginTop: 10,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    padding: 10,
    borderRadius: 5,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#3399FF",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default BuildingForm;
