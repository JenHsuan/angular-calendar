import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CalendarWidgetComponent } from "./calendar-widget/calendar-widget.component";

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [
    CommonModule,
    CalendarComponent,
    CalendarWidgetComponent
],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent {

}
