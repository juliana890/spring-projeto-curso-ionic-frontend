import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

//Classe controlador da nossa view home.html
//Toda view precisa de um controlador
@IonicPage() //Importação para passarmos o parâmetro por string
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

}
