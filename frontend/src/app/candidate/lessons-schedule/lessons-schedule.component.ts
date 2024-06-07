import { AuthService } from 'src/app/auth-service.service';
import { Component } from '@angular/core';
import { EnrollmentService } from 'src/app/enrollment.service';
import * as FullCalendar from 'fullcalendar'; // Import FullCalendar library
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid'
import timelinePlugin from '@fullcalendar/timeline';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentDialogComponent } from '../student-dialog/student-dialog.component';
@Component({
  selector: 'app-lessons-schedule',
  templateUrl: './lessons-schedule.component.html',
  styleUrl: './lessons-schedule.component.css'
})
export class LessonsScheduleComponent {

  selectedEvent: CodeLessonExam | null = null;
  calendar!: FullCalendar.Calendar; // Declare calendar as a property
  snackbarMessage: string | null = null;
  editEventDetails: CodeLessonExam | null = null;
  constructor(private snackBar: MatSnackBar,
   private formBuilder: FormBuilder,
   private calendarService: EnrollmentService,
   private authService:AuthService

 ) {
  
 }

 ngOnInit(): void {
  const userCIN= this.authService.getCurrentUserCIN()
  console.log(userCIN) // Assuming the user's CIN is stored as 'userCIN' in local storage
  if (userCIN) {
    this.calendarService.getAllLessons().subscribe((data: CodeLessonExam[]) => {

      this.populateCalendar(data, userCIN);
    });
  } else {
    console.error('User CIN not found in local storage.');
  }
}

 
 openSnackBar(message: string, duration: number = 3000): void {
   this.snackBar.open(message, 'Dismiss', { duration: duration });
 }

 populateCalendar(data: CodeLessonExam[],userCIN: string): void {
  const userLessonEvents = data.filter(item => item.taskType === 'lesson' && item.candidatCIN === userCIN).map((item: CodeLessonExam) => {
    return {
      title: 'Lesson',
      start: item.date + 'T' + item.startHour,
      end: item.date + 'T' + item.endHour,
      backgroundColor: this.getEventColor(item.accomplished),
      extendedProps: {
        date : item.date,
        startHour: item.startHour,
        endHour: item.endHour,
        result: item.result,
        taskCategory: item.taskCategory,
        accomplished: item.accomplished,
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

 /*eventClickCallback(info: FullCalendar.EventClickArg) {
   //const event = info.event as FullCalendar.EventApi;
   const event: EventApi = info.event as EventApi;

   const extendedProps = event.extendedProps;
   console.log('Clicked event:', event); // Log the event to inspect its properties

   this.selectedEvent = extendedProps as CodeLessonExam;
   // Use getExtendedProp method to access extendedProps safely

 if (extendedProps) {
   this.selectedEvent = extendedProps as CodeLessonExam;
 }
 }*/
 eventClickCallback(info: FullCalendar.EventClickArg) {
   const event = info.event as FullCalendar.EventApi;
   const extendedProps = event.extendedProps; // This may be the nested object
   console.log('Clicked event:', event); // Log the event to inspect its properties
 
   if (extendedProps && extendedProps['extendedProps']) { // Check if nested props exist
     this.selectedEvent = extendedProps['extendedProps'] as CodeLessonExam;
   }
 }
 // Inside your component class
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
 

 

 getEventColor(accomplished: boolean | null): string {
  if (accomplished === true) {
    return 'blue'; // Accomplished lessons are blue
  } else if (accomplished === false) {
    return 'pink'; // Not accomplished lessons are pink
  } else {
    return 'gray'; // Default color for other cases
  }
}

 

 showAddEventModal = false;
 newEvent: CodeLessonExam = { date: '', startHour: '', endHour: '', taskCategory: 'code', taskType: 'lesson', result: null, accomplished: null, candidatCIN: '..' };

 
 

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
}
