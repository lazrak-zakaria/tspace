import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { fontAwesomeIcons } from './shared/font-awesome-icons';
import {
  FaConfig,
  FaIconComponent,
  FaIconLibrary,
} from '@fortawesome/angular-fontawesome';
import { Navbar } from './layout/navbar';
import { ProductList } from './components/productList';
import { ProductDetail } from './components/productDetail/ProductDetail';
import { ShoppingCart } from './components/ShoppingCart/ShoppingCart';
import { OrderHistory } from './components/ShoppingCart/OrderHistory';

@Component({
  imports: [RouterModule, FaIconComponent, Navbar, ProductList, ProductDetail, ShoppingCart, OrderHistory],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {


  private faIconLibrary = inject(FaIconLibrary);
  private faConfig = inject(FaConfig);


  private initFontAwesome() {
    this.faConfig.defaultPrefix = 'far';
    this.faIconLibrary.addIcons(...fontAwesomeIcons);
  }

  ngOnInit(): void {
    this.initFontAwesome();
  }

  

}
