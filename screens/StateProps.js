import React, { useState } from 'react';
import { Text, Button, View } from 'react-native';

const Project4 = () => {
  const [pressCount, setPressCount] = useState(0);

  return (
    <View style={{ alignItems: 'center', marginTop: 350 }}>
      <Text>Bạn đã nhấn vào nút: {pressCount} lần</Text>
      
      {/* Nút tăng số lần nhấn */}
      <Button
        title={`Đã nhấn ${pressCount} lần`}
        onPress={() => setPressCount(pressCount + 1)}
      />

      {/* Nút reset để đặt lại pressCount về 0 */}
      <Button
        title="Reset về 0"
        onPress={() => setPressCount(0)}
        color="red"  // Bạn có thể thêm màu sắc để dễ phân biệt nút reset
      />
    </View>
  );
};

export default Project4;
