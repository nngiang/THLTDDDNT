// // App.js
// import React from 'react';
// import CalculatorScreen from './Calculator/Screen'; // Đường dẫn tới Screen.js trong thư mục Calculator

// export default function App() {
//   return <CalculatorScreen />;
// }


import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Vibration, Alert } from 'react-native';
import { Entypo } from '@expo/vector-icons';

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [currentNumber, setCurrentNumber] = useState('');
  const [lastNumber, setLastNumber] = useState('');
  const [isResult, setIsResult] = useState(false);
  const [ans, setAns] = useState(''); // Lưu trữ kết quả phép tính trước đó

  // Thêm phím Ans vào mảng các nút
  const buttons = ['C', 'DEL', 0, '/', 7, 8, 9, '*', 4, 5, 6, '-', 1, 2, 3, '+', '.', 'Ans', '='];

  function calculator() {
    let lastArr = currentNumber[currentNumber.length - 1];
    if (['/', '*', '-', '+', '.'].includes(lastArr)) {
      setCurrentNumber(currentNumber);
      return;
    } else {
      let result = eval(currentNumber).toString();
      setCurrentNumber(result);
      setAns(result); // Lưu kết quả vào ans khi tính toán xong
      setIsResult(true); // Sau khi có kết quả, đánh dấu đã có kết quả
      return;
    }
  }

  function handleInput(buttonPressed) {
    Vibration.vibrate(35); // Rung nhẹ khi nhấn nút

    // Khi nhấn phím DEL
    if (buttonPressed === 'DEL') {
      if (isResult) {
        setCurrentNumber(''); // Xóa toàn bộ nếu đã ra kết quả
        setLastNumber('');    // Xóa cả phép tính đã thực hiện
        setIsResult(false);   // Reset lại trạng thái
      } else {
        setCurrentNumber(currentNumber.slice(0, -1)); // Xóa ký tự cuối cùng
      }
      return;
    }

    // Khi nhấn phím Ans, lấy kết quả trước đó
    if (buttonPressed === 'Ans') {
      setCurrentNumber(currentNumber + ans); // Thêm giá trị của ans vào chuỗi hiện tại
      return;
    }

    if (['+', '-', '*', '/'].includes(buttonPressed)) {
      setCurrentNumber(currentNumber + buttonPressed);
      setIsResult(false); // Khi nhập thêm phép toán, chưa có kết quả
      return;
    }

    if (buttonPressed === '.' || (buttonPressed >= 0 && buttonPressed <= 9)) {
      setCurrentNumber(currentNumber + buttonPressed);
      setIsResult(false); // Khi nhập thêm số, chưa có kết quả
    }

    if (buttonPressed === '=') {
      // Kiểm tra nếu chưa nhập phép tính hợp lệ
      if (currentNumber === '' || ['+', '-', '*', '/'].includes(currentNumber[currentNumber.length - 1])) {
        Alert.alert('Lỗi', 'Vui lòng nhập phép tính hợp lệ.');
        return;
      }

      setLastNumber(currentNumber + '='); // Lưu phép tính đã thực hiện
      calculator(); // Tính toán kết quả
    }

    if (buttonPressed === 'C') {
      setLastNumber('');  // Xóa phép tính đã thực hiện
      setCurrentNumber(''); // Xóa số hiện tại
      setIsResult(false); // Reset lại trạng thái
    }
  }

  const styles = StyleSheet.create({
    result: {
      backgroundColor: darkMode ? '#282f3b' : '#f5f5f5',
      maxWidth: '100%',
      minHeight: '35%',
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
    },
    resultText: {
      maxHeight: 45,
      color: '#00b9d6',
      margin: 15,
      fontSize: 35,
    },
    historyText: {
      color: darkMode ? '#B5B7BB' : '#7c7c7c',
      fontSize: 20,
      marginRight: 10,
      alignSelf: 'flex-end',
    },
    themeButton: {
      alignSelf: 'flex-start',
      bottom: '5%',
      margin: 15,
      backgroundColor: darkMode ? '#7b8084' : '#e5e5e5',
      alignItems: 'center',
      justifyContent: 'center',
      width: 50,
      height: 50,
      borderRadius: 25,
    },
    buttons: {
      width: '100%',
      height: '35%',
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    button: {
      borderColor: darkMode ? '#3f4d5b' : '#e5e5e5',
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: '24%',
      minHeight: '54%',
      flex: 2,
    },
    textButton: {
      color: darkMode ? '#b5b7bb' : '#7c7c7c',
      fontSize: 28,
    },
  });

  return (
    <View>
      <View style={styles.result}>
        <TouchableOpacity style={styles.themeButton} onPress={() => setDarkMode(!darkMode)}>
          <Entypo name={darkMode ? 'light-up' : 'moon'} size={24} color={darkMode ? 'white' : 'black'} />
        </TouchableOpacity>
        <Text style={styles.historyText}>{lastNumber}</Text>
        <Text style={styles.resultText}>{currentNumber}</Text>
      </View>

      <View style={styles.buttons}>
        {buttons.map((button) => 
          button === '=' || button === '/' || button === '*' || button === '-' || button === '+' ? (
            <TouchableOpacity key={button} style={[styles.button, { backgroundColor: '#00b9d6' }]} onPress={() => handleInput(button)}>
              <Text style={[styles.textButton, { color: 'white', fontSize: 28 }]}>{button}</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity key={button} style={[styles.button, { backgroundColor: darkMode ? '#303946' : '#fff' }]} onPress={() => handleInput(button)}>
              <Text style={styles.textButton}>{button}</Text>
            </TouchableOpacity>
          )
        )}
      </View>
    </View>
  );
}

