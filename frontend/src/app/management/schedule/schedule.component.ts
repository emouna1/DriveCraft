import { Component, AfterViewInit, OnInit } from '@angular/core';
import { EnrollmentService } from 'src/app/enrollment.service';
import * as FullCalendar from 'fullcalendar'; // Import FullCalendar library
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import timelinePlugin from '@fullcalendar/timeline';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EventApi } from '@fullcalendar/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './../../auth-service.service';
import { CoondidateService } from 'src/app/coondidate.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit, AfterViewInit {
  Students!: Student[];
  selectedEvent: CodeLessonExam | null = null;
  calendar!: FullCalendar.Calendar;
  snackbarMessage: string | null = null;
  editEventDetails: CodeLessonExam | null = null;
  addEventForm: FormGroup;
  editEventForm: FormGroup;
  showAddEventModal = false;
  showEditEventModal = false;
   
  constructor(
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private calendarService: EnrollmentService,
    private candidateService: CoondidateService,
    private authService: AuthService
  ) {
    this.addEventForm = this.formBuilder.group({
      date: ['', Validators.required],
      startHour: ['', Validators.required],
      endHour: ['', Validators.required],
      taskCategory: ['', Validators.required],
      taskType: ['exam'],
      result: ['', Validators.required],  // Added result field
      //accomplished: [false],
      candidatCIN: ['', Validators.required]
    });

    this.editEventForm = this.formBuilder.group({
      id: ['', Validators.required],
      date: ['', Validators.required],
      startHour: ['', Validators.required],
      endHour: ['', Validators.required],
      taskCategory: ['', Validators.required],
      taskType: ['exam'],
      result: ['', Validators.required],  // Added result field
      //accomplished: [false],
      candidatCIN: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    
      this.calendarService.getAllExams().subscribe(
        (data: CodeLessonExam[]) => {
          console.log(data);
          this.populateCalendar(data);

          this.fetchStudents();
        },
        error => {
          console.error('Error fetching exams:', error);
          this.openSnackBar('Error fetching exams. Please try again.');
        }
      );
      console.log('Initial selected event:', this.selectedEvent);

    }

  

  ngAfterViewInit(): void {}

  openSnackBar(message: string, duration: number = 3000): void {
    this.snackBar.open(message, 'Dismiss', { duration: duration });
  }

  populateCalendar(data: CodeLessonExam[]): void {
    const userExamEvents = data
      //.filter(item => item.taskType === 'exam') // Filter only exams
      .map((item: CodeLessonExam) => {
        return {
          title: `${item.taskCategory} Exam`,
          start: item.date + 'T' + item.startHour,
          end: item.date + 'T' + item.endHour,
          backgroundColor: this.getEventColor(item.result),
          extendedProps: {
            id: item.id,
            date: item.date,
            startHour: item.startHour,
            endHour: item.endHour,
            result: item.result,
            taskCategory: item.taskCategory,
            accomplished: item.accomplished,
            candidatCIN: item.candidatCIN,
            taskType: item.taskType
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
            type: 'dayGridMonth',
            duration: { months: 1 }
          },
          year: {
            type: 'dayGridYear',
            duration: { months: 12 },
            buttonText: 'Year View'
          }
        },
        events: userExamEvents,
        eventDidMount: this.eventRenderCallback.bind(this),
        eventClick: (info: FullCalendar.EventClickArg) => this.eventClickCallback(info)
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
  
    console.log('Clicked event:', event); // Log the event object
  
    if (extendedProps && extendedProps['extendedProps'] && extendedProps['id'] !== undefined) {
      this.selectedEvent = extendedProps['extendedProps'] as CodeLessonExam;
      console.log('Selected event:', this.selectedEvent); // Log the selected event
      this.openEditEventModal(this.selectedEvent); // Open the modal with selected event

    } else {
      console.error('Event extendedProps do not contain an id');
    }
  }
  

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

  openAddEventModal(): void {
    this.showAddEventModal = true;
  }

  closeAddEventModal(): void {
    this.showAddEventModal = false;
  }

  addEvent(): void {
    const newEvent: CodeLessonExam = {
      ...this.addEventForm.value,
    };

    this.calendarService.add(newEvent).subscribe(() => {
      this.calendar.refetchEvents();
      this.closeAddEventModal();
      this.openSnackBar('Event added successfully');
    }, error => {
      console.error('Error adding event:', error);
      this.openSnackBar('Error adding event. Please try again.');
    });
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
  fetchStudents(): void {
    this.candidateService.getAllStudents().subscribe((data: any) => {
      this.Students = data;
    });
  }
  openEditEventModal(eventDetails: CodeLessonExam): void {
    this.editEventDetails = eventDetails;
    this.editEventForm.patchValue(eventDetails);
    this.showEditEventModal = true;
  }

  closeEditEventModal(): void {
    this.showEditEventModal = false;
  }

  editEvent(): void {
    if (this.editEventForm.valid) {
      const updatedEvent = this.editEventForm.value;
      this.calendarService.edit(updatedEvent.id,updatedEvent).subscribe(
        response => {
          const event = this.calendar.getEventById(updatedEvent.id);
          if (event) {
            event.setProp('title', updatedEvent.taskType === 'exam' ? 'Exam' : 'Lesson');
            event.setStart(`${updatedEvent.date}T${updatedEvent.startHour}`);
            event.setEnd(`${updatedEvent.date}T${updatedEvent.endHour}`);
            event.setProp('color', updatedEvent.accomplished ? 'rgb(112, 193, 247)' : 'rgb(248, 26, 163)');
            event.setExtendedProp('eventDetails', updatedEvent);
          }
          this.closeEditEventModal();
          this.openSnackBar('Lesson updated successfully.');
        },
        error => {
          console.error('Error updating event:', error);
          this.openSnackBar('Error updating lesson. Please try again.');
        }
      );
    }
  }

  updateAccomplished(accomplished: boolean): void {
    this.addEventForm.patchValue({ accomplished });
    this.editEventForm.patchValue({ accomplished });
  }
  /*updateAccomplished(checked: boolean): void {
    this.addEventForm.patchValue({
      accomplished: checked
    });
  }*/
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
  instructorId?: string;
}

interface Student {
  id: number;
  //student: {
    CIN: string;
    CategoryCode: string | null;
    address: string;
    balance: number;
    email: string;
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    cnssNumber: string | null;
    createdAt: Date;
    dateOfIssue: Date;
    imageUrl: string | null;
    leaveDaysPerYear: number | null;
    name: string;
    nationality: string;
    netSalary: number | null;
    password: string;
    personnelFunction: string | null;
    qualification: string | null;
    recruitmentDate: Date | null;
    role: string;
    situation: string;
    telephone: string;
    updatedAt: Date;
    username: string;
 // };
}
