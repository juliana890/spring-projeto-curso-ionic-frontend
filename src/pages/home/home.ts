import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { MenuController } from 'ionic-angular/components/app/menu-controller';

//Classe controlador da nossa view home.html
//Toda view precisa de um controlador
@IonicPage() //Importação para passarmos o parâmetro por string
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public menu: MenuController) {

  }

  //Quando entrar na página login ele desabilita o menu lateral com a função swipeEnable(false)
  ionViewWillEnter() {
    this.menu.swipeEnable(false);
  }

  //Quando sair da tela de login ele habilita o menu lateral novamente com a função swipeEnable(true)
  ionViewDidLeave() {
    this.menu.swipeEnable(true);
  }

  login(){
    //Para navegarmos para a página Categorias utilizamos a injeção de dependência NavController
    //No TypeScript utilizamos o this para acessar o objeto navCtrl
    //o push empilha a página em cima da outra em dispositivos móveis funciona dessa forma
    //Passamos o nome da classe controller como string como já foi definido no Lazy loading
    //setRoot não mostra a seta para voltar fazemos assim pq após a tela de login não é necessário
    this.navCtrl.setRoot('CategoriasPage');
    //this.navCtrl.push('CategoriasPage');
  

  }

}
