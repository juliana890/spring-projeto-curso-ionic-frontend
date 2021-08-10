import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx"; //Importação correta para o Observable pois a outra é incompleta
import { API_CONFIG } from "../../config/api.config";
import { CategoriaDTO } from "../../models/categoria.dto";

//Para que a classe possa ser injetada em outras classes
@Injectable()
export class CategoriaService{

    //Criamos o construtor para injetarmos o HttpClient
    constructor(public http: HttpClient){}

    //Retorna a lista das categorias
    findAll() : Observable<CategoriaDTO[]> {
        //Para retorna a requisição GET
        //Chamamos nossa API config e tipamos o get com CategoriaDTO[]
        return this.http.get<CategoriaDTO[]>(`${API_CONFIG.baseUrl}/categorias`);
    }
}