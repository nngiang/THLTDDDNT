import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const OrderScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đơn Hàng</Text>
      <Text>Thông tin đơn hàng sẽ được hiển thị ở đây.</Text>
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

export default OrderScreen;
