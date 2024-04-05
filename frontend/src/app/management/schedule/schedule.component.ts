import { Component } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import { CalendarOptions } from '@fullcalendar/core';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.css'
})
export class ScheduleComponent {
  calendarPlugins = [dayGridPlugin]; // important!
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin],
    initialView: 'dayGridMonth',
    weekends: false,
    events : [
    { title: 'Driving Lesson 1', start: '2024-04-01T09:00:00', end: '2024-04-01T10:00:00' },
    { title: 'Driving Lesson 2', start: '2024-04-02T10:00:00', end: '2024-04-02T11:00:00' }
    // add more events as needed
  ]};
}
