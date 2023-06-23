import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ProductoService } from '../services/productos.service';
import { Producto } from '../models/producto';
import { GLOBAL } from '../services/global';

@Component({
	selector: 'producto-add',
	templateUrl: './producto-add.component.html',
	styleUrls: ['./producto-add.component.css'],
	providers: [ProductoService]
})
export class ProductoAddComponent {
	public titulo: string;
	public producto: Producto;

	public filesToUpload: any;
	public resultUpload: any;
	public is_edit;

	constructor(
		private _productoService: ProductoService,
		private _route: ActivatedRoute,
		private _router: Router
	) {
		this.titulo = 'Crear un nuevo producto';
		this.producto = new Producto(0, '', '', 0, '');
		this.is_edit = false;
	}

	ngOnInit() {
		console.log('producto-add.component cargado');
	}

	onSubmit() {

		if (this.filesToUpload && this.filesToUpload.length >= 1) {
			this._productoService.makeFileRequest(GLOBAL.URL + 'upload-file', [], this.filesToUpload).then((result: any) => {
				console.log(result);
				this.resultUpload = result;
				this.producto.imagen = this.resultUpload.filename;
				this.saveProducto();

			}, (error) => {
				console.log(error);
			});
		} else {
			this.saveProducto();
		}
	}

	saveProducto() {
		this._productoService.addproducto(this.producto).subscribe(
			(result: any) => {
				if (result.code == 200) {
					this._router.navigate(['/productos']);
				} else {
					console.log(result);
				}
			},
			(error: any) => {
				console.log(error);
			}
		);
	}

	fileChangeEvent(fileInput: any) {
		this.filesToUpload = <Array<File>>fileInput.target.files;
		console.log(this.filesToUpload);
	}

}
