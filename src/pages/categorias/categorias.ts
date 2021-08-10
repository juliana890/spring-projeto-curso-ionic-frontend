import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CategoriaService } from '../../services/domain/categoria.service';

@IonicPage()
@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html',
})
export class CategoriasPage {

  //Criando a instância da CategoriaService
  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
      public categoriaService: CategoriaService){

  }

  ionViewDidLoad() {
    //Por ser uma chamada assíncrona utilizamos o subscribe passando uma função
    //Se a resposta for Success será executada a função assíncrona
    this.categoriaService.findAll().subscribe(response => {
        console.log(response);
    },
      error => {
        console.log(error);
      });
  }

}
