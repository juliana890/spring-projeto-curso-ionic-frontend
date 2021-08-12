import { Injectable } from "@angular/core";
import { STORAGE_KEYS } from "../config/storage.keys.config";
import { LocalUser } from "../models/local.user";

@Injectable()
export class StorageService {

    //Método que retorna o usuário logado
    getLocalUser() : LocalUser {
        //Pegamos o usuário local
        let user = localStorage.getItem(STORAGE_KEYS.localUser);

        //Retornamos null caso usuário não exista
        if(user == null){
            return null;
        }else{
            return JSON.parse(user); //Utilizamos o JSON.parse pq o LocalStorage retorna uma string assim temos acesso a um objeto
        }
    }

    //Método que recebe um localUser e armazena no storage
    setLocalUser(obj : LocalUser){
        //Se o objeto for null removemos o item do localStorage
        if(obj == null){
            localStorage.removeItem(STORAGE_KEYS.localUser);
        }else{ //Se não armazenamos o objeto no localStorage 
            localStorage.setItem(STORAGE_KEYS.localUser, JSON.stringify(obj)); //Utilizamos o JSON.stringfy para converter o objeto JSON em string para armazenar no LocalStorage
        }
    }
}