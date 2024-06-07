
import { Component } from '@angular/core';

interface Candidate {
  id: number;
  name: string;
}

interface Instructor {
  id: number;
  name: string;
  candidates: Candidate[];
}

interface Vehicle {
  id: number;
  name: string;
}

interface Assignment {
  candidate: Candidate;
  instructor: Instructor;
  vehicle: Vehicle;
}

@Component({
  selector: 'app-instructor-candidate',
  templateUrl: './instructor-candidate.component.html',
  styleUrl: './instructor-candidate.component.css'
})
export class InstructorCandidateComponent {
  candidates: Candidate[] = [
    { id: 1, name: 'Alice Adnen' },
    { id: 2, name: 'Chrif Emna' },
    { id: 3, name: 'Achref Ahmed' },
  ];
  
  instructors: Instructor[] = [
    { id: 1, name: 'Hager Grira', candidates: [] },
    { id: 2, name: 'Hila Guizani', candidates: [] },
    { id: 3, name: 'Mohamed Cherif', candidates: [] },
  ];
  
  vehicles: Vehicle[] = [
    { id: 1, name: 'Renault Clio' },
    { id: 2, name: 'Peugeot 208' },
    { id: 3, name: 'Citroën C3' },
  ];
  
  assignments: Assignment[] = [];

  selectedCandidate: Candidate | null = null;
  selectedInstructor: Instructor | null = null;
  selectedVehicle: Vehicle | null = null;
  expandedInstructor: Instructor | null = null;

  assignCandidate() {
    if (this.selectedCandidate && this.selectedInstructor && this.selectedVehicle) {
      this.selectedInstructor.candidates.push(this.selectedCandidate);
      const assignment: Assignment = {
        candidate: this.selectedCandidate,
        instructor: this.selectedInstructor,
        vehicle: this.selectedVehicle,
      };
      this.assignments.push(assignment);

      this.selectedCandidate = null;
      this.selectedInstructor = null;
      this.selectedVehicle = null;
    }
  }

  removeCandidate(instructor: Instructor, candidate: Candidate) {
    instructor.candidates = instructor.candidates.filter(c => c.id !== candidate.id);
    this.assignments = this.assignments.filter(a => a.candidate.id !== candidate.id || a.instructor.id !== instructor.id);
  }

  removeVehicle(assignment: Assignment) {
    this.assignments = this.assignments.filter(a => a !== assignment);
    const instructor = this.instructors.find(i => i.id === assignment.instructor.id);
    if (instructor) {
      instructor.candidates = instructor.candidates.filter(c => c.id !== assignment.candidate.id);
    }
  }

  toggleInstructor(instructor: Instructor) {
    if (this.expandedInstructor === instructor) {
      this.expandedInstructor = null;
    } else {
      this.expandedInstructor = instructor;
    }
  }

  isInstructorExpanded(instructor: Instructor): boolean {
    return this.expandedInstructor === instructor;
  }
}
