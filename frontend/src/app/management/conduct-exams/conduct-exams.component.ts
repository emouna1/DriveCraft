import { Component } from '@angular/core';
import * as FullCalendar from 'fullcalendar'; // Import FullCalendar library
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { EnrollmentService } from 'src/app/enrollment.service';
import { CodeLessonExam } from '../schedule/schedule.component';
@Component({
  selector: 'app-conduct-exams',
  templateUrl: './conduct-exams.component.html',
  styleUrl: './conduct-exams.component.css'
})
export class ConductExamsComponent {

  calendars: FullCalendar.Calendar[] = [];

  constructor(private eventService: EnrollmentService) {}

  

ngAfterViewInit(): void {
  const calendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin, listPlugin],
    events: (fetchInfo: any, successCallback: Function, failureCallback: Function) => {
      this.eventService.getAllExams().subscribe(
        (events: CodeLessonExam[]) => {
          const formattedEvents = this.formatEvents(events);
          successCallback(formattedEvents);
        },
        error => {
          console.error('Error fetching events:', error);
          failureCallback(error);
        }
      );
    },
    initialView: 'timeGridWeek', // Default view
    eventDisplay: 'block', // Display event information
  };

  const calendarViews = ['timeGridWeek', 'listWeek', 'dayGridMonth'];
  calendarViews.forEach((view, index) => {
    const calendarElement = document.getElementById(`calendar${index + 1}`);
    if (calendarElement) {
      const options = {
        ...calendarOptions,
        initialView: view
      };
      const calendar = new FullCalendar.Calendar(calendarElement, options);
      this.calendars.push(calendar);
      calendar.render();
    } else {
      console.error(`Calendar ${index + 1} element not found.`);
    }
  });
}

// Helper function to format events and assign colors
private formatEvents(events: CodeLessonExam[]): any[] {
  return events
   // .filter(event => event.taskType === 'lesson') // Filter only lessons
    .map(event => ({
      title: 'exam', // Set title to 'Lesson'
      start: event.date,
      end: event.endHour,
      //color: event.accomplished ? '#4CAF50' : '#F44336', // Green for accomplished, red for not accomplished
      color: this.getEventColor(event.result) // Assign color based on result

    }));
}


  // Helper function to determine event title
  private getEventTitle(event: CodeLessonExam): string {
    return event.taskType === 'exam' ? 'Exam' : 'Lesson';
  }

  // Helper function to determine event color
  getEventColor(result: 'failed' | 'success' | 'canceled' | null): string {
    switch (result) {
      case 'success':
        return 'green';
      case 'failed':
        return 'red';
      case 'canceled':
        return 'gray';
      default:
        return 'blue';
    }
  }
}