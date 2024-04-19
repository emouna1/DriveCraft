import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-student-dialog',
  templateUrl: './student-dialog.component.html',
  styleUrl: './student-dialog.component.css'
})
export class StudentDialogComponent {

  @Input() eventDetails: CodeLessonExam | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() deleteEventEmitter: EventEmitter<any> = new EventEmitter<CodeLessonExam>(); // Renamed to deleteEventEmitter
  @Output() editEvent: EventEmitter<any> = new EventEmitter<CodeLessonExam>();

  onClose() {
    this.close.emit();
  }
  openEditEventModal(): void {
    this.editEvent.emit(this.eventDetails);
  }

  deleteEvent(): void {
    this.deleteEventEmitter.emit(this.eventDetails);
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
}
