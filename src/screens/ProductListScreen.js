import React, {useEffect, useState} from 'react';
import {
  FlatList,
  View,
  ActivityIndicator,
  Text,
  StyleSheet,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {addToCart} from '../store/cartSlice';
import NetInfo from '@react-native-community/netinfo';
import {useDispatch, useSelector} from 'react-redux';
import {fetchProducts} from '../services/apiService';
import {saveToCache, loadFromCache} from '../services/cacheService';
import {setProducts, incrementPage, setHasMore} from '../store/productSlice';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';

const ProductListScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {items, currentPage, hasMore} = useSelector(state => state.products);
  const [loading, setLoading] = useState(false);
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsOffline(!state.isConnected); // Update offline state
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  useEffect(() => {
    loadProducts();
  }, [currentPage]);

  const loadProducts = async () => {
    if (loading || !hasMore) return;
    setLoading(true);

    try {
      if (isOffline) {
        // Load from cache if offline
        const cachedData = await loadFromCache('products');
        if (cachedData) {
          dispatch(setProducts(cachedData));
          Alert.alert('Offline Mode', 'Showing cached products.');
        }
      } else {
        // Fetch data from API if online
        const newProducts = await fetchProducts(currentPage, 10);
        dispatch(setProducts([...items, ...newProducts]));
        await saveToCache('products', [...items, ...newProducts]);
        if (newProducts.length < 10) dispatch(setHasMore(false));
        dispatch(incrementPage());
      }
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      loadProducts();
    }
  };

  const onAddToCart = product => {
    dispatch(addToCart(product));
    navigation.navigate('Cart');
  };

  return (
    <View style={styles.container}>
      {isOffline && (
        <Text style={styles.offlineMessage}>
          You are offline. Showing cached data.
        </Text>
      )}
      <SearchBar />
      <FlatList
        data={items}
        renderItem={({item}) => (
          <ProductCard product={item} onAddToCart={onAddToCart} />
        )}
        keyExtractor={item => item?.id?.toString()}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loading && <ActivityIndicator size="large" color="#007BFF" />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f9f9f9',
  },
  offlineMessage: {
    textAlign: 'center',
    color: 'red',
    marginVertical: 10,
  },
});

export default ProductListScreen;
