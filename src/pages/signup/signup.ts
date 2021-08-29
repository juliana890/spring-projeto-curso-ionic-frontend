import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  formGroup: FormGroup 

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilber: FormBuilder) {
      
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

  signupUser(){
    console.log("TESTE - Enviou o form");
  }

}