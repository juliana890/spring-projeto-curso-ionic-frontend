import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { CidadeDTO } from '../../models/cidade.dto';
import { EstadoDTO } from '../../models/estado.dto';
import { CidadeService } from '../../services/domain/cidade.service';
import { ClienteService } from '../../services/domain/cliente.service';
import { EstadoService } from '../../services/domain/estado.service';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  formGroup: FormGroup;
  //Criamos as listas para o retorno do serviço
  estados: EstadoDTO[];
  cidades: CidadeDTO[];

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilber: FormBuilder,
    public cidadeService: CidadeService, //Injetamos os serviços para efetuarem a busca no front
    public estadoService: EstadoService,
    public clienteServive: ClienteService,
    public alertCtrl: AlertController) {
      
      this.formGroup = this.formBuilber.group({
        //Atributo nome é de preenchimento obrigatório vide regra no back-end, mínimo 5 e máximo 120 caracteres
        nome: ['Paula',[Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
        email: ['paulaandrade@gmail.com', [Validators.required, Validators.email]], //O Validators já possui a validação de email
        tipo: ['1', [Validators.required]],
        cpfOuCnpj: ['75878334046', [Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
        senha: ['123', [Validators.required]],
        logradouro: ['Rua Via', [Validators.required]],
        numero: ['25', [Validators.required]],
        complemento: ['Apto 3',[]],
        bairro: ['Copacabana', []],
        cep: ['08683632', [Validators.required]],
        telefone1: ['963929155', [Validators.required]],
        telefone2: ['', []],
        telefone3: ['', []],
        estadoId: [null, [Validators.required]],
        cidadeId: [null, [Validators.required]]
      });
    }

  //Implementamos o ionViewDidLoad para mandar carregar os estados com suas respectivas cidades
  ionViewDidLoad(){
    this.estadoService.findAll()
      .subscribe(response => {
        this.estados = response;
        //Atribuímos a lista na listinha do formulário
        this.formGroup.controls.estadoId.setValue(this.estados[0].id);

        //Método que irá buscar as cidades correspondentes ao estado selecionado
        this.updateCidades();
      },
      error => {});
  }

  updateCidades(){
    //Pegando o id do estado que estiver selecionado na lista do html
    let estado_id = this.formGroup.value.estadoId;

    this.cidadeService.findAll(estado_id)
      .subscribe(response => {
          this.cidades = response;

          //Desflegando a cidade que estaria selecionada no form
          this.formGroup.controls.cidadeId.setValue(null);
      },
      error => {});
  }

  signupUser(){
    this.clienteServive.insert(this.formGroup.value)
      .subscribe(response => {
        this.showInsertOk();
      },
      error => {});
  }

  showInsertOk(){
    let alert = this.alertCtrl.create({
      title: 'Sucesso',
      message: 'Cadastro efetuado com sucesso',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          //Função anônima que não recebe nada mas executa algo que será definido
          handler: () => {
            //Desempilhamos a página
            this.navCtrl.pop();
          }
        }
      ]
    });
    alert.present();
  }

}
