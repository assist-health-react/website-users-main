import axios from "./axios";
import { BASE_URL, getAuthHeaders } from "./config";

// Get all products
export const getAllProducts = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/products`,
      {
        headers: getAuthHeaders(),
      }
    );
    return response.data.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || 'Failed to fetch products');
    }
    throw new Error('Network error occurred');
  }
};

// Get product by ID
export const getProductById = async (productId) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/products/${productId}`,
      {
        headers: getAuthHeaders(),
      }
    );
    return response.data.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || 'Failed to fetch product details');
    }
    throw new Error('Network error occurred');
  }
}; 