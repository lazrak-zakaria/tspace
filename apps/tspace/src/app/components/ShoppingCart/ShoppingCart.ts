import { Component, OnInit } from '@angular/core';



import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface CartItem {
  id: number;
  productId: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  quantity: number;
  inStock: boolean;
  maxStock: number;
}

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ShoppingCart.html',
  styleUrl: './ShoppingCart.scss',
})
export class ShoppingCart implements OnInit {
  cartItems: CartItem[] = [];
  promoCode: string = '';
  promoApplied: boolean = false;
  discount: number = 0;
  
  ngOnInit() {
    this.loadCart();
  }

  loadCart() {
    // Mock data - Replace with API call or localStorage
    this.cartItems = [
      {
        id: 1,
        productId: 1,
        name: 'Wireless Bluetooth Headphones',
        price: 79.99,
        originalPrice: 129.99,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop',
        quantity: 2,
        inStock: true,
        maxStock: 45
      },
      {
        id: 2,
        productId: 2,
        name: 'Smart Watch Series 5',
        price: 299.99,
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop',
        quantity: 1,
        inStock: true,
        maxStock: 20
      },
      {
        id: 3,
        productId: 4,
        name: 'Running Shoes Pro',
        price: 89.99,
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop',
        quantity: 1,
        inStock: true,
        maxStock: 15
      }
    ];
  }

  updateQuantity(item: CartItem, newQuantity: number) {
    if (newQuantity >= 1 && newQuantity <= item.maxStock) {
      item.quantity = newQuantity;
      this.saveCart();
    }
  }

  incrementQuantity(item: CartItem) {
    if (item.quantity < item.maxStock) {
      item.quantity++;
      this.saveCart();
    }
  }

  decrementQuantity(item: CartItem) {
    if (item.quantity > 1) {
      item.quantity--;
      this.saveCart();
    }
  }

  removeItem(itemId: number) {
    if (confirm('Are you sure you want to remove this item from your cart?')) {
      this.cartItems = this.cartItems.filter(item => item.id !== itemId);
      this.saveCart();
    }
  }

  clearCart() {
    if (confirm('Are you sure you want to clear your entire cart?')) {
      this.cartItems = [];
      this.saveCart();
    }
  }

  applyPromoCode() {
    // Mock promo code validation - Replace with API call
    const validCodes: { [key: string]: number } = {
      'SAVE10': 10,
      'SAVE20': 20,
      'WINTER25': 25
    };

    const upperCode = this.promoCode.toUpperCase();
    if (validCodes[upperCode]) {
      this.discount = validCodes[upperCode];
      this.promoApplied = true;
      alert(`Promo code applied! You saved ${this.discount}%`);
    } else {
      alert('Invalid promo code. Try: SAVE10, SAVE20, or WINTER25');
    }
  }

  removePromoCode() {
    this.promoCode = '';
    this.discount = 0;
    this.promoApplied = false;
  }

  getSubtotal(): number {
    return this.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  getDiscountAmount(): number {
    return this.getSubtotal() * (this.discount / 100);
  }

  getShipping(): number {
    const subtotal = this.getSubtotal();
    return subtotal > 50 ? 0 : 9.99;
  }

  getTax(): number {
    const subtotalAfterDiscount = this.getSubtotal() - this.getDiscountAmount();
    return subtotalAfterDiscount * 0.08; // 8% tax
  }

  getTotal(): number {
    return this.getSubtotal() - this.getDiscountAmount() + this.getShipping() + this.getTax();
  }

  saveCart() {
    // Save to localStorage or API
    console.log('Cart saved:', this.cartItems);
  }

  continueShopping() {
    console.log('Continue shopping - Navigate to products page');
    // Implement navigation
  }

  proceedToCheckout() {
    if (this.cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    console.log('Proceed to checkout');
    // Implement navigation to checkout page
    alert('Proceeding to checkout...');
  }

  viewProduct(productId: number) {
    console.log('View product:', productId);
    // Navigate to product detail page
  }
}