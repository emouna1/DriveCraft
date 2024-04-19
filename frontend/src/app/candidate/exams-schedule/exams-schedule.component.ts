import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/auth-service.service';
import { EnrollmentService } from 'src/app/enrollment.service';
import * as FullCalendar from 'fullcalendar'; // Import FullCalendar library
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid'
import timelinePlugin from '@fullcalendar/timeline';
@Component({
  selector: 'app-exams-schedule',
  templateUrl: './exams-schedule.component.html',
  styleUrl: './exams-schedule.component.css'
})
export class ExamsScheduleComponent {


  selectedEvent: CodeLessonExam | null = null;
  calendar!: FullCalendar.Calendar; // Declare calendar as a property
  snackbarMessage: string | null = null;
  editEventDetails: CodeLessonExam | null = null;
  constructor(private snackBar: MatSnackBar,
   private formBuilder: FormBuilder,
   private calendarService: EnrollmentService,
   private authService:AuthService

 ) {
   this.addEventForm = this.formBuilder.group({
     date: ['', Validators.required],
     startHour: ['', Validators.required],
     endHour: ['', Validators.required],
     taskCategory: ['', Validators.required],
     taskType: ['', Validators.required],
     result: [''],
     candidatCIN: ['', Validators.required]
   });

   this.editEventForm = this.formBuilder.group({
     date: ['', Validators.required],
     startHour: ['', Validators.required],
     endHour: ['', Validators.required],
     taskCategory: ['', Validators.required],
     taskType: ['', Validators.required],
     result: [''],
     candidatCIN: ['', Validators.required]
   });
 }

 ngOnInit(): void {
  const userCIN= this.authService.getCurrentUserCIN()
  console.log(userCIN) // the user's CIN is stored as 'userCIN' in local storage
  if (userCIN) {
    this.calendarService.getAll().subscribe((data: CodeLessonExam[]) => {

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
  const userLessonEvents = data.filter(item => item.taskType === 'exam' && item.candidatCIN === userCIN).map((item: CodeLessonExam) => {
    return {
      title: 'Exam',
      start: item.date + 'T' + item.startHour,
      end: item.date + 'T' + item.endHour,
      backgroundColor: this.getEventColor(item.result),
      extendedProps: {
        result: item.result,
        taskCategory: item.taskCategory,
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

 showAddEventModal = false;
 newEvent: CodeLessonExam = { date: '', startHour: '', endHour: '', taskCategory: 'code', taskType: 'lesson', result: null, accomplished: null, candidatCIN: '..' };

 // Method to open the add event modal
 openAddEventModal(): void {
   this.showAddEventModal = true;
 }

 // Method to close the add event modal
 closeAddEventModal(): void {
   this.showAddEventModal = false;
 }

 // Method to add a new event
 addEvent(): void {
     const newEvent: CodeLessonExam = this.addEventForm.value;
     this.calendarService.add(newEvent).subscribe(() => {
     // Refresh calendar after adding event
     this.calendar.refetchEvents();
     this.closeAddEventModal();
     this.openSnackBar('Event added successfully');

   }, error => {
     console.error('Error adding event:', error);
     this.openSnackBar('Error adding event. Please try again.');
   });
 }
 showEditEventModal = false;
 //editEventDetails: CodeLessonExam | null = null;

 // Method to open the edit event modal
 /*openEditEventModal(event: FullCalendar.EventApi): void {
   const extendedProps = event.extendedProps;
   if (extendedProps && extendedProps['extendedProps']) {
     const selectedEvent = extendedProps['extendedProps'] as CodeLessonExam;
     console.log(this.selectedEvent)
     this.editEventForm.patchValue(selectedEvent); // Populate the form with selected event data
     this.showEditEventModal = true;
 }}*/
 openEditEventModal(selectedEvent: CodeLessonExam): void {
   this.selectedEvent = selectedEvent;
   console.log(this.selectedEvent)
   this.editEventForm.patchValue(selectedEvent);
   this.showEditEventModal = true;
 }
 

 // Method to close the edit event modal
 closeEditEventModal(): void {
   this.showEditEventModal = false;
   this.editEventDetails = null;
 }

 // Method to edit an existing event
 editEvent(): void {
   const editedEvent: CodeLessonExam = this.editEventForm.value;

     this.calendarService.edit(editedEvent).subscribe(() => {
       // Refresh calendar after editing event
       this.calendar.refetchEvents();
       this.closeEditEventModal();
       this.openSnackBar('Event edited successfully');
     }, error => {
       console.error('Error editing event:', error);
       this.openSnackBar('Error editing event. Please try again.');
     });
   }
 deleteEvent(event: FullCalendar.EventApi): void {
   const eventId = event.id;
   if (eventId) {
     if (confirm('Are you sure you want to delete this event?')) {
       this.calendarService.delete(eventId).subscribe(() => {
         this.calendar.refetchEvents();
         this.openSnackBar('Event deleted successfully !');

       }, error => {
         console.error('Error deleting event:', error);
         this.openSnackBar('Error deleting event. Please try again.');
       });
     }
   }
 }
   
   
   addEventForm: FormGroup;
   editEventForm: FormGroup;
   addEventFields = [
     { label: 'Date', name: 'date', type: 'date', required: true },
     { label: 'Start Hour', name: 'startHour', type: 'time', required: true },
     { label: 'End Hour', name: 'endHour', type: 'time', required: true },
     { label: 'Task Category', name: 'taskCategory', type: 'text', required: true },
     { label: 'Task Type', name: 'taskType', type: 'text', required: true },
     { label: 'Result', name: 'result', type: 'text', required: false },
     { label: 'Candidate CIN', name: 'candidatCIN', type: 'text', required: true }
   ];
   editEventFields = [
     { label: 'Date', name: 'date', type: 'date', required: true },
     { label: 'Start Hour', name: 'startHour', type: 'time', required: true },
     { label: 'End Hour', name: 'endHour', type: 'time', required: true },
     { label: 'Task Category', name: 'taskCategory', type: 'text', required: true },
     { label: 'Task Type', name: 'taskType', type: 'text', required: true },
     { label: 'Result', name: 'result', type: 'text', required: false },
     { label: 'Candidate CIN', name: 'candidatCIN', type: 'text', required: true }
   ];
 
   
 
 
 

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