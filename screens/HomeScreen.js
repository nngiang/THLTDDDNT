import React, { useEffect, useState, useRef } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Modal, Animated, StatusBar, Button } from 'react-native';
import { db } from '../firebase-config';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../firebase-config';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedService, setSelectedService] = useState(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const menuAnimation = useRef(new Animated.Value(-200)).current;

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const servicesCollection = collection(db, 'services');
        const servicesSnapshot = await getDocs(servicesCollection);
        const servicesList = servicesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setServices(servicesList);
      } catch (error) {
        console.error("Error fetching services: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const showDatePicker = (service) => {
    setSelectedService(service);
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = async (date) => {
    setSelectedDate(date);
    hideDatePicker();

    if (selectedService) {
      try {
        const serviceDoc = doc(db, 'services', selectedService.id);
        await updateDoc(serviceDoc, {
          time: date.toISOString(),
        });

        alert(`Đã đặt lịch cho dịch vụ ${selectedService.servicesName} vào ${date.toString()}`);
      } catch (error) {
        console.error("Error updating service time: ", error);
      }
    }
  };

  const toggleMenu = () => {
    setModalVisible(!modalVisible);
    Animated.timing(menuAnimation, {
      toValue: modalVisible ? -200 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const navigateToAdmin = () => {
    navigation.navigate('Admin');
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

  if (loading) {
    return (
      <View style={styles.loader}>
        <Text>Loading services...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={toggleMenu} style={styles.menuButton}>
          <Text style={styles.menuButtonText}>☰</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Danh sách dịch vụ</Text>
      </View>

      {/* Menu */}
      {modalVisible && (
        <Animated.View style={[styles.menu, { transform: [{ translateX: menuAnimation }] }]}> 
          <Button title="Profile" onPress={navigateToRevenue} color="#FF8C00" />
          <Button title="Dịch vụ của tôi" onPress={navigateToOrders} color="#FF8C00" />
          <Button title="Đăng xuất" onPress={handleLogout} color="#FF8C00" />
        </Animated.View>
      )}

      <FlatList
        data={services}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.serviceCard}>
            <Text style={styles.serviceName}>{item.servicesName}</Text>
            <Text>{item.servicesDescription}</Text>
            <Text>{`Giá: ${item.servicesPrice} VNĐ`}</Text>
            <TouchableOpacity
              style={styles.bookButton}
              onPress={() => showDatePicker(item)}
            >
              <Text style={styles.bookButtonText}>Đặt lịch</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      
      <Modal
        visible={isDatePickerVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={hideDatePicker}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedService && (
              <View style={styles.serviceInfoContainer}>
                <Text style={styles.modalTitle}>Đặt lịch cho: {selectedService.servicesName}</Text>
                <DateTimePickerModal
                  isVisible={isDatePickerVisible}
                  mode="datetime"
                  onConfirm={handleConfirm}
                  onCancel={hideDatePicker}
                />
              </View>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 0,
    margin: 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center', // Căn giữa theo chiều dọc
    justifyContent: 'space-between', // Giãn cách giữa các thành phần
    marginTop: 40, // Thay đổi khoảng cách trên nếu cần
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center', // Giữ căn giữa cho chữ
    flex: 1, // Để tiêu đề chiếm không gian còn lại
    marginLeft: 10, // Khoảng cách từ menu
    right: 20
  },
  menuButton: {
    padding: 10,
    backgroundColor: '#FF8C00',
    borderRadius: 5,
  },
  menuButtonText: {
    fontSize: 24,
    color: 'white',
  },
  menu: {
    position: 'absolute',
    top: 80,
    left: 20,
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 5,
    zIndex: 1000,
    elevation: 5,
  },
  menuItem: {
    paddingVertical: 10,
  },
  menuItemText: {
    color: 'white',
    fontSize: 16,
  },
  serviceCard: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
    marginHorizontal: 20,
  },
  serviceName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  bookButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#FF8C00',
    borderRadius: 5,
  },
  bookButtonText: {
    color: 'white',
    textAlign: 'center',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  serviceInfoContainer: {
    alignItems: 'center',
  },
});

export default HomeScreen;
