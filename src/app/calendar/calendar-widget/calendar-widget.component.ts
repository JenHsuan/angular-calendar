import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, inject, ViewChild } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';

import { CALENDAR_DATES_ITEM_STYLE_MAP, CalendarWidgetItemType } from './service/calendar-widget.domain';
import { CalendarWidgetOverlayComponent } from './calendar-widget-overlay/calendar-widget-overlay.component';

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

@Component({
  selector: 'app-calendar-widget',
  standalone: true,
  imports: [
    CommonModule,
    OverlayModule,
    CalendarWidgetOverlayComponent
  ],
  templateUrl: './calendar-widget.component.html',
  styleUrl: './calendar-widget.component.scss'
})
export class CalendarWidgetComponent {
  
}
