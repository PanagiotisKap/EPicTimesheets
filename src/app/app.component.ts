import { Component, OnInit } from '@angular/core';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  title = 'epic-calendar-website';
  view: CalendarView = CalendarView.Month;
  viewDate: Date = new Date();
  events: CalendarEvent[] = [];
  CalendarView = CalendarView;
  modalData: any = "Timesheet";
  modalOnSaveData: any = ""; 
  showModal: boolean = false;
  refresh: Subject<any> = new Subject();

  ngOnInit(): void {
    const event1: CalendarEvent = {
      start: new Date(2024, 7, 2),
      title: 'Today'
    };
    this.events.push(event1);

    const event2: CalendarEvent = {
      start: new Date(2024, 8, 23),      
      title: 'Today'
    };
    this.events.push(event2);
    
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  handleEvent(arg: any) {
    this.modalData = arg.srcElement.innerText;
    this.showModal = true;
    console.log(arg);
  }

  handleModalClose() {
    this.showModal = false;
    console.log('Modal closed');
  }

  handleModalSaveDate(data: any) {
    // Check if the modalData contains working hours
    if (data && data.workingHourFrom1 && data.workingHourTo1) {
      this.modalOnSaveData = data;
      console.log('Modal data saved:', data);

      // Add the modal data as a new CalendarEvent
      const newEvent: CalendarEvent = {
        start: new Date(2024,8,24,13,15), // Replace this with the actual start date if necessary
        end: new Date(2024,8,24,14,25),   // Adjust this to set the correct end date/time
        title: `Work: ${data.workingHourFrom1} - ${data.workingHourTo1}`,
        meta: {
          notes: data.notes // Save notes as meta information
        }
      };

      // Push the new event to the events array
      this.events.push(newEvent);
      this.refreshCalendar();
      // Optionally, close the modal
      this.showModal = false;
    } else {
      console.error('Invalid data: ', data);
    }
  }

  handleEventClicked(arg0: any, arg1: any) {
    console.log(arg0);
    console.log(arg1);
  }

  handleDayClicked(
    $event: { day: import("calendar-utils").MonthViewDay<Date>; sourceEvent: MouseEvent | KeyboardEvent; },
    $event1: { day: import("calendar-utils").MonthViewDay<any>; sourceEvent: MouseEvent | KeyboardEvent; }
  ) {
    const day = $event.day;


    const today = new Date();
    today.setHours(0, 0, 0); // Ensure no time component in comparison

    // Get the current month and year
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    // Check if the clicked day is from a previous month/year OR is in the past
    if (day.date.getFullYear() !== currentYear || day.date.getMonth() !== currentMonth) {
      console.log('Clicked a day from a previous or next month, ignoring.');
      return; // Ignore days outside the current month
    }
    const formattedDate = $event.day.date.toLocaleDateString('en-GB', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    this.modalData = formattedDate;
    this.showModal = true;
    console.log(formattedDate);
  }

  refreshCalendar(){
    this.refresh.next(this.events);
  }

  // Logout method
  logout() {
    console.log('User logged out');

  }
}


