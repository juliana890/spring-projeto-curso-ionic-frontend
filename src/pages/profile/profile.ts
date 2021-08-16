import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { API_CONFIG } from '../../config/api.config';
import { ClienteDTO } from '../../models/cliente.dto';
import { ClienteService } from '../../services/domain/cliente.service';
import { StorageService } from '../../services/storage.service';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  cliente: ClienteDTO;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public storage: StorageService,
    public clienteService: ClienteService) {
  }

  ionViewDidLoad() {
    //Se existir o localUser atribuímos o valor do objeto JSON
    let localUser = this.storage.getLocalUser();

    //Verificamos se a variável não está null e se possui o campo email
    if(localUser && localUser.email){
      //Fazemos a chamada do ClienteService para obter os dados
      //Passamos o email armazenado o localUser e a inscrição para obter a resposta com .subscribe()
      this.clienteService.findByEmail(localUser.email)
        .subscribe(response => { //Se tiver sucesso na resposta
          //Atribuímos ao cliente a respota que chegou pois ela será um ClienteDTO
          this.cliente = response;

          //E buscamos a imagem que está armazenada no S3 chamando nosso método getImageIfExists()
          this.getImageIfExists();

        },
        error => {});
    }

  }

  //Método que irá testar se a imagem existe
  getImageIfExists(){
    //Chamamos o método getImageFromBucket passando o ID do cliente
    this.clienteService.getImageFromBucket(this.cliente.id)
      .subscribe(response => { //Se a requisição ocorrer com sucesso significa que existe imagem
        //Atribuímos a imagem do bucket para o cliente no campo imageUrl
        this.cliente.imageUrl = `${API_CONFIG.bucketBaseUrl}/cp${this.cliente.id}.jpg`;
      },
      error => {});
  }

}
