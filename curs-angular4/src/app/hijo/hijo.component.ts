import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';

@Component({
	selector: 'componente-hijo',
	templateUrl: './hijo.component.html',
	styleUrls: ['./hijo.component.css']
})

export class HijoComponent {
	public title: string;
	@Input() propiedad_uno!: string;
	@Input('p2') propiedad_dos!: any;

	@Output() desde_el_hijo = new EventEmitter();

	constructor() {
		this.title = "Componente Hijo";
	}

	ngOnInit() {
		console.log(this.propiedad_dos);
		console.log(this.propiedad_uno);
		
	}

	enviar() {
		this.desde_el_hijo.emit({ nombre: 'Hola Adeu', web: 'aleixcaasas.dev', twitter: '@aleixcaasas' });
	}
}
