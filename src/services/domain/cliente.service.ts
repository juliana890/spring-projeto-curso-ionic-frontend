import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { API_CONFIG } from "../../config/api.config";
import { ClienteDTO } from "../../models/cliente.dto";
import { StorageService } from "../storage.service";

//Para que a classe possa ser injetada em outras classes
@Injectable()
export class ClienteService {

    constructor(public http: HttpClient, public storage: StorageService){}

    //Método que irá receber um email e retornará um Observable de ClienteDTO
    findByEmail(email: string) : Observable<ClienteDTO> {
        //Fazemos a busca conforme url da nossa aplicação no Spring ClienteResource passando o value = email
        //E passamos nossa variável authHeader
        return this.http.get<ClienteDTO>(`${API_CONFIG.baseUrl}/clientes/email?value=${email}`);
    }

    //Método que irá buscar a imagem no bucket da amazon S3
    getImageFromBucket(id: string) : Observable<any> {
        //Montamos a url previamente configurada na nossa API_CONFIG passamos o cp que é o prefixo da imagem do cliente no bucket e o seu id
        let url = `${API_CONFIG.bucketBaseUrl}/cp${id}.jpg`

        //Retornamos a requisição get informando que a resposa será um blob ou seja: Uma Imagem
        return this.http.get(url, {responseType: 'blob'});
    }

     //Inserindo cliente
     insert(obj: ClienteDTO){
        return this.http.post(
            `${API_CONFIG.baseUrl}/clientes`,
            obj,
            {
                observe: 'response',
                responseType: 'text'
            }
        );
    }


}