import { Component } from '@angular/core';
import { ProductoService } from '../services/productos.service';
import { Producto } from '../models/producto';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GLOBAL } from '../services/global';


@Component({
	selector: 'app-producto-edit',
	templateUrl: '../producto-add/producto-add.component.html',
	styleUrls: ['./producto-edit.component.css'],
	providers: [ProductoService]

})

export class ProductoEditComponent {
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
		this.titulo = 'Editar producto';
		this.producto = new Producto(0, '', '', 0, '');
		this.is_edit = true;
	}

	ngOnInit() {
		this.getProducto();
	}

	getProducto() {
		this._route.params.forEach((params: Params) => {
			let id = params['id'];
			this._productoService.getProducto(id).subscribe(
				(response: any) => {
					console.log(response);
					if (response.code == 200) {
						this.producto = response.data;
					} else {
						this._router.navigate(['/productos']);
					}
				},
				(error) => {
					console.log(error);
				}
			)
		});
	}

	onSubmit() {

		if (this.filesToUpload && this.filesToUpload.length >= 1) {
			this._productoService.makeFileRequest(GLOBAL.URL + 'upload-file', [], this.filesToUpload).then((result: any) => {
				console.log(result);
				this.resultUpload = result;
				this.producto.imagen = this.resultUpload.filename;
				this.updateProducto();

			}, (error) => {
				console.log(error);
			});
		} else {
			this.updateProducto();
		}
	}

	updateProducto() {
		this._route.params.forEach((params: Params) => {
			let id = params['id'];

			this._productoService.editProducto(id, this.producto).subscribe(
				(result: any) => {
					if (result.code == 200) {
						this._router.navigate(['/producto', id]);
					} else {
						console.log(result);
					}
				},
				(error: any) => {
					console.log(error);
				}
			);
		})
	}

	fileChangeEvent(fileInput: any) {
		this.filesToUpload = <Array<File>>fileInput.target.files;
		console.log(this.filesToUpload);
	}
}
