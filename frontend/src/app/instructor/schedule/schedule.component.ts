import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/auth-service.service';
import { EnrollmentService } from 'src/app/enrollment.service';
import * as FullCalendar from 'fullcalendar'; // Import FullCalendar library
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid'
import timelinePlugin from '@fullcalendar/timeline';
import { CoondidateService } from 'src/app/coondidate.service';
@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.css'
})
export class ScheduleComponent {
  selectedEvent: CodeLessonExam | null = null;
  calendar!: FullCalendar.Calendar;
  snackbarMessage: string | null = null;
  editEventDetails: CodeLessonExam | null = null;

  constructor(
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private instructorService:CoondidateService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    /*const user= this.authService.getCurrentUser()
     console.log(user.id) // Assuming the user's CIN is stored as 'userCIN' in local storage
    this.instructorService.getExamsForInstructor('userId').subscribe(
      (data: CodeLessonExam[]) => {
        this.populateCalendar(data, user.id);

      },
      error => {
        console.error('Error fetching lessons:', error);
        this.openSnackBar('Error fetching lessons. Please try again.');
      }
    );*/
    const user= this.authService.getCurrentUser()
     console.log(user.id) // Assuming the user's CIN is stored as 'userCIN' in local storage
     if (user) {
      const userId = user.id; // Assuming the user's ID is stored as 'id'
      this.instructorService.getExamsForInstructor(userId).subscribe(
      (data: CodeLessonExam[]) => {
        console.log('Received data from API:', data); // Log the data received from the API
        this.populateCalendar(data, user.id);
        
      },
      error => {
        console.error('Error fetching lessons:', error);
        this.openSnackBar('Error fetching lessons. Please try again.');
      }
    );
  }
  }
  
  openSnackBar(message: string, duration: number = 3000): void {
    this.snackBar.open(message, 'Dismiss', { duration: duration });
  }

  populateCalendar(data: CodeLessonExam[], userId : string): void {
      const userLessonEvents = data.map((item: CodeLessonExam) => {
        return {
        title: item.taskType === 'exam' ? 'Exam' : 'Lesson',
        start: item.date + 'T' + item.startHour,
        end: item.date + 'T' + item.endHour,
        backgroundColor: this.getEventColor(item.result),
        extendedProps: {
          date : item.date,
          startHour: item.startHour,
          endHour: item.endHour,
          result: item.result,
          taskCategory: item.taskCategory,
          accomplished: item.accomplished,
          candidatCIN: item.candidatCIN,
          taskType:item.taskType
        }
      };
    });
    
    const calendarElement = document.getElementById('calendar');
    if (calendarElement) {
      this.calendar = new FullCalendar.Calendar(calendarElement, {
        plugins: [dayGridPlugin, timeGridPlugin, timelinePlugin],
        initialView: 'timeGridWeek',
        views: {
          month: {
            type: 'dayGridMonth', // Show month view using dayGridMonth
            duration: { months: 1 } // Display one month at a time
          },
          year: {
            type: 'dayGridYear', // Show year view using dayGridMonth
            duration: { months: 12 }, // Display one year at a time
            buttonText: 'Year View' // Customize the button text for the year view
          },},
      
        events: userLessonEvents,
        eventDidMount: this.eventRenderCallback.bind(this),
        //eventClick: this.eventClickCallback.bind(this)
        eventClick: (info: FullCalendar.EventClickArg) => this.eventClickCallback(info), // Use arrow function to preserve 'this'

      });

      this.calendar.render();
    } else {
      console.error('Calendar element not found.');
    }
  }

  eventRenderCallback(info: FullCalendar.EventMountArg) {
    const event = info.event as FullCalendar.EventApi;
    const extendedProps = event.extendedProps;

    event.setExtendedProp('clickable', true);
    event.setExtendedProp('extendedProps', extendedProps);

    event.setProp('title', `${event.title} (${extendedProps['taskCategory']})`);
  }

  eventClickCallback(info: FullCalendar.EventClickArg) {
    const event = info.event as FullCalendar.EventApi;
    const extendedProps = event.extendedProps;

    if (extendedProps && extendedProps['extendedProps']) {
      this.selectedEvent = extendedProps['extendedProps'] as CodeLessonExam;
    }
  }

  changeView(view: string): void {
    if (this.calendar) {
      switch (view) {
        case 'timeGridWeek':
        case 'dayGridMonth':
        case 'dayGridYear':
          this.calendar.changeView(view);
          break;
        default:
          console.error('Invalid view name:', view);
          break;
      }
    }
  }

  getEventColor(result: string | null): string {
    switch (result) {
      case 'failed':
        return 'red';
      case 'success':
        return 'green';
      case 'canceled':
        return 'gray';
      default:
        return 'blue';
    }
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
  candidatCIN: string;
  instructorId: string; // Add instructor ID
}