import React from 'react';
import {View, Text, Image, Button, StyleSheet} from 'react-native';

const ProductCard = ({product, onAddToCart}) => {
  return (
    <View style={styles.card}>
      <Image source={{uri: product.image}} style={styles.image} />
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.price}>${product.price}</Text>
      <Button
        title="Add to Cart"
        onPress={() => onAddToCart(product)}
        color="#007BFF"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
  },
  price: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
  },
});

export default ProductCard;
