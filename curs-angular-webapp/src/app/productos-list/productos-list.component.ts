import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ProductoService } from '../services/productos.service';
import { Producto } from '../models/producto';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';

@Component({
	selector: 'productos-list',
	templateUrl: './productos-list.component.html',
	styleUrls: ['./productos-list.component.css'],
	providers: [ProductoService]
})

export class ProductosListComponent {
	public titulo: string;
	public productos!: Producto[];
	public confirmado:any;


	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _productoService: ProductoService
	) {
		this.titulo = 'Listado de productos';
		this.confirmado = null;
	}

	ngOnInit() {
		console.log('productos-list.component.ts cargado');
		this.getProductos();
	}

	getProductos() {
		this._productoService.getProductos().subscribe(
			(result: any) => {
				if (result.code != 200) {
					console.log(result);
				} else {
					this.productos = result.data;
				}
			},
			(error: any) => {
				console.log(error);
			}
		);
	}

	borrarConfirm(id: any){
		this.confirmado = id;
	}

	cancelarConfirm(){
		this.confirmado = null;
	}

	onDeleteProducto(id: any) {
		this._productoService.deleteProducto(id).subscribe(
			(response: any) => {
				if (response.code == 200) {
					this.getProductos();
				} else {
					alert('Error al borrar producto');
				}
			}, (error) => {
				console.log(error);
			}
		);
	}
}
