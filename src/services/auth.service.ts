import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { API_CONFIG } from "../config/api.config";
import { CredenciaisDTO } from "../models/credenciais.dto";
import { LocalUser } from "../models/local.user";
import { StorageService } from "./storage.service";
import { JwtHelper } from "angular2-jwt";

@Injectable()
export class AuthService {

    //Instânciamos o objeto jwtHelper para extrairmos o email do token
    jwtHelper: JwtHelper = new JwtHelper();

    //Importamos o HttpClient para fazermos a requisição de login
    //Importamos o StorageService para armazenarmos o usuário no LocalStorage
    constructor(
        public http: HttpClient,
        public storage: StorageService){}

    //Método de autenticação
    authenticate(creds: CredenciaisDTO){
        //${API_CONFIG.baseUrl} Chamamos a url da aplicação préviamente configurada no api.config
        return this.http.post(
            `${API_CONFIG.baseUrl}/login`, 
            creds,
            {
                observe: "response", //Especificação para termos acesso ao header utilizando o response
                responseType: "text" //Especificação para o body vazio e o framework não dar um parse no JSON e consequentemente gerar algum tipo de erro
            });
    }

    //Método do refresh token para aproveitar o usuário logado se token ainda for válido
    //O token é incluído automaticamente na requisição pelo interceptor
    refreshToken(){
        //${API_CONFIG.baseUrl} Chamamos a url da aplicação préviamente configurada no api.config
        return this.http.post(
            `${API_CONFIG.baseUrl}/auth/refresh_token`, 
            {},
            {
                observe: "response", //Especificação para termos acesso ao header utilizando o response
                responseType: "text" //Especificação para o body vazio e o framework não dar um parse no JSON e consequentemente gerar algum tipo de erro
            });
    }

    successfulLogin(authorizationValue : string){
        let tok = authorizationValue.substring(7); //Retiramos o 'Bearer ' do token
        let user : LocalUser = {
            token: tok,
            email: this.jwtHelper.decodeToken(tok).sub //Dessa forma pegamos o email que está armazenado no token
        };

        //Armazenamos o usuário o localStorage
        this.storage.setLocalUser(user);
    }

    logout(){
        //Removemos o usuário do localStorage
        this.storage.setLocalUser(null);
    }

}