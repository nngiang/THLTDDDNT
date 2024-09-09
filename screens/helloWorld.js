import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';

const HelloWorld = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.text}>Hello world</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  box: {
    width: 100,
    height: 100,
    backgroundColor: 'aqua',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'black',
  },
});

export default HelloWorld;
