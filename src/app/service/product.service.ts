import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductInterface } from '../interfaces/productInterface';
import { environment } from '../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class ProductService {
  getProducts() {
    throw new Error('Method not implemented.');
  }

  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/productos/';
  }

  getListProducts(): Observable<ProductInterface[]> {
    return this.http.get<ProductInterface[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }

  saveProduct(product: ProductInterface): Observable<ProductInterface> {
    return this.http.post<ProductInterface>(`${this.myAppUrl}${this.myApiUrl}`, product);
  }

  getProduct(id: number): Observable<ProductInterface> {
    return this.http.get<ProductInterface>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }

  updateProduct(id: number, product: ProductInterface): Observable<ProductInterface> {
    return this.http.put<ProductInterface>(`${this.myAppUrl}${this.myApiUrl}${id}`, product);
  }
}
