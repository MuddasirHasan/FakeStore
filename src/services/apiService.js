import axios from 'axios';

const API_URL = 'https://fakestoreapi.com';

export const fetchProducts = async (page, limit) => {
  try {
    const response = await fetch('https://fakestoreapi.com/products');
    const allProducts = await response.json();

    const startIndex = (page - 1) * limit;
    const paginatedProducts = allProducts.slice(startIndex, startIndex + limit);

    return paginatedProducts;
  } catch (error) {
    throw new Error('Failed to fetch products');
  }
};

export const searchProducts = async query => {
  try {
    const response = await fetch('https://fakestoreapi.com/products');
    const allProducts = await response.json();

    console.log('All Products:', allProducts);

    const filteredProducts = allProducts.filter(
      product =>
        product.title.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase()),
    );

    console.log('Filtered Products:', filteredProducts);
    return filteredProducts;
  } catch (error) {
    console.error('Error searching products:', error);
    return [];
  }
};
