import React from 'react';
import { View, Button, Text } from 'react-native';

const CustomComponent = () => {
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
      <Button
        title="Say hello"
        onPress={() => alert("hello, i'm nam giang")}
      />
      <Button
        title="Say goodbye"
        onPress={() => alert("goodbye see u!")}
        color="#4dc2c2"
      />
    </View>
  );
};

export default CustomComponent;

// import React from "react";
// import { TouchableOpacity, Text, View } from "react-native";

// const Button = (props) => (
//   <TouchableOpacity
//     onPress={props.onPress}
//     style={{
//       backgroundColor: "#ff637c",
//       alignSelf: "center",
//       padding: 10,
//       margin: 10,
//       ...props.buttonStyle,
//     }}
//   >
//     <Text style={{ color: "#fff" }}>{props.text}</Text> {/* Đảm bảo sử dụng mã màu hợp lệ và bọc chuỗi văn bản trong <Text> */}
//   </TouchableOpacity>
// );

// export default () => {
//   return (
//     <View style={{ flex: 1, justifyContent: "center" }}>
//       <Button text="Say hello" onPress={() => alert("hello, i'm nam giang")} />
//       <Button
//         text="Say goodbye"
//         onPress={() => alert("goodbye see u!")}
//         buttonStyle={{ backgroundColor: "#4dc2c2" }}
//       />
//     </View>
//   );
// };
