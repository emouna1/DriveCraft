export interface User {
    id: number;
    username: string;
    password: string;
    role: UserRole;
  }
  
  export enum UserRole {
    Admin = 'admin',
    Instructor = 'instructor',
    Employee = 'employee'
  }
  