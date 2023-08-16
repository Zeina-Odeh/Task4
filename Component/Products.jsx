import React from 'react';
import { View, Text, Image, Modal, TouchableOpacity, StyleSheet } from 'react-native';

const Products = ({ product, onClose }) => (
  <Modal transparent={true} animationType="fade">

    <View style={styles.modalContainer}>
      <View style={styles.productContainer}> 
        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.productId}>ID: {product.id}</Text>
        <Text style={styles.productPrice}>Price: {product.price}</Text>
        <Text style={styles.productDescription}>{product.description}</Text>
        <Image source={{ uri: product.image }} style={styles.productImage} />
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={styles.closeText}>Close</Text>
        </TouchableOpacity>
      </View>
    </View>

  </Modal>
);

const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },

    productContainer: {
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 10,
      alignItems: 'center',
    },

    productImage: {
      width: 200,
      height: 200,
      marginBottom: 5,
    },

    productName: {
      fontSize: 18,
      marginBottom: 10,
    },

    productId: {
      fontSize: 16,
      marginBottom: 5,
      color: '#666',
    },

    productPrice: {
      fontSize: 16,
      marginBottom: 5,
      color: 'green',
    },

    productDescription: {
      fontSize: 14,
      marginBottom: 10,
    },

    closeButton: {
      marginTop: 20,
      padding: 10,
      backgroundColor: 'gray',
      borderRadius: 5,
    },

    closeText: {
      color: 'white',
      fontWeight: 'bold',
    },
  });

export default Products;
