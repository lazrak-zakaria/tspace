// services/order.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

export interface OrderItem {
  id: number;
  productId: number;
  productName: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: number;
  orderNumber: string;
  orderDate: Date;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  totalAmount: number;
  items: OrderItem[];
  shippingAddress: {
    fullName: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  paymentMethod: string;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private orders: Order[] = [
    {
      id: 1,
      orderNumber: 'ORD-001',
      orderDate: new Date('2024-01-15'),
      status: 'delivered',
      totalAmount: 156.97,
      items: [
        {
          id: 1,
          productId: 101,
          productName: 'Wireless Headphones',
          price: 99.99,
          quantity: 1,
          image: '/assets/images/headphones.jpg'
        },
        {
          id: 2,
          productId: 102,
          productName: 'Phone Case',
          price: 19.99,
          quantity: 2,
          image: '/assets/images/phone-case.jpg'
        }
      ],
      shippingAddress: {
        fullName: 'John Doe',
        address: '123 Main St',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'USA'
      },
      paymentMethod: 'Credit Card'
    },
    {
      id: 2,
      orderNumber: 'ORD-002',
      orderDate: new Date('2024-01-10'),
      status: 'shipped',
      totalAmount: 74.99,
      items: [
        {
          id: 3,
          productId: 103,
          productName: 'Smart Watch',
          price: 74.99,
          quantity: 1,
          image: '/assets/images/smart-watch.jpg'
        }
      ],
      shippingAddress: {
        fullName: 'John Doe',
        address: '123 Main St',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'USA'
      },
      paymentMethod: 'PayPal'
    }
  ];

  constructor() {}

  getOrders(): Observable<Order[]> {
    // In real app, you would make HTTP request to your backend
    return of(this.orders).pipe(
      map(orders => orders.sort((a, b) => 
        new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()
      ))
    );
  }

  getOrderById(orderId: number): Observable<Order | undefined> {
    return of(this.orders.find(order => order.id === orderId));
  }

  getOrderByNumber(orderNumber: string): Observable<Order | undefined> {
    return of(this.orders.find(order => order.orderNumber === orderNumber));
  }
}