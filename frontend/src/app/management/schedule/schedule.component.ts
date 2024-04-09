import { Component } from '@angular/core';
import { EnrollmentService } from 'src/app/enrollment.service';
import * as FullCalendar from 'fullcalendar'; // Import FullCalendar library
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid'
@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.css'
})
export class ScheduleComponent {
  constructor(private calendarService: EnrollmentService) {}
  selectedEvent: CodeLessonExam | null = null;

  ngOnInit(): void {
    this.calendarService.getAll().subscribe((data: CodeLessonExam[]) => {
      this.populateCalendar(data);
    });
  }
  
  
  /*populateCalendar(data: CodeLessonExam[]): void {
    const events = data.map((item: CodeLessonExam) => {
      return {
        title: item.taskType === 'exam' ? 'Exam' : 'Lesson',
        start: item.date + 'T' + item.startHour,
        end: item.date + 'T' + item.endHour,
        backgroundColor: this.getEventColor(item.result)
      };
    });

    const calendarElement = document.getElementById('calendar');
    if (calendarElement) {
      // Initialize FullCalendar
      const calendar = new FullCalendar.Calendar(calendarElement, {
        plugins: [ dayGridPlugin ], // Use an array to pass plugins
        initialView: 'dayGridMonth', // 'defaultView' might be renamed to 'initialView'
        events: events
      });

      calendar.render();
    } else {
      console.error('Calendar element not found.');
    }
  }*/
  /*populateCalendar(data: CodeLessonExam[]): void {
    const events = data.map((item: CodeLessonExam) => {
      return {
        title: item.taskType === 'exam' ? 'Exam' : 'Lesson',
        start: item.date + 'T' + item.startHour,
        end: item.date + 'T' + item.endHour,
        backgroundColor: this.getEventColor(item.result),
        extendedProps: {
          result: item.result,
          taskCategory: item.taskCategory,
          //accomplished: item.accomplished,
         // candidatCIN: item.candidatCIN
        }
      };
    });
  
    const calendarElement = document.getElementById('calendar');
    if (calendarElement) {
      // Initialize FullCalendar
      const calendar = new FullCalendar.Calendar(calendarElement, {
       // plugins: [ dayGridPlugin ],
       // initialView: 'dayGridMonth',
       plugins: [dayGridPlugin, timeGridPlugin],
        initialView: 'timeGridWeek', // Display week view with time slots
        events: events,
        eventDidMount: this.eventRenderCallback.bind(this)
      });
  
      calendar.render();
    } else {
      console.error('Calendar element not found.');
    }
  }
  
  // Event render callback function
  // Event render callback function
/*eventRenderCallback(info: FullCalendar.EventMountArg) {
  const result = info.event.extendedProps['result'];
  const taskCategory = info.event.extendedProps['taskCategory'];
  const accomplished = info.event.extendedProps['accomplished'];
  const candidatCIN = info.event.extendedProps['candidatCIN'];

  const titleElement = info.el.querySelector('.fc-title');
  if (titleElement) {
    titleElement.innerHTML = `${info.event.title} (${taskCategory})`;
  }

  info.el.insertAdjacentHTML('beforeend', `<p>Result: ${result}</p>`);
  //info.el.insertAdjacentHTML('beforeend', `<p>Accomplished: ${accomplished}</p>`);
  //info.el.insertAdjacentHTML('beforeend', `<p>Candidate CIN: ${candidatCIN}</p>`);
}
eventRenderCallback(info: FullCalendar.EventMountArg) {
  const event = info.event;
  const extendedProps = event.extendedProps;

  // Attach click event to show event details
  event.setExtendedProp('clickable', true);
  event.setExtendedProp('extendedProps', extendedProps);

  event.setProp('title', `${event.title} (${extendedProps['taskCategory']})`);

  // Unset selectedEvent if it's the same event being clicked
  if (this.selectedEvent && this.selectedEvent.id === extendedProps['id']) {
    this.selectedEvent = null;
  } else {
    this.selectedEvent = extendedProps as CodeLessonExam; // Assert extendedProps to CodeLessonExam

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
  }*/
  

  populateCalendar(data: CodeLessonExam[]): void {
    const events = data.map((item: CodeLessonExam) => {
      return {
        title: item.taskType === 'exam' ? 'Exam' : 'Lesson',
        start: item.date + 'T' + item.startHour,
        end: item.date + 'T' + item.endHour,
        backgroundColor: this.getEventColor(item.result),
        extendedProps: {
          result: item.result,
          taskCategory: item.taskCategory,
          accomplished: item.accomplished,
          candidatCIN: item.candidatCIN
        }
      };
    });

    const calendarElement = document.getElementById('calendar');
    if (calendarElement) {
      const calendar = new FullCalendar.Calendar(calendarElement, {
        plugins: [dayGridPlugin, timeGridPlugin],
        initialView: 'timeGridWeek',
        events: events,
        eventDidMount: this.eventRenderCallback.bind(this),
        eventClick: this.eventClickCallback.bind(this)
      });

      calendar.render();
    } else {
      console.error('Calendar element not found.');
    }
  }

  eventRenderCallback(info: FullCalendar.EventMountArg) {
    const event = info.event;
    const extendedProps = event.extendedProps;

    event.setExtendedProp('clickable', true);
    event.setExtendedProp('extendedProps', extendedProps);

    event.setProp('title', `${event.title} (${extendedProps['taskCategory']})`);
  }

  eventClickCallback(info: FullCalendar.EventClickArg) {
    const event = info.event;
    const extendedProps = event.extendedProps;

    this.selectedEvent = extendedProps as CodeLessonExam;
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
  candidatCIN: string | null;
}