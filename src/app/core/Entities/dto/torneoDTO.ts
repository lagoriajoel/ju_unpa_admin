import { disciplinaIdDTO } from "./disciplinaIdDTO";

export interface torneoDTO {
   
    type: string;
    name: string;
    numTeams: number;
    sport:disciplinaIdDTO
}