//Classe que irá interceptar a requisição essa classe é padrão do Angular
import { Injectable } from "@angular/core";
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Observable } from "rxjs/Rx"; //Import Atualizado
import { StorageService } from "../services/storage.service";
import { API_CONFIG } from "../config/api.config";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(public storage: StorageService){}
    
    //Método intercept simples somente repassa a requisição
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let localUser = this.storage.getLocalUser();

        //Essa variável irá servir para comparar se a requisição está sendo realizada para nossa aplicação do STS
        //Pois não é necessário enviar o token para as requisições do bucket S3
        let N = API_CONFIG.baseUrl.length;

        //Se a requisição for igual a baseUrl significa que a requsição é para nossa API
        let requestToAPI = req.url.substring(0, N) == API_CONFIG.baseUrl;

        //Se existir token no localStorage
        if(localUser && requestToAPI){
            //É necessário clonar a requisição criando uma nova com const
            //E acrescentamos o header Authorization com o valor Bearer concatenado com o token
            const authReq = req.clone({headers: req.headers.set('Authorization', 'Bearer ' + localUser.token)});

            //Retornamos a requisição clonada
            return next.handle(authReq);
        }else{
            return next.handle(req); //Retorna a requisição normal
        }
    }

}

//Exigência do framework para criar um interceptor
export const AuthInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
};
