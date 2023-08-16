import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, FlatList, TouchableOpacity, ActivityIndicator} from 'react-native';
import styles from './styles'; 
import Products from './Products'; 

const Home = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [productSelection, setProductSelection] = useState(null);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    fetchProductsInfo();
  }, []);


  async function fetchProductsInfo () {

    try {
      setLoader(true);
      const response = await fetch('https://dummyapi.online/api/products');
      const data = await response.json();
      setProducts(data);
      setLoader(false);
    } catch (error) {
      alert("Error Fetching Products");
      setLoader(false);
    }
  };

    const results = products.filter(product =>
        product.name.toLowerCase().includes(search.toLowerCase())
    );

  const renderProducts = ({ item }) => (
    <TouchableOpacity onPress={() => setProductSelection(item)}>
      <View style={styles.productContainer}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: item.image }} style={styles.productImage} />
          <Text style={styles.productName}>{item.name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchProduct}
        placeholder="Search for Products"
        onChangeText={text => setSearch(text)}
        value={search}
      />
       {loader ? (
        <ActivityIndicator size="large" color="blue" marginBottom = "40" />
      ) : (
        <FlatList
        data={results}
        renderItem={renderProducts}
        numColumns={2}
        />

      )}

      {productSelection  && ( 
        <Products product={productSelection} onClose={() => setProductSelection(null)} />
      )}

    </View>
  );
};

export default Home;
