import { Product } from '@/store/cartStore';

const API_BASE_URL = 'https://fakestoreapi.com';

export interface ApiProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

// Transform API product to our Product interface
const transformProduct = (apiProduct: ApiProduct): Product => ({
  ...apiProduct,
  thumbnail: apiProduct.image,
});

export const apiService = {
  // Get all products
  getProducts: async (limit?: number, sort?: 'asc' | 'desc'): Promise<Product[]> => {
    let url = `${API_BASE_URL}/products`;
    const params = new URLSearchParams();
    
    if (limit) params.append('limit', limit.toString());
    if (sort) params.append('sort', sort);
    
    if (params.toString()) url += `?${params.toString()}`;
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    
    const data: ApiProduct[] = await response.json();
    return data.map(transformProduct);
  },

  // Get single product
  getProduct: async (id: number): Promise<Product> => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch product');
    }
    
    const data: ApiProduct = await response.json();
    return transformProduct(data);
  },

  // Get product categories
  getCategories: async (): Promise<string[]> => {
    const response = await fetch(`${API_BASE_URL}/products/categories`);
    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }
    
    return response.json();
  },

  // Get products by category
  getProductsByCategory: async (category: string): Promise<Product[]> => {
    const response = await fetch(`${API_BASE_URL}/products/category/${category}`);
    if (!response.ok) {
      throw new Error('Failed to fetch products by category');
    }
    
    const data: ApiProduct[] = await response.json();
    return data.map(transformProduct);
  },
};