import { Component } from '@angular/core';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  public titulo:string;

  constructor(){
    this.titulo = "Pagina principal";
  }

  ngOnInit(){
    console.log("Se ha cargado el componente home");
  }
}
