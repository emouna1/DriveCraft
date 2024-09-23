import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-instructor-dialog',
  templateUrl: './instructor-dialog.component.html',
  styleUrl: './instructor-dialog.component.css'
})
export class InstructorDialogComponent {

  @Input() eventDetails: CodeLessonExam | null = null;
  //@Output() close = new EventEmitter<void>();
  @Output() close = new EventEmitter<CodeLessonExam>(); // Specify type as CodeLessonExam

  @Output() deleteEventEmitter: EventEmitter<any> = new EventEmitter<CodeLessonExam>(); // Renamed to deleteEventEmitter
  @Output() editEvent: EventEmitter<any> = new EventEmitter<CodeLessonExam>();
  
  onClose() {
    this.close.emit();
  }
  openEditEventModal(): void {
    this.editEvent.emit(this.eventDetails);
  }
 /* openEditEventModal(selectedEvent: CodeLessonExam): void {
    this.close.emit(selectedEvent); // Assuming 'close' is an Output event emitter
  }*/


  deleteEvent(): void {
    this.deleteEventEmitter.emit(this.eventDetails);
  }
  // Function to check if the event is a lesson
  isLesson(event: CodeLessonExam | null): boolean {
    return event?.taskType === 'lesson';
  }

  // Function to check if the event is an exam
  isExam(event: CodeLessonExam | null): boolean {
    return event?.taskType === 'exam';
  }
}
export interface CodeLessonExam {
  id?: number;
  date: string;
  startHour: string;
  endHour: string;
  taskCategory: 'code' | 'conduct';
  taskType: 'exam' | 'lesson';
  result: 'failed' | 'success' | 'canceled' | null;
  accomplished: boolean | null;
  candidatCIN: string | null;
  //InstructorId: string
}