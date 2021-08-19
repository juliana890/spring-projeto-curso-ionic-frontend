//Classe que irá interceptar a requisição essa classe é padrão do Angular
import { Injectable } from "@angular/core";
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Observable } from "rxjs/Rx"; //Import Atualizado
import { StorageService } from "../services/storage.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(public storage: StorageService){}

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
                    case 403:
                        this.handle403();
                        break;
                }

                return Observable.throw(errorObj); //Retornamos somente o errorObj formatado
            }) as any;
    }

    //Tratamos o erro 403 dessa forma pois é possível que algum usuário armazenado no localStorage esteja inválido
    handle403(){
        this.storage.setLocalUser(null);
    }

}

//Exigência do framework para criar um interceptor
export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};
