import { Component, OnInit } from '@angular/core';



import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  images: string[];
  rating: number;
  reviews: Review[];
  sales: number;
  inStock: boolean;
  stockCount: number;
  discount?: number;
  description: string;
  features: string[];
  specifications: { [key: string]: string };
}

interface Review {
  id: number;
  userName: string;
  rating: number;
  date: string;
  comment: string;
  helpful: number;
}

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ProductDetail.html',
  styleUrls: ['./ProductDetail.scss']
})
export class ProductDetail implements OnInit {
  product: Product | null = null;
  selectedImage: string = '';
  quantity: number = 1;
  activeTab: string = 'description';

  ngOnInit() {
    this.loadProduct();
  }

  loadProduct() {
    // Mock data - Replace with API call using route params
    // Example: this.route.params.subscribe(params => { const id = params['id']; ... })
    this.product = {
      id: 1,
      name: 'Wireless Bluetooth Headphones Premium',
      price: 79.99,
      originalPrice: 129.99,
      category: 'Electronics',
      images: [
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop',
        'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&h=800&fit=crop',
        'https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=800&h=800&fit=crop',
        'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&h=800&fit=crop'
      ],
      rating: 4.5,
      reviews: [
        {
          id: 1,
          userName: 'John Doe',
          rating: 5,
          date: '2024-11-15',
          comment: 'Excellent sound quality and very comfortable. Battery lasts all day!',
          helpful: 24
        },
        {
          id: 2,
          userName: 'Sarah Smith',
          rating: 4,
          date: '2024-11-10',
          comment: 'Great headphones but the bass could be stronger. Overall very satisfied.',
          helpful: 12
        },
        {
          id: 3,
          userName: 'Mike Johnson',
          rating: 5,
          date: '2024-11-05',
          comment: 'Best headphones I have ever owned. Worth every penny!',
          helpful: 18
        }
      ],
      sales: 1520,
      inStock: true,
      stockCount: 45,
      discount: 38,
      description: 'Experience premium audio quality with our Wireless Bluetooth Headphones. Featuring advanced noise cancellation technology, comfortable over-ear design, and up to 30 hours of battery life. Perfect for music lovers, travelers, and professionals who demand the best.',
      features: [
        'Active Noise Cancellation (ANC)',
        'Up to 30 hours battery life',
        'Bluetooth 5.0 connectivity',
        'Comfortable over-ear cushions',
        'Built-in microphone for calls',
        'Foldable design with carrying case',
        'Quick charge: 10 min = 5 hours playback'
      ],
      specifications: {
        'Brand': 'AudioPro',
        'Model': 'AP-5000',
        'Color': 'Matte Black',
        'Wireless': 'Yes',
        'Bluetooth Version': '5.0',
        'Battery Life': '30 hours',
        'Charging Time': '2 hours',
        'Weight': '250g',
        'Warranty': '2 years'
      }
    };
    this.selectedImage = this.product.images[0];
  }

  selectImage(image: string) {
    this.selectedImage = image;
  }

  incrementQuantity() {
    if (this.product && this.quantity < this.product.stockCount) {
      this.quantity++;
    }
  }

  decrementQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  addToCart() {
    console.log(`Added ${this.quantity} item(s) to cart`);
    alert(`${this.quantity} ${this.product?.name} added to cart!`);
  }

  buyNow() {
    console.log('Proceeding to checkout');
    alert('Proceeding to checkout...');
  }

  addToWishlist() {
    console.log('Added to wishlist');
    alert('Added to wishlist!');
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  getStarArray(rating: number): boolean[] {
    return Array(5).fill(false).map((_, i) => i < Math.floor(rating));
  }

  markReviewHelpful(reviewId: number) {
    console.log('Marked review as helpful:', reviewId);
  }

  goBack() {
    console.log('Navigate back to products');
    // Implement navigation back
  }
}