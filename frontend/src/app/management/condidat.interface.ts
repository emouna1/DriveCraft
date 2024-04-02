export interface Candidate {
  id?: string; // optional if you have unique IDs for candidates
  name: string;
  firstName: string;
  CIN: string;
  dateOfIssue: Date;
  licenseCategory: string;
  situation: string;
  balance: number;
  dateOfBirth: Date;
  nationality: string;
  address: string;
  telephone: string;
  image: string; // URL of the image
}
