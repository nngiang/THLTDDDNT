import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const RevenueScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Doanh Thu</Text>
      <Text>Thông tin doanh thu sẽ được hiển thị ở đây.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default RevenueScreen;
