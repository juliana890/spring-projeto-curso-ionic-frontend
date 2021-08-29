//Classe que irá interceptar a requisição essa classe é padrão do Angular
import { Injectable } from "@angular/core";
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Observable } from "rxjs/Rx"; //Import Atualizado
import { StorageService } from "../services/storage.service";
import { AlertController } from "ionic-angular";
import { FieldMessage } from "../models/fieldmessage";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(public storage: StorageService, public alertCtrl: AlertController){}

    //Nesse método implementamos a lógica do retorno da requisição
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req) //Continua a requisição
            .catch((error, caught) => {
                //Pegamos apenas o error retornado na requisição
                let errorObj = error;
                if(errorObj.error){
                    errorObj = errorObj.error;
                }

                //Caso o retorno venha em formato texto, convertemos para JSON
                if(!errorObj.status){
                    errorObj = JSON.parse(errorObj);
                }

                console.log("Erro detectado pelo interceptor");
                console.log(errorObj);

                //Tratando o erro 403
                switch(errorObj.status){
                    case 401:
                        this.handle401();
                        break;
                    case 403:
                        this.handle403();
                        break;
                    case 422:
                        this.handle422(errorObj);
                        break;
                    default:
                        this.handleDefaultError(errorObj);
                }

                return Observable.throw(errorObj); //Retornamos somente o errorObj formatado
            }) as any;
    }

    //Tratamos o erro 403 dessa forma pois é possível que algum usuário armazenado no localStorage esteja inválido
    handle403(){
        this.storage.setLocalUser(null);
    }

    //Tratamos o erro 401 erro de autenticação
    handle401(){
        //Criamos um alert
        let alert = this.alertCtrl.create({
            title: 'Erro 401: Falha de autenticação',
            message: 'Email ou senha incorretos',
            enableBackdropDismiss: false, //Para sair do alert clicando no botão
            buttons: [
                {
                    text: 'Ok'
                }
            ]
        });

        //Para apresentar o alert na tela
        alert.present();
    }

    //Tratamos o erro 422 erros de validação de campos
    handle422(errorObj){
        //Listamos todos os erros para que o usário possa corrigi-los
        let alert = this.alertCtrl.create({
            title: 'Erro 422: Validação',
            message: this.listErrors(errorObj.errors), //Pegamos os erros do back-end definido na nossa classe ValidatorError lista errors
            enableBackdropDismiss: false,
            buttons: [
                {
                    text: 'Ok'
                }
            ]
        });
        alert.present();
    }

    //Tratamos os erros default
    handleDefaultError(errorObj){
        //Criamos um alert
        let alert = this.alertCtrl.create({
            title: 'Erro ' + errorObj.status + ': ' + errorObj.error,
            message: errorObj.message,
            enableBackdropDismiss: false, //Para sair do alert clicando no botão
            buttons: [
                {
                    text: 'Ok'
                }
            ]
        });

        //Para apresentar o alert na tela
        alert.present();
    }

    private listErrors(messages : FieldMessage[]) : string {
        let s : string = '';
        for(var i = 0; i < messages.length; i++){
            s = s + '<p><strong>' + messages[i].fieldName + "</strong>: " + messages[i].message + '</p>';
        }

        return s;
    }
}

//Exigência do framework para criar um interceptor
export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};
