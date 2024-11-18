import { Component, OnInit } from '@angular/core';
import { InstructorCandidateService } from '../../instructor-candidate.service'; // Adjust the import based on the location of your service

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
  LicensePlate: string;
  Brand: string;
  Type: string;
  Power: string;
  Fuel: string;
  Odometer: number;
  Color: string;
  PurchasePrice: number;
  Date: string; // Assuming date is represented as a string in ISO 8601 format
  Observation: string;
  Image: string;
}

interface Assignment {
  student: Candidate ;
  instructor: Instructor ;
  car: Vehicle ;
}

@Component({
  selector: 'app-instructor-candidate',
  templateUrl: './instructor-candidate.component.html',
  styleUrl: './instructor-candidate.component.css',
})
export class InstructorCandidateComponent implements OnInit {
  candidates: Candidate[] = [];
  instructors: Instructor[] = [];
  vehicles: Vehicle[] = [];
  assignments: Assignment[] = [];

  selectedCandidate: Candidate | null = null;
  selectedInstructor: Instructor | null = null;
  selectedVehicle: Vehicle | null = null;
  expandedInstructor: Instructor | null = null;

  constructor(private instructorCandidateService: InstructorCandidateService) {}

  ngOnInit(): void {
    this.loadCandidates();
    this.loadInstructors();
    this.loadVehicles();
    this.loadAssignments();
  }
  loadAssignments(): void {
    this.instructorCandidateService.loadAssignments().subscribe(
      (data: Assignment[]) => {
        this.assignments = data; // Assign the fetched data to the assignments array
      },
      (error) => {
        console.error('Error fetching assignments', error);
      }
    );
  }
  

  loadCandidates(): void {
    this.instructorCandidateService.getCandidates().subscribe(
      (data: Candidate[]) => {
        this.candidates = data;
      },
      (error) => {
        console.error('Error fetching candidates', error);
      }
    );
  }

  loadInstructors(): void {
    this.instructorCandidateService.getInstructors().subscribe(
      (data: Instructor[]) => {
        this.instructors = data;
      },
      (error) => {
        console.error('Error fetching instructors', error);
      }
    );
  }

  loadVehicles(): void {
    this.instructorCandidateService.getVehicles().subscribe(
      (data: Vehicle[]) => {
        this.vehicles = data;
      },
      (error) => {
        console.error('Error fetching vehicles', error);
      }
    );
  }

 /* assignCandidate() {
    if (this.selectedCandidate && this.selectedInstructor && this.selectedVehicle) {
      this.selectedInstructor.candidates.push(this.selectedCandidate);
      const assignment: Assignment = {
        candidate: this.selectedCandidate,
        instructor: this.selectedInstructor,
        vehicle: this.selectedVehicle,
      };
      this.assignments.push(assignment);

      // Clear selections after assignment
      this.selectedCandidate = null;
      this.selectedInstructor = null;
      this.selectedVehicle = null;
    }
  }



  assignCandidate() {
    if (this.selectedCandidate && this.selectedInstructor && this.selectedVehicle) {
      const assignmentData = {
        instructorId: this.selectedInstructor.id,
        studentId: this.selectedCandidate.id,
        carId: this.selectedVehicle.id,
      };*/
      assignCandidate() {
        if (this.selectedCandidate && this.selectedInstructor && this.selectedVehicle) {
          const assignmentData = {
            instructorId: this.selectedInstructor.id,
            studentId: this.selectedCandidate.id,
            carId: this.selectedVehicle.id, // selectedVehicle is guaranteed to be a Vehicle here
          };
      
          this.instructorCandidateService.assignCandidate(assignmentData).subscribe(
            (response) => {
              this.assignments.push({
                student: this.selectedCandidate!,
                instructor: this.selectedInstructor!,
                car: this.selectedVehicle!,
              });
              // Clear selections after assignment
              this.selectedCandidate = null;
              this.selectedInstructor = null;
              this.selectedVehicle = null;
            },
            (error) => {
              console.error('Error assigning candidate', error);
            }
          );
        } else {
          console.error('Please select a candidate, instructor, and vehicle.');
        }
      }
      
      
  
  removeCandidate(instructor: Instructor, candidate: Candidate) {
    instructor.candidates = instructor.candidates.filter((c) => c.id !== candidate.id);
    this.assignments = this.assignments.filter(
      (a) => a.student.id !== candidate.id || a.instructor.id !== instructor.id
    );
  }

  removeVehicle(assignment: Assignment) {
    this.assignments = this.assignments.filter((a) => a !== assignment);
    const instructor = this.instructors.find((i) => i.id === assignment.instructor.id);
    if (instructor) {
      instructor.candidates = instructor.candidates.filter((c) => c.id !== assignment.student.id);
    }
  }

  toggleInstructor(instructor: Instructor) {
    this.expandedInstructor = this.expandedInstructor === instructor ? null : instructor;
  }

  isInstructorExpanded(instructor: Instructor): boolean {
    return this.expandedInstructor === instructor;
  }
}
