import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, Button, Text, StyleSheet, FlatList, Animated, TouchableOpacity } from 'react-native';
import { db } from '../firebase-config';
import { collection, addDoc, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { auth } from '../firebase-config';
import { useNavigation } from '@react-navigation/native';

const AdminScreen = () => {
  const navigation = useNavigation();
  const [servicesName, setServicesName] = useState('');
  const [servicesPrice, setServicesPrice] = useState('');
  const [servicesDescription, setServicesDescription] = useState('');
  const [creator, setCreator] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [services, setServices] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editServiceId, setEditServiceId] = useState(null);
  const menuAnimation = useRef(new Animated.Value(-200)).current; // Khởi tạo animated value

  const fetchServices = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'services'));
      const servicesList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setServices(servicesList);
    } catch (error) {
      console.error('Error fetching services: ', error);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const addService = async () => {
    setErrorMessage(null);
    try {
      if (!servicesName || !servicesPrice || !servicesDescription || !creator) {
        setErrorMessage('Vui lòng điền tất cả các trường.');
        return;
      }
      await addDoc(collection(db, 'services'), {
        servicesName,
        servicesPrice: parseFloat(servicesPrice),
        servicesDescription,
        creator,
        time: new Date().toISOString(),
        finalUpdate: new Date().toISOString(),
      });
      alert('Dịch vụ đã được thêm thành công!');
      resetFields();
      fetchServices();
    } catch (e) {
      console.error('Error adding document: ', e);
      setErrorMessage('Có lỗi xảy ra khi thêm dịch vụ.');
    }
  };

  const deleteService = async (id) => {
    await deleteDoc(doc(db, 'services', id));
    fetchServices();
  };

  const resetFields = () => {
    setServicesName('');
    setServicesPrice('');
    setServicesDescription('');
    setCreator('');
    setEditServiceId(null);
  };

  const toggleMenu = () => {
    if (modalVisible) {
      Animated.timing(menuAnimation, {
        toValue: -200, // Vị trí ra ngoài màn hình
        duration: 300,
        useNativeDriver: true,
      }).start(() => setModalVisible(false));
    } else {
      setModalVisible(true);
      Animated.timing(menuAnimation, {
        toValue: 0, // Vị trí menu khi mở
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  const handleLogout = () => {
    auth.signOut().then(() => {
      navigation.navigate('Login');
    });
  };

  const navigateToRevenue = () => {
    navigation.navigate('Revenue'); // Thay 'Revenue' bằng tên màn hình doanh thu trong navigator của bạn
  };

  const navigateToOrders = () => {
    navigation.navigate('Order'); // Thay 'Orders' bằng tên màn hình đơn hàng trong navigator của bạn
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleMenu} style={styles.menuButton}>
        <Text style={styles.menuButtonText}>☰</Text>
      </TouchableOpacity>

      {modalVisible && (
        <Animated.View style={[styles.menu, { transform: [{ translateX: menuAnimation }] }]}>
          <Button title="Đăng xuất" onPress={handleLogout} color="#FF8C00" />
          <Button title="Doanh thu" onPress={navigateToRevenue} color="#FF8C00" />
          <Button title="Đơn hàng" onPress={navigateToOrders} color="#FF8C00" />
        </Animated.View>
      )}

      <Text style={styles.title}>Thêm dịch vụ mới</Text>
      {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
      <TextInput
        style={styles.input}
        placeholder="Tên dịch vụ"
        value={servicesName}
        onChangeText={setServicesName}
      />
      <TextInput
        style={styles.input}
        placeholder="Giá dịch vụ"
        value={servicesPrice}
        onChangeText={setServicesPrice}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Mô tả dịch vụ"
        value={servicesDescription}
        onChangeText={setServicesDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Người tạo"
        value={creator}
        onChangeText={setCreator}
      />
      <Button title="Thêm dịch vụ" onPress={addService} color="#FF8C00" />

      <FlatList
        data={services}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.serviceItem}>
            <Text>{item.servicesName}</Text>
            <Button title="Xóa" onPress={() => deleteService(item.id)} color="red" />
            <Button title="Sửa" onPress={() => {/* Hiện modal sửa */}} color="#FF8C00" />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
    top: 50
  },
  menuButton: {
    position: 'absolute',
    left: 20,
    backgroundColor: '#FF8C00',
    padding: 10,
    borderRadius: 5,
  },
  menuButtonText: {
    fontSize: 24,
    color: 'white',
  },
  menu: {
    position: 'absolute',
    top: 50,
    left: 20,
    backgroundColor: '#000000',
    padding: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
    zIndex: 1000,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 15,
  },
  serviceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
});

export default AdminScreen;
