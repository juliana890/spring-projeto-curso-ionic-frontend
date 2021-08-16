//Temos que ter os mesmos atríbutos da classe ClienteDTO do Spring Boot
export interface ClienteDTO {
    id: string;
    nome: string;
    email: string;
    imageUrl?: string; //Criamos um atríbuto opcional com '?'
}