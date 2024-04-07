import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductInterface } from '../../interfaces/productInterface';
import { ProductService } from '../../service/product.service';

@Component({
  selector: 'app-add-edit-products',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './add-edit-products.component.html',
  styleUrl: './add-edit-products.component.css'
})
export class AddEditProductsComponent implements OnInit {

  form: FormGroup;
  id: number;
  operacion = 'Agregar ';

  constructor(
    private fb: FormBuilder,
    private _productService: ProductService,
    private router: Router,
    private aRouter: ActivatedRoute
  ) {

    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      description: ['', Validators.required],
      price: [null, Validators.required],
      stock: [null, Validators.required],
    });

    this.id = Number(aRouter.snapshot.paramMap.get('id'));
  }

  ngOnInit() {
    if (this.id !== 0) {
      this.operacion = 'Editar ';
      this.getProduct(this.id);
    }
  }

  addProduct() {
    const product: ProductInterface = {
      name: this.form.value.name,
      description: this.form.value.description,
      price: this.form.value.price,
      stock: this.form.value.stock,
    }

    if (this.id !== 0) {
      product.id = this.id;
      this._productService.updateProduct(this.id, product).subscribe(() => {
        this.router.navigate(['/']);
      });
    }

    this._productService.saveProduct(product).subscribe(() => {
      this.router.navigate(['/']);
    });
  }

  getProduct(id:number) {
    this._productService.getProduct(id).subscribe(data => {
      this.form.setValue({
        name: data.name,
        description: data.description,
        price: data.price,
        stock: data.stock,
      });
    });
  }
}
