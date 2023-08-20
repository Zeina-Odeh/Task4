import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import styles from './styles';
import Products from './Products';
import Cart from './Cart';
import _, {debounce} from 'lodash';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [productSelection, setProductSelection] = useState(null);
  const [loader, setLoader] = useState(true);
  const [cart, setCart] = useState([]);
  const [cartScreenVisible, setCartScreenVisible] = useState(false);

  useEffect(() => {
    fetchProductsInfo();
  }, []);


  async function fetchProductsInfo() {
    try {
      setLoader(true);
      const response = await fetch('https://dummyapi.online/api/products');
      const data = await response.json();
      setProducts(data);
      setLoader(false);
    } catch (error) {
      alert('Error Fetching Products');
      setLoader(false);
    }
  }

  const results = products.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );
  
  const handleAddToCart = (product) => {
    const cartUpdating = [...cart]; 
    
    const cartIndex = cartUpdating.findIndex(item => item.id === product.id);
    
    if (cartIndex !== -1) {
      cartUpdating[cartIndex].quantity += product.quantity;
    } else {
      cartUpdating.push({ ...product });
    } 
    setCart(cartUpdating);
    setProductSelection(null);
  };
  
  const updateQuantity = (product, change) => {
    const cartUpdating = cart.map(item =>
      item.id === product.id ? { ...item, quantity: Math.max(item.quantity + change, 1) } : item
      );
    setCart(cartUpdating);
  };
  

  const debouncedSearch = debounce((text) => {
    setSearch(text);}, 300); 
  

  return (
    <View style={[styles.container, styles.backgroundContainer]}>
    <TextInput
        style={styles.searchProduct}
        placeholder="Search Products"
        onChangeText={(text) => debouncedSearch(text)}
        value={search}
      />
      
      {loader ? (
        <ActivityIndicator size="large" color="blue" marginBottom="40" />
      ) : (
        <FlatList
          data={results}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => setProductSelection(item)}>
              <View style={styles.productContainer}>
                <View style={styles.imageContainer}>
                  <Image source={{ uri: item.image }} style={styles.productImage} />
                  <Text style={styles.productName}>{item.name}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
          numColumns={2}
        />
      )}

      {productSelection && (
        <Products
          product={productSelection}
          onClose={() => setProductSelection(null)}
          addToCart={handleAddToCart}
          updateQuantity={updateQuantity}        
        />
      )}

      <View style={styles.shoppingContainer}>
        <TouchableOpacity
          onPress={() => setCartScreenVisible(true)}
          style={styles.cartButton}
        >
          <Text style={styles.cartButtonText}>Shopping Cart List</Text>
        </TouchableOpacity>
      </View>

      {cartScreenVisible && (
        <Cart cart={cart} onClose={() => setCartScreenVisible(false)} updateQuantity={updateQuantity} />
      )}

    </View>
  );
};

export default Home;
