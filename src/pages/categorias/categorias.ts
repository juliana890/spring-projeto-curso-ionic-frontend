import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { API_CONFIG } from '../../config/api.config';
import { CategoriaDTO } from '../../models/categoria.dto';
import { CategoriaService } from '../../services/domain/categoria.service';

@IonicPage()
@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html',
})
export class CategoriasPage {

  //Instânciamos a nossa url criada no api.config
  bucketUrl: string = API_CONFIG.bucketBaseUrl;

  //Lista que será exposta no controlador para o html ler os dados
  items: CategoriaDTO[];

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
        //Fazemos a lista de items receber a resposta
        this.items = response;
    },
      error => {
        //Deixamos vazio por padrão, caso queira colocar algo a mais inserimos aqui!!!
      });
  }

  showProdutos(){
    this.navCtrl.push('ProdutosPage');
  }
}
