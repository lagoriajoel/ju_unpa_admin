import { disciplinaIdDTO } from "./disciplinaIdDTO";

export interface torneoDTO {
   
    tipo: string;
    nombre: string;
    numTeams: number;
    sport:disciplinaIdDTO
}