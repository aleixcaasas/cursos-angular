import { Component } from '@angular/core';

@Component({
	selector: 'plantillas',
	templateUrl: './plantillas.component.html',
})
export class PlantillasComponent{
	public titulo;
	public administrador;
	public dato_externo = "Aleix Casas";
	public identity = {
		id: 1,
		web: 'aleixcaasas.dev',
		tematica: 'Desarrollo web'
	}

	constructor(){
		this.titulo = "Plantillas ngTemplate en Angular";
		this.administrador = true;
	}

	cambiar(value: any){
		this.administrador = value;
	}

	public datos_del_hijo: any;

	recibirDatos(event: any){
		console.log(event);
		this.datos_del_hijo = event;
	}

}