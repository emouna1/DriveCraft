import { Component, AfterViewInit } from '@angular/core';
import * as FullCalendar from 'fullcalendar'; // Import FullCalendar library
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { EnrollmentService } from 'src/app/enrollment.service';
import { CodeLessonExam } from '../schedule/schedule.component';

@Component({
  selector: 'app-schedulee',
  templateUrl: './schedulee.component.html',
  styleUrls: ['./schedulee.component.css'],
})
export class ScheduleeComponent {
  calendars: FullCalendar.Calendar[] = [];

  constructor(private eventService: EnrollmentService) {}

  ngAfterViewInit(): void {
    const calendarOptions = {
      plugins: [dayGridPlugin, timeGridPlugin, listPlugin],
      events: (fetchInfo: any, successCallback: Function, failureCallback: Function) => {
        this.eventService.getAll().subscribe(
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
    return events.map(event => ({
      title: this.getEventTitle(event),
      start: event.date,
      end: event.endHour,
      color: this.getEventColor(event),
    }));
  }

  // Helper function to determine event title
  private getEventTitle(event: CodeLessonExam): string {
    return event.taskType === 'exam' ? 'Exam' : 'Lesson';
  }

  // Helper function to determine event color
  private getEventColor(event: CodeLessonExam): string {
    if (event.taskType === 'exam') {
      switch (event.result) {
        case 'success':
          return '#4CAF50'; // Green for success
        case 'failed':
          return '#F44336'; // Red for failure
        case 'canceled':
          return '#FFC107'; // Yellow for canceled
        default:
          return '#9E9E9E'; // Grey for other cases
      }
    } else {
      return event.accomplished ? '#4CAF50' : '#F44336'; // Green for accomplished, red for not accomplished
    }
  }
}
