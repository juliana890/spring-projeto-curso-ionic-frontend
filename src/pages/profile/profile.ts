import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageService } from '../../services/storage.service';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  email: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public storage: StorageService) {
  }

  ionViewDidLoad() {
    //Se existir o localUser atribuímos o valor do objeto JSON
    let localUser = this.storage.getLocalUser();

    //Verificamos se a variável não está null e se possui o campo email
    if(localUser && localUser.email){
      this.email = localUser.email;
    }

  }

}
