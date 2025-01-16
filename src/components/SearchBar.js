import React, {useState} from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import {setProducts} from '../store/productSlice';
import {searchProducts} from '../services/apiService';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();

  const handleSearch = async text => {
    setQuery(text);

    if (text.trim() === '') {
      const allProducts = await searchProducts('');
      dispatch(setProducts(allProducts));
      return;
    }

    const results = await searchProducts(text);
    dispatch(setProducts(results));
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search by name or category"
        value={query}
        onChangeText={handleSearch}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#fff',
  },
});

export default SearchBar;
