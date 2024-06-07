import { InstructorPageComponent } from './../../candidate/instructor-page/instructor-page.component';
import { AuthService } from './../../auth-service.service';
import { CoondidateService } from 'src/app/coondidate.service';
import { Component } from '@angular/core';
import { EnrollmentService } from 'src/app/enrollment.service';
import * as FullCalendar from 'fullcalendar'; // Import FullCalendar library
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid'
import timelinePlugin from '@fullcalendar/timeline';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EventApi } from '@fullcalendar/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
@Component({
  selector: 'app-manage-lessons',
  templateUrl: './manage-lessons.component.html',
  styleUrl: './manage-lessons.component.css'
})
export class ManageLessonsComponent {
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
    private instructorService: CoondidateService,
    private authService: AuthService
  ) {
    this.addEventForm = this.formBuilder.group({
      date: ['', Validators.required],
      startHour: ['', Validators.required],
      endHour: ['', Validators.required],
      taskCategory: ['conduct'],
      taskType: ['lesson'],
      result: [''],
      accomplished: [false],
      candidatCIN: ['', Validators.required]
    });

    this.editEventForm = this.formBuilder.group({
      id: ['', Validators.required],
      date: ['', Validators.required],
      startHour: ['', Validators.required],
      endHour: ['', Validators.required],
      taskCategory: ['conduct'],
      taskType: ['lesson'],
      result: [''],
      accomplished: [false],
      candidatCIN: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();
    if (user) {
      this.instructorService.getLessonsForInstructor(user.id).subscribe(
        (data: CodeLessonExam[]) => {
          this.populateCalendar(data);
          this.fetchStudents(user.id);
        },
        error => {
          console.error('Error fetching lessons:', error);
          this.openSnackBar('Error fetching lessons. Please try again.');
        }
      );
    }
  }

  openSnackBar(message: string, duration: number = 3000): void {
    this.snackBar.open(message, 'Dismiss', { duration });
  }

  populateCalendar(data: CodeLessonExam[]): void {
    const userLessonEvents = data.map(item => ({
      title: item.taskType === 'exam' ? 'Exam' : 'Lesson',
      start: `${item.date}T${item.startHour}`,
      end: `${item.date}T${item.endHour}`,
      color: item.accomplished ? 'rgb(112, 193, 247)' : 'rgb(248, 26, 163)',
      extendedProps: { eventDetails: item }
    }));

    this.calendar = new FullCalendar.Calendar(document.getElementById('calendar')!, {
      plugins: [dayGridPlugin, timeGridPlugin],
      initialView: 'timeGridWeek',
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: ''
      },
      events: userLessonEvents,
      eventClick: this.handleEventClick.bind(this)
    });

    this.calendar.render();
  }

  handleEventClick(info: any): void {
    this.selectedEvent = info.event.extendedProps.eventDetails;
  }

  fetchStudents(userId: string) {
    this.instructorService.getStudentsForInstructor(userId).subscribe((data: any) => {
      this.Students = data;
      console.log(this.Students)
    });
  }

  changeView(view: string): void {
    this.calendar.changeView(view);
  }

  /*openAddEventModal(): void {
    this.addEventForm.reset();
    this.showAddEventModal = true;
  }

  closeAddEventModal(): void {
    this.showAddEventModal = false;
  }

 
  addEvent(): void {
    //const newEvent: CodeLessonExam = this.addEventForm.value;
    const newEvent: CodeLessonExam = {
      ...this.addEventForm.value,
      instructorId: this.authService.getCurrentUser().id
    };
    console.log(newEvent)
    this.calendarService.add(newEvent).subscribe(() => {

    // Refresh calendar after adding event
    this.calendar.refetchEvents();
    this.closeAddEventModal();
    this.openSnackBar('lesson added successfully');

  }, error => {
    console.error('Error adding lesson:', error);
    this.openSnackBar('Error adding lesson. Please try again.');
  });
}*/
newEvent: CodeLessonExam = { date: '', startHour: '', endHour: '', taskCategory: 'code', taskType: 'lesson', result: null, accomplished: null, candidatCIN: '..'  };

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
    //const newEvent: CodeLessonExam = this.addEventForm.value;
    const newEvent: CodeLessonExam = {
      ...this.addEventForm.value,
      instructorId: this.authService.getCurrentUser().id
    };
    console.log(newEvent)
    this.calendarService.add(newEvent).subscribe(() => {

    // Refresh calendar after adding event
    this.calendar.refetchEvents();
    this.closeAddEventModal();
    this.openSnackBar('lesson added successfully');

  }, error => {
    console.error('Error adding lesson:', error);
    this.openSnackBar('Error adding lesson. Please try again.');
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
  addEventFields = [
    { label: 'Date', name: 'date', type: 'date', required: true },
    { label: 'Start Hour', name: 'startHour', type: 'time', required: true },
    { label: 'End Hour', name: 'endHour', type: 'time', required: true },
    { label: 'Task Category', name: 'taskCategory', type: 'text', required: true },
    { label: 'Task Type', name: 'taskType', type: 'text', required: true },
    { label: 'Result', name: 'result', type: 'text', required: false },
    { label: 'Accomplished', name: 'accomplished', type: 'text', required: false },
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
  instructorId?:string;
}


interface Student {
  id: number;
  student: {
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
    // Add more properties as needed
  };
  // Other properties such as createdAt, updatedAt, etc.
}
