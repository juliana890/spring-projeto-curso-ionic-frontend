import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { API_CONFIG } from "../config/api.config";
import { CredenciaisDTO } from "../models/credenciais.dto";

@Injectable()
export class AuthService {

    //Importamos o HttpClient para fazermos a requisição de login
    constructor(public http: HttpClient){}

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

}