import { Component } from '@angular/core';
import { Producto } from '../models/producto';
import { ProductoService } from '../services/productos.service';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
	selector: 'app-producto-detail',
	templateUrl: './producto-detail.component.html',
	styleUrls: ['./producto-detail.component.css'],
	providers: [ProductoService]
})

export class ProductoDetailComponent {
	public producto!: Producto;

	constructor(
		private _productoService: ProductoService,
		private _route: ActivatedRoute,
		private _router: Router
	){}

	ngOnInit(){
		console.log("producto-detail component cargado");
		this.getProducto();
	}

	getProducto(){
		this._route.params.forEach((params: Params) => {
			let id = params['id'];
			this._productoService.getProducto(id).subscribe(
				(response: any) => {
					console.log(response);
					if(response.code == 200){
						this.producto = response.data;
					}else{
						this._router.navigate(['/productos']);
					}
				},
				(error) => {
					console.log(error);
				}
			)
		});
	}
}
