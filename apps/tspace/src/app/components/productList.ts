

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  image: string;
  rating: number;
  reviews: number;
  sales: number;
  inStock: boolean;
  discount?: number;
}



@Component({
  selector: 'app-product-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './productList.html',
  styleUrl: './productList.scss',
})
export class ProductList  implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  
  selectedCategory: string = 'All';
  sortBy: string = 'sales'; // 'sales', 'price-asc', 'price-desc', 'rating'
  
  categories: string[] = ['All', 'Electronics', 'Fashion', 'Home & Garden', 'Sports', 'Books'];

  ngOnInit() {
    this.loadProducts();
    this.applyFiltersAndSort();
  }

  loadProducts() {
    // Mock data - Replace with API call later
    this.products = [
      {
        id: 1,
        name: 'Wireless Bluetooth Headphones',
        price: 79.99,
        originalPrice: 129.99,
        category: 'Electronics',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
        rating: 4.5,
        reviews: 234,
        sales: 1520,
        inStock: true,
        discount: 38
      },
      {
        id: 2,
        name: 'Smart Watch Series 5',
        price: 299.99,
        category: 'Electronics',
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop',
        rating: 4.8,
        reviews: 456,
        sales: 2340,
        inStock: true
      },
      {
        id: 3,
        name: 'Classic Leather Jacket',
        price: 159.99,
        originalPrice: 249.99,
        category: 'Fashion',
        image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&h=500&fit=crop',
        rating: 4.3,
        reviews: 89,
        sales: 567,
        inStock: true,
        discount: 36
      },
      {
        id: 4,
        name: 'Running Shoes Pro',
        price: 89.99,
        category: 'Sports',
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop',
        rating: 4.6,
        reviews: 312,
        sales: 1890,
        inStock: true
      },
      {
        id: 5,
        name: 'Modern Table Lamp',
        price: 45.99,
        originalPrice: 69.99,
        category: 'Home & Garden',
        image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&h=500&fit=crop',
        rating: 4.4,
        reviews: 123,
        sales: 890,
        inStock: true,
        discount: 34
      },
      {
        id: 6,
        name: 'Programming Book Collection',
        price: 49.99,
        category: 'Books',
        image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&h=500&fit=crop',
        rating: 4.9,
        reviews: 678,
        sales: 3450,
        inStock: true
      },
      {
        id: 7,
        name: 'Wireless Gaming Mouse',
        price: 59.99,
        originalPrice: 89.99,
        category: 'Electronics',
        image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop',
        rating: 4.7,
        reviews: 189,
        sales: 1234,
        inStock: false,
        discount: 33
      },
      {
        id: 8,
        name: 'Yoga Mat Premium',
        price: 34.99,
        category: 'Sports',
        image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500&h=500&fit=crop',
        rating: 4.5,
        reviews: 267,
        sales: 1567,
        inStock: true
      },
      {
        id: 9,
        name: 'Denim Jeans Slim Fit',
        price: 69.99,
        category: 'Fashion',
        image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=500&fit=crop',
        rating: 4.2,
        reviews: 145,
        sales: 678,
        inStock: true
      },
      {
        id: 10,
        name: 'Indoor Plant Set',
        price: 39.99,
        originalPrice: 59.99,
        category: 'Home & Garden',
        image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=500&h=500&fit=crop',
        rating: 4.6,
        reviews: 201,
        sales: 1123,
        inStock: true,
        discount: 33
      },
      {
        id: 11,
        name: '4K Action Camera',
        price: 199.99,
        category: 'Electronics',
        image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&h=500&fit=crop',
        rating: 4.7,
        reviews: 334,
        sales: 2100,
        inStock: true
      },
      {
        id: 12,
        name: 'Cotton T-Shirt Pack',
        price: 29.99,
        category: 'Fashion',
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop',
        rating: 4.4,
        reviews: 412,
        sales: 2890,
        inStock: true
      }
    ];
  }

  onCategoryChange() {
    this.applyFiltersAndSort();
  }

  onSortChange() {
    this.applyFiltersAndSort();
  }

  applyFiltersAndSort() {
    // Filter by category
    if (this.selectedCategory === 'All') {
      this.filteredProducts = [...this.products];
    } else {
      this.filteredProducts = this.products.filter(p => p.category === this.selectedCategory);
    }

    // Sort
    switch (this.sortBy) {
      case 'sales':
        this.filteredProducts.sort((a, b) => b.sales - a.sales);
        break;
      case 'price-asc':
        this.filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        this.filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        this.filteredProducts.sort((a, b) => b.rating - a.rating);
        break;
    }
  }

  addToCart(product: Product) {
    console.log('Added to cart:', product);
    // Implement cart logic later
    alert(`${product.name} added to cart!`);
  }

  viewProduct(productId: number) {
    console.log('View product:', productId);
    // Navigate to product detail page later
  }

  getStarArray(rating: number): boolean[] {
    return Array(5).fill(false).map((_, i) => i < Math.floor(rating));
  }
}
