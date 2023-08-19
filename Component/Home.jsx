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
    setCart((prevCart) => [...prevCart, product]);
    setProductSelection(null);
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
          addToCart={() => handleAddToCart(productSelection)}
          isAdded={cart.some((item) => item.id === productSelection.id)}
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
        <Cart cart={cart} onClose={() => setCartScreenVisible(false)} />
      )}

    </View>
  );
};

export default Home;
