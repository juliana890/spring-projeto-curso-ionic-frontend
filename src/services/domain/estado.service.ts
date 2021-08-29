import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx"; //Importação correta para o Observable pois a outra é incompleta
import { API_CONFIG } from "../../config/api.config";
import { EstadoDTO } from "../../models/estado.dto";

//Para que a classe possa ser injetada em outras classes
@Injectable()
export class EstadoService{

    //Criamos o construtor para injetarmos o HttpClient
    constructor(public http: HttpClient){}

    //Retorna a lista dos estados
    findAll() : Observable<EstadoDTO[]> {
        //Para retorna a requisição GET
        //Chamamos nossa API config e tipamos o get com EstadoDTO[]
        return this.http.get<EstadoDTO[]>(`${API_CONFIG.baseUrl}/estados`);
    }
}