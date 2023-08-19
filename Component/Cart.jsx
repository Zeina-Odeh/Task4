import React from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet, Modal } from 'react-native';

const ShoppingCart = ({ cart, onClose }) => {

  let totalPrice = 0;

  for (const item of cart) {
    totalPrice += item.price;
  }

  return (
  <Modal transparent={true} animationType="none">
  <View style={styles.modalContainer}>
      <View style={styles.cartContainer}>
        <Text style={styles.cartTitle}>Shopping Cart</Text>
        <FlatList
          data={cart}
          renderItem={({ item }) => (
            <View style={styles.cartItem}>
            <View style={styles.cartItemImageContainer}>
              <Image source={{ uri: item.image }} style={styles.cartItemImage} />
            </View>
            <View style={styles.cartItemDetails}>
              <Text>{item.name}</Text>
              <Text>Price: {item.price}</Text>
              <Text>{item.description}</Text>
            </View>
            </View>
          )}
        />
        <Text style={styles.totalText}>Total: {totalPrice}</Text>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={styles.closeText}>Close</Text>
        </TouchableOpacity>
      </View>
  </View>
  </Modal>
  );
};


const styles = StyleSheet.create ({
  
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  cartContainer: {
    backgroundColor: 'white',
    padding: 20,
    flex: 1,
    width: '100%',

  },

  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'gray',
    borderRadius: 5,
    alignItems: 'center',
  },

  closeText: {
    color: 'white',
    fontWeight: 'bold',
  },

  cartItem: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },

  cartItemImageContainer: {
    width: '30%',
    paddingRight: 10,
  },

  cartItemImage: {
    width: '100%',
    height: 80,
  },

  cartItemDetails: {
    flex: 1,
    justifyContent: 'center',
  },

  cartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },

  totalText: {
    marginRight: 5,
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },

});

export default ShoppingCart;
