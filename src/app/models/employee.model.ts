export interface Employee {
    codePersonnel: string;
    cin: string;
    nom: string;
    prenom: string;
    dateNaissance: Date; // Date of birth
    adresse: string;
    mobile: string;
    fonctionPersonnel: string;
    dateRecrutement: Date; // Date of recruitment
    qualification: string;
    nombreJoursCongeParAn: number;
    salaireBrut: number;
    numeroCNSS: string;
    tauxRetenuCNSS: number;
    tauxChargePatronal: number;
    tauxRetenuSource: number;
    salaireNet: number;
    solde: number;
    saisiParSupervisor: string; // Entered by supervisor
    modifieLe: Date; // Modified on
    modifiePar: string; // Modified by
    photo: string; // URL to the photo
  }
  