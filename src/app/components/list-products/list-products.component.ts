import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductInterface } from '../../interfaces/productInterface';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../service/product.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-list-products',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.css'
})

export class ListProductsComponent implements OnInit {
  listProducts: ProductInterface[] = []

  constructor(private _productService: ProductService) { }

  ngOnInit(): void {
    this.getListOfProducts();
  }

  getListOfProducts() {
    this._productService.getListProducts().subscribe((data: ProductInterface[]) => {
      this.listProducts = data;
    });
  }

  deleteProduct(id: number) {
    this._productService.deleteProduct(id).subscribe(() => {
      this.getListOfProducts();
    });
  }
}
