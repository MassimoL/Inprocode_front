import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FullCalendarModule } from '@fullcalendar/angular';
import { FullCalendarService } from '../../service/fullcalendar.service';
import { FullCalendarInterface } from '../../interfaces/fullcalendarInterface';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi, EventInput } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';

@Component({
  selector: 'app-fullcalendar',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FullCalendarModule],
  templateUrl: './full-calendar.component.html',
  styleUrls: ['./full-calendar.component.css']
})
export class CalendarComponent implements OnInit {
  eventGuid = 0;
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    displayEventTime: false,
    plugins: [
      interactionPlugin,
      dayGridPlugin,
      timeGridPlugin,
      listPlugin
    ]
  };
  currentEvents: EventApi[] = [];

  constructor(private changeDetector: ChangeDetectorRef, private fullCalendarService: FullCalendarService) { }

  ngOnInit() {
    this.fullCalendarService.getListDates().subscribe((data: FullCalendarInterface[]) => {
      const events: EventInput[] = data.map(event => ({
        id: String(event.id),
        title: event.title,
        start: new Date(event.date),
        end: new Date(event.date),
      }));

      this.calendarOptions.events = events;
      this.calendarOptions.headerToolbar = {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
      };
      this.calendarOptions.weekends = true;
      this.calendarOptions.editable = true;
      this.calendarOptions.selectable = true;
      this.calendarOptions.selectMirror = true;
      this.calendarOptions.dayMaxEvents = true;
      this.calendarOptions.select = this.handleDateSelect.bind(this);
      this.calendarOptions.eventClick = this.handleEventClick.bind(this);
      this.calendarOptions.eventsSet = this.handleEvents.bind(this);
    });
  }

  createEventId() {
    return this.eventGuid++;
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    const title = prompt('Introduzca el título del evento');
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect();

    if (title) {
      const newEvent: FullCalendarInterface = {
        id: this.createEventId(),
        title,
        date: new Date(selectInfo.startStr).getTime(),
      };

      calendarApi.addEvent({
        id: String(newEvent.id),
        title: newEvent.title,
        start: new Date(newEvent.date),
        end: new Date(newEvent.date),
      });

      this.fullCalendarService.saveDate(newEvent).subscribe(response => {
        console.log('Evento guardado con éxito:', response);
      }, error => {
        console.error('Ocurrió un error al guardar el evento:', error);
        const event = calendarApi.getEventById(String(newEvent.id));
        if (event) {
          event.remove();
        }
      });
    }
  }

  handleEventClick(clickInfo: EventClickArg) {
    if (confirm(`Seguro que deseas eliminar el evento '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();

      this.fullCalendarService.deleteDate(Number(clickInfo.event.id)).subscribe(response => {
        // Handle server response here
      }, error => {
        // Handle error here
        const eventInput: EventInput = {
          id: clickInfo.event.id,
          title: clickInfo.event.title,
          allDay: clickInfo.event.allDay
        };

        clickInfo.view.calendar.addEvent(eventInput);
      });
    }
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
    this.changeDetector.detectChanges();
  }
}
