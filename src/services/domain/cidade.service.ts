import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx"; //Importação correta para o Observable pois a outra é incompleta
import { API_CONFIG } from "../../config/api.config";
import { CidadeDTO } from "../../models/cidade.dto";

//Para que a classe possa ser injetada em outras classes
@Injectable()
export class CidadeService{

    //Criamos o construtor para injetarmos o HttpClient
    constructor(public http: HttpClient){}

    //Retorna a lista das cidades
    findAll(estado_id: string) : Observable<CidadeDTO[]> {
        //Para retorna a requisição GET
        //Chamamos nossa API config e tipamos o get com CidadeDTO[]
        return this.http.get<CidadeDTO[]>(`${API_CONFIG.baseUrl}/estados/${estado_id}/cidades`);
    }
}